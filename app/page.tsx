"use client";

import { useMemo, useState } from "react";

type Talk = { id: string; title: string; date: string; event: string; upcoming: boolean };

const TALKS: Talk[] = [
  { id: "1", title: "Web Development Trends", date: "2025-03-15", event: "TechConf", upcoming: true },
  { id: "2", title: "React Patterns", date: "2024-11-20", event: "Meetup", upcoming: false },
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "2-digit", year: "numeric" }).format(new Date(`${value}T12:00:00`));
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"All" | "Upcoming" | "Past">("All");
  const visibleTalks = useMemo(() => TALKS.filter((talk) => {
    const matchesFilter = filter === "All" || (filter === "Upcoming" ? talk.upcoming : !talk.upcoming);
    return matchesFilter && `${talk.title} ${talk.event} ${talk.date}`.toLowerCase().includes(query.toLowerCase());
  }), [filter, query]);

  return (
    <main className="broadcast-shell">
      <header className="broadcast-header">
        <div className="station-mark" aria-label="Bookchaowalit broadcast station">B/01</div>
        <div className="header-rule" />
        <p className="station-status"><span className="live-dot" /> Static programme archive · local demo</p>
      </header>

      <section className="broadcast-hero">
        <div className="hero-copy">
          <p className="section-code">BOOKCHAOWALIT / ON AIR ARCHIVE</p>
          <h1>Talks worth<br /><em>replaying.</em></h1>
          <p className="hero-note">A small speaking-engagement index for ideas that deserve a second listen.</p>
        </div>
        <div className="tuning-panel" aria-label="Archive summary">
          <div className="dial"><span>{String(TALKS.length).padStart(2, "0")}</span><small>programmes</small></div>
          <div className="wave-bars" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ height: `${18 + ((i * 17) % 50)}%` }} />)}</div>
          <p>FREQUENCY 01<br /><strong>IDEAS / SYSTEMS / BUILDING</strong></p>
        </div>
      </section>

      <section className="archive-console" aria-label="Talk archive">
        <div className="console-topline">
          <div><p className="section-code">PROGRAMME SELECTOR</p><h2>Choose a signal</h2></div>
          <label className="search-console"><span>Find in archive</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title or event" /></label>
        </div>
        <div className="filter-strip" role="group" aria-label="Talk status">
          {(["All", "Upcoming", "Past"] as const).map((option) => <button key={option} className={filter === option ? "filter-button active" : "filter-button"} onClick={() => setFilter(option)}>{option}</button>)}
          <span className="result-count">{visibleTalks.length} of {TALKS.length} transmissions</span>
        </div>
        <div className="programme-list">
          {visibleTalks.length === 0 ? <div className="empty-frequency">No transmission matches that search. Try a different frequency.</div> : visibleTalks.map((talk, index) => (
            <article className="programme-row" key={talk.id}>
              <div className="programme-number">{String(index + 1).padStart(2, "0")}</div>
              <div className="programme-date"><span>{formatDate(talk.date)}</span><small>{talk.upcoming ? "UPCOMING" : "PAST"}</small></div>
              <div className="programme-title"><h3>{talk.title}</h3><p>{talk.event}</p></div>
              <div className="programme-signal" aria-hidden="true"><span /><span /><span /><span /><span /></div>
            </article>
          ))}
        </div>
      </section>
      <footer className="broadcast-footer"><span>HONEST DEMO / STATIC CONTENT</span><span>No recording, booking, or backend attached.</span></footer>
    </main>
  );
}
