import React, { useState, useRef } from 'react';

interface GeneratedPromptProps {
  prompt: string;
}

const GeneratedPrompt: React.FC<GeneratedPromptProps> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  
  const handleCopy = () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        // Menggunakan Clipboard API jika tersedia dan dalam konteks aman
        navigator.clipboard.writeText(prompt)
          .then(() => {
            setCopied(true);
            setCopyError(false);
            setTimeout(() => setCopied(false), 2000);
          })
          .catch(err => {
            console.error('Gagal menyalin teks:', err);
            useFallbackCopy();
          });
      } else {
        // Fallback untuk browser yang tidak mendukung Clipboard API
        useFallbackCopy();
      }
    } catch (err) {
      console.error('Error saat menyalin:', err);
      setCopyError(true);
      setTimeout(() => setCopyError(false), 2000);
    }
  };
  
  const useFallbackCopy = () => {
    try {
      // Buat elemen temporary untuk selection dan copy
      const textArea = document.createElement('textarea');
      textArea.value = prompt;
      
      // Sembunyikan textarea tetapi tetap masukkan ke DOM
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      
      // Pilih dan salin teks
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      
      // Hapus elemen temporary
      document.body.removeChild(textArea);
      
      if (successful) {
        setCopied(true);
        setCopyError(false);
        setTimeout(() => setCopied(false), 2000);
      } else {
        setCopyError(true);
        setTimeout(() => setCopyError(false), 2000);
      }
    } catch (err) {
      console.error('Fallback copy gagal:', err);
      setCopyError(true);
      setTimeout(() => setCopyError(false), 2000);
    }
  };

  // Fungsi untuk pemilihan manual teks (untuk prompt yang panjang)
  const selectText = () => {
    if (textRef.current) {
      const range = document.createRange();
      range.selectNodeContents(textRef.current);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  const styles = {
    container: {
      marginTop: '2rem'
    },
    gradientCard: {
      background: 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
      padding: '0.25rem',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    },
    contentCard: {
      backgroundColor: 'white',
      borderRadius: '0.375rem',
      padding: '1.5rem'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    },
    title: {
      fontWeight: 'bold',
      fontSize: '1.25rem',
      color: '#1F2937',
      display: 'flex',
      alignItems: 'center'
    },
    titleIcon: {
      marginRight: '0.5rem',
      color: '#3B82F6'
    },
    buttonGroup: {
      display: 'flex',
      gap: '0.5rem'
    },
    selectButton: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.375rem 0.75rem',
      backgroundColor: '#F3F4F6',
      color: '#4B5563',
      borderRadius: '0.375rem',
      border: 'none',
      fontSize: '0.875rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    selectButtonIcon: {
      marginRight: '0.25rem'
    },
    copyButton: (state: 'default' | 'success' | 'error') => {
      const baseStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '0.375rem 0.75rem',
        borderRadius: '0.375rem',
        border: 'none',
        fontSize: '0.875rem',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
      };

      if (state === 'success') {
        return {
          ...baseStyle,
          backgroundColor: '#10B981',
          color: 'white'
        };
      }

      if (state === 'error') {
        return {
          ...baseStyle,
          backgroundColor: '#EF4444',
          color: 'white'
        };
      }

      return {
        ...baseStyle,
        backgroundColor: '#3B82F6',
        color: 'white'
      };
    },
    copyButtonIcon: {
      marginRight: '0.25rem'
    },
    promptContainer: {
      padding: '1rem',
      backgroundColor: '#F9FAFB',
      border: '1px solid #E5E7EB',
      borderRadius: '0.375rem'
    },
    promptText: {
      whiteSpace: 'pre-wrap' as const,
      wordBreak: 'break-word' as const,
      color: '#1F2937',
      cursor: 'text',
      fontFamily: 'monospace',
      fontSize: '0.875rem',
      lineHeight: '1.5'
    },
    errorMessage: {
      marginTop: '1rem',
      padding: '0.75rem',
      backgroundColor: '#FEF2F2',
      border: '1px solid #FEE2E2',
      borderRadius: '0.375rem',
      display: 'flex',
      alignItems: 'flex-start'
    },
    errorIcon: {
      color: '#EF4444',
      marginRight: '0.5rem',
      flexShrink: 0,
      marginTop: '0.125rem'
    },
    errorText: {
      fontSize: '0.875rem',
      color: '#B91C1C'
    },
    charCount: {
      marginTop: '1rem',
      textAlign: 'right' as const,
      fontSize: '0.75rem',
      color: '#6B7280'
    }
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.gradientCard}>
        <div style={styles.contentCard}>
          <div style={styles.header}>
            <h3 style={styles.title}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                style={{ ...styles.titleIcon, height: '1.5rem', width: '1.5rem' }} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                />
              </svg>
              Prompt yang Dihasilkan
            </h3>
            <div style={styles.buttonGroup}>
              <button
                onClick={selectText}
                style={styles.selectButton}
                title="Pilih semua teks"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  style={{ ...styles.selectButtonIcon, height: '1rem', width: '1rem' }} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" 
                  />
                </svg>
                Pilih
              </button>
              <button
                onClick={handleCopy}
                style={styles.copyButton(copied ? 'success' : copyError ? 'error' : 'default')}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  style={{ ...styles.copyButtonIcon, height: '1rem', width: '1rem' }} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                  />
                </svg>
                {copied ? 'Tersalin!' : copyError ? 'Gagal' : 'Salin'}
              </button>
            </div>
          </div>
          
          <div style={styles.promptContainer}>
            <p 
              ref={textRef}
              style={styles.promptText}
              onClick={selectText}
            >
              {prompt || 'Belum ada prompt yang dihasilkan. Pilih opsi untuk memulai.'}
            </p>
          </div>

          {copyError && (
            <div style={styles.errorMessage}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                style={{ ...styles.errorIcon, height: '1.25rem', width: '1.25rem' }} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <p style={styles.errorText}>
                Tidak dapat menyalin teks secara otomatis. Silakan gunakan tombol Pilih lalu salin secara manual (Ctrl+C/Cmd+C).
              </p>
            </div>
          )}
          
          {prompt && (
            <div style={styles.charCount}>
              {prompt.length} karakter
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratedPrompt; 