export default function PromptChips({ chips, onPick }: { chips: string[]; onPick: (chip: string) => void }) {
  return (
    <div className="prompt-chips">
      {chips.map((chip) => (
        <button key={chip} onClick={() => onPick(chip)}>
          {chip}
        </button>
      ))}
    </div>
  );
}
