import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Collections", href: "#products" },
  { label: "Eyewear", href: "#types" },
  { label: "Journey", href: "#journey" },
  { label: "Brands", href: "#brands" },
  { label: "About", href: "#why-nile" },
];

const GLASS_STYLE = {
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  background: "rgba(245,244,240,0.30)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.06)",
} as const;

const GLASS_STYLE_SOLID = {
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  background: "rgba(245,244,240,0.85)",
  boxShadow: "0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08)",
} as const;

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <div
      className={`fixed z-50 flex justify-center px-4 pointer-events-none transition-all duration-500 ${
        isScrolled
          ? "top-4 inset-x-0"
          : "top-0 inset-x-0"
      }`}
    >
      <div
        className={`pointer-events-auto w-full transition-all duration-500 ${
          isScrolled ? "max-w-3xl" : "max-w-[1400px]"
        }`}
      >
        {/* Main bar */}
        <nav
          className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled
              ? "px-5 py-3 rounded-2xl border border-black/[0.06]"
              : "px-6 lg:px-10 py-5 rounded-none border-b border-black/[0.04]"
          }`}
          style={isScrolled ? GLASS_STYLE : undefined}
        >
          {/* Logo */}
          <div className="flex flex-col items-start gap-0.5">
            <span
              className={`font-pixel tracking-[0.25em] text-black/70 transition-all duration-500 ${
                isScrolled ? "text-xs" : "text-sm"
              }`}
            >
              NILE
            </span>
          </div>

          {/* Desktop links */}
          <div
            className="hidden md:flex items-center gap-7"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={`text-black/60 hover:text-black transition-all duration-200 tracking-wide relative group ${
                  isScrolled ? "text-[11px]" : "text-sm"
                }`}
              >
                {l.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"
                />
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
         <button
  className="text-[10px] px-3 py-1.5 rounded-xl bg-black text-white hover:bg-black/80 transition-all duration-200 tracking-wide hidden md:block"
  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
>
  VISIT US
</button>

            {/* Burger — mobile only */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] rounded-lg hover:bg-black/[0.04] transition-colors"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span
                className="block h-px bg-black/60 transition-all duration-300 origin-center"
                style={{
                  width: "18px",
                  transform: open
                    ? "translateY(6px) rotate(45deg)"
                    : "none",
                }}
              />
              <span
                className="block h-px bg-black/60 transition-all duration-300"
                style={{
                  width: "18px",
                  opacity: open ? 0 : 1,
                  transform: open ? "scaleX(0)" : "none",
                }}
              />
              <span
                className="block h-px bg-black/60 transition-all duration-300 origin-center"
                style={{
                  width: "18px",
                  transform: open
                    ? "translateY(-6px) rotate(-45deg)"
                    : "none",
                }}
              />
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        <div
          className="md:hidden mt-2 overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: open ? "320px" : "0px", opacity: open ? 1 : 0 }}
        >
          <div
            className="rounded-2xl border border-black/[0.06] px-2 py-2 flex flex-col"
            style={GLASS_STYLE_SOLID}
          >
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.label}
                href={l.href}
                onClick={close}
                className={`px-4 py-3 text-sm text-black/60 hover:text-black hover:bg-black/[0.03] rounded-xl transition-all tracking-wide ${
                  open
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  transitionDelay: open ? `${i * 50}ms` : "0ms",
                }}
              >
                {l.label}
              </a>
            ))}
            <div className="mt-1 px-2 pb-1">
              <button
                className="w-full text-[11px] px-4 py-2.5 rounded-xl border border-black/10 text-black/60 hover:text-black hover:border-black/20 hover:bg-black/[0.03] transition-all duration-200 tracking-wide"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                VISIT US
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}