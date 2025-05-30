import React from 'react';
import Switch from 'react-switch';
import { DisplayMode } from '../types';

interface ModeToggleProps {
  mode: DisplayMode;
  onChange: (mode: DisplayMode) => void;
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    padding: '0.5rem 0.75rem'
  },
  innerContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginRight: '0.75rem'
  },
  switchContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  switchLabel: (isActive: boolean) => ({
    marginRight: '0.5rem',
    marginLeft: '0.5rem',
    fontSize: '0.875rem',
    color: isActive ? '#3B82F6' : '#9CA3AF',
    fontWeight: isActive ? '500' : '400'
  })
};

const ModeToggle: React.FC<ModeToggleProps> = ({ mode, onChange }) => {
  const isAdvanced = mode === 'advanced';

  const handleChange = (checked: boolean) => {
    onChange(checked ? 'advanced' : 'basic');
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <span style={styles.label}>Mode:</span>
        
        <div style={styles.switchContainer}>
          <span style={styles.switchLabel(!isAdvanced)}>
            Basic
          </span>
          <Switch
            checked={isAdvanced}
            onChange={handleChange}
            onColor="#3B82F6"
            offColor="#D1D5DB"
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
          <span style={styles.switchLabel(isAdvanced)}>
            Advanced
          </span>
        </div>
      </div>
    </div>
  );
};

export default ModeToggle; 