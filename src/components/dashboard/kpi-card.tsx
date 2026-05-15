import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function KPICard({
  title,
  value,
  change,
  changeType,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
}) {
  const changeColors = {
    positive: "text-green-400 bg-green-400/10",
    negative: "text-red-400 bg-red-400/10",
    neutral: "text-slate-400 bg-slate-400/10",
  };

  return (
    <Card className="border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300 h-full">
      <CardContent className="pt-5 flex flex-col h-full justify-between">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-[#1E40AF]/10 text-[#3B82F6]">
            {icon}
          </div>
        </div>
        <div className="mt-4">
          <Badge className={`${changeColors[changeType]} border-0 text-[10px] px-1.5`}>
            {changeType === "positive" && "↑ "}
            {changeType === "negative" && "↓ "}
            {change}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export function SkeletonWidget({ title, className = "" }: { title: string; className?: string }) {
  return (
    <Card className={`border-white/5 bg-white/[0.02] ${className} h-full`}>
      <CardContent className="pt-5 space-y-3">
        <p className="text-sm font-medium text-slate-400">{title}</p>
        <div className="h-8 bg-white/5 rounded-lg animate-pulse" />
        <div className="h-4 bg-white/5 rounded w-2/3 animate-pulse" />
      </CardContent>
    </Card>
  );
}
