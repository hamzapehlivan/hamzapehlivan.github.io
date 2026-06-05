import Image from "next/image";
import type { TimelineItem } from "@/lib/content";

type TimelineListProps = {
  items: TimelineItem[];
};

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
                  {detail}
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
