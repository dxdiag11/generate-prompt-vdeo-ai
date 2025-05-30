import React from 'react';
import { DisplayMode, PromptCategory } from '../types';

interface CategorySelectorProps {
  categories: PromptCategory[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  mode: DisplayMode;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  mode
}) => {
  // Mendapatkan warna aksen berdasarkan kategori
  const getCategoryAccentColor = (categoryId: string) => {
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

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'subject-action':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        );
      case 'environment-atmosphere':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path>
          </svg>
        );
      case 'cinematography':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
            <circle cx="12" cy="13" r="3"></circle>
          </svg>
        );
      case 'audio':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v18"></path><path d="M8 7v10"></path><path d="M16 7v10"></path><path d="M4 11v2"></path><path d="M20 11v2"></path>
          </svg>
        );
      case 'technical':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path>
            <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"></path>
            <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  const getFilteredOptions = (category: PromptCategory) => {
    if (mode === 'basic') {
      return category.options.filter(option => option.category === 'basic');
    }
    return category.options;
  };
  
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.75rem',
      width: '100%',
      borderRadius: '0.5rem',
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      padding: '1rem'
    },
    categoryItem: {
      padding: '1rem',
      borderRadius: '0.5rem',
      backgroundColor: '#ffffff',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.2s ease',
      border: '1px solid #E5E7EB'
    },
    activeCategoryItem: {
      backgroundColor: '#F9FAFB',
      borderLeft: '4px solid',
    },
    categoryIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      borderRadius: '0.375rem',
      marginRight: '1rem',
      flexShrink: 0
    },
    categoryContent: {
      flex: '1',
    },
    categoryHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.25rem'
    },
    categoryTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#111827',
      marginRight: '0.5rem'
    },
    categoryDescription: {
      fontSize: '0.875rem',
      color: '#6B7280',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical' as const,
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    optionsCount: {
      display: 'inline-block',
      padding: '0.125rem 0.5rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '500',
      color: '#6B7280',
      backgroundColor: '#F3F4F6'
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151', margin: '0 0 0.5rem 0' }}>Kategori</h3>
      {categories.map((category) => {
        const isActive = selectedCategory === category.id;
        const filteredOptions = getFilteredOptions(category);
        const accentColor = getCategoryAccentColor(category.id);
        
        return (
          <div
            key={category.id}
            style={{
              ...styles.categoryItem,
              ...(isActive ? { 
                ...styles.activeCategoryItem,
                borderLeftColor: accentColor,
                backgroundColor: accentColor + '10'
              } : {})
            }}
            onClick={() => onSelectCategory(category.id)}
          >
            <div 
              style={{
                ...styles.categoryIcon,
                color: accentColor,
                backgroundColor: isActive ? accentColor + '20' : '#F9FAFB'
              }}
            >
              {getCategoryIcon(category.id)}
            </div>
            <div style={styles.categoryContent}>
              <div style={styles.categoryHeader}>
                <div style={styles.categoryTitle}>{category.name}</div>
                <div style={styles.optionsCount}>
                  {filteredOptions.length} opsi tersedia
                </div>
              </div>
              <div style={styles.categoryDescription}>{category.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategorySelector; 