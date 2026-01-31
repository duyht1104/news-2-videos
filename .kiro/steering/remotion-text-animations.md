---
inclusion: manual
---

# Remotion Text Animations

## Typewriter Effect

Always use string slicing. Never use per-character opacity.

```tsx
const FULL_TEXT = 'From prompt to motion graphics. This is Remotion.';
const PAUSE_AFTER = 'From prompt to motion graphics.';
const CHAR_FRAMES = 2;
const PAUSE_SECONDS = 1;

const getTypedText = ({ frame, fullText, pauseAfter, charFrames, pauseFrames }) => {
  const pauseIndex = fullText.indexOf(pauseAfter);
  const preLen = pauseIndex >= 0 ? pauseIndex + pauseAfter.length : fullText.length;

  let typedChars = 0;
  if (frame < preLen * charFrames) {
    typedChars = Math.floor(frame / charFrames);
  } else if (frame < preLen * charFrames + pauseFrames) {
    typedChars = preLen;
  } else {
    const postPhase = frame - preLen * charFrames - pauseFrames;
    typedChars = Math.min(fullText.length, preLen + Math.floor(postPhase / charFrames));
  }
  return fullText.slice(0, typedChars);
};

// Blinking cursor
const Cursor = ({ frame, blinkFrames, symbol = '\u258C' }) => {
  const opacity = interpolate(frame % blinkFrames, [0, blinkFrames / 2, blinkFrames], [1, 0, 1]);
  return <span style={{ opacity }}>{symbol}</span>;
};
```

## Word Highlighting (Highlighter Pen Effect)

```tsx
const Highlight = ({ word, color, delay, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const highlightProgress = spring({
    fps, frame,
    config: { damping: 200 },
    delay,
    durationInFrames,
  });
  const scaleX = Math.max(0, Math.min(1, highlightProgress));

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{
        position: 'absolute',
        left: 0, right: 0, top: '50%',
        height: '1.05em',
        transform: `translateY(-50%) scaleX(${scaleX})`,
        transformOrigin: 'left center',
        backgroundColor: color,
        borderRadius: '0.18em',
        zIndex: 0,
      }} />
      <span style={{ position: 'relative', zIndex: 1 }}>{word}</span>
    </span>
  );
};
```

## Measuring Text

```bash
npx remotion add @remotion/layout-utils
```

```tsx
import { measureText, fitText, fillTextBox } from "@remotion/layout-utils";

// Measure dimensions
const { width, height } = measureText({ text: "Hello", fontFamily: "Arial", fontSize: 32 });

// Fit text to width
const { fontSize } = fitText({ text: "Hello", withinWidth: 600, fontFamily: "Inter" });

// Check overflow
const box = fillTextBox({ maxBoxWidth: 400, maxLines: 3 });
for (const word of words) {
  const { exceedsBox } = box.add({ text: word + " ", fontFamily: "Arial", fontSize: 24 });
  if (exceedsBox) break;
}
```
