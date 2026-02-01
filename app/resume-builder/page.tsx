'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  ResumeData,
  PersonalInfo,
  Summary,
  Experience,
  Education,
  Project,
  Certification,
  Language,
  Award,
  SkillCategory
} from '../../types/resume';

const ResumePreview = dynamic(() => import('../../components/ResumePreview'), { ssr: false });

/* ================= MAIN ================= */

export default function ResumeBuilder() {
  const { data: session } = useSession(); // Keep session hook if used later or for auth check
  const [step, setStep] = useState(1);

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

  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([
    { name: 'Technical Skills', skills: '' },
    { name: 'Soft Skills', skills: '' }
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState('minimal');

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

  const updateSkillCategory = (index: number, field: keyof SkillCategory, value: string) => {
    const updated = [...skillCategories];
    updated[index][field] = value;
    setSkillCategories(updated);
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

  const addSkillCategory = () =>
    setSkillCategories([...skillCategories, { name: '', skills: '' }]);

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

  const removeSkillCategory = (index: number) =>
    setSkillCategories(skillCategories.filter((_, i) => i !== index));

  const next = () => step < 10 && setStep(step + 1);
  const back = () => step > 1 && setStep(step - 1);

  const resumeData: ResumeData = {
    personal,
    summary,
    experiences,
    education,
    projects,
    certifications,
    languages,
    awards,
    skillCategories
  };

  /* ================= UI ================= */

  return (
    <main className="main-content">
      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              {/* Progress Steps Indicator */}
              <div className="card mb-4">
                <div className="card-body">
                  <div className="steps-indicator">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((stepNum) => (
                      <div key={stepNum} className={`step-item ${stepNum === step ? 'active' : stepNum < step ? 'completed' : ''}`}>
                        <div className="step-number">{stepNum < step ? '✓' : stepNum}</div>
                        <div className="step-label d-none d-md-block">
                          {stepNum === 1 && 'Info'}
                          {stepNum === 2 && 'Summary'}
                          {stepNum === 3 && 'Exp'}
                          {stepNum === 4 && 'Projects'}
                          {stepNum === 5 && 'Skills'}
                          {stepNum === 6 && 'Edu'}
                          {stepNum === 7 && 'Certs'}
                          {stepNum === 8 && 'Misc'}
                          {stepNum === 9 && 'Design'}
                          {stepNum === 10 && 'Done'}
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
                    {step === 4 && 'Projects'}
                    {step === 5 && 'Skills & Expertise'}
                    {step === 6 && 'Education'}
                    {step === 7 && 'Certifications'}
                    {step === 8 && 'Languages & Awards'}
                    {step === 9 && 'Choose Template'}
                    {step === 10 && 'Preview & Download'}
                  </h2>
                  <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    Step {step} of 10
                  </p>
                </div>
                <div className="card-body">
                  {/* STEP 1 - Personal */}
                  {step === 1 && (
                    <div className="form-section">
                      <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="John Doe"
                          value={personal.fullName}
                          onChange={e => setPersonal({ ...personal, fullName: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="john.doe@example.com"
                          value={personal.email}
                          onChange={e => setPersonal({ ...personal, email: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="+1 (555) 123-4567"
                          value={personal.phone}
                          onChange={e => setPersonal({ ...personal, phone: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Location</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="City, State/Country"
                          value={personal.location}
                          onChange={e => setPersonal({ ...personal, location: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">LinkedIn Profile</label>
                        <input
                          type="url"
                          className="form-control"
                          placeholder="https://linkedin.com/in/johndoe"
                          value={personal.linkedin}
                          onChange={e => setPersonal({ ...personal, linkedin: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Website/Portfolio</label>
                        <input
                          type="url"
                          className="form-control"
                          placeholder="https://johndoe.com"
                          value={personal.website}
                          onChange={e => setPersonal({ ...personal, website: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 2 - Summary */}
                  {step === 2 && (
                    <div className="form-section">
                      <div className="form-group">
                        <label className="form-label">Professional Objective</label>
                        <textarea
                          className="form-control"
                          rows={4}
                          placeholder="A brief statement about your career goals..."
                          value={summary.objective}
                          onChange={e => setSummary({ ...summary, objective: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Professional Summary</label>
                        <textarea
                          className="form-control"
                          rows={6}
                          placeholder="Summary of your professional background and key achievements..."
                          value={summary.summary}
                          onChange={e => setSummary({ ...summary, summary: e.target.value })}
                        />
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
                            <button
                              className="btn btn-sm btn-danger-soft"
                              onClick={() => removeExperience(i)}
                            >
                              Remove
                            </button>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Role</label>
                            <input
                              type="text"
                              className="form-control"
                              value={exp.role}
                              onChange={e => updateExperience(i, 'role', e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Company</label>
                            <input
                              type="text"
                              className="form-control"
                              value={exp.company}
                              onChange={e => updateExperience(i, 'company', e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Location</label>
                            <input
                              type="text"
                              className="form-control"
                              value={exp.location}
                              onChange={e => updateExperience(i, 'location', e.target.value)}
                            />
                          </div>
                          <div className="date-row">
                            <div className="form-group">
                              <label className="form-label">Start</label>
                              <input
                                type="month"
                                className="form-control"
                                value={exp.start}
                                onChange={e => updateExperience(i, 'start', e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">End</label>
                              <input
                                type="month"
                                className="form-control"
                                value={exp.end}
                                onChange={e => updateExperience(i, 'end', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea
                              className="form-control"
                              rows={5}
                              value={exp.summary}
                              onChange={e => updateExperience(i, 'summary', e.target.value)}
                            />
                          </div>
                        </div>
                      ))}
                      <button className="btn btn-secondary w-100" onClick={addExperience}>
                        + Add Experience
                      </button>
                    </div>
                  )}

                  {/* STEP 4 - Projects (Was 5) */}
                  {step === 4 && (
                    <div className="form-section">
                      {projects.map((proj, i) => (
                        <div key={i} className="entry-card">
                          <div className="entry-card-header">
                            <h4 style={{ margin: 0 }}>Project #{i + 1}</h4>
                            <button className="btn btn-sm btn-danger-soft" onClick={() => removeProject(i)}>
                              Remove
                            </button>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Project Name</label>
                            <input
                              type="text"
                              className="form-control"
                              value={proj.name}
                              onChange={e => updateProject(i, 'name', e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Technologies</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="React, Node.js, ..."
                              value={proj.technologies}
                              onChange={e => updateProject(i, 'technologies', e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Link</label>
                            <input
                              type="url"
                              className="form-control"
                              value={proj.link}
                              onChange={e => updateProject(i, 'link', e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea
                              className="form-control"
                              rows={4}
                              value={proj.description}
                              onChange={e => updateProject(i, 'description', e.target.value)}
                            />
                          </div>
                        </div>
                      ))}
                      <button className="btn btn-secondary w-100" onClick={addProject}>
                        + Add Project
                      </button>
                    </div>
                  )}

                  {/* STEP 5 - Skills (Grouped) */}
                  {step === 5 && (
                    <div className="form-section">
                      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                        Group your skills to make them scannable. E.g., &quot;Languages, Tools, Soft Skills&quot;.
                      </p>
                      {skillCategories.map((cat, i) => (
                        <div key={i} className="entry-card">
                          <div className="entry-card-header">
                            <h4 style={{ margin: 0 }}>Skill Category #{i + 1}</h4>
                            <button className="btn btn-sm btn-danger-soft" onClick={() => removeSkillCategory(i)}>
                              Remove
                            </button>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Category Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="e.g. Cloud Platforms, DevOps, Programming Languages"
                              value={cat.name}
                              onChange={e => updateSkillCategory(i, 'name', e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Skills (Comma Separated)</label>
                            <textarea
                              className="form-control"
                              rows={3}
                              placeholder="AWS, Azure, GCP, Docker, Kubernetes..."
                              value={cat.skills}
                              onChange={e => updateSkillCategory(i, 'skills', e.target.value)}
                            />
                          </div>
                        </div>
                      ))}
                      <button className="btn btn-secondary w-100" onClick={addSkillCategory}>
                        + Add Skill Category
                      </button>
                    </div>
                  )}

                  {/* STEP 6 - Education (Was 4) */}
                  {step === 6 && (
                    <div className="form-section">
                      {education.map((edu, i) => (
                        <div key={i} className="entry-card">
                          <div className="entry-card-header">
                            <h4 style={{ margin: 0 }}>Education #{i + 1}</h4>
                            <button className="btn btn-sm btn-danger-soft" onClick={() => removeEducation(i)}>
                              Remove
                            </button>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Degree</label>
                            <input
                              type="text"
                              className="form-control"
                              value={edu.degree}
                              onChange={e => updateEducation(i, 'degree', e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Institution</label>
                            <input
                              type="text"
                              className="form-control"
                              value={edu.institution}
                              onChange={e => updateEducation(i, 'institution', e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Location</label>
                            <input
                              type="text"
                              className="form-control"
                              value={edu.location}
                              onChange={e => updateEducation(i, 'location', e.target.value)}
                            />
                          </div>
                          <div className="date-row">
                            <div className="form-group">
                              <label className="form-label">Start</label>
                              <input
                                type="month"
                                className="form-control"
                                value={edu.start}
                                onChange={e => updateEducation(i, 'start', e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">End</label>
                              <input
                                type="month"
                                className="form-control"
                                value={edu.end}
                                onChange={e => updateEducation(i, 'end', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="form-label">GPA</label>
                            <input
                              type="text"
                              className="form-control"
                              value={edu.gpa}
                              onChange={e => updateEducation(i, 'gpa', e.target.value)}
                            />
                          </div>
                        </div>
                      ))}
                      <button className="btn btn-secondary w-100" onClick={addEducation}>
                        + Add Education
                      </button>
                    </div>
                  )}

                  {/* STEP 7 - Certifications (Was 6) */}
                  {step === 7 && (
                    <div className="form-section">
                      {certifications.map((cert, i) => (
                        <div key={i} className="entry-card">
                          <div className="entry-card-header">
                            <h4 style={{ margin: 0 }}>Certification #{i + 1}</h4>
                            <button className="btn btn-sm btn-danger-soft" onClick={() => removeCertification(i)}>
                              Remove
                            </button>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Name</label>
                            <input
                              type="text"
                              className="form-control"
                              value={cert.name}
                              onChange={e => updateCertification(i, 'name', e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Issuer</label>
                            <input
                              type="text"
                              className="form-control"
                              value={cert.issuer}
                              onChange={e => updateCertification(i, 'issuer', e.target.value)}
                            />
                          </div>
                          <div className="date-row">
                            <div className="form-group">
                              <label className="form-label">Date</label>
                              <input
                                type="month"
                                className="form-control"
                                value={cert.date}
                                onChange={e => updateCertification(i, 'date', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button className="btn btn-secondary w-100" onClick={addCertification}>
                        + Add Certification
                      </button>
                    </div>
                  )}

                  {/* STEP 8 - Languages & Awards */}
                  {step === 8 && (
                    <div className="form-section">
                      <h3>Languages</h3>
                      {languages.map((lang, i) => (
                        <div key={i} className="entry-card">
                          <div className="entry-card-header">
                            <h4 style={{ margin: 0 }}>Language #{i + 1}</h4>
                            <button className="btn btn-sm btn-danger-soft" onClick={() => removeLanguage(i)}>
                              Remove
                            </button>
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Language"
                              value={lang.name}
                              onChange={e => updateLanguage(i, 'name', e.target.value)}
                            />
                          </div>
                          <div className="form-group">
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
                      ))}
                      <button className="btn btn-secondary w-100 mb-4" onClick={addLanguage}>
                        + Add Language
                      </button>

                      <h3>Awards</h3>
                      {awards.map((award, i) => (
                        <div key={i} className="entry-card">
                          <div className="entry-card-header">
                            <h4 style={{ margin: 0 }}>Award #{i + 1}</h4>
                            <button className="btn btn-sm btn-danger-soft" onClick={() => removeAward(i)}>
                              Remove
                            </button>
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Title"
                              value={award.title}
                              onChange={e => updateAward(i, 'title', e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Issuer"
                              value={award.issuer}
                              onChange={e => updateAward(i, 'issuer', e.target.value)}
                            />
                          </div>
                        </div>
                      ))}
                      <button className="btn btn-secondary w-100" onClick={addAward}>
                        + Add Award
                      </button>
                    </div>
                  )}

                  {/* STEP 9 - Choose Template */}
                  {step === 9 && (
                    <div className="form-section text-center">
                      <h3 className="mb-4">Choose Your Resume Template</h3>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <div
                            className={`card p-4 ${selectedTemplate === 'minimal' ? 'border-primary' : ''}`}
                            onClick={() => setSelectedTemplate('minimal')}
                            style={{ cursor: 'pointer', border: selectedTemplate === 'minimal' ? '2px solid #667eea' : '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}
                          >
                            <h4 style={{ color: selectedTemplate === 'minimal' ? '#667eea' : 'inherit' }}>Minimal ATS</h4>
                            <p style={{ color: 'var(--text-secondary)' }}>Maximum density, ATS optimized. Great for ATS systems.</p>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div
                            className={`card p-4 ${selectedTemplate === 'executive' ? 'border-primary' : ''}`}
                            onClick={() => setSelectedTemplate('executive')}
                            style={{ cursor: 'pointer', border: selectedTemplate === 'executive' ? '2px solid #667eea' : '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}
                          >
                            <h4 style={{ color: selectedTemplate === 'executive' ? '#667eea' : 'inherit' }}>Executive</h4>
                            <p style={{ color: 'var(--text-secondary)' }}>Formal layout with strong hierarchy. Perfect for leadership roles.</p>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div
                            className={`card p-4 ${selectedTemplate === 'developer' ? 'border-primary' : ''}`}
                            onClick={() => setSelectedTemplate('developer')}
                            style={{ cursor: 'pointer', border: selectedTemplate === 'developer' ? '2px solid #667eea' : '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}
                          >
                            <h4 style={{ color: selectedTemplate === 'developer' ? '#667eea' : 'inherit' }}>Developer</h4>
                            <p style={{ color: 'var(--text-secondary)' }}>Technical focus with clean formatting. Optimized for tech roles.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 10 - Preview */}
                  {step === 10 && (
                    <div className="form-section">
                      <div style={{ height: '800px', background: '#525659', borderRadius: '8px', overflow: 'hidden' }}>
                        <ResumePreview data={resumeData} template={selectedTemplate} />
                      </div>
                    </div>
                  )}

                  <div className="form-navigation">
                    {step > 1 && (
                      <button className="btn btn-secondary" onClick={back}>
                        ← Back
                      </button>
                    )}
                    {step < 10 && (
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
        .steps-indicator { display: flex; justify-content: space-between; align-items: center; position: relative; padding: 0 1rem; margin-bottom: 2rem; overflow-x: auto; }
        .step-item { display: flex; flexDirection: column; align-items: center; gap: 0.5rem; position: relative; z-index: 1; min-width: 50px; }
        .step-number { width: 32px; height: 32px; border-radius: 50%; background: rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.875rem; }
        .step-item.active .step-number { background: var(--primary-gradient, #667eea); box-shadow: 0 0 10px rgba(102, 126, 234, 0.5); }
        .step-item.completed .step-number { background: #10b981; }
        .step-label { font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px; }
        .step-item.active .step-label { color: var(--text-primary); font-weight: bold; }
        .form-section { padding: 1rem 0; }
        .entry-card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; }
        .entry-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
        .date-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-navigation { display: flex; justify-content: space-between; margin-top: 2rem; }
        .btn-danger-soft { background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); }
        :global(.form-control) { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: white; padding: 0.75rem; border-radius: 6px; width: 100%; margin-bottom: 1rem; }
        :global(.form-label) { display: block; margin-bottom: 0.5rem; color: var(--text-secondary); font-size: 0.875rem; }
      `}</style>
    </main>
  );
}
