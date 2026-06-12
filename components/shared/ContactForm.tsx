"use client";

import { useState } from "react";
import {
  CheckCircle2,
  CreditCard,
  MessageSquareText,
  Send,
} from "lucide-react";
import { Card } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { useToast } from "@/providers/ToastProvider";
import { PaymentModal } from "@/components/shared/PaymentModal";
import { api, ApiError } from "@/lib/api/client";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [payOpen, setPayOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    reason: "General enquiry",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const update = (key: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key as keyof Errors]) {
      setErrors((e) => ({ ...e, [key]: undefined }));
    }
  };

  const validate = (): boolean => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!emailRe.test(form.email))
      next.email = "Please enter a valid email address.";
    if (!form.message.trim()) next.message = "Please enter a message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await api.post("/contact", {
        name: form.name,
        email: form.email,
        reason: form.reason,
        message: form.message,
      });
      setSent(true);
      toast({
        kind: "success",
        title: "Message sent",
        description: "Our team will get back to you within one business day.",
      });
      setForm({ name: "", email: "", reason: "General enquiry", message: "" });
    } catch (err) {
      toast({
        kind: "error",
        title: "Could not send message",
        description: err instanceof ApiError ? err.message : "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const openChat = () => window.dispatchEvent(new Event("lc:open-chat"));

  return (
    <div className="space-y-6">
      {/* Quick actions */}
      <Card className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={openChat}
          className="flex-1"
        >
          <MessageSquareText className="h-5 w-5" />
          Start Live Chat
        </Button>
        <Button
          type="button"
          variant="gold"
          onClick={() => setPayOpen(true)}
          className="flex-1"
        >
          <CreditCard className="h-5 w-5" />
          Pay a Bill online
        </Button>
      </Card>

      {/* Message form */}
      <Card>
        <h3 className="font-display text-xl font-bold">Send us a message</h3>
        <p className="text-muted mt-1 text-sm">
          Fill in the form and we&apos;ll respond within one business day.
        </p>

        {sent && (
          <div
            role="status"
            className="mt-5 flex items-start gap-3 rounded-2xl border border-accent-500/30 bg-accent-500/10 p-4 text-sm"
          >
            <CheckCircle2
              className="mt-0.5 h-5 w-5 shrink-0 text-accent-500"
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold">Thank you — your message is on its way.</p>
              <p className="text-muted mt-0.5">
                A member of our care team will be in touch shortly.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Full name"
              name="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              error={errors.name}
              autoComplete="name"
              required
            />
            <Input
              label="Email address"
              type="email"
              name="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              error={errors.email}
              autoComplete="email"
              required
            />
          </div>

          <Select
            label="Reason for contact"
            name="reason"
            value={form.reason}
            onChange={(e) => update("reason", e.target.value)}
          >
            <option>General enquiry</option>
            <option>Appointment</option>
            <option>Billing</option>
            <option>Feedback</option>
          </Select>

          <Textarea
            label="Message"
            name="message"
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            error={errors.message}
            placeholder="How can we help you today?"
            rows={5}
            required
          />

          <Button type="submit" disabled={loading} className="w-full sm:w-auto">
            {loading ? (
              <>
                <Send className="h-5 w-5 animate-pulse" />
                Sending…
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Send message
              </>
            )}
          </Button>
        </form>
      </Card>

      <PaymentModal open={payOpen} onClose={() => setPayOpen(false)} />
    </div>
  );
}
