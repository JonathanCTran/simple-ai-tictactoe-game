
import { useState, useEffect } from 'react';
import Board from './Board';
import GameInfo from './GameInfo';
import DifficultySelector from './DifficultySelector';
import GameModeSelector from './GameModeSelector';
import { Button } from '@/components/ui/button';
import { 
  Board as BoardType, 
  Player, 
  Difficulty, 
  GameMode, 
  checkWinner, 
  checkDraw, 
  calculateAIMove 
} from '@/utils/gameLogic';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const TicTacToe = () => {
  // Game state
  const [history, setHistory] = useState<{ squares: BoardType }[]>([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [scores, setScores] = useState({ x: 0, o: 0, draws: 0 });
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.AI);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.MEDIUM);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [player1IsX, setPlayer1IsX] = useState<boolean>(true); // Keep track of which player is X

  const current = history[stepNumber];
  const winner = checkWinner(current.squares);
  const isDraw = checkDraw(current.squares);

  // Game status
  let status: string;
  if (winner) {
    const winnerText = player1IsX ? 
      (winner === 'X' ? 'Player 1 wins!' : 'Player 2 wins!') :
      (winner === 'X' ? 'Player 2 wins!' : 'Player 1 wins!');
    status = `Winner: ${winnerText}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    const nextPlayerText = player1IsX ?
      (xIsNext ? 'Player 1' : 'Player 2') :
      (xIsNext ? 'Player 2' : 'Player 1');
    status = `Next player: ${nextPlayerText}`;
  }

  // Handle AI moves
  useEffect(() => {
    if (gameMode === GameMode.AI && !xIsNext && !winner && !isDraw) {
      const timer = setTimeout(() => {
        const aiMove = calculateAIMove(current.squares, difficulty, 'O');
        if (aiMove !== -1) {
          handleClick(aiMove);
        }
      }, 500); // Small delay for better UX

      return () => clearTimeout(timer);
    }
  }, [xIsNext, winner, isDraw, gameMode, difficulty, current.squares]);

  // Update scores when game ends
  useEffect(() => {
    if (winner || isDraw) {
      setGameOver(true);
      
      if (winner === 'X') {
        setScores(prev => ({ ...prev, x: prev.x + 1 }));
        // Player who wins gets to be X in the next game
        setPlayer1IsX(player1IsX);
        toast.success(player1IsX ? 'Player 1 wins!' : 'Player 2 wins!');
      } else if (winner === 'O') {
        setScores(prev => ({ ...prev, o: prev.o + 1 }));
        // Player who wins gets to be X in the next game
        setPlayer1IsX(!player1IsX);
        toast.success(player1IsX ? 'Player 2 wins!' : 'Player 1 wins!');
      } else if (isDraw) {
        setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
        // In case of a draw, switch players
        setPlayer1IsX(!player1IsX);
        toast.info("It's a draw!");
      }
    }
  }, [winner, isDraw, player1IsX]);

  const handleClick = (i: number) => {
    const historyCopy = history.slice(0, stepNumber + 1);
    const currentSquares = [...current.squares];

    // Return if the square is filled or game is over
    if (currentSquares[i] || checkWinner(currentSquares) || checkDraw(currentSquares)) {
      return;
    }

    // Make the move
    currentSquares[i] = xIsNext ? 'X' : 'O';

    // Update state
    setHistory([...historyCopy, { squares: currentSquares }]);
    setStepNumber(historyCopy.length);
    setXIsNext(!xIsNext);
    setGameOver(false);
  };

  const startNewGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
    setGameOver(false);
    // Note: We don't reset player1IsX here, as it should persist between games
  };

  const handleGameModeChange = (mode: GameMode) => {
    setGameMode(mode);
    startNewGame();
    // Reset player assignments when changing game mode
    setPlayer1IsX(true);
  };

  const handleDifficultyChange = (diff: Difficulty) => {
    setDifficulty(diff);
    if (gameMode === GameMode.AI) {
      startNewGame();
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-game-purple">Tic Tac Toe</h1>
      
      {/* Game Options */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
        <GameModeSelector gameMode={gameMode} onChange={handleGameModeChange} />
        {gameMode === GameMode.AI && (
          <DifficultySelector difficulty={difficulty} onChange={handleDifficultyChange} />
        )}
      </div>
      
      {/* Game Info */}
      <GameInfo 
        status={status} 
        xScore={scores.x} 
        oScore={scores.o} 
        draws={scores.draws}
        currentPlayer={xIsNext ? 'X' : 'O'}
      />
      
      {/* Game Board */}
      <div className="mb-6">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      
      {/* Game Controls */}
      <div className="flex justify-center">
        <Button 
          variant="outline"
          className="flex items-center gap-2 border-game-purple text-game-dark-purple hover:bg-game-light-purple/50"
          onClick={startNewGame}
        >
          <RefreshCw size={16} />
          New Game
        </Button>
      </div>
    </div>
  );
};

export default TicTacToe;
