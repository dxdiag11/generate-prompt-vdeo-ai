'use client';

import React, { useState, useEffect } from 'react';
import { promptCategories } from '@/src/data/promptCategories';
import { generatePrompt } from '@/src/utils/promptGenerator';
import { AudioSettings as AudioSettingsType, DisplayMode, PromptSelection, TechnicalParameters } from '@/src/types';
import ModeToggle from '@/src/components/ModeToggle';
import CategoryItem from '@/src/components/CategoryItem';
import CategoryOptions from '@/src/components/CategoryOptions';
import GeneratedPrompt from '@/src/components/GeneratedPrompt';
import AudioSettingsComp from '@/src/components/AudioSettings';

const styles = {
  mainContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #F3F4F6 0%, #E5E7EB 100%)',
    padding: '1rem'
  },
  contentWrapper: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  headerCard: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    padding: '1.5rem',
    marginBottom: '2rem'
  },
  headerFlex: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    marginBottom: '1rem'
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#111827',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.25rem'
  },
  titleIcon: {
    backgroundColor: '#3B82F6',
    color: 'white',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    marginRight: '0.75rem'
  },
  subtitle: {
    color: '#6B7280',
    fontSize: '0.875rem',
    paddingLeft: '3.25rem'
  },
  divider: {
    height: '0.25rem',
    width: '100%',
    background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 50%, #8B5CF6 100%)',
    borderRadius: '9999px',
    marginBottom: '2rem'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.5rem'
  },
  sidebarTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#1F2937',
    display: 'flex',
    alignItems: 'center'
  },
  sidebarIcon: {
    marginRight: '0.5rem',
    color: '#3B82F6'
  },
  categoriesContainer: {
    overflowY: 'auto' as const,
    paddingRight: '0.5rem',
    maxHeight: 'calc(100vh - 300px)'
  },
  mainContent: {
    gridColumn: 'span 3'
  },
  footer: {
    textAlign: 'center' as const,
    color: '#6B7280',
    fontSize: '0.875rem',
    padding: '1rem 0'
  }
};

export default function Home() {
  const [mode, setMode] = useState<DisplayMode>('basic');
  const [activeCategory, setActiveCategory] = useState<string>(promptCategories[0].id);
  const [selection, setSelection] = useState<PromptSelection>({});
  const [audioSettings, setAudioSettings] = useState<AudioSettingsType>({
    dialogVolume: 50,
    musicVolume: 50,
    sfxVolume: 50,
    overallVolume: 50,
    equalizer: false,
    compression: false,
    reverb: false,
    spatialAudio: false,
  });
  const [technicalParams, setTechnicalParams] = useState<TechnicalParameters>({
    resolution: '1080p',
    aspectRatio: '16:9',
    fps: 30,
    duration: '10-15 detik',
    negativePrompt: '',
  });
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isWideScreen, setIsWideScreen] = useState(false);

  // Check window width on client side only
  useEffect(() => {
    setIsWideScreen(window.innerWidth > 1024);
    
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate prompt setiap kali selection, audioSettings, atau technicalParams berubah
  useEffect(() => {
    const prompt = generatePrompt(selection, audioSettings, technicalParams);
    setGeneratedPrompt(prompt);
  }, [selection, audioSettings, technicalParams]);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleOptionChange = (categoryId: string, optionId: string, value: string | boolean | number) => {
    setSelection(prev => ({
      ...prev,
      [categoryId]: {
        ...(prev[categoryId] || {}),
        [optionId]: value,
      },
    }));
  };

  const handleTechnicalParamChange = (paramId: keyof TechnicalParameters, value: string | number) => {
    setTechnicalParams(prev => ({
      ...prev,
      [paramId]: value,
    }));
  };

  const activeOptions = promptCategories.find(cat => cat.id === activeCategory);

  return (
    <main style={styles.mainContainer}>
      <div style={styles.contentWrapper}>
        <div style={styles.headerCard}>
          <div style={styles.headerFlex}>
            <div>
              <h1 style={styles.title}>
                <span style={styles.titleIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.5rem', width: '1.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </span>
                Generator Prompt Veo 3
              </h1>
              <p style={styles.subtitle}>
                Buat prompt terstruktur dan detail untuk video AI dengan mudah
              </p>
            </div>
            <ModeToggle mode={mode} onChange={setMode} />
          </div>
          
          <div style={styles.divider}></div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isWideScreen ? '1fr 3fr' : '1fr',
            gap: '1.5rem' 
          }}>
            <div>
              <h2 style={styles.sidebarTitle}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.25rem', width: '1.25rem', marginRight: '0.5rem', color: '#3B82F6' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Kategori
              </h2>
              <div style={styles.categoriesContainer} className="custom-scrollbar">
                {promptCategories.map((category) => (
                  <CategoryItem
                    key={category.id}
                    category={category}
                    isActive={activeCategory === category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    mode={mode}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 style={styles.sidebarTitle}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.25rem', width: '1.25rem', marginRight: '0.5rem', color: '#3B82F6' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Opsi
              </h2>
              
              <div style={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' as const, paddingRight: '0.5rem' }} className="custom-scrollbar">
                {activeOptions && (
                  <CategoryOptions
                    category={activeOptions}
                    selection={selection}
                    onOptionChange={handleOptionChange}
                    mode={mode}
                  />
                )}
                
                {activeCategory === 'audio' && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <AudioSettingsComp
                      settings={audioSettings}
                      onSettingsChange={setAudioSettings}
                    />
                  </div>
                )}
                
                {activeCategory === 'technical' && (
                  <div style={{ 
                    marginTop: '1.5rem',
                    padding: '1rem',
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    border: '1px solid #e5e7eb'
                  }}>
                    <h3 style={{
                      fontWeight: '500',
                      fontSize: '1.125rem',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.25rem', width: '1.25rem', marginRight: '0.5rem', color: '#EF4444' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                      Negative Prompt
                    </h3>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      <textarea
                        value={technicalParams.negativePrompt}
                        onChange={(e) => handleTechnicalParamChange('negativePrompt', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.375rem',
                          outline: 'none',
                          backgroundColor: '#FEF2F2',
                          fontSize: '0.875rem'
                        }}
                        rows={3}
                        placeholder="Masukkan hal-hal yang tidak ingin muncul dalam video..."
                      />
                    </div>
                  </div>
                )}
                
                <GeneratedPrompt prompt={generatedPrompt} />
              </div>
            </div>
          </div>
        </div>
        
        <footer style={styles.footer}>
          &copy; {new Date().getFullYear()} Generator Prompt Veo 3 | Made by Fabio Viandino with 🔥
        </footer>
      </div>
    </main>
  );
}
