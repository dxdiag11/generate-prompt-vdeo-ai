import {
  subjectTypes,
  genderOptions,
  ageOptions,
  actionOptions,
  emotionOptions,
  locationOptions,
  timeOfDayOptions,
  weatherOptions,
  moodOptions,
  shotTypeOptions,
  cameraAngleOptions,
  cameraMovementOptions,
  musicGenreOptions,
  resolutionOptions,
  aspectRatioOptions,
  fpsOptions,
  durationOptions,
} from './promptOptions';

export const optionsMapping = {
  'subject-action': {
    'subject-type': subjectTypes,
    'subject-gender': genderOptions,
    'subject-age': ageOptions,
    'action': actionOptions,
    'emotion': emotionOptions,
  },
  'environment-atmosphere': {
    'location': locationOptions,
    'time-of-day': timeOfDayOptions,
    'weather': weatherOptions,
    'mood': moodOptions,
  },
  'cinematography': {
    'shot-type': shotTypeOptions,
    'camera-angle': cameraAngleOptions,
    'camera-movement': cameraMovementOptions,
  },
  'audio': {
    'music-genre': musicGenreOptions,
  },
  'technical': {
    'resolution': resolutionOptions,
    'aspect-ratio': aspectRatioOptions,
    'fps': fpsOptions,
    'duration': durationOptions,
  },
}; 