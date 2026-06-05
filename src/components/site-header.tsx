"use client";

import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { navItems, profile } from "@/lib/content";

type NavLinkProps = {
  href: string;
  label: string;
  className: string;
  isActive: boolean;
  onClick?: () => void;
};

function NavLink({ href, label, className, isActive, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      className={className}
      data-active={isActive ? "true" : undefined}
      aria-current={isActive ? "true" : undefined}
      onClick={onClick}
    >
      {label}
    </a>
  );
}

function useActiveSection() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const targets = navItems
      .map((item) => document.getElementById(item.href.replace(/^#/, "")))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return activeId;
}

function useEscapeToClose(open: boolean, close: () => void) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection();
  useEscapeToClose(open, () => setOpen(false));

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <a href="#top" className="brand" aria-label="Hamza Pehlivan home">
          <span className="brand-name">Hamza Pehlivan</span>
          <span className="brand-sub">Doctoral Researcher</span>
        </a>

        <div className="nav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              className="nav-link"
              isActive={activeId === item.href.replace(/^#/, "")}
            />
          ))}
        </div>

        <div className="nav-end">
          <a
            href={profile.cv}
            className="button button-compact"
            target="_blank"
            rel="noreferrer"
          >
            <Download aria-hidden="true" className="icon-xs" />
            CV
          </a>
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? (
              <X aria-hidden="true" className="icon-sm" />
            ) : (
              <Menu aria-hidden="true" className="icon-sm" />
            )}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-nav" className="mobile-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              className="mobile-nav-link"
              isActive={activeId === item.href.replace(/^#/, "")}
              onClick={() => setOpen(false)}
            />
          ))}
        </div>
      ) : null}
    </header>
  );
}
