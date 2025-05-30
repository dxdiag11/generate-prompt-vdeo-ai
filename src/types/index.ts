export type PromptOption = {
  id: string;
  label: string;
  value?: string;
  category: 'basic' | 'advanced' | 'both';
  description?: string;
  icon?: string;
  options?: Array<{ id: string, label: string }>;
};

export type Category = {
  id: string;
  label: string;
  name?: string;
  description: string;
  options: PromptOption[];
};

export type PromptCategory = {
  id: string;
  name: string;
  description: string;
  options: PromptOption[];
};

export type PromptSelection = {
  [categoryId: string]: {
    [optionId: string]: boolean | string | number;
  };
};

export type AudioSettings = {
  dialogVolume: number;
  musicVolume: number;
  sfxVolume: number;
  overallVolume: number;
  equalizer: boolean;
  compression: boolean;
  reverb: boolean;
  spatialAudio: boolean;
};

export type TechnicalParameters = {
  resolution: string;
  aspectRatio: string;
  fps: number;
  duration: string;
  negativePrompt: string;
};

export type DisplayMode = 'basic' | 'advanced'; 