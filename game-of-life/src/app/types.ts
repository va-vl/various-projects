import type React from 'react';

export type ControlsProps = {
  fieldSize: number;
  isRunning: boolean;
  onFieldSizeChange: React.Dispatch<React.SetStateAction<number>>;
  onToggleRunning: React.Dispatch<React.SetStateAction<boolean>>;
};
