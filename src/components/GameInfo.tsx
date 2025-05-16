
import { Player } from '@/utils/gameLogic';
import { X, Circle } from 'lucide-react';

interface GameInfoProps {
  status: string;
  xScore: number;
  oScore: number;
  draws: number;
  currentPlayer: Player;
}

const GameInfo = ({ status, xScore, oScore, draws, currentPlayer }: GameInfoProps) => {
  return (
    <div className="mb-6 text-center">
      <div className="flex justify-center items-center mb-2">
        <span className="text-xl font-bold mr-2">Current Turn:</span>
        {currentPlayer === 'X' ? (
          <X className="text-game-x-color w-6 h-6" />
        ) : (
          <Circle className="text-game-o-color w-6 h-6" />
        )}
      </div>
      
      <p className="text-lg font-medium mb-4">{status}</p>
      
      <div className="flex justify-center space-x-8">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <X className="text-game-x-color w-5 h-5 mr-1" />
            <span className="font-medium">Score:</span>
          </div>
          <p className="text-xl font-bold">{xScore}</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center">
            <span className="font-medium">Draws:</span>
          </div>
          <p className="text-xl font-bold">{draws}</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center">
            <Circle className="text-game-o-color w-5 h-5 mr-1" />
            <span className="font-medium">Score:</span>
          </div>
          <p className="text-xl font-bold">{oScore}</p>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
