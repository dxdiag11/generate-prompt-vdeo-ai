import React, { useState, useEffect } from 'react';
import { PromptCategory, PromptSelection, DisplayMode } from '../types';
import OptionSelector from './OptionSelector';
import { getBasicOptions, getAdvancedOptions } from '../utils/promptGenerator';
import { optionsMapping } from '../data/optionsMapping';

interface CategoryOptionsProps {
  category: PromptCategory;
  selection: PromptSelection;
  onOptionChange: (categoryId: string, optionId: string, value: string | boolean | number) => void;
  mode: DisplayMode;
}

// Fungsi helper untuk mendapatkan opsi berdasarkan kategori dan opsi ID
const getOptionsForCategoryOption = (
  categoryId: string, 
  optionId: string
): Array<{ id: string; label: string }> => {
  if (
    categoryId === 'subject-action' && 
    (optionId === 'subject-type' || optionId === 'subject-gender' || 
     optionId === 'subject-age' || optionId === 'action' || optionId === 'emotion')
  ) {
    return optionsMapping['subject-action'][optionId] || [];
  }
  
  if (
    categoryId === 'environment-atmosphere' && 
    (optionId === 'location' || optionId === 'time-of-day' || 
     optionId === 'weather' || optionId === 'mood')
  ) {
    return optionsMapping['environment-atmosphere'][optionId] || [];
  }
  
  if (
    categoryId === 'cinematography' && 
    (optionId === 'shot-type' || optionId === 'camera-angle' || optionId === 'camera-movement')
  ) {
    return optionsMapping['cinematography'][optionId] || [];
  }
  
  if (categoryId === 'audio' && optionId === 'music-genre') {
    return optionsMapping['audio'][optionId] || [];
  }
  
  if (
    categoryId === 'technical' && 
    (optionId === 'resolution' || optionId === 'aspect-ratio' || 
     optionId === 'fps' || optionId === 'duration')
  ) {
    return optionsMapping['technical'][optionId] || [];
  }
  
  return [];
};

const CategoryOptions: React.FC<CategoryOptionsProps> = ({
  category,
  selection,
  onOptionChange,
  mode,
}) => {
  const [isWideScreen, setIsWideScreen] = useState(false);
  
  // Check window width on client side only
  useEffect(() => {
    setIsWideScreen(window.innerWidth > 768);
    
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const basicOptions = getBasicOptions();
  const advancedOptions = getAdvancedOptions();
  
  const visibleOptionIds = mode === 'basic' 
    ? basicOptions[category.id] || [] 
    : [...(basicOptions[category.id] || []), ...(advancedOptions[category.id] || [])];
  
  const visibleOptions = category.options.filter(option => 
    visibleOptionIds.includes(option.id)
  );

  // Mendapatkan warna berdasarkan ID kategori
  const getCategoryColor = () => {
    switch (category.id) {
      case 'subject-action':
        return '#3B82F6'; // blue
      case 'environment-atmosphere':
        return '#10B981'; // green
      case 'cinematography':
        return '#8B5CF6'; // purple
      case 'audio':
        return '#FBBF24'; // yellow
      case 'technical':
        return '#EF4444'; // red
      default:
        return '#6B7280'; // default gray
    }
  };

  const getCategoryBgColor = () => {
    switch (category.id) {
      case 'subject-action':
        return '#EFF6FF'; // light blue
      case 'environment-atmosphere':
        return '#ECFDF5'; // light green
      case 'cinematography':
        return '#F5F3FF'; // light purple
      case 'audio':
        return '#FFFBEB'; // light yellow
      case 'technical':
        return '#FEF2F2'; // light red
      default:
        return '#F3F4F6'; // default light gray
    }
  };

  const styles = {
    container: {
      padding: '1.5rem',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
      borderLeft: `4px solid ${getCategoryColor()}`,
      background: getCategoryBgColor(),
      position: 'relative' as const
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between' as const,
      marginBottom: '1.5rem'
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1F2937'
    },
    modeBadge: {
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      fontSize: '0.75rem',
      borderRadius: '9999px',
      backgroundColor: `${getCategoryColor()}20`,
      color: getCategoryColor()
    },
    optionsGrid: {
      display: 'grid',
      gridTemplateColumns: isWideScreen ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)',
      gap: '1rem'
    },
    noOptions: {
      padding: '1rem',
      backgroundColor: '#FFFBEB',
      border: '1px solid #FEF3C7',
      borderRadius: '0.375rem',
      color: '#92400E'
    },
    noOptionsText: {
      display: 'block',
      marginTop: '0.25rem',
      fontSize: '0.875rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>{category.name}</h3>
        <span style={styles.modeBadge}>
          Mode {mode === 'basic' ? 'Basic' : 'Advanced'}
        </span>
      </div>
      
      <div style={styles.optionsGrid}>
        {visibleOptions.map(option => {
          const categorySelection = selection[category.id] || {};
          const value = categorySelection[option.id] || '';
          const optionsList = getOptionsForCategoryOption(category.id, option.id);
          
          return (
            <div key={option.id}>
              <OptionSelector
                categoryId={category.id}
                optionId={option.id}
                value={value}
                onChange={(newValue) => onOptionChange(category.id, option.id, newValue)}
                mode={mode}
                options={optionsList}
              />
            </div>
          );
        })}
      </div>

      {visibleOptions.length === 0 && (
        <div style={styles.noOptions}>
          Tidak ada opsi tersedia untuk mode {mode === 'basic' ? 'Basic' : 'Advanced'} pada kategori ini.
          {mode === 'basic' && (
            <span style={styles.noOptionsText}>
              Coba beralih ke mode Advanced untuk melihat lebih banyak opsi.
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryOptions; 