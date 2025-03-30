
interface SkillItemProps {
  name: string;
  level: number; // 1-10
  delay?: number;
}

const SkillItem = ({ name, level, delay = 0 }: SkillItemProps) => {
  const percentage = level * 10;
  
  return (
    <div className="opacity-0 animate-slide-up" style={{ animationDelay: `${delay}s` }}>
      <div className="flex justify-between items-center mb-1">
        <span className="font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{percentage}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className="bg-black h-full transition-all duration-1000 ease-out"
          style={{ 
            width: '0%',
            animation: `expandWidth ${1}s ease-out ${delay + 0.3}s forwards`,
            // Define the keyframes animation directly with CSS variables
            animationName: 'expandWidth',
          }}
        ></div>
      </div>
      <style>
        {`
          @keyframes expandWidth {
            from { width: 0%; }
            to { width: ${percentage}%; }
          }
        `}
      </style>
    </div>
  );
};

export default SkillItem;
