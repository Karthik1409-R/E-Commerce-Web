"use client";

import { useState } from "react";
import {
  Settings,
  Shield,
  Bell,
  Globe,
  Database,
  Zap,
  Save,
  RefreshCcw,
  Lock,
  Server,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function AdminSettingsPage() {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSave = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1500);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0D0D0D] text-white p-6 lg:p-10 overflow-hidden">
      {/* 2026 Bioluminescent Layer */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-600/5 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto space-y-12">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Settings size={20} />
              </div>
              <h1 className="text-4xl font-black tracking-tighter uppercase">
                System Config
              </h1>
            </div>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">
              Nexus Platform Core Parameters
            </p>
          </div>
          <Button
            onClick={handleSave}
            className="bg-white text-black hover:bg-purple-600 hover:text-white font-black text-xs h-12 px-8 rounded-2xl gap-2 transition-all active:scale-95 shadow-xl shadow-white/5"
          >
            {isSyncing ? (
              <RefreshCcw size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            COMMIT CHANGES
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* NAVIGATION SIDEBAR (Internal) */}
          <div className="space-y-2">
            {["General", "Security", "Transmissions", "Database"].map(
              (item) => (
                <button
                  key={item}
                  className={`w-full text-left px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${
                    item === "General"
                      ? "bg-purple-500/10 border-purple-500/20 text-purple-400"
                      : "bg-white/5 border-transparent text-white/40 hover:bg-white/10"
                  }`}
                >
                  {item}
                </button>
              )
            )}
          </div>

          {/* MAIN SETTINGS FORM */}
          <div className="lg:col-span-2 space-y-8">
            {/* Sector 01: Platform Identity */}
            <section className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Globe size={18} className="text-cyan-400" />
                <h2 className="text-lg font-bold uppercase tracking-tight">
                  Platform Identity
                </h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-white/30 ml-1">
                      Terminal Name
                    </Label>
                    <Input
                      className="h-12 bg-white/5 border-white/10 rounded-xl"
                      placeholder="Nexus Admin"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-white/30 ml-1">
                      Support Frequency
                    </Label>
                    <Input
                      className="h-12 bg-white/5 border-white/10 rounded-xl"
                      placeholder="ops@nexus.com"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Sector 02: Transmission Alerts */}
            <section className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Bell size={18} className="text-purple-400" />
                <h2 className="text-lg font-bold uppercase tracking-tight">
                  System Notifications
                </h2>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Order Sync",
                    desc: "Notify on new acquisition signals",
                    icon: Zap,
                  },
                  {
                    title: "Security Pulse",
                    desc: "Alert on unauthorized access attempts",
                    icon: Lock,
                  },
                  {
                    title: "Server Health",
                    desc: "Monitor database latency thresholds",
                    icon: Server,
                  },
                ].map((toggle, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-purple-500/30 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-black/40 text-white/40 group-hover:text-purple-400 transition-colors">
                        <toggle.icon size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{toggle.title}</p>
                        <p className="text-[10px] text-white/30 font-medium">
                          {toggle.desc}
                        </p>
                      </div>
                    </div>
                    <Switch className="data-[state=checked]:bg-purple-500" />
                  </div>
                ))}
              </div>
            </section>

            {/* Sector 03: Security Firewall */}
            <section className="p-8 rounded-[2.5rem] bg-gradient-to-br from-rose-500/5 to-transparent border border-rose-500/10 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Shield size={18} className="text-rose-500" />
                  <h2 className="text-lg font-bold uppercase tracking-tight">
                    Security Protocol
                  </h2>
                </div>
                <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-[8px] font-black text-rose-500 uppercase tracking-widest">
                  High Alert
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-4">
                    Encryption Keys
                  </p>
                  <div className="flex gap-2">
                    <Input
                      className="h-10 font-mono text-xs bg-white/5 border-white/10"
                      value="NX-829-PRIVATE-G82"
                      readOnly
                    />
                    <Button
                      variant="outline"
                      className="h-10 border-white/10 text-[10px] font-black"
                    >
                      ROTATE
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.2);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.4);
        }
      `}</style>
    </div>
  );
}
