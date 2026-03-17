"use client";

import { motion, AnimatePresence } from "framer-motion";
import { DemoOrder } from "@/lib/store/ordersStore";
import { formatPrice } from "@/lib/utils/format";

interface ReceiptModalProps {
  order: DemoOrder | null;
  onClose: () => void;
}

export default function ReceiptModal({ order, onClose }: ReceiptModalProps) {
  if (!order) return null;

  const tax = Math.round(order.totalAmount * 0.18);
  const subtotal = order.totalAmount - tax;
  const now = new Date();
  const dateStr = now.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
  const timeStr = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  const receiptNo = `NL-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${order.id.replace(/\D/g, "").padStart(4, "0")}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[70]" onClick={onClose}>
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div
            className="w-full max-w-[300px] bg-[#faf8f2] rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Zigzag top */}
            <div className="h-3 bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,#faf8f2_8px,#faf8f2_16px)] bg-dark-1" />

            <div className="px-5 py-4 text-[#1a1a1a]">
              {/* Header */}
              <div className="text-center border-b border-dashed border-[#ccc] pb-3 mb-3">
                <p className="font-bold text-lg tracking-wider">NIGHTLIFE</p>
                <p className="text-[9px] text-[#666] mt-0.5">Libreville · Gabon</p>
                <p className="text-[8px] text-[#999] mt-0.5">Tel: +241 01 XX XX XX</p>
              </div>

              {/* Receipt info */}
              <div className="flex justify-between text-[8px] text-[#666] mb-3">
                <div>
                  <p>Reçu: {receiptNo}</p>
                  <p>Table: {order.table}</p>
                </div>
                <div className="text-right">
                  <p>{dateStr}</p>
                  <p>{timeStr}</p>
                </div>
              </div>

              {/* Items */}
              <div className="border-t border-b border-dashed border-[#ccc] py-2 mb-2">
                <div className="flex justify-between text-[8px] font-bold text-[#333] mb-1">
                  <span>Article</span>
                  <span>Montant</span>
                </div>
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-[9px] text-[#444] py-0.5">
                    <span>{item.quantity}× {item.name}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-1 mb-3">
                <div className="flex justify-between text-[9px] text-[#666]">
                  <span>Sous-total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[9px] text-[#666]">
                  <span>TVA (18%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-[12px] font-bold text-[#1a1a1a] pt-1 border-t border-[#ddd]">
                  <span>TOTAL</span>
                  <span>{formatPrice(order.totalAmount)} XAF</span>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center border-t border-dashed border-[#ccc] pt-3">
                <p className="text-[9px] text-[#666]">Serveur: {order.waiter}</p>
                <p className="text-[10px] font-medium text-[#333] mt-1">Merci de votre visite !</p>
                <p className="text-[8px] text-[#999] mt-0.5">À bientôt chez NightLife 🌙</p>

                {/* Barcode simulation */}
                <div className="mt-3 flex items-center justify-center gap-[1px]">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-[#1a1a1a]"
                      style={{
                        width: [1, 2, 1, 3, 1, 2][i % 6] + "px",
                        height: "20px",
                      }}
                    />
                  ))}
                </div>
                <p className="text-[7px] text-[#bbb] mt-1 font-mono">{receiptNo}</p>
              </div>
            </div>

            {/* Zigzag bottom */}
            <div className="h-3 bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,#faf8f2_8px,#faf8f2_16px)] bg-dark-1" />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
