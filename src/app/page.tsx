import {
  BookOpen,
  Briefcase,
  GraduationCap,
  Mail,
  MapPin,
  School,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, ScholarIcon } from "@/components/brand-icons";
import { ProfilePanel } from "@/components/profile-panel";
import { PublicationGroup } from "@/components/publication-group";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { TimelineList } from "@/components/timeline-list";
import {
  education,
  experience,
  profile,
  publications,
  researchAreas,
  skills,
  teaching,
} from "@/lib/content";

function groupPublications() {
  const underReview = publications.filter(
    (p) => p.status === "Under Review" || p.status === "Preprint",
  );
  const published = publications.filter(
    (p) => !p.status || p.status === "Published",
  );

  const byYear = new Map<number, typeof published>();
  for (const paper of published) {
    const list = byYear.get(paper.year) ?? [];
    list.push(paper);
    byYear.set(paper.year, list);
  }
  const years = Array.from(byYear.keys()).sort((a, b) => b - a);

  return { underReview, byYear, years };
}

export default function Home() {
  const { underReview, byYear, years } = groupPublications();

  return (
    <div id="top" className="min-h-screen">
      <SiteHeader />

      <main>
        {/* Hero / About */}
        <section id="about" className="hero-band">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="status-pill" aria-label="Doctoral researcher status">
                <span className="status-dot" aria-hidden="true" />
                Doctoral Researcher · Open to collaborations
              </span>

              <h1 className="font-display">
                <span className="hero-name-greeting">Hi, I&apos;m</span>
                <span className="hero-name">{profile.name}</span>
              </h1>

              <p className="hero-summary">
                My research focuses on efficient 3D/4D representations for real-world
                mapping, with current work on fast optimizers for Gaussian Splatting training.
              </p>

              <p className="hero-bio">
                I am a Ph.D. student in the Visual Computing and Artificial
                Intelligence department at the{" "}
                <a
                  href={profile.links.mpiDepartment}
                  target="_blank"
                  rel="noreferrer"
                >
                  Max Planck Institute for Informatics
                </a>
                , advised by Prof. Dr.{" "}
                <a href={profile.links.theobalt} target="_blank" rel="noreferrer">
                  Christian Theobalt
                </a>
                . Before joining MPI, I completed my M.Sc. at Bilkent University
                with Asst. Prof.{" "}
                <a href={profile.links.dundar} target="_blank" rel="noreferrer">
                  Aysegül Dündar
                </a>{" "}
                in{" "}
                <a href={profile.links.dlrLab} target="_blank" rel="noreferrer">
                  Bilkent Generative DLR Lab
                </a>
                , working on real image editing and reconstruction with StyleGAN.
              </p>

              <div className="hero-actions">
                <a href="#publications" className="button">
                  <BookOpen aria-hidden="true" className="icon-xs" />
                  View publications
                </a>
                <a href="#contact" className="button button-secondary">
                  <Mail aria-hidden="true" className="icon-xs" />
                  Get in touch
                </a>
              </div>

              <div className="research-tags hero-research-tags" aria-label="Research interests">
                {researchAreas.map((area) => (
                  <span key={area} className="tag">
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <ProfilePanel />
          </div>
        </section>

        {/* Publications */}
        <section id="publications" className="section-band">
          <div className="section-inner">
            <SectionHeading title="Publications" icon={BookOpen} />

            {underReview.length > 0 ? (
              <PublicationGroup label="Under review" publications={underReview} />
            ) : null}

            {years.map((year) => (
              <PublicationGroup
                key={year}
                label={String(year)}
                publications={byYear.get(year) ?? []}
              />
            ))}
          </div>
        </section>

        {/* Teaching */}
        <section id="teaching" className="section-band section-contrast">
          <div className="section-inner">
            <SectionHeading title="Teaching" icon={School} />
            <TimelineList items={teaching} />
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="section-band">
          <div className="section-inner">
            <SectionHeading title="Experience" icon={Briefcase} />
            <TimelineList items={experience} />
          </div>
        </section>

        {/* Education + Skills */}
        <section id="education" className="section-band section-contrast">
          <div className="section-inner split-grid">
            <div>
              <SectionHeading title="Education" icon={GraduationCap} />
              <TimelineList items={education} />
            </div>

            <div>
              <SectionHeading title="Skills" icon={Sparkles} />
              <div className="skill-grid">
                {skills.map((group) => (
                  <article key={group.label} className="skill-panel">
                    <h3>{group.label}</h3>
                    <div className="skill-panel-tags">
                      {group.values.map((value) => (
                        <span key={value} className="tag tag-light">
                          {value}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="contact-band">
          <div className="contact-inner">
            <div>
              <p className="contact-eyebrow">Contact</p>
              <h2>Open to research discussions, collaborations, and paper questions.</h2>
              <p className="contact-blurb">
                Email is the best way to reach me. I read every message and reply when I can.
              </p>
              <div className="contact-meta">
                <p>
                  <MapPin aria-hidden="true" className="icon-xs" />
                  {profile.office} · {profile.location}
                </p>
              </div>
            </div>
            <div className="contact-actions">
              <a href={`mailto:${profile.email}`} className="contact-primary">
                <Mail aria-hidden="true" className="icon-sm" />
                {profile.email}
              </a>
              <div className="contact-secondary">
                <a href={profile.scholar} target="_blank" rel="noreferrer" className="contact-action">
                  <ScholarIcon className="icon-xs" />
                  Scholar
                </a>
                <a href={profile.github} target="_blank" rel="noreferrer" className="contact-action">
                  <GithubIcon className="icon-xs" />
                  GitHub
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-action">
                  <LinkedinIcon className="icon-xs" />
                  LinkedIn
                </a>
                <a href={profile.mpiPage} target="_blank" rel="noreferrer" className="contact-action">
                  MPI page
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <p>© {new Date().getFullYear()} {profile.name}</p>
        </div>
      </footer>
    </div>
  );
}
