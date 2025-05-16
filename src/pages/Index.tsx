
import TicTacToe from '@/components/TicTacToe';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-game-light-purple/30 flex flex-col">
      <main className="flex-1 container">
        <TicTacToe />
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Tic Tac Toe Game</p>
      </footer>
    </div>
  );
};

export default Index;
