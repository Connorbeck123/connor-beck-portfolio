"use client";

import { useState } from "react";
import { SITE } from "@/content/site";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  return (
    <div>
      <a href={`mailto:${SITE.email}`} className="type-section link-hover block break-all">
        {SITE.email}
      </a>
      <button
        type="button"
        className="type-nav link-hover mt-2 inline-flex min-h-11 items-center text-ink-muted"
        onClick={async () => {
          await navigator.clipboard.writeText(SITE.email);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
      >
        <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
      </button>
    </div>
  );
}
