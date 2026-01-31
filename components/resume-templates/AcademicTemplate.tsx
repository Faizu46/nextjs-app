import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '../../types/resume';

const styles = StyleSheet.create({
    page: { padding: 40, fontFamily: 'Times-Roman', fontSize: 11, lineHeight: 1.4 },
    header: { marginBottom: 20, textAlign: 'center', borderBottom: '1px solid #000', paddingBottom: 10 },
    name: { fontSize: 20, fontWeight: 'bold', marginBottom: 5, textTransform: 'uppercase' },
    contact: { fontSize: 10, marginBottom: 5 },
    section: { marginBottom: 15 },
    sectionTitle: { fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 5 },

    // Academic specific
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    entry: { marginBottom: 5 },
});

export const AcademicTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const { personal, experiences, education, projects, certifications, skillCategories } = data;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.name}>{personal.fullName}</Text>
                    <Text style={styles.contact}>
                        {[personal.email, personal.phone, personal.location].filter(Boolean).join(' | ')}
                    </Text>
                    <Text style={styles.contact}>
                        {[personal.linkedin, personal.website].filter(Boolean).join(' | ')}
                    </Text>
                </View>

                {/* Education First for Academic */}
                {education.length > 0 && (
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
                                {edu.summary && <Text style={{ marginLeft: 10, fontSize: 10 }}>{edu.summary}</Text>}
                            </View>
                        ))}
                    </View>
                )}

                {/* Experience */}
                {experiences.length > 0 && (
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
                                <Text style={{ marginLeft: 10, fontSize: 10 }}>{exp.summary}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Projects/Research */}
                {projects.length > 0 && (
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

                {/* Skills */}
                {skillCategories.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        {skillCategories.map((cat, i) => (
                            <Text key={i} style={{ fontSize: 10 }}>
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
