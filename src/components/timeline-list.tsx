import Image from "next/image";
import { Fragment } from "react";
import type { TimelineItem } from "@/lib/content";

type TimelineListProps = {
  items: TimelineItem[];
};

const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderDetail(text: string) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  for (const match of text.matchAll(MARKDOWN_LINK)) {
    const [full, label, href] = match;
    const start = match.index ?? 0;
    if (start > lastIndex) {
      nodes.push(
        <Fragment key={`t-${key++}`}>{text.slice(lastIndex, start)}</Fragment>,
      );
    }
    nodes.push(
      <a key={`a-${key++}`} href={href} target="_blank" rel="noreferrer">
        {label}
      </a>,
    );
    lastIndex = start + full.length;
  }
  if (lastIndex < text.length) {
    nodes.push(<Fragment key={`t-${key++}`}>{text.slice(lastIndex)}</Fragment>);
  }
  return nodes;
}

export function TimelineList({ items }: TimelineListProps) {
  return (
    <ol className="timeline-track">
      {items.map((item) => {
        const isCurrent = /present/i.test(item.period);
        return (
        <li
          key={`${item.institution}-${item.period}`}
          className="timeline-entry"
          data-current={isCurrent ? "true" : undefined}
        >
          <span className="timeline-marker" aria-hidden="true" />
          <div className="timeline-row">
            <div className="timeline-col">
              <span className="timeline-period">{item.period}</span>
              <h3 className="timeline-title">
                {item.role}
                <span className="timeline-loc"> · {item.location}</span>
              </h3>
              <p className="timeline-institution">{item.institution}</p>
            </div>
            {item.logo ? (
              <div className="logo-frame" aria-hidden="true">
                <Image
                  src={item.logo}
                  alt=""
                  width={120}
                  height={120}
                  className="logo-frame-img"
                />
              </div>
            ) : null}
          </div>
          {item.details.length > 0 ? (
            <ul className="timeline-bullets">
              {item.details.map((detail) => (
                <li key={detail} className="bullet-item">
                  {renderDetail(detail)}
                </li>
              ))}
            </ul>
          ) : null}
        </li>
        );
      })}
    </ol>
  );
}
