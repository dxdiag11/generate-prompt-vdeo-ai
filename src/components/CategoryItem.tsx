import React from 'react';
import { PromptCategory, DisplayMode } from '../types';
import { getBasicOptions, getAdvancedOptions } from '../utils/promptGenerator';

interface CategoryItemProps {
  category: PromptCategory;
  isActive: boolean;
  onClick: () => void;
  mode: DisplayMode;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  isActive,
  onClick,
  mode,
}) => {
  const basicOptions = getBasicOptions();
  const advancedOptions = getAdvancedOptions();

  // Perbaikan perhitungan jumlah opsi berdasarkan mode
  const visibleOptionsCount = mode === 'basic' 
    ? (basicOptions[category.id] || []).length
    : (basicOptions[category.id] || []).length + (advancedOptions[category.id] || []).length;

  // Menentukan ikon berdasarkan ID kategori
  const getCategoryIcon = () => {
    const iconColor = isActive ? 'white' : '#3B82F6';
    const iconStyle = {
      width: '24px',
      height: '24px',
      display: 'block'
    };
    
    switch (category.id) {
      case 'subject-action':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} fill="none" viewBox="0 0 24 24" stroke={iconColor} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'environment-atmosphere':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} fill="none" viewBox="0 0 24 24" stroke={iconColor} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'cinematography':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} fill="none" viewBox="0 0 24 24" stroke={iconColor} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case 'audio':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} fill="none" viewBox="0 0 24 24" stroke={iconColor} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        );
      case 'technical':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} fill="none" viewBox="0 0 24 24" stroke={iconColor} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const containerStyle = {
    marginBottom: '0.75rem',
    padding: '0.875rem 1rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transform: isActive ? 'scale(1.02)' : 'scale(1)',
    backgroundColor: isActive ? '#3B82F6' : 'white',
    color: isActive ? 'white' : '#374151',
    boxShadow: isActive ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none',
    border: isActive ? 'none' : '1px solid #e5e7eb'
  };

  const flexContainerStyle = {
    display: 'flex',
    alignItems: 'center'
  };

  const iconContainerStyle = {
    width: '40px', 
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginRight: '0.75rem',
    color: isActive ? 'white' : '#3B82F6'
  };

  const contentStyle = {
    flex: 1
  };

  const titleStyle = {
    fontWeight: 600,
    fontSize: '1rem',
    marginTop: 0,
    marginBottom: '0.25rem',
    lineHeight: '1.25'
  };

  const descriptionStyle = {
    fontSize: '0.875rem',
    lineHeight: '1.4',
    color: isActive ? 'rgba(255, 255, 255, 0.8)' : '#6B7280',
    margin: '0 0 0.5rem 0'
  };

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '1.5rem',
    padding: '0 0.5rem',
    fontSize: '0.75rem',
    borderRadius: '9999px',
    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(59, 130, 246, 0.1)',
    color: isActive ? 'white' : '#3B82F6',
    fontWeight: 500
  };

  return (
    <div
      className={!isActive ? 'hover-scale' : ''}
      style={containerStyle}
      onClick={onClick}
    >
      <div style={flexContainerStyle}>
        <div style={iconContainerStyle}>
          {getCategoryIcon()}
        </div>
        <div style={contentStyle}>
          <h3 style={titleStyle}>{category.name}</h3>
          <p style={descriptionStyle}>
            {category.description}
          </p>
          <div>
            <span style={badgeStyle}>
              {visibleOptionsCount} opsi tersedia
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem; 