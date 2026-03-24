"use client";

import { useState } from "react";
import { Star, Send, Check, MessageSquare } from "lucide-react";

interface Review {
  id: string;
  venue: string;
  rating: number;
  comment: string;
  date: string;
  response?: string;
}

const myReviews: Review[] = [
  { id: "r1", venue: "Le Privilège Lounge", rating: 5, comment: "Les cocktails sont incroyables, meilleur lounge de Libreville !", date: "15 mars 2026", response: "Merci beaucoup Jean-Baptiste ! Au plaisir de vous revoir 🍸" },
  { id: "r2", venue: "Chez Mama Rose", rating: 4, comment: "Très bon poulet braisé, portions généreuses. Le service était un peu lent.", date: "10 mars 2026" },
];

const pendingReviews = [
  { venue: "Le Privilège Lounge", visitDate: "22 mars 2026", emoji: "🍸" },
  { venue: "Club 241", visitDate: "20 mars 2026", emoji: "🎵" },
];

export default function AvisPage() {
  const [writing, setWriting] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState<string[]>([]);

  function handleSubmit(venue: string) {
    setSubmitted([...submitted, venue]);
    setWriting(null);
    setRating(0);
    setComment("");
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Mes avis</h1>

      {/* Pending reviews */}
      {pendingReviews.filter((p) => !submitted.includes(p.venue)).length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gold mb-3">À évaluer</h2>
          <div className="space-y-2">
            {pendingReviews.filter((p) => !submitted.includes(p.venue)).map((p) => (
              <div key={p.venue}>
                {writing === p.venue ? (
                  <div className="glass rounded-xl p-4 space-y-3 border-gold/20">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{p.emoji}</span>
                      <div>
                        <p className="font-semibold text-sm">{p.venue}</p>
                        <p className="text-xs text-text-dim">Visite du {p.visitDate}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button key={s} onClick={() => setRating(s)}>
                          <Star size={28} className={s <= rating ? "text-gold fill-gold" : "text-text-dim"} />
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={3}
                      placeholder="Partagez votre expérience..."
                      className="w-full px-4 py-2.5 bg-surface-light border border-border rounded-xl text-sm resize-none focus:outline-none focus:border-gold/50 placeholder:text-text-dim"
                    />
                    <div className="flex gap-2">
                      <button onClick={() => setWriting(null)} className="flex-1 py-2.5 border border-border rounded-xl text-sm text-text-muted">
                        Annuler
                      </button>
                      <button
                        onClick={() => handleSubmit(p.venue)}
                        disabled={rating === 0}
                        className="flex-1 py-2.5 bg-gradient-gold text-black rounded-xl text-sm font-semibold disabled:opacity-40 flex items-center justify-center gap-1"
                      >
                        <Send size={14} /> Publier
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setWriting(p.venue)}
                    className="w-full glass rounded-xl p-4 flex items-center justify-between hover:border-gold/20 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{p.emoji}</span>
                      <div className="text-left">
                        <p className="font-semibold text-sm">{p.venue}</p>
                        <p className="text-xs text-text-dim">Visite du {p.visitDate}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gold font-medium">Donner mon avis</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submitted confirmation */}
      {submitted.length > 0 && (
        <div className="bg-success/10 border border-success/20 rounded-xl p-4 flex items-center gap-3">
          <Check size={20} className="text-success" />
          <p className="text-sm text-success">Merci pour votre avis ! +50 points fidélité</p>
        </div>
      )}

      {/* My reviews */}
      <div>
        <h2 className="text-sm font-semibold mb-3">Mes avis publiés</h2>
        <div className="space-y-3">
          {myReviews.map((r) => (
            <div key={r.id} className="glass rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-sm">{r.venue}</p>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className={s <= r.rating ? "text-gold fill-gold" : "text-text-dim"} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-text-muted">{r.comment}</p>
              <p className="text-[10px] text-text-dim mt-2">{r.date}</p>

              {r.response && (
                <div className="mt-3 p-3 bg-surface-light rounded-lg border-l-2 border-gold">
                  <p className="text-xs text-text-dim mb-1 flex items-center gap-1">
                    <MessageSquare size={10} /> Réponse du gérant
                  </p>
                  <p className="text-xs text-text-muted">{r.response}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {myReviews.length === 0 && submitted.length === 0 && (
        <div className="text-center py-12 text-text-muted">
          <Star size={40} className="mx-auto mb-3 text-text-dim" />
          <p>Vous n&apos;avez pas encore laissé d&apos;avis</p>
        </div>
      )}
    </div>
  );
}
