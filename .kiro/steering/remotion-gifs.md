---
inclusion: manual
---

# Remotion Animated Images (GIF, APNG, AVIF, WebP)

## Basic Usage

```tsx
import { AnimatedImage, staticFile } from 'remotion';

<AnimatedImage src={staticFile('animation.gif')} width={500} height={500} />
<AnimatedImage src="https://example.com/animation.gif" width={500} height={500} />
```

## Sizing and Fit

```tsx
<AnimatedImage src={staticFile("animation.gif")} width={500} height={300} fit="fill" />    // Stretch (default)
<AnimatedImage src={staticFile("animation.gif")} width={500} height={300} fit="contain" /> // Fit inside
<AnimatedImage src={staticFile("animation.gif")} width={500} height={300} fit="cover" />   // Fill, crop if needed
```

## Playback Control

```tsx
<AnimatedImage src={staticFile("animation.gif")} width={500} height={500} playbackRate={2} />   // 2x speed
<AnimatedImage src={staticFile("animation.gif")} width={500} height={500} playbackRate={0.5} /> // Half speed
```

## Loop Behavior

```tsx
<AnimatedImage loopBehavior="loop" />               // Loop indefinitely (default)
<AnimatedImage loopBehavior="pause-after-finish" /> // Play once, show final frame
<AnimatedImage loopBehavior="clear-after-finish" /> // Play once, clear canvas
```

## Getting GIF Duration

```bash
npx remotion add @remotion/gif
```

```tsx
import { getGifDurationInSeconds } from '@remotion/gif';

const duration = await getGifDurationInSeconds(staticFile('animation.gif'));
```

## Fallback for Non-Chrome/Firefox

Use `<Gif>` from `@remotion/gif` if `<AnimatedImage>` doesn't work:

```tsx
import { Gif } from '@remotion/gif';
<Gif src={staticFile('animation.gif')} width={500} height={500} />
```
