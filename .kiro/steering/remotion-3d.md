---
inclusion: manual
---

# Remotion 3D with Three.js

## Prerequisites

```bash
npx remotion add @remotion/three
```

## ThreeCanvas Setup

MUST wrap 3D content in `<ThreeCanvas>` with explicit `width` and `height`:

```tsx
import { ThreeCanvas } from "@remotion/three";
import { useVideoConfig } from "remotion";

const { width, height } = useVideoConfig();

<ThreeCanvas width={width} height={height}>
  <ambientLight intensity={0.4} />
  <directionalLight position={[5, 5, 5]} intensity={0.8} />
  <mesh>
    <sphereGeometry args={[1, 32, 32]} />
    <meshStandardMaterial color="red" />
  </mesh>
</ThreeCanvas>
```

## Animation Rules

- NO self-animating shaders or models
- `useFrame()` from `@react-three/fiber` is FORBIDDEN
- All animations MUST use `useCurrentFrame()`

```tsx
const frame = useCurrentFrame();
const rotationY = frame * 0.02;

<mesh rotation={[0, rotationY, 0]}>
  <boxGeometry args={[2, 2, 2]} />
  <meshStandardMaterial color="#4a9eff" />
</mesh>
```

## Sequences Inside ThreeCanvas

Set `layout="none"` on any `<Sequence>` inside `<ThreeCanvas>`:

```tsx
<ThreeCanvas width={width} height={height}>
  <Sequence layout="none">
    <mesh>...</mesh>
  </Sequence>
</ThreeCanvas>
```
