import React from 'react';
import { Home, MessageSquare, LayoutDashboard, Settings, X, Globe } from 'lucide-react';

interface SideNavigationProps {
    isOpen: boolean;
    onClose: () => void;
    currentPage: 'home' | 'dashboard' | 'chat' | 'settings' | 'about';
    onNavigate: (page: 'home' | 'dashboard' | 'chat' | 'settings' | 'about') => void;
}

export function SideNavigation({ isOpen, onClose, currentPage, onNavigate }: SideNavigationProps) {
    const menuItems = [
        { icon: Home, label: 'Home', page: 'home' as const },
        { icon: MessageSquare, label: 'Chat', page: 'chat' as const },
        { icon: LayoutDashboard, label: 'Dashboard', page: 'dashboard' as const },
        { icon: Settings, label: 'Settings', page: 'settings' as const },
        { icon: Globe, label: 'About', page: 'about' as const }
    ];

    const handleNavigate = (page: 'home' | 'dashboard' | 'chat' | 'settings') => {
        onNavigate(page);
        onClose();
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed left-0 top-0 h-full w-64 bg-slate-900/95 backdrop-blur-xl border-r border-indigo-500/20 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold text-white">Menu</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-slate-400" />
                        </button>
                    </div>

                    <nav className="space-y-2">
                        {menuItems.map((item) => {
                            const isActive = currentPage === item.page;

                            return (
                                <button
                                    key={item.page}
                                    onClick={() => handleNavigate(item.page)}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                                        ? 'bg-indigo-500/20 text-white'
                                        : 'text-slate-300 hover:text-white hover:bg-indigo-500/10'
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-300' : 'text-indigo-400 group-hover:text-indigo-300'
                                        }`} />
                                    <span className="font-medium">{item.label}</span>

                                    {/* Active indicator */}
                                    {isActive && (
                                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    <div className="absolute bottom-8 left-6 right-6">
                        <div className="pt-6 border-t border-slate-800">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-white">User Name</p>
                                    <p className="text-xs text-slate-400">user@example.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}