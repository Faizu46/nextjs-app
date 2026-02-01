import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

// THE MODERN ATS - Clean, Apple-esque, Maximum Readability
const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
    color: '#000000',
    border: '2pt solid #000000',
  },
  // HEADER SECTION
  header: {
    marginBottom: 20,
    borderBottom: '1pt solid #000000',
    paddingBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  contactInfo: {
    fontSize: 9,
    color: '#333333',
  },
  // SECTION HEADERS
  sectionHeader: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 16,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  // ENTRY LAYOUTS
  entryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  entryTitle: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  entrySubtitle: {
    fontSize: 9,
    color: '#333333',
    marginBottom: 4,
  },
  entryDate: {
    fontSize: 9,
    color: '#555555',
  },
  entryContent: {
    fontSize: 9,
    lineHeight: 1.5,
    marginBottom: 10,
  },
  // BULLET POINTS
  bulletContainer: {
    flexDirection: 'row',
    marginBottom: 3,
    marginLeft: 8,
  },
  bulletSymbol: {
    width: 12,
    fontSize: 9,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.4,
  },
  // SKILLS
  skillRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  skillCategory: {
    fontSize: 9,
    fontWeight: 'bold',
    width: 90,
  },
  skillList: {
    fontSize: 9,
    flex: 1,
  },
});

const MinimalAtsTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personal, summary, experiences, education, projects, certifications, skillCategories } = data;

  const renderBullet = (text: string, idx: number) => (
    <View key={idx} style={styles.bulletContainer}>
      <Text style={styles.bulletSymbol}>•</Text>
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          {personal?.fullName && (
            <Text style={styles.name}>{personal.fullName}</Text>
          )}
          {[personal?.email, personal?.phone, personal?.location, personal?.linkedin, personal?.website]
            .filter(Boolean).length > 0 && (
              <Text style={styles.contactInfo}>
                {[personal?.email, personal?.phone, personal?.location, personal?.linkedin, personal?.website]
                  .filter(Boolean)
                  .join(' • ')}
              </Text>
            )}
        </View>

        {/* SUMMARY */}
        {summary?.summary && (
          <View>
            <Text style={styles.sectionHeader}>PROFESSIONAL SUMMARY</Text>
            <Text style={styles.entryContent}>{summary.summary}</Text>
          </View>
        )}

        {/* OBJECTIVE */}
        {summary?.objective && (
          <View>
            <Text style={styles.sectionHeader}>OBJECTIVE</Text>
            <Text style={styles.entryContent}>{summary.objective}</Text>
          </View>
        )}

        {/* EXPERIENCE */}
        {experiences && experiences.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>EXPERIENCE</Text>
            {experiences.map((exp, idx) => (
              <View key={idx} style={{ marginBottom: 12 }}>
                <View style={styles.entryRow}>
                  <Text style={styles.entryTitle}>{exp.role}</Text>
                  <Text style={styles.entryDate}>
                    {[exp.start, exp.end].filter(Boolean).join(' - ')}
                  </Text>
                </View>
                <Text style={styles.entrySubtitle}>
                  {exp.company} {exp.location && `• ${exp.location}`}
                </Text>
                {exp.summary &&
                  exp.summary
                    .split('\n')
                    .filter(Boolean)
                    .map((line, i) => renderBullet(line, i))}
              </View>
            ))}
          </View>
        )}

        {/* PROJECTS */}
        {projects && projects.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>PROJECTS</Text>
            {projects.map((proj, idx) => (
              <View key={idx} style={{ marginBottom: 10 }}>
                <View style={styles.entryRow}>
                  <Text style={styles.entryTitle}>{proj.name}</Text>
                  {proj.link && <Text style={styles.entryDate}>{proj.link}</Text>}
                </View>
                {proj.technologies && (
                  <Text style={styles.entrySubtitle}>{proj.technologies}</Text>
                )}
                {proj.description && (
                  <Text style={styles.entryContent}>{proj.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* SKILLS */}
        {skillCategories && skillCategories.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>SKILLS</Text>
            {skillCategories.map((cat, idx) => (
              <View key={idx} style={styles.skillRow}>
                <Text style={styles.skillCategory}>{cat.name}:</Text>
                <Text style={styles.skillList}>{cat.skills}</Text>
              </View>
            ))}
          </View>
        )}

        {/* EDUCATION */}
        {education && education.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>EDUCATION</Text>
            {education.map((edu, idx) => (
              <View key={idx} style={{ marginBottom: 8 }}>
                <View style={styles.entryRow}>
                  <Text style={styles.entryTitle}>{edu.degree}</Text>
                  <Text style={styles.entryDate}>
                    {[edu.start, edu.end].filter(Boolean).join(' - ')}
                  </Text>
                </View>
                <Text style={styles.entrySubtitle}>
                  {edu.institution} {edu.location && `• ${edu.location}`}
                </Text>
                {edu.gpa && <Text style={{ fontSize: 9 }}>GPA: {edu.gpa}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* CERTIFICATIONS */}
        {certifications && certifications.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>CERTIFICATIONS</Text>
            {certifications.map((cert, idx) => (
              <View key={idx} style={{ marginBottom: 6 }}>
                <View style={styles.entryRow}>
                  <Text style={styles.entryTitle}>{cert.name}</Text>
                  <Text style={styles.entryDate}>{cert.date}</Text>
                </View>
                {cert.issuer && <Text style={styles.entrySubtitle}>{cert.issuer}</Text>}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default MinimalAtsTemplate;
