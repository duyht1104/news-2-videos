import { AbsoluteFill, interpolate, useCurrentFrame, OffthreadVideo } from 'remotion';

interface VideoSlideProps {
  src: string;
  durationInFrames: number;
}

export const VideoSlide: React.FC<VideoSlideProps> = ({ src, durationInFrames }) => {
  const frame = useCurrentFrame();

  // Linear pan animation - constant speed from left to right
  // Video is 130% wide, so we pan by 23.08% to move from left to right
  // Start at left side, end at right side (pan range = 30% / 130% = 23.08%)
  const panX = interpolate(
    frame,
    [0, durationInFrames],
    [-23, 0.5],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000',
      }}
    >
      {/* Blurred background layer - static, no pan */}
      <AbsoluteFill>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <OffthreadVideo
            src={src}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'blur(20px)',
              transform: 'scale(1.1)', // Slight scale to hide blur edges
            }}
            muted
          />
        </div>
      </AbsoluteFill>

      {/* Foreground layer with pan effect - no zoom, fit to width */}
      <AbsoluteFill>
        <div
          style={{
            width: '150%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <OffthreadVideo
            src={src}
            style={{
              width: '130%', // Scaled to 130% after fitting to width
              height: 'auto',
              objectFit: 'contain',
              transform: `translateX(${panX}%)`,
              transformOrigin: 'center center',
            }}
            muted
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
