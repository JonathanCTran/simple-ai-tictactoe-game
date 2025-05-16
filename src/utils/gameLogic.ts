// Game difficulty levels
export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

// Game modes
export enum GameMode {
  AI = 'ai',
  MULTIPLAYER = 'multiplayer'
}

// Player types
export type Player = 'X' | 'O' | null;

// Game board type
export type Board = (Player)[];

// Check if there's a winner
export const checkWinner = (squares: Board): Player => {
  // Winning combinations
  const lines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal
    [2, 4, 6], // diagonal
  ];

  // Check each winning combination
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  // Check if it's a draw
  if (!squares.includes(null)) {
    return null;
  }

  // Game is still ongoing
  return null;
};

// Check if the game is a draw
export const checkDraw = (squares: Board): boolean => {
  return !squares.includes(null) && !checkWinner(squares);
};

// AI move calculation
export const calculateAIMove = (squares: Board, difficulty: Difficulty, aiPlayer: Player): number => {
  // If the board is already full or there's a winner, return -1
  if (checkWinner(squares) || !squares.includes(null)) {
    return -1;
  }

  // Get available moves
  const availableMoves = squares
    .map((square, index) => (square === null ? index : null))
    .filter((index): index is number => index !== null);

  // Easy difficulty: random move
  if (difficulty === Difficulty.EASY) {
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  const humanPlayer = aiPlayer === 'X' ? 'O' : 'X';

  // Medium difficulty: block opponent's winning move or make winning move if available
  if (difficulty === Difficulty.MEDIUM) {
    // Check if AI can win in the next move
    for (const move of availableMoves) {
      const boardCopy = [...squares];
      boardCopy[move] = aiPlayer;
      if (checkWinner(boardCopy) === aiPlayer) {
        return move;
      }
    }

    // Check if opponent can win in the next move and block
    for (const move of availableMoves) {
      const boardCopy = [...squares];
      boardCopy[move] = humanPlayer;
      if (checkWinner(boardCopy) === humanPlayer) {
        return move;
      }
    }

    // If center is available, take it
    if (availableMoves.includes(4)) {
      return 4;
    }

    // Otherwise make a random move
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  // Hard difficulty: Minimax algorithm
  // Minimax algorithm for unbeatable AI
  const minimax = (board: Board, depth: number, isMaximizing: boolean): number => {
    // Check terminal states
    const winner = checkWinner(board);
    
    if (winner === aiPlayer) return 10 - depth;
    if (winner === humanPlayer) return depth - 10;
    if (!board.includes(null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = aiPlayer;
          const score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = humanPlayer;
          const score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  let bestScore = -Infinity;
  let bestMove = availableMoves[0]; // Default to first available move

  // Find the best move using minimax
  for (const move of availableMoves) {
    const boardCopy = [...squares];
    boardCopy[move] = aiPlayer;
    const score = minimax(boardCopy, 0, false);
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
};
