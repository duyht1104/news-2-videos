import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { z } from 'zod';
import { Intro, introSchema } from '../Intro';
import { ImageSlide } from '../components/ImageSlide';
import { VideoSlide } from '../components/VideoSlide';
import { CaptionDisplay } from '../components/CaptionDisplay';
import type { Caption } from '@remotion/captions';

export const mainVideoSchema = z.object({
  // Intro props
  introProps: introSchema,

  // Image paths
  images: z.array(z.string()).describe('Array of image paths'),

  // Video paths and durations
  videos: z.array(z.string()).describe('Array of video paths (MP4)'),
  videoDurations: z.array(z.number()).describe('Array of video durations in frames'),

  // Audio path
  audioSrc: z.string().describe('Audio file path'),

  // Captions
  captions: z.array(z.any()).optional().describe('Optional captions array'),

  // Timing
  introDurationInFrames: z.number().describe('Intro duration in frames'),
  imageDurationInFrames: z.number().describe('Duration per image in frames'),
});

export type MainVideoProps = z.infer<typeof mainVideoSchema>;

export const MainVideo: React.FC<MainVideoProps> = ({
  introProps,
  images,
  videos,
  videoDurations,
  audioSrc,
  captions,
  introDurationInFrames,
  imageDurationInFrames,
}) => {
  // Calculate frame positions
  let currentFrame = 0;

  // Intro sequence
  const introFrom = currentFrame;
  currentFrame += introDurationInFrames;

  // Image sequences
  const imageSequences = images.map((src) => {
    const from = currentFrame;
    currentFrame += imageDurationInFrames;
    return { src, from, durationInFrames: imageDurationInFrames };
  });

  // Video sequences
  const videoSequences = videos.map((src, index) => {
    const from = currentFrame;
    const durationInFrames = videoDurations[index];
    currentFrame += durationInFrames;
    return { src, from, durationInFrames };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/* Background Audio - Loops to play for entire video */}
      <Audio src={audioSrc} loop />

      {/* Background Music - Loops to play for entire video */}
      <Audio src={staticFile('intro_template/sound/background_music.mp3')} loop volume={() => 0.3} />

      {/* Intro Sequence */}
      <Sequence
        from={introFrom}
        durationInFrames={introDurationInFrames}
        width={1080}
        height={1920}
      >
        <Intro {...introProps} />
      </Sequence>

      {/* Image Sequences with Pan and Zoom */}
      {imageSequences.map((seq, index) => (
        <Sequence
          key={`image-${index}`}
          from={seq.from}
          durationInFrames={seq.durationInFrames}
        >
          <ImageSlide src={seq.src} durationInFrames={seq.durationInFrames} />
        </Sequence>
      ))}

      {/* Video Sequences - Play one after another with pan effect */}
      {videoSequences.map((seq, index) => (
        <Sequence
          key={`video-${index}`}
          from={seq.from}
          durationInFrames={seq.durationInFrames}
        >
          <VideoSlide src={seq.src} durationInFrames={seq.durationInFrames} />
        </Sequence>
      ))}

      {/* Captions Overlay */}
      {captions && captions.length > 0 && (
        <CaptionDisplay captions={captions as Caption[]} introDurationInFrames={introDurationInFrames} />
      )}
    </AbsoluteFill>
  );
};
