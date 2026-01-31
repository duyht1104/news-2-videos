---
inclusion: manual
---

# Remotion Images

## The `<Img>` Component

MUST use `<Img>` from `remotion`. Do NOT use:
- Native HTML `<img>` elements
- Next.js `<Image>` component
- CSS `background-image`

```tsx
import { Img, staticFile } from "remotion";

<Img src={staticFile("photo.png")} />
<Img src="https://example.com/image.png" />  // Remote URLs supported
```

## Sizing and Positioning

```tsx
<Img
  src={staticFile("photo.png")}
  style={{
    width: 500,
    height: 300,
    position: "absolute",
    top: 100,
    left: 50,
    objectFit: "cover",
  }}
/>
```

## Dynamic Image Paths

```tsx
const frame = useCurrentFrame();

// Image sequence
<Img src={staticFile(`frames/frame${frame}.png`)} />

// User-specific
<Img src={staticFile(`avatars/${props.userId}.png`)} />

// Conditional
<Img src={staticFile(`icons/${isActive ? "active" : "inactive"}.svg`)} />
```

## Getting Image Dimensions

```tsx
import { getImageDimensions, staticFile } from "remotion";

const { width, height } = await getImageDimensions(staticFile("photo.png"));
```

For animated GIFs, use `<Gif>` from `@remotion/gif` or `<AnimatedImage>`.
