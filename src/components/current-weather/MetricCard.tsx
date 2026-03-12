type MetricCardProps = {
  label: string;
  value: string;
};

export default function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="flex flex-col gap-1 glass-card-inner p-3">
      <span className="text-white/60 text-xs">{label}</span>
      <span className="text-white font-semibold text-sm">{value}</span>
    </div>
  );
}
