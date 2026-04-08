import React from 'react';
import { motion } from 'framer-motion';
import { Target, Leaf, Award, Users } from 'lucide-react';

const StatsSection: React.FC = () => {
    const stats = [
        { number: "150+", label: "Active Projects", icon: <Target className="w-6 h-6" />, color: "text-blue-400" },
        { number: "50K+", label: "Tons CO₂ Captured", icon: <Leaf className="w-6 h-6" />, color: "text-emerald-400" },
        { number: "45K+", label: "Carbon Credits", icon: <Award className="w-6 h-6" />, color: "text-purple-400" },
        { number: "1.2K+", label: "Active Traders", icon: <Users className="w-6 h-6" />, color: "text-blue-400" }
    ];

    return (
        <section className="py-20 relative bg-slate-950 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className={`mb-4 p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                                {stat.number}
                            </div>
                            <div className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
