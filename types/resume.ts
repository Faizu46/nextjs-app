export interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
}

export interface Summary {
    objective: string;
    summary: string;
}

export interface Experience {
    company: string;
    role: string;
    location: string;
    start: string;
    end: string;
    summary: string;
}

export interface Education {
    institution: string;
    degree: string;
    location: string;
    start: string;
    end: string;
    summary: string;
    gpa: string;
}

export interface Project {
    name: string;
    description: string;
    technologies: string;
    link: string;
}

export interface Certification {
    name: string;
    issuer: string;
    date: string;
    expiryDate: string;
}

export interface Language {
    name: string;
    proficiency: string;
}

export interface Award {
    title: string;
    issuer: string;
    date: string;
    description: string;
}

export interface SkillCategory {
    name: string;
    skills: string;
}

export interface ResumeData {
    personal: PersonalInfo;
    summary: Summary;
    experiences: Experience[];
    education: Education[];
    projects: Project[];
    certifications: Certification[];
    languages: Language[];
    awards: Award[];
    skillCategories: SkillCategory[];
}
