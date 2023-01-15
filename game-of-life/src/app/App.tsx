/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import Field from './Field';
import Controls from './Controls';

const App = () => {
  const [fieldSize, setFieldSize] = useState(20);
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div>
      <Controls
        fieldSize={fieldSize}
        isRunning={isRunning}
        onFieldSizeChange={setFieldSize}
        onToggleRunning={setIsRunning}
      />
      <Field fieldSize={fieldSize} isRunning={isRunning} />
    </div>
  );
};

export default App;
