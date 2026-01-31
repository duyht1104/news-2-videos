---
inclusion: manual
---

# Remotion Maps with Mapbox

## Prerequisites

```bash
npm i mapbox-gl @turf/turf @types/mapbox-gl
```

Add to `.env`:
```
REMOTION_MAPBOX_TOKEN=pk.your-mapbox-access-token
```

## Basic Map Setup

```tsx
import mapboxgl, { Map } from 'mapbox-gl';
import { useDelayRender, useVideoConfig } from 'remotion';

mapboxgl.accessToken = process.env.REMOTION_MAPBOX_TOKEN as string;

const ref = useRef<HTMLDivElement>(null);
const { delayRender, continueRender } = useDelayRender();
const { width, height } = useVideoConfig();
const [handle] = useState(() => delayRender('Loading map...'));
const [map, setMap] = useState<Map | null>(null);

useEffect(() => {
  const _map = new Map({
    container: ref.current!,
    zoom: 11.53,
    center: [6.5615, 46.0598],
    pitch: 65,
    style: 'mapbox://styles/mapbox/standard',
    interactive: false,
    fadeDuration: 0,  // IMPORTANT: Disable animations
  });

  _map.on('load', () => {
    continueRender(handle);
    setMap(_map);
  });
}, []);

// Element MUST have explicit width, height, and position: absolute
<AbsoluteFill ref={ref} style={{ width, height, position: 'absolute' }} />
```

## Important Rules

- Set `fadeDuration: 0` and `interactive: false`
- All animations MUST use `useCurrentFrame()`
- Element with ref MUST have explicit width/height and `position: "absolute"`
- Do NOT add `_map.remove()` cleanup

## Hide Default Features

```tsx
_map.on('style.load', () => {
  const hideFeatures = [
    'showRoadsAndTransit', 'showRoads', 'showTransit', 'showPedestrianRoads',
    'showRoadLabels', 'showTransitLabels', 'showPlaceLabels',
    'showPointOfInterestLabels', 'showPointsOfInterest', 'showAdminBoundaries',
    'showLandmarkIcons', 'showLandmarkIconLabels', 'show3dObjects',
    'show3dBuildings', 'show3dTrees', 'show3dLandmarks', 'show3dFacades',
  ];
  for (const feature of hideFeatures) {
    _map.setConfigProperty('basemap', feature, false);
  }
});
```

## Animating Camera with Turf

```tsx
import * as turf from '@turf/turf';

const routeDistance = turf.length(turf.lineString(lineCoordinates));
const progress = interpolate(frame / fps, [0, animationDuration], [0, 1], {
  easing: Easing.inOut(Easing.sin),
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});

const alongRoute = turf.along(turf.lineString(lineCoordinates), routeDistance * progress);
const camera = map.getFreeCameraOptions();
camera.lookAtPoint({ lng: alongRoute[0], lat: alongRoute[1] });
map.setFreeCameraOptions(camera);
```

## Rendering

```bash
npx remotion render --gl=angle --concurrency=1
```
