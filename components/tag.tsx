import React from "react"

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] tracking-widest font-sans text-black/40">
      {children}
    </span>
  )
}
