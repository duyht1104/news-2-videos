---
inclusion: manual
---

# Remotion Captions

## Prerequisites

```bash
npx remotion add @remotion/captions
```

## Creating TikTok-Style Pages

Use `createTikTokStyleCaptions()` to group captions into pages:

```tsx
import { createTikTokStyleCaptions } from '@remotion/captions';
import type { Caption, TikTokPage } from '@remotion/captions';

const SWITCH_CAPTIONS_EVERY_MS = 1200;

const { pages } = useMemo(() => {
  return createTikTokStyleCaptions({
    captions,
    combineTokensWithinMilliseconds: SWITCH_CAPTIONS_EVERY_MS,
  });
}, [captions]);
```

## Rendering with Sequences

```tsx
{pages.map((page, index) => {
  const nextPage = pages[index + 1] ?? null;
  const startFrame = (page.startMs / 1000) * fps;
  const endFrame = Math.min(
    nextPage ? (nextPage.startMs / 1000) * fps : Infinity,
    startFrame + (SWITCH_CAPTIONS_EVERY_MS / 1000) * fps,
  );
  const durationInFrames = endFrame - startFrame;

  if (durationInFrames <= 0) return null;

  return (
    <Sequence key={index} from={startFrame} durationInFrames={durationInFrames}>
      <CaptionPage page={page} />
    </Sequence>
  );
})}
```

## Word Highlighting

```tsx
const CaptionPage: React.FC<{page: TikTokPage}> = ({page}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const currentTimeMs = (frame / fps) * 1000;
  const absoluteTimeMs = page.startMs + currentTimeMs;

  return (
    <div style={{fontSize: 80, fontWeight: 'bold'}}>
      {page.tokens.map((token) => {
        const isActive = token.fromMs <= absoluteTimeMs && token.toMs > absoluteTimeMs;
        return (
          <span key={token.fromMs} style={{color: isActive ? '#39E508' : 'white'}}>
            {token.text}
          </span>
        );
      })}
    </div>
  );
};
```

## Importing SRT Files

```tsx
import { parseSrt } from '@remotion/captions';

const response = await fetch(staticFile('subtitles.srt'));
const text = await response.text();
const { captions } = parseSrt({ input: text });
```

## Transcription Options

- `@remotion/install-whisper-cpp` - Local server transcription (fast, free)
- `@remotion/whisper-web` - Browser WebAssembly (no server, slower)
- `@remotion/openai-whisper` - OpenAI API (fast, paid)
