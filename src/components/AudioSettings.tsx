import React, { useEffect, useRef } from 'react';
import Switch from 'react-switch';
import { AudioSettings as AudioSettingsType } from '../types';

interface AudioSettingsProps {
  settings: AudioSettingsType;
  onSettingsChange: (settings: AudioSettingsType) => void;
}

const AudioSettings: React.FC<AudioSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  const handleVolumeChange = (key: keyof AudioSettingsType, value: number) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };
  
  const handleToggleChange = (key: keyof AudioSettingsType, checked: boolean) => {
    onSettingsChange({
      ...settings,
      [key]: checked,
    });
  };
  
  const styles = {
    container: {
      padding: '1rem',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb'
    },
    title: {
      fontWeight: '500',
      fontSize: '1.125rem',
      marginBottom: '1rem'
    },
    controlGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.75rem'
    },
    checkboxGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem',
      marginTop: '1.5rem'
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    checkboxLabel: {
      fontSize: '0.875rem',
      color: '#374151',
      marginLeft: '0.75rem'
    },
    sliderContainer: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      position: 'relative' as const
    },
    slider: {
      width: '100%',
      height: '6px',
      appearance: 'none' as const,
      outline: 'none',
      borderRadius: '3px',
      cursor: 'pointer'
    }
  } as const;

  const valueDisplayStyle = {
    backgroundColor: '#FBBF24',
    color: 'white',
    fontSize: '0.75rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
    marginLeft: '0.5rem',
    fontWeight: '500'
  };

  // Referensi untuk setiap slider
  const sliderRefs = {
    dialogVolume: useRef<HTMLInputElement>(null),
    musicVolume: useRef<HTMLInputElement>(null),
    sfxVolume: useRef<HTMLInputElement>(null),
    overallVolume: useRef<HTMLInputElement>(null)
  };

  // Tambahkan CSS untuk slider
  useEffect(() => {
    // Custom CSS untuk slider thumb
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      input[type=range] {
        -webkit-appearance: none;
        appearance: none;
        height: 6px;
        border-radius: 3px;
        outline: none;
      }
      
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: white;
        border: 2px solid #FBBF24;
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
      }
      
      input[type=range]::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: white;
        border: 2px solid #FBBF24;
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
      }
    `;
    document.head.appendChild(styleSheet);

    // Update background warna slider berdasarkan nilai
    Object.entries(sliderRefs).forEach(([key, ref]) => {
      if (ref.current) {
        const value = settings[key as keyof AudioSettingsType] as number;
        ref.current.style.background = `linear-gradient(to right, #FBBF24 0%, #FBBF24 ${value}%, #E5E7EB ${value}%, #E5E7EB 100%)`;
      }
    });

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [settings]);

  // Fungsi untuk update slider background saat nilai berubah
  const updateSliderBackground = (slider: HTMLInputElement, value: number) => {
    slider.style.background = `linear-gradient(to right, #FBBF24 0%, #FBBF24 ${value}%, #E5E7EB ${value}%, #E5E7EB 100%)`;
  };
  
  const renderSwitch = (
    label: string,
    checked: boolean,
    id: keyof AudioSettingsType
  ) => {
    return (
      <div key={`switch-${id}`} style={styles.checkboxContainer}>
        <Switch
          checked={checked}
          onChange={(checked) => handleToggleChange(id, checked)}
          onColor="#FBBF24"
          offColor="#E5E7EB"
          onHandleColor="#ffffff"
          offHandleColor="#ffffff"
          handleDiameter={18}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 3px rgba(0, 0, 0, 0.4)"
          activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.1)"
          height={22}
          width={40}
        />
        <label htmlFor={id} style={styles.checkboxLabel}>
          {label}
        </label>
      </div>
    );
  };
  
  const renderSlider = (
    label: string, 
    value: number, 
    onChange: (value: number) => void,
    sliderId: keyof typeof sliderRefs
  ) => {
    return (
      <div key={`slider-${sliderId}`} style={styles.controlGroup}>
        <div style={styles.label}>
          <span>{label}</span>
          <span style={valueDisplayStyle}>{value}%</span>
        </div>
        <div style={styles.sliderContainer}>
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            id={sliderId}
            ref={sliderRefs[sliderId]}
            onChange={(e) => {
              const newValue = parseInt(e.target.value);
              onChange(newValue);
              if (e.target instanceof HTMLInputElement) {
                updateSliderBackground(e.target, newValue);
              }
            }}
            style={{
              ...styles.slider,
              WebkitAppearance: 'none'
            }}
          />
        </div>
      </div>
    );
  };
  
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Pengaturan Audio</h3>
      
      {renderSlider(
        'Volume Dialog', 
        settings.dialogVolume, 
        (value) => handleVolumeChange('dialogVolume', value),
        'dialogVolume'
      )}
      
      {renderSlider(
        'Volume Musik', 
        settings.musicVolume, 
        (value) => handleVolumeChange('musicVolume', value),
        'musicVolume'
      )}
      
      {renderSlider(
        'Volume Efek Suara', 
        settings.sfxVolume, 
        (value) => handleVolumeChange('sfxVolume', value),
        'sfxVolume'
      )}
      
      {renderSlider(
        'Volume Keseluruhan', 
        settings.overallVolume, 
        (value) => handleVolumeChange('overallVolume', value),
        'overallVolume'
      )}
      
      <div style={styles.checkboxGrid}>
        {renderSwitch('Equalizer', settings.equalizer, 'equalizer')}
        {renderSwitch('Kompresi', settings.compression, 'compression')}
        {renderSwitch('Reverb', settings.reverb, 'reverb')}
        {renderSwitch('Spatial Audio', settings.spatialAudio, 'spatialAudio')}
      </div>
    </div>
  );
};

export default AudioSettings; 