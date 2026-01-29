'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface DashboardStats {
  totalApplications: number;
  interviewsScheduled: number;
  resumesCreated: number;
  practiceSessions: number;
}

interface Resume {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  createdAt: string;
}

interface PracticeSession {
  _id: string;
  interviewType: string;
  category: string;
  difficulty: string;
  totalScore: number;
  maxScore: number;
  percentageScore: number;
  duration: number;
  createdAt: string;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats>({
    totalApplications: 0,
    interviewsScheduled: 0,
    resumesCreated: 0,
    practiceSessions: 0,
  });

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [practiceSessions, setPracticeSessions] = useState<PracticeSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);

      if (!session?.user?.email) {
        setIsLoading(false);
        return;
      }

      try {
        // Fetch user's saved resumes from API
        let formattedResumes: Resume[] = [];
        const resumeResponse = await fetch('/api/resumes');
        if (resumeResponse.ok) {
          const resumeData = await resumeResponse.json();
          if (resumeData.resumes && Array.isArray(resumeData.resumes)) {
            formattedResumes = resumeData.resumes.map((resume: any) => ({
              id: resume._id,
              fullName: resume.personalInfo?.fullName || 'Untitled Resume',
              email: resume.personalInfo?.email || '',
              phone: resume.personalInfo?.phone || '',
              location: resume.personalInfo?.location || '',
              createdAt: resume.createdAt || new Date().toISOString(),
            }));
            setResumes(formattedResumes);
          }
        }

        // Fetch user's practice sessions
        let fetchedSessions: PracticeSession[] = [];
        try {
          const practiceResponse = await fetch('/api/interview');
          if (practiceResponse.ok) {
            const practiceData = await practiceResponse.json();
            if (practiceData.sessions && Array.isArray(practiceData.sessions)) {
              fetchedSessions = practiceData.sessions;
              setPracticeSessions(fetchedSessions);
            }
          }
        } catch (practiceError) {
          console.error('Error fetching practice sessions:', practiceError);
          // Continue without practice sessions
        }

        // Update stats based on fetched data
        setStats({
          totalApplications: 0,
          interviewsScheduled: 0,
          resumesCreated: formattedResumes.length,
          practiceSessions: fetchedSessions.length,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }

      setIsLoading(false);
    };

    fetchDashboardData();
  }, [session]);

  const formatDuration = (seconds: number) => {
    if (!seconds) return 'N/A';
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  if (isLoading) {
    return (
      <main>
        <section className="section">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="loading-skeleton" style={{ width: '200px', height: '40px' }}></div>
              <div className="d-flex gap-2">
                <div className="loading-skeleton" style={{ width: '150px', height: '40px' }}></div>
                <div className="loading-skeleton" style={{ width: '150px', height: '40px' }}></div>
              </div>
            </div>
            <div className="row mb-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="col">
                  <div className="card">
                    <div className="card-body text-center">
                      <div className="loading-skeleton" style={{ width: '50px', height: '50px', margin: '0 auto 1rem', borderRadius: '12px' }}></div>
                      <div className="loading-skeleton" style={{ width: '60px', height: '30px', margin: '0 auto 0.5rem' }}></div>
                      <div className="loading-skeleton" style={{ width: '100px', height: '20px', margin: '0 auto' }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <div className="loading-skeleton" style={{ width: '150px', height: '24px' }}></div>
                  </div>
                  <div className="card-body">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="loading-skeleton" style={{ width: '100%', height: '80px', marginBottom: '0.5rem', borderRadius: '8px' }}></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <div className="loading-skeleton" style={{ width: '200px', height: '24px' }}></div>
                  </div>
                  <div className="card-body">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="loading-skeleton" style={{ width: '100%', height: '80px', marginBottom: '0.5rem', borderRadius: '8px' }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <h1>Dashboard</h1>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/resume-builder" className="btn btn-primary">
                Create Resume
              </Link>
              <Link href="/interview" className="btn btn-secondary">
                Practice Interview
              </Link>
            </div>
          </div>

            <div className="row mb-4">
              <div className="col">
                <div className="card stat-card" style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)' }}>
                  <div className="card-body text-center">
                    <div className="stat-icon" style={{ background: 'rgba(102, 126, 234, 0.2)' }}>📄</div>
                    <h3 style={{ color: 'var(--glow-color)', marginBottom: '0.5rem', fontSize: '2.5rem' }}>
                      {resumes.length}
                    </h3>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>
                      Resumes Created
                    </p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card stat-card" style={{ background: 'linear-gradient(135deg, rgba(79, 172, 254, 0.15) 0%, rgba(0, 242, 254, 0.15) 100%)' }}>
                  <div className="card-body text-center">
                    <div className="stat-icon" style={{ background: 'rgba(79, 172, 254, 0.2)' }}>🎤</div>
                    <h3 style={{ color: '#4facfe', marginBottom: '0.5rem', fontSize: '2.5rem' }}>
                      {practiceSessions.length}
                    </h3>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>
                      Practice Sessions
                    </p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card stat-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.15) 100%)' }}>
                  <div className="card-body text-center">
                    <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.2)' }}>📊</div>
                    <h3 style={{ color: '#10b981', marginBottom: '0.5rem', fontSize: '2.5rem' }}>
                      {practiceSessions.length > 0
                        ? Math.round(
                            practiceSessions.reduce((sum, s) => sum + s.percentageScore, 0) /
                              practiceSessions.length
                          )
                        : 0}
                      %
                    </h3>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>
                      Avg. Interview Score
                    </p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card stat-card" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.15) 100%)' }}>
                  <div className="card-body text-center">
                    <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.2)' }}>⭐</div>
                    <h3 style={{ color: '#f59e0b', marginBottom: '0.5rem', fontSize: '2.5rem' }}>
                      {Math.round(
                        (practiceSessions.filter((s) => s.percentageScore >= 80).length /
                          (practiceSessions.length || 1)) *
                          100
                      )}
                      %
                    </h3>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>
                      Excellent Scores
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h3 style={{ margin: 0 }}>Quick Actions</h3>
                <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  Get started with these quick actions
                </p>
              </div>
              <div className="card-body">
                <div className="d-flex gap-2" style={{ flexWrap: 'wrap' }}>
                  <Link href="/interview" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>🎤</span>
                    <span>Practice Interview</span>
                  </Link>
                  <Link href="/resume-builder" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>📝</span>
                    <span>Build Resume</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h3 style={{ margin: 0 }}>My Resumes</h3>
                  </div>
                  <div className="card-body" style={{ padding: 0 }}>
                    {resumes.length > 0 ? (
                      <div style={{ padding: '0.5rem' }}>
                        {resumes.slice(0, 5).map((resume) => (
                          <div
                            key={resume.id}
                            style={{
                              padding: '1rem',
                              marginBottom: '0.5rem',
                              background: 'rgba(255, 255, 255, 0.03)',
                              borderRadius: '8px',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              transition: 'all 0.3s ease',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                            className="resume-item"
                          >
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                                <div style={{ fontSize: '1.5rem' }}>📄</div>
                                <strong style={{ fontSize: '1rem' }}>{resume.fullName}</strong>
                              </div>
                              <p style={{ margin: '0.25rem 0 0 2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                {resume.email}
                              </p>
                              <p style={{ margin: '0.25rem 0 0 2rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                Created {new Date(resume.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <Link href="/resume-builder" className="btn btn-sm btn-outline-primary">
                              Edit
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
                        <p style={{ marginBottom: '1rem', fontSize: '1.125rem' }}>No resumes yet</p>
                        <p style={{ marginBottom: '1.5rem', fontSize: '0.875rem' }}>Create your first professional resume to get started</p>
                        <Link href="/resume-builder" className="btn btn-primary">
                          Create Resume
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h3 style={{ margin: 0 }}>Recent Practice Sessions</h3>
                  </div>
                  <div className="card-body" style={{ padding: 0 }}>
                    {practiceSessions.length > 0 ? (
                      <div style={{ padding: '0.5rem' }}>
                        {practiceSessions.slice(0, 5).map((session) => (
                          <div
                            key={session._id}
                            style={{
                              padding: '1rem',
                              marginBottom: '0.5rem',
                              background: 'rgba(255, 255, 255, 0.03)',
                              borderRadius: '8px',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderLeft: `4px solid ${
                                session.percentageScore >= 80
                                  ? '#10b981'
                                  : session.percentageScore >= 60
                                    ? '#f59e0b'
                                    : '#ef4444'
                              }`,
                              transition: 'all 0.3s ease',
                            }}
                            className="session-item"
                          >
                            <div className="d-flex justify-content-between align-items-start">
                              <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                  <div style={{ fontSize: '1.25rem' }}>🎤</div>
                                  <strong>
                                    {session.interviewType.charAt(0).toUpperCase() +
                                      session.interviewType.slice(1)}{' '}
                                    - {session.difficulty.charAt(0).toUpperCase() +
                                      session.difficulty.slice(1)}
                                  </strong>
                                </div>
                                <p style={{ margin: '0.25rem 0 0 1.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                  {session.category} · {formatDuration(session.duration)}
                                </p>
                                <p style={{ margin: '0.25rem 0 0 1.75rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                  {new Date(session.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              <div
                                style={{
                                  fontSize: '1.5rem',
                                  fontWeight: 'bold',
                                  color:
                                    session.percentageScore >= 80
                                      ? '#10b981'
                                      : session.percentageScore >= 60
                                        ? '#f59e0b'
                                        : '#ef4444',
                                  marginLeft: '1rem',
                                  minWidth: '60px',
                                  textAlign: 'right',
                                }}
                              >
                                {session.percentageScore}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎤</div>
                        <p style={{ marginBottom: '1rem', fontSize: '1.125rem' }}>No practice sessions yet</p>
                        <p style={{ marginBottom: '1.5rem', fontSize: '0.875rem' }}>Start practicing to improve your interview skills</p>
                        <Link href="/interview" className="btn btn-primary">
                          Start Practice
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
  );
}
