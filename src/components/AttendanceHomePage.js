import React, { useState } from 'react';
import { 
  Clock, 
  Users, 
  Calendar, 
  BarChart3, 
  Shield, 
  Bell, 
  CheckCircle, 
  TrendingUp,
  UserCheck,
  Timer,
  Award,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AttendanceHomePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const featureCards = [
    {
      icon: <Clock style={{width: '32px', height: '32px'}} />,
      title: "Clock In/Out",
      description: "Quick and easy time tracking with one-click attendance marking",
      gradient: "linear-gradient(135deg, #3b82f6, #06b6d4)",
      stats: "2.5k daily check-ins"
    },
    {
      icon: <Users style={{width: '32px', height: '32px'}} />,
      title: "Employee Management",
      description: "Comprehensive employee profiles and attendance history tracking",
      gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
      stats: "500+ employees"
    },
    {
      icon: <Calendar style={{width: '32px', height: '32px'}} />,
      title: "Schedule Management",
      description: "Create and manage work schedules, shifts, and time-off requests",
      gradient: "linear-gradient(135deg, #10b981, #059669)",
      stats: "98% schedule accuracy"
    },
    {
      icon: <BarChart3 style={{width: '32px', height: '32px'}} />,
      title: "Analytics & Reports",
      description: "Detailed insights into attendance patterns and productivity metrics",
      gradient: "linear-gradient(135deg, #f97316, #ef4444)",
      stats: "Real-time insights"
    },
    {
      icon: <Shield style={{width: '32px', height: '32px'}} />,
      title: "Security & Compliance",
      description: "Advanced security features with role-based access control",
      gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      stats: "100% secure"
    },
    {
      icon: <Bell style={{width: '32px', height: '32px'}} />,
      title: "Notifications",
      description: "Smart alerts for late arrivals, early departures, and absences",
      gradient: "linear-gradient(135deg, #eab308, #f97316)",
      stats: "Instant alerts"
    }
  ];

  const quickStats = [
    {
      icon: <UserCheck style={{width: '24px', height: '24px'}} />,
      label: "Present Today",
      value: "432",
      change: "+12%",
      positive: true
    },
    {
      icon: <Timer style={{width: '24px', height: '24px'}} />,
      label: "Avg. Hours",
      value: "8.2",
      change: "+0.3",
      positive: true
    },
    {
      icon: <Award style={{width: '24px', height: '24px'}} />,
      label: "Perfect Attendance",
      value: "89",
      change: "+5",
      positive: true
    },
    {
      icon: <TrendingUp style={{width: '24px', height: '24px'}} />,
      label: "Productivity",
      value: "94%",
      change: "+2%",
      positive: true
    }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #1e293b 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    header: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    },
    headerContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '16px',
      paddingBottom: '16px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    logoIcon: {
      width: '40px',
      height: '40px',
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    logoText: {
      color: 'white',
      fontSize: '20px',
      fontWeight: 'bold',
      margin: 0
    },
    logoSubtext: {
      color: '#d1d5db',
      fontSize: '14px',
      margin: 0
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    timeDisplay: {
      textAlign: 'right'
    },
    timeLabel: {
      color: '#d1d5db',
      fontSize: '14px',
      margin: 0
    },
    timeValue: {
      color: 'white',
      fontSize: '18px',
      fontWeight: '600',
      margin: 0
    },
    settingsBtn: {
      padding: '8px',
      background: 'rgba(255, 255, 255, 0.1)',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: 'white'
    },
    hero: {
      padding: '80px 0',
      position: 'relative'
    },
    heroContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 24px',
      textAlign: 'center'
    },
    heroCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(12px)',
      borderRadius: '24px',
      padding: '48px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    heroTitle: {
      fontSize: '48px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '24px',
      lineHeight: '1.2'
    },
    heroGradientText: {
      background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    heroDescription: {
      fontSize: '20px',
      color: '#d1d5db',
      marginBottom: '32px',
      maxWidth: '768px',
      margin: '0 auto 32px'
    },
    heroButtons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '16px',
      flexWrap: 'wrap'
    },
    primaryBtn: {
      padding: '16px 32px',
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      color: 'white',
      fontWeight: '600',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)'
    },
    secondaryBtn: {
      padding: '16px 32px',
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      fontWeight: '600',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    section: {
      padding: '48px 0'
    },
    sectionContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 24px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px'
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(12px)',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease'
    },
    statHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    statIcon: {
      padding: '8px',
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
      borderRadius: '8px',
      color: 'white'
    },
    statChange: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#10b981'
    },
    statValue: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'white',
      margin: '0 0 4px 0'
    },
    statLabel: {
      color: '#d1d5db',
      fontSize: '14px',
      margin: 0
    },
    sectionTitle: {
      textAlign: 'center',
      marginBottom: '48px'
    },
    sectionHeading: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '16px'
    },
    sectionSubtext: {
      color: '#d1d5db',
      fontSize: '18px'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '32px'
    },
    featureCard: {
      position: 'relative',
      transition: 'all 0.3s ease'
    },
    featureCardGlow: {
      position: 'absolute',
      inset: 0,
      borderRadius: '16px',
      filter: 'blur(20px)',
      opacity: 0.2,
      transition: 'opacity 0.3s ease'
    },
    featureCardContent: {
      position: 'relative',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(12px)',
      borderRadius: '16px',
      padding: '32px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease',
      height: '100%'
    },
    featureIcon: {
      display: 'inline-flex',
      padding: '12px',
      borderRadius: '12px',
      marginBottom: '24px',
      color: 'white'
    },
    featureTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: 'white',
      marginBottom: '12px'
    },
    featureDescription: {
      color: '#d1d5db',
      marginBottom: '16px',
      lineHeight: '1.6'
    },
    featureFooter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    featureStats: {
      fontSize: '14px',
      color: '#9ca3af'
    },
    featureLink: {
      color: '#60a5fa',
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'color 0.3s ease'
    },
    quickActionsContainer: {
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
      backdropFilter: 'blur(12px)',
      borderRadius: '24px',
      padding: '48px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    quickActionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '24px'
    },
    quickActionBtn: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      padding: '24px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      color: 'white'
    },
    activityGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '32px'
    },
    activityCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(12px)',
      borderRadius: '16px',
      padding: '32px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    activityTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: 'white',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    checkInItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '8px',
      marginBottom: '16px'
    },
    checkInName: {
      color: 'white',
      fontWeight: '500',
      margin: 0
    },
    checkInTime: {
      color: '#d1d5db',
      fontSize: '14px',
      margin: 0
    },
    statusBadge: {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '500'
    },
    statusOnTime: {
      background: 'rgba(16, 185, 129, 0.2)',
      color: '#10b981'
    },
    statusLate: {
      background: 'rgba(239, 68, 68, 0.2)',
      color: '#ef4444'
    },
    statusEarly: {
      background: 'rgba(59, 130, 246, 0.2)',
      color: '#3b82f6'
    },
    overviewItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    overviewLabel: {
      color: '#d1d5db'
    },
    overviewValue: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'white'
    },
    overviewValueGreen: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#10b981'
    },
    overviewValueRed: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#ef4444'
    },
    overviewValueYellow: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#eab308'
    },
    progressContainer: {
      marginTop: '24px'
    },
    progressHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px',
      color: '#d1d5db',
      marginBottom: '8px'
    },
    progressBar: {
      width: '100%',
      height: '12px',
      background: '#374151',
      borderRadius: '6px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(135deg, #10b981, #059669)',
      width: '94.7%',
      borderRadius: '6px'
    },
    footer: {
      padding: '48px 0',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    },
    footerContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 24px',
      textAlign: 'center'
    },
    footerLogo: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '16px'
    },
    footerLogoIcon: {
      width: '32px',
      height: '32px',
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    footerText: {
      color: '#9ca3af',
      marginBottom: '16px'
    },
    footerLinks: {
      display: 'flex',
      justifyContent: 'center',
      gap: '24px',
      flexWrap: 'wrap'
    },
    footerLink: {
      color: '#9ca3af',
      textDecoration: 'none',
      fontSize: '14px',
      transition: 'color 0.3s ease'
    }
  };
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>
              <Clock style={{width: '24px', height: '24px', color: 'white'}} />
            </div>
            <div>
              <h1 style={styles.logoText}>AttendanceHub</h1>
              <p style={styles.logoSubtext}>Employee Management System</p>
            </div>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.timeDisplay}>
              <p style={styles.timeLabel}>Current Time</p>
              <p style={styles.timeValue}>
                {currentTime.toLocaleTimeString()}
              </p>
            </div>
            <button 
              style={styles.settingsBtn}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
            >
              <Settings style={{width: '20px', height: '20px'}} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroCard}>
            <h2 style={styles.heroTitle}>
              Welcome to <span style={styles.heroGradientText}>AttendanceHub</span>
            </h2>
            <p style={styles.heroDescription}>
              Streamline your workforce management with our cutting-edge attendance tracking system. 
              Monitor, analyze, and optimize employee productivity with ease.
            </p>
            <div style={styles.heroButtons}>
              <button 
                style={styles.primaryBtn}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.background = 'linear-gradient(135deg, #2563eb, #7c3aed)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.background = 'linear-gradient(135deg, #3b82f6, #8b5cf6)';
                }}
              >
                Clock In Now
              </button>
              <button 
                style={styles.secondaryBtn}
                onClick={()=>navigate('/dashboard')}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
              >
                View Dashboard
              </button>
              <button 
                style={styles.secondaryBtn}
                onClick={()=>navigate('/login')}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
              >
                Login
              </button>
              <button 
                style={styles.secondaryBtn}
                onClick={()=>navigate('/register')}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section style={styles.section}>
        <div style={styles.sectionContent}>
          <div style={styles.statsGrid}>
            {quickStats.map((stat, index) => (
              <div 
                key={index} 
                style={styles.statCard}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.15)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
              >
                <div style={styles.statHeader}>
                  <div style={styles.statIcon}>
                    {stat.icon}
                  </div>
                  <span style={styles.statChange}>
                    {stat.change}
                  </span>
                </div>
                <h3 style={styles.statValue}>{stat.value}</h3>
                <p style={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={styles.section}>
        <div style={styles.sectionContent}>
          <div style={styles.sectionTitle}>
            <h3 style={styles.sectionHeading}>Powerful Features</h3>
            <p style={styles.sectionSubtext}>Everything you need to manage attendance efficiently</p>
          </div>
          
          <div style={styles.featuresGrid}>
            {featureCards.map((card, index) => (
              <div 
                key={index} 
                style={styles.featureCard}
                onMouseEnter={(e) => {
                  const glow = e.currentTarget.querySelector('.feature-glow');
                  const content = e.currentTarget.querySelector('.feature-content');
                  if (glow) glow.style.opacity = '0.4';
                  if (content) content.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  const glow = e.currentTarget.querySelector('.feature-glow');
                  const content = e.currentTarget.querySelector('.feature-content');
                  if (glow) glow.style.opacity = '0.2';
                  if (content) content.style.transform = 'scale(1)';
                }}
              >
                <div 
                  className="feature-glow"
                  style={{
                    ...styles.featureCardGlow,
                    background: card.gradient
                  }}
                ></div>
                <div className="feature-content" style={styles.featureCardContent}>
                  <div style={{...styles.featureIcon, background: card.gradient}}>
                    {card.icon}
                  </div>
                  <h4 style={styles.featureTitle}>{card.title}</h4>
                  <p style={styles.featureDescription}>{card.description}</p>
                  <div style={styles.featureFooter}>
                    <span style={styles.featureStats}>{card.stats}</span>
                    <a 
                      href="#" 
                      style={styles.featureLink}
                      onMouseEnter={(e) => e.target.style.color = '#93c5fd'}
                      onMouseLeave={(e) => e.target.style.color = '#60a5fa'}
                    >
                      Learn More →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section style={styles.section}>
        <div style={styles.sectionContent}>
          <div style={styles.quickActionsContainer}>
            <div style={styles.sectionTitle}>
              <h3 style={styles.sectionHeading}>Quick Actions</h3>
              <p style={styles.sectionSubtext}>Access frequently used features instantly</p>
            </div>
            
            <div style={styles.quickActionsGrid}>
              {[
                { icon: <CheckCircle style={{width: '32px', height: '32px', color: '#10b981'}} />, title: "Mark Attendance", desc: "Quick check-in/out" },
                { icon: <Calendar style={{width: '32px', height: '32px', color: '#3b82f6'}} />, title: "View Schedule", desc: "Check your shifts" },
                { icon: <BarChart3 style={{width: '32px', height: '32px', color: '#8b5cf6'}} />, title: "View Reports", desc: "Attendance analytics" },
                { icon: <Bell style={{width: '32px', height: '32px', color: '#eab308'}} />, title: "Notifications", desc: "View alerts" }
              ].map((action, index) => (
                <button 
                  key={index}
                  style={styles.quickActionBtn}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  <div style={{marginBottom: '12px', display: 'flex', justifyContent: 'center'}}>
                    {action.icon}
                  </div>
                  <h4 style={{fontWeight: '600', marginBottom: '8px', fontSize: '16px'}}>{action.title}</h4>
                  <p style={{fontSize: '14px', color: '#d1d5db', margin: 0}}>{action.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section style={styles.section}>
        <div style={styles.sectionContent}>
          <div style={styles.activityGrid}>
            {/* Recent Check-ins */}
            <div style={styles.activityCard}>
              <h3 style={styles.activityTitle}>
                <Clock style={{width: '20px', height: '20px', color: '#60a5fa'}} />
                Recent Check-ins
              </h3>
              <div>
                {[
                  { name: "Sarah Johnson", time: "09:15 AM", status: "on-time" },
                  { name: "Mike Chen", time: "09:22 AM", status: "late" },
                  { name: "Emily Davis", time: "08:45 AM", status: "early" },
                  { name: "James Wilson", time: "09:00 AM", status: "on-time" }
                ].map((entry, index) => (
                  <div key={index} style={styles.checkInItem}>
                    <div>
                      <p style={styles.checkInName}>{entry.name}</p>
                      <p style={styles.checkInTime}>{entry.time}</p>
                    </div>
                    <span style={{
                      ...styles.statusBadge,
                      ...(entry.status === 'on-time' ? styles.statusOnTime :
                          entry.status === 'late' ? styles.statusLate : styles.statusEarly)
                    }}>
                      {entry.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Attendance Overview */}
            <div style={styles.activityCard}>
              <h3 style={styles.activityTitle}>
                <TrendingUp style={{width: '20px', height: '20px', color: '#10b981'}} />
                Today's Overview
              </h3>
              <div>
                <div style={styles.overviewItem}>
                  <span style={styles.overviewLabel}>Total Employees</span>
                  <span style={styles.overviewValue}>456</span>
                </div>
                <div style={styles.overviewItem}>
                  <span style={styles.overviewLabel}>Present</span>
                  <span style={styles.overviewValueGreen}>432</span>
                </div>
                <div style={styles.overviewItem}>
                  <span style={styles.overviewLabel}>Absent</span>
                  <span style={styles.overviewValueRed}>24</span>
                </div>
                <div style={styles.overviewItem}>
                  <span style={styles.overviewLabel}>Late Arrivals</span>
                  <span style={styles.overviewValueYellow}>12</span>
                </div>
                
                <div style={styles.progressContainer}>
                  <div style={styles.progressHeader}>
                    <span>Attendance Rate</span>
                    <span>94.7%</span>
                  </div>
                  <div style={styles.progressBar}>
                    <div style={styles.progressFill}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLogo}>
            <div style={styles.footerLogoIcon}>
              <Clock style={{width: '20px', height: '20px', color: 'white'}} />
            </div>
            <span style={{fontSize: '18px', fontWeight: '600', color: 'white'}}>AttendanceHub</span>
          </div>
          <p style={styles.footerText}>Streamlining workforce management for modern businesses</p>
          <div style={styles.footerLinks}>
            <a 
              href="#" 
              style={styles.footerLink}
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              style={styles.footerLink}
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              style={styles.footerLink}
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
            >
              Support
            </a>
            <a 
              href="#" 
              style={styles.footerLink}
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AttendanceHomePage;