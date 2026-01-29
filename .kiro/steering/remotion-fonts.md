---
inclusion: manual
---

# Remotion Fonts

## Google Fonts (Recommended)

```bash
npx remotion add @remotion/google-fonts
```

```tsx
import { loadFont } from "@remotion/google-fonts/Lobster";

const { fontFamily } = loadFont();

// With specific weights/subsets
const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

// Wait for font to load
const { fontFamily, waitUntilDone } = loadFont();
await waitUntilDone();
```

## Local Fonts

```bash
npx remotion add @remotion/fonts
```

```tsx
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

await loadFont({
  family: "MyFont",
  url: staticFile("MyFont-Regular.woff2"),
});

// Multiple weights
await Promise.all([
  loadFont({ family: "Inter", url: staticFile("Inter-Regular.woff2"), weight: "400" }),
  loadFont({ family: "Inter", url: staticFile("Inter-Bold.woff2"), weight: "700" }),
]);
```

## Usage in Components

```tsx
const { fontFamily } = loadFont();

<h1 style={{ fontFamily, fontSize: 80, fontWeight: "bold" }}>
  {text}
</h1>
```
