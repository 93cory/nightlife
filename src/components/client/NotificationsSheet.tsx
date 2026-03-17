"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useNotificationsStore, Notification } from "@/lib/store/notificationsStore";
import { formatRelativeTime } from "@/lib/utils/format";

const TYPE_COLORS: Record<string, string> = {
  order: "bg-info/10 border-info/20",
  promo: "bg-accent/10 border-accent/20",
  loyalty: "bg-gold/10 border-gold/20",
  system: "bg-dark-3 border-white/[0.06]",
  event: "bg-purple/10 border-purple/20",
};

interface NotificationsSheetProps {
  open: boolean;
  onClose: () => void;
}

export default function NotificationsSheet({ open, onClose }: NotificationsSheetProps) {
  const notifications = useNotificationsStore((s) => s.notifications);
  const markRead = useNotificationsStore((s) => s.markRead);
  const markAllRead = useNotificationsStore((s) => s.markAllRead);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60]" onClick={onClose}>
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 max-w-md mx-auto bg-dark-1 border-t border-white/[0.06] rounded-t-3xl max-h-[80vh] flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-white/10 rounded-full" />
            </div>

            <div className="px-5 pb-3 flex items-center justify-between border-b border-white/[0.04]">
              <div>
                <h2 className="font-display text-lg tracking-[0.15em] text-cream">Notifications</h2>
                <p className="text-[9px] text-muted">{unreadCount} non lue{unreadCount > 1 ? "s" : ""}</p>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-[9px] text-gold tracking-wider btn-press"
                >
                  TOUT LIRE
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-3 space-y-2">
              {notifications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-3 opacity-20">🔔</div>
                  <p className="text-[11px] text-muted">Aucune notification</p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <motion.button
                    key={notif.id}
                    layout
                    onClick={() => markRead(notif.id)}
                    className={`w-full text-left rounded-xl p-3.5 border transition-all ${
                      notif.read
                        ? "bg-dark-2 border-white/[0.04] opacity-60"
                        : TYPE_COLORS[notif.type] || TYPE_COLORS.system
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-dark-3 flex items-center justify-center text-lg shrink-0">
                        {notif.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-[11px] font-medium text-cream">{notif.title}</p>
                          {!notif.read && (
                            <div className="w-2 h-2 rounded-full bg-accent shrink-0 ml-2" />
                          )}
                        </div>
                        <p className="text-[9px] text-muted mt-0.5 leading-relaxed">{notif.message}</p>
                        <p className="text-[8px] text-muted/50 mt-1">{formatRelativeTime(notif.createdAt)}</p>
                      </div>
                    </div>
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
