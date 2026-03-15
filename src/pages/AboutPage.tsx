import React from 'react';
import {
    Droplets,
    Github,
    Twitter,
    Linkedin,
    Mail,
    Globe,
    Shield,
    Zap,
    BarChart3,
    Activity,
    Cloud,
    Users,
    Award,
    Heart,
    ArrowLeft
} from 'lucide-react';

interface AboutPageProps {
    onNavigate: (page: 'home' | 'dashboard' | 'chat' | 'settings' | 'about') => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
    const teamMembers = [
        {
            name: 'Nfor Leonard Ntani',
            role: 'Lead Researcher and Project Manager (Lead Developer)',
            bio: '2+ Experience in Web Development and IT development',
            avatar: 'NL',
            color: 'from-indigo-400 to-indigo-600'
        },
        {
            name: 'Tamo Ashley',
            role: 'Prototype Developer',
            bio: 'Specializes in sensor networks and real-time data processing',
            avatar: 'TA',
            color: 'from-emerald-400 to-teal-600'
        },
        {
            name: 'Gadibe Reina',
            role: 'Water Quality Specialist',
            bio: 'Expert in aquatic ecosystems, water treatment technologies provides core database',
            avatar: 'GR',
            color: 'from-blue-400 to-cyan-600'
        },
        {
            name: 'Christalion',
            role: 'UX/UI Designer',
            bio: 'Creates intuitive interfaces for complex environmental data',
            avatar: 'LZ',
            color: 'from-purple-400 to-pink-600'
        }
    ];

    const features = [
        {
            icon: Activity,
            title: 'Real-time Monitoring',
            description: 'Continuous water quality tracking with instant alerts'
        },
        {
            icon: BarChart3,
            title: 'Advanced Analytics',
            description: 'Historical data analysis and predictive modeling'
        },
        {
            icon: Cloud,
            title: 'Cloud Integration',
            description: 'Secure data storage with remote access anywhere'
        },
        {
            icon: Shield,
            title: 'Enterprise Security',
            description: 'Bank-level encryption and data protection'
        },
        {
            icon: Zap,
            title: 'Instant Notifications',
            description: 'Immediate alerts for critical threshold breaches'
        },
        {
            icon: Users,
            title: 'Multi-user Access',
            description: 'Role-based access for teams and organizations'
        }
    ];

    const stats = [
        { value: '5+', label: 'Active Sensors', icon: Activity },
        { value: '1.2K', label: 'Data Points Daily', icon: BarChart3 },
        { value: '99.9%', label: 'Uptime', icon: Zap },
        { value: '1+', label: 'Countries', icon: Globe }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000" />
            </div>

            <div className="relative max-w-4xl mx-auto px-4 py-8">
                {/* Back button */}
                <button
                    onClick={() => onNavigate('dashboard')}
                    className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-6 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </button>

                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-indigo-500/20 rounded-3xl mb-6 border border-indigo-500/30 backdrop-blur-sm">
                        <Droplets className="w-8 h-8 text-indigo-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-emerald-400 to-indigo-400 text-transparent bg-clip-text">
                        HydroGuard
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Advanced Water Quality Monitoring System for a Sustainable Future
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-indigo-500/20 text-center hover:border-indigo-500/40 transition-colors">
                                <Icon className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-white">{stat.value}</div>
                                <div className="text-xs text-slate-400">{stat.label}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Mission Section */}
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/20 mb-16">
                    <h2 className="text-2xl font-bold mb-4 text-indigo-400">Our Mission</h2>
                    <p className="text-slate-300 leading-relaxed">
                        HydroGuard is dedicated to revolutionizing water quality monitoring through cutting-edge IoT technology and data analytics. We empower communities, researchers, and organizations to protect their most valuable resource - water. By providing real-time insights and predictive analytics, we help prevent contamination, optimize treatment processes, and ensure safe water for everyone.
                    </p>
                </div>

                {/* Features Grid */}
                <h2 className="text-2xl font-bold mb-6 text-indigo-400">Key Features</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20 hover:border-indigo-500/40 transition-all hover:translate-y-[-2px]">
                                <div className="inline-flex p-2 bg-indigo-500/20 rounded-lg mb-4">
                                    <Icon className="w-5 h-5 text-indigo-400" />
                                </div>
                                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-sm text-slate-400">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Technology Stack */}
                <div className="bg-gradient-to-r from-indigo-500/10 to-emerald-500/10 rounded-2xl p-8 border border-indigo-500/20 mb-16">
                    <h2 className="text-2xl font-bold mb-4 text-indigo-400">Technology Stack</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['React', 'TypeScript', 'Node.js', 'IoT Sensors', 'WebSockets', 'TensorFlow', 'MongoDB', 'Docker'].map((tech, index) => (
                            <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-lg px-4 py-2 text-center border border-indigo-500/20">
                                <span className="text-sm text-slate-300">{tech}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <h2 className="text-2xl font-bold mb-6 text-indigo-400">Our Team</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20 text-center hover:border-indigo-500/40 transition-all">
                            <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-xl`}>
                                {member.avatar}
                            </div>
                            <h3 className="font-semibold text-white mb-1">{member.name}</h3>
                            <p className="text-xs text-indigo-400 mb-2">{member.role}</p>
                            <p className="text-xs text-slate-400">{member.bio}</p>
                        </div>
                    ))}
                </div>

                {/* Contact & Social */}
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/20 text-center mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-indigo-400">Get in Touch</h2>
                    <p className="text-slate-300 mb-6">
                        Have questions about HydroGuard? We'd love to hear from you.
                    </p>

                    <div className="flex justify-center space-x-4 mb-6">
                        <a href="#" className="p-3 bg-slate-700/50 rounded-lg hover:bg-indigo-500/20 transition-colors">
                            <Github className="w-5 h-5 text-slate-300" />
                        </a>
                        <a href="#" className="p-3 bg-slate-700/50 rounded-lg hover:bg-indigo-500/20 transition-colors">
                            <Twitter className="w-5 h-5 text-slate-300" />
                        </a>
                        <a href="#" className="p-3 bg-slate-700/50 rounded-lg hover:bg-indigo-500/20 transition-colors">
                            <Linkedin className="w-5 h-5 text-slate-300" />
                        </a>
                        <a href="#" className="p-3 bg-slate-700/50 rounded-lg hover:bg-indigo-500/20 transition-colors">
                            <Mail className="w-5 h-5 text-slate-300" />
                        </a>
                    </div>

                    <div className="flex items-center justify-center space-x-2 text-sm text-slate-400">
                        <Heart className="w-4 h-4 text-red-400" />
                        <span>Made with passion for clean water</span>
                        <Heart className="w-4 h-4 text-red-400" />
                    </div>

                    <div className="mt-6 pt-6 border-t border-indigo-500/20 text-xs text-slate-500">
                        <p>© 2026 HydroGuard. All rights reserved.</p>

                    </div>
                </div>
            </div>
        </div>
    );
}