interface Experience {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  summary: string;
}

interface Education {
  institution: string;
  degree: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  gpa: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string;
  link: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  expiryDate: string;
}

interface Language {
  name: string;
  proficiency: string;
}

interface Award {
  title: string;
  issuer: string;
  date: string;
  description: string;
}

interface Summary {
  objective: string;
  summary: string;
}

interface ResumePDFProps {
  data: {
    personal: {
      fullName: string;
      email: string;
      phone: string;
      location: string;
      linkedin: string;
      website: string;
    };
    summary: Summary;
    experiences: Experience[];
    education: Education[];
    projects: Project[];
    certifications: Certification[];
    languages: Language[];
    awards: Award[];
    skills: string;
  };
}

export default function ResumePDF({ data }: ResumePDFProps) {
  const { 
    personal, 
    summary = { objective: '', summary: '' }, 
    experiences = [], 
    education = [], 
    projects = [], 
    certifications = [], 
    languages = [], 
    awards = [], 
    skills = '' 
  } = data;

  return (
    <div
      id="resume-pdf"
      style={{
        width: '100%',
        maxWidth: '210mm',
        minHeight: '297mm',
        padding: '20mm',
        fontFamily: 'Arial, sans-serif',
        fontSize: '11px',
        color: '#000000',
        background: '#ffffff',
        boxSizing: 'border-box',
      }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: '18px' }}>
        <h1 style={{ fontSize: '26px', marginBottom: '8px', fontWeight: 'bold', color: '#1a1a1a', letterSpacing: '0.5px' }}>
          {personal.fullName || 'Your Name'}
        </h1>
        <div style={{ fontSize: '11px', color: '#666', lineHeight: '1.8' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.email && (personal.phone || personal.location) && <span> | </span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.phone && personal.location && <span> | </span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
        <div style={{ marginTop: '6px', fontSize: '11px', color: '#0066cc' }}>
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.linkedin && personal.website && <span> | </span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </div>

      <hr style={{ margin: '18px 0', border: 'none', borderTop: '2px solid #333' }} />

      {/* OBJECTIVE OR SUMMARY */}
      {(summary.objective || summary.summary) && (
        <section style={{ marginBottom: '18px' }}>
          <h2 style={{ fontSize: '16px', marginBottom: '10px', fontWeight: 'bold', color: '#1a1a1a', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>
            {summary.objective ? 'OBJECTIVE' : 'PROFESSIONAL SUMMARY'}
          </h2>
          <p style={{ fontSize: '11px', lineHeight: '1.7', color: '#333', textAlign: 'justify' }}>
            {summary.objective || summary.summary}
          </p>
        </section>
      )}

      {/* EXPERIENCE */}
      {experiences.some(exp => exp.company || exp.role) && (
        <section style={{ marginBottom: '18px' }}>
          <h2 style={{ fontSize: '16px', marginBottom: '10px', fontWeight: 'bold', color: '#1a1a1a', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>
            EXPERIENCE
          </h2>

          {experiences.map((exp, index) => {
            if (!exp.company && !exp.role) return null;
            return (
              <div key={index} style={{ marginBottom: '14px' }}>
                <div style={{ marginBottom: '4px' }}>
                  <strong style={{ fontSize: '12px', fontWeight: 'bold' }}>{exp.role || 'Role'}</strong>
                  {exp.company && <span style={{ fontSize: '12px' }}> — {exp.company}</span>}
                  {exp.location && <span style={{ fontSize: '12px' }}>, {exp.location}</span>}
                </div>
                {(exp.start || exp.end) && (
                  <div style={{ fontStyle: 'italic', fontSize: '10px', color: '#666', marginBottom: '6px' }}>
                    {exp.start || 'Start'} – {exp.end || 'Present'}
                  </div>
                )}
                {exp.summary && (
                  <p style={{ marginTop: '4px', fontSize: '11px', lineHeight: '1.6', color: '#333', textAlign: 'justify' }}>{exp.summary}</p>
                )}
              </div>
            );
          })}
        </section>
      )}

      {/* EDUCATION */}
      {education.some(edu => edu.institution || edu.degree) && (
        <section style={{ marginBottom: '18px' }}>
          <h2 style={{ fontSize: '16px', marginBottom: '10px', fontWeight: 'bold', color: '#1a1a1a', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>
            EDUCATION
          </h2>

          {education.map((edu, index) => {
            if (!edu.institution && !edu.degree) return null;
            return (
              <div key={index} style={{ marginBottom: '14px' }}>
                <div style={{ marginBottom: '4px' }}>
                  <strong style={{ fontSize: '12px', fontWeight: 'bold' }}>{edu.degree || 'Degree'}</strong>
                  {edu.institution && <span style={{ fontSize: '12px' }}> — {edu.institution}</span>}
                  {edu.location && <span style={{ fontSize: '12px' }}>, {edu.location}</span>}
                  {edu.gpa && <span style={{ fontSize: '12px', fontWeight: 'bold' }}> | GPA: {edu.gpa}</span>}
                </div>
                {(edu.start || edu.end) && (
                  <div style={{ fontStyle: 'italic', fontSize: '10px', color: '#666', marginBottom: '6px' }}>
                    {edu.start || 'Start'} – {edu.end || 'Present'}
                  </div>
                )}
                {edu.summary && (
                  <p style={{ marginTop: '4px', fontSize: '11px', lineHeight: '1.6', color: '#333', textAlign: 'justify' }}>{edu.summary}</p>
                )}
              </div>
            );
          })}
        </section>
      )}

      {/* PROJECTS */}
      {projects.some(proj => proj.name) && (
        <section style={{ marginBottom: '18px' }}>
          <h2 style={{ fontSize: '16px', marginBottom: '10px', fontWeight: 'bold', color: '#1a1a1a', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>
            PROJECTS
          </h2>

          {projects.map((proj, index) => {
            if (!proj.name) return null;
            return (
              <div key={index} style={{ marginBottom: '14px' }}>
                <div style={{ marginBottom: '4px' }}>
                  <strong style={{ fontSize: '12px', fontWeight: 'bold' }}>{proj.name}</strong>
                  {proj.link && (
                    <span style={{ fontSize: '11px', color: '#0066cc', marginLeft: '8px' }}>
                      {proj.link}
                    </span>
                  )}
                </div>
                {proj.technologies && (
                  <div style={{ fontSize: '10px', color: '#666', fontStyle: 'italic', marginBottom: '6px' }}>
                    Technologies: {proj.technologies}
                  </div>
                )}
                {proj.description && (
                  <p style={{ marginTop: '4px', fontSize: '11px', lineHeight: '1.6', color: '#333', textAlign: 'justify' }}>{proj.description}</p>
                )}
              </div>
            );
          })}
        </section>
      )}

      {/* CERTIFICATIONS */}
      {certifications.some(cert => cert.name) && (
        <section style={{ marginBottom: '18px' }}>
          <h2 style={{ fontSize: '16px', marginBottom: '10px', fontWeight: 'bold', color: '#1a1a1a', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>
            CERTIFICATIONS
          </h2>

          {certifications.map((cert, index) => {
            if (!cert.name) return null;
            return (
              <div key={index} style={{ marginBottom: '12px' }}>
                <div style={{ marginBottom: '4px' }}>
                  <strong style={{ fontSize: '12px', fontWeight: 'bold' }}>{cert.name}</strong>
                  {cert.issuer && <span style={{ fontSize: '12px' }}> — {cert.issuer}</span>}
                </div>
                {cert.date && (
                  <div style={{ fontStyle: 'italic', fontSize: '10px', color: '#666' }}>
                    {cert.date}
                    {cert.expiryDate && <span> – Expires: {cert.expiryDate}</span>}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      )}

      {/* LANGUAGES */}
      {languages.some(lang => lang.name) && (
        <section style={{ marginBottom: '18px' }}>
          <h2 style={{ fontSize: '16px', marginBottom: '10px', fontWeight: 'bold', color: '#1a1a1a', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>
            LANGUAGES
          </h2>
          <div style={{ fontSize: '11px', lineHeight: '1.8', color: '#333' }}>
            {languages
              .filter(lang => lang.name)
              .map((lang, index) => (
                <span key={index}>
                  <strong>{lang.name}</strong> ({lang.proficiency || 'Proficient'})
                  {index < languages.filter(l => l.name).length - 1 && <span> • </span>}
                </span>
              ))}
          </div>
        </section>
      )}

      {/* AWARDS */}
      {awards.some(award => award.title) && (
        <section style={{ marginBottom: '18px' }}>
          <h2 style={{ fontSize: '16px', marginBottom: '10px', fontWeight: 'bold', color: '#1a1a1a', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>
            AWARDS & ACHIEVEMENTS
          </h2>

          {awards.map((award, index) => {
            if (!award.title) return null;
            return (
              <div key={index} style={{ marginBottom: '12px' }}>
                <div style={{ marginBottom: '4px' }}>
                  <strong style={{ fontSize: '12px', fontWeight: 'bold' }}>{award.title}</strong>
                  {award.issuer && <span style={{ fontSize: '12px' }}> — {award.issuer}</span>}
                </div>
                {award.date && (
                  <div style={{ fontStyle: 'italic', fontSize: '10px', color: '#666', marginBottom: '4px' }}>
                    {award.date}
                  </div>
                )}
                {award.description && (
                  <p style={{ marginTop: '4px', fontSize: '11px', lineHeight: '1.6', color: '#333' }}>{award.description}</p>
                )}
              </div>
            );
          })}
        </section>
      )}

      {/* SKILLS */}
      {skills && (
        <section style={{ marginBottom: '18px' }}>
          <h2 style={{ fontSize: '16px', marginBottom: '10px', fontWeight: 'bold', color: '#1a1a1a', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>
            SKILLS
          </h2>
          <p style={{ fontSize: '11px', lineHeight: '1.7', color: '#333' }}>{skills}</p>
        </section>
      )}
    </div>
  );
}
