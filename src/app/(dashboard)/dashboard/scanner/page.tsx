"use client";

import { useState } from "react";
import { QrCode, Check, X, User, Ticket, Clock, AlertTriangle } from "lucide-react";

interface ScanResult {
  success: boolean;
  type: "ticket" | "member" | "unknown";
  data: {
    name?: string;
    ticketType?: string;
    event?: string;
    loyaltyTier?: string;
    points?: number;
    message: string;
  };
}

const demoScans: Record<string, ScanResult> = {
  "NL-EVT001-VIP-001": {
    success: true, type: "ticket",
    data: { name: "Kevin Akure", ticketType: "VIP", event: "Soirée Afrobeats", message: "Ticket VIP valide — Accès zone VIP autorisé" },
  },
  "NL-EVT001-NRM-002": {
    success: true, type: "ticket",
    data: { name: "Sandra Mintsa", ticketType: "Normal", event: "Soirée Afrobeats", message: "Ticket Normal valide — Entrée autorisée" },
  },
  "NL-EVT001-VVIP-003": {
    success: false, type: "ticket",
    data: { name: "Junior Moussavou", ticketType: "VVIP", event: "Soirée Afrobeats", message: "Ticket déjà utilisé !" },
  },
  "NL-MBR-GOLD-001": {
    success: true, type: "member",
    data: { name: "Jean-Baptiste Moussavou", loyaltyTier: "Gold", points: 2450, message: "Membre Gold — +10 points ajoutés" },
  },
};

export default function ScannerPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [history, setHistory] = useState<{ code: string; result: ScanResult; time: string }[]>([]);

  function handleScan() {
    if (!input.trim()) return;
    const scanResult = demoScans[input] || {
      success: false, type: "unknown" as const,
      data: { message: `Code "${input}" non reconnu` },
    };
    setResult(scanResult);
    setHistory([
      { code: input, result: scanResult, time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) },
      ...history,
    ]);
    setInput("");
    setTimeout(() => setResult(null), 5000);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <QrCode size={24} className="text-gold" /> Scanner
        </h1>
        <p className="text-sm text-text-muted">Scannez les QR codes tickets et cartes membres</p>
      </div>

      {/* Scanner area */}
      <div className="glass rounded-2xl p-8 text-center">
        <div className="w-48 h-48 mx-auto border-2 border-dashed border-gold/30 rounded-2xl flex items-center justify-center mb-6 bg-gold/5">
          <QrCode size={64} className="text-gold/40" />
        </div>

        <div className="flex gap-3 max-w-md mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleScan()}
            placeholder="Entrez ou scannez un code QR..."
            className="flex-1 px-4 py-3 bg-surface-light border border-border rounded-xl text-sm text-center focus:outline-none focus:border-gold/50"
            autoFocus
          />
          <button onClick={handleScan} disabled={!input.trim()} className="px-6 py-3 bg-gradient-gold text-black font-semibold rounded-xl disabled:opacity-40">
            Scanner
          </button>
        </div>

        <p className="text-xs text-text-dim mt-3">
          Codes démo : NL-EVT001-VIP-001 | NL-EVT001-NRM-002 | NL-MBR-GOLD-001
        </p>
      </div>

      {/* Result overlay */}
      {result && (
        <div className={`rounded-xl p-6 border-2 transition-all ${
          result.success ? "border-success/50 bg-success/10" : "border-danger/50 bg-danger/10"
        }`}>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              result.success ? "bg-success/20" : "bg-danger/20"
            }`}>
              {result.success ? <Check size={32} className="text-success" /> : <X size={32} className="text-danger" />}
            </div>
            <div>
              <p className={`text-lg font-bold ${result.success ? "text-success" : "text-danger"}`}>
                {result.success ? "VALIDÉ" : "REFUSÉ"}
              </p>
              <p className="text-sm text-text-muted">{result.data.message}</p>
              {result.data.name && (
                <div className="flex items-center gap-3 mt-2 text-sm">
                  <span className="flex items-center gap-1"><User size={14} /> {result.data.name}</span>
                  {result.data.ticketType && <span className="px-2 py-0.5 bg-gold/20 text-gold rounded-full text-xs">{result.data.ticketType}</span>}
                  {result.data.loyaltyTier && <span className="px-2 py-0.5 bg-gold/20 text-gold rounded-full text-xs">{result.data.loyaltyTier}</span>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Scan history */}
      {history.length > 0 && (
        <div className="glass rounded-xl">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold">Historique des scans</h2>
          </div>
          <div className="divide-y divide-border">
            {history.slice(0, 10).map((entry, i) => (
              <div key={i} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  {entry.result.success ? <Check size={16} className="text-success" /> : <X size={16} className="text-danger" />}
                  <div>
                    <p className="text-sm font-medium">{entry.result.data.name || entry.code}</p>
                    <p className="text-xs text-text-dim">{entry.result.data.message}</p>
                  </div>
                </div>
                <span className="text-xs text-text-dim">{entry.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
