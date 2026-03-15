import React, { useState } from 'react';
import { useWaterData } from '../hooks/useWaterData';
import { usePullToRefresh } from '../hooks/usePullToRefresh';
import { Header } from '../components/Header';
import { MetricCardsSection } from '../components/MetricCardsSection';
import { WaterLevelChart } from '../components/WaterLevelChart';
import { SensorGrid } from '../components/SensorGrid';
import { HistoricalChart } from '../components/HistoricalChart';
import { SideNavigation } from '../components/SideNavigation';
import { Loader2Icon, Menu, MessageSquare } from 'lucide-react';
import { GroqChatbot } from '../components/GroqChatbot';

interface DashboardProps {
  currentPage: 'home' | 'dashboard' | 'chat' | 'settings';
  onNavigate: (page: 'home' | 'dashboard' | 'chat' | 'settings') => void;
}

export function Dashboard({ currentPage, onNavigate }: DashboardProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const {
    metrics,
    sensors,
    realtimeData,
    historicalData,
    refreshData,
    thresholds
  } = useWaterData();

  const {
    containerRef,
    isRefreshing,
    pullDistance,
    threshold
  } = usePullToRefresh(refreshData);

  return (
    <>
      {/* Navigation */}
      <SideNavigation
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />

      {/* Menu Button - This is your "tree line" button */}
      <button
        onClick={() => setIsNavOpen(true)}
        className="fixed top-4 left-4 z-30 p-2 bg-slate-800/90 backdrop-blur-md rounded-lg shadow-lg shadow-indigo-500/30 border border-indigo-500/20 hover:bg-slate-700 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5 text-indigo-400" />
      </button>

      <div ref={containerRef} className="h-screen overflow-y-auto bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative pb-20">
        {/* Pull to refresh indicator */}
        <div className="absolute left-0 right-0 flex justify-center pointer-events-none z-20 transition-transform duration-200" style={{
          top: -40,
          transform: `translateY(${pullDistance > 0 ? pullDistance : isRefreshing ? threshold : 0}px)`
        }}>
          <div className="bg-slate-800/90 backdrop-blur-md rounded-full p-2 shadow-lg shadow-indigo-500/30 border border-indigo-500/20">
            <Loader2Icon className={`w-5 h-5 text-indigo-400 ${isRefreshing ? 'animate-spin' : ''}`} style={{
              transform: `rotate(${pullDistance * 2}deg)`
            }} />
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 pb-8 min-h-screen">
          <Header />

          <main className="space-y-6 mt-2">
            <section className="animate-fade-in-up" style={{
              animationDelay: '0.1s'
            }}>
              <MetricCardsSection metrics={metrics} />
            </section>

            <section className="animate-fade-in-up" style={{
              animationDelay: '0.2s'
            }}>
              <WaterLevelChart data={realtimeData} thresholds={thresholds} />
            </section>

            <section className="animate-fade-in-up" style={{
              animationDelay: '0.3s'
            }}>
              <div className="flex justify-between items-end mb-3 px-1">
                <h2 className="text-lg font-bold text-white">Sensor Status</h2>
                <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                  View All
                </button>
              </div>
              <SensorGrid sensors={sensors} />
            </section>

            <section className="animate-fade-in-up" style={{
              animationDelay: '0.4s'
            }}>
              <HistoricalChart data={historicalData} thresholds={thresholds} />
            </section>
          </main>

          <footer className="mt-12 text-center text-xs text-slate-500 pb-4 animate-fade-in-up" style={{
            animationDelay: '0.5s'
          }}>
            <p>Last updated: {new Date().toLocaleTimeString()}</p>
            <p className="text-emerald-400">
              Thresholds loaded: min {thresholds?.minSafe ?? '?'} cm
              → warn {thresholds?.warning ?? '?'}
              → crit {thresholds?.critical ?? '?'}
            </p>
            <p className="mt-1">System v2.4.0 • Connected</p>
          </footer>
        </div>
        {/* Chat Button */}
        <button
          onClick={() => setShowChat(!showChat)}
          className="fixed bottom-20 right-4 z-30 p-3 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50 hover:bg-indigo-600 transition-colors"
        >
          <MessageSquare className="w-6 h-6 text-white" />
        </button>
        {showChat && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md">
              <GroqChatbot />
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.6s ease-out forwards;
            opacity: 0;
          }
        `}</style>
      </div>
    </>
  );
}