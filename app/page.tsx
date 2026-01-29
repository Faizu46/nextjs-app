'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { data: session } = useSession();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Cursor Glow Effect */}
      <div
        style={{
          position: 'fixed',
          top: mousePosition.y - 150,
          left: mousePosition.x - 150,
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          transition: 'all 0.1s ease',
          zIndex: 0,
        }}
      />

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <h1 style={{ animation: 'fadeInUp 1s ease-out' }}>
  Welcome to the Future of Career Growth
</h1>
<p style={{ animation: 'fadeInUp 1s ease-out 0.2s both' }}>
  AI-powered tools to accelerate your job search with cutting-edge interview prep and resume building
</p>
            <div className="d-flex justify-content-center gap-3" style={{ animation: 'fadeInUp 1s ease-out 0.4s both', flexWrap: 'wrap' }}>
              {!session ? (
                <>
                  <Link href="/register" className="btn btn-primary btn-lg glow">
                    Get Started Free
                  </Link>
                  <Link href="/dashboard" className="btn btn-outline-primary btn-lg">
                    Explore Features
                  </Link>
                </>
              ) : (
                <Link href="/dashboard" className="btn btn-primary btn-lg glow">
                  Go to Dashboard
                </Link>
              )}
            </div>

            {/* Floating Stats */}
            <div
              className="row"
              style={{
                marginTop: '4rem',
                animation: 'fadeInUp 1s ease-out 0.6s both',
              }}
            >
              <div className="col">
                <div className="card" style={{ textAlign: 'center', background: 'rgba(102, 126, 234, 0.1)' }}>
                  <h2 style={{ color: '#667eea', marginBottom: '0.5rem' }}>10K+</h2>
                  <p style={{ margin: 0 }}>Active Users</p>
                </div>
              </div>
              <div className="col">
                <div className="card" style={{ textAlign: 'center', background: 'rgba(245, 87, 108, 0.1)' }}>
                  <h2 style={{ color: '#f5576c', marginBottom: '0.5rem' }}>50K+</h2>
                  <p style={{ margin: 0 }}>Resumes Created</p>
                </div>
              </div>
              <div className="col">
                <div className="card" style={{ textAlign: 'center', background: 'rgba(79, 172, 254, 0.1)' }}>
                  <h2 style={{ color: '#4facfe', marginBottom: '0.5rem' }}>95%</h2>
                  <p style={{ margin: 0 }}>Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section">
          <div className="container">
            <div className="section-title">
              <h2>Powerful Features</h2>
              <p>Everything you need to land your dream job</p>
            </div>
            
            <div className="row">
              <div className="col">
                <div className="card">
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
                  <h3>Smart Dashboard</h3>
                  <p>
                    Track your applications, monitor progress, and get AI-powered insights to optimize your job search strategy.
                  </p>
                  <Link href="/dashboard" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    View Dashboard →
                  </Link>
                </div>
              </div>

              <div className="col">
                <div className="card">
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎤</div>
                  <h3>AI Interview Coach</h3>
                  <p>
                    Practice with AI-powered mock interviews, get real-time feedback, and master every question with confidence.
                  </p>
                  <Link href="/interview" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Start Practicing →
                  </Link>
                </div>
              </div>

              <div className="col">
                <div className="card">
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
                  <h3>Resume Builder Pro</h3>
                  <p>
                    Create ATS-friendly resumes with our smart builder. Choose from professional templates and AI suggestions.
                  </p>
                  <Link href="/resume-builder" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Build Resume →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section" style={{ background: 'rgba(102, 126, 234, 0.05)' }}>
          <div className="container">
            <div className="section-title">
              <h2>How It Works</h2>
              <p>Get hired in 3 simple steps</p>
            </div>

            <div className="row">
              <div className="col">
                <div className="card">
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      marginBottom: '1.5rem',
                    }}
                  >
                    1
                  </div>
                  <h3>Create Your Profile</h3>
                  <p>Sign up in seconds and build your professional profile with our guided setup.</p>
                </div>
              </div>

              <div className="col">
                <div className="card">
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      marginBottom: '1.5rem',
                    }}
                  >
                    2
                  </div>
                  <h3>Prepare & Practice</h3>
                  <p>Use our AI tools to create perfect resumes and ace your interviews.</p>
                </div>
              </div>

              <div className="col">
                <div className="card">
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      marginBottom: '1.5rem',
                    }}
                  >
                    3
                  </div>
                  <h3>Land Your Dream Job</h3>
                  <p>Track applications and get hired faster with our proven strategies.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section">
          <div className="container text-center">
            <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
              <h2 style={{ marginBottom: '1rem' }}>Ready to Accelerate Your Career?</h2>
              <p style={{ fontSize: '1.125rem', marginBottom: '2rem' }}>
                Join thousands of professionals who have transformed their job search with our AI-powered platform
              </p>
              <div className="d-flex justify-content-center gap-3" style={{ flexWrap: 'wrap' }}>
                {!session ? (
                  <>
                    <Link href="/register" className="btn btn-primary btn-lg glow">
                      Start Free Trial
                    </Link>
                    <Link href="/login" className="btn btn-outline-primary btn-lg">
                      Sign In
                    </Link>
                  </>
                ) : (
                  <Link href="/dashboard" className="btn btn-primary btn-lg glow">
                    Back to Dashboard
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
