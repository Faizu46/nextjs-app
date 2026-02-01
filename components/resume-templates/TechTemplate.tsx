import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '../../types/resume';

const styles = StyleSheet.create({
    page: { padding: 25, fontFamily: 'Helvetica', fontSize: 10.5, color: '#000', lineHeight: 1.4 },
    header: { marginBottom: 15, textAlign: 'center' },
    name: { fontSize: 20, fontWeight: 'bold', marginBottom: 5, color: '#000', textTransform: 'uppercase' },
    contact: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 8, fontSize: 10, color: '#000' },
    section: { marginBottom: 12 },
    sectionTitle: { fontSize: 11, fontWeight: 'bold', borderBottom: '1px solid #000', marginBottom: 6, textTransform: 'uppercase' },

    // Tech specific: Skills grid (kept plain inline for ATS safety now)
    skillsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginBottom: 10 },

    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
    bold: { fontWeight: 'bold' },
    meta: { fontSize: 10, color: '#000' },
    text: { textAlign: 'justify', lineHeight: 1.4 },
});

export const TechTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const { personal, summary, experiences, education, projects, skillCategories } = data;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.name}>{personal.fullName}</Text>
                    <View style={styles.contact}>
                        {[
                            personal.email,
                            personal.phone,
                            personal.website,
                            personal.linkedin,
                            personal.location
                        ].filter(info => info && info.trim().length > 0).map((info, i, arr) => (
                            <Text key={i}>{info} {i < arr.length - 1 && '•'}</Text>
                        ))}
                    </View>
                </View>

                {/* 1. Summary (if present) */}
                {summary.summary && summary.summary.trim().length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Professional Summary</Text>
                        <Text style={styles.text}>{summary.summary}</Text>
                    </View>
                )}

                {/* 2. Objective (if present) */}
                {summary.objective && summary.objective.trim().length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Objective</Text>
                        <Text style={styles.text}>{summary.objective}</Text>
                    </View>
                )}

                {/* Skills First for Tech - Fixed to be inline/block instead of grid to be safer for ATS */}
                {skillCategories.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Technical Skills</Text>
                        {skillCategories.map((cat, i) => (
                            <View key={i} style={{ marginBottom: 5 }}>
                                <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>{cat.name}: <Text style={{ fontWeight: 'normal' }}>{cat.skills}</Text></Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Projects Second for Tech */}
                {projects.length > 0 && projects[0].name && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Projects</Text>
                        {projects.map((proj, i) => (
                            <View key={i} style={{ marginBottom: 10 }}>
                                <View style={styles.row}>
                                    <Text style={styles.bold}>{proj.name}</Text>
                                    {proj.link && <Text style={{ color: 'blue', fontSize: 9 }}>{proj.link}</Text>}
                                </View>
                                {proj.technologies && <Text style={{ fontStyle: 'italic', fontSize: 9, marginBottom: 2 }}>{proj.technologies}</Text>}
                                <Text style={styles.text}>{proj.description}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Experience */}
                {experiences.length > 0 && experiences[0].company && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Experience</Text>
                        {experiences.map((exp, i) => (
                            <View key={i} style={{ marginBottom: 10 }}>
                                <View style={styles.row}>
                                    <Text style={styles.bold}>{exp.role}</Text>
                                    <Text style={styles.meta}>{exp.start} - {exp.end}</Text>
                                </View>
                                <Text style={{ fontStyle: 'italic', marginBottom: 2 }}>{exp.company}</Text>
                                <Text style={styles.text}>{exp.summary}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Education */}
                {education.length > 0 && education[0].institution && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {education.map((edu, i) => (
                            <View key={i}>
                                <View style={styles.row}>
                                    <Text style={styles.bold}>{edu.institution}</Text>
                                    <Text style={styles.meta}>{edu.end}</Text>
                                </View>
                                <Text>{edu.degree}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </Page>
        </Document>
    );
};
