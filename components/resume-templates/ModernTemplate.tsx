import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '../../types/resume';

const styles = StyleSheet.create({
    page: {
        padding: 0,
        fontFamily: 'Inter',
        fontSize: 10,
        lineHeight: 1.5,
        flexDirection: 'row',
    },
    leftColumn: {
        width: '35%',
        backgroundColor: '#f4f6f8',
        padding: 20,
        height: '100%',
    },
    rightColumn: {
        width: '65%',
        padding: 20,
        height: '100%',
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#2d3748',
    },
    role: {
        fontSize: 14,
        color: '#4a5568',
        marginBottom: 20,
    },

    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#2b6cb0',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 10,
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: 4,
    },

    // Left Column Styles
    contactItem: {
        marginBottom: 6,
        color: '#4a5568',
        fontSize: 9,
    },
    skillGroup: {
        marginBottom: 10,
    },
    skillCategory: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#2d3748',
    },
    skillText: {
        color: '#4a5568',
    },

    // Right Column Styles
    entry: {
        marginBottom: 12,
    },
    entryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    entryTitle: {
        fontWeight: 'bold',
        color: '#2d3748',
    },
    entrySubtitle: {
        color: '#4a5568',
        fontStyle: 'italic',
    },
    entryDate: {
        color: '#718096',
        fontSize: 9,
    },
    description: {
        color: '#4a5568',
        textAlign: 'justify',
    }
});

interface Props {
    data: ResumeData;
}

export const ModernTemplate: React.FC<Props> = ({ data }) => {
    const { personal, summary, experiences, education, projects, certifications, languages, skillCategories } = data;

    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* Left Sidebar */}
                <View style={styles.leftColumn}>
                    <Text style={styles.name}>{personal.fullName}</Text>
                    {experiences[0]?.role && <Text style={styles.role}>{experiences[0].role}</Text>}

                    <View style={{ marginBottom: 20 }}>
                        {personal.email && <Text style={styles.contactItem}>{personal.email}</Text>}
                        {personal.phone && <Text style={styles.contactItem}>{personal.phone}</Text>}
                        {personal.location && <Text style={styles.contactItem}>{personal.location}</Text>}
                        {personal.linkedin && <Text style={styles.contactItem}>{personal.linkedin}</Text>}
                        {personal.website && <Text style={styles.contactItem}>{personal.website}</Text>}
                    </View>

                    {/* Education - in sidebar for Modern layout */}
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {education.map((edu, i) => (
                            <View key={i} style={{ marginBottom: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>{edu.degree}</Text>
                                <Text>{edu.institution}</Text>
                                <Text style={{ color: '#718096', fontSize: 9 }}>{edu.end}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Skills */}
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        {skillCategories.map((cat, i) => (
                            <View key={i} style={styles.skillGroup}>
                                <Text style={styles.skillCategory}>{cat.name}</Text>
                                <Text style={styles.skillText}>{cat.skills}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Languages */}
                    {languages.length > 0 && (
                        <View>
                            <Text style={styles.sectionTitle}>Languages</Text>
                            {languages.map((l, i) => (
                                <Text key={i} style={{ marginBottom: 4 }}>{l.name} - {l.proficiency}</Text>
                            ))}
                        </View>
                    )}

                </View>

                {/* Right Main Column */}
                <View style={styles.rightColumn}>

                    {(summary.summary || summary.objective) && (
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.sectionTitle}>{summary.objective ? 'Objective' : 'Profile'}</Text>
                            <Text style={styles.description}>{summary.summary || summary.objective}</Text>
                        </View>
                    )}

                    {experiences.length > 0 && experiences[0].company && (
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.sectionTitle}>Experience</Text>
                            {experiences.map((exp, i) => (
                                <View key={i} style={styles.entry}>
                                    <View style={styles.entryHeader}>
                                        <Text style={styles.entryTitle}>{exp.role}</Text>
                                        <Text style={styles.entryDate}>{exp.start} - {exp.end || 'Present'}</Text>
                                    </View>
                                    <Text style={[styles.entrySubtitle, { marginBottom: 4 }]}>{exp.company} | {exp.location}</Text>
                                    <Text style={styles.description}>{exp.summary}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {projects.length > 0 && projects[0].name && (
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.sectionTitle}>Projects</Text>
                            {projects.map((proj, i) => (
                                <View key={i} style={styles.entry}>
                                    <View style={styles.entryHeader}>
                                        <Text style={styles.entryTitle}>{proj.name}</Text>
                                        {proj.link && <Text style={{ fontSize: 9, color: '#2b6cb0' }}>{proj.link}</Text>}
                                    </View>
                                    <Text style={[styles.description, { fontStyle: 'italic', fontSize: 9, marginBottom: 2 }]}>{proj.technologies}</Text>
                                    <Text style={styles.description}>{proj.description}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {certifications.length > 0 && certifications[0].name && (
                        <View>
                            <Text style={styles.sectionTitle}>Certifications</Text>
                            {certifications.map((cert, i) => (
                                <View key={i} style={{ marginBottom: 6 }}>
                                    <Text style={{ fontWeight: 'bold' }}>{cert.name}</Text>
                                    <Text>{cert.issuer} {cert.date && `| ${cert.date}`}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                </View>

            </Page>
        </Document>
    );
};
