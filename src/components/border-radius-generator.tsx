"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Link, Unlink, Settings2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface CornerValues {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
}

interface AdvancedCornerValues {
  topLeftH: number;
  topLeftV: number;
  topRightH: number;
  topRightV: number;
  bottomRightH: number;
  bottomRightV: number;
  bottomLeftH: number;
  bottomLeftV: number;
}

interface Preset {
  name: string;
  values: CornerValues;
  advanced?: AdvancedCornerValues;
}

const PRESETS: Preset[] = [
  { name: "None", values: { topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0 } },
  { name: "Rounded", values: { topLeft: 8, topRight: 8, bottomRight: 8, bottomLeft: 8 } },
  { name: "Large", values: { topLeft: 24, topRight: 24, bottomRight: 24, bottomLeft: 24 } },
  { name: "Pill", values: { topLeft: 9999, topRight: 9999, bottomRight: 9999, bottomLeft: 9999 } },
  {
    name: "Blob",
    values: { topLeft: 60, topRight: 30, bottomRight: 70, bottomLeft: 40 },
    advanced: {
      topLeftH: 60, topLeftV: 40,
      topRightH: 30, topRightV: 70,
      bottomRightH: 70, bottomRightV: 30,
      bottomLeftH: 40, bottomLeftV: 60,
    },
  },
  { name: "Ticket", values: { topLeft: 16, topRight: 16, bottomRight: 0, bottomLeft: 0 } },
  { name: "Drop", values: { topLeft: 100, topRight: 0, bottomRight: 100, bottomLeft: 100 } },
  { name: "Message", values: { topLeft: 20, topRight: 20, bottomRight: 0, bottomLeft: 20 } },
];

const MAX_RADIUS = 200;

export function BorderRadiusGenerator() {
  const [corners, setCorners] = useState<CornerValues>({
    topLeft: 16,
    topRight: 16,
    bottomRight: 16,
    bottomLeft: 16,
  });
  const [advancedCorners, setAdvancedCorners] = useState<AdvancedCornerValues>({
    topLeftH: 16, topLeftV: 16,
    topRightH: 16, topRightV: 16,
    bottomRightH: 16, bottomRightV: 16,
    bottomLeftH: 16, bottomLeftV: 16,
  });
  const [linked, setLinked] = useState(true);
  const [advanced, setAdvanced] = useState(false);
  const [copied, setCopied] = useState(false);
  const [unit, setUnit] = useState<"px" | "%">("px");

  const updateCorner = useCallback(
    (corner: keyof CornerValues, value: number) => {
      if (linked) {
        setCorners({ topLeft: value, topRight: value, bottomRight: value, bottomLeft: value });
        setAdvancedCorners({
          topLeftH: value, topLeftV: value,
          topRightH: value, topRightV: value,
          bottomRightH: value, bottomRightV: value,
          bottomLeftH: value, bottomLeftV: value,
        });
      } else {
        setCorners((prev) => ({ ...prev, [corner]: value }));
        const hKey = `${corner}H` as keyof AdvancedCornerValues;
        const vKey = `${corner}V` as keyof AdvancedCornerValues;
        setAdvancedCorners((prev) => ({ ...prev, [hKey]: value, [vKey]: value }));
      }
    },
    [linked]
  );

  const updateAdvancedCorner = useCallback(
    (key: keyof AdvancedCornerValues, value: number) => {
      setAdvancedCorners((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const applyPreset = useCallback((preset: Preset) => {
    setCorners(preset.values);
    if (preset.advanced) {
      setAdvancedCorners(preset.advanced);
    } else {
      setAdvancedCorners({
        topLeftH: preset.values.topLeft, topLeftV: preset.values.topLeft,
        topRightH: preset.values.topRight, topRightV: preset.values.topRight,
        bottomRightH: preset.values.bottomRight, bottomRightV: preset.values.bottomRight,
        bottomLeftH: preset.values.bottomLeft, bottomLeftV: preset.values.bottomLeft,
      });
    }
    setLinked(false);
  }, []);

  const cssValue = useMemo(() => {
    const u = unit;
    if (advanced) {
      const { topLeftH, topLeftV, topRightH, topRightV, bottomRightH, bottomRightV, bottomLeftH, bottomLeftV } = advancedCorners;
      const hSame = topLeftH === topRightH && topRightH === bottomRightH && bottomRightH === bottomLeftH;
      const vSame = topLeftV === topRightV && topRightV === bottomRightV && bottomRightV === bottomLeftV;
      const allSame = hSame && vSame && topLeftH === topLeftV;
      if (allSame) return `${topLeftH}${u}`;
      return `${topLeftH}${u} ${topRightH}${u} ${bottomRightH}${u} ${bottomLeftH}${u} / ${topLeftV}${u} ${topRightV}${u} ${bottomRightV}${u} ${bottomLeftV}${u}`;
    }
    const { topLeft, topRight, bottomRight, bottomLeft } = corners;
    const allSame = topLeft === topRight && topRight === bottomRight && bottomRight === bottomLeft;
    if (allSame) return `${topLeft}${u}`;
    return `${topLeft}${u} ${topRight}${u} ${bottomRight}${u} ${bottomLeft}${u}`;
  }, [corners, advancedCorners, advanced, unit]);

  const previewStyle = useMemo(() => {
    const u = unit;
    if (advanced) {
      const { topLeftH, topLeftV, topRightH, topRightV, bottomRightH, bottomRightV, bottomLeftH, bottomLeftV } = advancedCorners;
      return {
        borderRadius: `${topLeftH}${u} ${topRightH}${u} ${bottomRightH}${u} ${bottomLeftH}${u} / ${topLeftV}${u} ${topRightV}${u} ${bottomRightV}${u} ${bottomLeftV}${u}`,
      };
    }
    return {
      borderRadius: `${corners.topLeft}${u} ${corners.topRight}${u} ${corners.bottomRight}${u} ${corners.bottomLeft}${u}`,
    };
  }, [corners, advancedCorners, advanced, unit]);

  const fullCSS = `border-radius: ${cssValue};`;

  const copyCSS = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(fullCSS);
      setCopied(true);
      toast.success("CSS copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  }, [fullCSS]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Controls Row */}
      <div className="flex flex-wrap items-center gap-3 justify-center">
        <Button
          variant={linked ? "default" : "outline"}
          size="sm"
          onClick={() => setLinked(!linked)}
          className="gap-2"
        >
          {linked ? <Link className="h-4 w-4" /> : <Unlink className="h-4 w-4" />}
          {linked ? "Linked" : "Independent"}
        </Button>
        <Button
          variant={advanced ? "default" : "outline"}
          size="sm"
          onClick={() => setAdvanced(!advanced)}
          className="gap-2"
        >
          <Settings2 className="h-4 w-4" />
          {advanced ? "Advanced" : "Simple"}
        </Button>
        <div className="flex items-center gap-1 rounded-lg border border-border p-0.5">
          <button
            onClick={() => setUnit("px")}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${unit === "px" ? "bg-brand text-white" : "text-muted-foreground hover:text-foreground"}`}
          >
            px
          </button>
          <button
            onClick={() => setUnit("%")}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${unit === "%" ? "bg-brand text-white" : "text-muted-foreground hover:text-foreground"}`}
          >
            %
          </button>
        </div>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap justify-center gap-2">
        {PRESETS.map((preset) => (
          <Button
            key={preset.name}
            variant="outline"
            size="sm"
            onClick={() => applyPreset(preset)}
            className="text-xs"
          >
            {preset.name}
          </Button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Preview */}
        <Card className="p-8 flex items-center justify-center min-h-[350px]">
          <div className="relative">
            {/* Grid background */}
            <div className="absolute inset-0 dot-pattern rounded-lg opacity-30" />
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] bg-gradient-to-br from-brand to-brand-accent shadow-2xl shadow-brand/20"
              style={previewStyle}
            />
            {/* Corner labels */}
            <div className="absolute -top-6 -left-2 text-[10px] text-muted-foreground font-mono">
              {advanced ? `${advancedCorners.topLeftH}/${advancedCorners.topLeftV}` : corners.topLeft}{unit}
            </div>
            <div className="absolute -top-6 -right-2 text-[10px] text-muted-foreground font-mono text-right">
              {advanced ? `${advancedCorners.topRightH}/${advancedCorners.topRightV}` : corners.topRight}{unit}
            </div>
            <div className="absolute -bottom-6 -right-2 text-[10px] text-muted-foreground font-mono text-right">
              {advanced ? `${advancedCorners.bottomRightH}/${advancedCorners.bottomRightV}` : corners.bottomRight}{unit}
            </div>
            <div className="absolute -bottom-6 -left-2 text-[10px] text-muted-foreground font-mono">
              {advanced ? `${advancedCorners.bottomLeftH}/${advancedCorners.bottomLeftV}` : corners.bottomLeft}{unit}
            </div>
          </div>
        </Card>

        {/* Sliders */}
        <Card className="p-6 space-y-5">
          {!advanced ? (
            <>
              <CornerSlider label="Top Left" value={corners.topLeft} max={MAX_RADIUS} unit={unit} onChange={(v) => updateCorner("topLeft", v)} />
              <CornerSlider label="Top Right" value={corners.topRight} max={MAX_RADIUS} unit={unit} onChange={(v) => updateCorner("topRight", v)} />
              <CornerSlider label="Bottom Right" value={corners.bottomRight} max={MAX_RADIUS} unit={unit} onChange={(v) => updateCorner("bottomRight", v)} />
              <CornerSlider label="Bottom Left" value={corners.bottomLeft} max={MAX_RADIUS} unit={unit} onChange={(v) => updateCorner("bottomLeft", v)} />
            </>
          ) : (
            <>
              <AdvancedCornerSlider label="Top Left" hValue={advancedCorners.topLeftH} vValue={advancedCorners.topLeftV} max={MAX_RADIUS} unit={unit} onChangeH={(v) => updateAdvancedCorner("topLeftH", v)} onChangeV={(v) => updateAdvancedCorner("topLeftV", v)} />
              <AdvancedCornerSlider label="Top Right" hValue={advancedCorners.topRightH} vValue={advancedCorners.topRightV} max={MAX_RADIUS} unit={unit} onChangeH={(v) => updateAdvancedCorner("topRightH", v)} onChangeV={(v) => updateAdvancedCorner("topRightV", v)} />
              <AdvancedCornerSlider label="Bottom Right" hValue={advancedCorners.bottomRightH} vValue={advancedCorners.bottomRightV} max={MAX_RADIUS} unit={unit} onChangeH={(v) => updateAdvancedCorner("bottomRightH", v)} onChangeV={(v) => updateAdvancedCorner("bottomRightV", v)} />
              <AdvancedCornerSlider label="Bottom Left" hValue={advancedCorners.bottomLeftH} vValue={advancedCorners.bottomLeftV} max={MAX_RADIUS} unit={unit} onChangeH={(v) => updateAdvancedCorner("bottomLeftH", v)} onChangeV={(v) => updateAdvancedCorner("bottomLeftV", v)} />
            </>
          )}
        </Card>
      </div>

      {/* CSS Output */}
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <code className="flex-1 font-mono text-sm sm:text-base bg-muted/50 px-4 py-3 rounded-lg overflow-x-auto">
            {fullCSS}
          </code>
          <Button onClick={copyCSS} variant="outline" size="icon" className="shrink-0">
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </Card>
    </div>
  );
}

/* ---- Sub-components ---- */

function CornerSlider({
  label,
  value,
  max,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  max: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <div className="flex items-center gap-1">
          <Input
            type="number"
            min={0}
            max={max}
            value={value}
            onChange={(e) => onChange(Math.min(max, Math.max(0, Number(e.target.value) || 0)))}
            className="w-20 h-8 text-right font-mono text-sm"
          />
          <span className="text-xs text-muted-foreground w-5">{unit}</span>
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-brand"
      />
    </div>
  );
}

function AdvancedCornerSlider({
  label,
  hValue,
  vValue,
  max,
  unit,
  onChangeH,
  onChangeV,
}: {
  label: string;
  hValue: number;
  vValue: number;
  max: number;
  unit: string;
  onChangeH: (v: number) => void;
  onChangeV: (v: number) => void;
}) {
  return (
    <div className="space-y-2 pb-3 border-b border-border/50 last:border-0">
      <span className="text-sm font-medium">{label}</span>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">H</span>
            <div className="flex items-center gap-1">
              <Input
                type="number"
                min={0}
                max={max}
                value={hValue}
                onChange={(e) => onChangeH(Math.min(max, Math.max(0, Number(e.target.value) || 0)))}
                className="w-16 h-7 text-right font-mono text-xs"
              />
              <span className="text-xs text-muted-foreground w-5">{unit}</span>
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={max}
            value={hValue}
            onChange={(e) => onChangeH(Number(e.target.value))}
            className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-brand"
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">V</span>
            <div className="flex items-center gap-1">
              <Input
                type="number"
                min={0}
                max={max}
                value={vValue}
                onChange={(e) => onChangeV(Math.min(max, Math.max(0, Number(e.target.value) || 0)))}
                className="w-16 h-7 text-right font-mono text-xs"
              />
              <span className="text-xs text-muted-foreground w-5">{unit}</span>
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={max}
            value={vValue}
            onChange={(e) => onChangeV(Number(e.target.value))}
            className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-brand"
          />
        </div>
      </div>
    </div>
  );
}
