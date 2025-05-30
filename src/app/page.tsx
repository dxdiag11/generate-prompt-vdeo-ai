'use client';

import React, { useState, useEffect } from 'react';
import { promptCategories } from '../data/promptCategories';
import { DisplayMode, PromptCategory, PromptSelection } from '../types';
import CategorySelector from '../components/CategorySelector';
import CategoryOptions from '../components/CategoryOptions';

export default function Home() {
  const [displayMode, setDisplayMode] = useState<DisplayMode>('basic');
  const [selectedCategory, setSelectedCategory] = useState<string>('subject-action');
  const [promptSelections, setPromptSelections] = useState<PromptSelection>({});
  const [selectedCategoryObj, setSelectedCategoryObj] = useState<PromptCategory | null>(null);

  useEffect(() => {
    // Inisialisasi prompt selections
    const initialSelections: PromptSelection = {};
    promptCategories.forEach(category => {
      initialSelections[category.id] = {};
      category.options.forEach(option => {
        if (option.value !== undefined) {
          initialSelections[category.id][option.id] = option.value;
        } else {
          initialSelections[category.id][option.id] = '';
        }
      });
    });
    setPromptSelections(initialSelections);
  }, []);

  useEffect(() => {
    // Update selectedCategoryObj ketika selectedCategory berubah
    const categoryObj = promptCategories.find(cat => cat.id === selectedCategory);
    if (categoryObj) {
      setSelectedCategoryObj(categoryObj);
    }
  }, [selectedCategory]);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleOptionChange = (categoryId: string, optionId: string, value: string | boolean | number) => {
    setPromptSelections(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [optionId]: value
      }
    }));
  };

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '1.5rem'
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '0.5rem',
            backgroundColor: '#3B82F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
              <path d="M12 2v7"></path>
              <path d="M9 9h6"></path>
            </svg>
          </div>
          <div>
            <h1 style={{ 
              margin: 0, 
              fontSize: '1.5rem', 
              fontWeight: '700',
              color: '#111827'
            }}>
              Generator Prompt Veo 3
            </h1>
            <p style={{ 
              margin: '0.25rem 0 0 0', 
              fontSize: '0.875rem', 
              color: '#6B7280' 
            }}>
              Buat prompt terstruktur dan detail untuk video AI dengan mudah
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>Mode:</span>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.25rem',
            backgroundColor: '#F3F4F6',
            borderRadius: '9999px'
          }}>
            <span style={{ 
              padding: '0.375rem 0.75rem',
              borderRadius: '9999px',
              fontWeight: '500',
              fontSize: '0.875rem',
              backgroundColor: displayMode === 'basic' ? 'white' : 'transparent',
              color: displayMode === 'basic' ? '#111827' : '#6B7280',
              boxShadow: displayMode === 'basic' ? '0 1px 2px rgba(0, 0, 0, 0.05)' : 'none',
              cursor: 'pointer'
            }} onClick={() => setDisplayMode('basic')}>
              Basic
            </span>
            <span style={{ 
              padding: '0.375rem 0.75rem',
              borderRadius: '9999px',
              fontWeight: '500',
              fontSize: '0.875rem',
              backgroundColor: displayMode === 'advanced' ? 'white' : 'transparent',
              color: displayMode === 'advanced' ? '#111827' : '#6B7280',
              boxShadow: displayMode === 'advanced' ? '0 1px 2px rgba(0, 0, 0, 0.05)' : 'none',
              cursor: 'pointer'
            }} onClick={() => setDisplayMode('advanced')}>
              Advanced
            </span>
          </div>
        </div>
      </header>

      {/* Divider */}
      <div style={{ 
        height: '2px', 
        backgroundColor: '#E5E7EB', 
        marginBottom: '1.5rem',
        borderRadius: '9999px'
      }}></div>

      {/* Main Content */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
        gap: '1.5rem',
        height: 'calc(100vh - 140px)',
        overflow: 'hidden'
      }}>
        {/* Category Selector */}
        <div style={{ overflowY: 'auto' }}>
          <CategorySelector
            categories={promptCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            mode={displayMode}
          />
        </div>

        {/* Category Options */}
        <div style={{ overflowY: 'auto' }}>
          {selectedCategoryObj && (
            <CategoryOptions
              category={selectedCategoryObj}
              selection={promptSelections}
              onOptionChange={handleOptionChange}
              mode={displayMode}
            />
          )}
        </div>
      </div>
    </main>
  );
} 