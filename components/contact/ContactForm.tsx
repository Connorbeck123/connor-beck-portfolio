"use client";

import { useState } from "react";
import { SERVICES } from "@/content/services";
import { SITE } from "@/content/site";
import { cn } from "@/lib/cn";

function InField({
  label,
  htmlFor,
  optional,
  multiline,
  children,
  filled,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  multiline?: boolean;
  filled: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <label
        htmlFor={htmlFor}
        className={cn(
          "pointer-events-none absolute left-4 z-10 text-ink-muted transition-opacity duration-300 ease-[var(--ease-soft)]",
          multiline ? "top-3.5" : "top-1/2 -translate-y-1/2",
          filled && "opacity-0",
        )}
      >
        {label}
        {optional ? <span className="ml-1.5 text-ink-muted/60">Optional</span> : null}
      </label>
      {children}
    </div>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [filled, setFilled] = useState({
    name: false,
    email: false,
    budget: false,
    timeline: false,
    message: false,
  });

  const mark = (key: keyof typeof filled) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFilled((current) => ({ ...current, [key]: event.target.value.trim().length > 0 }));
  };

  if (sent) {
    return (
      <div role="status" className="rounded-media border border-line p-8 md:p-10">
        <p className="type-section">Thanks — your message is on its way.</p>
        <p className="mt-4 text-ink-muted">{SITE.responseTime}</p>
        <p className="mt-6 text-sm text-ink-muted">
          Prototype: this form isn’t connected yet. Nothing was sent.
        </p>
        <button type="button" onClick={() => setSent(false)} className="btn btn-secondary mt-8">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <InField label="Name" htmlFor="name" filled={filled.name}>
          <input id="name" name="name" autoComplete="name" required className="field" onChange={mark("name")} />
        </InField>
        <InField label="Email" htmlFor="email" filled={filled.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="field"
            onChange={mark("email")}
          />
        </InField>
      </div>

      <fieldset>
        <legend className="mb-3 text-sm text-ink-muted">What do you need?</legend>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((service) => (
            <label
              key={service.slug}
              className="flex min-h-11 cursor-pointer items-center gap-2 rounded-media border border-line px-4 hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent has-[:checked]:text-canvas has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent"
            >
              <input type="checkbox" name="services" value={service.slug} className="sr-only" />
              {service.title}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <InField label="Budget" htmlFor="budget" optional filled={filled.budget}>
          <select
            id="budget"
            name="budget"
            className={cn("field", !filled.budget && "text-transparent")}
            defaultValue=""
            onChange={mark("budget")}
          >
            <option value="" />
            <option>Under £2k</option>
            <option>£2k – £5k</option>
            <option>£5k – £10k</option>
            <option>£10k+</option>
            <option>Not sure yet</option>
          </select>
        </InField>
        <InField label="Timeline" htmlFor="timeline" optional filled={filled.timeline}>
          <select
            id="timeline"
            name="timeline"
            className={cn("field", !filled.timeline && "text-transparent")}
            defaultValue=""
            onChange={mark("timeline")}
          >
            <option value="" />
            <option>As soon as possible</option>
            <option>Within a month</option>
            <option>1–3 months</option>
            <option>Flexible</option>
          </select>
        </InField>
      </div>

      <InField label="Message" htmlFor="message" multiline filled={filled.message}>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="field resize-y"
          onChange={mark("message")}
        />
      </InField>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-primary self-start">
          Send message
        </button>
        <p className="text-sm text-ink-muted">{SITE.responseTime}</p>
      </div>
    </form>
  );
}
