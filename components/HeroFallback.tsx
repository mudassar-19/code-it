export default function HeroFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-teal/30 blur-3xl" />
      <div className="absolute -bottom-32 -left-16 h-[24rem] w-[24rem] rounded-full bg-navy/20 blur-3xl" />
      <div className="absolute right-1/3 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-orange/10 blur-3xl" />
    </div>
  );
}
