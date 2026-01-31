---
inclusion: manual
---

# Remotion Media (Video & Audio)

## Prerequisites

```bash
npx remotion add @remotion/media
```

## Video Component

```tsx
import { Video } from "@remotion/media";
import { staticFile } from "remotion";

<Video src={staticFile("video.mp4")} />
<Video src="https://remotion.media/video.mp4" />  // Remote URLs supported
```

## Audio Component

```tsx
import { Audio } from "@remotion/media";
<Audio src={staticFile("audio.mp3")} />
```

## Trimming (values in frames)

```tsx
const { fps } = useVideoConfig();

<Video
  src={staticFile("video.mp4")}
  trimBefore={2 * fps}   // Skip first 2 seconds
  trimAfter={10 * fps}   // End at 10 second mark
/>
```

## Delaying Playback

```tsx
<Sequence from={1 * fps}>
  <Video src={staticFile("video.mp4")} />
</Sequence>
```

## Volume Control

```tsx
<Video src={staticFile("video.mp4")} volume={0.5} />
<Video src={staticFile("video.mp4")} muted />

// Dynamic volume
<Video
  src={staticFile("video.mp4")}
  volume={(f) => interpolate(f, [0, fps], [0, 1], { extrapolateRight: "clamp" })}
/>
```

## Speed & Looping

```tsx
<Video src={staticFile("video.mp4")} playbackRate={2} />     // 2x speed
<Video src={staticFile("video.mp4")} playbackRate={0.5} />   // Half speed
<Video src={staticFile("video.mp4")} loop />
```

## Pitch (render only, not in preview)

```tsx
<Audio src={staticFile("audio.mp3")} toneFrequency={1.5} />  // Higher pitch
<Audio src={staticFile("audio.mp3")} toneFrequency={0.8} />  // Lower pitch
```

## Getting Media Metadata with Mediabunny

```tsx
import { Input, ALL_FORMATS, UrlSource } from "mediabunny";

const input = new Input({
  formats: ALL_FORMATS,
  source: new UrlSource(src),
});

const durationInSeconds = await input.computeDuration();
const videoTrack = await input.getPrimaryVideoTrack();
const { displayWidth, displayHeight } = videoTrack;
```
