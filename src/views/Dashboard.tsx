import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, Clock, Award, CheckCircle, 
  ArrowRight, Video, Image
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { 
    courses, 
    modules, 
    progress, 
    setSelectedCourseId, 
    setSelectedModuleId, 
    setActiveView,
    setSelectedModuleTab,
    getCourseCompletionPercentage,
    language
  } = useApp();

  // Aggregate statistics
  const totalCoursesCount = courses.length;
  const completedLessonsCount = Object.values(progress).filter(p => p.completed).length;
  const studyHours = (((completedLessonsCount * 15) / 60) + 2.4).toFixed(1); 

  let totalCorrectAnswers = 0;
  let totalQuestionsCount = 0;
  Object.values(progress).forEach(p => {
    Object.values(p.quizScores).forEach(score => {
      totalCorrectAnswers += score;
      totalQuestionsCount += 1;
    });
  });
  const avgQuizScore = totalQuestionsCount > 0 
    ? Math.round((totalCorrectAnswers / totalQuestionsCount) * 100) 
    : 85;

  const handleStartCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    const courseModules = modules.filter(m => m.courseId === courseId);
    if (courseModules.length > 0) {
      setSelectedModuleId(courseModules[0].id);
      setActiveView('Chapters');
    } else {
      setActiveView('Courses');
    }
  };

  return (
    <div className="varsity-dashboard-view" style={{ 
      height: '100%', 
      overflowY: 'auto', 
      background: '#ffffff',
      color: '#1e293b',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    }}>
      <style>{`
        .varsity-hero-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 48px 24px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }

        .varsity-hero-left {
          flex: 1.2;
          max-width: 640px;
        }

        .varsity-title-main {
          font-size: 52px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 4px 0;
          line-height: 1.05;
          letter-spacing: -1px;
        }

        .varsity-title-sub {
          font-size: 26px;
          font-weight: 700;
          color: #334155;
          margin: 0 0 20px 0;
          line-height: 1.25;
        }

        .varsity-description {
          font-size: 15px;
          color: #475569;
          line-height: 1.65;
          margin-bottom: 24px;
        }

        .varsity-dashed-divider {
          border-bottom: 1px dashed #cbd5e1;
          margin: 24px 0 20px 0;
          width: 100%;
        }

        .varsity-invest-tag {
          font-size: 15px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 6px;
        }

        .varsity-invest-sub {
          font-size: 13.5px;
          color: #64748b;
          margin-bottom: 18px;
          line-height: 1.5;
        }

        .varsity-open-btn {
          background: #0284c7;
          color: #ffffff;
          border: none;
          padding: 10px 24px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 2px 8px rgba(2, 132, 199, 0.25);
        }

        .varsity-open-btn:hover {
          background: #0369a1;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(2, 132, 199, 0.35);
        }

        .varsity-hero-right {
          flex: 0.9;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .varsity-hero-illustration {
          max-width: 440px;
          width: 100%;
          height: auto;
          object-fit: contain;
        }

        /* Explore Varsity Section */
        .varsity-explore-section {
          max-width: 1200px;
          margin: 20px auto 48px auto;
          padding: 0 48px;
        }

        .varsity-section-heading {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 24px;
          letter-spacing: -0.5px;
        }

        .varsity-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .varsity-card {
          border-radius: 14px;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
          border: 1px solid #e2e8f0;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
        }

        .varsity-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
        }

        .varsity-card-header {
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: filter 0.2s ease;
        }

        .varsity-card-icon-box {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .varsity-card-body {
          padding: 16px 18px;
          background: #ffffff;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .varsity-card-title {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 4px 0;
        }

        .varsity-card-desc {
          font-size: 12.5px;
          color: #64748b;
          line-height: 1.4;
          margin: 0;
        }

        /* Stats & Courses Section */
        .varsity-courses-section {
          max-width: 1200px;
          margin: 0 auto 60px auto;
          padding: 0 48px;
        }

        .course-item-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 16px;
          transition: all 0.2s ease;
        }

        .course-item-card:hover {
          background: #ffffff;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
          border-color: #cbd5e1;
        }

        @media (max-width: 1024px) {
          .varsity-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .varsity-hero-container {
            flex-direction: column;
            padding: 32px 24px;
          }
          .varsity-explore-section, .varsity-courses-section {
            padding: 0 24px;
          }
        }

        @media (max-width: 768px) {
          .varsity-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .varsity-explore-section, .varsity-courses-section {
            padding: 0 16px !important;
          }
          .course-item-card {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 16px !important;
            padding: 16px !important;
          }
          .course-item-card img {
            width: 100% !important;
            height: 160px !important;
          }
          .course-item-card button {
            width: 100% !important;
            justify-content: center !important;
          }
        }

        @media (max-width: 640px) {
          .varsity-title-main {
            font-size: 36px;
          }
          .varsity-title-sub {
            font-size: 20px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <div className="varsity-hero-container">
        <div className="varsity-hero-left">
          <h1 className="varsity-title-main">
            {language === 'hi' 
              ? 'आरबीसी एकेडमी'
              : language === 'gu'
                ? 'આરબીસી એકેડેમી'
                : language === 'mr'
                  ? 'आरबीसी अकादमी'
                  : 'RBC Academy'}
          </h1>
          <h2 className="varsity-title-sub">
            {language === 'hi' 
              ? 'इम्पोर्ट - एक्सपोर्ट और ग्लोबल ट्रेड एजुकेशन'
              : language === 'gu'
                ? 'ઈમ્પોર્ટ - એક્સપોર્ટ અને ગ્લોબલ ટ્રેડ શિક્ષણ'
                : language === 'mr'
                  ? 'आयात - निर्यात आणि ग्लोबल ट्रेड शिक्षण'
                  : 'Import - Export & Global Trade Education'}
          </h2>
          <p className="varsity-description">
            {language === 'hi'
              ? 'आरबीसी एकेडमी आरबीसी के व्यापार विशेषज्ञों द्वारा तैयार किए गए अंतर्राष्ट्रीय व्यापार, आयात-निर्यात नियमों, सीमा शुल्क दस्तावेजों और वैश्विक रसद (logistics) पाठों का एक विस्तृत संग्रह है। यह सभी के लिए पूरी तरह से मुफ्त और खुला है।'
              : language === 'gu'
                ? 'આરબીસી એકેડેમી એ આરબીસીના વ્યાપાર નિષ્ણાતો દ્વારા તૈયાર કરવામાં આવેલા આંતરરાષ્ટ્રીય વેપાર, આયાત-નિકાસના નિયમો, કસ્ટમ્સ દસ્તાવેજો અને વૈશ્વિક લોજિસ્ટિક્સ પાઠોનો એક સવિસ્તર સંગ્રહ છે. આ બધા માટે તદ્દન મફત અને ખુલ્લું છે.'
                : language === 'mr'
                  ? 'आरबीसी अकादमी हा आरबीसीच्या व्यापार तज्ञांनी तयार केलेल्या आंतरराष्ट्रीय व्यापार, आयात-निर्यात नियम, सीमाशुल्क दस्तऐवजीकरण आणि जागतिक लॉजिस्टिक्स पाठांचा एक सविस्तर संग्रह आहे. हे सर्वांसाठी पूर्णपणे मोफत आणि खुले आहे.'
                  : 'RBC Academy is an extensive and in-depth collection of international trade, import-export compliance, customs documentation, and global logistics lessons created by trade experts at RBC. It is free and openly accessible to everyone and is one of the largest financial and trade education resources on the web. No signup required, no pay-wall, no ads.'}
          </p>

          <div className="varsity-dashed-divider" />

          <div className="varsity-invest-tag">
            {language === 'hi'
              ? 'ज्ञान में निवेश करें,'
              : language === 'gu'
                ? 'જ્ઞાનમાં રોકાણ કરો,'
                : language === 'mr'
                  ? 'ज्ञानामध्ये गुंतवणूक करा,'
                  : 'Invest in knowledge,'}
          </div>
          <div className="varsity-invest-sub">
            {language === 'hi'
              ? 'कंटेनर शिपिंग और आईईसी रजिस्ट्रेशन से लेकर लेटर ऑफ क्रेडिट और कस्टम्स क्लीयरेंस तक सब कुछ सीखें आरबीसी एकेडमी के साथ।'
              : language === 'gu'
                ? 'કન્ટેનર શિપિંગ અને IEC રજિસ્ટ્રેશનથી લઈને લેટર ઓફ ક્રેડિટ અને કસ્ટમ્સ ક્લિયરન્સ સુધી બધું જ શીખો આરબીસી એકેડેમી સાથે.'
                : language === 'mr'
                  ? 'कंटेनर शिपिंग आणि आयईसी नोंदणीपासून ते लेटर ऑफ क्रेडिट आणि कस्टम्स क्लिअरन्सपर्यंत सर्व काही शिका आरबीसी अकादमीसोबत.'
                  : 'Learn everything from basics of container shipping and IEC registration to letter of credit & customs clearance with RBC Academy.'}
          </div>

          <button className="varsity-open-btn" onClick={() => setActiveView('Courses')}>
            <span>
              {language === 'hi'
                ? 'मॉड्यूल खोजें'
                : language === 'gu'
                  ? 'મોડ્યુલ્સ જુઓ'
                  : language === 'mr'
                    ? 'मॉड्यूल्स पहा'
                    : 'Explore Modules'}
            </span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="varsity-hero-right">
          <img 
            src="/login-illustration.png" 
            alt="RBC Varsity Learning" 
            className="varsity-hero-illustration" 
          />
        </div>
      </div>

      {/* Explore Varsity Section (5 Color Cards Grid) */}
      <div className="varsity-explore-section">
        <h2 className="varsity-section-heading">
          {language === 'hi'
            ? 'आरबीसी एकेडमी एक्सप्लोर करें'
            : language === 'gu'
              ? 'આરબીસી એકેડેમી જુઓ'
              : language === 'mr'
                ? 'आरबीसी अकादमी एक्सप्लोर करा'
                : 'Explore RBC Academy'}
        </h2>

        <div className="varsity-cards-grid">
          {/* Card 1: Modules (Blue) */}
          <div className="varsity-card" onClick={() => { setSelectedModuleTab('read'); setActiveView('Courses'); }}>
            <div className="varsity-card-header" style={{ background: '#60a5fa' }}>
              <div className="varsity-card-icon-box">
                <BookOpen size={26} color="#2563eb" />
              </div>
            </div>
            <div className="varsity-card-body">
              <h3 className="varsity-card-title">
                {language === 'hi'
                  ? 'मॉड्यूल'
                  : language === 'gu'
                    ? 'મોડ્યુલ્સ'
                    : language === 'mr'
                      ? 'मॉड्यूल्स'
                      : 'Modules'}
              </h3>
              <p className="varsity-card-desc">
                {language === 'hi'
                  ? 'आयात/निर्यात व्यापार पर संरचित पाठ और अध्याय'
                  : language === 'gu'
                    ? 'આયાત/નિકાસ વેપાર પર વ્યવસ્થિત પ્રકરણો અને લખાણ'
                    : language === 'mr'
                      ? 'आयात/निर्यात व्यापारावर संरचित प्रकरणे आणि मजकूर'
                      : 'Structured text & chapters on Import/Export trade'}
              </p>
            </div>
          </div>

          {/* Card 2: Images (Teal / Emerald) */}
          <div className="varsity-card" onClick={() => { setSelectedModuleTab('images'); setActiveView('Chapters'); }}>
            <div className="varsity-card-header" style={{ background: '#34d399' }}>
              <div className="varsity-card-icon-box">
                <Image size={26} color="#059669" />
              </div>
            </div>
            <div className="varsity-card-body">
              <h3 className="varsity-card-title">
                {language === 'hi'
                  ? 'चित्र'
                  : language === 'gu'
                    ? 'ચિત્રો'
                    : language === 'mr'
                      ? 'चित्रे'
                      : 'Images'}
              </h3>
              <p className="varsity-card-desc">
                {language === 'hi'
                  ? 'दृश्य आरेख और अध्याय फ़्लोचार्ट'
                  : language === 'gu'
                    ? 'દ્રશ્ય આકૃતિઓ અને પ્રકરણ ફ્લોચાર્ટ'
                    : language === 'mr'
                      ? 'दृश्य आकृत्या आणि प्रकरणांचे फ्लोचार्ट'
                      : 'Visual diagrams & chapter flowcharts'}
              </p>
            </div>
          </div>

          {/* Card 3: Videos (Yellow / Amber) */}
          <div className="varsity-card" onClick={() => setActiveView('Videos')}>
            <div className="varsity-card-header" style={{ background: '#fbbf24' }}>
              <div className="varsity-card-icon-box">
                <Video size={26} color="#d97706" />
              </div>
            </div>
            <div className="varsity-card-body">
              <h3 className="varsity-card-title">
                {language === 'hi'
                  ? 'वीडियो'
                  : language === 'gu'
                    ? 'વિડિઓઝ'
                    : language === 'mr'
                      ? 'व्हिडिओ'
                      : 'Videos'}
              </h3>
              <p className="varsity-card-desc">
                {language === 'hi'
                  ? 'वीडियो ट्यूटोरियल और पोर्ट रसद (logistics) गाइड'
                  : language === 'gu'
                    ? 'વિડિઓ ટ્યુટોરિયલ્સ અને પોર્ટ લોજિસ્ટિક્સ માર્ગદર્શિકા'
                    : language === 'mr'
                      ? 'व्हिडिओ ट्युटोरियल्स आणि पोर्ट लॉजिस्टिक्स मार्गदर्शक'
                      : 'Video tutorials & port logistics guides'}
              </p>
            </div>
          </div>

          {/* Card 4: Certified (Purple) */}
          <div className="varsity-card" onClick={() => setActiveView('AdminPanel')}>
            <div className="varsity-card-header" style={{ background: '#a78bfa' }}>
              <div className="varsity-card-icon-box">
                <Award size={26} color="#7c3aed" />
              </div>
            </div>
            <div className="varsity-card-body">
              <h3 className="varsity-card-title">
                {language === 'hi'
                  ? 'प्रमाणित'
                  : language === 'gu'
                    ? 'પ્રમાણિત'
                    : language === 'mr'
                      ? 'प्रमाणित'
                      : 'Certified'}
              </h3>
              <p className="varsity-card-desc">
                {language === 'hi'
                  ? 'आधिकारिक आरबीसी एकेडमी व्यापार प्रमाणपत्र अर्जित करें'
                  : language === 'gu'
                    ? 'સત્તાવાર આરબીસી એકેડેમી વ્યાપાર પ્રમાણપત્ર મેળવો'
                    : language === 'mr'
                      ? 'अधिकृत आरबीसी अकादमी व्यापार प्रमाणपत्र मिळवा'
                      : 'Earn official RBC Academy trade certificates'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Aggregate Stats Bar */}
      <div className="varsity-courses-section">
        <h2 className="varsity-section-heading">Your Progress Overview</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={20} color="#2563eb" />
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>{totalCoursesCount}</div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Active Courses</div>
            </div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={20} color="#d97706" />
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>{studyHours} hrs</div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Time Studied</div>
            </div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle size={20} color="#16a34a" />
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>{completedLessonsCount}</div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Lessons Completed</div>
            </div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={20} color="#9333ea" />
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>{avgQuizScore}%</div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Avg Quiz Score</div>
            </div>
          </div>
        </div>

        {/* Featured Courses List */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
          <h2 className="varsity-section-heading" style={{ margin: 0, fontSize: 'clamp(18px, 4vw, 22px)' }}>Available Learning Modules</h2>
          <button className="varsity-open-btn" style={{ background: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1' }} onClick={() => setActiveView('Courses')}>
            <span>View All Catalog</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div>
          {courses.map(course => {
            const pct = getCourseCompletionPercentage(course.id);
            return (
              <div key={course.id} className="course-item-card">
                <img src={course.thumbnail} alt={course.title} style={{ width: '100px', height: '70px', borderRadius: '8px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>{course.category}</span>
                    <span style={{ fontSize: '11px', background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '4px' }}>{course.level}</span>
                  </div>
                  <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>{course.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '280px' }}>
                    <div style={{ flex: 1, height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: '#0284c7' }}></div>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#0284c7' }}>{pct}%</span>
                  </div>
                </div>
                <button className="varsity-open-btn" onClick={() => handleStartCourse(course.id)}>
                  <span>{pct > 0 ? 'Resume' : 'Start'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
