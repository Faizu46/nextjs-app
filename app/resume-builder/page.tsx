'use client';

import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ResumePDF from './ResumePDF';

/* ================= TYPES ================= */

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
}

interface Summary {
  objective: string;
  summary: string;
}

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

/* ================= MAIN ================= */

export default function ResumeBuilder() {
  const [step, setStep] = useState<Step>(1);

  const [personal, setPersonal] = useState<PersonalInfo>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
  });

  const [summary, setSummary] = useState<Summary>({
    objective: '',
    summary: '',
  });

  const [experiences, setExperiences] = useState<Experience[]>([
    { company: '', role: '', location: '', start: '', end: '', summary: '' },
  ]);

  const [education, setEducation] = useState<Education[]>([
    { institution: '', degree: '', location: '', start: '', end: '', summary: '', gpa: '' },
  ]);

  const [projects, setProjects] = useState<Project[]>([
    { name: '', description: '', technologies: '', link: '' },
  ]);

  const [certifications, setCertifications] = useState<Certification[]>([
    { name: '', issuer: '', date: '', expiryDate: '' },
  ]);

  const [languages, setLanguages] = useState<Language[]>([
    { name: '', proficiency: '' },
  ]);

  const [awards, setAwards] = useState<Award[]>([
    { title: '', issuer: '', date: '', description: '' },
  ]);

  const [skills, setSkills] = useState('');

  /* ================= HELPERS ================= */

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };

  const updateCertification = (index: number, field: keyof Certification, value: string) => {
    const updated = [...certifications];
    updated[index][field] = value;
    setCertifications(updated);
  };

  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    const updated = [...languages];
    updated[index][field] = value;
    setLanguages(updated);
  };

  const updateAward = (index: number, field: keyof Award, value: string) => {
    const updated = [...awards];
    updated[index][field] = value;
    setAwards(updated);
  };

  const addExperience = () =>
    setExperiences([...experiences, { company: '', role: '', location: '', start: '', end: '', summary: '' }]);

  const addEducation = () =>
    setEducation([...education, { institution: '', degree: '', location: '', start: '', end: '', summary: '', gpa: '' }]);

  const addProject = () =>
    setProjects([...projects, { name: '', description: '', technologies: '', link: '' }]);

  const addCertification = () =>
    setCertifications([...certifications, { name: '', issuer: '', date: '', expiryDate: '' }]);

  const addLanguage = () =>
    setLanguages([...languages, { name: '', proficiency: '' }]);

  const addAward = () =>
    setAwards([...awards, { title: '', issuer: '', date: '', description: '' }]);

  const removeExperience = (index: number) =>
    setExperiences(experiences.filter((_, i) => i !== index));

  const removeEducation = (index: number) =>
    setEducation(education.filter((_, i) => i !== index));

  const removeProject = (index: number) =>
    setProjects(projects.filter((_, i) => i !== index));

  const removeCertification = (index: number) =>
    setCertifications(certifications.filter((_, i) => i !== index));

  const removeLanguage = (index: number) =>
    setLanguages(languages.filter((_, i) => i !== index));

  const removeAward = (index: number) =>
    setAwards(awards.filter((_, i) => i !== index));

  const next = () => step < 8 && setStep((step + 1) as Step);
  const back = () => step > 1 && setStep((step - 1) as Step);

  /* ================= PDF ================= */

  const handleDownloadPDF = async () => {
    const el = document.getElementById('resume-pdf');
    if (!el) return;

    const canvas = await html2canvas(el, { scale: 2, backgroundColor: '#fff' });
    const img = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(img, 'PNG', 0, 0, 210, 297);
    pdf.save('resume.pdf');
  };

  /* ================= UI ================= */

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              {/* Progress Steps Indicator */}
              <div className="card mb-4">
                <div className="card-body">
                  <div className="steps-indicator">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((stepNum) => (
                      <div key={stepNum} className={`step-item ${stepNum === step ? 'active' : stepNum < step ? 'completed' : ''}`}>
                        <div className="step-number">{stepNum < step ? '✓' : stepNum}</div>
                        <div className="step-label">
                          {stepNum === 1 && 'Personal'}
                          {stepNum === 2 && 'Summary'}
                          {stepNum === 3 && 'Experience'}
                          {stepNum === 4 && 'Education'}
                          {stepNum === 5 && 'Projects'}
                          {stepNum === 6 && 'Certifications'}
                          {stepNum === 7 && 'More'}
                          {stepNum === 8 && 'Preview'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h2 style={{ margin: 0 }}>
                    {step === 1 && 'Personal Information'}
                    {step === 2 && 'Summary & Objective'}
                    {step === 3 && 'Work Experience'}
                    {step === 4 && 'Education'}
                    {step === 5 && 'Projects'}
                    {step === 6 && 'Certifications'}
                    {step === 7 && 'Languages, Awards & Skills'}
                    {step === 8 && 'Preview & Download'}
                  </h2>
                  <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    Step {step} of 5
                  </p>
                </div>
                <div className="card-body">
                  {/* STEP 1 */}
                  {step === 1 && (
                    <div className="form-section">
                      <div className="form-group">
                        <label htmlFor="fullName" className="form-label">Full Name</label>
                        <input
                          id="fullName"
                          type="text"
                          className="form-control"
                          placeholder="John Doe"
                          value={personal.fullName}
                          onChange={e => setPersonal({ ...personal, fullName: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                          id="email"
                          type="email"
                          className="form-control"
                          placeholder="john.doe@example.com"
                          value={personal.email}
                          onChange={e => setPersonal({ ...personal, email: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                          id="phone"
                          type="tel"
                          className="form-control"
                          placeholder="+1 (555) 123-4567"
                          value={personal.phone}
                          onChange={e => setPersonal({ ...personal, phone: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="location" className="form-label">Location</label>
                        <input
                          id="location"
                          type="text"
                          className="form-control"
                          placeholder="City, State/Country"
                          value={personal.location}
                          onChange={e => setPersonal({ ...personal, location: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="linkedin" className="form-label">LinkedIn Profile (Optional)</label>
                        <input
                          id="linkedin"
                          type="url"
                          className="form-control"
                          placeholder="https://linkedin.com/in/johndoe"
                          value={personal.linkedin}
                          onChange={e => setPersonal({ ...personal, linkedin: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="website" className="form-label">Personal Website/Portfolio (Optional)</label>
                        <input
                          id="website"
                          type="url"
                          className="form-control"
                          placeholder="https://johndoe.com"
                          value={personal.website}
                          onChange={e => setPersonal({ ...personal, website: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 2 - Summary & Objective */}
                  {step === 2 && (
                    <div className="form-section">
                      <div className="form-group">
                        <label htmlFor="objective" className="form-label">Professional Objective</label>
                        <textarea
                          id="objective"
                          className="form-control"
                          rows={4}
                          placeholder="A brief statement about your career goals and what you're looking for in your next role. (2-3 sentences)"
                          value={summary.objective}
                          onChange={e => setSummary({ ...summary, objective: e.target.value })}
                        />
                        <small style={{ display: 'block', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                          Tip: Great for freshers! Highlight your career aspirations and what you bring to the table.
                        </small>
                      </div>
                      <div className="form-group">
                        <label htmlFor="summary" className="form-label">Professional Summary</label>
                        <textarea
                          id="summary"
                          className="form-control"
                          rows={6}
                          placeholder="A brief summary of your professional background, key skills, and achievements. (3-5 sentences)"
                          value={summary.summary}
                          onChange={e => setSummary({ ...summary, summary: e.target.value })}
                        />
                        <small style={{ display: 'block', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                          Tip: Perfect for experienced professionals! Summarize your years of experience, expertise, and major accomplishments.
                        </small>
                      </div>
                      <div style={{ 
                        background: 'rgba(102, 126, 234, 0.1)', 
                        padding: '1rem', 
                        borderRadius: '8px',
                        border: '1px solid rgba(102, 126, 234, 0.2)'
                      }}>
                        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                          💡 <strong>Note:</strong> You can fill either Objective (for freshers) or Summary (for experienced), or both. Leave empty if not applicable.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* STEP 3 - Experience */}
                  {step === 3 && (
                    <div className="form-section">
                      {experiences.map((exp, i) => (
                        <div key={i} className="entry-card">
                          <div className="entry-card-header">
                            <h4 style={{ margin: 0 }}>Experience #{i + 1}</h4>
                            {experiences.length > 1 && (
                              <button
                                className="btn btn-sm"
                                onClick={() => removeExperience(i)}
                                style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          <div className="form-group">
                            <label className="form-label">Company Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Acme Corporation"
                              value={exp.company}
                              onChange={e => updateExperience(i, 'company', e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Job Title / Role</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Software Engineer"
                              value={exp.role}
                              onChange={e => updateExperience(i, 'role', e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Location</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="San Francisco, CA"
                              value={exp.location}
                              onChange={e => updateExperience(i, 'location', e.target.value)}
                            />
                          </div>
                          <div className="date-row">
                            <div className="form-group">
                              <label className="form-label">Start Date</label>
                              <input
                                type="month"
                                className="form-control"
                                value={exp.start}
                                onChange={e => updateExperience(i, 'start', e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">End Date</label>
                              <input
                                type="month"
                                className="form-control"
                                value={exp.end}
                                onChange={e => updateExperience(i, 'end', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Job Description & Achievements</label>
                            <textarea
                              className="form-control"
                              rows={5}
                              placeholder="Describe your responsibilities, achievements, and impact..."
                              value={exp.summary}
                              onChange={e => updateExperience(i, 'summary', e.target.value)}
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        className="btn btn-secondary"
                        onClick={addExperience}
                        style={{ width: '100%', marginTop: '1rem' }}
                      >
                        + Add Another Experience
                      </button>
                    </div>
                  )}

                  {/* STEP 4 - Education */}
                  {step === 4 && (
                    <div className="form-section">
                      {education.map((edu, i) => (
                        <div key={i} className="entry-card">
                          <div className="entry-card-header">
                            <h4 style={{ margin: 0 }}>Education #{i + 1}</h4>
                            {education.length > 1 && (
                              <button
                                className="btn btn-sm"
                                onClick={() => removeEducation(i)}
                                style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          <div className="form-group">
                            <label className="form-label">Institution Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="University of California"
                              value={edu.institution}
                              onChange={e => updateEducation(i, 'institution', e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Degree / Qualification</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Bachelor of Science in Computer Science"
                              value={edu.degree}
                              onChange={e => updateEducation(i, 'degree', e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Location</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Berkeley, CA"
                              value={edu.location}
                              onChange={e => updateEducation(i, 'location', e.target.value)}
                            />
                          </div>
                          <div className="date-row">
                            <div className="form-group">
                              <label className="form-label">Start Date</label>
                              <input
                                type="month"
                                className="form-control"
                                value={edu.start}
                                onChange={e => updateEducation(i, 'start', e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">End Date</label>
                              <input
                                type="month"
                                className="form-control"
                                value={edu.end}
                                onChange={e => updateEducation(i, 'end', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="form-label">GPA (Optional)</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="3.8/4.0 or 9.2/10"
                              value={edu.gpa}
                              onChange={e => updateEducation(i, 'gpa', e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Additional Details (Optional)</label>
                            <textarea
                              className="form-control"
                              rows={4}
                              placeholder="Relevant coursework, honors, achievements, etc."
                              value={edu.summary}
                              onChange={e => updateEducation(i, 'summary', e.target.value)}
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        className="btn btn-secondary"
                        onClick={addEducation}
                        style={{ width: '100%', marginTop: '1rem' }}
                      >
                        + Add Another Education
                      </button>
                    </div>
                  )}

                  {/* STEP 5 - Projects */}
                  {step === 5 && (
                    <div className="form-section">
                      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                        Showcase your projects, personal work, or academic projects. Great for freshers and developers!
                      </p>
                      {projects.map((project, i) => (
                        <div key={i} className="entry-card">
                          <div className="entry-card-header">
                            <h4 style={{ margin: 0 }}>Project #{i + 1}</h4>
                            {projects.length > 1 && (
                              <button
                                className="btn btn-sm"
                                onClick={() => removeProject(i)}
                                style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          <div className="form-group">
                            <label className="form-label">Project Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="E-commerce Website"
                              value={project.name}
                              onChange={e => updateProject(i, 'name', e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea
                              className="form-control"
                              rows={4}
                              placeholder="Describe what the project does, key features, and your role..."
                              value={project.description}
                              onChange={e => updateProject(i, 'description', e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Technologies Used</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="React, Node.js, MongoDB, AWS"
                              value={project.technologies}
                              onChange={e => updateProject(i, 'technologies', e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Project Link (Optional)</label>
                            <input
                              type="url"
                              className="form-control"
                              placeholder="https://github.com/username/project or https://project-demo.com"
                              value={project.link}
                              onChange={e => updateProject(i, 'link', e.target.value)}
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        className="btn btn-secondary"
                        onClick={addProject}
                        style={{ width: '100%', marginTop: '1rem' }}
                      >
                        + Add Another Project
                      </button>
                    </div>
                  )}

                  {/* STEP 6 - Certifications */}
                  {step === 6 && (
                    <div className="form-section">
                      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                        Add your professional certifications, online courses, or training programs.
                      </p>
                      {certifications.map((cert, i) => (
                        <div key={i} className="entry-card">
                          <div className="entry-card-header">
                            <h4 style={{ margin: 0 }}>Certification #{i + 1}</h4>
                            {certifications.length > 1 && (
                              <button
                                className="btn btn-sm"
                                onClick={() => removeCertification(i)}
                                style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          <div className="form-group">
                            <label className="form-label">Certification Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="AWS Certified Solutions Architect"
                              value={cert.name}
                              onChange={e => updateCertification(i, 'name', e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Issuing Organization</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Amazon Web Services"
                              value={cert.issuer}
                              onChange={e => updateCertification(i, 'issuer', e.target.value)}
                            />
                          </div>
                          <div className="date-row">
                            <div className="form-group">
                              <label className="form-label">Issue Date</label>
                              <input
                                type="month"
                                className="form-control"
                                value={cert.date}
                                onChange={e => updateCertification(i, 'date', e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Expiry Date (Optional)</label>
                              <input
                                type="month"
                                className="form-control"
                                placeholder="Leave empty if no expiry"
                                value={cert.expiryDate}
                                onChange={e => updateCertification(i, 'expiryDate', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        className="btn btn-secondary"
                        onClick={addCertification}
                        style={{ width: '100%', marginTop: '1rem' }}
                      >
                        + Add Another Certification
                      </button>
                    </div>
                  )}

                  {/* STEP 7 - Languages, Awards & Skills */}
                  {step === 7 && (
                    <div className="form-section">
                      {/* Languages */}
                      <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Languages</h3>
                        {languages.map((lang, i) => (
                          <div key={i} className="entry-card" style={{ marginBottom: '1rem' }}>
                            <div className="entry-card-header">
                              <h4 style={{ margin: 0 }}>Language #{i + 1}</h4>
                              {languages.length > 1 && (
                                <button
                                  className="btn btn-sm"
                                  onClick={() => removeLanguage(i)}
                                  style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                            <div className="date-row">
                              <div className="form-group">
                                <label className="form-label">Language</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="English"
                                  value={lang.name}
                                  onChange={e => updateLanguage(i, 'name', e.target.value)}
                                />
                              </div>
                              <div className="form-group">
                                <label className="form-label">Proficiency Level</label>
                                <select
                                  className="form-control"
                                  value={lang.proficiency}
                                  onChange={e => updateLanguage(i, 'proficiency', e.target.value)}
                                >
                                  <option value="">Select proficiency</option>
                                  <option value="Native">Native</option>
                                  <option value="Fluent">Fluent</option>
                                  <option value="Professional">Professional</option>
                                  <option value="Intermediate">Intermediate</option>
                                  <option value="Basic">Basic</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        ))}
                        <button
                          className="btn btn-secondary"
                          onClick={addLanguage}
                          style={{ width: '100%', marginTop: '0.5rem' }}
                        >
                          + Add Another Language
                        </button>
                      </div>

                      {/* Awards */}
                      <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Awards & Achievements</h3>
                        {awards.map((award, i) => (
                          <div key={i} className="entry-card" style={{ marginBottom: '1rem' }}>
                            <div className="entry-card-header">
                              <h4 style={{ margin: 0 }}>Award #{i + 1}</h4>
                              {awards.length > 1 && (
                                <button
                                  className="btn btn-sm"
                                  onClick={() => removeAward(i)}
                                  style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                            <div className="form-group">
                              <label className="form-label">Award Title</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Employee of the Year"
                                value={award.title}
                                onChange={e => updateAward(i, 'title', e.target.value)}
                              />
                            </div>
                            <div className="date-row">
                              <div className="form-group">
                                <label className="form-label">Issuing Organization</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Company Name"
                                  value={award.issuer}
                                  onChange={e => updateAward(i, 'issuer', e.target.value)}
                                />
                              </div>
                              <div className="form-group">
                                <label className="form-label">Date</label>
                                <input
                                  type="month"
                                  className="form-control"
                                  value={award.date}
                                  onChange={e => updateAward(i, 'date', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <label className="form-label">Description (Optional)</label>
                              <textarea
                                className="form-control"
                                rows={3}
                                placeholder="Brief description of the achievement..."
                                value={award.description}
                                onChange={e => updateAward(i, 'description', e.target.value)}
                              />
                            </div>
                          </div>
                        ))}
                        <button
                          className="btn btn-secondary"
                          onClick={addAward}
                          style={{ width: '100%', marginTop: '0.5rem' }}
                        >
                          + Add Another Award
                        </button>
                      </div>

                      {/* Skills */}
                      <div>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Skills & Expertise</h3>
                        <div className="form-group">
                          <label htmlFor="skills" className="form-label">Technical & Soft Skills</label>
                          <textarea
                            id="skills"
                            className="form-control"
                            rows={8}
                            placeholder="Enter your skills separated by commas. Example: JavaScript, React, Node.js, Python, MongoDB, Git, Agile Methodology, Leadership, Communication"
                            value={skills}
                            onChange={e => setSkills(e.target.value)}
                          />
                          <small style={{ display: 'block', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                            Tip: Include technical skills, programming languages, tools, frameworks, and soft skills
                          </small>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 8 - Preview */}
                  {step === 8 && (
                    <div className="form-section">
                      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Your Resume is Ready!</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                          Review your information below and download your professional resume as a PDF.
                        </p>
                        <div style={{ 
                          background: 'rgba(102, 126, 234, 0.1)', 
                          padding: '1rem', 
                          borderRadius: '8px', 
                          marginBottom: '1.5rem',
                          border: '1px solid rgba(102, 126, 234, 0.2)'
                        }}>
                          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            💡 <strong>Tip:</strong> Scroll down to see the full preview. The preview shows exactly how your resume will look when downloaded.
                          </p>
                        </div>
                        <button
                          className="btn btn-primary btn-lg glow"
                          onClick={handleDownloadPDF}
                          style={{ minWidth: '200px', fontSize: '1.125rem', padding: '1rem 2rem' }}
                        >
                          📥 Download Resume PDF
                        </button>
                      </div>
                      <div className="preview-section">
                        <div className="preview-header">
                          <h4>📄 Resume Preview</h4>
                          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            This is how your resume will appear when downloaded
                          </p>
                        </div>
                        <div className="preview-content">
                          <ResumePDF data={{ 
                            personal, 
                            summary,
                            experiences, 
                            education,
                            projects,
                            certifications,
                            languages,
                            awards,
                            skills 
                          }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="form-navigation">
                    {step > 1 && (
                      <button className="btn btn-secondary" onClick={back}>
                        ← Back
                      </button>
                    )}
                    {step < 8 && (
                      <button className="btn btn-primary" onClick={next} style={{ marginLeft: 'auto' }}>
                        Next →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .steps-indicator {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          padding: 0 1rem;
        }

        .steps-indicator::before {
          content: '';
          position: absolute;
          top: 20px;
          left: 10%;
          right: 10%;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          z-index: 0;
        }

        .step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          position: relative;
          z-index: 1;
        }

        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .step-item.active .step-number {
          background: var(--primary-gradient);
          border-color: transparent;
          box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
        }

        .step-item.completed .step-number {
          background: var(--success-color);
          border-color: transparent;
        }

        .step-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        .step-item.active .step-label {
          color: var(--text-primary);
        }

        .form-section {
          padding: 1rem 0;
        }

        .entry-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .entry-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .date-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .preview-section {
          margin-top: 2rem;
          border: 2px solid rgba(102, 126, 234, 0.3);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .preview-header {
          background: rgba(102, 126, 234, 0.15);
          padding: 1rem 1.5rem;
          border-bottom: 2px solid rgba(102, 126, 234, 0.3);
        }

        .preview-header h4 {
          margin: 0;
          color: var(--text-primary);
          font-size: 1.125rem;
        }

        .preview-content {
          background: #ffffff !important;
          padding: 2rem;
          max-height: 600px;
          overflow-y: auto;
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.05);
          position: relative;
        }

        .preview-content * {
          color: #000000 !important;
        }

        .preview-content h1,
        .preview-content h2,
        .preview-content h3,
        .preview-content h4,
        .preview-content h5,
        .preview-content h6 {
          color: #1a1a1a !important;
          background: none !important;
          -webkit-background-clip: unset !important;
          -webkit-text-fill-color: #1a1a1a !important;
          background-clip: unset !important;
        }

        .preview-content p,
        .preview-content span,
        .preview-content div {
          color: #333333 !important;
        }

        .preview-content::-webkit-scrollbar {
          width: 8px;
        }

        .preview-content::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .preview-content::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }

        .preview-content::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        @media (max-width: 768px) {
          .steps-indicator {
            flex-wrap: wrap;
            gap: 1rem;
          }

          .steps-indicator::before {
            display: none;
          }

          .date-row {
            grid-template-columns: 1fr;
          }

          .form-navigation {
            flex-direction: column;
            gap: 1rem;
          }

          .form-navigation button {
            width: 100%;
          }

          .preview-content {
            padding: 1rem;
          }

          .preview-content #resume-pdf {
            padding: 15mm;
            font-size: 10px;
          }

          .preview-section {
            margin-top: 1.5rem;
          }
        }
      `}</style>
    </main>
  );
}
