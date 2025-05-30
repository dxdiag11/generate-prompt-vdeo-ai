import { PromptSelection, AudioSettings, TechnicalParameters } from '../types';
import { promptCategories } from '../data/promptCategories';

export const generatePrompt = (
  selection: PromptSelection,
  audioSettings: AudioSettings,
  technicalParams: TechnicalParameters
): string => {
  let promptParts: string[] = [];
  
  // Subjek dan Aksi
  const subjectAction = selection['subject-action'] || {};
  let subjectPart = '';
  
  if (subjectAction['subject-type']) {
    subjectPart += subjectAction['subject-type'] as string;
    
    // Tambahkan gender jika ada
    if (subjectAction['subject-gender']) {
      subjectPart += ` ${subjectAction['subject-gender'] as string}`;
    }
    
    // Tambahkan usia jika ada
    if (subjectAction['subject-age']) {
      subjectPart += ` ${subjectAction['subject-age'] as string}`;
    }
    
    // Tambahkan etnis jika ada
    if (subjectAction['subject-ethnicity']) {
      subjectPart += ` ${subjectAction['subject-ethnicity'] as string}`;
    }
    
    // Tambahkan pakaian jika ada
    if (subjectAction['subject-clothing']) {
      subjectPart += ` mengenakan ${subjectAction['subject-clothing'] as string}`;
    }
  }
  
  // Tambahkan aksi
  if (subjectAction['action']) {
    if (subjectPart) {
      subjectPart += ` ${subjectAction['action'] as string}`;
    } else {
      subjectPart += subjectAction['action'] as string;
    }
  }
  
  // Tambahkan emosi
  if (subjectAction['emotion']) {
    subjectPart += ` dengan ekspresi ${subjectAction['emotion'] as string}`;
  }
  
  if (subjectPart) {
    promptParts.push(subjectPart);
  }
  
  // Lingkungan dan Atmosfer
  const environment = selection['environment-atmosphere'] || {};
  let environmentPart = '';
  
  // Lokasi
  if (environment['location']) {
    environmentPart += `di ${environment['location'] as string}`;
  }
  
  // Waktu
  if (environment['time-of-day']) {
    if (environmentPart) {
      environmentPart += ` pada ${environment['time-of-day'] as string}`;
    } else {
      environmentPart += `Pada ${environment['time-of-day'] as string}`;
    }
  }
  
  // Cuaca
  if (environment['weather']) {
    if (environmentPart) {
      environmentPart += ` dengan cuaca ${environment['weather'] as string}`;
    } else {
      environmentPart += `Cuaca ${environment['weather'] as string}`;
    }
  }
  
  // Mood/Suasana
  if (environment['mood']) {
    if (environmentPart) {
      environmentPart += `, suasana ${environment['mood'] as string}`;
    } else {
      environmentPart += `Suasana ${environment['mood'] as string}`;
    }
  }
  
  // Era/Periode
  if (environment['era']) {
    if (environmentPart) {
      environmentPart += `, di era ${environment['era'] as string}`;
    } else {
      environmentPart += `Era ${environment['era'] as string}`;
    }
  }
  
  if (environmentPart) {
    promptParts.push(environmentPart);
  }
  
  // Sinematografi
  const cinematography = selection['cinematography'] || {};
  let cinematographyPart = '';
  
  // Jenis Shot
  if (cinematography['shot-type']) {
    cinematographyPart += `${cinematography['shot-type'] as string}`;
  }
  
  // Sudut Kamera
  if (cinematography['camera-angle']) {
    if (cinematographyPart) {
      cinematographyPart += `, ${cinematography['camera-angle'] as string}`;
    } else {
      cinematographyPart += `${cinematography['camera-angle'] as string}`;
    }
  }
  
  // Pergerakan Kamera
  if (cinematography['camera-movement']) {
    if (cinematographyPart) {
      cinematographyPart += `, ${cinematography['camera-movement'] as string}`;
    } else {
      cinematographyPart += `${cinematography['camera-movement'] as string}`;
    }
  }
  
  // Fokus
  if (cinematography['focus']) {
    if (cinematographyPart) {
      cinematographyPart += `, ${cinematography['focus'] as string} focus`;
    } else {
      cinematographyPart += `${cinematography['focus'] as string} focus`;
    }
  }
  
  // Lensa
  if (cinematography['lens']) {
    if (cinematographyPart) {
      cinematographyPart += `, ${cinematography['lens'] as string} lens`;
    } else {
      cinematographyPart += `${cinematography['lens'] as string} lens`;
    }
  }
  
  // Color Grading
  if (cinematography['color-grading']) {
    if (cinematographyPart) {
      cinematographyPart += `, ${cinematography['color-grading'] as string} color grading`;
    } else {
      cinematographyPart += `${cinematography['color-grading'] as string} color grading`;
    }
  }
  
  if (cinematographyPart) {
    promptParts.push(cinematographyPart);
  }
  
  // Audio
  const audio = selection['audio'] || {};
  let audioPart = '';
  
  // Genre Musik
  if (audio['music-genre'] && audio['music-genre'] !== 'none') {
    audioPart += `musik ${audio['music-genre'] as string}`;
  }
  
  // Efek Suara
  if (audio['sound-effects']) {
    if (audioPart) {
      audioPart += `, efek suara ${audio['sound-effects'] as string}`;
    } else {
      audioPart += `efek suara ${audio['sound-effects'] as string}`;
    }
  }
  
  // Dialog/Narasi
  if (audio['dialogue']) {
    if (audioPart) {
      audioPart += `, ${audio['dialogue'] as string}`;
    } else {
      audioPart += `${audio['dialogue'] as string}`;
    }
  }
  
  // Tone Suara
  if (audio['voice-tone']) {
    if (audioPart) {
      audioPart += ` dengan tone suara ${audio['voice-tone'] as string}`;
    } else {
      audioPart += `tone suara ${audio['voice-tone'] as string}`;
    }
  }
  
  // Audio Settings
  let audioSettingsPart = '';
  if (audioSettings.dialogVolume !== 50) {
    audioSettingsPart += `dialog volume: ${audioSettings.dialogVolume}%, `;
  }
  
  if (audioSettings.musicVolume !== 50) {
    audioSettingsPart += `music volume: ${audioSettings.musicVolume}%, `;
  }
  
  if (audioSettings.sfxVolume !== 50) {
    audioSettingsPart += `SFX volume: ${audioSettings.sfxVolume}%, `;
  }
  
  if (audioSettings.overallVolume !== 50) {
    audioSettingsPart += `overall volume: ${audioSettings.overallVolume}%, `;
  }
  
  if (audioSettings.equalizer) {
    audioSettingsPart += `equalizer on, `;
  }
  
  if (audioSettings.compression) {
    audioSettingsPart += `compression on, `;
  }
  
  if (audioSettings.reverb) {
    audioSettingsPart += `reverb on, `;
  }
  
  if (audioSettings.spatialAudio) {
    audioSettingsPart += `spatial audio on, `;
  }
  
  // Gabungkan audio dan pengaturan audio
  if (audioPart || audioSettingsPart) {
    let combinedAudioPart = '';
    
    if (audioPart) {
      combinedAudioPart += audioPart;
    }
    
    if (audioSettingsPart) {
      if (combinedAudioPart) {
        combinedAudioPart += `, ${audioSettingsPart.slice(0, -2)}`;
      } else {
        combinedAudioPart += audioSettingsPart.slice(0, -2);
      }
    }
    
    promptParts.push(combinedAudioPart);
  }
  
  // Parameter Teknis
  let technicalPart = '';
  
  technicalPart += `${technicalParams.resolution}, ${technicalParams.aspectRatio}, ${technicalParams.fps} FPS, durasi ${technicalParams.duration}`;
  
  promptParts.push(technicalPart);
  
  // Negative Prompt
  if (technicalParams.negativePrompt) {
    promptParts.push(`negative prompt: ${technicalParams.negativePrompt}`);
  }
  
  // Gabungkan semua bagian prompt dengan koma
  return promptParts.join(', ');
};

export const getBasicOptions = () => {
  const basicOptions: Record<string, string[]> = {};
  
  promptCategories.forEach(category => {
    basicOptions[category.id] = category.options
      .filter(option => option.category === 'basic' || option.category === 'both')
      .map(option => option.id);
  });
  
  return basicOptions;
};

export const getAdvancedOptions = () => {
  const advancedOptions: Record<string, string[]> = {};
  
  promptCategories.forEach(category => {
    advancedOptions[category.id] = category.options
      .filter(option => option.category === 'advanced' || option.category === 'both')
      .map(option => option.id);
  });
  
  return advancedOptions;
}; 