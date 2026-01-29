---
inclusion: manual
---

# Remotion Compositions

## Basic Composition

```tsx
import { Composition } from 'remotion';

<Composition
  id="MyComposition"
  component={MyComponent}
  durationInFrames={100}
  fps={30}
  width={1080}
  height={1080}
/>
```

## Default Props

Values must be JSON-serializable (`Date`, `Map`, `Set`, `staticFile()` supported).
Use `type` declarations (not `interface`) for type safety.

```tsx
<Composition
  id="MyComposition"
  component={MyComponent}
  durationInFrames={100}
  fps={30}
  width={1080}
  height={1080}
  defaultProps={{
    title: 'Hello World',
    color: '#ff0000',
  } satisfies MyCompositionProps}
/>
```

## Folders

```tsx
import { Folder } from 'remotion';

<Folder name="Marketing">
  <Composition id="Promo" ... />
  <Composition id="Ad" ... />
</Folder>
```

## Stills (Single Frame)

```tsx
import { Still } from 'remotion';

<Still id="Thumbnail" component={Thumbnail} width={1280} height={720} />
```

## Calculate Metadata (Dynamic Duration/Dimensions)

```tsx
import { CalculateMetadataFunction } from 'remotion';

const calculateMetadata: CalculateMetadataFunction<Props> = async ({ props, abortSignal }) => {
  const data = await fetch(`https://api.example.com/video/${props.videoId}`, {
    signal: abortSignal,
  }).then((res) => res.json());

  return {
    durationInFrames: Math.ceil(data.duration * 30),
    props: { ...props, videoUrl: data.url },
  };
};

<Composition calculateMetadata={calculateMetadata} ... />
```

## Nesting Compositions

```tsx
<AbsoluteFill>
  <Sequence width={COMPOSITION_WIDTH} height={COMPOSITION_HEIGHT}>
    <CompositionComponent />
  </Sequence>
</AbsoluteFill>
```

## Zod Schema for Parameters

```bash
npm i zod@3.22.3
npx remotion add @remotion/zod-types  # For color picker
```

```tsx
import { z } from 'zod';
import { zColor } from '@remotion/zod-types';

export const MyCompositionSchema = z.object({
  title: z.string(),
  color: zColor(),
});

<Composition schema={MyCompositionSchema} ... />
```
