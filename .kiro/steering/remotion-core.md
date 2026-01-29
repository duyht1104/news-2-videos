---
inclusion: always
---

# Remotion Best Practices

This project uses Remotion for video creation in React. Follow these core rules.

## Animation Rules

- All animations MUST be driven by `useCurrentFrame()` hook
- Write animations in seconds and multiply by `fps` from `useVideoConfig()`
- CSS transitions/animations are FORBIDDEN - they won't render correctly
- Tailwind `transition-*` or `animate-*` classes are FORBIDDEN

```tsx
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const opacity = interpolate(frame, [0, 2 * fps], [0, 1], {
  extrapolateRight: 'clamp',
});
```

## Assets

- Place assets in `public/` folder
- Use `staticFile()` to reference files from `public/`
- Use Remotion components (`<Img>`, `<Video>`, `<Audio>`) - they ensure assets load before rendering

```tsx
import { Img, staticFile } from 'remotion';
<Img src={staticFile('photo.png')} />
```

## Sequencing

- Use `<Sequence>` to delay when elements appear
- Always premount sequences: `<Sequence premountFor={1 * fps}>`
- Use `<Series>` for elements that play one after another

## Timing

- Use `interpolate()` for linear animations
- Use `spring()` for natural motion (returns 0-1)
- Default spring has bounce; use `{ damping: 200 }` for smooth motion without bounce

```tsx
const scale = spring({ frame, fps, config: { damping: 200 } });
```

## Media Components

- Import `<Video>` and `<Audio>` from `@remotion/media`
- Use `trimBefore`/`trimAfter` for trimming (values in frames)
- Wrap in `<Sequence>` to delay playback
