import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Printer, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import logoEmblem from '../assets/logo_emblem.png';

const NAVY   = '#102A56';
const ORANGE = '#F57C00';
const GOLD   = '#D4AF37';
const CREAM  = '#FCFBF7';

const Field: React.FC<{label:string;value:string;onChange:(v:string)=>void;placeholder?:string;half?:boolean}> = ({label,value,onChange,placeholder,half}) => (
  <div style={{flex:half?'1 1 calc(50% - 6px)':'1 1 100%',minWidth:0}}>
    <label style={{display:'block',fontSize:'10px',fontWeight:'700',color:'#64748b',textTransform:'uppercase',letterSpacing:'0.6px',marginBottom:'3px'}}>{label}</label>
    <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
      style={{width:'100%',padding:'7px 10px',border:'1.5px solid #e2e8f0',borderRadius:'7px',fontSize:'12px',color:'#0f172a',background:'#fff',outline:'none',boxSizing:'border-box',fontFamily:'inherit',transition:'border-color 0.15s'}}
      onFocus={e=>{e.target.style.borderColor=NAVY;}} onBlur={e=>{e.target.style.borderColor='#e2e8f0';}}
    />
  </div>
);

const Section: React.FC<{title:string;icon:string;children:React.ReactNode}> = ({title,icon,children}) => {
  const [open,setOpen]=useState(true);
  return (
    <div style={{marginBottom:'10px',border:'1px solid #e2e8f0',borderRadius:'10px',overflow:'hidden'}}>
      <button onClick={()=>setOpen(o=>!o)} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 14px',background:open?`${NAVY}08`:'#fff',border:'none',cursor:'pointer',fontWeight:'700',fontSize:'12px',color:NAVY}}>
        <span>{icon} {title}</span>
        {open?<ChevronUp size={14}/>:<ChevronDown size={14}/>}
      </button>
      {open&&<div style={{padding:'12px 14px',display:'flex',flexWrap:'wrap',gap:'8px',background:'#fff'}}>{children}</div>}
    </div>
  );
};

const WorldMap: React.FC = () => (
  <svg viewBox="0 0 1000 500" style={{width:'100%',height:'100%'}} fill={NAVY}>
    <path d="M80,80 Q130,55 175,68 Q215,82 230,125 Q245,168 222,198 Q200,228 165,235 Q130,242 105,218 Q78,195 70,162 Q62,130 80,80Z"/>
    <path d="M162,195 Q185,205 195,228 Q200,250 188,265 Q172,272 158,260 Q142,248 148,232 Q154,216 162,195Z"/>
    <path d="M170,278 Q205,260 238,272 Q268,282 282,318 Q292,348 280,388 Q265,422 238,435 Q210,445 183,428 Q155,412 148,375 Q140,338 152,302 Q162,278 170,278Z"/>
    <path d="M420,68 Q458,55 492,62 Q522,70 532,98 Q542,126 518,148 Q494,165 462,158 Q428,150 418,122 Q408,94 420,68Z"/>
    <path d="M428,168 Q468,155 505,168 Q540,180 548,218 Q558,260 545,315 Q528,365 502,398 Q475,430 445,432 Q412,432 390,405 Q368,376 366,330 Q364,282 378,242 Q392,202 412,185 Q422,172 428,168Z"/>
    <path d="M535,58 Q588,42 648,48 Q710,55 762,78 Q812,100 830,138 Q848,172 832,202 Q816,232 772,242 Q728,252 682,240 Q636,228 600,202 Q564,176 544,146 Q524,116 528,82 Q530,65 535,58Z"/>
    <path d="M722,292 Q762,276 804,288 Q844,300 858,330 Q868,355 852,382 Q836,408 800,412 Q760,416 728,396 Q696,374 694,342 Q692,308 722,292Z"/>
    <path d="M820,118 Q836,110 848,118 Q858,126 854,140 Q850,154 836,156 Q822,158 818,144 Q814,130 820,118Z"/>
  </svg>
);

export const CertificateDesigner: React.FC = () => {
  const {currentUser,language} = useApp();

  useEffect(()=>{
    const id='rbc-cert-fonts';
    if(!document.getElementById(id)){
      const link=document.createElement('link');
      link.id=id; link.rel='stylesheet';
      link.href='https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Great+Vibes&family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap';
      document.head.appendChild(link);
    }
  },[]);

  const fallback = language==='hi'?'विद्यार्थी':language==='gu'?'વિદ્યાર્થી':'Student';

  const [studentName,setStudentName]=useState(currentUser?.name||fallback);
  const [phone,setPhone]=useState('+91 98765 43210');
  const [email,setEmail]=useState(currentUser?.email||'student@rbcacademy.com');
  const [country,setCountry]=useState('India');
  const [courseName,setCourseName]=useState(language==='hi'?'आयात एवं निर्यात मास्टर कोर्स':language==='gu'?'આયાત અને નિકાસ માસ્ટર કોર્સ':'Import & Export Master Course');
  const [certId,setCertId]=useState(()=>{const n=currentUser?.name||fallback;let s=0;for(let i=0;i<n.length;i++)s+=n.charCodeAt(i);return `RBC-2026-${String(s%1000000).padStart(6,'0')}`;});
  const [issueDate,setIssueDate]=useState(new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}));
  const [duration,setDuration]=useState('10+ Hours');
  const [level,setLevel]=useState('Beginner to Advanced');
  const [marks,setMarks]=useState('95');
  const [completion,setCompletion]=useState('100');
  const [directorName,setDirectorName]=useState('Kunal Pawar');
  const [directorTitle,setDirectorTitle]=useState('Academy Director');
  const [founderName,setFounderName]=useState('Prakash Kachchhi');
  const [founderTitle,setFounderTitle]=useState('Founder & CEO');
  const [verifyUrl,setVerifyUrl]=useState('academy.rbcimportandexport.com/verify');

  const handleReset=()=>{
    setStudentName(currentUser?.name||fallback);
    setPhone('+91 98765 43210'); setEmail(currentUser?.email||'student@rbcacademy.com');
    setCountry('India'); setCourseName('Import & Export Master Course');
    setIssueDate(new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}));
    setDuration('10+ Hours'); setLevel('Beginner to Advanced'); setMarks('95'); setCompletion('100');
    setDirectorName('Kunal Pawar'); setDirectorTitle('Academy Director');
    setFounderName('Prakash Kachchhi'); setFounderTitle('Founder & CEO');
    setVerifyUrl('academy.rbcimportandexport.com/verify');
  };

  const iconData = [
    {lbl:'COMPREHENSIVE\nCURRICULUM', d:'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5V4.5z'},
    {lbl:'INDUSTRY\nRELEVANT',       d:'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 0a14.5 14.5 0 0 1 0 20 14.5 14.5 0 0 1 0-20M2 12h20'},
    {lbl:'EXPERT\nINSTRUCTORS',     d:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8'},
    {lbl:'GLOBAL\nPERSPECTIVE',     d:'M18 20V10M12 20V4M6 20v-6'},
  ];

  const Certificate = () => (
    <div className="print-certificate-container" style={{width:'950px',height:'670px',background:CREAM,border:`14px solid ${NAVY}`,position:'relative',boxSizing:'border-box',overflow:'hidden',flexShrink:0,display:'flex',fontFamily:"'Inter','Poppins',sans-serif"}}>
      <div style={{position:'absolute',inset:'18px',border:`1.5px solid ${GOLD}`,pointerEvents:'none',zIndex:3}}/>
      {[
        {top:'22px',left:'22px',transform:'none'} as React.CSSProperties,
        {top:'22px',right:'22px',transform:'scaleX(-1)'} as React.CSSProperties,
        {bottom:'22px',left:'22px',transform:'scaleY(-1)'} as React.CSSProperties,
        {bottom:'22px',right:'22px',transform:'scale(-1,-1)'} as React.CSSProperties,
      ].map((pos,i)=>(
        <svg key={i} width="26" height="26" viewBox="0 0 26 26" style={{position:'absolute',zIndex:4,pointerEvents:'none',...pos}}>
          <path d="M0,26 L0,4 Q0,0 4,0 L26,0" stroke={GOLD} strokeWidth="1.5" fill="none"/>
          <circle cx="4" cy="4" r="2" fill={GOLD}/>
        </svg>
      ))}
      <div style={{position:'absolute',left:'12%',top:'8%',width:'76%',height:'82%',opacity:0.028,zIndex:0,pointerEvents:'none'}}><WorldMap/></div>
      <svg style={{position:'absolute',left:0,top:0,width:'210px',height:'100%',zIndex:1,pointerEvents:'none'}} viewBox="0 0 210 670" preserveAspectRatio="none">
        <defs><linearGradient id="npg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#091d3a"/><stop offset="100%" stopColor={NAVY}/></linearGradient></defs>
        <polygon points="0,0 204,0 114,240 114,430 204,670 0,670" fill="url(#npg)"/>
        <polyline points="204,0 114,240 114,430 204,670" stroke={GOLD} strokeWidth="2.5" fill="none"/>
        <polyline points="208,0 119,244 119,426 208,670" stroke={ORANGE} strokeWidth="1.5" fill="none"/>
        <line x1="0" y1="335" x2="112" y2="335" stroke="#D4AF3722" strokeWidth="0.5"/>
        <g stroke="rgba(255,255,255,0.055)" strokeWidth="1.5" fill="none" transform="translate(8,574)">
          <path d="M5,30 L80,30 L90,18 L18,18 Z"/><rect x="35" y="5" width="9" height="13"/><rect x="50" y="9" width="9" height="9"/>
          <line x1="0" y1="30" x2="95" y2="30" stroke="rgba(255,255,255,0.09)" strokeWidth="2"/>
        </g>
      </svg>
      <svg style={{position:'absolute',right:0,bottom:0,width:'195px',height:'195px',zIndex:1,pointerEvents:'none'}} viewBox="0 0 195 195">
        <polygon points="195,195 22,195 195,22" fill={NAVY}/>
        <line x1="22" y1="195" x2="195" y2="22" stroke={GOLD} strokeWidth="2.5"/>
        <line x1="14" y1="195" x2="195" y2="14" stroke={ORANGE} strokeWidth="1.5"/>
        <g stroke="rgba(255,255,255,0.055)" strokeWidth="1.5" fill="none" transform="translate(108,108)">
          <line x1="28" y1="52" x2="28" y2="8"/><line x1="0" y1="15" x2="56" y2="15"/>
          <line x1="0" y1="15" x2="28" y2="52"/><line x1="56" y1="15" x2="28" y2="52"/>
          <rect x="22" y="52" width="12" height="10"/>
        </g>
      </svg>
      <svg style={{position:'absolute',left:'26px',top:'26px',width:'106px',height:'154px',zIndex:10}} viewBox="0 0 106 154">
        <defs>
          <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FCD34D"/><stop offset="100%" stopColor="#B45309"/></linearGradient>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FEF08A"/><stop offset="50%" stopColor="#FACC15"/><stop offset="100%" stopColor="#CA8A04"/></linearGradient>
        </defs>
        <polygon points="30,57 16,126 40,110 64,126 50,57" fill="#92400E" opacity="0.9"/>
        <polygon points="46,57 32,130 56,114 80,130 66,57" fill="url(#rg)"/>
        <circle cx="48" cy="51" r="41" fill="url(#bg)" stroke="#fff" strokeWidth="2.5"/>
        <circle cx="48" cy="51" r="35" fill="none" stroke="#78350F" strokeWidth="1.5" strokeDasharray="3,3"/>
        <text x="48" y="42" fill="#451a03" fontSize="8.5" fontWeight="900" textAnchor="middle" fontFamily="Georgia,serif">RBC</text>
        <text x="48" y="54" fill="#451a03" fontSize="8.5" fontWeight="900" textAnchor="middle" fontFamily="Georgia,serif">ACADEMY</text>
        <text x="48" y="65" fill="#78350f" fontSize="8" textAnchor="middle">&#9733;&#9733;&#9733;&#9733;&#9733;</text>
      </svg>
      <div style={{position:'absolute',left:0,top:'206px',bottom:'182px',width:'136px',zIndex:5,padding:'6px 8px 6px 20px',color:'#fff',display:'flex',flexDirection:'column',gap:'13px',justifyContent:'center'}}>
        {[
          {icon:<><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>, lbl:'DATE OF ISSUE', val:issueDate},
          {icon:<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>, lbl:'DURATION', val:duration},
          {icon:<><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>, lbl:'LEVEL', val:level},
          {icon:<polyline points="20 6 9 17 4 12"/>, lbl:'SCORE', val:`${marks}% · ${completion}%`},
        ].map((it,i)=>(
          <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'7px'}}>
            <div style={{width:'24px',height:'24px',borderRadius:'50%',border:`1px solid ${GOLD}`,display:'flex',alignItems:'center',justifyContent:'center',color:GOLD,flexShrink:0,marginTop:'1px'}}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">{it.icon}</svg>
            </div>
            <div>
              <div style={{fontSize:'5.5px',color:'#D4AF3799',textTransform:'uppercase',letterSpacing:'0.8px',fontWeight:'700',fontFamily:"'Poppins',sans-serif"}}>{it.lbl}</div>
              <div style={{fontSize:'8px',fontWeight:'700',color:'#fff',lineHeight:'1.3',marginTop:'1px',fontFamily:"'Inter',sans-serif"}}>{it.val}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{position:'absolute',right:'22px',top:'50%',transform:'translateY(-50%)',width:'84px',display:'flex',flexDirection:'column',justifyContent:'space-around',height:'68%',zIndex:4}}>
        {iconData.map((item,i)=>(
          <div key={i} style={{textAlign:'center'}}>
            <div style={{width:'34px',height:'34px',borderRadius:'50%',background:NAVY,display:'flex',alignItems:'center',justifyContent:'center',color:GOLD,margin:'0 auto 4px',boxShadow:'0 3px 10px rgba(16,42,86,0.25)'}}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={item.d}/></svg>
            </div>
            <div style={{fontSize:'6px',fontWeight:'700',color:NAVY,textTransform:'uppercase',letterSpacing:'0.4px',lineHeight:'1.35',whiteSpace:'pre-line',fontFamily:"'Poppins',sans-serif"}}>{item.lbl}</div>
          </div>
        ))}
      </div>
      <div style={{marginLeft:'152px',marginRight:'108px',display:'flex',flexDirection:'column',height:'100%',boxSizing:'border-box',padding:'16px 22px 14px',zIndex:2,position:'relative'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'4px'}}>
          <div style={{width:'92px'}}/>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'1px'}}>
            <img src={logoEmblem} alt="RBC" style={{width:'50px',height:'50px',objectFit:'contain'}}/>
            <div style={{fontSize:'27px',fontWeight:'900',color:NAVY,letterSpacing:'-0.5px',lineHeight:'1',fontFamily:"'Inter',sans-serif"}}>rbc</div>
            <div style={{fontSize:'10px',fontWeight:'800',letterSpacing:'0.3px',lineHeight:'1.2',fontFamily:"'Inter',sans-serif"}}>
              <span style={{color:ORANGE}}>I</span><span style={{color:NAVY}}>mport & </span><span style={{color:ORANGE}}>E</span><span style={{color:NAVY}}>xport</span>
            </div>
            <div style={{fontSize:'6.5px',color:NAVY,fontWeight:'700',letterSpacing:'0.8px',fontFamily:"'Poppins',sans-serif"}}>Since <span style={{color:ORANGE}}>2011</span></div>
          </div>
          <div style={{textAlign:'right',width:'92px'}}>
            <div style={{fontSize:'6px',color:'#94a3b8',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.8px',fontFamily:"'Poppins',sans-serif"}}>Certificate ID</div>
            <div style={{fontSize:'8.5px',fontWeight:'800',color:NAVY,letterSpacing:'0.5px',fontFamily:"'Inter',sans-serif",lineHeight:'1.3'}}>{certId}</div>
          </div>
        </div>
        <div style={{textAlign:'center',borderBottom:`1px solid ${GOLD}44`,paddingBottom:'5px',marginBottom:'6px'}}>
          <div style={{fontSize:'9px',fontWeight:'700',color:NAVY,letterSpacing:'2.5px',textTransform:'uppercase',fontFamily:"'Cinzel','Georgia',serif"}}>RBC Import &amp; Export Academy</div>
          <div style={{fontSize:'7px',color:ORANGE,letterSpacing:'1.8px',fontStyle:'italic',marginTop:'2px',fontFamily:"'Poppins',sans-serif"}}>Learn &bull; Trade &bull; Grow Globally</div>
        </div>
        <div style={{textAlign:'center',flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}}>
          <div style={{fontSize:'36px',fontWeight:'900',color:NAVY,letterSpacing:'5px',lineHeight:'1',fontFamily:"'Cinzel','Georgia',serif",marginBottom:'2px'}}>CERTIFICATE</div>
          <div style={{fontSize:'15px',fontWeight:'700',color:GOLD,letterSpacing:'4px',textTransform:'uppercase',fontFamily:"'Playfair Display','Georgia',serif",marginBottom:'8px'}}>of Completion</div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',marginBottom:'6px'}}>
            <div style={{flex:1,height:'1px',background:`linear-gradient(to right,transparent,${GOLD})`}}/>
            <svg width="8" height="8" viewBox="0 0 10 10"><polygon points="5,0 7,3 10,4 7,7 5,10 3,7 0,4 3,3" fill={GOLD}/></svg>
            <span style={{fontSize:'7px',letterSpacing:'2px',color:'#64748b',fontWeight:'700',fontFamily:"'Poppins',sans-serif"}}>THIS CERTIFICATE IS PROUDLY PRESENTED TO</span>
            <svg width="8" height="8" viewBox="0 0 10 10"><polygon points="5,0 7,3 10,4 7,7 5,10 3,7 0,4 3,3" fill={GOLD}/></svg>
            <div style={{flex:1,height:'1px',background:`linear-gradient(to left,transparent,${GOLD})`}}/>
          </div>
          <div style={{fontSize:'52px',color:NAVY,lineHeight:'1.05',fontFamily:"'Great Vibes','Georgia',cursive",marginBottom:'2px',letterSpacing:'1px'}}>{studentName}</div>
          <div style={{fontSize:'7px',color:'#64748b',letterSpacing:'0.5px',fontFamily:"'Poppins',sans-serif",marginBottom:'5px'}}>{[country,email,phone].filter(Boolean).join(' · ')}</div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'10px',marginBottom:'6px'}}>
            <div style={{width:'90px',height:'1px',background:GOLD}}/>
            <svg width="12" height="12" viewBox="0 0 12 12"><polygon points="6,0 12,6 6,12 0,6" fill={GOLD}/></svg>
            <div style={{width:'90px',height:'1px',background:GOLD}}/>
          </div>
          <div style={{fontSize:'9.5px',color:'#475569',lineHeight:'1.55',margin:'0 auto 5px',maxWidth:'440px',fontFamily:"'Inter',sans-serif"}}>For successfully completing all learning modules, practice quizzes, video lectures, assignments, and final assessment of the</div>
          <div style={{background:NAVY,color:'#fff',padding:'9px 36px',borderRadius:'2px',display:'inline-block',fontWeight:'800',fontSize:'12px',letterSpacing:'2px',border:`1.5px solid ${GOLD}`,margin:'0 auto 5px',position:'relative',fontFamily:"'Cinzel','Georgia',serif",whiteSpace:'nowrap'}}>
            <svg style={{position:'absolute',right:'100%',top:0,height:'100%',width:'13px'}} viewBox="0 0 13 40" preserveAspectRatio="none">
              <polygon points="13,0 0,20 13,40" fill={NAVY}/><polyline points="13,0 0,20 13,40" stroke={GOLD} strokeWidth="2" fill="none"/>
            </svg>
            <svg style={{position:'absolute',left:'100%',top:0,height:'100%',width:'13px'}} viewBox="0 0 13 40" preserveAspectRatio="none">
              <polygon points="0,0 13,20 0,40" fill={NAVY}/><polyline points="0,0 13,20 0,40" stroke={GOLD} strokeWidth="2" fill="none"/>
            </svg>
            {courseName.toUpperCase()}
          </div>
          <div style={{fontSize:'7px',color:'#94a3b8',fontStyle:'italic',maxWidth:'440px',margin:'0 auto',lineHeight:'1.5',fontFamily:"'Poppins',sans-serif"}}>International Trade &middot; Import &middot; Export &middot; Shipping &middot; Logistics &middot; Documentation &middot; Customs &middot; Payment Terms &middot; Global Business</div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginTop:'4px'}}>
          <div style={{width:'144px',textAlign:'center'}}>
            <div style={{fontFamily:"'Great Vibes',cursive",fontSize:'22px',color:'#1e293b',height:'24px',lineHeight:'24px'}}>{directorName}</div>
            <div style={{borderTop:`1.5px solid ${NAVY}`,paddingTop:'4px',marginTop:'5px'}}>
              <div style={{fontSize:'8px',fontWeight:'800',color:NAVY,fontFamily:"'Poppins',sans-serif",letterSpacing:'0.5px'}}>{directorName.toUpperCase()}</div>
              <div style={{fontSize:'7px',color:'#64748b',fontFamily:"'Poppins',sans-serif"}}>{directorTitle}</div>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'5px',position:'relative',bottom:'-2px'}}>
            <svg width="72" height="72" viewBox="0 0 100 100">
              <defs><linearGradient id="sg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FCD34D"/><stop offset="100%" stopColor="#B45309"/></linearGradient></defs>
              <path d="M50 2 L54 34 L86 10 L63 42 L96 50 L63 58 L86 90 L54 66 L50 98 L46 66 L14 90 L37 58 L4 50 L37 42 L14 10 L46 34 Z" fill="url(#sg2)"/>
              <circle cx="50" cy="50" r="36" fill={NAVY}/>
              <circle cx="50" cy="50" r="31" fill="none" stroke={GOLD} strokeWidth="1.5" strokeDasharray="3,3"/>
              <text x="50" y="43" fill={GOLD} fontSize="6.5" fontWeight="900" textAnchor="middle" fontFamily="Georgia,serif">COMPLETED</text>
              <text x="50" y="52" fill={GOLD} fontSize="6.5" fontWeight="900" textAnchor="middle" fontFamily="Georgia,serif">WITH</text>
              <text x="50" y="61" fill={GOLD} fontSize="6.5" fontWeight="900" textAnchor="middle" fontFamily="Georgia,serif">EXCELLENCE</text>
            </svg>
            <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
              <svg width="28" height="28" viewBox="0 0 25 25" style={{background:'#fff',padding:'2px',border:'1px solid #e2e8f0',flexShrink:0}}>
                <path d="M0 0h7v7H0zm1 1v5h5V1zm10 0h3v3h-3zm3 0h4v4h-4zM0 10h3v3H0zm5 0h3v3H5zm6 0h3v3h-3zm4 0h4v4h-4zm-8 4v4H0v-4zm4 0h3v3H7zm11 0h3v3h-3zM0 18h7v7H0zm1 1v5h5v-5zm10 0h3v3h-3z" fill={NAVY}/>
              </svg>
              <div style={{fontSize:'5px',color:'#64748b',lineHeight:'1.5',textAlign:'left',fontFamily:"'Poppins',sans-serif"}}>
                <span style={{fontWeight:'900',color:NAVY,display:'block',textTransform:'uppercase',letterSpacing:'0.5px'}}>Verify Certificate</span>
                <span>{verifyUrl}</span>
              </div>
            </div>
          </div>
          <div style={{width:'144px',textAlign:'center'}}>
            <div style={{fontFamily:"'Great Vibes',cursive",fontSize:'22px',color:'#1e293b',height:'24px',lineHeight:'24px'}}>{founderName}</div>
            <div style={{borderTop:`1.5px solid ${NAVY}`,paddingTop:'4px',marginTop:'5px'}}>
              <div style={{fontSize:'8px',fontWeight:'800',color:NAVY,fontFamily:"'Poppins',sans-serif",letterSpacing:'0.5px'}}>{founderName.toUpperCase()}</div>
              <div style={{fontSize:'7px',color:'#64748b',fontFamily:"'Poppins',sans-serif"}}>{founderTitle}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{display:'flex',height:'100%',overflow:'hidden',fontFamily:"'Inter',sans-serif"}}>
      <style dangerouslySetInnerHTML={{__html:`
        @media print{
          .cert-form-panel,.cert-action-bar{display:none!important;}
          .cert-preview-bg{position:fixed!important;inset:0!important;display:flex!important;align-items:center!important;justify-content:center!important;background:white!important;padding:0!important;z-index:9999999!important;}
          .cert-scale-wrap{transform:scale(1)!important;transform-origin:center center!important;}
          @page{size:landscape;margin:0;}
        }
      `}}/>
      <div className="cert-form-panel" style={{width:'298px',minWidth:'298px',height:'100%',overflowY:'auto',background:'#f8fafc',borderRight:'1px solid #e2e8f0',padding:'16px 14px',boxSizing:'border-box'}}>
        <div style={{marginBottom:'14px',paddingBottom:'12px',borderBottom:'1px solid #e2e8f0'}}>
          <div style={{fontSize:'14px',fontWeight:'800',color:NAVY}}>✦ Certificate Designer</div>
          <div style={{fontSize:'11px',color:'#64748b',marginTop:'2px'}}>Edit fields — preview updates live</div>
        </div>
        <Section title="Personal Info" icon="👤">
          <Field label="Student Name"   value={studentName} onChange={setStudentName}/>
          <Field label="Phone"          value={phone}       onChange={setPhone}       half/>
          <Field label="Country"        value={country}     onChange={setCountry}     half/>
          <Field label="Email"          value={email}       onChange={setEmail}/>
        </Section>
        <Section title="Course Info" icon="📚">
          <Field label="Course Name"    value={courseName}  onChange={setCourseName}/>
          <Field label="Certificate ID" value={certId}      onChange={setCertId}/>
          <Field label="Issue Date"     value={issueDate}   onChange={setIssueDate}  half/>
          <Field label="Duration"       value={duration}    onChange={setDuration}   half/>
          <Field label="Level"          value={level}       onChange={setLevel}/>
          <Field label="Marks (%)"      value={marks}       onChange={setMarks}      half/>
          <Field label="Completion (%)" value={completion}  onChange={setCompletion} half/>
        </Section>
        <Section title="Signatories" icon="✍️">
          <Field label="Director Name"  value={directorName}  onChange={setDirectorName}  half/>
          <Field label="Director Title" value={directorTitle} onChange={setDirectorTitle} half/>
          <Field label="Founder Name"   value={founderName}   onChange={setFounderName}   half/>
          <Field label="Founder Title"  value={founderTitle}  onChange={setFounderTitle}  half/>
        </Section>
        <Section title="Verification" icon="🔐">
          <Field label="Verify URL" value={verifyUrl} onChange={setVerifyUrl}/>
        </Section>
        <div className="cert-action-bar" style={{display:'flex',gap:'8px',marginTop:'6px'}}>
          <button onClick={()=>window.print()} style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',padding:'11px',borderRadius:'9px',border:'none',background:`linear-gradient(135deg,${NAVY},#1a3d70)`,color:'#fff',fontWeight:'700',fontSize:'13px',cursor:'pointer',boxShadow:`0 4px 14px ${NAVY}44`}}>
            <Printer size={15}/> Print / PDF
          </button>
          <button onClick={handleReset} title="Reset" style={{width:'42px',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'9px',border:'1.5px solid #e2e8f0',background:'#fff',color:'#64748b',cursor:'pointer'}}>
            <RotateCcw size={14}/>
          </button>
        </div>
        <div style={{marginTop:'10px',padding:'10px 12px',borderRadius:'8px',background:`${GOLD}18`,border:`1px solid ${GOLD}44`,fontSize:'10px',color:'#92400e',lineHeight:'1.5'}}>
          <strong>Export:</strong> Print &rarr; Save as PDF for print-ready A4 landscape output. All fields editable &amp; update live.
        </div>
      </div>
      <div className="cert-preview-bg" style={{flex:1,overflowX:'auto',overflowY:'auto',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px',background:'#dde1e7',boxSizing:'border-box'}}>
        <div className="cert-scale-wrap" style={{transform:'scale(0.78)',transformOrigin:'center center',boxShadow:'0 30px 80px rgba(0,0,0,0.35)',borderRadius:'2px'}}>
          <Certificate/>
        </div>
      </div>
    </div>
  );
};
