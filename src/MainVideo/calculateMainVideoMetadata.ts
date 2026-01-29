import type { CalculateMetadataFunction } from 'remotion';
import { getAudioDuration } from '../utils/getAudioDuration';
import { getVideoDuration } from '../utils/getVideoDuration';
import type { MainVideoProps } from './index';

export const calculateMainVideoMetadata: CalculateMetadataFunction<
  MainVideoProps
> = async ({ props }) => {
  const fps = 30;

  // Get audio duration
  const audioDuration = await getAudioDuration(props.audioSrc);

  // Get individual video durations
  // If videoDurations are already provided and not all zeros, use them
  const hasValidDurations = props.videoDurations.some(d => d > 0);
  const videoDurations: number[] = hasValidDurations ? props.videoDurations : [];
  let totalVideoDuration = 0;

  if (hasValidDurations) {
    // Use provided durations
    totalVideoDuration = videoDurations.reduce((sum, frames) => sum + (frames / fps), 0);
  } else {
    // Extract durations from videos
    for (const videoSrc of props.videos) {
      const duration = await getVideoDuration(videoSrc);
      videoDurations.push(Math.ceil(duration * fps)); // Convert to frames
      totalVideoDuration += duration;
    }
  }

  // Calculate total duration in seconds
  // Intro + all images + all videos (or just audio length if longer)
  const introDurationInSeconds = props.introDurationInFrames / fps;
  const imagesTotalDurationInSeconds =
    (props.imageDurationInFrames * props.images.length) / fps;

  const contentDuration =
    introDurationInSeconds +
    imagesTotalDurationInSeconds +
    totalVideoDuration;

  // Use the longer of audio duration or content duration
  const totalDuration = Math.max(audioDuration, contentDuration);

  return {
    fps,
    durationInFrames: Math.ceil(totalDuration * fps),
    width: 1080,
    height: 1920,
    props: {
      ...props,
      videoDurations,
    },
  };
};
