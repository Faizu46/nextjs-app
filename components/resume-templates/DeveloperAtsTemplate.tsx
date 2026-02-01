import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

// THE TECH STACK - Dense, Structured, Developer-Focused
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 9,
    lineHeight: 1.3,
    color: '#000000',
    border: '2pt solid #000000',
  },
  // HEADER SECTION - Compact, Links Prominent
  header: {
    marginBottom: 14,
    paddingBottom: 10,
    borderBottom: '2pt solid #000000',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  linksContainer: {
    textAlign: 'right',
  },
  linkText: {
    fontSize: 8,
    color: '#0066cc',
    marginBottom: 1,
  },
  contactText: {
    fontSize: 8,
    color: '#333333',
    marginTop: 2,
  },
  // SECTION HEADERS - Minimal, Uppercase
  sectionHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 12,
    marginBottom: 6,
    borderBottom: '1pt solid #333333',
    paddingBottom: 2,
    letterSpacing: 0.8,
  },
  // ENTRY LAYOUTS
  entryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  entryTitle: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  entrySubtitle: {
    fontSize: 8,
    color: '#555555',
    marginBottom: 3,
  },
  entryDate: {
    fontSize: 8,
    color: '#666666',
  },
  entryContent: {
    fontSize: 8,
    lineHeight: 1.4,
    marginBottom: 8,
  },
  // BULLET POINTS - Compact
  bulletContainer: {
    flexDirection: 'row',
    marginBottom: 2,
    marginLeft: 6,
  },
  bulletSymbol: {
    width: 8,
    fontSize: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 8,
    lineHeight: 1.3,
  },
  // SKILLS - Dense Grid
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  skillCategory: {
    width: '50%',
    marginBottom: 4,
    paddingRight: 8,
  },
  skillCategoryName: {
    fontSize: 8,
    fontWeight: 'bold',
    fontFamily: 'Courier',
  },
  skillCategoryList: {
    fontSize: 8,
    marginTop: 1,
  },
  // TECH BADGE
  techBadge: {
    fontSize: 7,
    fontFamily: 'Courier',
    backgroundColor: '#f0f0f0',
    padding: 2,
    marginRight: 4,
  },
});

const DeveloperAtsTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personal, summary, experiences, education, projects, certifications, skillCategories } = data;

  const renderBullet = (text: string, idx: number) => (
    <View key={idx} style={styles.bulletContainer}>
      <Text style={styles.bulletSymbol}>›</Text>
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER - Name Left, Links Right */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View>
              {personal?.fullName && (
                <Text style={styles.name}>{personal.fullName}</Text>
              )}
              {[personal?.email, personal?.phone, personal?.location]
                .filter(Boolean).length > 0 && (
                  <Text style={styles.contactText}>
                    {[personal?.email, personal?.phone, personal?.location]
                      .filter(Boolean)
                      .join(' • ')}
                  </Text>
                )}
            </View>
            <View style={styles.linksContainer}>
              {personal?.linkedin && (
                <Text style={styles.linkText}>{personal.linkedin}</Text>
              )}
              {personal?.website && (
                <Text style={styles.linkText}>{personal.website}</Text>
              )}
            </View>
          </View>
        </View>

        {/* SKILLS - Promoted to Top */}
        {skillCategories && skillCategories.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>TECHNICAL SKILLS</Text>
            <View style={styles.skillsGrid}>
              {skillCategories.map((cat, idx) => (
                <View key={idx} style={styles.skillCategory}>
                  <Text style={styles.skillCategoryName}>{cat.name}:</Text>
                  <Text style={styles.skillCategoryList}>{cat.skills}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* SUMMARY */}
        {summary?.summary && (
          <View>
            <Text style={styles.sectionHeader}>SUMMARY</Text>
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
              <View key={idx} style={{ marginBottom: 10 }}>
                <View style={styles.entryRow}>
                  <Text style={styles.entryTitle}>{exp.role}</Text>
                  <Text style={styles.entryDate}>
                    {[exp.start, exp.end].filter(Boolean).join(' - ')}
                  </Text>
                </View>
                <Text style={styles.entrySubtitle}>
                  {exp.company} {exp.location && `| ${exp.location}`}
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

        {/* PROJECTS - Emphasis on Technologies */}
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
                  <Text
                    style={{
                      fontSize: 7,
                      fontFamily: 'Courier',
                      color: '#0066cc',
                      marginBottom: 3,
                    }}
                  >
                    {proj.technologies}
                  </Text>
                )}
                {proj.description && (
                  <Text style={styles.entryContent}>{proj.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* EDUCATION */}
        {education && education.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>EDUCATION</Text>
            {education.map((edu, idx) => (
              <View key={idx} style={{ marginBottom: 6 }}>
                <View style={styles.entryRow}>
                  <Text style={styles.entryTitle}>{edu.degree}</Text>
                  <Text style={styles.entryDate}>
                    {[edu.start, edu.end].filter(Boolean).join(' - ')}
                  </Text>
                </View>
                <Text style={styles.entrySubtitle}>
                  {edu.institution} {edu.location && `| ${edu.location}`}
                </Text>
                {edu.gpa && <Text style={{ fontSize: 8 }}>GPA: {edu.gpa}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* CERTIFICATIONS */}
        {certifications && certifications.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>CERTIFICATIONS</Text>
            {certifications.map((cert, idx) => (
              <View key={idx} style={{ marginBottom: 5 }}>
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

export default DeveloperAtsTemplate;
