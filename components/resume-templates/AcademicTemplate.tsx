import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '../../types/resume';

const styles = StyleSheet.create({
    page: { padding: 30, fontFamily: 'Times-Roman', fontSize: 10.5, lineHeight: 1.4 },
    header: { marginBottom: 15, textAlign: 'center', borderBottom: '1px solid #000', paddingBottom: 8 },
    name: { fontSize: 20, fontWeight: 'bold', marginBottom: 5, textTransform: 'uppercase' },
    contact: { fontSize: 10, marginBottom: 3 },
    section: { marginBottom: 12 },
    sectionTitle: { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 5 },

    // Academic specific
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    entry: { marginBottom: 5 },
});

export const AcademicTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const { personal, summary, experiences, education, projects, certifications, skillCategories } = data;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.name}>{personal.fullName}</Text>
                    <Text style={styles.contact}>
                        {[
                            personal.email,
                            personal.phone,
                            personal.location,
                            personal.linkedin,
                            personal.website
                        ].filter(item => item && item.trim().length > 0).join(' | ')}
                    </Text>
                </View>

                {/* 1. Summary (if present) */}
                {summary.summary && summary.summary.trim().length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Summary</Text>
                        <Text style={{ textAlign: 'justify' }}>{summary.summary}</Text>
                    </View>
                )}

                {/* 2. Objective (if present) */}
                {summary.objective && summary.objective.trim().length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Objective</Text>
                        <Text style={{ textAlign: 'justify' }}>{summary.objective}</Text>
                    </View>
                )}

                {/* Education First for Academic - Strict Check */}
                {education.length > 0 && education[0].institution && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {education.map((edu, i) => (
                            <View key={i} style={styles.entry}>
                                <View style={styles.row}>
                                    <Text style={{ fontWeight: 'bold' }}>{edu.institution}</Text>
                                    <Text>{edu.location}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text>{edu.degree}</Text>
                                    <Text>{edu.start} - {edu.end}</Text>
                                </View>
                                {edu.gpa && <Text>GPA: {edu.gpa}</Text>}
                                {edu.summary && edu.summary.trim().length > 0 && (
                                    <Text style={{ marginLeft: 10, fontSize: 10, marginTop: 2 }}>{edu.summary}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* Experience - Strict Check */}
                {experiences.length > 0 && experiences[0].company && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Professional Experience</Text>
                        {experiences.map((exp, i) => (
                            <View key={i} style={{ marginBottom: 8 }}>
                                <View style={styles.row}>
                                    <Text style={{ fontWeight: 'bold' }}>{exp.company}</Text>
                                    <Text>{exp.location}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={{ fontStyle: 'italic' }}>{exp.role}</Text>
                                    <Text>{exp.start} - {exp.end}</Text>
                                </View>
                                {exp.summary && exp.summary.trim().length > 0 && (
                                    <Text style={{ marginLeft: 10, fontSize: 10, marginTop: 2 }}>{exp.summary}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* Projects/Research - Strict Check */}
                {projects.length > 0 && projects[0].name && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Projects & Research</Text>
                        {projects.map((proj, i) => (
                            <View key={i} style={{ marginBottom: 5 }}>
                                <Text style={{ fontWeight: 'bold' }}>{proj.name}</Text>
                                <Text style={{ marginLeft: 10, fontSize: 10 }}>{proj.description}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Skills - Strict Check */}
                {skillCategories.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        {skillCategories.map((cat, i) => (
                            <Text key={i} style={{ fontSize: 10, marginBottom: 2 }}>
                                <Text style={{ fontWeight: 'bold' }}>{cat.name}: </Text>
                                {cat.skills}
                            </Text>
                        ))}
                    </View>
                )}

            </Page>
        </Document>
    );
};
