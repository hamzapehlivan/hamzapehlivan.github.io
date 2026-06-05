import type { LucideIcon } from "lucide-react";

type SectionHeadingProps = {
  title: string;
  icon?: LucideIcon;
};

export function SectionHeading({ title, icon: Icon }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      {Icon ? (
        <span className="section-heading-icon" aria-hidden="true">
          <Icon className="icon-sm" />
        </span>
      ) : null}
      <div className="section-heading-text">
        <h2>{title}</h2>
      </div>
    </header>
  );
}
