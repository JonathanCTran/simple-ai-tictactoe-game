
import { useState, useEffect } from 'react';
import Square from './Square';
import { Board as BoardType, Player, checkWinner } from '@/utils/gameLogic';

interface BoardProps {
  squares: BoardType;
  onClick: (i: number) => void;
}

const Board = ({ squares, onClick }: BoardProps) => {
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  // Check for winning line
  useEffect(() => {
    const winner = checkWinner(squares);
    if (winner) {
      // Find the winning line
      const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
      ];

      for (const line of lines) {
        const [a, b, c] = line;
        if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c]
        ) {
          setWinningLine(line);
          return;
        }
      }
    } else {
      setWinningLine(null);
    }
  }, [squares]);

  const renderSquare = (i: number) => {
    return (
      <Square 
        value={squares[i]} 
        onClick={() => onClick(i)}
        isWinningSquare={winningLine?.includes(i) || false}
      />
    );
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="grid grid-cols-3 gap-2 w-full aspect-square">
        {Array(9).fill(null).map((_, i) => (
          <div key={i} className="w-full aspect-square">
            {renderSquare(i)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
