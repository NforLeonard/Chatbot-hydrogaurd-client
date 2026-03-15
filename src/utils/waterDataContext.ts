// src/utils/waterDataContext.ts
import { useWaterData } from '../hooks/useWaterData';

export const formatWaterDataForAI = (waterData: ReturnType<typeof useWaterData>) => {
    const {
        metrics,
        sensors,
        realtimeData,
        historicalData,
        thresholds
    } = waterData;

    // Get recent readings (last 6 hours)
    const recentReadings = realtimeData.slice(-6).map(r =>
        `${r.time}: ${r.level}cm`
    ).join('\n  ');

    // Get sensor status summary
    const activeSensors = sensors.filter(s => s.status === 'active').length;
    const warningSensors = sensors.filter(s => s.status === 'warning').length;
    const criticalSensors = sensors.filter(s => s.status === 'critical').length;

    // Get today's historical summary
    const today = new Date().toLocaleDateString();
    const todayHistory = historicalData.find(d => d.date === today) || historicalData[historicalData.length - 1];

    // Build comprehensive context
    return `
CURRENT WATER SYSTEM STATUS (as of ${new Date().toLocaleString()}):
================================
📊 LIVE METRICS:
- Water Level: ${metrics.currentLevel}cm
- Temperature: ${metrics.temperature}°C
- Flow Rate: ${metrics.flowRate}L/min
- Battery: ${metrics.batteryLevel}%

⚠️ THRESHOLDS:
- Minimum Safe: ${thresholds.minSafe}cm
- Warning Level: ${thresholds.warning}cm
- Critical Level: ${thresholds.critical}cm

🔌 SENSOR NETWORK:
- Total Sensors: ${sensors.length}
- Active: ${activeSensors}
- Warning: ${warningSensors}
- Critical: ${criticalSensors}

📈 RECENT READINGS (last 6 hours):
  ${recentReadings}

📅 HISTORICAL CONTEXT (today):
- Min: ${todayHistory?.min || 'N/A'}cm
- Max: ${todayHistory?.max || 'N/A'}cm
- Avg: ${todayHistory?.avg || 'N/A'}cm

🚨 CRITICAL ALERTS:
${sensors.filter(s => s.status === 'critical').map(s =>
        `- ${s.name}: ${s.value}${s.unit} (Critical!)`
    ).join('\n') || '  No critical alerts'}

⚠️ WARNINGS:
${sensors.filter(s => s.status === 'warning').map(s =>
        `- ${s.name}: ${s.value}${s.unit} (Warning)`
    ).join('\n') || '  No warnings'}

The user can ask about water levels, temperature, alerts, trends, or recommendations.
`;
};