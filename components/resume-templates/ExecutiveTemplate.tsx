import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

// THE IVY LEAGUE - Traditional, Formal, Executive-Level
const styles = StyleSheet.create({
  page: {
    padding: 60,
    fontFamily: 'Times-Roman',
    fontSize: 10,
    lineHeight: 1.5,
    color: '#000000',
    border: '2pt solid #000000',
  },
  // HEADER SECTION - Center Aligned
  header: {
    marginBottom: 24,
    textAlign: 'center',
    borderBottom: '2pt solid #000000',
    paddingBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 2,
  },
  contactInfo: {
    fontSize: 9,
    color: '#333333',
    marginTop: 4,
  },
  // SECTION HEADERS - Centered with decorative styling
  sectionHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 12,
    letterSpacing: 1.5,
  },
  sectionDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#000000',
    marginBottom: 12,
  },
  // ENTRY LAYOUTS
  entryContainer: {
    marginBottom: 14,
  },
  entryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  entryTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  entrySubtitle: {
    fontSize: 10,
    fontStyle: 'italic',
    marginBottom: 6,
  },
  entryDate: {
    fontSize: 9,
    fontStyle: 'italic',
  },
  entryContent: {
    fontSize: 10,
    lineHeight: 1.6,
    textAlign: 'justify',
  },
  // BULLET POINTS
  bulletContainer: {
    flexDirection: 'row',
    marginBottom: 4,
    marginLeft: 12,
  },
  bulletSymbol: {
    width: 15,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.5,
  },
  // SKILLS
  skillBlock: {
    marginBottom: 6,
  },
  skillCategory: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  skillList: {
    fontSize: 10,
    marginTop: 2,
  },
});

const ExecutiveTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personal, summary, experiences, education, projects, certifications, skillCategories } = data;

  const renderBullet = (text: string, idx: number) => (
    <View key={idx} style={styles.bulletContainer}>
      <Text style={styles.bulletSymbol}>▪</Text>
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER - Center Aligned */}
        <View style={styles.header}>
          {personal?.fullName && (
            <Text style={styles.name}>{personal.fullName}</Text>
          )}
          {[personal?.email, personal?.phone, personal?.location]
            .filter(Boolean).length > 0 && (
              <Text style={styles.contactInfo}>
                {[personal?.email, personal?.phone, personal?.location]
                  .filter(Boolean)
                  .join(' | ')}
              </Text>
            )}
          {(personal?.linkedin || personal?.website) && (
            <Text style={styles.contactInfo}>
              {[personal?.linkedin, personal?.website].filter(Boolean).join(' | ')}
            </Text>
          )}
        </View>

        {/* SUMMARY */}
        {summary?.summary && (
          <View>
            <Text style={styles.sectionHeader}>PROFESSIONAL SUMMARY</Text>
            <View style={styles.sectionDivider} />
            <Text style={styles.entryContent}>{summary.summary}</Text>
          </View>
        )}

        {/* OBJECTIVE */}
        {summary?.objective && (
          <View>
            <Text style={styles.sectionHeader}>OBJECTIVE</Text>
            <View style={styles.sectionDivider} />
            <Text style={styles.entryContent}>{summary.objective}</Text>
          </View>
        )}

        {/* EXPERIENCE */}
        {experiences && experiences.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>PROFESSIONAL EXPERIENCE</Text>
            <View style={styles.sectionDivider} />
            {experiences.map((exp, idx) => (
              <View key={idx} style={styles.entryContainer}>
                <View style={styles.entryRow}>
                  <Text style={styles.entryTitle}>{exp.role}</Text>
                  <Text style={styles.entryDate}>
                    {[exp.start, exp.end].filter(Boolean).join(' – ')}
                  </Text>
                </View>
                <Text style={styles.entrySubtitle}>
                  {exp.company}
                  {exp.location && `, ${exp.location}`}
                </Text>
                {exp.summary && (
                  <View>
                    {exp.summary
                      .split('\n')
                      .filter(Boolean)
                      .map((line, i) => renderBullet(line, i))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* PROJECTS */}
        {projects && projects.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>NOTABLE PROJECTS</Text>
            <View style={styles.sectionDivider} />
            {projects.map((proj, idx) => (
              <View key={idx} style={styles.entryContainer}>
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
            <Text style={styles.sectionHeader}>CORE COMPETENCIES</Text>
            <View style={styles.sectionDivider} />
            {skillCategories.map((cat, idx) => (
              <View key={idx} style={styles.skillBlock}>
                <Text style={styles.skillCategory}>{cat.name}</Text>
                <Text style={styles.skillList}>{cat.skills}</Text>
              </View>
            ))}
          </View>
        )}

        {/* EDUCATION */}
        {education && education.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>EDUCATION</Text>
            <View style={styles.sectionDivider} />
            {education.map((edu, idx) => (
              <View key={idx} style={styles.entryContainer}>
                <View style={styles.entryRow}>
                  <Text style={styles.entryTitle}>{edu.degree}</Text>
                  <Text style={styles.entryDate}>
                    {[edu.start, edu.end].filter(Boolean).join(' – ')}
                  </Text>
                </View>
                <Text style={styles.entrySubtitle}>
                  {edu.institution}
                  {edu.location && `, ${edu.location}`}
                </Text>
                {edu.gpa && (
                  <Text style={{ fontSize: 9, marginTop: 2 }}>
                    Grade Point Average: {edu.gpa}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* CERTIFICATIONS */}
        {certifications && certifications.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>CERTIFICATIONS & LICENSES</Text>
            <View style={styles.sectionDivider} />
            {certifications.map((cert, idx) => (
              <View key={idx} style={{ marginBottom: 8 }}>
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

export default ExecutiveTemplate;
