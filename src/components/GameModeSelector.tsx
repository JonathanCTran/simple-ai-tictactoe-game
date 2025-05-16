
import { GameMode } from '@/utils/gameLogic';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface GameModeSelectorProps {
  gameMode: GameMode;
  onChange: (gameMode: GameMode) => void;
}

const GameModeSelector = ({ gameMode, onChange }: GameModeSelectorProps) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-medium mb-2">Game Mode</h3>
      <RadioGroup 
        value={gameMode} 
        onValueChange={(value) => onChange(value as GameMode)}
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={GameMode.AI} id="ai" />
          <Label htmlFor="ai">Play vs AI</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={GameMode.MULTIPLAYER} id="multiplayer" />
          <Label htmlFor="multiplayer">Two Players</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default GameModeSelector;
