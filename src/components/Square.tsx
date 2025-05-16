
import { Player } from '@/utils/gameLogic';
import { cn } from '@/lib/utils';
import { X, Circle } from 'lucide-react';

interface SquareProps {
  value: Player;
  onClick: () => void;
  isWinningSquare?: boolean;
}

const Square = ({ value, onClick, isWinningSquare = false }: SquareProps) => {
  return (
    <button 
      className={cn(
        "w-full h-full aspect-square flex items-center justify-center border-2 border-game-purple/30 text-3xl font-bold rounded-md", 
        "transition-all duration-150 hover:bg-game-light-purple/50",
        isWinningSquare ? "bg-game-light-purple" : "bg-white/50",
      )}
      onClick={onClick}
    >
      {value === 'X' && <X className="text-game-x-color animate-pop w-8 h-8" />}
      {value === 'O' && <Circle className="text-game-o-color animate-pop w-8 h-8" />}
    </button>
  );
};

export default Square;
