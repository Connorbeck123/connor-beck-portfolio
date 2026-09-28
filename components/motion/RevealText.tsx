import { Fragment } from "react";

/**
 * Splits large type into per-word masks for the data-reveal="text" rise. Put data-reveal="text" on the parent heading.
 * Avoid on text that underlines on hover: decorations don't reach inline-block children.
 */
export function RevealText({ children }: { children: string }) {
  const words = children.split(" ");

  return words.map((word, index) => (
    <Fragment key={index}>
      <span className="reveal-word">
        <span style={{ "--word": index } as React.CSSProperties}>{word}</span>
      </span>
      {index < words.length - 1 ? " " : null}
    </Fragment>
  ));
}
