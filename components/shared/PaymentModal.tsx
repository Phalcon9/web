"use client";

import { useState } from "react";
import { CheckCircle2, CreditCard, Lock, ShieldCheck } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { useToast } from "@/providers/ToastProvider";
import { api, ApiError } from "@/lib/api/client";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
}

const lineItems = [
  { label: "Consultation — Cardiology", amount: 120 },
  { label: "Lab tests — Lipid panel", amount: 85 },
];
const total = lineItems.reduce((sum, i) => sum + i.amount, 0);

export function PaymentModal({ open, onClose }: PaymentModalProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [txnId, setTxnId] = useState("");

  const reset = () => {
    setLoading(false);
    setDone(false);
    setTxnId("");
  };

  const handleClose = () => {
    onClose();
    // Reset shortly after the close animation so state is fresh next open.
    setTimeout(reset, 250);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    try {
      const res = await api.post<{ transactionId: string }>("/payments", {
        cardName: String(fd.get("cardName") ?? ""),
        cardNumber: String(fd.get("cardNumber") ?? ""),
        expiry: String(fd.get("expiry") ?? "").replace(/\s/g, ""),
        cvc: String(fd.get("cvc") ?? ""),
        lineItems,
      });
      setTxnId(res.transactionId);
      setDone(true);
      toast({
        kind: "success",
        title: "Payment successful",
        description: `$${total} paid • ${res.transactionId}`,
      });
    } catch (err) {
      toast({
        kind: "error",
        title: "Payment failed",
        description:
          err instanceof ApiError ? err.message : "Please check your card details.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={done ? "Payment complete" : "Pay your bill"}
      description={
        done ? undefined : "Securely settle your outstanding balance."
      }
      maxWidth="max-w-md"
    >
      {done ? (
        <div className="flex flex-col items-center gap-4 py-2 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-500/15 text-accent-500">
            <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
          </span>
          <div>
            <h4 className="text-xl font-bold">Payment Successful</h4>
            <p className="text-muted mt-1 text-sm">
              Thank you. A receipt has been sent to your email.
            </p>
          </div>
          <dl className="surface-2 w-full rounded-2xl border p-4 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-muted">Amount paid</dt>
              <dd className="font-semibold">${total}.00</dd>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <dt className="text-muted">Transaction ID</dt>
              <dd className="font-mono text-xs font-semibold">{txnId}</dd>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <dt className="text-muted">Status</dt>
              <dd className="font-semibold text-accent-500">Confirmed</dd>
            </div>
          </dl>
          <Button type="button" onClick={handleClose} className="w-full">
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Bill summary */}
          <div className="surface-2 rounded-2xl border p-4">
            <p className="text-muted mb-3 text-xs font-semibold uppercase tracking-widest">
              Bill summary
            </p>
            <ul className="space-y-2 text-sm">
              {lineItems.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between gap-4"
                >
                  <span>{item.label}</span>
                  <span className="font-medium">${item.amount}.00</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between border-t pt-3 text-base font-bold">
              <span>Total due</span>
              <span>${total}.00</span>
            </div>
          </div>

          {/* Card fields */}
          <Input
            label="Cardholder name"
            name="cardName"
            placeholder="Jane A. Doe"
            autoComplete="cc-name"
            required
          />
          <Input
            label="Card number"
            name="cardNumber"
            inputMode="numeric"
            placeholder="4242 4242 4242 4242"
            autoComplete="cc-number"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Expiry"
              name="expiry"
              placeholder="MM / YY"
              autoComplete="cc-exp"
              required
            />
            <Input
              label="CVC"
              name="cvc"
              inputMode="numeric"
              placeholder="123"
              autoComplete="cc-csc"
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <CreditCard className="h-5 w-5 animate-pulse" />
                Processing…
              </>
            ) : (
              <>
                <Lock className="h-5 w-5" />
                Pay ${total} securely
              </>
            )}
          </Button>

          <div className="text-muted flex flex-col items-center gap-2 text-center text-xs">
            <div className="flex items-center justify-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" aria-hidden="true" /> 256-bit
                encryption
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> PCI
                compliant
              </span>
            </div>
            <p>This is a demo — no real card is charged.</p>
          </div>
        </form>
      )}
    </Modal>
  );
}
