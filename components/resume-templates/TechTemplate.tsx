import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '../../types/resume';

const styles = StyleSheet.create({
    page: { padding: 30, fontFamily: 'Inter', fontSize: 10, color: '#333' },
    header: { marginBottom: 20, textAlign: 'center' },
    name: { fontSize: 24, fontWeight: 'bold', marginBottom: 5, color: '#000' },
    contact: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 10, fontSize: 9, color: '#555' },
    section: { marginBottom: 15 },
    sectionTitle: { fontSize: 12, fontWeight: 'bold', borderBottom: '1px solid #000', marginBottom: 8, textTransform: 'uppercase' },

    // Tech specific: Skills grid
    skillsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginBottom: 15 },
    skillBadge: { backgroundColor: '#eee', padding: '3 6', borderRadius: 4, fontSize: 9 },

    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
    bold: { fontWeight: 'bold' },
    meta: { fontSize: 9, color: '#666' },
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
                        {[personal.email, personal.phone, personal.website, personal.linkedin, personal.location].filter(Boolean).map((info, i) => (
                            <Text key={i}>{info} {i < 3 && '•'}</Text>
                        ))}
                    </View>
                </View>

                {/* Skills First for Tech */}
                {skillCategories.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Technical Skills</Text>
                        {skillCategories.map((cat, i) => (
                            <View key={i} style={{ marginBottom: 5 }}>
                                <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>{cat.name}</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    <Text>{cat.skills}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* Projects Second for Tech */}
                {projects.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Projects</Text>
                        {projects.map((proj, i) => (
                            <View key={i} style={{ marginBottom: 10 }}>
                                <View style={styles.row}>
                                    <Text style={styles.bold}>{proj.name}</Text>
                                    <Text style={{ color: 'blue', fontSize: 9 }}>{proj.link}</Text>
                                </View>
                                {proj.technologies && <Text style={{ fontStyle: 'italic', fontSize: 9, marginBottom: 2 }}>{proj.technologies}</Text>}
                                <Text style={styles.text}>{proj.description}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Experience */}
                {experiences.length > 0 && (
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
                {education.length > 0 && (
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
