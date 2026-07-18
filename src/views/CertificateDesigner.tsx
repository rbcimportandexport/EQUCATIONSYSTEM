import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import html2canvas from 'html2canvas';
import { Download, Printer, Edit3, RotateCcw, FileText, Award } from 'lucide-react';

interface CertificateData {
  studentName: string;
  issueDate: string;
  duration: string;
  level: string;
  score: string;
  courseName: string;
  certificateId: string;
  academyName: string;
  tagline: string;
  contactInfo: string;
  directorSig: string;
  directorName: string;
  directorRole: string;
  founderSig: string;
  founderName: string;
  founderRole: string;
  verifyUrl: string;
  description: string;
  studentPhone: string;
  studentEmail: string;
  studentCountry: string;
  marks: string;
  completion: string;
}

const defaultData: CertificateData = {
  studentName: 'RBC',
  issueDate: '18 July 2026',
  duration: '10+ Hours',
  level: 'Beginner to Advanced',
  score: '95% - 100%',
  courseName: 'IMPORT & EXPORT MASTER COURSE',
  certificateId: 'RBC-2026-000215',
  academyName: 'RBC IMPORT & EXPORT ACADEMY',
  tagline: 'Learn • Trade • Grow Globally',
  contactInfo: 'India · rbcimportexport@rbc.com · +91 98765 43210',
  directorSig: 'Kunal Pawar',
  directorName: 'KUNAL PAWAR',
  directorRole: 'Academy Director',
  founderSig: 'Prakash Kachchhi',
  founderName: 'PRAKASH KACHCHHI',
  founderRole: 'Founder & CEO',
  verifyUrl: 'Scan QR code or visit academy.rbcimportandexport.com/verify',
  description: 'for successfully completing all learning modules, practice quizzes, video lectures, assignments, and final assessment in the course',
  studentPhone: '+91 98765 43210',
  studentEmail: 'student@rbcacademy.com',
  studentCountry: 'India',
  marks: '95% - 100%',
  completion: '100%'
};

// Inline SVG icons
const MedalIcon = () => (
  <svg viewBox="0 0 64 64" width="56" height="56">
    <circle cx="32" cy="32" r="28" fill="#102A56" stroke="#D4AF37" strokeWidth="2"/>
    <path d="M32 12 L36 24 L48 24 L38 32 L42 44 L32 36 L22 44 L26 32 L16 24 L28 24 Z" fill="#D4AF37"/>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 32 32" width="28" height="28">
    <circle cx="16" cy="16" r="14" stroke="#D4AF37" fill="none" strokeWidth="1.5"/>
    <path d="M16 8 L16 16 L22 20" stroke="#D4AF37" fill="none" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const BarChartIcon = () => (
  <svg viewBox="0 0 32 32" width="28" height="28">
    <rect x="4" y="14" width="6" height="14" rx="1" stroke="#D4AF37" fill="none" strokeWidth="1.5"/>
    <rect x="13" y="8" width="6" height="20" rx="1" stroke="#D4AF37" fill="none" strokeWidth="1.5"/>
    <rect x="22" y="4" width="6" height="24" rx="1" stroke="#D4AF37" fill="none" strokeWidth="1.5"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg viewBox="0 0 32 32" width="28" height="28">
    <circle cx="16" cy="16" r="14" stroke="#D4AF37" fill="none" strokeWidth="1.5"/>
    <path d="M10 16 L14 20 L22 12" stroke="#D4AF37" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 32 32" width="28" height="28">
    <path d="M16 4 L20 12 L28 14 L22 20 L24 28 L16 24 L8 28 L10 20 L4 14 L12 12 Z" stroke="#D4AF37" fill="none" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const QRIcon = () => (
  <svg viewBox="0 0 56 56" width="56" height="56">
    <rect x="2" y="2" width="52" height="52" fill="white" stroke="#102A56" strokeWidth="1"/>
    <rect x="4" y="4" width="20" height="20" fill="#102A56"/>
    <rect x="6" y="6" width="4" height="4" fill="white"/>
    <rect x="14" y="6" width="4" height="4" fill="white"/>
    <rect x="6" y="14" width="4" height="4" fill="white"/>
    <rect x="14" y="14" width="4" height="4" fill="white"/>
    <rect x="32" y="4" width="20" height="20" fill="#102A56"/>
    <rect x="34" y="6" width="4" height="4" fill="white"/>
    <rect x="42" y="6" width="4" height="4" fill="white"/>
    <rect x="34" y="14" width="4" height="4" fill="white"/>
    <rect x="42" y="14" width="4" height="4" fill="white"/>
    <rect x="4" y="32" width="20" height="20" fill="#102A56"/>
    <rect x="6" y="34" width="4" height="4" fill="white"/>
    <rect x="14" y="34" width="4" height="4" fill="white"/>
    <rect x="6" y="42" width="4" height="4" fill="white"/>
    <rect x="14" y="42" width="4" height="4" fill="white"/>
    <rect x="24" y="24" width="8" height="8" fill="#102A56"/>
    <rect x="26" y="26" width="4" height="4" fill="white"/>
    <rect x="26" y="6" width="4" height="4" fill="#102A56"/>
    <rect x="26" y="14" width="4" height="4" fill="#102A56"/>
    <rect x="6" y="26" width="4" height="4" fill="#102A56"/>
    <rect x="14" y="26" width="4" height="4" fill="#102A56"/>
    <rect x="42" y="26" width="4" height="4" fill="#102A56"/>
    <rect x="32" y="26" width="4" height="4" fill="#102A56"/>
    <rect x="26" y="32" width="4" height="4" fill="#102A56"/>
    <rect x="26" y="42" width="4" height="4" fill="#102A56"/>
  </svg>
);

const CertificatePreview: React.FC<{
  data: CertificateData;
  editable?: boolean;
  onFieldChange?: (field: keyof CertificateData, value: string) => void;
  scale?: number;
}> = ({ data, editable = false, onFieldChange, scale = 1 }) => {
  return (
    <div style={{
      width: '3508px',
      height: '2480px',
      position: 'relative',
      overflow: 'hidden',
      background: '#FAF9F6',
      fontFamily: "'Inter', sans-serif",
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      flexShrink: 0,
    }}>
      {/* Background Watermarks */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}>
        <svg viewBox="0 0 3508 2480" width="3508" height="2480">
          <g stroke="#102A56" strokeWidth="3" fill="none">
            <path d="M400 1200 Q500 1100 600 1150 Q700 1180 750 1250 Q800 1320 700 1400 Q600 1450 500 1400 Q400 1350 400 1200Z"/>
            <path d="M900 1100 Q1000 1050 1100 1080 Q1200 1100 1250 1150 Q1300 1200 1250 1300 Q1200 1350 1100 1320 Q1000 1300 950 1250 Q900 1200 900 1100Z"/>
            <path d="M1400 800 Q1500 750 1600 780 Q1700 800 1750 850 Q1800 900 1750 1000 Q1700 1050 1600 1020 Q1500 1000 1450 950 Q1400 900 1400 800Z"/>
            <path d="M1800 700 Q1950 650 2100 700 Q2200 750 2250 800 Q2300 880 2200 950 Q2100 1000 1950 950 Q1800 900 1750 820 Q1700 750 1800 700Z"/>
            <path d="M2300 600 Q2400 550 2550 580 Q2650 600 2700 650 Q2750 720 2650 800 Q2550 850 2400 820 Q2300 780 2250 720 Q2200 650 2300 600Z"/>
            <path d="M2600 1000 Q2700 950 2800 980 Q2900 1000 2950 1050 Q3000 1120 2900 1200 Q2800 1250 2700 1220 Q2600 1180 2550 1120 Q2500 1050 2600 1000Z"/>
            <path d="M1500 1400 Q1550 1350 1620 1380 Q1680 1400 1700 1450 Q1720 1550 1680 1650 Q1620 1750 1550 1720 Q1480 1680 1460 1580 Q1440 1480 1500 1400Z"/>
            <path d="M1100 1450 Q1150 1400 1200 1420 Q1250 1450 1260 1550 Q1270 1680 1230 1800 Q1180 1920 1120 1900 Q1060 1850 1050 1720 Q1040 1580 1100 1450Z"/>
            <path d="M2800 1600 Q2860 1550 2920 1580 Q2960 1600 2980 1650 Q3000 1720 2960 1780 Q2920 1820 2860 1800 Q2800 1770 2780 1720 Q2760 1650 2800 1600Z"/>
            <g transform="translate(600,1850)">
              <rect x="0" y="0" width="200" height="40" rx="3"/>
              <rect x="20" y="-30" width="30" height="30" rx="2"/>
              <rect x="60" y="-30" width="30" height="30" rx="2"/>
              <rect x="100" y="-30" width="30" height="30" rx="2"/>
              <rect x="140" y="-30" width="30" height="30" rx="2"/>
              <line x1="100" y1="-30" x2="100" y2="-80"/>
              <line x1="95" y1="-80" x2="130" y2="-60"/>
              <line x1="95" y1="-80" x2="80" y2="-60"/>
            </g>
            <g transform="translate(2800,1650)">
              <line x1="40" y1="0" x2="40" y2="-120"/>
              <line x1="0" y1="-90" x2="80" y2="-90"/>
              <line x1="40" y1="-120" x2="0" y2="-90"/>
              <line x1="40" y1="-120" x2="80" y2="-90"/>
              <line x1="0" y1="-90" x2="0" y2="-70"/>
              <rect x="-5" y="0" width="15" height="10"/>
            </g>
            <g transform="translate(1800,500)">
              <ellipse cx="60" cy="20" rx="50" ry="8"/>
              <line x1="10" y1="20" x2="0" y2="5"/>
              <line x1="10" y1="20" x2="0" y2="35"/>
              <line x1="60" y1="12" x2="60" y2="0"/>
              <line x1="60" y1="28" x2="60" y2="40"/>
              <ellipse cx="60" cy="20" rx="8" ry="4"/>
            </g>
            <g transform="translate(2200,1800)">
              <rect x="0" y="0" width="40" height="30" rx="2"/>
              <rect x="42" y="0" width="40" height="30" rx="2"/>
              <rect x="0" y="-32" width="40" height="30" rx="2"/>
              <rect x="42" y="-32" width="40" height="30" rx="2"/>
              <rect x="84" y="0" width="40" height="30" rx="2"/>
            </g>
          </g>
        </svg>
      </div>

      {/* Borders */}
      <div style={{
        position: 'absolute', inset: '18px',
        border: '4px solid #102A56', zIndex: 1, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: '26px',
        border: '2px solid #D4AF37', zIndex: 1, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: '32px',
        border: '1px solid #F57C00', zIndex: 1, pointerEvents: 'none',
      }} />

      {/* Corner Ornaments */}
      {[
        { top: '38px', left: '38px', scale: '' },
        { top: '38px', right: '38px', scale: 'scaleX(-1)' },
        { bottom: '38px', left: '38px', scale: 'scaleY(-1)' },
        { bottom: '38px', right: '38px', scale: 'scale(-1,-1)' },
      ].map((pos, i) => (
        <svg key={i} style={{ position: 'absolute', width: '60px', height: '60px', zIndex: 2, pointerEvents: 'none', ...pos, transform: pos.scale }} viewBox="0 0 60 60">
          <path d="M0 30 L10 30 L10 10 L30 10 L30 0" stroke="#D4AF37" strokeWidth="2" fill="none"/>
          <circle cx="10" cy="10" r="3" fill="#D4AF37"/>
        </svg>
      ))}

      {/* ===== LEFT SIDEBAR ===== */}
      <div style={{
        position: 'absolute',
        left: '38px', top: '38px', bottom: '38px',
        width: '340px',
        background: '#102A56',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '50px 25px',
        clipPath: 'polygon(0 0, 100% 0, 88% 100%, 0 100%)',
      }}>
        {/* Medal */}
        <div style={{
          width: '120px', height: '120px', borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #F5E6A3, #D4AF37, #B8960C)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '50px', boxShadow: '0 4px 20px rgba(212,175,55,0.4)',
          position: 'relative', flexShrink: 0,
        }}>
          <div style={{ position: 'absolute', inset: '6px', borderRadius: '50%', border: '3px solid rgba(255,255,255,0.3)' }} />
          <MedalIcon />
        </div>

        {/* Sidebar Items */}
        {[
          { label: 'DATE OF ISSUE', value: data.issueDate, field: 'issueDate' as const, icon: <ClockIcon /> },
          { label: 'DURATION', value: data.duration, field: 'duration' as const, icon: <BarChartIcon /> },
          { label: 'LEVEL', value: data.level, field: 'level' as const, icon: <StarIcon /> },
          { label: 'SCORE', value: data.score, field: 'score' as const, icon: <CheckCircleIcon /> },
        ].map((item, idx) => (
          <div key={idx} style={{
            width: '100%', padding: '20px 10px',
            borderBottom: idx < 3 ? '1px solid rgba(212,175,55,0.25)' : 'none',
            textAlign: 'center',
          }}>
            <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
            <div style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '16px', fontWeight: 600,
              color: 'rgba(255,255,255,0.6)',
              textTransform: 'uppercase', letterSpacing: '2px',
              marginBottom: '4px',
            }}>{item.label}</div>
            {editable && onFieldChange ? (
              <input
                type="text"
                value={item.value}
                onChange={(e) => onFieldChange(item.field, e.target.value)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '20px', fontWeight: 500,
                  color: '#FFFFFF',
                  background: 'rgba(245,124,0,0.1)',
                  border: '1px dashed rgba(212,175,55,0.4)',
                  borderRadius: '4px',
                  padding: '2px 8px',
                  textAlign: 'center',
                  width: '100%',
                  outline: 'none',
                }}
                onFocus={(e) => { e.target.style.outline = '2px dashed #F57C00'; e.target.style.outlineOffset = '2px'; }}
                onBlur={(e) => { e.target.style.outline = 'none'; }}
              />
            ) : (
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '20px', fontWeight: 500,
                color: '#FFFFFF',
              }}>{item.value}</div>
            )}
          </div>
        ))}
      </div>

      {/* ===== TOP BAR ===== */}
      <div style={{
        position: 'absolute', top: '60px', left: '420px', right: '60px',
        height: '100px', zIndex: 3,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Left - Emblem + Academy Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            border: '4px solid #D4AF37', background: '#102A56',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', flexShrink: 0,
          }}>
            <div style={{ position: 'absolute', inset: '6px', borderRadius: '50%', border: '2px solid rgba(212,175,55,0.4)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: '12px', fontWeight: 700, color: '#D4AF37' }}>RBC</div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: '14px', fontWeight: 900, color: '#D4AF37' }}>ACADEMY</div>
            </div>
          </div>
          <div>
            {editable && onFieldChange ? (
              <input
                type="text"
                value={data.academyName}
                onChange={(e) => onFieldChange('academyName', e.target.value)}
                style={{
                  fontFamily: "'Cinzel', serif", fontSize: '26px', fontWeight: 700,
                  color: '#102A56', letterSpacing: '3px',
                  background: 'rgba(245,124,0,0.06)',
                  border: '1px dashed rgba(245,124,0,0.3)',
                  borderRadius: '4px',
                  padding: '2px 8px',
                  outline: 'none',
                  display: 'block',
                  width: 'auto',
                }}
              />
            ) : (
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: '26px', fontWeight: 700, color: '#102A56', letterSpacing: '3px', lineHeight: 1.2 }}>
                {data.academyName}
              </div>
            )}
            <div style={{
              fontFamily: "'Montserrat', sans-serif", fontSize: '12px',
              fontWeight: 500, color: '#F57C00', letterSpacing: '4px',
              textTransform: 'uppercase', marginTop: '2px',
            }}>{data.tagline}</div>
          </div>
        </div>

        {/* Right - Certificate ID */}
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: '12px',
            fontWeight: 600, color: '#102A56', textTransform: 'uppercase', letterSpacing: '2px',
          }}>Certificate ID</div>
          {editable && onFieldChange ? (
            <input
              type="text"
              value={data.certificateId}
              onChange={(e) => onFieldChange('certificateId', e.target.value)}
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: '16px', fontWeight: 500,
                color: '#F57C00',
                background: 'rgba(245,124,0,0.08)',
                border: '1px solid rgba(245,124,0,0.2)',
                borderRadius: '4px',
                padding: '4px 16px',
                marginTop: '4px',
                outline: 'none',
                textAlign: 'center',
              }}
            />
          ) : (
            <div style={{
              fontFamily: "'Inter', sans-serif", fontSize: '16px', fontWeight: 500,
              color: '#F57C00',
              background: 'rgba(245,124,0,0.08)',
              border: '1px solid rgba(245,124,0,0.2)',
              borderRadius: '4px',
              padding: '4px 16px',
              display: 'inline-block',
              marginTop: '4px',
            }}>{data.certificateId}</div>
          )}
        </div>
      </div>

      {/* ===== CENTER CONTENT ===== */}
      <div style={{
        position: 'absolute',
        left: '420px', right: '60px',
        top: '180px', bottom: '160px',
        zIndex: 3,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
      }}>
        {/* Title */}
        <div style={{
          fontFamily: "'Cinzel', serif", fontSize: '56px', fontWeight: 700,
          color: '#102A56', letterSpacing: '12px', textTransform: 'uppercase',
          lineHeight: 1.1,
        }}>
          CERTIFICATE
          <span style={{ display: 'block', fontSize: '52px', fontWeight: 300, color: '#D4AF37', letterSpacing: '16px' }}>OF</span>
          <span style={{ display: 'block' }}>COMPLETION</span>
        </div>

        {/* Divider */}
        <div style={{
          width: '200px', height: '2px',
          background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
          margin: '16px auto',
        }} />

        {/* Presented Text */}
        <div style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: '14px',
          fontWeight: 500, color: '#102A56', textTransform: 'uppercase',
          letterSpacing: '3px', marginBottom: '4px',
        }}>This certificate is proudly presented to</div>

        {/* Recipient Name */}
        {editable && onFieldChange ? (
          <input
            type="text"
            value={data.studentName}
            onChange={(e) => onFieldChange('studentName', e.target.value)}
            style={{
              fontFamily: "'Great Vibes', cursive", fontSize: '80px',
              fontWeight: 400, color: '#102A56',
              background: 'rgba(245,124,0,0.06)',
              border: '2px dashed rgba(245,124,0,0.3)',
              borderRadius: '8px',
              padding: '2px 20px',
              margin: '0 0 6px',
              outline: 'none',
              textAlign: 'center',
              width: '70%',
              maxWidth: '900px',
            }}
            onFocus={(e) => { e.target.style.outline = '3px dashed #F57C00'; e.target.style.outlineOffset = '4px'; }}
            onBlur={(e) => { e.target.style.outline = 'none'; }}
          />
        ) : (
          <div style={{
            fontFamily: "'Great Vibes', cursive", fontSize: '80px',
            fontWeight: 400, color: '#102A56',
            margin: '0 0 6px',
          }}>{data.studentName}</div>
        )}

        {/* Contact Info */}
        <div style={{
          fontFamily: "'Inter', sans-serif", fontSize: '13px',
          fontWeight: 400, color: '#888',
          marginBottom: '12px', letterSpacing: '1px',
        }}>{data.contactInfo}</div>

        {/* Description */}
        {editable && onFieldChange ? (
          <textarea
            value={data.description}
            onChange={(e) => onFieldChange('description', e.target.value)}
            rows={2}
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: '15px',
              fontWeight: 400, color: '#555',
              background: 'rgba(245,124,0,0.04)',
              border: '1px dashed rgba(245,124,0,0.3)',
              borderRadius: '4px',
              padding: '6px 16px',
              outline: 'none',
              textAlign: 'center',
              width: '80%',
              maxWidth: '1100px',
              resize: 'vertical',
              lineHeight: 1.5,
              marginBottom: '16px',
            }}
          />
        ) : (
          <div style={{
            fontFamily: "'Inter', sans-serif", fontSize: '15px',
            fontWeight: 400, color: '#555',
            maxWidth: '1100px', lineHeight: 1.5,
            marginBottom: '16px',
          }}>{data.description}</div>
        )}

        {/* Course Ribbon */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '4px auto', zIndex: 4 }}>
          <div style={{
            background: '#102A56',
            padding: '8px 40px',
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(16,42,86,0.3)',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', inset: '2px',
              border: '2px solid #D4AF37',
              pointerEvents: 'none', zIndex: 1,
            }} />
            <div style={{
              position: 'absolute', top: 0, left: '-15px',
              width: '30px', height: '100%',
              background: '#102A56', zIndex: 0,
              transform: 'skewX(-10deg)',
            }} />
            <div style={{
              position: 'absolute', top: 0, right: '-15px',
              width: '30px', height: '100%',
              background: '#102A56', zIndex: 0,
              transform: 'skewX(10deg)',
            }} />
            {editable && onFieldChange ? (
              <input
                type="text"
                value={data.courseName}
                onChange={(e) => onFieldChange('courseName', e.target.value)}
                style={{
                  fontFamily: "'Cinzel', serif", fontSize: '22px', fontWeight: 700,
                  color: '#D4AF37', letterSpacing: '4px', textTransform: 'uppercase',
                  background: 'rgba(212,175,55,0.1)',
                  border: '1px dashed rgba(212,175,55,0.4)',
                  borderRadius: '4px',
                  padding: '2px 16px',
                  outline: 'none',
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 2,
                  width: '90%',
                }}
              />
            ) : (
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: '22px', fontWeight: 700,
                color: '#D4AF37', letterSpacing: '4px', textTransform: 'uppercase',
                position: 'relative', zIndex: 2,
              }}>{data.courseName}</div>
            )}
          </div>
        </div>
      </div>

      {/* ===== RIGHT PANEL ===== */}
      <div style={{
        position: 'absolute',
        right: '70px', top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 3,
        display: 'flex', flexDirection: 'column',
        gap: '28px', alignItems: 'flex-end',
      }}>
        {[
          { label: 'COMPREHENSIVE\nCURRICULUM', icon: <svg viewBox="0 0 32 32" width="26" height="26"><rect x="4" y="6" width="24" height="20" rx="3" stroke="#102A56" fill="none" strokeWidth="1.5"/><path d="M4 14 L28 14" stroke="#102A56" fill="none" strokeWidth="1.5"/><circle cx="12" cy="20" r="2" fill="#D4AF37"/><circle cx="20" cy="20" r="2" fill="#D4AF37"/></svg> },
          { label: 'INDUSTRY\nRELEVANT', icon: <svg viewBox="0 0 32 32" width="26" height="26"><circle cx="16" cy="16" r="12" stroke="#102A56" fill="none" strokeWidth="1.5"/><path d="M12 16 L15 19 L20 12" stroke="#102A56" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
          { label: 'EXPERT\nINSTRUCTORS', icon: <svg viewBox="0 0 32 32" width="26" height="26"><path d="M16 4 L20 12 L28 14 L22 20 L24 28 L16 24 L8 28 L10 20 L4 14 L12 12 Z" stroke="#102A56" fill="none" strokeWidth="1.5" strokeLinejoin="round"/></svg> },
          { label: 'GLOBAL\nPERSPECTIVE', icon: <svg viewBox="0 0 32 32" width="26" height="26"><circle cx="16" cy="16" r="12" stroke="#102A56" fill="none" strokeWidth="1.5"/><ellipse cx="16" cy="16" rx="5" ry="12" stroke="#102A56" fill="none" strokeWidth="1.5"/><line x1="4" y1="16" x2="28" y2="16" stroke="#102A56" fill="none" strokeWidth="1.5"/></svg> },
        ].map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px', flexDirection: 'row-reverse' }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '50%',
              border: '2px solid #D4AF37',
              background: 'rgba(212,175,55,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {item.icon}
            </div>
            <div style={{
              fontFamily: "'Montserrat', sans-serif", fontSize: '11px',
              fontWeight: 600, color: '#102A56', textTransform: 'uppercase',
              letterSpacing: '1.5px', textAlign: 'right', lineHeight: 1.3,
              whiteSpace: 'pre-line', maxWidth: '160px',
            }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* ===== BOTTOM SECTION ===== */}
      <div style={{
        position: 'absolute',
        bottom: '70px', left: '420px', right: '60px',
        zIndex: 3,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      }}>
        {/* Director */}
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ width: '220px', height: '2px', background: '#102A56', margin: '0 auto 6px' }} />
          {editable && onFieldChange ? (
            <input type="text" value={data.directorSig} onChange={(e) => onFieldChange('directorSig', e.target.value)}
              style={{ fontFamily: "'Great Vibes', cursive", fontSize: '32px', color: '#102A56', border: '1px dashed rgba(245,124,0,0.3)', borderRadius: '4px', padding: '2px 8px', textAlign: 'center', width: '80%', outline: 'none', background: 'rgba(245,124,0,0.04)', marginBottom: '2px' }} />
          ) : (
            <div style={{ fontFamily: "'Great Vibes', cursive", fontSize: '32px', color: '#102A56', marginBottom: '2px' }}>{data.directorSig}</div>
          )}
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '11px', fontWeight: 600, color: '#102A56', letterSpacing: '2px', textTransform: 'uppercase' }}>{data.directorName}</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 400, color: '#888' }}>{data.directorRole}</div>
        </div>

        {/* Center - Seal & QR */}
        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: '100px', height: '100px', borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #F5E6A3, #D4AF37, #B8960C)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', marginBottom: '8px',
            boxShadow: '0 4px 20px rgba(212,175,55,0.3)',
          }}>
            <div style={{ position: 'absolute', inset: '5px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)' }} />
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: '9px', fontWeight: 700,
              color: '#102A56', textAlign: 'center', lineHeight: 1.2, position: 'relative', zIndex: 1,
            }}>
              COMPLETED<br/>WITH<br/>EXCELLENCE
            </div>
          </div>
          <div style={{ width: '64px', height: '64px', background: '#fff', border: '2px solid #102A56', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px' }}>
            <QRIcon />
          </div>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '8px', fontWeight: 500, color: '#102A56', textTransform: 'uppercase', letterSpacing: '1px' }}>Verify Certificate</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '7px', fontWeight: 400, color: '#888' }}>{data.verifyUrl}</div>
        </div>

        {/* Founder */}
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ width: '220px', height: '2px', background: '#102A56', margin: '0 auto 6px' }} />
          {editable && onFieldChange ? (
            <input type="text" value={data.founderSig} onChange={(e) => onFieldChange('founderSig', e.target.value)}
              style={{ fontFamily: "'Great Vibes', cursive", fontSize: '32px', color: '#102A56', border: '1px dashed rgba(245,124,0,0.3)', borderRadius: '4px', padding: '2px 8px', textAlign: 'center', width: '80%', outline: 'none', background: 'rgba(245,124,0,0.04)', marginBottom: '2px' }} />
          ) : (
            <div style={{ fontFamily: "'Great Vibes', cursive", fontSize: '32px', color: '#102A56', marginBottom: '2px' }}>{data.founderSig}</div>
          )}
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '11px', fontWeight: 600, color: '#102A56', letterSpacing: '2px', textTransform: 'uppercase' }}>{data.founderName}</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 400, color: '#888' }}>{data.founderRole}</div>
        </div>
      </div>
    </div>
  );
};

const CertificateDesigner: React.FC = () => {
  const { currentUser, certificates } = useApp();
  const [data, setData] = useState<CertificateData>(defaultData);
  const [isEditing, setIsEditing] = useState(false);
  const [scale, setScale] = useState(0.5);
  const [showFields, setShowFields] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Load from context if available
  useEffect(() => {
    if (currentUser) {
      setData(prev => ({
        ...prev,
        studentName: currentUser.name,
        studentEmail: currentUser.email,
      }));
    }
    if (certificates && certificates.length > 0) {
      const lastCert = certificates[certificates.length - 1];
      setData(prev => ({
        ...prev,
        studentName: lastCert.userName,
        courseName: lastCert.courseTitle.toUpperCase(),
        certificateId: lastCert.id,
        issueDate: lastCert.issueDate,
      }));
    }
  }, [currentUser, certificates]);

  const updateField = useCallback((field: keyof CertificateData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handlePrint = () => {
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <!DOCTYPE html><html><head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Great+Vibes&family=Inter:wght@300;400;500;600&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
      <style>
        @page { size: landscape; margin: 0; }
        body { margin: 0; padding: 0; display: flex; }
        .print-wrapper { width: 3508px; height: 2480px; }
      </style>
      </head><body><div class="print-wrapper">
    `);
    const certEl = previewRef.current;
    if (certEl) {
      win.document.write(certEl.innerHTML);
    }
    win.document.write('</div></body></html>');
    win.document.close();
    setTimeout(() => { win.print(); }, 500);
  };

  const handleDownloadSVG = () => {
    const svgContent = document.getElementById('certificate-svg-export')?.outerHTML;
    if (svgContent) {
      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `RBC-Certificate-${data.certificateId}.svg`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleDownloadPNG = async () => {
    const certEl = previewRef.current;
    if (!certEl) return;
    try {
      const canvas = await html2canvas(certEl, {
        scale: 1,
        useCORS: true,
        backgroundColor: '#FAF9F6',
        width: 3508,
        height: 2480,
      });
      const link = document.createElement('a');
      link.download = `RBC-Certificate-${data.certificateId}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch {
      alert('Could not export PNG. Try printing instead.');
    }
  };

  const handleReset = () => {
    setData(defaultData);
  };

  const sidebarFields: { label: string; field: keyof CertificateData; type: string }[] = [
    { label: 'Student Name', field: 'studentName', type: 'text' },
    { label: 'Phone', field: 'studentPhone', type: 'text' },
    { label: 'Email', field: 'studentEmail', type: 'email' },
    { label: 'Country', field: 'studentCountry', type: 'text' },
    { label: 'Contact Info', field: 'contactInfo', type: 'text' },
    { label: 'Marks / Score', field: 'marks', type: 'text' },
    { label: 'Completion', field: 'completion', type: 'text' },
    { label: 'Issue Date', field: 'issueDate', type: 'text' },
    { label: 'Duration', field: 'duration', type: 'text' },
    { label: 'Level', field: 'level', type: 'text' },
    { label: 'Score', field: 'score', type: 'text' },
    { label: 'Course Name', field: 'courseName', type: 'text' },
    { label: 'Certificate ID', field: 'certificateId', type: 'text' },
    { label: 'Director', field: 'directorName', type: 'text' },
    { label: 'Founder', field: 'founderName', type: 'text' },
    { label: 'Verification URL', field: 'verifyUrl', type: 'text' },
  ];

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#f0f2f5',
      overflow: 'hidden',
    }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        background: '#fff',
        borderBottom: '1px solid #e2e8f0',
        flexShrink: 0,
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Award size={22} color="#102A56" />
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: '18px', fontWeight: 700, color: '#102A56', letterSpacing: '1px' }}>
            Certificate Designer
          </span>
          <span style={{ fontSize: '11px', color: '#94a3b8', background: '#f1f5f9', padding: '2px 10px', borderRadius: '12px', fontFamily: "'Montserrat', sans-serif" }}>
            A4 Landscape • 3508×2480
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {/* Zoom */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginRight: '8px' }}>
            <button onClick={() => setScale(s => Math.max(0.25, s - 0.05))}
              style={btnStyle}>−</button>
            <span style={{ fontSize: '12px', fontFamily: "'Inter', sans-serif',", color: '#475569', minWidth: '40px', textAlign: 'center' }}>
              {Math.round(scale * 100)}%
            </span>
            <button onClick={() => setScale(s => Math.min(1, s + 0.05))}
              style={btnStyle}>+</button>
          </div>

          <button onClick={() => setIsEditing(!isEditing)}
            style={{
              ...actionBtnStyle,
              background: isEditing ? '#102A56' : '#fff',
              color: isEditing ? '#fff' : '#475569',
              borderColor: isEditing ? '#102A56' : '#cbd5e1',
            }}>
            <Edit3 size={16} />
            {isEditing ? 'Editing On' : 'Edit Fields'}
          </button>

          <button onClick={() => setShowFields(!showFields)}
            style={{
              ...actionBtnStyle,
              background: showFields ? '#F57C00' : '#fff',
              color: showFields ? '#fff' : '#475569',
              borderColor: showFields ? '#F57C00' : '#cbd5e1',
            }}>
            <FileText size={16} />
            Fields
          </button>

          <button onClick={handlePrint} style={actionBtnStyle}>
            <Printer size={16} />
            Print
          </button>

          <button onClick={handleDownloadSVG} style={actionBtnStyle}>
            <Download size={16} />
            SVG
          </button>

          <button onClick={handleDownloadPNG} style={actionBtnStyle}>
            <Download size={16} />
            PNG
          </button>

          <button onClick={handleReset} style={{ ...actionBtnStyle, color: '#ef4444', borderColor: '#fca5a5' }}>
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Fields Panel (Collapsible) */}
        {showFields && (
          <div style={{
            width: '280px',
            background: '#fff',
            borderRight: '1px solid #e2e8f0',
            overflowY: 'auto',
            flexShrink: 0,
            padding: '16px',
          }}>
            <h3 style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '13px', fontWeight: 600,
              color: '#102A56', textTransform: 'uppercase',
              letterSpacing: '1px', marginBottom: '16px',
              paddingBottom: '8px', borderBottom: '2px solid #D4AF37',
            }}>
              Editable Fields
            </h3>
            {sidebarFields.map(({ label, field, type }) => (
              <div key={field} style={{ marginBottom: '12px' }}>
                <label style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '10px', fontWeight: 500,
                  color: '#64748b', textTransform: 'uppercase',
                  letterSpacing: '0.5px', display: 'block', marginBottom: '4px',
                }}>{label}</label>
                <input
                  type={type}
                  value={data[field]}
                  onChange={(e) => updateField(field, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    color: '#1e293b',
                    outline: 'none',
                    background: '#f8fafc',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#F57C00'; e.target.style.boxShadow = '0 0 0 2px rgba(245,124,0,0.1)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Certificate Preview */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          background: '#e8eaed',
        }}>
          <div style={{
            boxShadow: '0 8px 40px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)',
            borderRadius: '4px',
            overflow: 'hidden',
            lineHeight: 0,
            transform: 'translateY(-5%)',
          }}>
            <div ref={previewRef}>
              <CertificatePreview
                data={data}
                editable={isEditing}
                onFieldChange={updateField}
                scale={scale}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const btnStyle: React.CSSProperties = {
  width: '28px', height: '28px',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  border: '1px solid #cbd5e1', borderRadius: '6px',
  background: '#fff', cursor: 'pointer',
  fontSize: '16px', fontWeight: 600, color: '#475569',
};

const actionBtnStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: '6px',
  padding: '6px 14px',
  border: '1px solid #cbd5e1', borderRadius: '6px',
  background: '#fff', cursor: 'pointer',
  fontFamily: "'Inter', sans-serif",
  fontSize: '12px', fontWeight: 500, color: '#475569',
  transition: 'all 0.2s',
};

export { CertificateDesigner, CertificatePreview };
export type { CertificateData };
