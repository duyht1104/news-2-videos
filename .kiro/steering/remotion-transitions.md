---
inclusion: manual
---

# Remotion Transitions

## Prerequisites

```bash
npx remotion add @remotion/transitions
```

## Basic Usage

```tsx
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';

<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={60}>
    <SceneA />
  </TransitionSeries.Sequence>
  <TransitionSeries.Transition 
    presentation={fade()} 
    timing={linearTiming({durationInFrames: 15})} 
  />
  <TransitionSeries.Sequence durationInFrames={60}>
    <SceneB />
  </TransitionSeries.Sequence>
</TransitionSeries>
```

## Available Transitions

```tsx
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';
import { flip } from '@remotion/transitions/flip';
import { clockWipe } from '@remotion/transitions/clock-wipe';
```

## Slide Directions

```tsx
slide({ direction: 'from-left' })  // from-left, from-right, from-top, from-bottom
```

## Timing Options

```tsx
linearTiming({ durationInFrames: 20 });
springTiming({ config: { damping: 200 }, durationInFrames: 25 });
```

## Duration Calculation

Transitions overlap scenes, reducing total duration:
- Two 60-frame sequences + 15-frame transition = 105 frames (not 120)

```tsx
const duration = timing.getDurationInFrames({ fps: 30 });
```
