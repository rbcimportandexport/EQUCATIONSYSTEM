/**
 * RBC Import & Export Academy - Certificate PDF Generator
 * 
 * Uses jsPDF to generate a print-ready A4 Landscape certificate PDF.
 * 
 * Usage:
 *   node generate-pdf.js
 * 
 * Or in browser:
 *   import { generateCertificatePDF } from './generate-pdf.js';
 *   generateCertificatePDF({
 *     studentName: 'John Doe',
 *     courseName: 'IMPORT & EXPORT MASTER COURSE',
 *     certificateId: 'RBC-2026-000215',
 *     issueDate: '18 July 2026',
 *   });
 */

// Browser-compatible version
export function generateCertificatePDF(data = {}) {
  const { jsPDF } = window.jspdf || require('jspdf');
  
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [3508, 2480], // A4 landscape at 300 DPI
    hotfixes: ['px_scaling'],
  });

  const W = 3508;
  const H = 2480;
  
  // Colors
  const NAVY = '#102A56';
  const GOLD = '#D4AF37';
  const ORANGE = '#F57C00';
  const BG = '#FAF9F6';
  const WHITE = '#FFFFFF';

  // Default data
  const {
    studentName = 'RBC',
    issueDate = '18 July 2026',
    duration = '10+ Hours',
    level = 'Beginner to Advanced',
    score = '95% - 100%',
    courseName = 'IMPORT & EXPORT MASTER COURSE',
    certificateId = 'RBC-2026-000215',
    academyName = 'RBC IMPORT & EXPORT ACADEMY',
    tagline = 'Learn • Trade • Grow Globally',
    contactInfo = 'India · rbcimportexport@rbc.com · +91 98765 43210',
    directorSig = 'Kunal Pawar',
    directorName = 'KUNAL PAWAR',
    directorRole = 'Academy Director',
    founderSig = 'Prakash Kachchhi',
    founderName = 'PRAKASH KACHCHHI',
    founderRole = 'Founder & CEO',
    verifyUrl = 'academy.rbcimportandexport.com/verify',
    description = 'for successfully completing all learning modules, practice quizzes, video lectures, assignments, and final assessment in the course',
  } = data;

  // Background
  doc.setFillColor(250, 249, 246);
  doc.rect(0, 0, W, H, 'F');

  // === BORDERS ===
  doc.setDrawColor(16, 42, 86);
  doc.setLineWidth(6);
  doc.rect(18, 18, W - 36, H - 36, 'S');

  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(3);
  doc.rect(30, 30, W - 60, H - 60, 'S');

  doc.setDrawColor(245, 124, 0);
  doc.setLineWidth(2);
  doc.rect(38, 38, W - 76, H - 76, 'S');

  // === LEFT SIDEBAR ===
  doc.setFillColor(16, 42, 86);
  // Polygon sidebar with angled bottom
  const sidebarX = 38;
  const sidebarY = 38;
  const sidebarW = 340;
  const sidebarH = H - 76;
  doc.saveGraphicsState();
  doc.beginPath();
  doc.moveTo(sidebarX, sidebarY);
  doc.lineTo(sidebarX + sidebarW, sidebarY);
  doc.lineTo(sidebarX + sidebarW * 0.88, sidebarY + sidebarH);
  doc.lineTo(sidebarX, sidebarY + sidebarH);
  doc.closePath();
  doc.fill();
  doc.restoreGraphicsState();

  // Sidebar gold divider line
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1.5);
  doc.setGlobalAlpha(0.3);
  doc.line(sidebarX, sidebarY, sidebarX + sidebarW * 0.88, sidebarY + sidebarH);
  doc.setGlobalAlpha(1);

  // === TOP BAR - Emblem ===
  const emblemX = 420;
  const emblemY = 75;
  
  // Emblem circle
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(4);
  doc.setFillColor(16, 42, 86);
  doc.circle(emblemX + 45, emblemY + 45, 40, 'S');
  // Inner circle
  doc.setLineWidth(2);
  doc.setGlobalAlpha(0.4);
  doc.circle(emblemX + 45, emblemY + 45, 32, 'S');
  doc.setGlobalAlpha(1);

  // Academy Name
  doc.setFont('Cinzel', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(16, 42, 86);
  doc.text(academyName, emblemX + 105, emblemY + 42);

  // Tagline
  doc.setFont('Montserrat', 'medium');
  doc.setFontSize(12);
  doc.setTextColor(245, 124, 0);
  doc.text(tagline, emblemX + 105, emblemY + 68);

  // Certificate ID - Right
  doc.setFont('Montserrat', 'semibold');
  doc.setFontSize(12);
  doc.setTextColor(16, 42, 86);
  doc.text('CERTIFICATE ID', W - 60, emblemY + 10, { align: 'right' });
  
  // ID badge
  doc.setFillColor(245, 124, 0, 0.08);
  doc.setDrawColor(245, 124, 0, 0.2);
  doc.roundedRect(W - 240, emblemY + 18, 180, 26, 4, 4, 'FD');
  doc.setFont('Inter', 'medium');
  doc.setFontSize(16);
  doc.setTextColor(245, 124, 0);
  doc.text(certificateId, W - 60, emblemY + 38, { align: 'right' });

  // === CENTER - TITLE ===
  const centerX = W / 2 + 140; // Offset for sidebar
  doc.setFont('Cinzel', 'bold');
  doc.setFontSize(56);
  doc.setTextColor(16, 42, 86);
  doc.text('CERTIFICATE', centerX, 520, { align: 'center' });
  
  doc.setFont('Cinzel', 'light');
  doc.setFontSize(52);
  doc.setTextColor(212, 175, 55);
  doc.text('OF', centerX, 585, { align: 'center' });

  doc.setFont('Cinzel', 'bold');
  doc.setFontSize(56);
  doc.setTextColor(16, 42, 86);
  doc.text('COMPLETION', centerX, 650, { align: 'center' });

  // Divider
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(2);
  doc.line(centerX - 100, 670, centerX + 100, 670);

  // Presented Text
  doc.setFont('Montserrat', 'medium');
  doc.setFontSize(14);
  doc.setTextColor(16, 42, 86);
  doc.text('THIS CERTIFICATE IS PROUDLY PRESENTED TO', centerX, 710, { align: 'center' });

  // Recipient Name
  doc.setFont('Great Vibes', 'normal');
  doc.setFontSize(80);
  doc.setTextColor(16, 42, 86);
  doc.text(studentName, centerX, 820, { align: 'center' });

  // Contact Info
  doc.setFont('Inter', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(136, 136, 136);
  doc.text(contactInfo, centerX, 850, { align: 'center' });

  // Description
  doc.setFont('Inter', 'normal');
  doc.setFontSize(15);
  doc.setTextColor(85, 85, 85);
  const descLines = doc.splitTextToSize(description, 1100);
  doc.text(descLines, centerX, 890, { align: 'center' });

  // === COURSE RIBBON ===
  const ribbonY = 950;
  const ribbonW = 1200;
  const ribbonX = centerX - ribbonW / 2;
  
  // Ribbon body
  doc.setFillColor(16, 42, 86);
  doc.rect(ribbonX, ribbonY, ribbonW, 48, 'F');
  
  // Gold border
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(2);
  doc.rect(ribbonX + 3, ribbonY + 3, ribbonW - 6, 42, 'S');
  
  // Ribbon tails
  doc.setFillColor(16, 42, 86);
  doc.triangle(ribbonX - 15, ribbonY, ribbonX, ribbonY, ribbonX, ribbonY + 48);
  doc.triangle(ribbonX + ribbonW, ribbonY, ribbonX + ribbonW + 15, ribbonY, ribbonX + ribbonW, ribbonY + 48);

  // Course name in ribbon
  doc.setFont('Cinzel', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(212, 175, 55);
  doc.text(courseName, centerX, ribbonY + 32, { align: 'center' });

  // === LEFT SIDEBAR ITEMS ===
  const sidebarCX = sidebarX + sidebarW / 2;
  const sidebarItems = [
    { label: 'DATE OF ISSUE', value: issueDate, y: 380 },
    { label: 'DURATION', value: duration, y: 540 },
    { label: 'LEVEL', value: level, y: 700 },
    { label: 'SCORE', value: score, y: 860 },
  ];
  
  sidebarItems.forEach((item, i) => {
    // Gold icon circle
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(1.5);
    doc.circle(sidebarCX, item.y - 40, 14, 'S');
    
    doc.setFont('Montserrat', 'semibold');
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255, 0.6);
    doc.text(item.label, sidebarCX, item.y - 10, { align: 'center' });
    
    doc.setFont('Inter', 'medium');
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text(item.value, sidebarCX, item.y + 18, { align: 'center' });
    
    // Divider line
    if (i < sidebarItems.length - 1) {
      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(0.5);
      doc.setGlobalAlpha(0.2);
      doc.line(sidebarX + 12, item.y + 40, sidebarX + sidebarW * 0.88 - 12, item.y + 40);
      doc.setGlobalAlpha(1);
    }
  });

  // === RIGHT PANEL ===
  const rightX = W - 80;
  const rightItems = [
    { label: 'COMPREHENSIVE CURRICULUM', y: 820 },
    { label: 'INDUSTRY RELEVANT', y: 940 },
    { label: 'EXPERT INSTRUCTORS', y: 1060 },
    { label: 'GLOBAL PERSPECTIVE', y: 1180 },
  ];
  
  rightItems.forEach((item) => {
    // Icon circle
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(2);
    doc.setFillColor(212, 175, 55, 0.06);
    doc.circle(rightX, item.y, 26, 'FD');
    
    // Label
    doc.setFont('Montserrat', 'semibold');
    doc.setFontSize(11);
    doc.setTextColor(16, 42, 86);
    doc.text(item.label, rightX - 40, item.y, { align: 'right' });
  });

  // === BOTTOM SECTION ===
  const bottomY = 2260;

  // Director (Left)
  doc.setDrawColor(16, 42, 86);
  doc.setLineWidth(2);
  doc.line(640, bottomY, 860, bottomY);
  doc.setFont('Great Vibes', 'normal');
  doc.setFontSize(32);
  doc.setTextColor(16, 42, 86);
  doc.text(directorSig, 750, bottomY + 40, { align: 'center' });
  doc.setFont('Montserrat', 'semibold');
  doc.setFontSize(11);
  doc.text(directorName, 750, bottomY + 60, { align: 'center' });

  // Center - Gold Seal
  const sealX = centerX;
  const sealY = bottomY - 10;
  
  // Gold seal circle
  const gradR = 50;
  for (let r = gradR; r > 0; r--) {
    const t = r / gradR;
    const g = Math.round(180 + t * 75);
    doc.setFillColor(245 - t * 30, g, 55 + t * 100);
    doc.circle(sealX, sealY, r, 'F');
  }
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(3);
  doc.circle(sealX, sealY, gradR, 'S');
  doc.setLineWidth(2);
  doc.setGlobalAlpha(0.4);
  doc.circle(sealX, sealY, 44, 'S');
  doc.setGlobalAlpha(1);

  doc.setFont('Cinzel', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(16, 42, 86);
  doc.text(['COMPLETED', 'WITH', 'EXCELLENCE'], sealX, sealY - 8, { align: 'center', lineHeightFactor: 1.3 });

  // QR Code placeholder
  doc.setDrawColor(16, 42, 86);
  doc.setLineWidth(2);
  doc.setFillColor(255, 255, 255);
  doc.rect(sealX - 32, sealY + 60, 64, 64, 'FD');
  
  doc.setFont('Montserrat', 'medium');
  doc.setFontSize(8);
  doc.setTextColor(16, 42, 86);
  doc.text('VERIFY CERTIFICATE', sealX, sealY + 148, { align: 'center' });
  doc.setFont('Inter', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(136, 136, 136);
  doc.text(`Scan QR code or visit ${verifyUrl}`, sealX, sealY + 162, { align: 'center' });

  // Founder (Right)
  doc.setDrawColor(16, 42, 86);
  doc.setLineWidth(2);
  doc.line(2640, bottomY, 2860, bottomY);
  doc.setFont('Great Vibes', 'normal');
  doc.setFontSize(32);
  doc.setTextColor(16, 42, 86);
  doc.text(founderSig, 2750, bottomY + 40, { align: 'center' });
  doc.setFont('Montserrat', 'semibold');
  doc.setFontSize(11);
  doc.text(founderName, 2750, bottomY + 60, { align: 'center' });

  // === SAVE ===
  const fileName = `RBC-Certificate-${certificateId}.pdf`;
  doc.save(fileName);
  
  return doc;
}

// Node.js compatibility
if (typeof window === 'undefined') {
  module.exports = { generateCertificatePDF };
}
