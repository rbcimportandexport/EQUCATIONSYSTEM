import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Award, Shield, User, Clock, FileText } from 'lucide-react';

export const Profile: React.FC = () => {
  const { courses, progress, getCourseCompletionPercentage } = useApp();
  const [showCertificate, setShowCertificate] = useState(false);
  const [certCourseTitle, setCertCourseTitle] = useState('');

  const completedLessons = Object.values(progress).filter(p => p.completed).length;
  const quizzesAttempted = Object.values(progress).filter(p => Object.keys(p.quizScores).length > 0).length;

  // Find if any course is 100% completed to trigger certificate
  const completedCourses = courses.filter(c => getCourseCompletionPercentage(c.id) === 100);

  const handleOpenCertificate = (courseTitle: string) => {
    setCertCourseTitle(courseTitle);
    setShowCertificate(true);
  };

  const getLocalDateString = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="profile-view">
      {/* Profile Bio Card */}
      <div className="card profile-bio-card">
        <div className="profile-avatar-large">JD</div>
        <div className="profile-bio-details">
          <h2>Jane Doe</h2>
          <p className="profile-email">jane.doe@edu.org</p>
          <div className="profile-badges-row">
            <span className="profile-badge-item student">
              <User size={12} />
              <span>Student ID: 489201</span>
            </span>
            <span className="profile-badge-item org">
              <Shield size={12} />
              <span>Engineering Faculty</span>
            </span>
          </div>
        </div>
      </div>

      {/* Aggregate Stats Cards */}
      <h3 className="section-title-sub">Academic Statistics</h3>
      <div className="grid-3 stats-grid-profile">
        <div className="card stat-card-mini">
          <div className="stat-header">
            <FileText size={18} className="stat-icon text" />
            <span className="stat-label">Syllabus Completed</span>
          </div>
          <span className="stat-value-bold">{completedLessons} lessons</span>
        </div>

        <div className="card stat-card-mini">
          <div className="stat-header">
            <Award size={18} className="stat-icon quiz" />
            <span className="stat-label">Assessments Taken</span>
          </div>
          <span className="stat-value-bold">{quizzesAttempted} quizzes</span>
        </div>

        <div className="card stat-card-mini">
          <div className="stat-header">
            <Clock size={18} className="stat-icon time" />
            <span className="stat-label">Simulated Study Hours</span>
          </div>
          <span className="stat-value-bold">{(completedLessons * 0.3).toFixed(1)} hours</span>
        </div>
      </div>

      {/* Credentials Drawer */}
      <h3 className="section-title-sub">Earned Credentials & Certificates</h3>
      <div className="credentials-section">
        {completedCourses.length === 0 ? (
          <div className="card empty-credentials-card">
            <Award size={32} className="empty-icon" />
            <p>No certificates earned yet. Achieve 100% completion in any course to unlock your credentials!</p>
          </div>
        ) : (
          <div className="certificates-stack">
            {completedCourses.map(course => (
              <div key={course.id} className="card certificate-item-card">
                <div className="cert-left">
                  <Award size={24} className="cert-icon-badge" />
                  <div className="cert-info">
                    <h4>Certificate of Excellence</h4>
                    <p>Course: {course.title}</p>
                    <span className="cert-date">Issued: {getLocalDateString()}</span>
                  </div>
                </div>

                <button 
                  className="btn btn-primary"
                  onClick={() => handleOpenCertificate(course.title)}
                >
                  View Certificate
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="certificate-modal">
          <div className="cert-modal-backdrop" onClick={() => setShowCertificate(false)} />
          <div className="card cert-modal-sheet">
            <div className="cert-border-outer">
              <div className="cert-border-inner">
                <span className="cert-seal">EDUCATEPRO</span>
                <h1 className="cert-main-title">CERTIFICATE OF COMPLETION</h1>
                <p className="cert-subtitle-text">THIS IS PROUDLY PRESENTED TO</p>
                
                <h2 className="cert-recipient-name">Jane Doe</h2>
                <div className="cert-divider-line"></div>
                
                <p className="cert-description-text">
                  for successfully completing all syllabus modules, practice quizzes, video lectures, and final assessments in the course
                </p>
                
                <h3 className="cert-course-name">{certCourseTitle}</h3>
                
                <div className="cert-signatures-row">
                  <div className="signature-box">
                    <span className="sig-line">Dr. Alistair Vance</span>
                    <span className="sig-title">Dean of Software Engineering</span>
                  </div>
                  <div className="signature-box">
                    <span className="sig-line">{getLocalDateString()}</span>
                    <span className="sig-title">Date of Issuance</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="cert-modal-footer">
              <button 
                className="btn btn-outlined"
                onClick={() => window.print()}
              >
                Print Certificate
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => setShowCertificate(false)}
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
