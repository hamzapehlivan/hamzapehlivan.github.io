import Image from "next/image";
import { Building2, GraduationCap, Mail, MapPin } from "lucide-react";
import { profile } from "@/lib/content";

export function ProfilePanel() {
  return (
    <aside className="profile-panel" aria-label="Profile summary">
      <div className="profile-panel-head">
        <div className="profile-photo-frame">
          <Image
            src={profile.photo}
            alt={profile.name}
            width={192}
            height={192}
            sizes="96px"
            priority
            className="profile-photo"
          />
        </div>
        <div>
          <p className="profile-kicker">Doctoral Researcher</p>
          <p className="profile-title">Efficient 3D/4D Scene Mapping</p>
        </div>
      </div>

      <div className="profile-panel-list">
        <div className="profile-panel-item">
          <Building2 aria-hidden="true" className="icon-xs" />
          <div>
            <span className="label">Affiliation</span>
            <p>
              <a href={profile.links.mpiDepartment} target="_blank" rel="noreferrer">
                MPI for Informatics · VCAI
              </a>
            </p>
          </div>
        </div>

        <div className="profile-panel-item">
          <GraduationCap aria-hidden="true" className="icon-xs" />
          <div>
            <span className="label">Advisor</span>
            <p>
              Prof.{" "}
              <a href={profile.links.theobalt} target="_blank" rel="noreferrer">
                Christian Theobalt
              </a>
            </p>
          </div>
        </div>

        <div className="profile-panel-item">
          <MapPin aria-hidden="true" className="icon-xs" />
          <div>
            <span className="label">Location</span>
            <p>{profile.location}</p>
          </div>
        </div>

        <div className="profile-panel-item">
          <Mail aria-hidden="true" className="icon-xs" />
          <div>
            <span className="label">Email</span>
            <p>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
