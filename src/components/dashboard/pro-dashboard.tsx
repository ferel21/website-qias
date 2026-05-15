"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard, SkeletonWidget } from "./kpi-card";
import { RevenueChart } from "./revenue-chart";
import { DistributionChart } from "./distribution-chart";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import { 
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripHorizontal, Settings2, EyeOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

// Initial widgets data
const INITIAL_WIDGETS = [
  { id: "revenue_kpi", type: "kpi", title: "Total Pendapatan", w: 1 },
  { id: "trx_count_kpi", type: "kpi", title: "Jumlah Transaksi", w: 1 },
  { id: "avg_trx_kpi", type: "kpi", title: "Rata-rata Transaksi", w: 1 },
  { id: "cash_est_kpi", type: "kpi", title: "Estimasi Saldo", w: 1 },
  { id: "revenue_chart", type: "chart", title: "Tren Pendapatan", w: 2 },
  { id: "distribution_chart", type: "chart", title: "Distribusi Pembayaran", w: 1 },
  { id: "recent_trx", type: "other", title: "Transaksi Terbaru", w: 1 },
];

function SortableItem({ id, widget, isEditMode, onHide }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: transform ? 1 : 0,
  };

  const colSpanClass = widget.w === 2 ? "lg:col-span-2 col-span-1" : "col-span-1";

  // Widget content mapping
  const renderWidgetContent = () => {
    switch (widget.id) {
      case "revenue_kpi":
        return <KPICard title="Total Pendapatan" value="Rp 12.450.000" change="+12,5%" changeType="positive" icon={<div className="w-5 h-5 rounded-full bg-blue-500/20" />} />;
      case "trx_count_kpi":
        return <KPICard title="Jumlah Transaksi" value="847" change="+23" changeType="positive" icon={<div className="w-5 h-5 rounded-full bg-blue-500/20" />} />;
      case "avg_trx_kpi":
        return <KPICard title="Rata-rata Transaksi" value="Rp 14.700" change="-2,1%" changeType="negative" icon={<div className="w-5 h-5 rounded-full bg-blue-500/20" />} />;
      case "cash_est_kpi":
        return <KPICard title="Estimasi Saldo" value="Rp 45.230.000" change="Real-time" changeType="neutral" icon={<div className="w-5 h-5 rounded-full bg-blue-500/20" />} />;
      case "revenue_chart":
        return (
          <Card className="border-white/5 bg-white/[0.02] h-full">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-slate-400">Tren Pendapatan</CardTitle></CardHeader>
            <CardContent><RevenueChart /></CardContent>
          </Card>
        );
      case "distribution_chart":
        return (
          <Card className="border-white/5 bg-white/[0.02] h-full">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-slate-400">Distribusi Kanal</CardTitle></CardHeader>
            <CardContent><DistributionChart /></CardContent>
          </Card>
        );
      case "recent_trx":
        return <SkeletonWidget title="Transaksi Terbaru" />;
      default:
        return <div className="p-4 bg-white/5 rounded-xl border border-white/10 h-full">{widget.title}</div>;
    }
  };

  return (
    <div ref={setNodeRef} style={style} className={`${colSpanClass} relative group h-full`}>
      {isEditMode && (
        <div className="absolute -top-3 -right-3 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onHide(widget.id)}
            className="p-1.5 bg-slate-800 border border-white/10 rounded-md text-slate-400 hover:text-white"
            title="Sembunyikan"
          >
            <EyeOff size={14} />
          </button>
          <div 
            {...attributes} 
            {...listeners} 
            className="p-1.5 bg-[#3B82F6] cursor-grab active:cursor-grabbing rounded-md text-white shadow-lg"
          >
            <GripHorizontal size={14} />
          </div>
        </div>
      )}
      <div className={isEditMode ? "ring-2 ring-[#3B82F6]/0 group-hover:ring-[#3B82F6]/50 rounded-xl transition-all h-full" : "h-full"}>
        {renderWidgetContent()}
      </div>
    </div>
  );
}

export function ProDashboard() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [widgets, setWidgets] = useState(INITIAL_WIDGETS);
  const [hiddenWidgets, setHiddenWidgets] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // In a real app, we'd fetch this from the database or localStorage
    const savedLayout = localStorage.getItem("qias_pro_layout");
    const savedHidden = localStorage.getItem("qias_pro_hidden");
    if (savedLayout) setWidgets(JSON.parse(savedLayout));
    if (savedHidden) setHiddenWidgets(JSON.parse(savedHidden));
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        localStorage.setItem("qias_pro_layout", JSON.stringify(newItems));
        return newItems;
      });
    }
  };

  const toggleHide = (id: string) => {
    setHiddenWidgets(prev => {
      const newHidden = prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id];
      localStorage.setItem("qias_pro_hidden", JSON.stringify(newHidden));
      return newHidden;
    });
  };

  const visibleWidgets = widgets.filter(w => !hiddenWidgets.includes(w.id));

  if (!isMounted) return null;

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-[#1E40AF]/20 to-transparent border border-[#3B82F6]/20 p-4 rounded-xl mb-6">
        <div>
          <h3 className="text-[#3B82F6] font-medium mb-1 flex items-center gap-2">
            Mode Pro Aktif
            {isEditMode && <span className="bg-[#3B82F6] text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse">EDITING</span>}
          </h3>
          <p className="text-sm text-slate-400">Kustomisasi tata letak sesuka hati. Geser widget untuk mengatur ulang urutan.</p>
        </div>
        <div className="flex items-center gap-3">
          {isEditMode && hiddenWidgets.length > 0 && (
            <div className="flex gap-2 mr-4">
              {hiddenWidgets.map(id => {
                const w = INITIAL_WIDGETS.find(i => i.id === id);
                return (
                  <Button key={id} variant="outline" size="sm" onClick={() => toggleHide(id)} className="border-white/10 h-8 text-xs bg-white/5">
                    <Eye size={12} className="mr-1" /> {w?.title}
                  </Button>
                )
              })}
            </div>
          )}
          <Button 
            onClick={() => setIsEditMode(!isEditMode)} 
            className={isEditMode ? "bg-green-600 hover:bg-green-700 text-white" : "bg-[#3B82F6] hover:bg-blue-600 text-white"}
          >
            {isEditMode ? "Simpan Layout" : <><Settings2 size={16} className="mr-2" /> Kustomisasi</>}
          </Button>
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={visibleWidgets.map(w => w.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
            {visibleWidgets.map((widget) => (
              <SortableItem 
                key={widget.id} 
                id={widget.id} 
                widget={widget} 
                isEditMode={isEditMode} 
                onHide={toggleHide} 
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
