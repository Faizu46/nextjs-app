import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeData } from '../../types/resume';

// Register standard fonts
Font.register({
    family: 'Inter',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.ttf' },
        { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hjp-Ek-_EeA.ttf', fontWeight: 'bold' },
        { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hjp-Ek-_EeA.ttf', fontStyle: 'italic' },
    ]
});

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Inter',
        fontSize: 11,
        lineHeight: 1.5,
        color: '#000000',
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#333',
        paddingBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#1a1a1a',
    },
    contact: {
        fontSize: 10,
        color: '#666',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 8,
        paddingBottom: 2,
        textTransform: 'uppercase',
        letterSpacing: 1,
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
        fontSize: 9,
        color: '#666',
    },
    text: {
        textAlign: 'justify',
    },
    bulletPoint: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    bullet: {
        width: 10,
        fontSize: 10,
    },
    skillCategory: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    skillName: {
        fontWeight: 'bold',
        width: 120,
    },
    skillList: {
        flex: 1,
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
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.name}>{personal.fullName || 'Your Name'}</Text>
                    <View style={styles.contact}>
                        {personal.email && <Text>{personal.email}  |</Text>}
                        {personal.phone && <Text>{personal.phone}  |</Text>}
                        {personal.location && <Text>{personal.location}  |</Text>}
                        {personal.linkedin && <Text>{personal.linkedin}  |</Text>}
                        {personal.website && <Text>{personal.website}</Text>}
                    </View>
                </View>

                {/* Summary */}
                {(summary.summary || summary.objective) && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{summary.objective ? 'Objective' : 'Professional Summary'}</Text>
                        <Text style={styles.text}>{summary.summary || summary.objective}</Text>
                    </View>
                )}

                {/* Experience */}
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
                                {exp.summary && <Text style={[styles.text, { marginTop: 4 }]}>{exp.summary}</Text>}
                            </View>
                        ))}
                    </View>
                )}

                {/* Projects */}
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

                {/* Skills */}
                {skillCategories.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        {skillCategories.map((cat, i) => (
                            <View key={i} style={styles.skillCategory}>
                                <Text style={styles.skillName}>{cat.name}:</Text>
                                <Text style={styles.skillList}>{cat.skills}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Education */}
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

                {/* Certifications */}
                {certifications.length > 0 && certifications[0].name && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Certifications</Text>
                        {certifications.map((cert, i) => (
                            <View key={i} style={{ marginBottom: 4 }}>
                                <Text style={styles.bold}>
                                    {cert.name} <Text style={{ fontWeight: 'normal' }}>- {cert.issuer}</Text>
                                </Text>
                                <Text style={styles.meta}>{cert.date}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Languages & Awards */}
                {(languages.length > 0 || awards.length > 0) && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Additional</Text>
                        {languages.length > 0 && (
                            <View style={{ marginBottom: 6 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 10 }}>Languages:</Text>
                                <Text>
                                    {languages.map(l => `${l.name} (${l.proficiency})`).join(' • ')}
                                </Text>
                            </View>
                        )}
                        {awards.length > 0 && (
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 10, marginBottom: 2 }}>Awards:</Text>
                                {awards.map((award, i) => (
                                    <Text key={i}>• {award.title} ({award.issuer})</Text>
                                ))}
                            </View>
                        )}
                    </View>
                )}
            </Page>
        </Document>
    );
};

export default ClassicTemplate;
