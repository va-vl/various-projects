import React from 'react';
//
import type { ControlsProps } from './types';

const Controls: React.FunctionComponent<ControlsProps> = ({
  fieldSize,
  isRunning,
  onFieldSizeChange,
  onToggleRunning,
}) => (
  <div>
    <p>
      <label htmlFor="input">
        <input
          disabled={isRunning}
          id="input"
          max="30"
          min="10"
          type="range"
          value={fieldSize}
          onChange={(event) => {
            onFieldSizeChange(Number(event.target.value));
          }}
        />
        Size: {fieldSize}
      </label>
    </p>
    <p>
      <button
        disabled={isRunning}
        type="button"
        onClick={() => {
          onToggleRunning(true);
        }}
      >
        Start
      </button>
      <button
        disabled={!isRunning}
        type="button"
        onClick={() => {
          onToggleRunning(false);
        }}
      >
        Reset
      </button>
    </p>
  </div>
);

export default Controls;
