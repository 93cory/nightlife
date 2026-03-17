export default function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-[60px] h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-5 ${className}`}
    />
  );
}
