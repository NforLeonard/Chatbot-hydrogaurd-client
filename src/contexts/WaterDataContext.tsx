import React, { createContext, useContext } from 'react';
import { useWaterData } from '../hooks/useWaterData';

interface WaterDataContextType {
    metrics: any;
    sensors: any[];
    realtimeData: any[];
    historicalData: any[];
    thresholds: any;
    getSystemStatus: () => string;
    getLatestReading: () => string;
    getAlertSummary: () => string;
    getHistoricalSummary: () => string;
}

const WaterDataContext = createContext<WaterDataContextType | undefined>(undefined);

export function WaterDataProvider({ children }: { children: React.ReactNode }) {
    const waterData = useWaterData();

    const getSystemStatus = () => {
        const { metrics, sensors } = waterData;
        const activeSensors = sensors.filter(s => s.status === 'active').length;
        const warningSensors = sensors.filter(s => s.status === 'warning').length;
        const criticalSensors = sensors.filter(s => s.status === 'critical').length;

        return `System Status:
- Current Water Level: ${metrics.currentLevel}cm
- Temperature: ${metrics.temperature}°C
- Flow Rate: ${metrics.flowRate}L/min
- Battery: ${metrics.batteryLevel}%
- Active Sensors: ${activeSensors}
- Warning Sensors: ${warningSensors}
- Critical Sensors: ${criticalSensors}`;
    };

    const getLatestReading = () => {
        const { metrics, realtimeData } = waterData;
        const lastReading = realtimeData[realtimeData.length - 1];

        return `Latest Reading (${new Date().toLocaleTimeString()}):
- Water Level: ${metrics.currentLevel}cm
- Temperature: ${metrics.temperature}°C
- Flow Rate: ${metrics.flowRate}L/min
- Battery: ${metrics.batteryLevel}%`;
    };

    const getAlertSummary = () => {
        const { sensors, thresholds } = waterData;
        const criticalAlerts = sensors.filter(s => s.status === 'critical');
        const warningAlerts = sensors.filter(s => s.status === 'warning');

        let summary = `Alert Summary:\n`;

        if (criticalAlerts.length > 0) {
            summary += `\n🚨 CRITICAL ALERTS (${criticalAlerts.length}):\n`;
            criticalAlerts.forEach(s => {
                summary += `- ${s.name}: ${s.value}${s.unit} (Critical threshold: ${thresholds.critical}${s.unit})\n`;
            });
        }

        if (warningAlerts.length > 0) {
            summary += `\n⚠️ WARNINGS (${warningAlerts.length}):\n`;
            warningAlerts.forEach(s => {
                summary += `- ${s.name}: ${s.value}${s.unit} (Warning threshold: ${thresholds.warning}${s.unit})\n`;
            });
        }

        if (criticalAlerts.length === 0 && warningAlerts.length === 0) {
            summary += "✅ All systems normal - no active alerts";
        }

        return summary;
    };

    const getHistoricalSummary = () => {
        const { historicalData, metrics } = waterData;
        const last7Days = historicalData.slice(-7);

        const avgLevel = last7Days.reduce((sum, d) => sum + d.avg, 0) / last7Days.length;
        const minLevel = Math.min(...last7Days.map(d => d.min));
        const maxLevel = Math.max(...last7Days.map(d => d.max));

        return `Historical Summary (Last 7 Days):
- Average Level: ${avgLevel.toFixed(1)}cm
- Minimum Level: ${minLevel}cm
- Maximum Level: ${maxLevel}cm
- Total Readings: ${historicalData.length}
- Trend: ${metrics.currentLevel > avgLevel ? '⬆️ Rising' : '⬇️ Falling'}`;
    };

    return (
        <WaterDataContext.Provider value={{
            ...waterData,
            getSystemStatus,
            getLatestReading,
            getAlertSummary,
            getHistoricalSummary
        }}>
            {children}
        </WaterDataContext.Provider>
    );
}

export const useWaterDataContext = () => {
    const context = useContext(WaterDataContext);
    if (!context) {
        throw new Error('useWaterDataContext must be used within WaterDataProvider');
    }
    return context;
};