import React, { useState } from 'react';
import Head from 'next/head';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

export default function LZDashboard() {
    const [lzHealth, setLzHealth] = useState(98);

    return (
        <div className="min-h-screen bg-[#020617] text-white flex">
            {/* Sidebar */}
            <aside className="w-80 bg-[#0f172a]/40 border-r border-white/5 backdrop-blur-2xl flex flex-col">
                <div className="p-10 flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-indigo-600/30 text-white">LZ</div>
                    <span className="font-bold text-xl tracking-tighter">BCDR CONTROL</span>
                </div>

                <nav className="flex-1 px-6 space-y-2">
                    {['Resilience Hub', 'Network Topology', 'Governance Audit', 'Security Vaults', 'Spend Optics', 'Log Explorer'].map((item) => (
                        <div key={item} className={`px-6 py-4 rounded-2xl cursor-pointer transition-all ${item === 'Resilience Hub' ? 'bg-indigo-600 shadow-2xl shadow-indigo-600/20' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
                            <span className="text-sm font-bold">{item}</span>
                        </div>
                    ))}
                </nav>

                <div className="p-8">
                    <div className="p-6 bg-indigo-600/10 border border-indigo-600/20 rounded-[32px]">
                        <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-3">Resilience Health</p>
                        <div className="text-4xl font-black mb-2">{lzHealth}%</div>
                        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                            <div className="bg-indigo-500 h-full" style={{ width: `${lzHealth}%` }} />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-16 overflow-y-auto">
                <header className="flex justify-between items-start mb-16">
                    <div>
                        <h1 className={`${outfit.className} text-5xl font-black mb-4 tracking-tighter`}>Landing Zone Dashboard</h1>
                        <p className="text-slate-500 text-lg">Managing 14 BCDR-Isolated Spoke Subscriptions across Global Regions.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all text-sm">Export Audit Evidence</button>
                        <button className="px-8 py-4 bg-indigo-600 rounded-2xl font-bold hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-600/30 text-sm">Deploy New Spoke</button>
                    </div>
                </header>

                {/* Global Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                    <StatCard label="Isolated Spokes" value="14" sub="5 Pending Deployment" trend="up" />
                    <StatCard label="Governance Score" value="99.4%" sub="Compliance: SOC2/ISO" trend="up" />
                    <StatCard label="Network Bandwidth" value="40Gbps" sub="Inter-Region Link" trend="neutral" />
                    <StatCard label="Security Alerts" value="0" sub="All Spokes Hardened" trend="down" />
                </div>

                <section className="bg-white/5 border border-white/5 rounded-[48px] p-12">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-3xl font-black tracking-tight">Active BCDR Spokes</h2>
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Policy Enforcement Active</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <SpokeItem name="UK-Production-Replica" region="UK West" type="ACTIVE-PASSIVE" status="HEALTHY" policy="GOLD_TIER" />
                        <SpokeItem name="US-Cyber-Vault-01" region="US East 2" type="AIR-GAPPED" status="HEALTHY" policy="PLATINUM_SEC" />
                        <SpokeItem name="EU-Archive-Spoke" region="Germany North" type="WARM_STANDBY" status="SYNCING" policy="SILVER_ARCH" warning />
                    </div>
                </section>
            </main>
        </div>
    );
}

const StatCard = ({ label, value, sub }: any) => (
    <div className="p-8 bg-[#0f172a]/50 border border-white/5 rounded-[32px] group hover:border-indigo-500/20 transition-all">
        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-4 group-hover:text-indigo-400 transition-colors">{label}</p>
        <div className="text-4xl font-black mb-2 text-white">{value}</div>
        <p className="text-xs text-slate-500 font-bold">{sub}</p>
    </div>
);

const SpokeItem = ({ name, region, type, status, policy, warning }: any) => (
    <div className="flex justify-between items-center p-8 bg-[#020617] border border-white/5 rounded-3xl hover:bg-white/5 transition-all cursor-pointer group">
        <div className="flex items-center gap-10">
            <div className={`w-3 h-3 rounded-full ${warning ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
            <div>
                <p className="font-bold text-xl group-hover:text-indigo-400 transition-colors">{name}</p>
                <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">{region}</span>
                    <span className="text-slate-700 text-xs font-black">|</span>
                    <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">{type}</span>
                </div>
            </div>
        </div>
        <div className="text-right">
            <div className={`text-xs font-black mb-1 ${warning ? 'text-amber-400' : 'text-emerald-400'}`}>{status}</div>
            <div className="px-3 py-1 bg-white/5 rounded-lg text-[10px] text-slate-500 font-black tracking-tight border border-white/5">{policy}</div>
        </div>
    </div>
);
