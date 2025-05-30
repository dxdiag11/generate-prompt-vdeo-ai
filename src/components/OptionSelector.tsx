import React from 'react';
import Select from 'react-select';
import { DisplayMode } from '../types';
import { promptCategories } from '../data/promptCategories';

interface OptionSelectorProps {
  categoryId: string;
  optionId: string;
  value: string | boolean | number;
  onChange: (value: string | boolean | number) => void;
  mode: DisplayMode;
  options?: Array<{ id: string; label: string }>;
}

const OptionSelector: React.FC<OptionSelectorProps> = ({
  categoryId,
  optionId,
  value,
  onChange,
  mode,
  options = [],
}) => {
  // Find option label from prompt categories
  const category = promptCategories.find(cat => cat.id === categoryId);
  const option = category?.options.find(opt => opt.id === optionId);
  const optionLabel = option?.label || optionId;
  const optionDescription = option?.description || '';
  
  const handleSelectChange = (selectedOption: any) => {
    onChange(selectedOption ? selectedOption.value : '');
  };
  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // Mendapatkan warna aksen berdasarkan kategori
  const getCategoryAccentColor = () => {
    switch (categoryId) {
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
        return '#3B82F6'; // default blue
    }
  };

  const getCategoryBgColor = () => {
    switch (categoryId) {
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
        return '#EFF6FF'; // default light blue
    }
  };
  
  const styles = {
    container: {
      marginBottom: '1.25rem'
    },
    fieldContainer: {
      marginBottom: '0.75rem'
    },
    labelContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.375rem'
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151'
    },
    labelText: {
      marginRight: '0.25rem'
    },
    labelDescription: {
      fontSize: '0.75rem',
      color: '#6B7280',
      fontStyle: 'italic'
    },
    advancedBadge: {
      display: 'inline-block',
      padding: '0.125rem 0.5rem',
      backgroundColor: '#F3F4F6',
      color: '#6B7280',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    textareaContainer: {
      width: '100%'
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '0.375rem',
      border: '1px solid #D1D5DB',
      outline: 'none',
      fontSize: '0.875rem',
      fontFamily: 'inherit'
    },
    selectContainer: {
      position: 'relative' as const
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '0.375rem',
      border: '1px solid #D1D5DB',
      outline: 'none',
      fontSize: '0.875rem',
      transition: 'all 0.2s ease'
    }
  };

  // Custom styles untuk React Select
  const customSelectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      borderColor: state.isFocused ? getCategoryAccentColor() : '#D1D5DB',
      boxShadow: state.isFocused ? `0 0 0 1px ${getCategoryAccentColor()}` : 'none',
      backgroundColor: getCategoryBgColor() + '60',
      borderRadius: '0.375rem',
      padding: '0.125rem',
      fontSize: '0.875rem',
      transition: 'all 0.2s ease',
      '&:hover': {
        borderColor: getCategoryAccentColor()
      }
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? getCategoryAccentColor() 
        : state.isFocused 
          ? getCategoryBgColor() 
          : 'white',
      color: state.isSelected ? 'white' : '#374151',
      fontSize: '0.875rem',
      padding: '0.5rem 0.75rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: '0.375rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      zIndex: 10,
      animation: 'fadeIn 0.2s ease'
    }),
    placeholder: (base: any) => ({
      ...base,
      color: '#9CA3AF',
      fontSize: '0.875rem'
    }),
    singleValue: (base: any) => ({
      ...base,
      color: '#374151',
      fontSize: '0.875rem'
    }),
    dropdownIndicator: (base: any, state: any) => ({
      ...base,
      color: state.isFocused ? getCategoryAccentColor() : '#9CA3AF',
      transition: 'all 0.2s ease',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)'
    }),
    clearIndicator: (base: any) => ({
      ...base,
      color: '#9CA3AF',
      cursor: 'pointer',
      '&:hover': {
        color: '#EF4444'
      }
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: getCategoryBgColor(),
      borderRadius: '0.25rem'
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: '#374151',
      fontSize: '0.75rem',
      padding: '0.125rem'
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: '#9CA3AF',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#EF4444',
        color: 'white'
      }
    }),
    indicatorSeparator: () => ({
      display: 'none'
    })
  };
  
  // Special case for negative prompt
  if (optionId === 'negative-prompt') {
    return (
      <div style={styles.container}>
        <div style={styles.labelContainer}>
          <label style={styles.label}>
            <span style={styles.labelText}>{optionLabel}</span>
            {optionDescription && (
              <span style={styles.labelDescription}>({optionDescription})</span>
            )}
          </label>
          {option?.category === 'advanced' && mode === 'advanced' && (
            <div style={styles.advancedBadge}>
              Opsi Advanced
            </div>
          )}
        </div>
        <div style={styles.textareaContainer}>
          <textarea
            style={{
              ...styles.textarea,
              borderColor: getCategoryAccentColor() + '40',
              backgroundColor: getCategoryBgColor() + '60',
            }}
            rows={3}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Masukkan apa yang tidak ingin muncul dalam video..."
          />
        </div>
      </div>
    );
  }
  
  return (
    <div style={styles.fieldContainer}>
      <div style={styles.labelContainer}>
        <label style={styles.label}>
          <span style={styles.labelText}>{optionLabel}</span>
          {optionDescription && (
            <span style={styles.labelDescription}>({optionDescription})</span>
          )}
        </label>
        {option?.category === 'advanced' && mode === 'advanced' && (
          <div style={styles.advancedBadge}>
            Opsi Advanced
          </div>
        )}
      </div>
      
      {options.length > 0 ? (
        <div style={styles.selectContainer}>
          <Select
            options={options.map(option => ({ value: option.label, label: option.label }))}
            value={value ? { value: value, label: value } : null}
            onChange={handleSelectChange}
            styles={customSelectStyles}
            placeholder={`Pilih ${optionLabel.toLowerCase()}...`}
            isClearable
            isSearchable
            classNamePrefix="react-select"
            noOptionsMessage={() => "Tidak ada opsi yang sesuai"}
            instanceId={`select-${categoryId}-${optionId}`}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: getCategoryAccentColor(),
                primary25: getCategoryBgColor(),
                primary50: getCategoryBgColor() + '80',
              },
            })}
          />
        </div>
      ) : (
        <div style={styles.selectContainer}>
          <input
            type="text"
            style={{
              ...styles.input,
              borderColor: getCategoryAccentColor() + '40',
              backgroundColor: getCategoryBgColor() + '60',
            }}
            value={value as string}
            onChange={handleTextChange}
            placeholder={`Masukkan ${optionLabel.toLowerCase()}...`}
            onFocus={(e) => {
              e.target.style.borderColor = getCategoryAccentColor();
              e.target.style.boxShadow = `0 0 0 1px ${getCategoryAccentColor()}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = `${getCategoryAccentColor()}40`;
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
      )}
    </div>
  );
};

export default OptionSelector; 