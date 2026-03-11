import type { ReactNode } from "react";

type MetricCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

export default function MetricCard({ icon, label, value }: MetricCardProps) {
  return (
    <div className="flex flex-col gap-1 bg-gray-800/60 rounded-xl p-3">
      <div className="flex items-center gap-2 text-gray-400">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <span className="text-white font-semibold text-sm">{value}</span>
    </div>
  );
}
