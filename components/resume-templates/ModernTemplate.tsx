import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '../../types/resume';

const styles = StyleSheet.create({
    page: {
        padding: 0,
        fontFamily: 'Helvetica',
        fontSize: 10,
        lineHeight: 1.5,
        flexDirection: 'row',
    },
    leftColumn: {
        width: '35%',
        backgroundColor: '#1a365d', // Dark Blue Sidebar (Premium)
        padding: 20,
        height: '100%',
        color: '#ffffff', // White text
    },
    rightColumn: {
        width: '65%',
        padding: 25,
        height: '100%',
        backgroundColor: '#ffffff',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#ffffff', // White name
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    role: {
        fontSize: 14,
        color: '#cbd5e0', // Light blue-grey
        marginBottom: 20,
    },
    contactItem: {
        fontSize: 9,
        marginBottom: 6,
        color: '#e2e8f0', // Off-white
    },
    sectionTitle: {
        fontSize: 12, // Standard
        fontWeight: 'bold',
        marginBottom: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#2d3748', // Dark text for right column
        borderBottomWidth: 1, // Add underline for attractiveness
        borderBottomColor: '#cbd5e0',
        paddingBottom: 4,
    },
    sidebarSectionTitle: { // Special title for sidebar
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#4a5568', // Lighter border
        paddingBottom: 4,
    },
    // ...




    // Left Column Styles
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
                    {experiences.length > 0 && experiences[0].role && <Text style={styles.role}>{experiences[0].role}</Text>}

                    <View style={{ marginBottom: 20 }}>
                        {[
                            personal.email,
                            personal.phone,
                            personal.location,
                            personal.linkedin,
                            personal.website
                        ].filter(item => item && item.trim().length > 0).map((item, i) => (
                            <Text key={i} style={styles.contactItem}>{item}</Text>
                        ))}
                    </View>

                    {/* Education */}
                    {education.length > 0 && education[0].institution && (
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.sidebarSectionTitle}>Education</Text>
                            {education.map((edu, i) => (
                                <View key={i} style={{ marginBottom: 10 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#fff' }}>{edu.degree}</Text>
                                    <Text style={{ color: '#cbd5e0' }}>{edu.institution}</Text>
                                    <Text style={{ color: '#a0aec0', fontSize: 9 }}>{edu.start} - {edu.end}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Skills */}
                    {skillCategories.length > 0 && (
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.sidebarSectionTitle}>Skills</Text>
                            {skillCategories.map((cat, i) => (
                                <View key={i} style={styles.skillGroup}>
                                    <Text style={[styles.skillCategory, { color: '#fff' }]}>{cat.name}</Text>
                                    <Text style={[styles.skillText, { color: '#cbd5e0' }]}>{cat.skills}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Languages */}
                    {languages.length > 0 && languages[0].name && (
                        <View>
                            <Text style={styles.sidebarSectionTitle}>Languages</Text>
                            {languages.map((l, i) => (
                                <Text key={i} style={{ marginBottom: 4, color: '#e2e8f0' }}>
                                    {l.name} {l.proficiency ? `- ${l.proficiency}` : ''}
                                </Text>
                            ))}
                        </View>
                    )}

                </View>

                {/* Right Main Column */}
                <View style={styles.rightColumn}>

                    {/* 1. Summary (Strictly first in main col if present) */}
                    {summary.summary && summary.summary.trim().length > 0 && (
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.sectionTitle}>Professional Summary</Text>
                            <Text style={styles.description}>{summary.summary}</Text>
                        </View>
                    )}

                    {/* 2. Objective (Strictly second if present) */}
                    {summary.objective && summary.objective.trim().length > 0 && (
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.sectionTitle}>Objective</Text>
                            <Text style={styles.description}>{summary.objective}</Text>
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
                                    {exp.summary && exp.summary.trim().length > 0 && (
                                        <Text style={styles.description}>{exp.summary}</Text>
                                    )}
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
                                    {proj.technologies && (
                                        <Text style={[styles.description, { fontStyle: 'italic', fontSize: 9, marginBottom: 2 }]}>
                                            {proj.technologies}
                                        </Text>
                                    )}
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
