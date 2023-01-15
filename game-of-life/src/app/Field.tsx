import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { ControlsProps } from './types';

type CellState = 1 | 0;
type FieldProps = Omit<ControlsProps, 'onFieldSizeChange' | 'onToggleRunning'>;

const Field: React.FunctionComponent<FieldProps> = ({
  fieldSize,
  isRunning,
}) => {
  const [field, setField] = useState<CellState[][]>([[]]);
  const [generation, setGeneration] = useState(0);
  const running = useRef<number | undefined>(undefined);

  const onFieldClick = useCallback(
    (rowIndex: number, columnIndex: number) => {
      if (isRunning) {
        return;
      }

      setField((currentField) => {
        const currentRow = currentField[rowIndex];
        const currentValue = currentRow[columnIndex];
        return [
          ...currentField.slice(0, rowIndex),
          [
            ...currentRow.slice(0, columnIndex),
            Number(!currentValue) as CellState,
            ...currentRow.slice(columnIndex + 1),
          ],
          ...currentField.slice(rowIndex + 1),
        ];
      });
    },
    [isRunning]
  );

  const run = useCallback(() => {
    running.current = window.setInterval(() => {
      setField((currentField) =>
        currentField.map((row, rowIndex) =>
          row.map((cell, columnIndex) => {
            const liveNeighborsCount = [
              currentField[rowIndex - 1]?.[columnIndex - 1],
              currentField[rowIndex - 1]?.[columnIndex],
              currentField[rowIndex - 1]?.[columnIndex + 1],
              currentField[rowIndex]?.[columnIndex - 1],
              currentField[rowIndex]?.[columnIndex + 1],
              currentField[rowIndex + 1]?.[columnIndex - 1],
              currentField[rowIndex + 1]?.[columnIndex],
              currentField[rowIndex + 1]?.[columnIndex + 1],
            ].reduce((sum: number, value) => sum + (value ?? 0), 0);

            return Number(
              cell
                ? liveNeighborsCount === 2 || liveNeighborsCount === 3
                : liveNeighborsCount === 3
            ) as CellState;
          })
        )
      );
      setGeneration((current) => current + 1);
    }, 2000);
  }, []);

  const stop = useCallback(() => {
    clearInterval(running.current);
    running.current = undefined;
    setField(
      [...new Array(fieldSize)].map(() => [...new Array(fieldSize)].fill(0))
    );
    setGeneration(0);
  }, [fieldSize]);

  useEffect(() => {
    if (!isRunning) {
      stop();
    } else {
      run();
    }
  }, [run, stop, isRunning]);

  return (
    <div>
      <p>Generation: {generation}</p>
      {field.map((row, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: 'flex',
          }}
        >
          {row?.map((cell, columnIndex) => (
            <div
              key={columnIndex}
              onClick={() => {
                onFieldClick(rowIndex, columnIndex);
              }}
              style={{
                minWidth: '40px',
                minHeight: '40px',
                margin: '2px',
                backgroundColor: cell ? 'limegreen' : 'whitesmoke',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Field;
