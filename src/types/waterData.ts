// types/waterData.ts (create this file or add to existing types)
export interface WaterLevelDataPoint {
  timestamp: string;
  level: number;
}

export interface ChartPoint {
  x: string | number;
  y: number;
  // ... other properties if needed
}
export interface WaterLevelThresholds {
  minSafe: number;
  warning: number;
  critical: number;
  unit?: string;      // optional, default "cm"
}

export const DEFAULT_THRESHOLDS: WaterLevelThresholds = {
  minSafe: 200,
  warning: 250,
  critical: 280,
  unit: "cm",
};