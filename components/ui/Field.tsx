"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-xl border bg-transparent px-4 text-sm transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus-visible:outline-gold-500 disabled:opacity-50";

interface LabelWrapProps {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}

function LabelWrap({
  label,
  required,
  hint,
  error,
  htmlFor,
  children,
}: LabelWrapProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
      {error ? (
        <p role="alert" className="text-xs font-medium text-red-500">
          {error}
        </p>
      ) : hint ? (
        <p className="text-muted text-xs">{hint}</p>
      ) : null}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, required, className, id, ...props },
  ref,
) {
  const generated = useId();
  const fieldId = id ?? generated;
  return (
    <LabelWrap
      label={label}
      required={required}
      hint={hint}
      error={error}
      htmlFor={fieldId}
    >
      <input
        id={fieldId}
        ref={ref}
        required={required}
        aria-invalid={!!error}
        className={cn(fieldBase, "h-12", error && "border-red-400", className)}
        {...props}
      />
    </LabelWrap>
  );
});

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, error, required, className, id, children, ...props },
  ref,
) {
  const generated = useId();
  const fieldId = id ?? generated;
  return (
    <LabelWrap
      label={label}
      required={required}
      hint={hint}
      error={error}
      htmlFor={fieldId}
    >
      <select
        id={fieldId}
        ref={ref}
        required={required}
        aria-invalid={!!error}
        className={cn(
          fieldBase,
          "h-12 cursor-pointer surface",
          error && "border-red-400",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    </LabelWrap>
  );
});

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { label, hint, error, required, className, id, ...props },
    ref,
  ) {
    const generated = useId();
    const fieldId = id ?? generated;
    return (
      <LabelWrap
        label={label}
        required={required}
        hint={hint}
        error={error}
        htmlFor={fieldId}
      >
        <textarea
          id={fieldId}
          ref={ref}
          required={required}
          aria-invalid={!!error}
          className={cn(
            fieldBase,
            "min-h-[120px] resize-y py-3",
            error && "border-red-400",
            className,
          )}
          {...props}
        />
      </LabelWrap>
    );
  },
);
