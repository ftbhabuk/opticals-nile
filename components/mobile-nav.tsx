import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Journey", href: "/journey" },
];

const GLASS_STYLE = {
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  background: "rgba(255,255,255,0.72)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.06)",
} as const;

const GLASS_STYLE_SOLID = {
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  background: "rgba(255,255,255,0.92)",
  boxShadow: "0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08)",
} as const;

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isJourney = location.pathname === "/journey";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const close = () => setOpen(false);
  const onHero = !isScrolled;

  return (
    <div
      className={`fixed z-50 flex justify-center pointer-events-none transition-all duration-500 ${
        isScrolled ? "top-4 inset-x-0" : "top-0 inset-x-0"
      }`}
    >
      <div
        className={`pointer-events-auto w-full transition-all duration-500 ${
          isScrolled ? "max-w-3xl" : "max-w-none"
        }`}
      >
        <nav
          className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled
              ? "px-5 py-3 rounded-2xl border border-black/[0.06]"
               : "px-6 lg:px-10 py-5 rounded-none border-b border-white/10"
          }`}
          style={isScrolled ? GLASS_STYLE : undefined}
        >
          <Link to="/" className="flex flex-col items-start gap-0.5">
            <span
              className={`font-pixel tracking-[0.25em] transition-all duration-500 ${
                isScrolled ? "text-xs text-black/70" : "text-sm text-white/90"
              }`}
            >
              NILE
            </span>
          </Link>

          <div
            className="hidden md:flex items-center gap-7"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            {NAV_LINKS.map((l) => {
              const hasHash = l.href.includes("#")
              const isActive = location.pathname === l.href
              const linkClass = `transition-all duration-200 tracking-wide relative group ${
                isScrolled
                  ? "text-[11px] text-black/60 hover:text-black"
                  : "text-sm text-white/75 hover:text-white"
              }`
              const underline = (
                <span
                  className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                    onHero ? "bg-white" : "bg-black"
                  } ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              )
              return hasHash ? (
                <a key={l.label} href={l.href} className={linkClass}>
                  {l.label}{underline}
                </a>
              ) : (
                <Link key={l.label} to={l.href} className={linkClass}>
                  {l.label}{underline}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={isJourney ? "#gallery" : "/journey"}
              className={`text-[10px] px-3 py-1.5 rounded-xl transition-all duration-200 tracking-wide hidden md:block ${
                isScrolled
                  ? "bg-black text-white hover:bg-black/80"
                  : "border border-white/80 text-white hover:bg-white/10"
              }`}
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              VISIT US
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              className={`md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] rounded-lg transition-colors ${
                onHero ? "hover:bg-white/10" : "hover:bg-black/[0.04]"
              }`}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`block h-px transition-all duration-300 origin-center ${
                    onHero ? "bg-white/80" : "bg-black/60"
                  }`}
                  style={{
                    width: "18px",
                    ...(i === 0
                      ? { transform: open ? "translateY(6px) rotate(45deg)" : "none" }
                      : i === 1
                        ? { opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "none" }
                        : { transform: open ? "translateY(-6px) rotate(-45deg)" : "none" }),
                  }}
                />
              ))}
            </button>
          </div>
        </nav>

        <div
          className="md:hidden mt-2 overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: open ? "320px" : "0px", opacity: open ? 1 : 0 }}
        >
          <div
            className="rounded-2xl border border-black/[0.06] px-2 py-2 flex flex-col"
            style={GLASS_STYLE_SOLID}
          >
            {NAV_LINKS.map((l, i) => {
              const hasHash = l.href.includes("#")
              const isActive = location.pathname === l.href
              const linkClass = `px-4 py-3 text-sm rounded-xl transition-all tracking-wide ${
                isActive
                  ? "text-black font-medium bg-black/[0.04]"
                  : "text-black/60 hover:text-black hover:bg-black/[0.03]"
              } ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`
              const delayStyle = {
                fontFamily: "system-ui, -apple-system, sans-serif",
                transitionDelay: open ? `${i * 50}ms` : "0ms",
              }
              return hasHash ? (
                <a key={l.label} href={l.href} onClick={close} className={linkClass} style={delayStyle}>
                  {l.label}
                </a>
              ) : (
                <Link key={l.label} to={l.href} onClick={close} className={linkClass} style={delayStyle}>
                  {l.label}
                </Link>
              )
            })}
            <div className="mt-1 px-2 pb-1">
              <a
                href={isJourney ? "#gallery" : "/journey"}
                onClick={close}
                className="block w-full text-center text-[11px] px-4 py-2.5 rounded-xl border border-black/10 text-black/60 hover:text-black hover:border-black/20 hover:bg-black/[0.03] transition-all duration-200 tracking-wide"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                VISIT US
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
