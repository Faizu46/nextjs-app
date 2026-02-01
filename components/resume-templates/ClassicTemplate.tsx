import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeData } from '../../types/resume';

const styles = StyleSheet.create({
    page: {
        padding: 30, // Standard A4 padding
        fontFamily: 'Helvetica',
        fontSize: 10.5,
        lineHeight: 1.4,
        color: '#000000',
    },
    header: {
        marginBottom: 20,
        textAlign: 'center',
        // NO border for header in this specific strict request ("No divider lines" - applied globally or to sections? 
        // Request says "4. SECTION HEADINGS ... NO divider lines". 
        // Example image usually has header line? "Exact match provided reference". 
        // Reference usually has line under name. But "NO divider lines or icons" in Section Headings rule 4.
        // Let's remove ALL borders to be strict to rule 4 & 1 (Clean).
        borderBottomWidth: 0,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#000000',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    contact: {
        fontSize: 10,
        color: '#000000',
        marginBottom: 2, // Spacing between contact lines
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        marginBottom: 6,
        textTransform: 'uppercase',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    bold: {
        fontWeight: 'bold',
    },
    italic: {
        fontStyle: 'italic',
    },
    meta: {
        fontSize: 10,
        color: '#000000',
        textAlign: 'right',
    },
    text: {
        fontSize: 10.5,
        textAlign: 'justify',
        lineHeight: 1.4,
    },
    skillCategory: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    skillName: {
        fontWeight: 'bold',
        width: 100, // Fixed width for alignment
        fontSize: 10.5,
    },
    skillList: {
        flex: 1,
        fontSize: 10.5,
    }
});

interface Props {
    data: ResumeData;
}

export const ClassicTemplate: React.FC<Props> = ({ data }) => {
    const { personal, summary, experiences, education, projects, certifications, languages, awards, skillCategories } = data;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header: Strict Name -> Contact Layout */}
                <View style={styles.header}>
                    <Text style={styles.name}>{personal.fullName || 'Your Name'}</Text>
                    <View style={styles.contact}>
                        {[
                            personal.email,
                            personal.phone,
                            personal.location,
                            personal.linkedin,
                            personal.website
                        ].filter(item => item && item.trim().length > 0).map((item, index, array) => (
                            <Text key={index}>
                                {item}{index < array.length - 1 ? ' | ' : ''}
                            </Text>
                        ))}
                    </View>
                </View>

                {/* 1. Professional Summary (Multi-line text block) */}
                {summary.summary && summary.summary.trim().length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Professional Summary</Text>
                        <Text style={styles.text}>{summary.summary}</Text>
                    </View>
                )}

                {/* 2. Career Objective (Strictly separate) */}
                {summary.objective && summary.objective.trim().length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Career Objective</Text>
                        <Text style={styles.text}>{summary.objective}</Text>
                    </View>
                )}

                {/* Experience (Strict format: Title | Company | Location | Dates) */}
                {experiences.length > 0 && experiences[0].role && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Experience</Text>
                        {experiences.map((exp, i) => (
                            <View key={i} style={{ marginBottom: 10 }}>
                                <View style={styles.row}>
                                    <Text style={styles.bold}>{exp.role}</Text>
                                    <Text style={styles.meta}>
                                        {exp.start} - {exp.end || 'Present'}
                                    </Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.italic}>{exp.company}</Text>
                                    <Text style={styles.meta}>{exp.location}</Text>
                                </View>
                                {/* Only render summary if it exists and is not empty */}
                                {exp.summary && exp.summary.trim().length > 0 && (
                                    <Text style={[styles.text, { marginTop: 4 }]}>{exp.summary}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* Projects (Strict format: Name | Link (optional) | Tech | Description) */}
                {projects.length > 0 && projects[0].name && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Projects</Text>
                        {projects.map((proj, i) => (
                            <View key={i} style={{ marginBottom: 10 }}>
                                <View style={styles.row}>
                                    <Text style={styles.bold}>{proj.name}</Text>
                                    {proj.link && <Text style={[styles.meta, { color: 'blue' }]}>{proj.link}</Text>}
                                </View>
                                {proj.technologies && (
                                    <Text style={[styles.italic, { fontSize: 9, marginBottom: 2 }]}>
                                        Tech: {proj.technologies}
                                    </Text>
                                )}
                                <Text style={styles.text}>{proj.description}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Skills (Strict inline grouping) */}
                {skillCategories.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Technical Skills</Text>
                        {skillCategories.map((cat, i) => (
                            <View key={i} style={styles.skillCategory}>
                                <Text style={styles.skillName}>{cat.name}:</Text>
                                <Text style={styles.skillList}>{cat.skills}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Education (Strict format: Degree | Institution | Location | Dates) */}
                {education.length > 0 && education[0].institution && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {education.map((edu, i) => (
                            <View key={i} style={{ marginBottom: 8 }}>
                                <View style={styles.row}>
                                    <Text style={styles.bold}>{edu.institution}</Text>
                                    <Text style={styles.meta}>
                                        {edu.start} - {edu.end || 'Present'}
                                    </Text>
                                </View>
                                <View style={styles.row}>
                                    <Text>{edu.degree}</Text>
                                    <Text style={styles.meta}>{edu.location}</Text>
                                </View>
                                {edu.gpa && <Text style={styles.meta}>GPA: {edu.gpa}</Text>}
                            </View>
                        ))}
                    </View>
                )}

                {/* Certifications (Strict condition check) */}
                {certifications.length > 0 && certifications[0].name && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Certifications</Text>
                        {certifications.map((cert, i) => (
                            <View key={i} style={{ marginBottom: 4 }}>
                                <Text style={styles.bold}>
                                    {cert.name}
                                    {cert.issuer && <Text style={{ fontWeight: 'normal' }}> - {cert.issuer}</Text>}
                                </Text>
                                {cert.date && <Text style={styles.meta}>{cert.date}</Text>}
                            </View>
                        ))}
                    </View>
                )}

                {/* Additional (Languages/Awards) - Completely hidden if empty */}
                {(languages.length > 0 || awards.length > 0) && (
                    (languages[0]?.name || awards[0]?.title) && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Additional</Text>

                            {languages.length > 0 && languages[0].name && (
                                <View style={{ marginBottom: 6 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 10 }}>Languages:</Text>
                                    <Text>
                                        {languages.filter(l => l.name).map(l => `${l.name} ${l.proficiency ? `(${l.proficiency})` : ''}`).join(' • ')}
                                    </Text>
                                </View>
                            )}

                            {awards.length > 0 && awards[0].title && (
                                <View>
                                    <Text style={{ fontWeight: 'bold', fontSize: 10, marginBottom: 2 }}>Awards:</Text>
                                    {awards.filter(a => a.title).map((award, i) => (
                                        <Text key={i}>• {award.title} {award.issuer ? `(${award.issuer})` : ''}</Text>
                                    ))}
                                </View>
                            )}
                        </View>
                    )
                )}
            </Page>
        </Document>
    );
};

export default ClassicTemplate;
