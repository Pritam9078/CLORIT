import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Coins,
  ArrowUpRight,
  ArrowDownLeft,
  Download,
  Gift,
  Zap,
  Star,
  History,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShoppingBag,
  TrendingUp,
  X,
  Award,
  CircleDot,
  Trophy,
  ArrowRight,
  TreePine,
  Shield
} from 'lucide-react';

import CommunityLayout from './shared/CommunityLayout';
import CommunityCard from './shared/CommunityCard';
import { AuthUtils } from '../utils/auth';

type Tx = {
  id: string;
  date: string;
  type: "earn" | "redeem" | "claim";
  amount: number;
  note?: string;
};

type MarketplaceItem = {
  id: string;
  title: string;
  description: string;
  cost: number;
  category: "supplies" | "grants" | "equipment";
  tag?: string;
};

const sampleTx: Tx[] = [
  { id: "t1", date: "2025-09-10", type: "earn", amount: 50, note: "Verified planting site A1" },
  { id: "t2", date: "2025-09-12", type: "earn", amount: 30, note: "Community milestone reward" },
  { id: "t3", date: "2025-09-14", type: "redeem", amount: 20, note: "Tree sapling kit purchase" },
];

const marketplace: MarketplaceItem[] = [
  { id: "m1", title: "Sapling Kit", description: "100 mangrove saplings kit for community planting.", cost: 20, category: "supplies", tag: "Popular" },
  { id: "m2", title: "Soil Health Kit", description: "Tools & nutrients for coastal soil restoration.", cost: 45, category: "equipment" },
  { id: "m3", title: "Community Grant", description: "Micro-grant for local verification activities.", cost: 120, category: "grants", tag: "High Value" },
];

const badges = [
  { name: "Early Planter", status: "unlocked", icon: TreePine, color: "emerald" },
  { name: "Carbon Guard", status: "locked", icon: Shield, color: "blue" },
  { name: "Top Contributor", status: "locked", icon: Trophy, color: "amber" },
];

export default function EarnCredits(): JSX.Element {
  const navigate = useNavigate();
  const [balance, setBalance] = useState<number>(180);
  const [txs, setTxs] = useState<Tx[]>(sampleTx);
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const currentUser = AuthUtils.getCurrentUser();
    if (!currentUser) {
      const mockUser = {
        id: 'community-001',
        name: 'Rajesh Kumar',
        email: 'community@example.com',
        role: 'community',
      };
      AuthUtils.saveUserProfile(mockUser);
    }
  }, []);

  function onRedeem(item: MarketplaceItem) {
    setSelectedItem(item);
    setShowConfirm(true);
  }

  async function confirmRedeem() {
    if (!selectedItem) return;
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1500));

    setBalance((b) => b - selectedItem.cost);
    const newTx: Tx = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      type: "redeem",
      amount: selectedItem.cost,
      note: selectedItem.title,
    };
    setTxs((p) => [newTx, ...p]);

    setProcessing(false);
    setShowConfirm(false);
    setSelectedItem(null);
  }

  async function claimCredits(amount: number) {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1000));
    setBalance((b) => b + amount);
    setTxs((p) => [
      { id: `tx-${Date.now()}`, date: new Date().toISOString().slice(0, 10), type: "claim", amount, note: "Claimed rewards" },
      ...p,
    ]);
    setProcessing(false);
  }

  function exportCSV() {
    const header = ["id", "date", "type", "amount", "note"].join(",");
    const rows = txs.map((t) => [t.id, t.date, t.type, t.amount, `"${t.note ?? ""}"`].join(","));
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `clorit_transactions_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const milestoneProgress = Math.min((balance / 500) * 100, 100);

  return (
    <CommunityLayout>
      {/* Page Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-wider">
              Economy & Rewards
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
            Earn <span className="text-emerald-500">Credits</span>
          </h1>
          <p className="text-slate-500 max-w-xl text-lg font-medium leading-relaxed mt-4">
            Track your impact value in CLORIT Blue Credits (CLB) and redeem them for community empowerment.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-emerald-200 transition-all shadow-sm"
          >
            <Download className="w-4 h-4" /> Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 units) */}
        <div className="lg:col-span-8 space-y-8">

          {/* PREMIUM BALANCE CARD */}
          <div className="relative overflow-hidden bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl">
            {/* Animated Background Blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] -mr-40 -mt-20 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/20 rounded-full blur-[100px] -ml-32 -mb-20" />

            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 w-full text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-xs font-bold uppercase tracking-widest mb-8">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Live Balance Portfolio
                </div>

                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Total Available Credits</p>
                <div className="flex items-center justify-center md:justify-start gap-4 mb-10">
                  <span className="text-7xl md:text-8xl font-black tracking-tighter tabular-nums leading-none">{balance}</span>
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-emerald-400">CLB</span>
                    <span className="text-xs font-bold text-slate-500">Verified</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => claimCredits(25)}
                    disabled={processing}
                    className="flex-1 min-w-[160px] h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-sm tracking-tight shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 group"
                  >
                    {processing ? <CircleDot className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                    CLAIM 25 CLB
                  </button>
                  <button
                    onClick={() => claimCredits(50)}
                    disabled={processing}
                    className="flex-1 min-w-[160px] h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white rounded-2xl font-black text-sm tracking-tight transition-all active:scale-95 flex items-center justify-center gap-2 group"
                  >
                    <Trophy className="w-5 h-5 text-amber-400" />
                    WEEKLY BONUS
                  </button>
                </div>
              </div>

              {/* Progress Ring for Milestone */}
              <div className="w-48 h-48 relative flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="84"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-slate-800"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="84"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 84}
                    strokeDashoffset={2 * Math.PI * 84 * (1 - milestoneProgress / 100)}
                    strokeLinecap="round"
                    className="text-emerald-500 transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black leading-none">{Math.round(milestoneProgress)}%</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">Goal</span>
                </div>
              </div>
            </div>
          </div>

          {/* MARKETPLACE SECTION */}
          <div>
            <div className="flex items-center justify-between mb-8 px-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center shadow-sm">
                  <ShoppingBag className="w-6 h-6 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Reward Marketplace</h2>
              </div>
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">Grants</div>
                <div className="px-3 py-1 bg-emerald-100 rounded-full text-[10px] font-black text-emerald-600 uppercase tracking-widest">Supplies</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {marketplace.map((item) => (
                <div key={item.id} className="group relative bg-white border border-slate-200 rounded-[2.5rem] p-6 hover:shadow-2xl hover:shadow-emerald-100/50 hover:border-emerald-200 transition-all duration-300 flex flex-col h-full">
                  {item.tag && (
                    <div className="absolute -top-3 left-8 px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full z-10 shadow-lg">
                      {item.tag}
                    </div>
                  )}

                  <div className="flex-1 mb-8">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110 ${item.category === 'supplies' ? 'bg-emerald-50 text-emerald-600' :
                      item.category === 'grants' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                      {item.category === 'supplies' ? <Gift className="w-7 h-7" /> :
                        item.category === 'grants' ? <Coins className="w-7 h-7" /> : <Star className="w-7 h-7" />}
                    </div>

                    <h3 className="text-xl font-black text-slate-800 tracking-tight mb-3 group-hover:text-emerald-600 transition-colors uppercase">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed leading-6">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Redeem Cost</p>
                      <div className="flex items-center gap-1">
                        <span className="text-2xl font-black text-slate-800">{item.cost}</span>
                        <span className="text-xs font-bold text-emerald-600">CLB</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onRedeem(item)}
                      disabled={balance < item.cost}
                      className={`h-12 px-6 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${balance >= item.cost
                        ? 'bg-slate-900 text-white hover:bg-emerald-500 shadow-lg shadow-slate-200 active:scale-95'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-60'
                        }`}
                    >
                      {balance >= item.cost ? 'REDEEM NOW' : 'LOCKED'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 units) */}
        <div className="lg:col-span-4 space-y-8">

          {/* ACHIVEMENT BADGES */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -mr-10 -mt-10" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-black text-slate-800 tracking-tight uppercase">Achievements</h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {badges.map((badge, idx) => (
                  <div key={idx} className={`flex flex-col items-center justify-center p-4 rounded-[2rem] border-2 transition-all ${badge.status === 'unlocked'
                    ? 'bg-white border-emerald-100 text-emerald-600 shadow-sm'
                    : 'bg-slate-50 border-slate-100 text-slate-300 opacity-60'
                    }`}>
                    <div className={`p-3 rounded-2xl mb-3 ${badge.status === 'unlocked' ? 'bg-emerald-50' : 'bg-slate-100'
                      }`}>
                      <badge.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-tight text-center leading-tight">
                      {badge.name}
                    </span>
                    {badge.status === 'locked' && <CircleDot className="w-3 h-3 mt-2" />}
                  </div>
                ))}
                <div className="flex flex-col items-center justify-center p-4 rounded-[2rem] border-2 border-dashed border-slate-200">
                  <div className="p-3 rounded-2xl bg-slate-50 text-slate-300 mb-3">
                    <CircleDot className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-tight text-slate-300">Next?</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Next Milestone</span>
                  <span className="text-[10px] font-black text-emerald-600">500 CLB</span>
                </div>
                <div className="h-4 bg-slate-100 rounded-xl overflow-hidden p-1">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-lg shadow-sm"
                    style={{ width: `${milestoneProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ACTIVITY LOG */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden">
            <div className="p-8 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg shadow-slate-200">
                    <History className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-black text-slate-800 tracking-tight uppercase">Recent Log</h4>
                </div>
                <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center text-xs font-black text-slate-400">
                  {txs.length}
                </div>
              </div>
            </div>

            <div className="p-4 overflow-y-auto max-h-[500px]">
              <div className="space-y-2">
                {txs.map((t, idx) => (
                  <div key={t.id} className="group relative flex items-center gap-4 p-4 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border-2 transition-all ${t.type === 'earn' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                      t.type === 'claim' ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-red-50 border-red-100 text-red-600'
                      }`}>
                      {t.type === 'earn' ? <ArrowUpRight className="w-6 h-6" /> :
                        t.type === 'claim' ? <ArrowUpRight className="w-6 h-6" /> : <ArrowDownLeft className="w-6 h-6" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h6 className="font-black text-slate-800 text-sm tracking-tight group-hover:text-emerald-600 transition-colors uppercase truncate">
                          {t.type} {t.type === 'redeem' ? 'Reward' : 'Credits'}
                        </h6>
                        <span className={`text-sm font-black tracking-tighter tabular-nums ${t.type === 'redeem' ? 'text-red-500' : 'text-emerald-600'
                          }`}>
                          {t.type === 'redeem' ? '-' : '+'}{t.amount}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] font-bold text-slate-400 truncate max-w-[120px]">{t.note}</p>
                        <span className="text-[8px] font-black text-slate-300 uppercase shrink-0">• {t.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-4 bg-white border border-slate-200 hover:border-emerald-200 text-slate-500 hover:text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all active:scale-95 shadow-sm">
                View Full Narrative
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* REDEEM CONFIRM MODAL */}
      {showConfirm && selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl p-10 relative overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="absolute top-0 left-0 w-full h-3 bg-emerald-500" />

            <button
              onClick={() => setShowConfirm(false)}
              className="absolute top-8 right-8 p-3 hover:bg-slate-100 rounded-full transition-all group"
            >
              <X className="w-6 h-6 text-slate-400 group-hover:rotate-90 transition-transform" />
            </button>

            <div className="text-center mt-6">
              <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm group">
                <ShoppingBag className="w-12 h-12 group-hover:scale-110 transition-transform" />
              </div>

              <h4 className="text-3xl font-black text-slate-800 tracking-tight mb-4 uppercase italic">Confirm Redemption</h4>
              <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10 px-4">
                You are about to redeem <span className="text-slate-900 font-bold">"{selectedItem.title}"</span> costing <span className="text-emerald-600 font-black">{selectedItem.cost} CLB</span>. Proceed with this transaction?
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 h-16 bg-slate-50 text-slate-400 rounded-2xl font-black text-sm tracking-[0.2em] hover:bg-slate-100 transition-all active:scale-95"
                >
                  ABORT
                </button>
                <button
                  onClick={confirmRedeem}
                  disabled={processing}
                  className="flex-1 h-16 bg-emerald-500 text-white rounded-2xl font-black text-sm tracking-[0.2em] shadow-xl shadow-emerald-200 hover:bg-emerald-600 transition-all active:scale-95 flex items-center justify-center relative"
                >
                  {processing ? (
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <div className="flex items-center gap-2">
                      VERIFY & REDEEM <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </CommunityLayout>
  );
}
