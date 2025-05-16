
import { Difficulty } from '@/utils/gameLogic';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

const DifficultySelector = ({ difficulty, onChange }: DifficultySelectorProps) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-medium mb-2">AI Difficulty</h3>
      <RadioGroup 
        value={difficulty} 
        onValueChange={(value) => onChange(value as Difficulty)}
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={Difficulty.EASY} id="easy" />
          <Label htmlFor="easy">Easy</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={Difficulty.MEDIUM} id="medium" />
          <Label htmlFor="medium">Medium</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={Difficulty.HARD} id="hard" />
          <Label htmlFor="hard">Hard</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default DifficultySelector;
