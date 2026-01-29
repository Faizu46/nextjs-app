'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface Question {
  id: number;
  question: string;
  category: string;
  keywords: string[];
}

interface InterviewSession {
  type: string;
  difficulty: string;
  category: string;
}

interface PracticeSession {
  _id: string;
  interviewType: string;
  category: string;
  difficulty: string;
  totalScore: number;
  maxScore: number;
  percentageScore: number;
  createdAt: string;
}

interface SessionResult {
  score: number;
  maxScore: number;
  percentage: number;
  answers: Array<{
    questionId: number;
    question: string;
    category: string;
    userAnswer: string;
    score: number;
  }>;
}

const questionDatabase: Question[] = [
  // General Questions
  {
    id: 1,
    question: 'Tell me about yourself and your background.',
    category: 'general',
    keywords: ['experience', 'education', 'skills', 'background', 'career', 'passion'],
  },
  {
    id: 2,
    question: 'What are your greatest strengths and weaknesses?',
    category: 'general',
    keywords: ['strength', 'weakness', 'improvement', 'learning', 'challenge'],
  },
  {
    id: 3,
    question: 'Where do you see yourself in 5 years?',
    category: 'general',
    keywords: ['growth', 'career', 'goal', 'development', 'leadership', 'advancement'],
  },
  {
    id: 4,
    question: 'Why do you want to work for our company?',
    category: 'general',
    keywords: ['company', 'mission', 'values', 'culture', 'opportunity', 'interest'],
  },
  {
    id: 5,
    question: 'What motivates you to work?',
    category: 'general',
    keywords: ['motivated', 'passionate', 'impact', 'growth', 'challenge', 'learning'],
  },
  {
    id: 6,
    question: 'Describe your ideal work environment.',
    category: 'general',
    keywords: ['team', 'collaboration', 'autonomy', 'innovation', 'support', 'culture'],
  },

  // Behavioral Questions
  {
    id: 7,
    question: 'Describe a challenging project you worked on and how you handled it.',
    category: 'behavioral',
    keywords: ['challenge', 'solution', 'problem-solving', 'overcome', 'result', 'learned'],
  },
  {
    id: 8,
    question: 'Tell me about a time you had to work with a difficult team member.',
    category: 'behavioral',
    keywords: ['conflict', 'communication', 'resolved', 'collaboration', 'patience', 'understanding'],
  },
  {
    id: 9,
    question: 'Give an example of when you showed leadership.',
    category: 'behavioral',
    keywords: ['leadership', 'initiative', 'responsibility', 'team', 'inspire', 'guide'],
  },
  {
    id: 10,
    question: 'Describe a time you failed and what you learned.',
    category: 'behavioral',
    keywords: ['failure', 'learned', 'improvement', 'resilience', 'reflection', 'growth'],
  },
  {
    id: 11,
    question: 'Tell me about your biggest professional achievement.',
    category: 'behavioral',
    keywords: ['achievement', 'success', 'proud', 'impact', 'results', 'recognition'],
  },
  {
    id: 12,
    question: 'How do you handle pressure and tight deadlines?',
    category: 'behavioral',
    keywords: ['pressure', 'deadline', 'organized', 'prioritize', 'calm', 'efficient'],
  },

  // Technical Questions
  {
    id: 13,
    question: 'What programming languages are you most proficient in?',
    category: 'technical',
    keywords: ['language', 'proficient', 'experience', 'project', 'expertise', 'proficiency'],
  },
  {
    id: 14,
    question: 'Explain the difference between synchronous and asynchronous programming.',
    category: 'technical',
    keywords: ['synchronous', 'asynchronous', 'blocking', 'non-blocking', 'callback', 'promise'],
  },
  {
    id: 15,
    question: 'What is object-oriented programming and its main principles?',
    category: 'technical',
    keywords: ['OOP', 'encapsulation', 'inheritance', 'polymorphism', 'abstraction', 'class'],
  },
  {
    id: 16,
    question: 'Describe your experience with databases. What types do you know?',
    category: 'technical',
    keywords: ['database', 'SQL', 'NoSQL', 'MongoDB', 'MySQL', 'PostgreSQL'],
  },
  {
    id: 17,
    question: 'What is version control and why is it important?',
    category: 'technical',
    keywords: ['version control', 'Git', 'repository', 'branch', 'commit', 'collaboration'],
  },
  {
    id: 18,
    question: 'How do you approach debugging a complex issue?',
    category: 'technical',
    keywords: ['debug', 'problem', 'systematic', 'logs', 'isolate', 'trace'],
  },

  // Software Engineering
  {
    id: 19,
    question: 'Explain the SOLID principles in software design.',
    category: 'software-engineering',
    keywords: ['SOLID', 'single', 'open', 'closed', 'design', 'principle'],
  },
  {
    id: 20,
    question: 'What is REST API and how do you design one?',
    category: 'software-engineering',
    keywords: ['REST', 'API', 'endpoint', 'HTTP', 'resource', 'endpoint'],
  },
  {
    id: 21,
    question: 'Describe your experience with agile methodologies.',
    category: 'software-engineering',
    keywords: ['agile', 'scrum', 'sprint', 'iterative', 'sprint', 'retrospective'],
  },
  {
    id: 22,
    question: 'What is the importance of code reviews?',
    category: 'software-engineering',
    keywords: ['code review', 'quality', 'feedback', 'improvement', 'standards', 'collaboration'],
  },
  {
    id: 23,
    question: 'How do you handle technical debt?',
    category: 'software-engineering',
    keywords: ['technical debt', 'refactor', 'maintenance', 'quality', 'balance', 'feature'],
  },
  {
    id: 24,
    question: 'What is microservices architecture?',
    category: 'software-engineering',
    keywords: ['microservices', 'architecture', 'scalability', 'independent', 'distributed', 'service'],
  },

  // Data Science
  {
    id: 25,
    question: 'What is the difference between supervised and unsupervised learning?',
    category: 'data-science',
    keywords: ['supervised', 'unsupervised', 'labeled', 'unlabeled', 'learning', 'clustering'],
  },
  {
    id: 26,
    question: 'Explain the machine learning workflow.',
    category: 'data-science',
    keywords: ['workflow', 'data', 'preprocessing', 'model', 'training', 'evaluation'],
  },
  {
    id: 27,
    question: 'What is cross-validation and why is it important?',
    category: 'data-science',
    keywords: ['cross-validation', 'validation', 'overfitting', 'performance', 'split'],
  },
  {
    id: 28,
    question: 'How do you handle missing data in datasets?',
    category: 'data-science',
    keywords: ['missing', 'imputation', 'delete', 'interpolate', 'handle'],
  },
  {
    id: 29,
    question: 'What tools and libraries do you use for data analysis?',
    category: 'data-science',
    keywords: ['Python', 'pandas', 'numpy', 'scikit-learn', 'tensorflow', 'library'],
  },
  {
    id: 30,
    question: 'Explain feature selection and its importance.',
    category: 'data-science',
    keywords: ['feature', 'selection', 'importance', 'relevant', 'dimensionality'],
  },

  // Product Management
  {
    id: 31,
    question: 'How do you approach defining a product roadmap?',
    category: 'product-management',
    keywords: ['roadmap', 'strategy', 'priority', 'goal', 'timeline', 'feature'],
  },
  {
    id: 32,
    question: 'Describe your process for conducting user research.',
    category: 'product-management',
    keywords: ['user', 'research', 'interview', 'survey', 'feedback', 'insight'],
  },
  {
    id: 33,
    question: 'How do you measure product success?',
    category: 'product-management',
    keywords: ['success', 'metrics', 'KPI', 'analytics', 'measurement', 'goal'],
  },
  {
    id: 34,
    question: 'Tell me about a product you improved.',
    category: 'product-management',
    keywords: ['improved', 'feature', 'user', 'experience', 'metric', 'result'],
  },
  {
    id: 35,
    question: 'How do you prioritize features?',
    category: 'product-management',
    keywords: ['prioritize', 'importance', 'impact', 'effort', 'value', 'stakeholder'],
  },

  // Design
  {
    id: 36,
    question: 'Describe your UX design process.',
    category: 'design',
    keywords: ['design', 'user', 'research', 'prototype', 'testing', 'iterate'],
  },
  {
    id: 37,
    question: 'What is your approach to creating accessible designs?',
    category: 'design',
    keywords: ['accessible', 'accessibility', 'inclusive', 'WCAG', 'contrast', 'usability'],
  },
  {
    id: 38,
    question: 'How do you balance aesthetics with functionality?',
    category: 'design',
    keywords: ['aesthetics', 'functionality', 'balance', 'user', 'experience', 'design'],
  },
  {
    id: 39,
    question: 'Tell me about your experience with design tools.',
    category: 'design',
    keywords: ['Figma', 'Adobe', 'Sketch', 'design', 'tool', 'experience'],
  },
  {
    id: 40,
    question: 'How do you handle design feedback?',
    category: 'design',
    keywords: ['feedback', 'critique', 'improve', 'iterate', 'collaborative', 'open'],
  },

  // Marketing
  {
    id: 41,
    question: 'Describe your experience with digital marketing campaigns.',
    category: 'marketing',
    keywords: ['campaign', 'marketing', 'digital', 'strategy', 'target', 'reach'],
  },
  {
    id: 42,
    question: 'How do you approach SEO optimization?',
    category: 'marketing',
    keywords: ['SEO', 'optimization', 'keyword', 'ranking', 'traffic', 'visibility'],
  },
  {
    id: 43,
    question: 'What metrics do you use to measure marketing success?',
    category: 'marketing',
    keywords: ['metrics', 'ROI', 'conversion', 'engagement', 'analytics', 'performance'],
  },
  {
    id: 44,
    question: 'Tell me about your social media marketing experience.',
    category: 'marketing',
    keywords: ['social media', 'engagement', 'content', 'audience', 'strategy', 'platform'],
  },
  {
    id: 45,
    question: 'How do you identify your target audience?',
    category: 'marketing',
    keywords: ['audience', 'target', 'demographic', 'research', 'segment', 'analysis'],
  },
];

export default function Interview() {
  const { data: session } = useSession();
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [sessionConfig, setSessionConfig] = useState<InterviewSession>({
    type: 'technical',
    difficulty: 'medium',
    category: 'general',
  });
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [sessionResult, setSessionResult] = useState<SessionResult | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [pastSessions, setPastSessions] = useState<PracticeSession[]>([]);
  const [isLoadingPastSessions, setIsLoadingPastSessions] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      fetchPastSessions();
    }
  }, [session]);

  const fetchPastSessions = async () => {
    setIsLoadingPastSessions(true);
    try {
      const response = await fetch('/api/interview');
      if (response.ok) {
        const data = await response.json();
        setPastSessions(data.sessions || []);
      }
    } catch (error) {
      console.error('Failed to fetch past sessions:', error);
    }
    setIsLoadingPastSessions(false);
  };

  const getQuestionsForSession = () => {
    const filtered = questionDatabase.filter((q) => {
      const categoryMatch = q.category === sessionConfig.category;
      return categoryMatch;
    });

    // Shuffle and return 5 questions
    const shuffled = filtered.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  };

  const calculateScore = (answer: string, keywords: string[]): number => {
    if (!answer.trim()) return 0;

    let score = 0;
    const answerLower = answer.toLowerCase();

    // Base score for providing an answer
    score += 20;

    // Score for length (more detailed answers score higher)
    const wordCount = answer.trim().split(/\s+/).length;
    if (wordCount >= 50) score += 30;
    else if (wordCount >= 30) score += 20;
    else if (wordCount >= 10) score += 10;

    // Score for keyword matches
    let keywordMatches = 0;
    keywords.forEach((keyword) => {
      if (answerLower.includes(keyword.toLowerCase())) {
        keywordMatches++;
      }
    });
    score += Math.min(keywordMatches * 10, 30);

    // Score for coherence (checking for common professional terms)
    const professionalTerms = [
      'experience',
      'project',
      'team',
      'develop',
      'problem',
      'solution',
      'improve',
      'learn',
    ];
    let termMatches = 0;
    professionalTerms.forEach((term) => {
      if (answerLower.includes(term)) termMatches++;
    });
    score += Math.min(termMatches * 3, 20);

    return Math.min(score, 100);
  };

  const handleStartSession = () => {
    const questions = getQuestionsForSession();
    setSelectedQuestions(questions);
    setSessionStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setUserAnswer('');
    setSessionResult(null);
    setStartTime(Date.now());
  };

  const handleNextQuestion = async () => {
    const newAnswers = [...answers, userAnswer];
    setAnswers(newAnswers);
    setUserAnswer('');

    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Interview complete - calculate scores
      const questionAnswers = selectedQuestions.map((q, index) => {
        const score = calculateScore(newAnswers[index], q.keywords);
        return {
          questionId: q.id,
          question: q.question,
          category: q.category,
          userAnswer: newAnswers[index],
          score,
        };
      });

      const totalScore = questionAnswers.reduce((sum, qa) => sum + qa.score, 0);
      const maxScore = selectedQuestions.length * 100;
      const percentage = Math.round((totalScore / maxScore) * 100);

      const result: SessionResult = {
        score: totalScore,
        maxScore,
        percentage,
        answers: questionAnswers,
      };

      setSessionResult(result);

      // Save to database
      if (session?.user?.email) {
        try {
          const duration = Math.round((Date.now() - startTime) / 1000);
          await fetch('/api/interview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              interviewType: sessionConfig.type,
              difficulty: sessionConfig.difficulty,
              category: sessionConfig.category,
              answers: questionAnswers,
              totalScore,
              maxScore,
              percentageScore: percentage,
              duration,
            }),
          });
          // Refresh past sessions
          fetchPastSessions();
        } catch (error) {
          console.error('Failed to save session:', error);
        }
      }

      setSessionStarted(false);
    }
  };

  const handleConfigChange = (field: keyof InterviewSession, value: string) => {
    setSessionConfig({
      ...sessionConfig,
      [field]: value,
    });
  };

  if (sessionResult) {
    return (
      <main className="main-content">
        <section className="section">
          <div className="container">
            <h1 className="text-center mb-4">Interview Session Complete!</h1>

            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <h3 style={{ margin: 0 }}>Your Score</h3>
                  </div>
                  <div className="card-body">
                    <div
                      style={{
                        textAlign: 'center',
                        padding: '2rem',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: '12px',
                        marginBottom: '2rem',
                      }}
                    >
                      <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#10b981' }}>
                        {sessionResult.percentage}%
                      </div>
                      <div style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        {sessionResult.score} / {sessionResult.maxScore} points
                      </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                      <h4 style={{ marginBottom: '1rem' }}>Performance Rating</h4>
                      <div
                        style={{
                          padding: '1rem',
                          backgroundColor:
                            sessionResult.percentage >= 80
                              ? 'rgba(16, 185, 129, 0.1)'
                              : sessionResult.percentage >= 60
                                ? 'rgba(245, 158, 11, 0.1)'
                                : 'rgba(239, 68, 68, 0.1)',
                          borderRadius: '8px',
                          textAlign: 'center',
                        }}
                      >
                        <strong
                          style={{
                            color:
                              sessionResult.percentage >= 80
                                ? '#10b981'
                                : sessionResult.percentage >= 60
                                  ? '#f59e0b'
                                  : '#ef4444',
                            fontSize: '1.1rem',
                          }}
                        >
                          {sessionResult.percentage >= 80
                            ? 'Excellent! 🎉'
                            : sessionResult.percentage >= 60
                              ? 'Good Job! 👍'
                              : 'Keep Practicing! 💪'}
                        </strong>
                      </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                      <h4 style={{ marginBottom: '1rem' }}>Question Breakdown</h4>
                      {sessionResult.answers.map((answer, index) => (
                        <div
                          key={index}
                          style={{
                            marginBottom: '1rem',
                            padding: '1rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '8px',
                            borderLeft: `4px solid ${answer.score >= 70 ? '#10b981' : '#f59e0b'}`,
                          }}
                        >
                          <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Question {index + 1}: {answer.question}</strong>
                          </div>
                          <div style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                            <strong>Your Answer:</strong> {answer.userAnswer.substring(0, 100)}
                            {answer.userAnswer.length > 100 ? '...' : ''}
                          </div>
                          <div>
                            <strong>Score: </strong>
                            <span
                              style={{
                                color: answer.score >= 70 ? '#10b981' : '#f59e0b',
                                fontWeight: 'bold',
                              }}
                            >
                              {answer.score} / 100
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="d-flex justify-content-between" style={{ gap: '1rem' }}>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => {
                          setSessionResult(null);
                        }}
                      >
                        Take Another Interview
                      </button>
                      <Link href="/dashboard" className="btn btn-primary">
                        Go to Dashboard
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!sessionStarted) {
    return (
      <main>
          <section className="section">
            <div className="container">
              <h1 className="text-center mb-4">Interview Practice</h1>
              
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header">
                      <h3 style={{ margin: 0 }}>Configure Your Interview Session</h3>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="type" className="form-label">
                          <span style={{ marginRight: '0.5rem' }}>🎯</span>
                          Interview Type
                        </label>
                        <select
                          id="type"
                          className="form-control"
                          value={sessionConfig.type}
                          onChange={(e) => handleConfigChange('type', e.target.value)}
                        >
                          <option value="technical">Technical</option>
                          <option value="behavioral">Behavioral</option>
                          <option value="mixed">Mixed</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="difficulty" className="form-label">
                          <span style={{ marginRight: '0.5rem' }}>📊</span>
                          Difficulty Level
                        </label>
                        <select
                          id="difficulty"
                          className="form-control"
                          value={sessionConfig.difficulty}
                          onChange={(e) => handleConfigChange('difficulty', e.target.value)}
                        >
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="hard">Hard</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="category" className="form-label">
                          <span style={{ marginRight: '0.5rem' }}>💼</span>
                          Job Category
                        </label>
                        <select
                          id="category"
                          className="form-control"
                          value={sessionConfig.category}
                          onChange={(e) => handleConfigChange('category', e.target.value)}
                        >
                          <option value="general">General</option>
                          <option value="software-engineering">Software Engineering</option>
                          <option value="data-science">Data Science</option>
                          <option value="product-management">Product Management</option>
                          <option value="design">Design</option>
                          <option value="marketing">Marketing</option>
                        </select>
                      </div>

                      <button
                        className="btn btn-primary btn-lg"
                        style={{ width: '100%', marginTop: '1rem' }}
                        onClick={handleStartSession}
                      >
                        🚀 Start Interview Session
                      </button>
                    </div>
                  </div>

                  {/* Tips Card */}
                  <div className="card mt-4">
                    <div className="card-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.25rem' }}>💡</span>
                        <h4 style={{ margin: 0 }}>Interview Tips</h4>
                      </div>
                    </div>
                    <div className="card-body">
                      <ul style={{ marginBottom: 0, listStyle: 'none', padding: 0 }}>
                        {[
                          'Take your time to think before answering',
                          'Use the STAR method for behavioral questions (Situation, Task, Action, Result)',
                          'Be specific and provide concrete examples',
                          'Practice speaking clearly and confidently',
                          'Review your answers and learn from feedback'
                        ].map((tip, index) => (
                          <li key={index} style={{ 
                            padding: '0.75rem 0', 
                            borderBottom: index < 4 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.75rem'
                          }}>
                            <span style={{ color: 'var(--glow-color)', fontSize: '1rem' }}>✓</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Recent Practice Sessions */}
                  <div className="card mt-4">
                    <div className="card-header">
                      <h4 style={{ margin: 0 }}>Recent Practice Sessions</h4>
                    </div>
                    <div className="card-body">
                      {isLoadingPastSessions ? (
                        <div style={{ padding: '1rem' }}>
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="loading-skeleton" style={{ width: '100%', height: '100px', marginBottom: '0.5rem', borderRadius: '8px' }}></div>
                          ))}
                        </div>
                      ) : pastSessions.length > 0 ? (
                        pastSessions.slice(0, 5).map((session) => (
                          <div
                            key={session._id}
                            style={{
                              padding: '1rem',
                              backgroundColor: 'rgba(255, 255, 255, 0.05)',
                              borderRadius: '0.25rem',
                              marginBottom: '0.5rem',
                              borderLeft: `4px solid ${
                                session.percentageScore >= 80
                                  ? '#10b981'
                                  : session.percentageScore >= 60
                                    ? '#f59e0b'
                                    : '#ef4444'
                              }`,
                            }}
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <strong>
                                  {session.interviewType.charAt(0).toUpperCase() +
                                    session.interviewType.slice(1)}{' '}
                                  Interview - {session.difficulty.charAt(0).toUpperCase() + session.difficulty.slice(1)}
                                </strong>
                                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: 'var(--secondary-color)' }}>
                                  {session.category} · Score: {session.percentageScore}%
                                </p>
                                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: 'var(--secondary-color)' }}>
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
                                }}
                              >
                                {session.percentageScore}%
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                          No practice sessions yet. Start your first interview!
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

  const currentQuestion = selectedQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;

  return (
    <main className="main-content">
        <section className="section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8">
                {/* Progress Bar */}
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Interview Progress</h4>
                        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                          Question {currentQuestionIndex + 1} of {selectedQuestions.length}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--glow-color)' }}>
                          {Math.round(progress)}%
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Complete</div>
                      </div>
                    </div>
                    <div style={{ 
                      width: '100%', 
                      height: '12px', 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                      borderRadius: '10px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: 'var(--primary-gradient)',
                        transition: 'width 0.5s ease',
                        borderRadius: '10px',
                        boxShadow: '0 0 10px rgba(102, 126, 234, 0.5)'
                      }}></div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'center' }}>
                      {selectedQuestions.map((_, index) => (
                        <div
                          key={index}
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: index <= currentQuestionIndex ? 'var(--glow-color)' : 'rgba(255, 255, 255, 0.2)',
                            transition: 'all 0.3s ease'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Question Card */}
                <div className="card question-card">
                  <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ fontSize: '1.5rem' }}>❓</div>
                        <h3 style={{ margin: 0 }}>Interview Question</h3>
                      </div>
                      <span
                        className="category-badge"
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          background: 'rgba(102, 126, 234, 0.2)',
                          color: 'var(--glow-color)',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          textTransform: 'capitalize',
                          border: '1px solid rgba(102, 126, 234, 0.3)'
                        }}
                      >
                        {currentQuestion.category.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    <div style={{ 
                      background: 'rgba(102, 126, 234, 0.1)', 
                      padding: '1.5rem', 
                      borderRadius: '12px', 
                      marginBottom: '2rem',
                      border: '1px solid rgba(102, 126, 234, 0.2)'
                    }}>
                      <h4 style={{ margin: 0, color: 'white', fontSize: '1.25rem', lineHeight: '1.6' }}>
                        {currentQuestion.question}
                      </h4>
                    </div>

                    <div className="form-group">
                      <label htmlFor="answer" className="form-label">
                        Your Answer
                        <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', fontWeight: 'normal', color: 'var(--text-secondary)' }}>
                          ({userAnswer.trim().split(/\s+/).length} words)
                        </span>
                      </label>
                      <textarea
                        id="answer"
                        className="form-control"
                        rows={10}
                        placeholder="Type your answer here... Be specific and provide examples. Aim for at least 50 words for better scoring."
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        style={{ minHeight: '200px' }}
                      ></textarea>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
                        <span style={{ fontSize: '1rem' }}>💡</span>
                        <small style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                          Tip: Use the STAR method (Situation, Task, Action, Result) for behavioral questions. Provide concrete examples.
                        </small>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between mt-4" style={{ gap: '1rem' }}>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setSessionStarted(false)}
                        style={{ flex: 1 }}
                      >
                        ⏸ End Session
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={handleNextQuestion}
                        disabled={!userAnswer.trim()}
                        style={{ flex: 2 }}
                      >
                        {currentQuestionIndex < selectedQuestions.length - 1 ? (
                          <>Next Question →</>
                        ) : (
                          <>✓ Finish Interview</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
  );
}

