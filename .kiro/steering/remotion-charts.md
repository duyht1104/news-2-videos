---
inclusion: manual
---

# Remotion Charts & Data Visualization

## Core Rules

- Use regular React (HTML/SVG) or D3.js
- Disable ALL third-party library animations - they cause flickering
- Drive all animations from `useCurrentFrame()`

## Staggered Bar Chart

```tsx
const STAGGER_DELAY = 5;
const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const bars = data.map((item, i) => {
  const delay = i * STAGGER_DELAY;
  const height = spring({
    frame,
    fps,
    delay,
    config: { damping: 200 },
  });
  return <div style={{ height: height * item.value }} />;
});
```

## Pie Chart Animation

Animate segments using stroke-dashoffset, starting from 12 o'clock:

```tsx
const progress = interpolate(frame, [0, 100], [0, 1]);
const circumference = 2 * Math.PI * radius;
const segmentLength = (value / total) * circumference;
const offset = interpolate(progress, [0, 1], [segmentLength, 0]);

<circle
  r={radius}
  cx={center}
  cy={center}
  fill="none"
  stroke={color}
  strokeWidth={strokeWidth}
  strokeDasharray={`${segmentLength} ${circumference}`}
  strokeDashoffset={offset}
  transform={`rotate(-90 ${center} ${center})`}
/>
```

## Complete Bar Chart Example

```tsx
const data = [
  { month: 'Jan', price: 2039 },
  { month: 'Mar', price: 2160 },
  // ...
];

const minPrice = 2000;
const maxPrice = 2800;
const priceRange = maxPrice - minPrice;

{data.map((item, i) => {
  const progress = spring({
    frame: frame - i * 5 - 10,
    fps,
    config: { damping: 18, stiffness: 80 },
  });
  const barHeight = ((item.price - minPrice) / priceRange) * chartHeight * progress;
  return <Bar key={item.month} height={barHeight} progress={progress} />;
})}
```
