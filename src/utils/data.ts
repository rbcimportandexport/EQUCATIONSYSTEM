export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  language: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
}

export interface DiagramNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'start' | 'process' | 'decision' | 'end';
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
}

export interface FlowchartData {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

export interface QuizQuestion {
  id: string;
  type: 'mcq' | 'true-false' | 'fill-blank' | 'multi-answer';
  question: string;
  options?: string[];
  correctAnswers: string[];
  explanation: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface DownloadOption {
  title: string;
  fileUrl: string;
  size: string;
  type: string;
}

export interface ImageItem {
  url: string;
  caption: string;
  highResUrl: string;
}

export interface VideoItem {
  videoUrl: string;
  thumbnail: string;
  duration: number; // in seconds
}

export interface PDFItem {
  pdfUrl: string;
  title: string;
  totalPages: number;
  size: string;
  mockPagesText: string[];
}

export interface LessonContent {
  definition: string;
  whyImportant: string;
  businessExample: string;
  images: ImageItem[];
  video: VideoItem;
  pdf: PDFItem;
  downloadOption: DownloadOption;
  relatedTopics: string[];
  faqs: FAQItem[];
  commonMistakes: string[];
  practicalTips: string[];
  summary: string;
  quiz: QuizQuestion[];
  diagram?: FlowchartData;
  codeBlock?: {
    language: string;
    code: string;
  };
  objectives: string[];
  writtenExplanation: string;
  importantNotes: string[];
  keyPoints: string[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  duration: number; // in minutes
  order: number;
  content: LessonContent;
}

export interface UserProgress {
  lessonId: string;
  completed: boolean;
  watchTime: number; // in seconds
  readingProgress: number; // 0 - 100
  quizScores: { [questionId: string]: number };
}

export interface Bookmark {
  id: string;
  type: 'lesson' | 'pdf' | 'video' | 'note' | 'image';
  title: string;
  courseId: string;
  moduleId?: string;
  lessonId: string;
  refData?: string; // e.g. page number or timestamp
}

export interface Download {
  id: string;
  type: 'video' | 'pdf' | 'note';
  title: string;
  size: string;
  url: string;
  lessonId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  progressPercentage: number;
}

export interface Certificate {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  courseTitle: string;
  issueDate: string;
}

// Course Seeds
export const initialCourses: Course[] = [
  {
    id: 'import-export-master',
    title: 'Import & Export Master Course',
    description: 'Learn the end-to-end process of global sourcing, weights and dimensions, logistics containerization, shipping lines, Incoterms 2020, customs clearance, and risk management.',
    thumbnail: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
    category: 'International Business',
    level: 'Intermediate',
    language: 'English'
  }
];

// 15 Modules Seeds
export const initialModules: Module[] = [
  { id: 'mod-1', courseId: 'import-export-master', title: 'Basic Import Export Terms', description: 'Master standard terminology of players and processes in international trade.', order: 1 },
  { id: 'mod-2', courseId: 'import-export-master', title: 'Product Terms', description: 'Understand standard manufacturing, pricing models, and private labeling terms.', order: 2 },
  { id: 'mod-3', courseId: 'import-export-master', title: 'Weight & Measurement', description: 'Analyze volumetric properties of products, cartons, and loading pallets.', order: 3 },
  { id: 'mod-4', courseId: 'import-export-master', title: 'Container Terms', description: 'Master cargo stuffing, planning, seals, and standard container specifications.', order: 4 },
  { id: 'mod-5', courseId: 'import-export-master', title: 'Shipping Terms', description: 'Understand freight routing, vessel assignments, transit schedules, and vessel hierarchies.', order: 5 },
  { id: 'mod-6', courseId: 'import-export-master', title: 'Incoterms', description: 'A deep dive into Incoterms 2020 frameworks from EXW to DDP rules.', order: 6 },
  { id: 'mod-7', courseId: 'import-export-master', title: 'Port & Logistics', description: 'Examine warehousing operations, bonded facilities, last mile distribution, and ICDs.', order: 7 },
  { id: 'mod-8', courseId: 'import-export-master', title: 'Documentation', description: 'Master commercial documents, packing configurations, shipping bills, and certificates.', order: 8 },
  { id: 'mod-9', courseId: 'import-export-master', title: 'Customs', description: 'Examine duty structures, HSN classification codes, custom house brokers, and compliance.', order: 9 },
  { id: 'mod-10', courseId: 'import-export-master', title: 'Payment Terms', description: 'Master international payment options, telegraphic transfers, bank charges, and SWIFT.', order: 10 },
  { id: 'mod-11', courseId: 'import-export-master', title: 'Freight Charges', description: 'Break down local terminal handling, demurrage, detention, and terminal fees.', order: 11 },
  { id: 'mod-12', courseId: 'import-export-master', title: 'Quality & Inspection', description: 'Understand pre-shipment checks, random audits, defect rate tolerances, and quality control.', order: 12 },
  { id: 'mod-13', courseId: 'import-export-master', title: 'Business Operations', description: 'Sourcing funnels: from inquiry triggers to orders, follow-ups, and confirmations.', order: 13 },
  { id: 'mod-14', courseId: 'import-export-master', title: 'Risk Management', description: 'Manage delay claims, force majeure, short shipments, and damage resolution.', order: 14 },
  { id: 'mod-15', courseId: 'import-export-master', title: 'RBC Import & Export Internal Process', description: 'Internal operating procedures: supplier audit, payment execution, and fulfillment tracking.', order: 15 }
];

// No seed users — only real registered users will appear
export const initialUsers: User[] = [];


// Static map of syllabus lessons per module
export const moduleLessonsMap: { [moduleId: string]: string[] } = {
  'mod-1': ['What is Import?', 'What is Export?', 'What is International Trade?', 'What is Supplier?', 'What is Buyer?', 'What is Manufacturer?', 'What is Trading Company?', 'What is Factory?', 'What is Wholesaler?', 'What is Retailer?'],
  'mod-2': ['MOQ', 'SKU', 'Model Number', 'Product Specification', 'Product Sample', 'OEM', 'ODM', 'Private Label', 'Brand', 'Packaging'],
  'mod-3': ['CBM', 'Gross Weight', 'Net Weight', 'Volume Weight', 'Carton Size', 'Master Carton', 'Pallet', 'Loading Capacity'],
  'mod-4': ['FCL', 'LCL', '20FT Container', '40FT Container', '40HQ Container', 'Stuffing', 'De-Stuffing', 'Container Planning', 'Container Loading', 'Container Seal'],
  'mod-5': ['Freight', 'Sea Freight', 'Air Freight', 'Courier Shipment', 'Transit Time', 'ETD', 'ETA', 'Vessel', 'Voyage', 'Mother Vessel', 'Feeder Vessel'],
  'mod-6': ['EXW', 'FOB', 'FCA', 'CIF', 'CFR', 'DDP', 'DAP', 'CIP', 'CPT'],
  'mod-7': ['POL', 'POD', 'ICD', 'CFS', 'Warehouse', 'Bonded Warehouse', 'Last Mile Delivery', 'Door Delivery'],
  'mod-8': ['Proforma Invoice', 'Commercial Invoice', 'Packing List', 'Bill of Lading', 'Air Way Bill', 'Delivery Order', 'Shipping Bill', 'Bill of Entry', 'Certificate of Origin', 'Insurance Certificate', 'Fumigation Certificate', 'Inspection Certificate'],
  'mod-9': ['Customs', 'Customs Clearance', 'CHA', 'HSN Code', 'Customs Duty', 'BCD', 'SWS', 'IGST', 'Anti-Dumping Duty', 'BIS', 'CDSCO', 'FSSAI'],
  'mod-10': ['Advance Payment', 'Balance Payment', 'Letter of Credit', 'TT Payment', 'Telegraphic Transfer', 'SWIFT', 'Bank Charges', 'Currency Exchange'],
  'mod-11': ['Ocean Freight', 'Local Charges', 'THC', 'CFS Charges', 'DO Charges', 'Detention', 'Demurrage', 'Port Charges', 'Documentation Charges'],
  'mod-12': ['Quality Control', 'Quality Assurance', 'Pre-Shipment Inspection', 'Random Inspection', 'Defect Rate', 'Product Testing', 'Compliance'],
  'mod-13': ['Lead', 'Inquiry', 'Quotation', 'Purchase Order', 'Sales Order', 'Follow-up', 'Order Confirmation', 'Production Timeline', 'Dispatch', 'Delivery Confirmation'],
  'mod-14': ['Cargo Insurance', 'Force Majeure', 'Delay', 'Damage Claim', 'Shortage', 'Misdeclaration', 'Dispute Resolution'],
  'mod-15': ['Inquiry Form', 'Product Approval', 'Supplier Verification', 'Quotation Approval', 'Purchase Process', 'Payment Process', 'Production Tracking', 'Shipment Tracking', 'Customs Process', 'Warehouse Process', 'Customer Delivery Process', 'After Sales Support']
};

// High-fidelity content override generator
const getHighFidelityContent = (title: string, lessonId: string): LessonContent | null => {
  if (title === 'What is Import?') {
    return {
      definition: 'Import refers to the act of bringing goods, services, or capital from a foreign country into one’s own home country for sale, manufacturing, or distribution.',
      whyImportant: 'Importing allows businesses to access raw materials, components, or finished products that are cheaper, unavailable locally, or of superior quality abroad, maintaining high competitiveness.',
      businessExample: 'An electronics brand in Chicago imports microchips from a supplier in Hsinchu, Taiwan, because those components are not manufactured locally to the required specification.',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure 1.1: Logistics container shipyard processing incoming cargo imports.',
          highResUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 653
      },
      pdf: {
        pdfUrl: '#',
        title: 'Introduction to Sourcing and Imports.pdf',
        totalPages: 2,
        size: '1.4 MB',
        mockPagesText: [
          'Page 1: Global sourcing strategies, tariff structures, and landed cost models. Landing costs include sea freight, port handling, and custom duty fees.',
          'Page 2: Regulatory compliance, import licenses, and custom declaration protocols.'
        ]
      },
      downloadOption: {
        title: 'Import Checklist Excel Spreadsheet',
        fileUrl: '#',
        size: '120 KB',
        type: 'xls'
      },
      relatedTopics: ['What is Export?', 'Customs Duty', 'HSN Code'],
      faqs: [
        { question: 'Do I need a license to import?', answer: 'Yes, most jurisdictions require an import license or corporate ID registration, such as an IEC number in India or an EIN in the United States.' },
        { question: 'What is a landed cost?', answer: 'Landed cost is the total price of a product once it has arrived at the buyer’s doorstep, including purchase price, freight, customs clearance, duties, and local logistics.' }
      ],
      commonMistakes: [
        'Calculating profits based only on the supplier’s FOB invoice price without factoring in custom duty taxes and sea freight charges.',
        'Importing branded or regulated items without checking local quality certificates (like BIS or FDA).'
      ],
      practicalTips: [
        'Always request product samples to verify dimensions and quality before sending deposit wire payments.',
        'Request the supplier to provide the HSN code early to check standard custom duty rates.'
      ],
      summary: 'Importing involves bringing foreign goods into a domestic market. Understanding landed costs, trade compliance, and sourcing safeguards is mandatory to protect operating margins.',
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'What constitutes a "Landed Cost" in importing?',
          options: [
            'Only the price paid to the foreign supplier.',
            'The total cost of goods + freight + customs clearances + duties + domestic transit.',
            'Only the port terminal charges.',
            'The retail shelf price of the product.'
          ],
          correctAnswers: ['1'],
          explanation: 'Landed Cost includes all costs associated with bringing a product from the factory floor to its final destination warehouse.'
        }
      ],
      objectives: ['Define Import rules.', 'Understand landing costs.'],
      writtenExplanation: 'Importing involves bringing foreign goods into a domestic market. Sourcing safeguards and landed cost calculations must be fully analyzed.',
      importantNotes: ['Custom duty rates vary by HSN code.'],
      keyPoints: ['Importing feeds domestic needs.', 'Check HSN details early.']
    };
  }

  if (title === 'FOB') {
    return {
      definition: 'Free On Board (FOB) is an international commercial term (Incoterm) indicating that the seller is responsible for delivering the goods to a port and loading them onto the vessel nominated by the buyer.',
      whyImportant: 'FOB clearly defines the point of risk transfer. Once the goods pass the ship’s rail at the port of origin, the risk of loss or damage transfers from the seller to the buyer, who also pays all freight costs.',
      businessExample: 'A buyer in London orders textiles under "FOB Shanghai" terms. The Shanghai factory pays local trucking and customs export clearance fees. Once loaded onto the container ship in Shanghai, the London buyer pays the ocean freight and assumes all risks.',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure 6.1: Gantry crane loading container cargo onto a vessel under FOB terms.',
          highResUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=600&q=80',
        duration: 653
      },
      pdf: {
        pdfUrl: '#',
        title: 'Incoterms 2020 Quick Reference.pdf',
        totalPages: 2,
        size: '950 KB',
        mockPagesText: [
          'Page 1: Comparison of EXW, FOB, and CIF rules. FOB requires the seller to clear goods for export but places no ocean freight liabilities on them.',
          'Page 2: Risk transfer thresholds and bill of lading shipping references.'
        ]
      },
      downloadOption: {
        title: 'Incoterms Risk Allocation PDF Diagram',
        fileUrl: '#',
        size: '420 KB',
        type: 'pdf'
      },
      relatedTopics: ['EXW', 'CIF', 'Bill of Lading'],
      faqs: [
        { question: 'Who pays the ocean freight under FOB?', answer: 'The buyer is responsible for choosing the shipping line, booking the vessel, and paying the ocean freight from the origin port to the port of destination.' },
        { question: 'Can FOB be used for air freight?', answer: 'No, under Incoterms 2020, FOB is strictly reserved for sea or inland waterway transport. For air cargo, FCA (Free Carrier) should be used instead.' }
      ],
      commonMistakes: [
        'Using FOB for air shipments. Air shipping lines do not have a "ship’s rail" loading deck, which causes insurance liability confusion.',
        'Failing to verify when the local port handling charges (THC) at origin are paid by the seller, resulting in unexpected vendor disputes.'
      ],
      practicalTips: [
        'Always ensure your sales agreement specifies the exact port, e.g., "FOB Ningbo Port, China" rather than just "FOB China".',
        'Book your own forwarder under FOB terms to maintain full control over the shipping timeline and destination clearances.'
      ],
      summary: 'Under FOB (Free On Board), the seller bears all risks and costs up to loading the cargo onto the vessel at the port of origin. Beyond that, the buyer assumes responsibility for ocean transit and destination costs.',
      diagram: {
        nodes: [
          { id: '1', label: 'Seller Factory', x: 20, y: 50, type: 'start' },
          { id: '2', label: 'Local Port Transit', x: 180, y: 50, type: 'process' },
          { id: '3', label: 'Vessel Deck', x: 360, y: 50, type: 'decision' },
          { id: '4', label: 'Ocean Transit', x: 540, y: 50, type: 'process' },
          { id: '5', label: 'Buyer Port', x: 720, y: 50, type: 'end' }
        ],
        edges: [
          { from: '1', to: '2', label: 'Seller Risk' },
          { from: '2', to: '3', label: 'Passes Ship Rail' },
          { from: '3', to: '4', label: 'Buyer Risk Begins' },
          { from: '4', to: '5' }
        ]
      },
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Under FOB terms, at what exact point does risk transfer from the seller to the buyer?',
          options: [
            'When cargo leaves the seller’s warehouse.',
            'When cargo is loaded on board the vessel at the origin port.',
            'When cargo arrives at the destination port.',
            'When cargo is customs cleared in the buyer’s country.'
          ],
          correctAnswers: ['1'],
          explanation: 'FOB (Free On Board) dictates that risk passes from seller to buyer as soon as the goods are loaded on board the designated vessel at the specified port of shipment.'
        }
      ],
      objectives: ['Analyze FOB Incoterms.', 'Assess risk transfer boundaries.'],
      writtenExplanation: 'FOB (Free On Board) outlines risk and freight cost transfers. The seller covers costs until loading onto the container ship.',
      importantNotes: ['FOB is for sea transit only.'],
      keyPoints: ['Risk transfer passes at loaded origin.', 'Buyer books the vessel.']
    };
  }

  if (title === 'Supplier Verification') {
    return {
      definition: 'Supplier Verification is the formal process of vetting, auditing, and validating a foreign manufacturer’s legality, capabilities, quality standards, and financial health prior to placing orders.',
      whyImportant: 'It mitigates global supply risks, preventing financial fraud, poor production quality, cargo delays, and legal issues (such as child labor or chemical compliance violations).',
      businessExample: 'RBC Imports hires a local third-party inspector in Ningbo, China, to conduct an on-site factory audit, check their business license, verify ISO certifications, and inspect manufacturing machinery before paying a $20,000 deposit.',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure 15.1: Third-party auditor verifying factory machinery operations.',
          highResUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
        duration: 653
      },
      pdf: {
        pdfUrl: '#',
        title: 'Supplier Audit Questionnaire template.pdf',
        totalPages: 2,
        size: '1.2 MB',
        mockPagesText: [
          'Page 1: General company information audit. Legal representative verification. Checking bank account details to match company name exactly.',
          'Page 2: Machinery logs, quality control staff metrics, and social compliance checklists.'
        ]
      },
      downloadOption: {
        title: 'Supplier Vetting Checklist Excel',
        fileUrl: '#',
        size: '145 KB',
        type: 'xls'
      },
      relatedTopics: ['Product Approval', 'Quotation Approval', 'Quality Control'],
      faqs: [
        { question: 'Can I verify a supplier online without visiting?', answer: 'Yes, you can check corporate databases, trade registries, and hire third-party inspection firms (like SGS or QIMA) to conduct local factory audits for $200–$300.' },
        { question: 'What is the biggest red flag during verification?', answer: 'A mismatch between the supplier’s company name on their business license and the name on their corporate bank account for payment routing.' }
      ],
      commonMistakes: [
        'Paying deposits into a personal bank account instead of a registered corporate business account.',
        'Relying solely on high Alibaba review ratings without checking factory compliance documents.'
      ],
      practicalTips: [
        'Always conduct a live video call to see the factory floor and inventory warehouse.',
        'Request references of existing buyers in your country to verify their service history.'
      ],
      summary: 'Vetting suppliers through audits, banking checks, and machinery verification prevents financial losses and ensures reliable production and logistics operations.',
      diagram: {
        nodes: [
          { id: '1', label: 'Company Profile Check', x: 20, y: 50, type: 'start' },
          { id: '2', label: 'Verify Bank Account Name', x: 180, y: 50, type: 'process' },
          { id: '3', label: 'Does Name Match?', x: 360, y: 50, type: 'decision' },
          { id: '4', label: 'Approve Supplier', x: 540, y: 50, type: 'end' },
          { id: '5', label: 'Flag & Reject', x: 360, y: 170, type: 'end' }
        ],
        edges: [
          { from: '1', to: '2' },
          { from: '2', to: '3' },
          { from: '3', to: '4', label: 'Yes' },
          { from: '3', to: '5', label: 'No' }
        ]
      },
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'true-false',
          question: 'It is a safe business practice to pay your deposit to a supplier’s personal account if they promise a discount.',
          correctAnswers: ['false'],
          explanation: 'Paying to a personal bank account offers zero legal protection. Always pay into the audited, registered corporate bank account of the manufacturer.'
        }
      ],
      objectives: ['Validate manufacturer legality.', 'Perform social audits.'],
      writtenExplanation: 'Supplier vetting involves validating licenses, auditing machine logs, checking legal accounts, and social compliance.',
      importantNotes: ['Mismatch in company names is a major red flag.'],
      keyPoints: ['Vetting protects wire deposits.', 'Check machines and certificates.']
    };
  }

  // ══════════════════════════════════════════════════════════
  // MOD-2: PRODUCT TERMS — All 10 topics with real content
  // ══════════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════════
  // MOD-3: WEIGHT & MEASUREMENT — Detailed real content
  // ══════════════════════════════════════════════════════════

  if (title === 'CBM') {
    return {
      definition: 'CBM stands for Cubic Meter (Cubic Metre) — the standard metric unit used in international shipping to measure cargo volume. 1 CBM is the space occupied by a cube measuring 1 meter in length, 1 meter in width, and 1 meter in height (1m × 1m × 1m = 1 m³).',
      whyImportant: 'Ocean freight lines and LCL consolidators calculate shipping charges based on CBM volume or weight, whichever is higher (1 CBM = 1,000 kg for sea freight). Total CBM determines whether you should ship via LCL or book a full 20FT, 40FT, or 40HQ container.',
      businessExample: 'RBC imports 100 master cartons of LED lights. Each carton measures 50cm × 40cm × 30cm. CBM per carton = (50 × 40 × 30) ÷ 1,000,000 = 0.06 CBM. Total CBM for 100 cartons = 0.06 × 100 = 6.0 CBM. Since 6 CBM is well below a 20FT container capacity (28 CBM), RBC ships via LCL (Less than Container Load), saving significant freight cost.',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure 3.1: Measuring master carton dimensions (L × W × H) to calculate CBM volume.',
          highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 450
      },
      pdf: { pdfUrl: '#', title: 'CBM Calculation & Container Selection Guide.pdf', totalPages: 2, size: '520 KB', mockPagesText: ['Page 1: How to calculate CBM step-by-step with formulas for cm, inches, and meters.', 'Page 2: Container volume capacities: 20FT (28 CBM), 40FT (58 CBM), 40HQ (68 CBM).'] },
      downloadOption: { title: 'CBM & Freight Cost Calculator', fileUrl: '#', size: '85 KB', type: 'xls' },
      relatedTopics: ['Gross Weight', 'FCL', 'LCL', 'Container Planning'],
      faqs: [
        { question: 'What is the formula to calculate CBM?', answer: 'CBM = Length (m) × Width (m) × Height (m). If measured in cm: CBM = (Length × Width × Height in cm) ÷ 1,000,000.' },
        { question: 'How many CBM fit in a 20FT container?', answer: 'A standard 20FT container has an internal volume of ~33 CBM, but practical loading capacity is 28–30 CBM due to box packing gaps.' }
      ],
      commonMistakes: [
        'Measuring inner box size instead of the outer master carton dimensions — outer dimensions determine actual CBM.',
        'Forgetting to convert centimeters to meters before multiplying — leads to massive calculation errors.',
        'Not accounting for pallet volume when goods are palletized before shipping.'
      ],
      practicalTips: [
        'Always ask your supplier for outer master carton dimensions (L × W × H in cm) and total carton count.',
        'Use the CBM formula: (L × W × H in cm) ÷ 1,000,000 × Number of Cartons = Total CBM.',
        'If total volume exceeds 15 CBM, compare LCL charges vs 20FT FCL rates — 20FT FCL is often cheaper above 15 CBM.'
      ],
      summary: 'CBM (Cubic Meter) is the metric unit for cargo volume (L × W × H in meters). It determines ocean freight charges, container selection (20FT/40FT), and space utilization. Calculate CBM accurately using outer carton dimensions to optimize shipping costs.',
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'What does CBM stand for in international shipping and freight logistics?',
          options: ['Cubic Barometer Metric', 'Cubic Meter', 'Cargo Base Measurement', 'Container Batch Meter'],
          correctAnswers: ['1'],
          explanation: 'CBM = Cubic Meter (Cubic Metre) — the standard unit measuring cargo volume in shipping (1m × 1m × 1m).'
        }
      ],
      objectives: ['Learn what CBM means and the exact formula to calculate it.', 'Understand how CBM determines container selection and freight cost.'],
      writtenExplanation: 'CBM (Cubic Meter) measures the volume space occupied by cargo in shipping. Calculated as Length × Width × Height in meters, CBM is the primary metric for ocean freight billing, LCL consolidation, and container stuffing optimization. Accurately measuring outer carton dimensions is mandatory for every import-export shipment.',
      importantNotes: ['Formula: (Length × Width × Height in cm) ÷ 1,000,000 = CBM per box.', '1 CBM = 1,000 kg volume-to-weight ratio for ocean freight.'],
      keyPoints: ['CBM = Cubic Meter (Cargo Volume)', 'Formula = L(m) × W(m) × H(m)', '20FT Container = ~28 CBM capacity']
    };
  }

  if (title === 'Gross Weight') {
    return {
      definition: "Gross Weight is the total weight of a shipment including the actual product, inner packaging, protective foam, export master cartons, and pallets. Formula: Gross Weight = Net Weight + Packaging Weight + Pallet Weight.",
      whyImportant: "Gross Weight determines ocean freight charges, air cargo billing, container payload safety limits, and road weight laws. Falsifying Gross Weight leads to port detention, vessel instability risks, and heavy customs fines.",
      businessExample: "RBC imports 500 laptops. Net Weight of laptops = 750 kg. Inner retail boxes + foam = 150 kg. Master cartons + wooden pallets = 100 kg. Total Gross Weight = 750 + 150 + 100 = 1,000 kg (1.0 Metric Ton). This 1,000 kg figure is declared on the Bill of Lading and Packing List.",
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure: Technical and operational visualization of Gross Weight in trade logistics.',
          highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 400
      },
      pdf: { pdfUrl: '#', title: 'Gross Weight Practical Industry Guide.pdf', totalPages: 2, size: '500 KB', mockPagesText: ['Page 1: Industry standards and definitions.', 'Page 2: Operations checklist.'] },
      downloadOption: { title: 'Gross Weight Operational Sheet', fileUrl: '#', size: '75 KB', type: 'pdf' },
      relatedTopics: ['CBM', 'FCL', 'LCL', 'Customs Clearance'],
      faqs: [
        { question: 'What is the primary role of Gross Weight?', answer: "Gross Weight is the total combined weight of goods + packaging + pallets. It is critical for container safety, freight calculation, and SOLAS VGM compliance." }
      ],
      commonMistakes: ["Declaring only product weight on shipping documents instead of total Gross Weight.","Forgetting to include pallet weights (each wooden pallet weighs 15-25 kg)."],
      practicalTips: ["Weigh packed master cartons on a certified digital scale at the factory before loading.","Ensure Gross Weight on Packing List matches Commercial Invoice and VGM certificate exactly."],
      summary: "Gross Weight is the total combined weight of goods + packaging + pallets. It is critical for container safety, freight calculation, and SOLAS VGM compliance.",
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Which statement accurately describes Gross Weight?',
          options: ["Gross Weight is the total combined weight of goods + packaging + pallets. It is critical for container safety, freight calculation, and SOLAS VGM compliance.", 'An illegal trading practice.', 'A tax exemption certificate.', 'A carrier penalty.'],
          correctAnswers: ['0'],
          explanation: "Gross Weight is the total combined weight of goods + packaging + pallets. It is critical for container safety, freight calculation, and SOLAS VGM compliance."
        }
      ],
      objectives: ['Understand operational meaning of Gross Weight.', 'Apply rules in trade management.'],
      writtenExplanation: "Gross Weight is the complete weight of cargo including all protective packaging materials and pallets. It is used by shipping lines for weight verification (VGM - Verified Gross Mass) under SOLAS regulations.",
      importantNotes: ["Weigh packed master cartons on a certified digital scale at the factory before loading.","Ensure Gross Weight on Packing List matches Commercial Invoice and VGM certificate exactly."],
      keyPoints: ["Gross Weight is the total combined weight of goods + packaging + pallets. It is critical for container safety, freight calculation, and SOLAS VGM compliance."]
    };
  }

  if (title === 'Net Weight') {
    return {
      definition: "Net Weight is the actual weight of the product/goods alone, excluding all inner boxes, protective bubble wrap, master cartons, and pallets. Formula: Net Weight = Gross Weight - Packaging Weight.",
      whyImportant: "Net Weight is used by customs authorities to calculate weight-based import duties for commodities (e.g., metals, food, chemicals) and by buyers to verify exact product yield received.",
      businessExample: "RBC imports 2,000 kg of copper wire coils. The wooden spools and export boxes weigh 200 kg, making Gross Weight = 2,200 kg. RBC pays supplier and customs duty based on Net Weight = 2,000 kg of pure copper wire.",
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure: Technical and operational visualization of Net Weight in trade logistics.',
          highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 400
      },
      pdf: { pdfUrl: '#', title: 'Net Weight Practical Industry Guide.pdf', totalPages: 2, size: '500 KB', mockPagesText: ['Page 1: Industry standards and definitions.', 'Page 2: Operations checklist.'] },
      downloadOption: { title: 'Net Weight Operational Sheet', fileUrl: '#', size: '75 KB', type: 'pdf' },
      relatedTopics: ['CBM', 'FCL', 'LCL', 'Customs Clearance'],
      faqs: [
        { question: 'What is the primary role of Net Weight?', answer: "Net Weight is the pure weight of goods excluding packaging. It is essential for commodity pricing, yield verification, and customs valuation." }
      ],
      commonMistakes: ["Confusing Net Weight with Gross Weight on customs declarations.","Including inner retail packaging weight in Net Weight calculation."],
      practicalTips: ["List both Net Weight and Gross Weight clearly on every line item of your Packing List.","Verify Net Weight for bulk commodity imports to ensure supplier did not short-ship goods."],
      summary: "Net Weight is the pure weight of goods excluding packaging. It is essential for commodity pricing, yield verification, and customs valuation.",
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Which statement accurately describes Net Weight?',
          options: ["Net Weight is the pure weight of goods excluding packaging. It is essential for commodity pricing, yield verification, and customs valuation.", 'An illegal trading practice.', 'A tax exemption certificate.', 'A carrier penalty.'],
          correctAnswers: ['0'],
          explanation: "Net Weight is the pure weight of goods excluding packaging. It is essential for commodity pricing, yield verification, and customs valuation."
        }
      ],
      objectives: ['Understand operational meaning of Net Weight.', 'Apply rules in trade management.'],
      writtenExplanation: "Net Weight is the net mass of the product without any packaging. It represents the actual product quantity purchased and is declared on Commercial Invoices and Bills of Entry.",
      importantNotes: ["List both Net Weight and Gross Weight clearly on every line item of your Packing List.","Verify Net Weight for bulk commodity imports to ensure supplier did not short-ship goods."],
      keyPoints: ["Net Weight is the pure weight of goods excluding packaging. It is essential for commodity pricing, yield verification, and customs valuation."]
    };
  }

  if (title === 'Volume Weight') {
    return {
      definition: "Volume Weight (Dimensional Weight / Volumetric Weight) is a pricing formula used by airlines and courier companies (DHL, FedEx) to charge freight for bulky but lightweight cargo. Formula: Volume Weight (kg) = (Length × Width × Height in cm) ÷ 6,000 (or ÷ 5,000 for express courier).",
      whyImportant: "Freight carriers charge based on Chargeable Weight = Max(Actual Gross Weight, Volume Weight). If you ship lightweight large items (like pillows or plastic toys), you pay based on Volume Weight.",
      businessExample: "RBC ships 10 boxes of plush teddy bears by air cargo. Actual Gross Weight = 50 kg. Box dimensions: 60cm × 50cm × 40cm × 10 boxes = 1,200,000 cm³. Volume Weight = 1,200,000 ÷ 6,000 = 200 kg. Airline charges RBC for 200 kg Chargeable Weight, not 50 kg.",
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure: Technical and operational visualization of Volume Weight in trade logistics.',
          highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 400
      },
      pdf: { pdfUrl: '#', title: 'Volume Weight Practical Industry Guide.pdf', totalPages: 2, size: '500 KB', mockPagesText: ['Page 1: Industry standards and definitions.', 'Page 2: Operations checklist.'] },
      downloadOption: { title: 'Volume Weight Operational Sheet', fileUrl: '#', size: '75 KB', type: 'pdf' },
      relatedTopics: ['CBM', 'FCL', 'LCL', 'Customs Clearance'],
      faqs: [
        { question: 'What is the primary role of Volume Weight?', answer: "Volume Weight = (L × W × H cm) ÷ 6000. Express carriers charge on whichever is higher between scale weight and volume weight." }
      ],
      commonMistakes: ["Assuming air freight is charged only on scale weight without checking box dimensions.","Using oversized boxes with empty air space, resulting in inflated volumetric freight charges."],
      practicalTips: ["Compress bulky items (like textiles or plush goods) using vacuum packaging before air freight.","Optimize box dimensions to eliminate empty space and lower Volume Weight."],
      summary: "Volume Weight = (L × W × H cm) ÷ 6000. Express carriers charge on whichever is higher between scale weight and volume weight.",
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Which statement accurately describes Volume Weight?',
          options: ["Volume Weight = (L × W × H cm) ÷ 6000. Express carriers charge on whichever is higher between scale weight and volume weight.", 'An illegal trading practice.', 'A tax exemption certificate.', 'A carrier penalty.'],
          correctAnswers: ['0'],
          explanation: "Volume Weight = (L × W × H cm) ÷ 6000. Express carriers charge on whichever is higher between scale weight and volume weight."
        }
      ],
      objectives: ['Understand operational meaning of Volume Weight.', 'Apply rules in trade management.'],
      writtenExplanation: "Volume Weight calculates cargo density space. Air carriers use it to ensure lightweight bulky cargo pays for the aircraft hold space it occupies.",
      importantNotes: ["Compress bulky items (like textiles or plush goods) using vacuum packaging before air freight.","Optimize box dimensions to eliminate empty space and lower Volume Weight."],
      keyPoints: ["Volume Weight = (L × W × H cm) ÷ 6000. Express carriers charge on whichever is higher between scale weight and volume weight."]
    };
  }

  if (title === 'Carton Size') {
    return {
      definition: "Carton Size refers to the outer physical dimensions (Length × Width × Height) of an export master box, measured in centimeters (cm) or inches (in).",
      whyImportant: "Carton Size is required to compute CBM, optimize container loading layouts, calculate pallet fit, and determine volumetric freight charges.",
      businessExample: "RBC specifies Carton Size = 60cm × 40cm × 30cm to supplier. This precise size allows exactly 4 cartons per pallet layer with zero overhang, maximizing container space efficiency.",
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure: Technical and operational visualization of Carton Size in trade logistics.',
          highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 400
      },
      pdf: { pdfUrl: '#', title: 'Carton Size Practical Industry Guide.pdf', totalPages: 2, size: '500 KB', mockPagesText: ['Page 1: Industry standards and definitions.', 'Page 2: Operations checklist.'] },
      downloadOption: { title: 'Carton Size Operational Sheet', fileUrl: '#', size: '75 KB', type: 'pdf' },
      relatedTopics: ['CBM', 'FCL', 'LCL', 'Customs Clearance'],
      faqs: [
        { question: 'What is the primary role of Carton Size?', answer: "Carton Size is the outer L × W × H measurement of export boxes used for CBM and container planning." }
      ],
      commonMistakes: ["Measuring inner dimensions instead of outer dimensions.","Not accounting for box bulging after packing."],
      practicalTips: ["Measure outer dimensions after boxes are fully packed and sealed.","Standardize carton sizes across product lines to simplify palletization."],
      summary: "Carton Size is the outer L × W × H measurement of export boxes used for CBM and container planning.",
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Which statement accurately describes Carton Size?',
          options: ["Carton Size is the outer L × W × H measurement of export boxes used for CBM and container planning.", 'An illegal trading practice.', 'A tax exemption certificate.', 'A carrier penalty.'],
          correctAnswers: ['0'],
          explanation: "Carton Size is the outer L × W × H measurement of export boxes used for CBM and container planning."
        }
      ],
      objectives: ['Understand operational meaning of Carton Size.', 'Apply rules in trade management.'],
      writtenExplanation: "Carton Size defines the outer boundaries of export packaging, critical for warehouse stacking and container capacity planning.",
      importantNotes: ["Measure outer dimensions after boxes are fully packed and sealed.","Standardize carton sizes across product lines to simplify palletization."],
      keyPoints: ["Carton Size is the outer L × W × H measurement of export boxes used for CBM and container planning."]
    };
  }

  if (title === 'Master Carton') {
    return {
      definition: "A Master Carton is a heavy-duty 5-ply or 7-ply corrugated cardboard box containing multiple individual retail units for protection during sea/air export shipping.",
      whyImportant: "Master Cartons protect products from crushing when stacked 6-8 boxes high in containers and carry mandatory shipping marks (Consignee, Country of Origin, Gross Weight).",
      businessExample: "RBC orders 1,000 smartwatches packed 20 pcs per Master Carton = 50 Master Cartons total. Each Master Carton is printed with RBC logo, handling symbols (Fragile, Keep Dry), and Gross Weight.",
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure: Technical and operational visualization of Master Carton in trade logistics.',
          highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 400
      },
      pdf: { pdfUrl: '#', title: 'Master Carton Practical Industry Guide.pdf', totalPages: 2, size: '500 KB', mockPagesText: ['Page 1: Industry standards and definitions.', 'Page 2: Operations checklist.'] },
      downloadOption: { title: 'Master Carton Operational Sheet', fileUrl: '#', size: '75 KB', type: 'pdf' },
      relatedTopics: ['CBM', 'FCL', 'LCL', 'Customs Clearance'],
      faqs: [
        { question: 'What is the primary role of Master Carton?', answer: "Master Carton is the heavy-duty outer box carrying multiple units with export shipping marks." }
      ],
      commonMistakes: ["Using thin 3-ply cartons that collapse under heavy stacking in sea containers.","Omitting mandatory export shipping marks on master carton walls."],
      practicalTips: ["Require double-walled 5-ply or 7-ply corrugated cartons for all sea freight shipments.","Print shipping marks on at least two sides of every master carton."],
      summary: "Master Carton is the heavy-duty outer box carrying multiple units with export shipping marks.",
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Which statement accurately describes Master Carton?',
          options: ["Master Carton is the heavy-duty outer box carrying multiple units with export shipping marks.", 'An illegal trading practice.', 'A tax exemption certificate.', 'A carrier penalty.'],
          correctAnswers: ['0'],
          explanation: "Master Carton is the heavy-duty outer box carrying multiple units with export shipping marks."
        }
      ],
      objectives: ['Understand operational meaning of Master Carton.', 'Apply rules in trade management.'],
      writtenExplanation: "Master Carton is the primary outer protective packaging for international export shipping.",
      importantNotes: ["Require double-walled 5-ply or 7-ply corrugated cartons for all sea freight shipments.","Print shipping marks on at least two sides of every master carton."],
      keyPoints: ["Master Carton is the heavy-duty outer box carrying multiple units with export shipping marks."]
    };
  }

  if (title === 'Pallet') {
    return {
      definition: "A Pallet is a flat wooden or plastic platform used to stack and consolidate master cartons for fast loading and unloading using forklifts. Standard sizes: Euro Pallet (1200mm × 800mm) and Standard Industrial Pallet (1200mm × 1000mm).",
      whyImportant: "Pallets reduce container loading/unloading time from hours to minutes, prevent box damage, and keep goods off damp container floors. Wooden pallets MUST be ISPM-15 heat-treated or fumigated.",
      businessExample: "RBC palletizes 40 master cartons onto 2 wooden pallets. The pallets are shrink-wrapped and strapped. Forklift loads both pallets into container in 10 minutes without manually handling individual boxes.",
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure: Technical and operational visualization of Pallet in trade logistics.',
          highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 400
      },
      pdf: { pdfUrl: '#', title: 'Pallet Practical Industry Guide.pdf', totalPages: 2, size: '500 KB', mockPagesText: ['Page 1: Industry standards and definitions.', 'Page 2: Operations checklist.'] },
      downloadOption: { title: 'Pallet Operational Sheet', fileUrl: '#', size: '75 KB', type: 'pdf' },
      relatedTopics: ['CBM', 'FCL', 'LCL', 'Customs Clearance'],
      faqs: [
        { question: 'What is the primary role of Pallet?', answer: "Pallets enable forklift handling and cargo protection. Wooden pallets require ISPM-15 fumigation stamp." }
      ],
      commonMistakes: ["Using non-treated wooden pallets resulting in customs rejection due to ISPM-15 pest regulations.","Allowing cartons to overhang pallet edges, causing box crushing."],
      practicalTips: ["Ensure supplier provides ISPM-15 Phytosanitary Certificate for all wooden pallets.","Use plastic pallets for food or medical product imports."],
      summary: "Pallets enable forklift handling and cargo protection. Wooden pallets require ISPM-15 fumigation stamp.",
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Which statement accurately describes Pallet?',
          options: ["Pallets enable forklift handling and cargo protection. Wooden pallets require ISPM-15 fumigation stamp.", 'An illegal trading practice.', 'A tax exemption certificate.', 'A carrier penalty.'],
          correctAnswers: ['0'],
          explanation: "Pallets enable forklift handling and cargo protection. Wooden pallets require ISPM-15 fumigation stamp."
        }
      ],
      objectives: ['Understand operational meaning of Pallet.', 'Apply rules in trade management.'],
      writtenExplanation: "Pallets enable mechanized cargo handling and protect goods during ocean transport.",
      importantNotes: ["Ensure supplier provides ISPM-15 Phytosanitary Certificate for all wooden pallets.","Use plastic pallets for food or medical product imports."],
      keyPoints: ["Pallets enable forklift handling and cargo protection. Wooden pallets require ISPM-15 fumigation stamp."]
    };
  }

  if (title === 'Loading Capacity') {
    return {
      definition: "Loading Capacity refers to the maximum volume (CBM) and maximum weight payload (kg) that a shipping container or truck can safely carry.",
      whyImportant: "Exceeding loading capacity damages containers, violates road weight limits, and causes severe port fines or shipping line rejections.",
      businessExample: "20FT Container Loading Capacity = ~28 CBM volume and ~21,700 kg payload limit. RBC imports heavy steel valves (20,000 kg). Even though volume is only 12 CBM, container reaches weight capacity limit.",
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure: Technical and operational visualization of Loading Capacity in trade logistics.',
          highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 400
      },
      pdf: { pdfUrl: '#', title: 'Loading Capacity Practical Industry Guide.pdf', totalPages: 2, size: '500 KB', mockPagesText: ['Page 1: Industry standards and definitions.', 'Page 2: Operations checklist.'] },
      downloadOption: { title: 'Loading Capacity Operational Sheet', fileUrl: '#', size: '75 KB', type: 'pdf' },
      relatedTopics: ['CBM', 'FCL', 'LCL', 'Customs Clearance'],
      faqs: [
        { question: 'What is the primary role of Loading Capacity?', answer: "Loading Capacity defines container volume (CBM) and payload weight (kg) limits for safe transport." }
      ],
      commonMistakes: ["Focusing only on CBM volume and overloading container weight payload.","Not factoring in box packing gaps when estimating CBM loading."],
      practicalTips: ["For heavy cargo (machinery, metals), check weight payload limit first.","For light voluminous cargo (garments, toys), check CBM volume capacity first."],
      summary: "Loading Capacity defines container volume (CBM) and payload weight (kg) limits for safe transport.",
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Which statement accurately describes Loading Capacity?',
          options: ["Loading Capacity defines container volume (CBM) and payload weight (kg) limits for safe transport.", 'An illegal trading practice.', 'A tax exemption certificate.', 'A carrier penalty.'],
          correctAnswers: ['0'],
          explanation: "Loading Capacity defines container volume (CBM) and payload weight (kg) limits for safe transport."
        }
      ],
      objectives: ['Understand operational meaning of Loading Capacity.', 'Apply rules in trade management.'],
      writtenExplanation: "Loading Capacity balances volume (CBM) and weight limits (Payload) for containers and transport vehicles.",
      importantNotes: ["For heavy cargo (machinery, metals), check weight payload limit first.","For light voluminous cargo (garments, toys), check CBM volume capacity first."],
      keyPoints: ["Loading Capacity defines container volume (CBM) and payload weight (kg) limits for safe transport."]
    };
  }

  if (title === 'FCL') {
    return {
      definition: "FCL stands for Full Container Load — a shipping mode where an importer books an entire container (20FT, 40FT, or 40HQ) exclusively for their cargo.",
      whyImportant: "FCL is faster, safer, and cheaper per unit for large orders. The container is sealed at the factory and opened only at the destination warehouse, eliminating handling damage.",
      businessExample: "RBC orders 1,200 cartons of home appliances. Total volume = 26 CBM. RBC books a 20FT FCL container. Factory seals container with Seal #RBC9982. It travels directly to RBC warehouse untouched.",
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure: Technical and operational visualization of FCL in trade logistics.',
          highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 400
      },
      pdf: { pdfUrl: '#', title: 'FCL Practical Industry Guide.pdf', totalPages: 2, size: '500 KB', mockPagesText: ['Page 1: Industry standards and definitions.', 'Page 2: Operations checklist.'] },
      downloadOption: { title: 'FCL Operational Sheet', fileUrl: '#', size: '75 KB', type: 'pdf' },
      relatedTopics: ['CBM', 'FCL', 'LCL', 'Customs Clearance'],
      faqs: [
        { question: 'What is the primary role of FCL?', answer: "FCL = Full Container Load. Dedicated container for one buyer, offering faster transit and higher security." }
      ],
      commonMistakes: ["Booking LCL for 20 CBM cargo when FCL 20FT is cheaper and faster.","Not checking container inspection before loading."],
      practicalTips: ["Compare FCL vs LCL rates whenever cargo volume exceeds 14-15 CBM.","Ensure container bolt seal number is recorded on Bill of Lading."],
      summary: "FCL = Full Container Load. Dedicated container for one buyer, offering faster transit and higher security.",
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Which statement accurately describes FCL?',
          options: ["FCL = Full Container Load. Dedicated container for one buyer, offering faster transit and higher security.", 'An illegal trading practice.', 'A tax exemption certificate.', 'A carrier penalty.'],
          correctAnswers: ['0'],
          explanation: "FCL = Full Container Load. Dedicated container for one buyer, offering faster transit and higher security."
        }
      ],
      objectives: ['Understand operational meaning of FCL.', 'Apply rules in trade management.'],
      writtenExplanation: "FCL means exclusive container usage by one buyer, providing direct transit and maximum security.",
      importantNotes: ["Compare FCL vs LCL rates whenever cargo volume exceeds 14-15 CBM.","Ensure container bolt seal number is recorded on Bill of Lading."],
      keyPoints: ["FCL = Full Container Load. Dedicated container for one buyer, offering faster transit and higher security."]
    };
  }

  if (title === 'LCL') {
    return {
      definition: "LCL stands for Less than Container Load — a shipping mode where multiple importers share space in a single container. Freight forwarder consolidates small shipments at a Container Freight Station (CFS).",
      whyImportant: "LCL allows small businesses to import goods without ordering enough volume to fill a full container. You pay only for the exact CBM volume your cargo occupies.",
      businessExample: "RBC imports 4 CBM of sample solar panels. Rather than paying $2,000 for full container, RBC ships via LCL and pays $320 based on 4 CBM volume rate.",
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure: Technical and operational visualization of LCL in trade logistics.',
          highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 400
      },
      pdf: { pdfUrl: '#', title: 'LCL Practical Industry Guide.pdf', totalPages: 2, size: '500 KB', mockPagesText: ['Page 1: Industry standards and definitions.', 'Page 2: Operations checklist.'] },
      downloadOption: { title: 'LCL Operational Sheet', fileUrl: '#', size: '75 KB', type: 'pdf' },
      relatedTopics: ['CBM', 'FCL', 'LCL', 'Customs Clearance'],
      faqs: [
        { question: 'What is the primary role of LCL?', answer: "LCL = Less than Container Load. Shared container space for small orders billed per CBM." }
      ],
      commonMistakes: ["Not factoring in origin/destination CFS handling charges which make large LCL shipments expensive.","Shipping fragile goods via LCL without extra wooden crate protection."],
      practicalTips: ["Use LCL for small trial shipments under 10 CBM.","Reinforce master carton packaging for LCL because goods are handled multiple times at CFS."],
      summary: "LCL = Less than Container Load. Shared container space for small orders billed per CBM.",
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Which statement accurately describes LCL?',
          options: ["LCL = Less than Container Load. Shared container space for small orders billed per CBM.", 'An illegal trading practice.', 'A tax exemption certificate.', 'A carrier penalty.'],
          correctAnswers: ['0'],
          explanation: "LCL = Less than Container Load. Shared container space for small orders billed per CBM."
        }
      ],
      objectives: ['Understand operational meaning of LCL.', 'Apply rules in trade management.'],
      writtenExplanation: "LCL consolidates multiple small shipments into one shared container, enabling cost-effective small orders.",
      importantNotes: ["Use LCL for small trial shipments under 10 CBM.","Reinforce master carton packaging for LCL because goods are handled multiple times at CFS."],
      keyPoints: ["LCL = Less than Container Load. Shared container space for small orders billed per CBM."]
    };
  }

  if (title === '20FT Container') {
    return {
      definition: "A 20FT Container (20 Feet Standard Container) is a standard ocean container measuring 20ft L × 8ft W × 8.5ft H. Volume capacity: ~28-30 CBM. Max Payload: ~21,700 kg.",
      whyImportant: "The 20FT container is the industry workhorse for heavy cargo (metals, stone, machinery, liquids) where weight limit is reached before volume is filled.",
      businessExample: "RBC imports 18 tons of ceramic tiles. Volume is only 15 CBM, but weight is 18,000 kg. A 20FT container is the ideal choice due to weight capacity.",
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure: Technical and operational visualization of 20FT Container in trade logistics.',
          highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 400
      },
      pdf: { pdfUrl: '#', title: '20FT Container Practical Industry Guide.pdf', totalPages: 2, size: '500 KB', mockPagesText: ['Page 1: Industry standards and definitions.', 'Page 2: Operations checklist.'] },
      downloadOption: { title: '20FT Container Operational Sheet', fileUrl: '#', size: '75 KB', type: 'pdf' },
      relatedTopics: ['CBM', 'FCL', 'LCL', 'Customs Clearance'],
      faqs: [
        { question: 'What is the primary role of 20FT Container?', answer: "20FT Container = 28-30 CBM volume, 21.7 ton payload. Best for heavy dense cargo." }
      ],
      commonMistakes: ["Trying to fit more than 28 CBM of boxed goods into a 20FT container.","Exceeding maximum road weight limits when loading heavy cargo."],
      practicalTips: ["Use 20FT for heavy goods (metals, minerals, liquids).","Effective usable volume is 28 CBM for standard boxes."],
      summary: "20FT Container = 28-30 CBM volume, 21.7 ton payload. Best for heavy dense cargo.",
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Which statement accurately describes 20FT Container?',
          options: ["20FT Container = 28-30 CBM volume, 21.7 ton payload. Best for heavy dense cargo.", 'An illegal trading practice.', 'A tax exemption certificate.', 'A carrier penalty.'],
          correctAnswers: ['0'],
          explanation: "20FT Container = 28-30 CBM volume, 21.7 ton payload. Best for heavy dense cargo."
        }
      ],
      objectives: ['Understand operational meaning of 20FT Container.', 'Apply rules in trade management.'],
      writtenExplanation: "20FT Container is standard 6-meter ocean container optimized for heavy dense cargo.",
      importantNotes: ["Use 20FT for heavy goods (metals, minerals, liquids).","Effective usable volume is 28 CBM for standard boxes."],
      keyPoints: ["20FT Container = 28-30 CBM volume, 21.7 ton payload. Best for heavy dense cargo."]
    };
  }

  if (title === '40FT Container') {
    return {
      definition: "A 40FT Container (40 Feet Standard Container) measures 40ft L × 8ft W × 8.5ft H. Volume capacity: ~58-60 CBM. Max Payload: ~26,500 kg.",
      whyImportant: "Offers double the volume of a 20FT container at only 30-50% higher ocean freight cost, making it highly economical for general volume cargo.",
      businessExample: "RBC imports 550 cartons of footwear. Total volume = 55 CBM, weight = 7,000 kg. RBC books a 40FT container for maximum cost efficiency per box.",
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure: Technical and operational visualization of 40FT Container in trade logistics.',
          highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 400
      },
      pdf: { pdfUrl: '#', title: '40FT Container Practical Industry Guide.pdf', totalPages: 2, size: '500 KB', mockPagesText: ['Page 1: Industry standards and definitions.', 'Page 2: Operations checklist.'] },
      downloadOption: { title: '40FT Container Operational Sheet', fileUrl: '#', size: '75 KB', type: 'pdf' },
      relatedTopics: ['CBM', 'FCL', 'LCL', 'Customs Clearance'],
      faqs: [
        { question: 'What is the primary role of 40FT Container?', answer: "40FT Container = 58-60 CBM volume, 26.5 ton payload. Double volume of 20FT at lower cost." }
      ],
      commonMistakes: ["Booking two 20FT containers instead of one 40FT container (one 40FT is much cheaper).","Overloading weight limit on 40FT with dense goods."],
      practicalTips: ["Book 40FT for general consumer goods, footwear, textiles.","Effective usable volume is 58 CBM."],
      summary: "40FT Container = 58-60 CBM volume, 26.5 ton payload. Double volume of 20FT at lower cost.",
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Which statement accurately describes 40FT Container?',
          options: ["40FT Container = 58-60 CBM volume, 26.5 ton payload. Double volume of 20FT at lower cost.", 'An illegal trading practice.', 'A tax exemption certificate.', 'A carrier penalty.'],
          correctAnswers: ['0'],
          explanation: "40FT Container = 58-60 CBM volume, 26.5 ton payload. Double volume of 20FT at lower cost."
        }
      ],
      objectives: ['Understand operational meaning of 40FT Container.', 'Apply rules in trade management.'],
      writtenExplanation: "40FT Container is 12-meter ocean container designed for medium-density general cargo.",
      importantNotes: ["Book 40FT for general consumer goods, footwear, textiles.","Effective usable volume is 58 CBM."],
      keyPoints: ["40FT Container = 58-60 CBM volume, 26.5 ton payload. Double volume of 20FT at lower cost."]
    };
  }

  if (title === '40HQ Container') {
    return {
      definition: "A 40HQ Container (40 Feet High Cube Container) measures 40ft L × 8ft W × 9.5ft H (1 foot taller than standard 40FT). Volume capacity: ~68-70 CBM.",
      whyImportant: "Provides maximum volume capacity (68 CBM) for light bulky goods like furniture, luggage, electronics, and toys at nearly the same rate as standard 40FT.",
      businessExample: "RBC imports office chairs (65 CBM). A standard 40FT (58 CBM) cannot fit all chairs. RBC books 40HQ (68 CBM) and fits entire order in one container.",
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure: Technical and operational visualization of 40HQ Container in trade logistics.',
          highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 400
      },
      pdf: { pdfUrl: '#', title: '40HQ Container Practical Industry Guide.pdf', totalPages: 2, size: '500 KB', mockPagesText: ['Page 1: Industry standards and definitions.', 'Page 2: Operations checklist.'] },
      downloadOption: { title: '40HQ Container Operational Sheet', fileUrl: '#', size: '75 KB', type: 'pdf' },
      relatedTopics: ['CBM', 'FCL', 'LCL', 'Customs Clearance'],
      faqs: [
        { question: 'What is the primary role of 40HQ Container?', answer: "40HQ Container = 68-70 CBM volume. 1ft taller than 40FT, maximum volume for light bulky cargo." }
      ],
      commonMistakes: ["Not checking destination warehouse door height for High Cube container clearance.","Forgetting that weight limit is same as 40FT (26.5 tons)."],
      practicalTips: ["Always request 40HQ over standard 40FT for light bulky goods — rate difference is minimal.","Effective usable volume is 68 CBM."],
      summary: "40HQ Container = 68-70 CBM volume. 1ft taller than 40FT, maximum volume for light bulky cargo.",
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Which statement accurately describes 40HQ Container?',
          options: ["40HQ Container = 68-70 CBM volume. 1ft taller than 40FT, maximum volume for light bulky cargo.", 'An illegal trading practice.', 'A tax exemption certificate.', 'A carrier penalty.'],
          correctAnswers: ['0'],
          explanation: "40HQ Container = 68-70 CBM volume. 1ft taller than 40FT, maximum volume for light bulky cargo."
        }
      ],
      objectives: ['Understand operational meaning of 40HQ Container.', 'Apply rules in trade management.'],
      writtenExplanation: "40HQ Container is 1 foot taller than standard 40FT, providing 10 extra CBM of volume for light bulky goods.",
      importantNotes: ["Always request 40HQ over standard 40FT for light bulky goods — rate difference is minimal.","Effective usable volume is 68 CBM."],
      keyPoints: ["40HQ Container = 68-70 CBM volume. 1ft taller than 40FT, maximum volume for light bulky cargo."]
    };
  }

  if (title === 'Freight') {
    return {
      definition: "Freight refers to the transportation charge paid to a shipping line, airline, or logistics carrier for moving cargo from origin to destination.",
      whyImportant: "Freight is a major component of Landed Cost calculation. Negotiating competitive freight rates directly increases business profit margins.",
      businessExample: "RBC pays $1,800 ocean freight to Maersk line for transporting a 20FT container from Shanghai to Mundra port.",
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure: Technical and operational visualization of Freight in trade logistics.',
          highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 400
      },
      pdf: { pdfUrl: '#', title: 'Freight Practical Guide.pdf', totalPages: 2, size: '500 KB', mockPagesText: ['Page 1: Technical definitions and operations.', 'Page 2: Practical checklist.'] },
      downloadOption: { title: 'Freight Reference Sheet', fileUrl: '#', size: '75 KB', type: 'pdf' },
      relatedTopics: ['CBM', 'FCL', 'LCL', 'Customs Clearance'],
      faqs: [
        { question: 'What is the primary role of Freight?', answer: "Freight is the carrier fee for transporting cargo by sea, air, or land." }
      ],
      commonMistakes: ["Focusing only on cheap ocean freight while ignoring expensive local terminal handling surcharges."],
      practicalTips: ["Request an itemized freight quote showing ocean freight, BAF (bunker fuel), and CAF (currency adjustment)."],
      summary: "Freight is the carrier fee for transporting cargo by sea, air, or land.",
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Which statement accurately describes Freight?',
          options: ["Freight is the carrier fee for transporting cargo by sea, air, or land.", 'An illegal trading practice.', 'A tax exemption certificate.', 'A carrier penalty.'],
          correctAnswers: ['0'],
          explanation: "Freight is the carrier fee for transporting cargo by sea, air, or land."
        }
      ],
      objectives: ['Understand operational meaning of Freight.', 'Apply rules in trade management.'],
      writtenExplanation: "Freight refers to the transportation charge paid to a shipping line, airline, or logistics carrier for moving cargo from origin to destination.",
      importantNotes: ["Request an itemized freight quote showing ocean freight, BAF (bunker fuel), and CAF (currency adjustment)."],
      keyPoints: ["Freight is the carrier fee for transporting cargo by sea, air, or land."]
    };
  }

  if (title === 'Sea Freight') {
    return {
      definition: "Sea Freight is the transportation of goods in shipping containers or bulk vessels across ocean routes between international seaports.",
      whyImportant: "Sea Freight is the most economical shipping method for large bulk cargo, accounting for 90% of global trade volume.",
      businessExample: "RBC imports 10 tons of industrial machinery via Sea Freight from Ningbo to Nhava Sheva port, taking 18 days transit time at low cost.",
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure: Technical and operational visualization of Sea Freight in trade logistics.',
          highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 400
      },
      pdf: { pdfUrl: '#', title: 'Sea Freight Practical Guide.pdf', totalPages: 2, size: '500 KB', mockPagesText: ['Page 1: Technical definitions and operations.', 'Page 2: Practical checklist.'] },
      downloadOption: { title: 'Sea Freight Reference Sheet', fileUrl: '#', size: '75 KB', type: 'pdf' },
      relatedTopics: ['CBM', 'FCL', 'LCL', 'Customs Clearance'],
      faqs: [
        { question: 'What is the primary role of Sea Freight?', answer: "Sea Freight is ocean vessel transport for containers and bulk cargo at lowest unit cost." }
      ],
      commonMistakes: ["Shipping urgent time-sensitive samples via sea freight instead of air freight, causing customer delays."],
      practicalTips: ["Book sea freight space 2-3 weeks in advance during peak import seasons (like Pre-Diwali or Chinese New Year)."],
      summary: "Sea Freight is ocean vessel transport for containers and bulk cargo at lowest unit cost.",
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Which statement accurately describes Sea Freight?',
          options: ["Sea Freight is ocean vessel transport for containers and bulk cargo at lowest unit cost.", 'An illegal trading practice.', 'A tax exemption certificate.', 'A carrier penalty.'],
          correctAnswers: ['0'],
          explanation: "Sea Freight is ocean vessel transport for containers and bulk cargo at lowest unit cost."
        }
      ],
      objectives: ['Understand operational meaning of Sea Freight.', 'Apply rules in trade management.'],
      writtenExplanation: "Sea Freight is the transportation of goods in shipping containers or bulk vessels across ocean routes between international seaports.",
      importantNotes: ["Book sea freight space 2-3 weeks in advance during peak import seasons (like Pre-Diwali or Chinese New Year)."],
      keyPoints: ["Sea Freight is ocean vessel transport for containers and bulk cargo at lowest unit cost."]
    };
  }

  if (title === 'Air Freight') {
    return {
      definition: "Air Freight is the rapid transport of cargo via dedicated freighter aircraft or passenger plane belly holds.",
      whyImportant: "Air Freight is essential for high-value, perishable, fragile, or time-critical shipments that require arrival within 3-5 days.",
      businessExample: "RBC ships urgent electronic prototypes from Shenzhen to Mumbai Airport via Air Freight in 3 days to launch a new product line.",
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure: Technical and operational visualization of Air Freight in trade logistics.',
          highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 400
      },
      pdf: { pdfUrl: '#', title: 'Air Freight Practical Guide.pdf', totalPages: 2, size: '500 KB', mockPagesText: ['Page 1: Technical definitions and operations.', 'Page 2: Practical checklist.'] },
      downloadOption: { title: 'Air Freight Reference Sheet', fileUrl: '#', size: '75 KB', type: 'pdf' },
      relatedTopics: ['CBM', 'FCL', 'LCL', 'Customs Clearance'],
      faqs: [
        { question: 'What is the primary role of Air Freight?', answer: "Air Freight is fast air cargo transport ideal for high-value or time-sensitive goods." }
      ],
      commonMistakes: ["Shipping low-value heavy bulk cargo via air freight, which results in freight costs exceeding product value."],
      practicalTips: ["Calculate Chargeable Weight (Max of scale weight vs volume weight ÷ 6000) before booking air freight."],
      summary: "Air Freight is fast air cargo transport ideal for high-value or time-sensitive goods.",
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Which statement accurately describes Air Freight?',
          options: ["Air Freight is fast air cargo transport ideal for high-value or time-sensitive goods.", 'An illegal trading practice.', 'A tax exemption certificate.', 'A carrier penalty.'],
          correctAnswers: ['0'],
          explanation: "Air Freight is fast air cargo transport ideal for high-value or time-sensitive goods."
        }
      ],
      objectives: ['Understand operational meaning of Air Freight.', 'Apply rules in trade management.'],
      writtenExplanation: "Air Freight is the rapid transport of cargo via dedicated freighter aircraft or passenger plane belly holds.",
      importantNotes: ["Calculate Chargeable Weight (Max of scale weight vs volume weight ÷ 6000) before booking air freight."],
      keyPoints: ["Air Freight is fast air cargo transport ideal for high-value or time-sensitive goods."]
    };
  }

  if (title === 'POL') {
    return {
      definition: "POL stands for Port of Loading — the designated seaport in the exporting country where container cargo is loaded onto the vessel.",
      whyImportant: "Declaring the correct POL on Bills of Lading and origin customs documents is mandatory for vessel tracking and tariff origin compliance.",
      businessExample: "For RBC\'s import from China to India, Ningbo Port is POL (Port of Loading). Supplier delivers packed container to Ningbo POL terminal.",
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure: Technical and operational visualization of POL in trade logistics.',
          highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 400
      },
      pdf: { pdfUrl: '#', title: 'POL Practical Guide.pdf', totalPages: 2, size: '500 KB', mockPagesText: ['Page 1: Technical definitions and operations.', 'Page 2: Practical checklist.'] },
      downloadOption: { title: 'POL Reference Sheet', fileUrl: '#', size: '75 KB', type: 'pdf' },
      relatedTopics: ['CBM', 'FCL', 'LCL', 'Customs Clearance'],
      faqs: [
        { question: 'What is the primary role of POL?', answer: "POL = Port of Loading (Origin seaport where ship is loaded with container)." }
      ],
      commonMistakes: ["Confusing Port of Loading (POL) with Port of Discharge (POD) on transport documentation."],
      practicalTips: ["Verify origin POL terminal cutoff dates (CY Cutoff) to ensure container is gated in before ship departs."],
      summary: "POL = Port of Loading (Origin seaport where ship is loaded with container).",
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Which statement accurately describes POL?',
          options: ["POL = Port of Loading (Origin seaport where ship is loaded with container).", 'An illegal trading practice.', 'A tax exemption certificate.', 'A carrier penalty.'],
          correctAnswers: ['0'],
          explanation: "POL = Port of Loading (Origin seaport where ship is loaded with container)."
        }
      ],
      objectives: ['Understand operational meaning of POL.', 'Apply rules in trade management.'],
      writtenExplanation: "POL stands for Port of Loading — the designated seaport in the exporting country where container cargo is loaded onto the vessel.",
      importantNotes: ["Verify origin POL terminal cutoff dates (CY Cutoff) to ensure container is gated in before ship departs."],
      keyPoints: ["POL = Port of Loading (Origin seaport where ship is loaded with container)."]
    };
  }

  if (title === 'POD') {
    return {
      definition: "POD stands for Port of Discharge — the destination seaport in the importing country where the container is unloaded from the vessel.",
      whyImportant: "Customs clearance filing (Bill of Entry) and port demurrage free-days calculation start as soon as vessel docks at POD.",
      businessExample: "For RBC\'s shipment from Ningbo to Mundra, Mundra Port is POD (Port of Discharge). RBC files customs Bill of Entry at Mundra POD.",
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure: Technical and operational visualization of POD in trade logistics.',
          highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 400
      },
      pdf: { pdfUrl: '#', title: 'POD Practical Guide.pdf', totalPages: 2, size: '500 KB', mockPagesText: ['Page 1: Technical definitions and operations.', 'Page 2: Practical checklist.'] },
      downloadOption: { title: 'POD Reference Sheet', fileUrl: '#', size: '75 KB', type: 'pdf' },
      relatedTopics: ['CBM', 'FCL', 'LCL', 'Customs Clearance'],
      faqs: [
        { question: 'What is the primary role of POD?', answer: "POD = Port of Discharge (Destination seaport where container is unloaded from vessel)." }
      ],
      commonMistakes: ["Failing to track vessel ETA at POD, causing container to sit at port and incur expensive demurrage charges."],
      practicalTips: ["File advance Bill of Entry 2 days before vessel ETA at POD to clear customs immediately upon discharge."],
      summary: "POD = Port of Discharge (Destination seaport where container is unloaded from vessel).",
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Which statement accurately describes POD?',
          options: ["POD = Port of Discharge (Destination seaport where container is unloaded from vessel).", 'An illegal trading practice.', 'A tax exemption certificate.', 'A carrier penalty.'],
          correctAnswers: ['0'],
          explanation: "POD = Port of Discharge (Destination seaport where container is unloaded from vessel)."
        }
      ],
      objectives: ['Understand operational meaning of POD.', 'Apply rules in trade management.'],
      writtenExplanation: "POD stands for Port of Discharge — the destination seaport in the importing country where the container is unloaded from the vessel.",
      importantNotes: ["File advance Bill of Entry 2 days before vessel ETA at POD to clear customs immediately upon discharge."],
      keyPoints: ["POD = Port of Discharge (Destination seaport where container is unloaded from vessel)."]
    };
  }

  if (title === 'ICD') {
    return {
      definition: "ICD stands for Inland Container Depot (Dry Port) — an inland customs-bonded container handling facility located away from ocean ports.",
      whyImportant: "ICDs allow importers in inland cities (like Delhi, Ahmedabad, Jaipur) to complete customs clearance locally near their business without traveling to seaports.",
      businessExample: "RBC ships container by rail from Mundra seaport directly to ICD Ahmedabad (Dry Port) to clear customs 15 minutes away from their warehouse.",
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure: Technical and operational visualization of ICD in trade logistics.',
          highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 400
      },
      pdf: { pdfUrl: '#', title: 'ICD Practical Guide.pdf', totalPages: 2, size: '500 KB', mockPagesText: ['Page 1: Technical definitions and operations.', 'Page 2: Practical checklist.'] },
      downloadOption: { title: 'ICD Reference Sheet', fileUrl: '#', size: '75 KB', type: 'pdf' },
      relatedTopics: ['CBM', 'FCL', 'LCL', 'Customs Clearance'],
      faqs: [
        { question: 'What is the primary role of ICD?', answer: "ICD = Inland Container Depot (Dry Port). Inland customs facility for local clearance away from seaports." }
      ],
      commonMistakes: ["Clearing customs at seaport when an inland ICD is available near your city, increasing double handling truck costs."],
      practicalTips: ["Specify your local ICD code as final destination on Bill of Lading (e.g., Destination: ICD Ahmedabad - SBIAD)."],
      summary: "ICD = Inland Container Depot (Dry Port). Inland customs facility for local clearance away from seaports.",
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Which statement accurately describes ICD?',
          options: ["ICD = Inland Container Depot (Dry Port). Inland customs facility for local clearance away from seaports.", 'An illegal trading practice.', 'A tax exemption certificate.', 'A carrier penalty.'],
          correctAnswers: ['0'],
          explanation: "ICD = Inland Container Depot (Dry Port). Inland customs facility for local clearance away from seaports."
        }
      ],
      objectives: ['Understand operational meaning of ICD.', 'Apply rules in trade management.'],
      writtenExplanation: "ICD stands for Inland Container Depot (Dry Port) — an inland customs-bonded container handling facility located away from ocean ports.",
      importantNotes: ["Specify your local ICD code as final destination on Bill of Lading (e.g., Destination: ICD Ahmedabad - SBIAD)."],
      keyPoints: ["ICD = Inland Container Depot (Dry Port). Inland customs facility for local clearance away from seaports."]
    };
  }

  if (title === 'CFS') {
    return {
      definition: "CFS stands for Container Freight Station — a customs-bonded warehouse at port or ICD where LCL cargo is consolidated or de-consolidated.",
      whyImportant: "At destination CFS, shared LCL containers are opened, individual importer cartons are sorted, and customs inspection takes place.",
      businessExample: "RBC\'s shared LCL container arrives at Mundra CFS. Workers de-stuff container and separate RBC\'s 10 master cartons for customs audit.",
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure: Technical and operational visualization of CFS in trade logistics.',
          highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 400
      },
      pdf: { pdfUrl: '#', title: 'CFS Practical Guide.pdf', totalPages: 2, size: '500 KB', mockPagesText: ['Page 1: Technical definitions and operations.', 'Page 2: Practical checklist.'] },
      downloadOption: { title: 'CFS Reference Sheet', fileUrl: '#', size: '75 KB', type: 'pdf' },
      relatedTopics: ['CBM', 'FCL', 'LCL', 'Customs Clearance'],
      faqs: [
        { question: 'What is the primary role of CFS?', answer: "CFS = Container Freight Station. Customs warehouse for consolidating and sorting LCL cargo." }
      ],
      commonMistakes: ["Leaving LCL goods at CFS beyond free storage period, incurring heavy daily storage rent."],
      practicalTips: ["Verify CFS handling charges and free storage days (usually 5 days) before container arrival at CFS."],
      summary: "CFS = Container Freight Station. Customs warehouse for consolidating and sorting LCL cargo.",
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Which statement accurately describes CFS?',
          options: ["CFS = Container Freight Station. Customs warehouse for consolidating and sorting LCL cargo.", 'An illegal trading practice.', 'A tax exemption certificate.', 'A carrier penalty.'],
          correctAnswers: ['0'],
          explanation: "CFS = Container Freight Station. Customs warehouse for consolidating and sorting LCL cargo."
        }
      ],
      objectives: ['Understand operational meaning of CFS.', 'Apply rules in trade management.'],
      writtenExplanation: "CFS stands for Container Freight Station — a customs-bonded warehouse at port or ICD where LCL cargo is consolidated or de-consolidated.",
      importantNotes: ["Verify CFS handling charges and free storage days (usually 5 days) before container arrival at CFS."],
      keyPoints: ["CFS = Container Freight Station. Customs warehouse for consolidating and sorting LCL cargo."]
    };
  }

  if (title === 'Proforma Invoice') {
    return {
      definition: "Proforma Invoice (PI) is a preliminary billing document sent by the seller before order confirmation, detailing product specs, prices, terms, and bank details.",
      whyImportant: "PI serves as the official purchase agreement used by buyers to transfer advance payment deposits and open Letters of Credit (LC) with banks.",
      businessExample: "RBC receives a Proforma Invoice from Ningbo supplier for 1,000 LED lights at $8/pc (Total $8,000). RBC signs PI and wires 30% deposit ($2,400) to start production.",
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure: Technical and operational visualization of Proforma Invoice in trade logistics.',
          highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 400
      },
      pdf: { pdfUrl: '#', title: 'Proforma Invoice Practical Guide.pdf', totalPages: 2, size: '500 KB', mockPagesText: ['Page 1: Technical definitions and operations.', 'Page 2: Practical checklist.'] },
      downloadOption: { title: 'Proforma Invoice Reference Sheet', fileUrl: '#', size: '75 KB', type: 'pdf' },
      relatedTopics: ['CBM', 'FCL', 'LCL', 'Customs Clearance'],
      faqs: [
        { question: 'What is the primary role of Proforma Invoice?', answer: "Proforma Invoice is a preliminary sales agreement used for advance deposit payment and LC opening." }
      ],
      commonMistakes: ["Paying advance deposit based on an informal WeChat or email quote instead of a signed formal Proforma Invoice."],
      practicalTips: ["Check that PI explicitly lists Incoterms (FOB/CIF), HSN codes, payment terms, and factory bank SWIFT details before paying."],
      summary: "Proforma Invoice is a preliminary sales agreement used for advance deposit payment and LC opening.",
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Which statement accurately describes Proforma Invoice?',
          options: ["Proforma Invoice is a preliminary sales agreement used for advance deposit payment and LC opening.", 'An illegal trading practice.', 'A tax exemption certificate.', 'A carrier penalty.'],
          correctAnswers: ['0'],
          explanation: "Proforma Invoice is a preliminary sales agreement used for advance deposit payment and LC opening."
        }
      ],
      objectives: ['Understand operational meaning of Proforma Invoice.', 'Apply rules in trade management.'],
      writtenExplanation: "Proforma Invoice (PI) is a preliminary billing document sent by the seller before order confirmation, detailing product specs, prices, terms, and bank details.",
      importantNotes: ["Check that PI explicitly lists Incoterms (FOB/CIF), HSN codes, payment terms, and factory bank SWIFT details before paying."],
      keyPoints: ["Proforma Invoice is a preliminary sales agreement used for advance deposit payment and LC opening."]
    };
  }

  if (title === 'Commercial Invoice') {
    return {
      definition: "Commercial Invoice (CI) is the legal billing document issued by seller upon dispatch, serving as the official record of sale and primary basis for customs valuation.",
      whyImportant: "Customs authorities calculate import duty and GST taxes directly from the Assessable Value declared on the Commercial Invoice.",
      businessExample: "RBC submits the seller\'s Commercial Invoice ($12,000 CIF Mundra) to Indian Customs. Customs assesses 7.5% BCD + 18% IGST based on this CI.",
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure: Technical and operational visualization of Commercial Invoice in trade logistics.',
          highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 400
      },
      pdf: { pdfUrl: '#', title: 'Commercial Invoice Practical Guide.pdf', totalPages: 2, size: '500 KB', mockPagesText: ['Page 1: Technical definitions and operations.', 'Page 2: Practical checklist.'] },
      downloadOption: { title: 'Commercial Invoice Reference Sheet', fileUrl: '#', size: '75 KB', type: 'pdf' },
      relatedTopics: ['CBM', 'FCL', 'LCL', 'Customs Clearance'],
      faqs: [
        { question: 'What is the primary role of Commercial Invoice?', answer: "Commercial Invoice is the legal billing document for cargo valuation, customs duty calculation, and banking settlement." }
      ],
      commonMistakes: ["Under-declaring Commercial Invoice value to evade customs duty, which is a criminal offense leading to heavy penalties and cargo seizure."],
      practicalTips: ["Ensure Invoice Number, Date, Buyer/Seller Tax IDs, Incoterms, HSN Codes, and Currency are accurately stated."],
      summary: "Commercial Invoice is the legal billing document for cargo valuation, customs duty calculation, and banking settlement.",
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Which statement accurately describes Commercial Invoice?',
          options: ["Commercial Invoice is the legal billing document for cargo valuation, customs duty calculation, and banking settlement.", 'An illegal trading practice.', 'A tax exemption certificate.', 'A carrier penalty.'],
          correctAnswers: ['0'],
          explanation: "Commercial Invoice is the legal billing document for cargo valuation, customs duty calculation, and banking settlement."
        }
      ],
      objectives: ['Understand operational meaning of Commercial Invoice.', 'Apply rules in trade management.'],
      writtenExplanation: "Commercial Invoice (CI) is the legal billing document issued by seller upon dispatch, serving as the official record of sale and primary basis for customs valuation.",
      importantNotes: ["Ensure Invoice Number, Date, Buyer/Seller Tax IDs, Incoterms, HSN Codes, and Currency are accurately stated."],
      keyPoints: ["Commercial Invoice is the legal billing document for cargo valuation, customs duty calculation, and banking settlement."]
    };
  }

  if (title === 'Packing List') {
    return {
      definition: "Packing List (PL) is a detailed transport document created by the exporter specifying box count, dimensions, gross weight, net weight, and exact contents of every master carton.",
      whyImportant: "Customs officers and warehouse team use the Packing List to verify physical box count during inspection and match incoming inventory with purchase orders.",
      businessExample: "RBC\'s Packing List states: 50 Master Cartons, Gross Weight 1,000 kg, Net Weight 850 kg, Total Volume 6 CBM. Cartons #1-30 contain Red Units, #31-50 contain Black Units.",
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure: Technical and operational visualization of Packing List in trade logistics.',
          highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 400
      },
      pdf: { pdfUrl: '#', title: 'Packing List Practical Guide.pdf', totalPages: 2, size: '500 KB', mockPagesText: ['Page 1: Technical definitions and operations.', 'Page 2: Practical checklist.'] },
      downloadOption: { title: 'Packing List Reference Sheet', fileUrl: '#', size: '75 KB', type: 'pdf' },
      relatedTopics: ['CBM', 'FCL', 'LCL', 'Customs Clearance'],
      faqs: [
        { question: 'What is the primary role of Packing List?', answer: "Packing List details total cartons, weights (Gross/Net), dimensions (CBM), and item contents for customs verification." }
      ],
      commonMistakes: ["Mismatched box counts or weight discrepancies between Packing List and Bill of Lading, causing customs clearance holds."],
      practicalTips: ["Attach a copy of the Packing List inside Container Box #1 and paste pouch copies on outer carton walls."],
      summary: "Packing List details total cartons, weights (Gross/Net), dimensions (CBM), and item contents for customs verification.",
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Which statement accurately describes Packing List?',
          options: ["Packing List details total cartons, weights (Gross/Net), dimensions (CBM), and item contents for customs verification.", 'An illegal trading practice.', 'A tax exemption certificate.', 'A carrier penalty.'],
          correctAnswers: ['0'],
          explanation: "Packing List details total cartons, weights (Gross/Net), dimensions (CBM), and item contents for customs verification."
        }
      ],
      objectives: ['Understand operational meaning of Packing List.', 'Apply rules in trade management.'],
      writtenExplanation: "Packing List (PL) is a detailed transport document created by the exporter specifying box count, dimensions, gross weight, net weight, and exact contents of every master carton.",
      importantNotes: ["Attach a copy of the Packing List inside Container Box #1 and paste pouch copies on outer carton walls."],
      keyPoints: ["Packing List details total cartons, weights (Gross/Net), dimensions (CBM), and item contents for customs verification."]
    };
  }

  if (title === 'Bill of Lading') {
    return {
      definition: "Bill of Lading (B/L) is the official ocean transport document issued by shipping line serving as a cargo receipt, contract of carriage, and legal document of title (ownership).",
      whyImportant: "Original B/L is a negotiable instrument representing legal ownership of cargo. Carrier will NOT release container at destination port without B/L surrender.",
      businessExample: "Maersk issues 3 Original Bills of Lading to China supplier. Once RBC pays balance 70% payment, supplier surrenders B/L (Telex Release) so RBC can claim container in India.",
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure: Technical and operational visualization of Bill of Lading in trade logistics.',
          highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 400
      },
      pdf: { pdfUrl: '#', title: 'Bill of Lading Practical Guide.pdf', totalPages: 2, size: '500 KB', mockPagesText: ['Page 1: Technical definitions and operations.', 'Page 2: Practical checklist.'] },
      downloadOption: { title: 'Bill of Lading Reference Sheet', fileUrl: '#', size: '75 KB', type: 'pdf' },
      relatedTopics: ['CBM', 'FCL', 'LCL', 'Customs Clearance'],
      faqs: [
        { question: 'What is the primary role of Bill of Lading?', answer: "Bill of Lading (B/L) is the primary document of title and ocean transport contract issued by shipping line." }
      ],
      commonMistakes: ["Losing original physical Bill of Lading paper documents, which requires bank guarantees and months of delay to get container released."],
      practicalTips: ["Request Telex Release (Surrender B/L) from supplier to avoid mailing physical original paper documents via international courier."],
      summary: "Bill of Lading (B/L) is the primary document of title and ocean transport contract issued by shipping line.",
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Which statement accurately describes Bill of Lading?',
          options: ["Bill of Lading (B/L) is the primary document of title and ocean transport contract issued by shipping line.", 'An illegal trading practice.', 'A tax exemption certificate.', 'A carrier penalty.'],
          correctAnswers: ['0'],
          explanation: "Bill of Lading (B/L) is the primary document of title and ocean transport contract issued by shipping line."
        }
      ],
      objectives: ['Understand operational meaning of Bill of Lading.', 'Apply rules in trade management.'],
      writtenExplanation: "Bill of Lading (B/L) is the official ocean transport document issued by shipping line serving as a cargo receipt, contract of carriage, and legal document of title (ownership).",
      importantNotes: ["Request Telex Release (Surrender B/L) from supplier to avoid mailing physical original paper documents via international courier."],
      keyPoints: ["Bill of Lading (B/L) is the primary document of title and ocean transport contract issued by shipping line."]
    };
  }

  if (title === 'Courier Shipment') {
    return {
      definition: "Courier Shipment is rapid door-to-door express parcel delivery managed by global integrators like DHL, FedEx, and UPS.",
      whyImportant: "Ideal for urgent product samples, small high-value parcels (under 50kg), and time-critical legal trade documents.",
      businessExample: "RBC sends 3 sample smartwatches to a Dubai client via DHL Express Courier in 48 hours to secure a major purchase order.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Operational logistics illustration for Courier Shipment.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 400 },
      pdf: { pdfUrl: '#', title: 'Courier Shipment Practical Guide.pdf', totalPages: 2, size: '400 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Courier Shipment Sheet', fileUrl: '#', size: '50 KB', type: 'pdf' },
      relatedTopics: ['FOB', 'CBM', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of Courier Shipment?', answer: "Courier Shipment is rapid door-to-door express parcel delivery managed by global integrators like DHL, FedEx, and UPS." }],
      commonMistakes: ['Failing to verify documentation details before shipping.'],
      practicalTips: ['Consult your logistics agent before finalizing PO terms.'],
      summary: "Courier Shipment is rapid door-to-door express parcel delivery managed by global integrators like DHL, FedEx, and UPS.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'Which statement accurately describes Courier Shipment?', options: ["Courier Shipment is rapid door-to-door express parcel delivery managed by global integrators like DHL, FedEx, and UPS.", 'An illegal practice.', 'A tax exemption.', 'A carrier fine.'], correctAnswers: ['0'], explanation: "Courier Shipment is rapid door-to-door express parcel delivery managed by global integrators like DHL, FedEx, and UPS." }],
      objectives: ['Understand operational meaning of Courier Shipment.'],
      writtenExplanation: "Courier Shipment is rapid door-to-door express parcel delivery managed by global integrators like DHL, FedEx, and UPS.",
      importantNotes: ['Always check compliance rules for Courier Shipment.'],
      keyPoints: ["Courier Shipment is rapid door-to-door express parcel delivery managed by global integrators like DHL, FedEx, and UPS."]
    };
  }

  if (title === 'Transit Time') {
    return {
      definition: "Transit Time is the total elapsed time in days required for cargo to travel from port of origin (POL) to port of destination (POD).",
      whyImportant: "Accurate transit time planning prevents supply chain stock-outs and allows precise customer delivery commitments.",
      businessExample: "Direct vessel from Shanghai to Mundra has 14 days transit time, whereas transshipment via Colombo takes 22 days.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Operational logistics illustration for Transit Time.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 400 },
      pdf: { pdfUrl: '#', title: 'Transit Time Practical Guide.pdf', totalPages: 2, size: '400 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Transit Time Sheet', fileUrl: '#', size: '50 KB', type: 'pdf' },
      relatedTopics: ['FOB', 'CBM', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of Transit Time?', answer: "Transit Time is the total elapsed time in days required for cargo to travel from port of origin (POL) to port of destination (POD)." }],
      commonMistakes: ['Failing to verify documentation details before shipping.'],
      practicalTips: ['Consult your logistics agent before finalizing PO terms.'],
      summary: "Transit Time is the total elapsed time in days required for cargo to travel from port of origin (POL) to port of destination (POD).",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'Which statement accurately describes Transit Time?', options: ["Transit Time is the total elapsed time in days required for cargo to travel from port of origin (POL) to port of destination (POD).", 'An illegal practice.', 'A tax exemption.', 'A carrier fine.'], correctAnswers: ['0'], explanation: "Transit Time is the total elapsed time in days required for cargo to travel from port of origin (POL) to port of destination (POD)." }],
      objectives: ['Understand operational meaning of Transit Time.'],
      writtenExplanation: "Transit Time is the total elapsed time in days required for cargo to travel from port of origin (POL) to port of destination (POD).",
      importantNotes: ['Always check compliance rules for Transit Time.'],
      keyPoints: ["Transit Time is the total elapsed time in days required for cargo to travel from port of origin (POL) to port of destination (POD)."]
    };
  }

  if (title === 'ETD') {
    return {
      definition: "ETD (Estimated Time of Departure) is the scheduled date and time when a shipping vessel or cargo plane departs from origin port.",
      whyImportant: "Tracking ETD allows buyers to confirm production completion and notify destination agents for pre-arrival clearance.",
      businessExample: "Supplier confirms ETD = August 10 from Ningbo Port. RBC tracks vessel departure to align inland logistics.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Operational logistics illustration for ETD.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 400 },
      pdf: { pdfUrl: '#', title: 'ETD Practical Guide.pdf', totalPages: 2, size: '400 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'ETD Sheet', fileUrl: '#', size: '50 KB', type: 'pdf' },
      relatedTopics: ['FOB', 'CBM', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of ETD?', answer: "ETD (Estimated Time of Departure) is the scheduled date and time when a shipping vessel or cargo plane departs from origin port." }],
      commonMistakes: ['Failing to verify documentation details before shipping.'],
      practicalTips: ['Consult your logistics agent before finalizing PO terms.'],
      summary: "ETD (Estimated Time of Departure) is the scheduled date and time when a shipping vessel or cargo plane departs from origin port.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'Which statement accurately describes ETD?', options: ["ETD (Estimated Time of Departure) is the scheduled date and time when a shipping vessel or cargo plane departs from origin port.", 'An illegal practice.', 'A tax exemption.', 'A carrier fine.'], correctAnswers: ['0'], explanation: "ETD (Estimated Time of Departure) is the scheduled date and time when a shipping vessel or cargo plane departs from origin port." }],
      objectives: ['Understand operational meaning of ETD.'],
      writtenExplanation: "ETD (Estimated Time of Departure) is the scheduled date and time when a shipping vessel or cargo plane departs from origin port.",
      importantNotes: ['Always check compliance rules for ETD.'],
      keyPoints: ["ETD (Estimated Time of Departure) is the scheduled date and time when a shipping vessel or cargo plane departs from origin port."]
    };
  }

  if (title === 'ETA') {
    return {
      definition: "ETA (Estimated Time of Arrival) is the anticipated date and time when vessel or aircraft arrives at destination port.",
      whyImportant: "Knowing ETA enables importers to file advance Bill of Entry, avoid port storage penalties, and arrange transport.",
      businessExample: "ETA at Mundra Port is August 24. RBC files advance customs Bill of Entry 2 days before ETA for instant clearance upon arrival.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Operational logistics illustration for ETA.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 400 },
      pdf: { pdfUrl: '#', title: 'ETA Practical Guide.pdf', totalPages: 2, size: '400 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'ETA Sheet', fileUrl: '#', size: '50 KB', type: 'pdf' },
      relatedTopics: ['FOB', 'CBM', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of ETA?', answer: "ETA (Estimated Time of Arrival) is the anticipated date and time when vessel or aircraft arrives at destination port." }],
      commonMistakes: ['Failing to verify documentation details before shipping.'],
      practicalTips: ['Consult your logistics agent before finalizing PO terms.'],
      summary: "ETA (Estimated Time of Arrival) is the anticipated date and time when vessel or aircraft arrives at destination port.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'Which statement accurately describes ETA?', options: ["ETA (Estimated Time of Arrival) is the anticipated date and time when vessel or aircraft arrives at destination port.", 'An illegal practice.', 'A tax exemption.', 'A carrier fine.'], correctAnswers: ['0'], explanation: "ETA (Estimated Time of Arrival) is the anticipated date and time when vessel or aircraft arrives at destination port." }],
      objectives: ['Understand operational meaning of ETA.'],
      writtenExplanation: "ETA (Estimated Time of Arrival) is the anticipated date and time when vessel or aircraft arrives at destination port.",
      importantNotes: ['Always check compliance rules for ETA.'],
      keyPoints: ["ETA (Estimated Time of Arrival) is the anticipated date and time when vessel or aircraft arrives at destination port."]
    };
  }

  if (title === 'Vessel') {
    return {
      definition: "Vessel is a commercial ocean-going cargo ship (container carrier, bulk vessel, tanker) used to transport goods internationally.",
      whyImportant: "Vessel capacity and carrier service routes dictate ocean freight availability, transit frequency, and container space allocation.",
      businessExample: "Mega container vessel \"MSC Irina\" carries up to 24,000 TEU containers across international trade lanes.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Operational logistics illustration for Vessel.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 400 },
      pdf: { pdfUrl: '#', title: 'Vessel Practical Guide.pdf', totalPages: 2, size: '400 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Vessel Sheet', fileUrl: '#', size: '50 KB', type: 'pdf' },
      relatedTopics: ['FOB', 'CBM', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of Vessel?', answer: "Vessel is a commercial ocean-going cargo ship (container carrier, bulk vessel, tanker) used to transport goods internationally." }],
      commonMistakes: ['Failing to verify documentation details before shipping.'],
      practicalTips: ['Consult your logistics agent before finalizing PO terms.'],
      summary: "Vessel is a commercial ocean-going cargo ship (container carrier, bulk vessel, tanker) used to transport goods internationally.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'Which statement accurately describes Vessel?', options: ["Vessel is a commercial ocean-going cargo ship (container carrier, bulk vessel, tanker) used to transport goods internationally.", 'An illegal practice.', 'A tax exemption.', 'A carrier fine.'], correctAnswers: ['0'], explanation: "Vessel is a commercial ocean-going cargo ship (container carrier, bulk vessel, tanker) used to transport goods internationally." }],
      objectives: ['Understand operational meaning of Vessel.'],
      writtenExplanation: "Vessel is a commercial ocean-going cargo ship (container carrier, bulk vessel, tanker) used to transport goods internationally.",
      importantNotes: ['Always check compliance rules for Vessel.'],
      keyPoints: ["Vessel is a commercial ocean-going cargo ship (container carrier, bulk vessel, tanker) used to transport goods internationally."]
    };
  }

  if (title === 'Voyage') {
    return {
      definition: "Voyage is the unique alphanumeric identification code assigned to a specific ocean journey of a cargo vessel.",
      whyImportant: "Pairing Vessel Name with Voyage Number on shipping documents is mandatory for container tracking and customs filing.",
      businessExample: "Bill of Lading specifies Vessel: \"MAERSK HANOI\", Voyage: \"328W\" departing Ningbo for Mundra.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Operational logistics illustration for Voyage.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 400 },
      pdf: { pdfUrl: '#', title: 'Voyage Practical Guide.pdf', totalPages: 2, size: '400 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Voyage Sheet', fileUrl: '#', size: '50 KB', type: 'pdf' },
      relatedTopics: ['FOB', 'CBM', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of Voyage?', answer: "Voyage is the unique alphanumeric identification code assigned to a specific ocean journey of a cargo vessel." }],
      commonMistakes: ['Failing to verify documentation details before shipping.'],
      practicalTips: ['Consult your logistics agent before finalizing PO terms.'],
      summary: "Voyage is the unique alphanumeric identification code assigned to a specific ocean journey of a cargo vessel.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'Which statement accurately describes Voyage?', options: ["Voyage is the unique alphanumeric identification code assigned to a specific ocean journey of a cargo vessel.", 'An illegal practice.', 'A tax exemption.', 'A carrier fine.'], correctAnswers: ['0'], explanation: "Voyage is the unique alphanumeric identification code assigned to a specific ocean journey of a cargo vessel." }],
      objectives: ['Understand operational meaning of Voyage.'],
      writtenExplanation: "Voyage is the unique alphanumeric identification code assigned to a specific ocean journey of a cargo vessel.",
      importantNotes: ['Always check compliance rules for Voyage.'],
      keyPoints: ["Voyage is the unique alphanumeric identification code assigned to a specific ocean journey of a cargo vessel."]
    };
  }

  if (title === 'Mother Vessel') {
    return {
      definition: "Mother Vessel is a large mainline ocean container ship operating on major intercontinental routes between global hub ports.",
      whyImportant: "Mother Vessels carry thousands of containers deep sea across continents at maximum fuel efficiency and lower unit costs.",
      businessExample: "Mother Vessel \"EVER GIVEN\" transports containers across deep ocean routes from Shanghai hub to Rotterdam hub.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Operational logistics illustration for Mother Vessel.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 400 },
      pdf: { pdfUrl: '#', title: 'Mother Vessel Practical Guide.pdf', totalPages: 2, size: '400 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Mother Vessel Sheet', fileUrl: '#', size: '50 KB', type: 'pdf' },
      relatedTopics: ['FOB', 'CBM', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of Mother Vessel?', answer: "Mother Vessel is a large mainline ocean container ship operating on major intercontinental routes between global hub ports." }],
      commonMistakes: ['Failing to verify documentation details before shipping.'],
      practicalTips: ['Consult your logistics agent before finalizing PO terms.'],
      summary: "Mother Vessel is a large mainline ocean container ship operating on major intercontinental routes between global hub ports.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'Which statement accurately describes Mother Vessel?', options: ["Mother Vessel is a large mainline ocean container ship operating on major intercontinental routes between global hub ports.", 'An illegal practice.', 'A tax exemption.', 'A carrier fine.'], correctAnswers: ['0'], explanation: "Mother Vessel is a large mainline ocean container ship operating on major intercontinental routes between global hub ports." }],
      objectives: ['Understand operational meaning of Mother Vessel.'],
      writtenExplanation: "Mother Vessel is a large mainline ocean container ship operating on major intercontinental routes between global hub ports.",
      importantNotes: ['Always check compliance rules for Mother Vessel.'],
      keyPoints: ["Mother Vessel is a large mainline ocean container ship operating on major intercontinental routes between global hub ports."]
    };
  }

  if (title === 'Feeder Vessel') {
    return {
      definition: "Feeder Vessel is a smaller regional cargo ship carrying containers between regional ports and major ocean hub ports.",
      whyImportant: "Feeder vessels connect regional ports (like Kolkata or Visakhapatnam) to deep-water mega hub ports (like Singapore or Colombo).",
      businessExample: "A feeder vessel carries RBC\'s container from Chennai Port to Colombo hub to connect onto the Mother Vessel for Europe.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Operational logistics illustration for Feeder Vessel.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 400 },
      pdf: { pdfUrl: '#', title: 'Feeder Vessel Practical Guide.pdf', totalPages: 2, size: '400 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Feeder Vessel Sheet', fileUrl: '#', size: '50 KB', type: 'pdf' },
      relatedTopics: ['FOB', 'CBM', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of Feeder Vessel?', answer: "Feeder Vessel is a smaller regional cargo ship carrying containers between regional ports and major ocean hub ports." }],
      commonMistakes: ['Failing to verify documentation details before shipping.'],
      practicalTips: ['Consult your logistics agent before finalizing PO terms.'],
      summary: "Feeder Vessel is a smaller regional cargo ship carrying containers between regional ports and major ocean hub ports.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'Which statement accurately describes Feeder Vessel?', options: ["Feeder Vessel is a smaller regional cargo ship carrying containers between regional ports and major ocean hub ports.", 'An illegal practice.', 'A tax exemption.', 'A carrier fine.'], correctAnswers: ['0'], explanation: "Feeder Vessel is a smaller regional cargo ship carrying containers between regional ports and major ocean hub ports." }],
      objectives: ['Understand operational meaning of Feeder Vessel.'],
      writtenExplanation: "Feeder Vessel is a smaller regional cargo ship carrying containers between regional ports and major ocean hub ports.",
      importantNotes: ['Always check compliance rules for Feeder Vessel.'],
      keyPoints: ["Feeder Vessel is a smaller regional cargo ship carrying containers between regional ports and major ocean hub ports."]
    };
  }

  if (title === 'EXW') {
    return {
      definition: "EXW (Ex Works) means seller makes goods available at factory floor. Buyer assumes 100% transport cost, risk, and customs clearance.",
      whyImportant: "Gives buyer maximum control over freight routing, but places full responsibility for origin customs clearance on buyer.",
      businessExample: "RBC buys EXW Yiwu factory at $5/pc. RBC arranges pickup truck in China, export customs, ocean freight, and import clearance.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Operational logistics illustration for EXW.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 400 },
      pdf: { pdfUrl: '#', title: 'EXW Practical Guide.pdf', totalPages: 2, size: '400 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'EXW Sheet', fileUrl: '#', size: '50 KB', type: 'pdf' },
      relatedTopics: ['FOB', 'CBM', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of EXW?', answer: "EXW (Ex Works) means seller makes goods available at factory floor. Buyer assumes 100% transport cost, risk, and customs clearance." }],
      commonMistakes: ['Failing to verify documentation details before shipping.'],
      practicalTips: ['Consult your logistics agent before finalizing PO terms.'],
      summary: "EXW (Ex Works) means seller makes goods available at factory floor. Buyer assumes 100% transport cost, risk, and customs clearance.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'Which statement accurately describes EXW?', options: ["EXW (Ex Works) means seller makes goods available at factory floor. Buyer assumes 100% transport cost, risk, and customs clearance.", 'An illegal practice.', 'A tax exemption.', 'A carrier fine.'], correctAnswers: ['0'], explanation: "EXW (Ex Works) means seller makes goods available at factory floor. Buyer assumes 100% transport cost, risk, and customs clearance." }],
      objectives: ['Understand operational meaning of EXW.'],
      writtenExplanation: "EXW (Ex Works) means seller makes goods available at factory floor. Buyer assumes 100% transport cost, risk, and customs clearance.",
      importantNotes: ['Always check compliance rules for EXW.'],
      keyPoints: ["EXW (Ex Works) means seller makes goods available at factory floor. Buyer assumes 100% transport cost, risk, and customs clearance."]
    };
  }

  if (title === 'FCA') {
    return {
      definition: "FCA (Free Carrier) means seller delivers goods to buyer\'s named carrier warehouse at origin port or inland depot.",
      whyImportant: "FCA is ideal for containerized air/sea freight where seller handles export clearance and delivers to forwarder hub.",
      businessExample: "Supplier delivers goods to RBC\'s appointed forwarder warehouse in Guangzhou under FCA terms.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Operational logistics illustration for FCA.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 400 },
      pdf: { pdfUrl: '#', title: 'FCA Practical Guide.pdf', totalPages: 2, size: '400 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'FCA Sheet', fileUrl: '#', size: '50 KB', type: 'pdf' },
      relatedTopics: ['FOB', 'CBM', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of FCA?', answer: "FCA (Free Carrier) means seller delivers goods to buyer\'s named carrier warehouse at origin port or inland depot." }],
      commonMistakes: ['Failing to verify documentation details before shipping.'],
      practicalTips: ['Consult your logistics agent before finalizing PO terms.'],
      summary: "FCA (Free Carrier) means seller delivers goods to buyer\'s named carrier warehouse at origin port or inland depot.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'Which statement accurately describes FCA?', options: ["FCA (Free Carrier) means seller delivers goods to buyer\'s named carrier warehouse at origin port or inland depot.", 'An illegal practice.', 'A tax exemption.', 'A carrier fine.'], correctAnswers: ['0'], explanation: "FCA (Free Carrier) means seller delivers goods to buyer\'s named carrier warehouse at origin port or inland depot." }],
      objectives: ['Understand operational meaning of FCA.'],
      writtenExplanation: "FCA (Free Carrier) means seller delivers goods to buyer\'s named carrier warehouse at origin port or inland depot.",
      importantNotes: ['Always check compliance rules for FCA.'],
      keyPoints: ["FCA (Free Carrier) means seller delivers goods to buyer\'s named carrier warehouse at origin port or inland depot."]
    };
  }

  if (title === 'CIF') {
    return {
      definition: "CIF (Cost, Insurance, Freight) means seller pays ocean freight and marine insurance to destination port. Buyer pays import customs duty & port unloading.",
      whyImportant: "Reduces buyer logistics burden, but seller controls carrier choice and marine insurance coverage policy limits.",
      businessExample: "Supplier quotes CIF Mundra Port $15/unit. Supplier pays sea freight and marine insurance until vessel reaches Mundra.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Operational logistics illustration for CIF.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 400 },
      pdf: { pdfUrl: '#', title: 'CIF Practical Guide.pdf', totalPages: 2, size: '400 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'CIF Sheet', fileUrl: '#', size: '50 KB', type: 'pdf' },
      relatedTopics: ['FOB', 'CBM', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of CIF?', answer: "CIF (Cost, Insurance, Freight) means seller pays ocean freight and marine insurance to destination port. Buyer pays import customs duty & port unloading." }],
      commonMistakes: ['Failing to verify documentation details before shipping.'],
      practicalTips: ['Consult your logistics agent before finalizing PO terms.'],
      summary: "CIF (Cost, Insurance, Freight) means seller pays ocean freight and marine insurance to destination port. Buyer pays import customs duty & port unloading.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'Which statement accurately describes CIF?', options: ["CIF (Cost, Insurance, Freight) means seller pays ocean freight and marine insurance to destination port. Buyer pays import customs duty & port unloading.", 'An illegal practice.', 'A tax exemption.', 'A carrier fine.'], correctAnswers: ['0'], explanation: "CIF (Cost, Insurance, Freight) means seller pays ocean freight and marine insurance to destination port. Buyer pays import customs duty & port unloading." }],
      objectives: ['Understand operational meaning of CIF.'],
      writtenExplanation: "CIF (Cost, Insurance, Freight) means seller pays ocean freight and marine insurance to destination port. Buyer pays import customs duty & port unloading.",
      importantNotes: ['Always check compliance rules for CIF.'],
      keyPoints: ["CIF (Cost, Insurance, Freight) means seller pays ocean freight and marine insurance to destination port. Buyer pays import customs duty & port unloading."]
    };
  }

  if (title === 'CFR') {
    return {
      definition: "CFR (Cost and Freight) means seller pays ocean freight to destination port, but buyer purchases marine cargo insurance.",
      whyImportant: "Allows buyer to purchase custom comprehensive cargo insurance while seller handles main ocean shipping rates.",
      businessExample: "Supplier pays sea freight to Nhava Sheva (CFR terms). RBC buys separate marine insurance policy from HDFC ERGO.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Operational logistics illustration for CFR.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 400 },
      pdf: { pdfUrl: '#', title: 'CFR Practical Guide.pdf', totalPages: 2, size: '400 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'CFR Sheet', fileUrl: '#', size: '50 KB', type: 'pdf' },
      relatedTopics: ['FOB', 'CBM', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of CFR?', answer: "CFR (Cost and Freight) means seller pays ocean freight to destination port, but buyer purchases marine cargo insurance." }],
      commonMistakes: ['Failing to verify documentation details before shipping.'],
      practicalTips: ['Consult your logistics agent before finalizing PO terms.'],
      summary: "CFR (Cost and Freight) means seller pays ocean freight to destination port, but buyer purchases marine cargo insurance.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'Which statement accurately describes CFR?', options: ["CFR (Cost and Freight) means seller pays ocean freight to destination port, but buyer purchases marine cargo insurance.", 'An illegal practice.', 'A tax exemption.', 'A carrier fine.'], correctAnswers: ['0'], explanation: "CFR (Cost and Freight) means seller pays ocean freight to destination port, but buyer purchases marine cargo insurance." }],
      objectives: ['Understand operational meaning of CFR.'],
      writtenExplanation: "CFR (Cost and Freight) means seller pays ocean freight to destination port, but buyer purchases marine cargo insurance.",
      importantNotes: ['Always check compliance rules for CFR.'],
      keyPoints: ["CFR (Cost and Freight) means seller pays ocean freight to destination port, but buyer purchases marine cargo insurance."]
    };
  }

  if (title === 'DDP') {
    return {
      definition: "DDP (Delivered Duty Paid) means seller handles entire logistics including ocean freight, customs duty, taxes, and final door delivery. Maximum seller risk.",
      whyImportant: "Hassle-free for buyers who receive goods at factory door like a domestic sale, but seller assumes all customs delays and duty risks.",
      businessExample: "Supplier delivers goods directly to RBC warehouse in Ahmedabad under DDP terms with all customs duties paid.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Operational logistics illustration for DDP.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 400 },
      pdf: { pdfUrl: '#', title: 'DDP Practical Guide.pdf', totalPages: 2, size: '400 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'DDP Sheet', fileUrl: '#', size: '50 KB', type: 'pdf' },
      relatedTopics: ['FOB', 'CBM', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of DDP?', answer: "DDP (Delivered Duty Paid) means seller handles entire logistics including ocean freight, customs duty, taxes, and final door delivery. Maximum seller risk." }],
      commonMistakes: ['Failing to verify documentation details before shipping.'],
      practicalTips: ['Consult your logistics agent before finalizing PO terms.'],
      summary: "DDP (Delivered Duty Paid) means seller handles entire logistics including ocean freight, customs duty, taxes, and final door delivery. Maximum seller risk.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'Which statement accurately describes DDP?', options: ["DDP (Delivered Duty Paid) means seller handles entire logistics including ocean freight, customs duty, taxes, and final door delivery. Maximum seller risk.", 'An illegal practice.', 'A tax exemption.', 'A carrier fine.'], correctAnswers: ['0'], explanation: "DDP (Delivered Duty Paid) means seller handles entire logistics including ocean freight, customs duty, taxes, and final door delivery. Maximum seller risk." }],
      objectives: ['Understand operational meaning of DDP.'],
      writtenExplanation: "DDP (Delivered Duty Paid) means seller handles entire logistics including ocean freight, customs duty, taxes, and final door delivery. Maximum seller risk.",
      importantNotes: ['Always check compliance rules for DDP.'],
      keyPoints: ["DDP (Delivered Duty Paid) means seller handles entire logistics including ocean freight, customs duty, taxes, and final door delivery. Maximum seller risk."]
    };
  }

  if (title === 'DAP') {
    return {
      definition: "DAP (Delivered At Place) means seller delivers cargo to buyer door, but buyer pays import customs duties and taxes.",
      whyImportant: "Ensures seller manages door logistics while buyer handles domestic tax compliance and customs duty payment.",
      businessExample: "Supplier delivers container to RBC warehouse door under DAP terms, and RBC pays Indian customs duty directly.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Operational logistics illustration for DAP.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 400 },
      pdf: { pdfUrl: '#', title: 'DAP Practical Guide.pdf', totalPages: 2, size: '400 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'DAP Sheet', fileUrl: '#', size: '50 KB', type: 'pdf' },
      relatedTopics: ['FOB', 'CBM', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of DAP?', answer: "DAP (Delivered At Place) means seller delivers cargo to buyer door, but buyer pays import customs duties and taxes." }],
      commonMistakes: ['Failing to verify documentation details before shipping.'],
      practicalTips: ['Consult your logistics agent before finalizing PO terms.'],
      summary: "DAP (Delivered At Place) means seller delivers cargo to buyer door, but buyer pays import customs duties and taxes.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'Which statement accurately describes DAP?', options: ["DAP (Delivered At Place) means seller delivers cargo to buyer door, but buyer pays import customs duties and taxes.", 'An illegal practice.', 'A tax exemption.', 'A carrier fine.'], correctAnswers: ['0'], explanation: "DAP (Delivered At Place) means seller delivers cargo to buyer door, but buyer pays import customs duties and taxes." }],
      objectives: ['Understand operational meaning of DAP.'],
      writtenExplanation: "DAP (Delivered At Place) means seller delivers cargo to buyer door, but buyer pays import customs duties and taxes.",
      importantNotes: ['Always check compliance rules for DAP.'],
      keyPoints: ["DAP (Delivered At Place) means seller delivers cargo to buyer door, but buyer pays import customs duties and taxes."]
    };
  }

  if (title === 'CIP') {
    return {
      definition: "CIP (Carriage and Insurance Paid to) is multimodal Incoterm where seller pays carriage + all-risk insurance to destination place.",
      whyImportant: "Mandates seller to purchase high-level Institute Cargo Clauses (A) all-risk insurance coverage for buyer benefit.",
      businessExample: "Air freight shipment under CIP Mumbai Airport terms. Seller pays air freight and all-risk insurance.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Operational logistics illustration for CIP.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 400 },
      pdf: { pdfUrl: '#', title: 'CIP Practical Guide.pdf', totalPages: 2, size: '400 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'CIP Sheet', fileUrl: '#', size: '50 KB', type: 'pdf' },
      relatedTopics: ['FOB', 'CBM', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of CIP?', answer: "CIP (Carriage and Insurance Paid to) is multimodal Incoterm where seller pays carriage + all-risk insurance to destination place." }],
      commonMistakes: ['Failing to verify documentation details before shipping.'],
      practicalTips: ['Consult your logistics agent before finalizing PO terms.'],
      summary: "CIP (Carriage and Insurance Paid to) is multimodal Incoterm where seller pays carriage + all-risk insurance to destination place.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'Which statement accurately describes CIP?', options: ["CIP (Carriage and Insurance Paid to) is multimodal Incoterm where seller pays carriage + all-risk insurance to destination place.", 'An illegal practice.', 'A tax exemption.', 'A carrier fine.'], correctAnswers: ['0'], explanation: "CIP (Carriage and Insurance Paid to) is multimodal Incoterm where seller pays carriage + all-risk insurance to destination place." }],
      objectives: ['Understand operational meaning of CIP.'],
      writtenExplanation: "CIP (Carriage and Insurance Paid to) is multimodal Incoterm where seller pays carriage + all-risk insurance to destination place.",
      importantNotes: ['Always check compliance rules for CIP.'],
      keyPoints: ["CIP (Carriage and Insurance Paid to) is multimodal Incoterm where seller pays carriage + all-risk insurance to destination place."]
    };
  }

  if (title === 'CPT') {
    return {
      definition: "CPT (Carriage Paid To) is multimodal Incoterm where seller pays main freight carriage to named destination place.",
      whyImportant: "Used for rail, road, or air transport where seller pays freight up to inland terminal and buyer arranges insurance.",
      businessExample: "Truck transport under CPT ICD Ahmedabad terms. Seller pays freight up to ICD depot.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Operational logistics illustration for CPT.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 400 },
      pdf: { pdfUrl: '#', title: 'CPT Practical Guide.pdf', totalPages: 2, size: '400 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'CPT Sheet', fileUrl: '#', size: '50 KB', type: 'pdf' },
      relatedTopics: ['FOB', 'CBM', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of CPT?', answer: "CPT (Carriage Paid To) is multimodal Incoterm where seller pays main freight carriage to named destination place." }],
      commonMistakes: ['Failing to verify documentation details before shipping.'],
      practicalTips: ['Consult your logistics agent before finalizing PO terms.'],
      summary: "CPT (Carriage Paid To) is multimodal Incoterm where seller pays main freight carriage to named destination place.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'Which statement accurately describes CPT?', options: ["CPT (Carriage Paid To) is multimodal Incoterm where seller pays main freight carriage to named destination place.", 'An illegal practice.', 'A tax exemption.', 'A carrier fine.'], correctAnswers: ['0'], explanation: "CPT (Carriage Paid To) is multimodal Incoterm where seller pays main freight carriage to named destination place." }],
      objectives: ['Understand operational meaning of CPT.'],
      writtenExplanation: "CPT (Carriage Paid To) is multimodal Incoterm where seller pays main freight carriage to named destination place.",
      importantNotes: ['Always check compliance rules for CPT.'],
      keyPoints: ["CPT (Carriage Paid To) is multimodal Incoterm where seller pays main freight carriage to named destination place."]
    };
  }

  if (title === 'Warehouse') {
    return {
      definition: "Warehouse is a commercial facility designed for storage of raw materials, inventory management, order picking, and distribution.",
      whyImportant: "Efficient warehousing prevents inventory damage, maintains stock security, and speeds up customer order fulfillment.",
      businessExample: "RBC stores cleared import stocks in their 10,000 sq ft central warehouse in Ahmedabad for pan-India distribution.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Operational logistics illustration for Warehouse.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 400 },
      pdf: { pdfUrl: '#', title: 'Warehouse Practical Guide.pdf', totalPages: 2, size: '400 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Warehouse Sheet', fileUrl: '#', size: '50 KB', type: 'pdf' },
      relatedTopics: ['FOB', 'CBM', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of Warehouse?', answer: "Warehouse is a commercial facility designed for storage of raw materials, inventory management, order picking, and distribution." }],
      commonMistakes: ['Failing to verify documentation details before shipping.'],
      practicalTips: ['Consult your logistics agent before finalizing PO terms.'],
      summary: "Warehouse is a commercial facility designed for storage of raw materials, inventory management, order picking, and distribution.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'Which statement accurately describes Warehouse?', options: ["Warehouse is a commercial facility designed for storage of raw materials, inventory management, order picking, and distribution.", 'An illegal practice.', 'A tax exemption.', 'A carrier fine.'], correctAnswers: ['0'], explanation: "Warehouse is a commercial facility designed for storage of raw materials, inventory management, order picking, and distribution." }],
      objectives: ['Understand operational meaning of Warehouse.'],
      writtenExplanation: "Warehouse is a commercial facility designed for storage of raw materials, inventory management, order picking, and distribution.",
      importantNotes: ['Always check compliance rules for Warehouse.'],
      keyPoints: ["Warehouse is a commercial facility designed for storage of raw materials, inventory management, order picking, and distribution."]
    };
  }

  if (title === 'Bonded Warehouse') {
    return {
      definition: "Bonded Warehouse is a customs-controlled storage building where imported goods can be stored duty-free until cleared for domestic sale.",
      whyImportant: "Helps importers defer customs duty payment until goods are sold, improving cash flow management.",
      businessExample: "RBC stores 5 containers of high-value machinery in Mundra Bonded Warehouse, paying duty on 1 container at a time as sold.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Operational logistics illustration for Bonded Warehouse.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 400 },
      pdf: { pdfUrl: '#', title: 'Bonded Warehouse Practical Guide.pdf', totalPages: 2, size: '400 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Bonded Warehouse Sheet', fileUrl: '#', size: '50 KB', type: 'pdf' },
      relatedTopics: ['FOB', 'CBM', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of Bonded Warehouse?', answer: "Bonded Warehouse is a customs-controlled storage building where imported goods can be stored duty-free until cleared for domestic sale." }],
      commonMistakes: ['Failing to verify documentation details before shipping.'],
      practicalTips: ['Consult your logistics agent before finalizing PO terms.'],
      summary: "Bonded Warehouse is a customs-controlled storage building where imported goods can be stored duty-free until cleared for domestic sale.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'Which statement accurately describes Bonded Warehouse?', options: ["Bonded Warehouse is a customs-controlled storage building where imported goods can be stored duty-free until cleared for domestic sale.", 'An illegal practice.', 'A tax exemption.', 'A carrier fine.'], correctAnswers: ['0'], explanation: "Bonded Warehouse is a customs-controlled storage building where imported goods can be stored duty-free until cleared for domestic sale." }],
      objectives: ['Understand operational meaning of Bonded Warehouse.'],
      writtenExplanation: "Bonded Warehouse is a customs-controlled storage building where imported goods can be stored duty-free until cleared for domestic sale.",
      importantNotes: ['Always check compliance rules for Bonded Warehouse.'],
      keyPoints: ["Bonded Warehouse is a customs-controlled storage building where imported goods can be stored duty-free until cleared for domestic sale."]
    };
  }

  if (title === 'Last Mile Delivery') {
    return {
      definition: "Last Mile Delivery is the final transportation leg moving cleared cargo from regional warehouse to final customer door.",
      whyImportant: "Critical for customer satisfaction and logistics speed, accounting for over 50% of total shipping experience.",
      businessExample: "RBC uses local express trucks for last mile delivery of imported solar panels from ICD depot to client factory door.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Operational logistics illustration for Last Mile Delivery.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 400 },
      pdf: { pdfUrl: '#', title: 'Last Mile Delivery Practical Guide.pdf', totalPages: 2, size: '400 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Last Mile Delivery Sheet', fileUrl: '#', size: '50 KB', type: 'pdf' },
      relatedTopics: ['FOB', 'CBM', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of Last Mile Delivery?', answer: "Last Mile Delivery is the final transportation leg moving cleared cargo from regional warehouse to final customer door." }],
      commonMistakes: ['Failing to verify documentation details before shipping.'],
      practicalTips: ['Consult your logistics agent before finalizing PO terms.'],
      summary: "Last Mile Delivery is the final transportation leg moving cleared cargo from regional warehouse to final customer door.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'Which statement accurately describes Last Mile Delivery?', options: ["Last Mile Delivery is the final transportation leg moving cleared cargo from regional warehouse to final customer door.", 'An illegal practice.', 'A tax exemption.', 'A carrier fine.'], correctAnswers: ['0'], explanation: "Last Mile Delivery is the final transportation leg moving cleared cargo from regional warehouse to final customer door." }],
      objectives: ['Understand operational meaning of Last Mile Delivery.'],
      writtenExplanation: "Last Mile Delivery is the final transportation leg moving cleared cargo from regional warehouse to final customer door.",
      importantNotes: ['Always check compliance rules for Last Mile Delivery.'],
      keyPoints: ["Last Mile Delivery is the final transportation leg moving cleared cargo from regional warehouse to final customer door."]
    };
  }

  if (title === 'Door Delivery') {
    return {
      definition: "Door Delivery is an end-to-end shipping service where logistics provider handles pickup at factory door and delivery to importer door.",
      whyImportant: "Eliminates multiple freight intermediaries, offering single-window accountability for entire shipment journey.",
      businessExample: "RBC hires DHL Global Forwarding for door delivery of electronic components from Shenzhen factory to RBC Bangalore facility.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Operational logistics illustration for Door Delivery.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 400 },
      pdf: { pdfUrl: '#', title: 'Door Delivery Practical Guide.pdf', totalPages: 2, size: '400 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Door Delivery Sheet', fileUrl: '#', size: '50 KB', type: 'pdf' },
      relatedTopics: ['FOB', 'CBM', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of Door Delivery?', answer: "Door Delivery is an end-to-end shipping service where logistics provider handles pickup at factory door and delivery to importer door." }],
      commonMistakes: ['Failing to verify documentation details before shipping.'],
      practicalTips: ['Consult your logistics agent before finalizing PO terms.'],
      summary: "Door Delivery is an end-to-end shipping service where logistics provider handles pickup at factory door and delivery to importer door.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'Which statement accurately describes Door Delivery?', options: ["Door Delivery is an end-to-end shipping service where logistics provider handles pickup at factory door and delivery to importer door.", 'An illegal practice.', 'A tax exemption.', 'A carrier fine.'], correctAnswers: ['0'], explanation: "Door Delivery is an end-to-end shipping service where logistics provider handles pickup at factory door and delivery to importer door." }],
      objectives: ['Understand operational meaning of Door Delivery.'],
      writtenExplanation: "Door Delivery is an end-to-end shipping service where logistics provider handles pickup at factory door and delivery to importer door.",
      importantNotes: ['Always check compliance rules for Door Delivery.'],
      keyPoints: ["Door Delivery is an end-to-end shipping service where logistics provider handles pickup at factory door and delivery to importer door."]
    };
  }

  if (title === 'Fumigation Certificate') {
    return {
      definition: "Fumigation Certificate is an official pest control document certifying that wooden packaging materials (pallets, crates) have been chemically treated (ISPM-15) to kill timber pests before shipment.",
      whyImportant: "Required by quarantine authorities in India, USA, Australia, and EU. Unfumigated wood leads to immediate container rejection at destination port or expensive forced quarantine treatment.",
      businessExample: "RBC imports 20 tons of tiles on wooden pallets from China. RBC requires the supplier to furnish an ISPM-15 Fumigation Certificate issued by a licensed quarantine authority before shipping.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Technical visualization for Fumigation Certificate.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'Fumigation Certificate Guide.pdf', totalPages: 2, size: '450 KB', mockPagesText: ['Page 1: Overview.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Fumigation Certificate Sheet', fileUrl: '#', size: '55 KB', type: 'pdf' },
      relatedTopics: ['Customs Clearance', 'Bill of Lading', 'FOB'],
      faqs: [{ question: 'What is the role of Fumigation Certificate?', answer: "Fumigation Certificate is an official pest control document certifying that wooden packaging materials (pallets, crates) have been chemically treated (ISPM-15) to kill timber pests before shipment." }],
      commonMistakes: ['Failing to verify document details before submission.'],
      practicalTips: ['Always double-check HSN codes and values.'],
      summary: "Fumigation Certificate is an official pest control document certifying that wooden packaging materials (pallets, crates) have been chemically treated (ISPM-15) to kill timber pests before shipment.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What is Fumigation Certificate?', options: ["Fumigation Certificate is an official pest control document certifying that wooden packaging materials (pallets, crates) have been chemically treated (ISPM-15) to kill timber pests before shipment.", 'A tax penalty.', 'An illegal trade practice.', 'A shipping carrier.'], correctAnswers: ['0'], explanation: "Fumigation Certificate is an official pest control document certifying that wooden packaging materials (pallets, crates) have been chemically treated (ISPM-15) to kill timber pests before shipment." }],
      objectives: ['Understand operational meaning of Fumigation Certificate.'],
      writtenExplanation: "Fumigation Certificate is an official pest control document certifying that wooden packaging materials (pallets, crates) have been chemically treated (ISPM-15) to kill timber pests before shipment.",
      importantNotes: ['Verify all details on Fumigation Certificate.'],
      keyPoints: ["Fumigation Certificate is an official pest control document certifying that wooden packaging materials (pallets, crates) have been chemically treated (ISPM-15) to kill timber pests before shipment."]
    };
  }

  if (title === 'Inspection Certificate') {
    return {
      definition: "Inspection Certificate is a quality, quantity, and technical compliance audit report issued by an independent inspection agency (such as SGS, Intertek, or TÜV) after physically auditing finished goods at the factory.",
      whyImportant: "Protects buyers from receiving defective goods, short quantities, or wrong specifications before releasing the final balance payment to overseas suppliers.",
      businessExample: "RBC hires SGS to perform a pre-shipment inspection of 1,000 laptops at the Shenzhen factory. SGS issues an Inspection Certificate confirming zero defects before RBC wires the 70% balance payment.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Technical visualization for Inspection Certificate.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'Inspection Certificate Guide.pdf', totalPages: 2, size: '450 KB', mockPagesText: ['Page 1: Overview.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Inspection Certificate Sheet', fileUrl: '#', size: '55 KB', type: 'pdf' },
      relatedTopics: ['Customs Clearance', 'Bill of Lading', 'FOB'],
      faqs: [{ question: 'What is the role of Inspection Certificate?', answer: "Inspection Certificate is a quality, quantity, and technical compliance audit report issued by an independent inspection agency (such as SGS, Intertek, or TÜV) after physically auditing finished goods at the factory." }],
      commonMistakes: ['Failing to verify document details before submission.'],
      practicalTips: ['Always double-check HSN codes and values.'],
      summary: "Inspection Certificate is a quality, quantity, and technical compliance audit report issued by an independent inspection agency (such as SGS, Intertek, or TÜV) after physically auditing finished goods at the factory.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What is Inspection Certificate?', options: ["Inspection Certificate is a quality, quantity, and technical compliance audit report issued by an independent inspection agency (such as SGS, Intertek, or TÜV) after physically auditing finished goods at the factory.", 'A tax penalty.', 'An illegal trade practice.', 'A shipping carrier.'], correctAnswers: ['0'], explanation: "Inspection Certificate is a quality, quantity, and technical compliance audit report issued by an independent inspection agency (such as SGS, Intertek, or TÜV) after physically auditing finished goods at the factory." }],
      objectives: ['Understand operational meaning of Inspection Certificate.'],
      writtenExplanation: "Inspection Certificate is a quality, quantity, and technical compliance audit report issued by an independent inspection agency (such as SGS, Intertek, or TÜV) after physically auditing finished goods at the factory.",
      importantNotes: ['Verify all details on Inspection Certificate.'],
      keyPoints: ["Inspection Certificate is a quality, quantity, and technical compliance audit report issued by an independent inspection agency (such as SGS, Intertek, or TÜV) after physically auditing finished goods at the factory."]
    };
  }

  if (title === 'Air Way Bill') {
    return {
      definition: "Air Way Bill (AWB) is the official non-negotiable transport document issued by an airline for cargo transported by air, serving as a carriage contract and receipt of goods.",
      whyImportant: "Contains 11-digit tracking number allowing real-time tracking of air shipments on airline cargo portals and enables fast airport customs clearance.",
      businessExample: "Emirates SkyCargo issues AWB #176-48201934 for RBC's 200kg express electronic shipment from Shanghai Airport to Mumbai Airport.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Technical visualization for Air Way Bill.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'Air Way Bill Guide.pdf', totalPages: 2, size: '450 KB', mockPagesText: ['Page 1: Overview.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Air Way Bill Sheet', fileUrl: '#', size: '55 KB', type: 'pdf' },
      relatedTopics: ['Customs Clearance', 'Bill of Lading', 'FOB'],
      faqs: [{ question: 'What is the role of Air Way Bill?', answer: "Air Way Bill (AWB) is the official non-negotiable transport document issued by an airline for cargo transported by air, serving as a carriage contract and receipt of goods." }],
      commonMistakes: ['Failing to verify document details before submission.'],
      practicalTips: ['Always double-check HSN codes and values.'],
      summary: "Air Way Bill (AWB) is the official non-negotiable transport document issued by an airline for cargo transported by air, serving as a carriage contract and receipt of goods.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What is Air Way Bill?', options: ["Air Way Bill (AWB) is the official non-negotiable transport document issued by an airline for cargo transported by air, serving as a carriage contract and receipt of goods.", 'A tax penalty.', 'An illegal trade practice.', 'A shipping carrier.'], correctAnswers: ['0'], explanation: "Air Way Bill (AWB) is the official non-negotiable transport document issued by an airline for cargo transported by air, serving as a carriage contract and receipt of goods." }],
      objectives: ['Understand operational meaning of Air Way Bill.'],
      writtenExplanation: "Air Way Bill (AWB) is the official non-negotiable transport document issued by an airline for cargo transported by air, serving as a carriage contract and receipt of goods.",
      importantNotes: ['Verify all details on Air Way Bill.'],
      keyPoints: ["Air Way Bill (AWB) is the official non-negotiable transport document issued by an airline for cargo transported by air, serving as a carriage contract and receipt of goods."]
    };
  }

  if (title === 'Delivery Order') {
    return {
      definition: "Delivery Order (DO) is a release document issued by the shipping line or freight forwarder to the port terminal/CFS authorizing the surrender of cargo to the importer after freight and local charges are settled.",
      whyImportant: "Without a valid DO, port authorities will NOT allow trucks to pick up the container from the port or ICD yard.",
      businessExample: "RBC pays local terminal handling charges ($250) to Maersk Line India. Maersk issues a digital Delivery Order (DO) enabling RBC's transporter to gate-out the container from Mundra Port.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Technical visualization for Delivery Order.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'Delivery Order Guide.pdf', totalPages: 2, size: '450 KB', mockPagesText: ['Page 1: Overview.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Delivery Order Sheet', fileUrl: '#', size: '55 KB', type: 'pdf' },
      relatedTopics: ['Customs Clearance', 'Bill of Lading', 'FOB'],
      faqs: [{ question: 'What is the role of Delivery Order?', answer: "Delivery Order (DO) is a release document issued by the shipping line or freight forwarder to the port terminal/CFS authorizing the surrender of cargo to the importer after freight and local charges are settled." }],
      commonMistakes: ['Failing to verify document details before submission.'],
      practicalTips: ['Always double-check HSN codes and values.'],
      summary: "Delivery Order (DO) is a release document issued by the shipping line or freight forwarder to the port terminal/CFS authorizing the surrender of cargo to the importer after freight and local charges are settled.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What is Delivery Order?', options: ["Delivery Order (DO) is a release document issued by the shipping line or freight forwarder to the port terminal/CFS authorizing the surrender of cargo to the importer after freight and local charges are settled.", 'A tax penalty.', 'An illegal trade practice.', 'A shipping carrier.'], correctAnswers: ['0'], explanation: "Delivery Order (DO) is a release document issued by the shipping line or freight forwarder to the port terminal/CFS authorizing the surrender of cargo to the importer after freight and local charges are settled." }],
      objectives: ['Understand operational meaning of Delivery Order.'],
      writtenExplanation: "Delivery Order (DO) is a release document issued by the shipping line or freight forwarder to the port terminal/CFS authorizing the surrender of cargo to the importer after freight and local charges are settled.",
      importantNotes: ['Verify all details on Delivery Order.'],
      keyPoints: ["Delivery Order (DO) is a release document issued by the shipping line or freight forwarder to the port terminal/CFS authorizing the surrender of cargo to the importer after freight and local charges are settled."]
    };
  }

  if (title === 'Shipping Bill') {
    return {
      definition: "Shipping Bill is an official export declaration document filed electronically by the exporter with Customs (via ICEGATE) to obtain \"Let Export Order\" (LEO) permission to ship goods out of India.",
      whyImportant: "Mandatory for legal export clearance, claiming export incentive schemes (RoDTEP, Duty Drawback), and verifying GST zero-rated export sales.",
      businessExample: "RBC files Shipping Bill #8492019 under Duty Drawback scheme at Nhava Sheva Customs for exporting Indian spices to Dubai.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Technical visualization for Shipping Bill.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'Shipping Bill Guide.pdf', totalPages: 2, size: '450 KB', mockPagesText: ['Page 1: Overview.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Shipping Bill Sheet', fileUrl: '#', size: '55 KB', type: 'pdf' },
      relatedTopics: ['Customs Clearance', 'Bill of Lading', 'FOB'],
      faqs: [{ question: 'What is the role of Shipping Bill?', answer: "Shipping Bill is an official export declaration document filed electronically by the exporter with Customs (via ICEGATE) to obtain \"Let Export Order\" (LEO) permission to ship goods out of India." }],
      commonMistakes: ['Failing to verify document details before submission.'],
      practicalTips: ['Always double-check HSN codes and values.'],
      summary: "Shipping Bill is an official export declaration document filed electronically by the exporter with Customs (via ICEGATE) to obtain \"Let Export Order\" (LEO) permission to ship goods out of India.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What is Shipping Bill?', options: ["Shipping Bill is an official export declaration document filed electronically by the exporter with Customs (via ICEGATE) to obtain \"Let Export Order\" (LEO) permission to ship goods out of India.", 'A tax penalty.', 'An illegal trade practice.', 'A shipping carrier.'], correctAnswers: ['0'], explanation: "Shipping Bill is an official export declaration document filed electronically by the exporter with Customs (via ICEGATE) to obtain \"Let Export Order\" (LEO) permission to ship goods out of India." }],
      objectives: ['Understand operational meaning of Shipping Bill.'],
      writtenExplanation: "Shipping Bill is an official export declaration document filed electronically by the exporter with Customs (via ICEGATE) to obtain \"Let Export Order\" (LEO) permission to ship goods out of India.",
      importantNotes: ['Verify all details on Shipping Bill.'],
      keyPoints: ["Shipping Bill is an official export declaration document filed electronically by the exporter with Customs (via ICEGATE) to obtain \"Let Export Order\" (LEO) permission to ship goods out of India."]
    };
  }

  if (title === 'Bill of Entry') {
    return {
      definition: "Bill of Entry (BOE) is a statutory import declaration document filed by an importer/CHA with Customs (via ICEGATE) detailing imported cargo value, HSN codes, and duty calculations for clearance.",
      whyImportant: "Customs assesses Basic Customs Duty (BCD), SWS, and IGST directly on the Bill of Entry. Clearance is granted (\"Out of Charge\") once duties are paid.",
      businessExample: "RBC's CHA files Bill of Entry #3928104 at ICD Ahmedabad for a container of solar cells, calculating 7.5% BCD and 18% IGST to be paid via ICEGATE portal.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Technical visualization for Bill of Entry.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'Bill of Entry Guide.pdf', totalPages: 2, size: '450 KB', mockPagesText: ['Page 1: Overview.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Bill of Entry Sheet', fileUrl: '#', size: '55 KB', type: 'pdf' },
      relatedTopics: ['Customs Clearance', 'Bill of Lading', 'FOB'],
      faqs: [{ question: 'What is the role of Bill of Entry?', answer: "Bill of Entry (BOE) is a statutory import declaration document filed by an importer/CHA with Customs (via ICEGATE) detailing imported cargo value, HSN codes, and duty calculations for clearance." }],
      commonMistakes: ['Failing to verify document details before submission.'],
      practicalTips: ['Always double-check HSN codes and values.'],
      summary: "Bill of Entry (BOE) is a statutory import declaration document filed by an importer/CHA with Customs (via ICEGATE) detailing imported cargo value, HSN codes, and duty calculations for clearance.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What is Bill of Entry?', options: ["Bill of Entry (BOE) is a statutory import declaration document filed by an importer/CHA with Customs (via ICEGATE) detailing imported cargo value, HSN codes, and duty calculations for clearance.", 'A tax penalty.', 'An illegal trade practice.', 'A shipping carrier.'], correctAnswers: ['0'], explanation: "Bill of Entry (BOE) is a statutory import declaration document filed by an importer/CHA with Customs (via ICEGATE) detailing imported cargo value, HSN codes, and duty calculations for clearance." }],
      objectives: ['Understand operational meaning of Bill of Entry.'],
      writtenExplanation: "Bill of Entry (BOE) is a statutory import declaration document filed by an importer/CHA with Customs (via ICEGATE) detailing imported cargo value, HSN codes, and duty calculations for clearance.",
      importantNotes: ['Verify all details on Bill of Entry.'],
      keyPoints: ["Bill of Entry (BOE) is a statutory import declaration document filed by an importer/CHA with Customs (via ICEGATE) detailing imported cargo value, HSN codes, and duty calculations for clearance."]
    };
  }

  if (title === 'Certificate of Origin') {
    return {
      definition: "Certificate of Origin (COO) is an official document issued by a Chamber of Commerce or government authority certifying the country where the imported product was manufactured.",
      whyImportant: "Required to claim concessional customs duty rates under Free Trade Agreements (FTAs) like India-ASEAN, CEPA, or APTA.",
      businessExample: "RBC imports fabric from Vietnam. By presenting a preferential Certificate of Origin (Form E), RBC gets customs duty reduced from 10% to 0% under India-ASEAN FTA.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Technical visualization for Certificate of Origin.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'Certificate of Origin Guide.pdf', totalPages: 2, size: '450 KB', mockPagesText: ['Page 1: Overview.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Certificate of Origin Sheet', fileUrl: '#', size: '55 KB', type: 'pdf' },
      relatedTopics: ['Customs Clearance', 'Bill of Lading', 'FOB'],
      faqs: [{ question: 'What is the role of Certificate of Origin?', answer: "Certificate of Origin (COO) is an official document issued by a Chamber of Commerce or government authority certifying the country where the imported product was manufactured." }],
      commonMistakes: ['Failing to verify document details before submission.'],
      practicalTips: ['Always double-check HSN codes and values.'],
      summary: "Certificate of Origin (COO) is an official document issued by a Chamber of Commerce or government authority certifying the country where the imported product was manufactured.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What is Certificate of Origin?', options: ["Certificate of Origin (COO) is an official document issued by a Chamber of Commerce or government authority certifying the country where the imported product was manufactured.", 'A tax penalty.', 'An illegal trade practice.', 'A shipping carrier.'], correctAnswers: ['0'], explanation: "Certificate of Origin (COO) is an official document issued by a Chamber of Commerce or government authority certifying the country where the imported product was manufactured." }],
      objectives: ['Understand operational meaning of Certificate of Origin.'],
      writtenExplanation: "Certificate of Origin (COO) is an official document issued by a Chamber of Commerce or government authority certifying the country where the imported product was manufactured.",
      importantNotes: ['Verify all details on Certificate of Origin.'],
      keyPoints: ["Certificate of Origin (COO) is an official document issued by a Chamber of Commerce or government authority certifying the country where the imported product was manufactured."]
    };
  }

  if (title === 'Insurance Certificate') {
    return {
      definition: "Insurance Certificate is an official policy document issued by a marine insurance underwriter confirming that cargo is insured against loss, damage, theft, or vessel sinking during transit.",
      whyImportant: "Required for CIF/CIP contracts and bank LC negotiation. Protects the importer against total financial loss if a container falls overboard or catches fire at sea.",
      businessExample: "RBC purchases Marine Cargo Insurance policy #MAR-88492 covering 110% of CIF cargo value ($55,000) for a shipment traveling from Ningbo to Mundra.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Technical visualization for Insurance Certificate.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'Insurance Certificate Guide.pdf', totalPages: 2, size: '450 KB', mockPagesText: ['Page 1: Overview.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Insurance Certificate Sheet', fileUrl: '#', size: '55 KB', type: 'pdf' },
      relatedTopics: ['Customs Clearance', 'Bill of Lading', 'FOB'],
      faqs: [{ question: 'What is the role of Insurance Certificate?', answer: "Insurance Certificate is an official policy document issued by a marine insurance underwriter confirming that cargo is insured against loss, damage, theft, or vessel sinking during transit." }],
      commonMistakes: ['Failing to verify document details before submission.'],
      practicalTips: ['Always double-check HSN codes and values.'],
      summary: "Insurance Certificate is an official policy document issued by a marine insurance underwriter confirming that cargo is insured against loss, damage, theft, or vessel sinking during transit.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What is Insurance Certificate?', options: ["Insurance Certificate is an official policy document issued by a marine insurance underwriter confirming that cargo is insured against loss, damage, theft, or vessel sinking during transit.", 'A tax penalty.', 'An illegal trade practice.', 'A shipping carrier.'], correctAnswers: ['0'], explanation: "Insurance Certificate is an official policy document issued by a marine insurance underwriter confirming that cargo is insured against loss, damage, theft, or vessel sinking during transit." }],
      objectives: ['Understand operational meaning of Insurance Certificate.'],
      writtenExplanation: "Insurance Certificate is an official policy document issued by a marine insurance underwriter confirming that cargo is insured against loss, damage, theft, or vessel sinking during transit.",
      importantNotes: ['Verify all details on Insurance Certificate.'],
      keyPoints: ["Insurance Certificate is an official policy document issued by a marine insurance underwriter confirming that cargo is insured against loss, damage, theft, or vessel sinking during transit."]
    };
  }

  if (title === 'Customs') {
    return {
      definition: "Customs is the government border authority enforcing import/export trade laws, inspecting international shipments, and collecting customs duties and taxes.",
      whyImportant: "Ensures national security, prevents smuggling, protects domestic industries, and generates federal trade revenue.",
      businessExample: "Indian Customs audits RBC's incoming shipment at Mundra Port to verify product valuation, safety standards, and correct duty payments.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Technical visualization for Customs.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'Customs Guide.pdf', totalPages: 2, size: '450 KB', mockPagesText: ['Page 1: Overview.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Customs Sheet', fileUrl: '#', size: '55 KB', type: 'pdf' },
      relatedTopics: ['Customs Clearance', 'Bill of Lading', 'FOB'],
      faqs: [{ question: 'What is the role of Customs?', answer: "Customs is the government border authority enforcing import/export trade laws, inspecting international shipments, and collecting customs duties and taxes." }],
      commonMistakes: ['Failing to verify document details before submission.'],
      practicalTips: ['Always double-check HSN codes and values.'],
      summary: "Customs is the government border authority enforcing import/export trade laws, inspecting international shipments, and collecting customs duties and taxes.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What is Customs?', options: ["Customs is the government border authority enforcing import/export trade laws, inspecting international shipments, and collecting customs duties and taxes.", 'A tax penalty.', 'An illegal trade practice.', 'A shipping carrier.'], correctAnswers: ['0'], explanation: "Customs is the government border authority enforcing import/export trade laws, inspecting international shipments, and collecting customs duties and taxes." }],
      objectives: ['Understand operational meaning of Customs.'],
      writtenExplanation: "Customs is the government border authority enforcing import/export trade laws, inspecting international shipments, and collecting customs duties and taxes.",
      importantNotes: ['Verify all details on Customs.'],
      keyPoints: ["Customs is the government border authority enforcing import/export trade laws, inspecting international shipments, and collecting customs duties and taxes."]
    };
  }

  if (title === 'Customs Clearance') {
    return {
      definition: "Customs Clearance is the official administrative procedure of obtaining permission from customs authorities to import or export cargo across international borders.",
      whyImportant: "Without customs clearance, imported goods remain locked at the port terminal and cannot be moved to importer warehouses.",
      businessExample: "RBC's CHA completes customs clearance for a container of medical gear in 48 hours by submitting the BOE, invoice, packing list, and paying duty.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Technical visualization for Customs Clearance.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'Customs Clearance Guide.pdf', totalPages: 2, size: '450 KB', mockPagesText: ['Page 1: Overview.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Customs Clearance Sheet', fileUrl: '#', size: '55 KB', type: 'pdf' },
      relatedTopics: ['Customs Clearance', 'Bill of Lading', 'FOB'],
      faqs: [{ question: 'What is the role of Customs Clearance?', answer: "Customs Clearance is the official administrative procedure of obtaining permission from customs authorities to import or export cargo across international borders." }],
      commonMistakes: ['Failing to verify document details before submission.'],
      practicalTips: ['Always double-check HSN codes and values.'],
      summary: "Customs Clearance is the official administrative procedure of obtaining permission from customs authorities to import or export cargo across international borders.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What is Customs Clearance?', options: ["Customs Clearance is the official administrative procedure of obtaining permission from customs authorities to import or export cargo across international borders.", 'A tax penalty.', 'An illegal trade practice.', 'A shipping carrier.'], correctAnswers: ['0'], explanation: "Customs Clearance is the official administrative procedure of obtaining permission from customs authorities to import or export cargo across international borders." }],
      objectives: ['Understand operational meaning of Customs Clearance.'],
      writtenExplanation: "Customs Clearance is the official administrative procedure of obtaining permission from customs authorities to import or export cargo across international borders.",
      importantNotes: ['Verify all details on Customs Clearance.'],
      keyPoints: ["Customs Clearance is the official administrative procedure of obtaining permission from customs authorities to import or export cargo across international borders."]
    };
  }

  if (title === 'CHA') {
    return {
      definition: "CHA (Customs House Agent) or Customs Broker is a licensed professional authorized by Customs to handle import/export documentation, tariff classification, and cargo clearance for trade clients.",
      whyImportant: "Navigates complex customs laws, prevents ICEGATE filing errors, expedites physical inspection, and avoids port demurrage penalties.",
      businessExample: "RBC appoints a licensed CHA at Mundra Port to handle electronic filing of Bill of Entry, port assessment, and vessel gate-out operations.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Technical visualization for CHA.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'CHA Guide.pdf', totalPages: 2, size: '450 KB', mockPagesText: ['Page 1: Overview.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'CHA Sheet', fileUrl: '#', size: '55 KB', type: 'pdf' },
      relatedTopics: ['Customs Clearance', 'Bill of Lading', 'FOB'],
      faqs: [{ question: 'What is the role of CHA?', answer: "CHA (Customs House Agent) or Customs Broker is a licensed professional authorized by Customs to handle import/export documentation, tariff classification, and cargo clearance for trade clients." }],
      commonMistakes: ['Failing to verify document details before submission.'],
      practicalTips: ['Always double-check HSN codes and values.'],
      summary: "CHA (Customs House Agent) or Customs Broker is a licensed professional authorized by Customs to handle import/export documentation, tariff classification, and cargo clearance for trade clients.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What is CHA?', options: ["CHA (Customs House Agent) or Customs Broker is a licensed professional authorized by Customs to handle import/export documentation, tariff classification, and cargo clearance for trade clients.", 'A tax penalty.', 'An illegal trade practice.', 'A shipping carrier.'], correctAnswers: ['0'], explanation: "CHA (Customs House Agent) or Customs Broker is a licensed professional authorized by Customs to handle import/export documentation, tariff classification, and cargo clearance for trade clients." }],
      objectives: ['Understand operational meaning of CHA.'],
      writtenExplanation: "CHA (Customs House Agent) or Customs Broker is a licensed professional authorized by Customs to handle import/export documentation, tariff classification, and cargo clearance for trade clients.",
      importantNotes: ['Verify all details on CHA.'],
      keyPoints: ["CHA (Customs House Agent) or Customs Broker is a licensed professional authorized by Customs to handle import/export documentation, tariff classification, and cargo clearance for trade clients."]
    };
  }

  if (title === 'HSN Code') {
    return {
      definition: "HSN Code (Harmonized System of Nomenclature) is an international 6-to-8 digit standardized numerical code used worldwide to classify traded commodities for customs duty calculation.",
      whyImportant: "Determines the exact Basic Customs Duty rate, IGST rate, BIS compliance rules, and import licensing policies for every imported item.",
      businessExample: "RBC classifies imported LED bulbs under HSN Code 8539.50.00, which carries a 10% BCD and 18% IGST tariff rate.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Technical visualization for HSN Code.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'HSN Code Guide.pdf', totalPages: 2, size: '450 KB', mockPagesText: ['Page 1: Overview.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'HSN Code Sheet', fileUrl: '#', size: '55 KB', type: 'pdf' },
      relatedTopics: ['Customs Clearance', 'Bill of Lading', 'FOB'],
      faqs: [{ question: 'What is the role of HSN Code?', answer: "HSN Code (Harmonized System of Nomenclature) is an international 6-to-8 digit standardized numerical code used worldwide to classify traded commodities for customs duty calculation." }],
      commonMistakes: ['Failing to verify document details before submission.'],
      practicalTips: ['Always double-check HSN codes and values.'],
      summary: "HSN Code (Harmonized System of Nomenclature) is an international 6-to-8 digit standardized numerical code used worldwide to classify traded commodities for customs duty calculation.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What is HSN Code?', options: ["HSN Code (Harmonized System of Nomenclature) is an international 6-to-8 digit standardized numerical code used worldwide to classify traded commodities for customs duty calculation.", 'A tax penalty.', 'An illegal trade practice.', 'A shipping carrier.'], correctAnswers: ['0'], explanation: "HSN Code (Harmonized System of Nomenclature) is an international 6-to-8 digit standardized numerical code used worldwide to classify traded commodities for customs duty calculation." }],
      objectives: ['Understand operational meaning of HSN Code.'],
      writtenExplanation: "HSN Code (Harmonized System of Nomenclature) is an international 6-to-8 digit standardized numerical code used worldwide to classify traded commodities for customs duty calculation.",
      importantNotes: ['Verify all details on HSN Code.'],
      keyPoints: ["HSN Code (Harmonized System of Nomenclature) is an international 6-to-8 digit standardized numerical code used worldwide to classify traded commodities for customs duty calculation."]
    };
  }

  if (title === 'Ocean Freight') {
    return {
      definition: "Ocean Freight is the main ocean transport fee charged by shipping lines to transport containerized or bulk cargo across international sea routes.",
      whyImportant: "Forms the largest portion of total shipping costs. Rates fluctuate based on global vessel capacity, fuel prices, and container availability.",
      businessExample: "RBC pays $1,900 base Ocean Freight to COSCO shipping line for carrying a 20FT container from Shanghai to Mundra Port.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Logistics visualization for Ocean Freight.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'Ocean Freight Guide.pdf', totalPages: 2, size: '450 KB', mockPagesText: ['Page 1: Overview.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Ocean Freight Sheet', fileUrl: '#', size: '55 KB', type: 'pdf' },
      relatedTopics: ['Ocean Freight', 'Local Charges', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of Ocean Freight?', answer: "Ocean Freight is the main ocean transport fee charged by shipping lines to transport containerized or bulk cargo across international sea routes." }],
      commonMistakes: ['Failing to audit charges before approving payments.'],
      practicalTips: ['Request itemized rate cards from forwarders.'],
      summary: "Ocean Freight is the main ocean transport fee charged by shipping lines to transport containerized or bulk cargo across international sea routes.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What is Ocean Freight?', options: ["Ocean Freight is the main ocean transport fee charged by shipping lines to transport containerized or bulk cargo across international sea routes.", 'A tax exemption.', 'An illegal fee.', 'A vessel penalty.'], correctAnswers: ['0'], explanation: "Ocean Freight is the main ocean transport fee charged by shipping lines to transport containerized or bulk cargo across international sea routes." }],
      objectives: ['Understand operational meaning of Ocean Freight.'],
      writtenExplanation: "Ocean Freight is the main ocean transport fee charged by shipping lines to transport containerized or bulk cargo across international sea routes.",
      importantNotes: ['Audit all charges for Ocean Freight.'],
      keyPoints: ["Ocean Freight is the main ocean transport fee charged by shipping lines to transport containerized or bulk cargo across international sea routes."]
    };
  }

  if (title === 'Local Charges') {
    return {
      definition: "Local Charges are origin and destination port handling fees charged by forwarders and port terminals (such as THC, documentation, and gate fees) outside of main ocean freight.",
      whyImportant: "Importers must audit local charges to prevent unexpected destination invoice surcharges and landed cost inflation.",
      businessExample: "At Mundra Port, RBC pays $280 in Local Charges (THC + DO fee + port gate fee) to clear the incoming 20FT container.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Logistics visualization for Local Charges.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'Local Charges Guide.pdf', totalPages: 2, size: '450 KB', mockPagesText: ['Page 1: Overview.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Local Charges Sheet', fileUrl: '#', size: '55 KB', type: 'pdf' },
      relatedTopics: ['Ocean Freight', 'Local Charges', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of Local Charges?', answer: "Local Charges are origin and destination port handling fees charged by forwarders and port terminals (such as THC, documentation, and gate fees) outside of main ocean freight." }],
      commonMistakes: ['Failing to audit charges before approving payments.'],
      practicalTips: ['Request itemized rate cards from forwarders.'],
      summary: "Local Charges are origin and destination port handling fees charged by forwarders and port terminals (such as THC, documentation, and gate fees) outside of main ocean freight.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What is Local Charges?', options: ["Local Charges are origin and destination port handling fees charged by forwarders and port terminals (such as THC, documentation, and gate fees) outside of main ocean freight.", 'A tax exemption.', 'An illegal fee.', 'A vessel penalty.'], correctAnswers: ['0'], explanation: "Local Charges are origin and destination port handling fees charged by forwarders and port terminals (such as THC, documentation, and gate fees) outside of main ocean freight." }],
      objectives: ['Understand operational meaning of Local Charges.'],
      writtenExplanation: "Local Charges are origin and destination port handling fees charged by forwarders and port terminals (such as THC, documentation, and gate fees) outside of main ocean freight.",
      importantNotes: ['Audit all charges for Local Charges.'],
      keyPoints: ["Local Charges are origin and destination port handling fees charged by forwarders and port terminals (such as THC, documentation, and gate fees) outside of main ocean freight."]
    };
  }

  if (title === 'THC') {
    return {
      definition: "Terminal Handling Charge (THC) is the port fee charged by terminal operators for using port cranes and equipment to load or unload containers between vessel and port yard.",
      whyImportant: "Payable at both origin port (Origin THC) and destination port (Destination THC). Rates vary by port authority and container size.",
      businessExample: "Adani Mundra Port charges ₹9,500 Destination THC to offload RBC's 20FT container from ship deck onto port container yard.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Logistics visualization for THC.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'THC Guide.pdf', totalPages: 2, size: '450 KB', mockPagesText: ['Page 1: Overview.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'THC Sheet', fileUrl: '#', size: '55 KB', type: 'pdf' },
      relatedTopics: ['Ocean Freight', 'Local Charges', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of THC?', answer: "Terminal Handling Charge (THC) is the port fee charged by terminal operators for using port cranes and equipment to load or unload containers between vessel and port yard." }],
      commonMistakes: ['Failing to audit charges before approving payments.'],
      practicalTips: ['Request itemized rate cards from forwarders.'],
      summary: "Terminal Handling Charge (THC) is the port fee charged by terminal operators for using port cranes and equipment to load or unload containers between vessel and port yard.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What is THC?', options: ["Terminal Handling Charge (THC) is the port fee charged by terminal operators for using port cranes and equipment to load or unload containers between vessel and port yard.", 'A tax exemption.', 'An illegal fee.', 'A vessel penalty.'], correctAnswers: ['0'], explanation: "Terminal Handling Charge (THC) is the port fee charged by terminal operators for using port cranes and equipment to load or unload containers between vessel and port yard." }],
      objectives: ['Understand operational meaning of THC.'],
      writtenExplanation: "Terminal Handling Charge (THC) is the port fee charged by terminal operators for using port cranes and equipment to load or unload containers between vessel and port yard.",
      importantNotes: ['Audit all charges for THC.'],
      keyPoints: ["Terminal Handling Charge (THC) is the port fee charged by terminal operators for using port cranes and equipment to load or unload containers between vessel and port yard."]
    };
  }

  if (title === 'CFS Charges') {
    return {
      definition: "CFS Charges are handling, de-stuffing, sorting, and ground storage fees billed by Container Freight Stations for processing LCL cargo shipments.",
      whyImportant: "Essential for LCL importers to calculate before shipping, as CFS charges include fixed handling minimums regardless of package volume.",
      businessExample: "Mundra CFS bills RBC ₹4,200 in CFS Charges for de-stuffing their 4 CBM shared LCL pallet and storing it for 3 days.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Logistics visualization for CFS Charges.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'CFS Charges Guide.pdf', totalPages: 2, size: '450 KB', mockPagesText: ['Page 1: Overview.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'CFS Charges Sheet', fileUrl: '#', size: '55 KB', type: 'pdf' },
      relatedTopics: ['Ocean Freight', 'Local Charges', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of CFS Charges?', answer: "CFS Charges are handling, de-stuffing, sorting, and ground storage fees billed by Container Freight Stations for processing LCL cargo shipments." }],
      commonMistakes: ['Failing to audit charges before approving payments.'],
      practicalTips: ['Request itemized rate cards from forwarders.'],
      summary: "CFS Charges are handling, de-stuffing, sorting, and ground storage fees billed by Container Freight Stations for processing LCL cargo shipments.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What is CFS Charges?', options: ["CFS Charges are handling, de-stuffing, sorting, and ground storage fees billed by Container Freight Stations for processing LCL cargo shipments.", 'A tax exemption.', 'An illegal fee.', 'A vessel penalty.'], correctAnswers: ['0'], explanation: "CFS Charges are handling, de-stuffing, sorting, and ground storage fees billed by Container Freight Stations for processing LCL cargo shipments." }],
      objectives: ['Understand operational meaning of CFS Charges.'],
      writtenExplanation: "CFS Charges are handling, de-stuffing, sorting, and ground storage fees billed by Container Freight Stations for processing LCL cargo shipments.",
      importantNotes: ['Audit all charges for CFS Charges.'],
      keyPoints: ["CFS Charges are handling, de-stuffing, sorting, and ground storage fees billed by Container Freight Stations for processing LCL cargo shipments."]
    };
  }

  if (title === 'DO Charges') {
    return {
      definition: "DO Charges are administrative fees billed by shipping lines or forwarders for issuing the electronic Delivery Order (DO) authorizing cargo release.",
      whyImportant: "Paid by the importer at destination before port authorities release the container for truck dispatch.",
      businessExample: "Maersk charges ₹3,500 DO Fee to issue the digital release order for RBC's imported machinery container.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Logistics visualization for DO Charges.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'DO Charges Guide.pdf', totalPages: 2, size: '450 KB', mockPagesText: ['Page 1: Overview.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'DO Charges Sheet', fileUrl: '#', size: '55 KB', type: 'pdf' },
      relatedTopics: ['Ocean Freight', 'Local Charges', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of DO Charges?', answer: "DO Charges are administrative fees billed by shipping lines or forwarders for issuing the electronic Delivery Order (DO) authorizing cargo release." }],
      commonMistakes: ['Failing to audit charges before approving payments.'],
      practicalTips: ['Request itemized rate cards from forwarders.'],
      summary: "DO Charges are administrative fees billed by shipping lines or forwarders for issuing the electronic Delivery Order (DO) authorizing cargo release.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What is DO Charges?', options: ["DO Charges are administrative fees billed by shipping lines or forwarders for issuing the electronic Delivery Order (DO) authorizing cargo release.", 'A tax exemption.', 'An illegal fee.', 'A vessel penalty.'], correctAnswers: ['0'], explanation: "DO Charges are administrative fees billed by shipping lines or forwarders for issuing the electronic Delivery Order (DO) authorizing cargo release." }],
      objectives: ['Understand operational meaning of DO Charges.'],
      writtenExplanation: "DO Charges are administrative fees billed by shipping lines or forwarders for issuing the electronic Delivery Order (DO) authorizing cargo release.",
      importantNotes: ['Audit all charges for DO Charges.'],
      keyPoints: ["DO Charges are administrative fees billed by shipping lines or forwarders for issuing the electronic Delivery Order (DO) authorizing cargo release."]
    };
  }

  if (title === 'Detention') {
    return {
      definition: "Detention is a penalty fee charged by shipping lines when an importer holds an empty container outside the port beyond agreed free days (usually 7-14 days).",
      whyImportant: "Avoidable by returning empty containers back to the carrier container yard promptly after factory unloading.",
      businessExample: "RBC unloads a container at their warehouse in 2 days and returns the empty box to Mundra yard within 5 days, incurring zero detention fees.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Logistics visualization for Detention.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'Detention Guide.pdf', totalPages: 2, size: '450 KB', mockPagesText: ['Page 1: Overview.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Detention Sheet', fileUrl: '#', size: '55 KB', type: 'pdf' },
      relatedTopics: ['Ocean Freight', 'Local Charges', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of Detention?', answer: "Detention is a penalty fee charged by shipping lines when an importer holds an empty container outside the port beyond agreed free days (usually 7-14 days)." }],
      commonMistakes: ['Failing to audit charges before approving payments.'],
      practicalTips: ['Request itemized rate cards from forwarders.'],
      summary: "Detention is a penalty fee charged by shipping lines when an importer holds an empty container outside the port beyond agreed free days (usually 7-14 days).",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What is Detention?', options: ["Detention is a penalty fee charged by shipping lines when an importer holds an empty container outside the port beyond agreed free days (usually 7-14 days).", 'A tax exemption.', 'An illegal fee.', 'A vessel penalty.'], correctAnswers: ['0'], explanation: "Detention is a penalty fee charged by shipping lines when an importer holds an empty container outside the port beyond agreed free days (usually 7-14 days)." }],
      objectives: ['Understand operational meaning of Detention.'],
      writtenExplanation: "Detention is a penalty fee charged by shipping lines when an importer holds an empty container outside the port beyond agreed free days (usually 7-14 days).",
      importantNotes: ['Audit all charges for Detention.'],
      keyPoints: ["Detention is a penalty fee charged by shipping lines when an importer holds an empty container outside the port beyond agreed free days (usually 7-14 days)."]
    };
  }

  if (title === 'Demurrage') {
    return {
      definition: "Demurrage is a daily penalty fee charged by ports or shipping lines when a loaded container stays inside the port terminal beyond free storage days (usually 3-5 days).",
      whyImportant: "Demurrage accumulates rapidly ($100-$250/day). Immediate customs clearance prevents expensive demurrage accumulation.",
      businessExample: "RBC files advance BOE 2 days prior to vessel arrival, clearing customs in 24 hours and gating out the container on Day 2, avoiding $200/day demurrage.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Logistics visualization for Demurrage.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'Demurrage Guide.pdf', totalPages: 2, size: '450 KB', mockPagesText: ['Page 1: Overview.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Demurrage Sheet', fileUrl: '#', size: '55 KB', type: 'pdf' },
      relatedTopics: ['Ocean Freight', 'Local Charges', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of Demurrage?', answer: "Demurrage is a daily penalty fee charged by ports or shipping lines when a loaded container stays inside the port terminal beyond free storage days (usually 3-5 days)." }],
      commonMistakes: ['Failing to audit charges before approving payments.'],
      practicalTips: ['Request itemized rate cards from forwarders.'],
      summary: "Demurrage is a daily penalty fee charged by ports or shipping lines when a loaded container stays inside the port terminal beyond free storage days (usually 3-5 days).",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What is Demurrage?', options: ["Demurrage is a daily penalty fee charged by ports or shipping lines when a loaded container stays inside the port terminal beyond free storage days (usually 3-5 days).", 'A tax exemption.', 'An illegal fee.', 'A vessel penalty.'], correctAnswers: ['0'], explanation: "Demurrage is a daily penalty fee charged by ports or shipping lines when a loaded container stays inside the port terminal beyond free storage days (usually 3-5 days)." }],
      objectives: ['Understand operational meaning of Demurrage.'],
      writtenExplanation: "Demurrage is a daily penalty fee charged by ports or shipping lines when a loaded container stays inside the port terminal beyond free storage days (usually 3-5 days).",
      importantNotes: ['Audit all charges for Demurrage.'],
      keyPoints: ["Demurrage is a daily penalty fee charged by ports or shipping lines when a loaded container stays inside the port terminal beyond free storage days (usually 3-5 days)."]
    };
  }

  if (title === 'Port Charges') {
    return {
      definition: "Port Charges are statutory pilotage, berth hire, anchorage, and port entry fees levied by port trusts on vessels and cargo handling.",
      whyImportant: "Factored into overall terminal handling tariffs paid by vessel operators and logistics forwarders.",
      businessExample: "Jawaharlal Nehru Port Trust (JNPT) collects port infrastructure charges from shipping lines for vessel docking and container crane operations.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Logistics visualization for Port Charges.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'Port Charges Guide.pdf', totalPages: 2, size: '450 KB', mockPagesText: ['Page 1: Overview.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Port Charges Sheet', fileUrl: '#', size: '55 KB', type: 'pdf' },
      relatedTopics: ['Ocean Freight', 'Local Charges', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of Port Charges?', answer: "Port Charges are statutory pilotage, berth hire, anchorage, and port entry fees levied by port trusts on vessels and cargo handling." }],
      commonMistakes: ['Failing to audit charges before approving payments.'],
      practicalTips: ['Request itemized rate cards from forwarders.'],
      summary: "Port Charges are statutory pilotage, berth hire, anchorage, and port entry fees levied by port trusts on vessels and cargo handling.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What is Port Charges?', options: ["Port Charges are statutory pilotage, berth hire, anchorage, and port entry fees levied by port trusts on vessels and cargo handling.", 'A tax exemption.', 'An illegal fee.', 'A vessel penalty.'], correctAnswers: ['0'], explanation: "Port Charges are statutory pilotage, berth hire, anchorage, and port entry fees levied by port trusts on vessels and cargo handling." }],
      objectives: ['Understand operational meaning of Port Charges.'],
      writtenExplanation: "Port Charges are statutory pilotage, berth hire, anchorage, and port entry fees levied by port trusts on vessels and cargo handling.",
      importantNotes: ['Audit all charges for Port Charges.'],
      keyPoints: ["Port Charges are statutory pilotage, berth hire, anchorage, and port entry fees levied by port trusts on vessels and cargo handling."]
    };
  }

  if (title === 'Documentation Charges') {
    return {
      definition: "Documentation Charges are administrative processing fees billed by freight forwarders or shipping lines for creating B/L, HBL, manifest filings, and EDI entries.",
      whyImportant: "Importers should verify documentation charges on freight quotes to ensure transparency and avoid duplicate invoicing.",
      businessExample: "Forwarder bills ₹2,500 Documentation Charge for issuing House Bill of Lading (HBL) and filing import manifest with Indian Customs.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Logistics visualization for Documentation Charges.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'Documentation Charges Guide.pdf', totalPages: 2, size: '450 KB', mockPagesText: ['Page 1: Overview.', 'Page 2: Checklist.'] },
      downloadOption: { title: 'Documentation Charges Sheet', fileUrl: '#', size: '55 KB', type: 'pdf' },
      relatedTopics: ['Ocean Freight', 'Local Charges', 'Customs Clearance'],
      faqs: [{ question: 'What is the role of Documentation Charges?', answer: "Documentation Charges are administrative processing fees billed by freight forwarders or shipping lines for creating B/L, HBL, manifest filings, and EDI entries." }],
      commonMistakes: ['Failing to audit charges before approving payments.'],
      practicalTips: ['Request itemized rate cards from forwarders.'],
      summary: "Documentation Charges are administrative processing fees billed by freight forwarders or shipping lines for creating B/L, HBL, manifest filings, and EDI entries.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What is Documentation Charges?', options: ["Documentation Charges are administrative processing fees billed by freight forwarders or shipping lines for creating B/L, HBL, manifest filings, and EDI entries.", 'A tax exemption.', 'An illegal fee.', 'A vessel penalty.'], correctAnswers: ['0'], explanation: "Documentation Charges are administrative processing fees billed by freight forwarders or shipping lines for creating B/L, HBL, manifest filings, and EDI entries." }],
      objectives: ['Understand operational meaning of Documentation Charges.'],
      writtenExplanation: "Documentation Charges are administrative processing fees billed by freight forwarders or shipping lines for creating B/L, HBL, manifest filings, and EDI entries.",
      importantNotes: ['Audit all charges for Documentation Charges.'],
      keyPoints: ["Documentation Charges are administrative processing fees billed by freight forwarders or shipping lines for creating B/L, HBL, manifest filings, and EDI entries."]
    };
  }

  if (title === 'Quality Control') {
    return {
      definition: "Quality Control (QC) refers to the operational inspection checks performed on raw materials, components, and assembly lines during production to identify and fix defects.",
      whyImportant: "Catching defects early on the factory floor prevents wasted manufacturing time, costly rework, and shipping defective goods to customers.",
      businessExample: "RBC inspectors test electrical circuit boards on the factory assembly line every 2 hours to ensure zero wiring defects.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Quality control illustration for Quality Control.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'Quality Control Standards Guide.pdf', totalPages: 2, size: '480 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Quality checklist.'] },
      downloadOption: { title: 'Quality Control Audit Sheet', fileUrl: '#', size: '60 KB', type: 'pdf' },
      relatedTopics: ['Pre-Shipment Inspection', 'Compliance', 'Product Testing'],
      faqs: [{ question: 'What is the role of Quality Control?', answer: "Quality Control (QC) refers to the operational inspection checks performed on raw materials, components, and assembly lines during production to identify and fix defects." }],
      commonMistakes: ["Skipping line inspections and relying only on final packaging checks."],
      practicalTips: ["Define inline inspection checkpoints at 20%, 50%, and 80% production stages."],
      summary: "Quality Control is operational inspection during production to detect and correct manufacturing defects.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What does Quality Control do?', options: ["Quality Control (QC) refers to the operational inspection checks performed on raw materials, components, and assembly lines during production to identify and fix defects.", 'A tax penalty.', 'An illegal trade practice.', 'A shipping carrier.'], correctAnswers: ['0'], explanation: "Quality Control (QC) refers to the operational inspection checks performed on raw materials, components, and assembly lines during production to identify and fix defects." }],
      objectives: ['Understand operational meaning of Quality Control.'],
      writtenExplanation: "Quality Control (QC) refers to the operational inspection checks performed on raw materials, components, and assembly lines during production to identify and fix defects.",
      importantNotes: ["Define inline inspection checkpoints at 20%, 50%, and 80% production stages."],
      keyPoints: ["Quality Control is operational inspection during production to detect and correct manufacturing defects."]
    };
  }

  if (title === 'Quality Assurance') {
    return {
      definition: "Quality Assurance (QA) is the systematic organizational framework of quality management protocols, ISO standards, and factory operating procedures that prevents product defects from occurring in the first place.",
      whyImportant: "QA focuses on process prevention rather than end-product inspection, ensuring consistent high quality across thousands of manufactured units.",
      businessExample: "The factory implements ISO 9001 QA protocols, auditing raw material suppliers and calibrating machinery weekly before mass production begins.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Quality control illustration for Quality Assurance.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'Quality Assurance Standards Guide.pdf', totalPages: 2, size: '480 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Quality checklist.'] },
      downloadOption: { title: 'Quality Assurance Audit Sheet', fileUrl: '#', size: '60 KB', type: 'pdf' },
      relatedTopics: ['Pre-Shipment Inspection', 'Compliance', 'Product Testing'],
      faqs: [{ question: 'What is the role of Quality Assurance?', answer: "Quality Assurance (QA) is the systematic organizational framework of quality management protocols, ISO standards, and factory operating procedures that prevents product defects from occurring in the first place." }],
      commonMistakes: ["Confusing QA with QC — QA is process prevention, whereas QC is product inspection."],
      practicalTips: ["Audit factory ISO certifications and standard operating procedures (SOPs) before placing orders."],
      summary: "Quality Assurance is systematic process management preventing defects prior to manufacturing.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What does Quality Assurance do?', options: ["Quality Assurance (QA) is the systematic organizational framework of quality management protocols, ISO standards, and factory operating procedures that prevents product defects from occurring in the first place.", 'A tax penalty.', 'An illegal trade practice.', 'A shipping carrier.'], correctAnswers: ['0'], explanation: "Quality Assurance (QA) is the systematic organizational framework of quality management protocols, ISO standards, and factory operating procedures that prevents product defects from occurring in the first place." }],
      objectives: ['Understand operational meaning of Quality Assurance.'],
      writtenExplanation: "Quality Assurance (QA) is the systematic organizational framework of quality management protocols, ISO standards, and factory operating procedures that prevents product defects from occurring in the first place.",
      importantNotes: ["Audit factory ISO certifications and standard operating procedures (SOPs) before placing orders."],
      keyPoints: ["Quality Assurance is systematic process management preventing defects prior to manufacturing."]
    };
  }

  if (title === 'Pre-Shipment Inspection') {
    return {
      definition: "Pre-Shipment Inspection (PSI) is a comprehensive physical audit performed by an independent third-party agency (like SGS or Intertek) when production is 100% completed and at least 80% packed into master cartons.",
      whyImportant: "PSI is the importer's final defense line before releasing the 70% balance payment. It verifies box count, carton packaging, labeling, dimensions, and functional performance.",
      businessExample: "RBC hires SGS to conduct PSI on 2,000 smartwatches packed in Shenzhen. SGS opens 80 random cartons, runs battery tests, and issues a PSI Pass Certificate before RBC wires balance payment.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Quality control illustration for Pre-Shipment Inspection.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'Pre-Shipment Inspection Standards Guide.pdf', totalPages: 2, size: '480 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Quality checklist.'] },
      downloadOption: { title: 'Pre-Shipment Inspection Audit Sheet', fileUrl: '#', size: '60 KB', type: 'pdf' },
      relatedTopics: ['Pre-Shipment Inspection', 'Compliance', 'Product Testing'],
      faqs: [{ question: 'What is the role of Pre-Shipment Inspection?', answer: "Pre-Shipment Inspection (PSI) is a comprehensive physical audit performed by an independent third-party agency (like SGS or Intertek) when production is 100% completed and at least 80% packed into master cartons." }],
      commonMistakes: ["Releasing full payment to supplier before receiving official Pre-Shipment Inspection reports."],
      practicalTips: ["Define AQL Level II inspection standards in writing inside your Purchase Order."],
      summary: "Pre-Shipment Inspection is a final third-party factory audit verifying goods prior to balance payment and dispatch.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What does Pre-Shipment Inspection do?', options: ["Pre-Shipment Inspection (PSI) is a comprehensive physical audit performed by an independent third-party agency (like SGS or Intertek) when production is 100% completed and at least 80% packed into master cartons.", 'A tax penalty.', 'An illegal trade practice.', 'A shipping carrier.'], correctAnswers: ['0'], explanation: "Pre-Shipment Inspection (PSI) is a comprehensive physical audit performed by an independent third-party agency (like SGS or Intertek) when production is 100% completed and at least 80% packed into master cartons." }],
      objectives: ['Understand operational meaning of Pre-Shipment Inspection.'],
      writtenExplanation: "Pre-Shipment Inspection (PSI) is a comprehensive physical audit performed by an independent third-party agency (like SGS or Intertek) when production is 100% completed and at least 80% packed into master cartons.",
      importantNotes: ["Define AQL Level II inspection standards in writing inside your Purchase Order."],
      keyPoints: ["Pre-Shipment Inspection is a final third-party factory audit verifying goods prior to balance payment and dispatch."]
    };
  }

  if (title === 'Random Inspection') {
    return {
      definition: "Random Inspection is an auditing technique where an inspector randomly selects sample cartons from different pallets in the warehouse using statistical AQL (Acceptable Quality Limit) tables to evaluate overall batch quality.",
      whyImportant: "Prevents suppliers from hiding defective units in middle or bottom boxes, giving a statistically reliable assessment without opening 100% of boxes.",
      businessExample: "From a lot of 10,000 toys, the inspector randomly pulls 200 units from 20 different master cartons according to AQL Level II tables for drop-testing and seam checks.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Quality control illustration for Random Inspection.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'Random Inspection Standards Guide.pdf', totalPages: 2, size: '480 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Quality checklist.'] },
      downloadOption: { title: 'Random Inspection Audit Sheet', fileUrl: '#', size: '60 KB', type: 'pdf' },
      relatedTopics: ['Pre-Shipment Inspection', 'Compliance', 'Product Testing'],
      faqs: [{ question: 'What is the role of Random Inspection?', answer: "Random Inspection is an auditing technique where an inspector randomly selects sample cartons from different pallets in the warehouse using statistical AQL (Acceptable Quality Limit) tables to evaluate overall batch quality." }],
      commonMistakes: ["Allowing the factory manager to pick the sample cartons instead of the independent inspector."],
      practicalTips: ["Ensure sampling covers boxes from front, middle, and back of the warehouse pallet stacks."],
      summary: "Random Inspection evaluates batch quality by sampling random boxes using AQL statistical tables.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What does Random Inspection do?', options: ["Random Inspection is an auditing technique where an inspector randomly selects sample cartons from different pallets in the warehouse using statistical AQL (Acceptable Quality Limit) tables to evaluate overall batch quality.", 'A tax penalty.', 'An illegal trade practice.', 'A shipping carrier.'], correctAnswers: ['0'], explanation: "Random Inspection is an auditing technique where an inspector randomly selects sample cartons from different pallets in the warehouse using statistical AQL (Acceptable Quality Limit) tables to evaluate overall batch quality." }],
      objectives: ['Understand operational meaning of Random Inspection.'],
      writtenExplanation: "Random Inspection is an auditing technique where an inspector randomly selects sample cartons from different pallets in the warehouse using statistical AQL (Acceptable Quality Limit) tables to evaluate overall batch quality.",
      importantNotes: ["Ensure sampling covers boxes from front, middle, and back of the warehouse pallet stacks."],
      keyPoints: ["Random Inspection evaluates batch quality by sampling random boxes using AQL statistical tables."]
    };
  }

  if (title === 'Defect Rate') {
    return {
      definition: "Defect Rate is the percentage of failed or non-conforming items identified within an inspected sample lot during quality control testing.",
      whyImportant: "A high defect rate signals poor factory workmanship. If defect rate exceeds AQL limit (e.g. 2.5%), the supplier must re-manufacture the batch at their own cost.",
      businessExample: "During PSI of 500 LED panels, 15 panels had flickering issues, resulting in a 3.0% Defect Rate. Since 3.0% exceeded the 1.5% contract limit, the supplier replaced all 15 units.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Quality control illustration for Defect Rate.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'Defect Rate Standards Guide.pdf', totalPages: 2, size: '480 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Quality checklist.'] },
      downloadOption: { title: 'Defect Rate Audit Sheet', fileUrl: '#', size: '60 KB', type: 'pdf' },
      relatedTopics: ['Pre-Shipment Inspection', 'Compliance', 'Product Testing'],
      faqs: [{ question: 'What is the role of Defect Rate?', answer: "Defect Rate is the percentage of failed or non-conforming items identified within an inspected sample lot during quality control testing." }],
      commonMistakes: ["Accepting batches with defect rates above agreed contractual AQL limits."],
      practicalTips: ["Include clear penalty clauses requiring factory re-inspection fees if defect rate fails AQL limits."],
      summary: "Defect Rate measures the percentage of non-conforming units in a batch.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What does Defect Rate do?', options: ["Defect Rate is the percentage of failed or non-conforming items identified within an inspected sample lot during quality control testing.", 'A tax penalty.', 'An illegal trade practice.', 'A shipping carrier.'], correctAnswers: ['0'], explanation: "Defect Rate is the percentage of failed or non-conforming items identified within an inspected sample lot during quality control testing." }],
      objectives: ['Understand operational meaning of Defect Rate.'],
      writtenExplanation: "Defect Rate is the percentage of failed or non-conforming items identified within an inspected sample lot during quality control testing.",
      importantNotes: ["Include clear penalty clauses requiring factory re-inspection fees if defect rate fails AQL limits."],
      keyPoints: ["Defect Rate measures the percentage of non-conforming units in a batch."]
    };
  }

  if (title === 'Product Testing') {
    return {
      definition: "Product Testing involves sending product samples to accredited laboratories (such as UL, TÜV, or Intertek) to run rigorous electrical safety, chemical toxicity, waterproof, or drop tests.",
      whyImportant: "Mandatory for obtaining mandatory import compliance marks like CE, RoHS, FCC, or BIS certificates required by destination port customs.",
      businessExample: "RBC sends 3 sample power banks to a TÜV lab for battery thermal testing and short-circuit protection certification before importing.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Quality control illustration for Product Testing.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'Product Testing Standards Guide.pdf', totalPages: 2, size: '480 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Quality checklist.'] },
      downloadOption: { title: 'Product Testing Audit Sheet', fileUrl: '#', size: '60 KB', type: 'pdf' },
      relatedTopics: ['Pre-Shipment Inspection', 'Compliance', 'Product Testing'],
      faqs: [{ question: 'What is the role of Product Testing?', answer: "Product Testing involves sending product samples to accredited laboratories (such as UL, TÜV, or Intertek) to run rigorous electrical safety, chemical toxicity, waterproof, or drop tests." }],
      commonMistakes: ["Relying on expired or fake lab test certificates provided by unverified suppliers."],
      practicalTips: ["Verify lab test certificate authenticity directly on testing agency verification portals."],
      summary: "Product Testing certifies safety, toxicity, and electrical standards in accredited laboratories.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What does Product Testing do?', options: ["Product Testing involves sending product samples to accredited laboratories (such as UL, TÜV, or Intertek) to run rigorous electrical safety, chemical toxicity, waterproof, or drop tests.", 'A tax penalty.', 'An illegal trade practice.', 'A shipping carrier.'], correctAnswers: ['0'], explanation: "Product Testing involves sending product samples to accredited laboratories (such as UL, TÜV, or Intertek) to run rigorous electrical safety, chemical toxicity, waterproof, or drop tests." }],
      objectives: ['Understand operational meaning of Product Testing.'],
      writtenExplanation: "Product Testing involves sending product samples to accredited laboratories (such as UL, TÜV, or Intertek) to run rigorous electrical safety, chemical toxicity, waterproof, or drop tests.",
      importantNotes: ["Verify lab test certificate authenticity directly on testing agency verification portals."],
      keyPoints: ["Product Testing certifies safety, toxicity, and electrical standards in accredited laboratories."]
    };
  }

  if (title === 'Compliance') {
    return {
      definition: "Compliance is the strict adherence of imported goods to all mandatory health, safety, environmental, labeling, and legal standards established by the destination government.",
      whyImportant: "Non-compliant goods are seized, destroyed, or re-exported by customs authorities at the importer's severe financial loss.",
      businessExample: "RBC verifies that imported toy shipments have non-toxic paint test reports and mandatory BIS registration marks printed on packaging for Indian market entry.",
      images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', caption: 'Quality control illustration for Compliance.', highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
      video: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', duration: 420 },
      pdf: { pdfUrl: '#', title: 'Compliance Standards Guide.pdf', totalPages: 2, size: '480 KB', mockPagesText: ['Page 1: Technical specs.', 'Page 2: Quality checklist.'] },
      downloadOption: { title: 'Compliance Audit Sheet', fileUrl: '#', size: '60 KB', type: 'pdf' },
      relatedTopics: ['Pre-Shipment Inspection', 'Compliance', 'Product Testing'],
      faqs: [{ question: 'What is the role of Compliance?', answer: "Compliance is the strict adherence of imported goods to all mandatory health, safety, environmental, labeling, and legal standards established by the destination government." }],
      commonMistakes: ["Importing goods without mandatory regional compliance marks (e.g. BIS in India, CE in EU)."],
      practicalTips: ["Check current customs tariff regulations and mandatory certification rules before placing purchase orders."],
      summary: "Compliance is full legal, environmental, and safety adherence to destination country import laws.",
      quiz: [{ id: `${lessonId}-q1`, type: 'mcq', question: 'What does Compliance do?', options: ["Compliance is the strict adherence of imported goods to all mandatory health, safety, environmental, labeling, and legal standards established by the destination government.", 'A tax penalty.', 'An illegal trade practice.', 'A shipping carrier.'], correctAnswers: ['0'], explanation: "Compliance is the strict adherence of imported goods to all mandatory health, safety, environmental, labeling, and legal standards established by the destination government." }],
      objectives: ['Understand operational meaning of Compliance.'],
      writtenExplanation: "Compliance is the strict adherence of imported goods to all mandatory health, safety, environmental, labeling, and legal standards established by the destination government.",
      importantNotes: ["Check current customs tariff regulations and mandatory certification rules before placing purchase orders."],
      keyPoints: ["Compliance is full legal, environmental, and safety adherence to destination country import laws."]
    };
  }

  if (title === 'MOQ') {
    return {
      definition: 'MOQ stands for Minimum Order Quantity — the smallest number of units a supplier is willing to produce or sell in a single order. For example, if a factory sets an MOQ of 500 units, you cannot order 200 units; you must order at least 500.',
      whyImportant: 'MOQ affects your investment, storage space, and cash flow directly. A high MOQ means more capital tied up in stock. A low MOQ lets you test products with less risk. Understanding MOQ helps you negotiate better deals and plan your business finances correctly.',
      businessExample: 'RBC wants to import LED strip lights from a factory in Shenzhen. The factory says MOQ = 1,000 pcs. RBC negotiates by saying they will pay a higher unit price for 500 pcs as a trial order. The factory agrees. This is how real MOQ negotiation works — offer better margin in exchange for lower minimum.',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure 2.1: Factory production floor — MOQ determines minimum batch size.',
          highResUrl: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 420
      },
      pdf: { pdfUrl: '#', title: 'MOQ Negotiation Guide.pdf', totalPages: 2, size: '500 KB', mockPagesText: ['Page 1: How to calculate break-even MOQ for your business model.', 'Page 2: Template email to negotiate MOQ with suppliers.'] },
      downloadOption: { title: 'MOQ Calculation Template', fileUrl: '#', size: '80 KB', type: 'xls' },
      relatedTopics: ['SKU', 'Product Sample', 'Purchase Order'],
      faqs: [
        { question: 'Can I negotiate MOQ with a factory?', answer: 'Yes! Offer to pay a higher per-unit price, share marketing plans, or commit to repeat orders. Most factories will reduce MOQ by 30–50% for serious buyers.' },
        { question: 'What happens if I order below MOQ?', answer: 'The factory will either refuse the order, charge a "below MOQ surcharge" (extra fee), or require you to pay for the full MOQ batch regardless.' }
      ],
      commonMistakes: [
        'Accepting the first MOQ the supplier quotes without negotiating — always negotiate, factories expect it.',
        'Ordering huge quantities to meet MOQ without testing product quality or market demand first.',
        'Confusing MOQ (units) with minimum order value (dollar amount) — always clarify which one applies.'
      ],
      practicalTips: [
        'Ask the supplier: "What is your MOQ for a sample order?" — many factories have a separate lower MOQ for first-time buyers.',
        'If MOQ is too high, find a trading company that buys from the factory in bulk and resells in smaller quantities.',
        'Always confirm MOQ in writing (email/contract) before placing deposits.'
      ],
      summary: 'MOQ (Minimum Order Quantity) is the least number of units a supplier will accept per order. Negotiate it based on price flexibility, order commitment, or trial order offers. Understanding MOQ protects your cash flow and prevents overstock.',
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'What does MOQ stand for in international trade?',
          options: ['Maximum Order Quantity', 'Minimum Order Quantity', 'Market Order Quota', 'Monthly Order Quantity'],
          correctAnswers: ['1'],
          explanation: 'MOQ = Minimum Order Quantity — the smallest batch a factory will manufacture or sell per order.'
        }
      ],
      objectives: ['Understand what MOQ means and why factories set it.', 'Learn how to negotiate MOQ effectively.'],
      writtenExplanation: 'MOQ (Minimum Order Quantity) is the minimum number of units a supplier agrees to produce in one order. Factories set MOQ because below a certain quantity, the production setup cost is not worth it. For a buyer, understanding MOQ is critical because it directly impacts how much money you need upfront and how much stock you will hold.',
      importantNotes: ['MOQ can be negotiated — offer better price per unit or commit to future repeat orders.', 'Always confirm MOQ and price together — lower MOQ usually means higher per-unit price.'],
      keyPoints: ['MOQ = Minimum Order Quantity', 'Negotiate with higher per-unit price offer', 'Always get MOQ confirmed in writing']
    };
  }

  if (title === 'SKU') {
    return {
      definition: 'SKU stands for Stock Keeping Unit — a unique alphanumeric code assigned to every individual product variant for tracking inventory. Each color, size, or style of a product gets its own SKU code. For example: LED-STRIP-5M-WARM-WHITE = one SKU, LED-STRIP-5M-COOL-WHITE = another SKU.',
      whyImportant: 'SKU codes allow businesses to track exactly which product variant is in stock, how many are sold, and what needs to be reordered. Without proper SKUs, inventory management becomes chaotic and shipping mistakes increase.',
      businessExample: 'RBC imports mobile phone cases in 3 models and 4 colors each = 12 SKUs. Warehouse staff use these SKU codes on barcode labels to pick the correct item for each customer order without confusion.',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure 2.2: Barcode labels on warehouse shelves showing SKU codes for product tracking.',
          highResUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 380
      },
      pdf: { pdfUrl: '#', title: 'SKU Management Guide.pdf', totalPages: 2, size: '450 KB', mockPagesText: ['Page 1: How to create SKU codes for your product catalog.', 'Page 2: Using SKUs in inventory management software.'] },
      downloadOption: { title: 'SKU Template Excel', fileUrl: '#', size: '60 KB', type: 'xls' },
      relatedTopics: ['Model Number', 'Product Specification', 'Packing List'],
      faqs: [
        { question: 'Is SKU the same as barcode?', answer: 'No. SKU is your internal product code created by your business. Barcode (like EAN-13) is a universal scanning code used globally. Your SKU can be linked to a barcode, but they are different things.' },
        { question: 'How many characters should a SKU have?', answer: 'Typically 8–12 characters. Keep it short, logical, and easy to read. Example: TSHRT-RED-LG (T-shirt, Red, Large).' }
      ],
      commonMistakes: [
        'Using supplier model numbers as your SKU — create your own internal codes for better control.',
        'Not assigning unique SKUs to each variant (color, size, pack quantity) leading to wrong items being shipped.',
        'Using special characters like / or spaces in SKU codes that break inventory software.'
      ],
      practicalTips: [
        'Build your SKU with a logical structure: CATEGORY-COLOR-SIZE (e.g., BAG-BLK-LRG).',
        'Never change a SKU once it is in use — it breaks inventory history records.',
        'Use the same SKU on your packing list, invoice, and warehouse label for error-free operations.'
      ],
      summary: 'SKU (Stock Keeping Unit) is a unique product identification code for every variant you sell. It is essential for accurate inventory tracking, order picking, and reorder management. Create SKUs logically and keep them consistent across all documents.',
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'What does SKU stand for in inventory management?',
          options: ['Stock Keeping Utility', 'Stock Keeping Unit', 'Sales Keeping Unit', 'Standard Keeping Unit'],
          correctAnswers: ['1'],
          explanation: 'SKU = Stock Keeping Unit — a unique code assigned to each distinct product variant for tracking inventory.'
        }
      ],
      objectives: ['Understand what SKU means and how to create them.', 'Learn how SKUs are used in warehouses and on packing lists.'],
      writtenExplanation: 'SKU (Stock Keeping Unit) is a unique product identification code. Every product variant — different color, size, or model — gets its own SKU. Businesses use SKUs to track inventory levels, process orders correctly, and identify products in their warehouse management system.',
      importantNotes: ['Every product variant must have its own unique SKU.', 'Keep SKU consistent across invoice, packing list, and warehouse label.'],
      keyPoints: ['SKU = Stock Keeping Unit', 'Each variant (color/size) = different SKU', 'Create logical SKU structure']
    };
  }

  if (title === 'OEM') {
    return {
      definition: 'OEM stands for Original Equipment Manufacturer — a company that manufactures products based on the buyer\'s design, specifications, and brand name. The factory produces the product, but the buyer owns the design and puts their own brand on it.',
      whyImportant: 'OEM manufacturing allows businesses to launch branded products without owning a factory. You design the product, the factory makes it, you sell it under your brand. This is how most global brands like Apple, Nike, and Samsung source their products.',
      businessExample: 'RBC designs a custom LED panel with their own circuit board design and dimensions. They send the technical drawings to a factory in Guangzhou. The factory produces 2,000 units of RBC\'s exact design and puts "RBC" branding on the box. This is OEM — the factory makes it, RBC owns and brands it.',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure 2.6: OEM factory production line manufacturing custom branded products.',
          highResUrl: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 440
      },
      pdf: { pdfUrl: '#', title: 'OEM vs ODM vs Private Label Guide.pdf', totalPages: 2, size: '650 KB', mockPagesText: ['Page 1: Differences between OEM, ODM, and Private Label explained with examples.', 'Page 2: How to protect your OEM design with NDAs and IP agreements.'] },
      downloadOption: { title: 'OEM Agreement Template', fileUrl: '#', size: '95 KB', type: 'pdf' },
      relatedTopics: ['ODM', 'Private Label', 'Product Specification'],
      faqs: [
        { question: 'What is the difference between OEM and ODM?', answer: 'OEM: You provide the design, factory manufactures it. ODM: Factory has their own existing design, you just put your brand on it. OEM requires more design work but gives you full product ownership.' },
        { question: 'Do I need to protect my OEM design?', answer: 'Yes! Always sign an NDA (Non-Disclosure Agreement) and a product exclusivity agreement before sharing your technical drawings with any factory.' }
      ],
      commonMistakes: [
        'Sharing full product design files without signing an NDA — factories may copy your design and sell to your competitors.',
        'Confusing OEM with ODM — in OEM, the buyer owns the design; in ODM, the factory owns the design.',
        'Not specifying all technical requirements in writing, leading to products that don\'t match your design.'
      ],
      practicalTips: [
        'Always sign an NDA before sending any product designs or specifications to a factory.',
        'Request a sealed prototype before approving mass production in any OEM arrangement.',
        'Register your product design as a patent or utility model for legal protection.'
      ],
      summary: 'OEM (Original Equipment Manufacturer) means you design the product and a factory manufactures it under your brand. OEM gives you full product ownership and brand differentiation. Protect your designs with NDAs before sharing with any manufacturer.',
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'In an OEM arrangement, who owns and provides the product design?',
          options: ['The factory/manufacturer', 'The shipping company', 'The buyer/brand owner', 'The customs authority'],
          correctAnswers: ['2'],
          explanation: 'In OEM, the buyer provides their own design and specifications. The factory only manufactures the product — the buyer owns the design and brand.'
        }
      ],
      objectives: ['Understand what OEM means and how it differs from ODM.', 'Learn how to protect your product design in OEM manufacturing.'],
      writtenExplanation: 'OEM (Original Equipment Manufacturer) is when a buyer provides their own product design and a factory manufactures it. The buyer owns the intellectual property. The factory gets paid for manufacturing only. This model is used by most global brands to manufacture products without owning factories.',
      importantNotes: ['Always sign NDA before sharing designs with any factory.', 'OEM buyer owns the design; ODM buyer only owns the brand.'],
      keyPoints: ['OEM = Buyer owns design, factory manufactures', 'Sign NDA before sharing technical files', 'Request prototype before mass production']
    };
  }

  if (title === 'ODM') {
    return {
      definition: 'ODM stands for Original Design Manufacturer — a factory that already has its own existing product designs and manufactures them. The buyer selects from the factory\'s existing product catalog, adds their own branding (logo, color, packaging), and sells it as their own product.',
      whyImportant: 'ODM is faster and cheaper than OEM because you don\'t need to create a new design. The factory already has the mold, tooling, and production process ready. Ideal for new businesses wanting to launch branded products quickly without high R&D costs.',
      businessExample: 'A factory in Dongguan already makes a Bluetooth speaker (their own design). RBC selects this speaker from the factory\'s catalog, asks them to print "RBC Audio" on the speaker and use custom packaging. RBC sells it as their own product. The factory designed and made it — RBC just branded it. This is ODM.',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure 2.7: ODM factory catalog showing existing product designs available for custom branding.',
          highResUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 390
      },
      pdf: { pdfUrl: '#', title: 'ODM Sourcing Strategy Guide.pdf', totalPages: 2, size: '580 KB', mockPagesText: ['Page 1: How to find ODM factories on Alibaba and at trade shows.', 'Page 2: Customization options available in ODM — branding, color, packaging changes.'] },
      downloadOption: { title: 'ODM Product Selection Checklist', fileUrl: '#', size: '75 KB', type: 'pdf' },
      relatedTopics: ['OEM', 'Private Label', 'Product Sample'],
      faqs: [
        { question: 'Can I change the design of an ODM product?', answer: 'Minor changes like color, logo, and packaging are allowed. Major structural changes (new mold) convert it to OEM, which requires additional tooling fees of $500–$5,000.' },
        { question: 'Do I own the product if it\'s ODM?', answer: 'No. The factory owns the product design. You only own your brand. The factory can sell the same product design to your competitors with different branding.' }
      ],
      commonMistakes: [
        'Assuming ODM gives you exclusive product rights — the factory can sell the same design to competitors.',
        'Not requesting sample testing before placing large ODM orders — factories may produce slightly different specs than shown in catalog.',
        'Skipping a brand exclusivity agreement — always ask for exclusivity in your target market.'
      ],
      practicalTips: [
        'Request a "market exclusivity" clause — factory agrees not to sell the same design to competitors in your country.',
        'Always order 2–3 samples from different suppliers to compare ODM product quality before choosing.',
        'Check if the ODM product has existing certifications (CE, RoHS) that you can use in your market.'
      ],
      summary: 'ODM (Original Design Manufacturer) means the factory owns and designs the product; you just add your brand. ODM is faster and cheaper than OEM, but you don\'t own the design. Best for businesses that want to launch branded products quickly without design investment.',
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'In an ODM arrangement, who owns the original product design?',
          options: ['The buyer/importer', 'The customs authority', 'The factory/manufacturer', 'The shipping line'],
          correctAnswers: ['2'],
          explanation: 'In ODM, the factory owns the design. The buyer only adds their branding. This is the key difference from OEM where the buyer owns the design.'
        }
      ],
      objectives: ['Understand what ODM means and how it differs from OEM.', 'Know the risks of ODM regarding design exclusivity.'],
      writtenExplanation: 'ODM (Original Design Manufacturer) means you select from a factory\'s existing product designs and brand them as your own. The factory owns the design. You own the brand. ODM is faster and cheaper than OEM because no new design or tooling is needed. However, competitors can buy and brand the same product.',
      importantNotes: ['Factory owns the design in ODM — you only own the brand.', 'Ask for market exclusivity to prevent competitors from selling the same product.'],
      keyPoints: ['ODM = Factory owns design, buyer brands it', 'Faster and cheaper than OEM', 'Request market exclusivity agreement']
    };
  }

  if (title === 'Private Label') {
    return {
      definition: 'Private Label means selling a product manufactured by a third-party factory under your own brand name and packaging. The factory makes the product; you sell it as if it\'s your own brand. Private Label is very common in retail — products like "Amazon Basics" or supermarket own-brand products are private label.',
      whyImportant: 'Private Label allows businesses to offer branded products with higher profit margins without manufacturing anything themselves. It\'s faster to market than OEM and builds your brand equity with customers.',
      businessExample: 'RBC wants to sell protein supplements. They find a factory in Ahmedabad that makes nutritional powders. RBC provides their own "RBC Nutrition" labels, box design, and logo. The factory fills the product in RBC\'s branded tubs. RBC sells it online. The factory made the product — RBC only owns the brand and packaging design.',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure 2.8: Private label products showing brand packaging on manufacturer products.',
          highResUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 410
      },
      pdf: { pdfUrl: '#', title: 'Private Label Business Guide.pdf', totalPages: 2, size: '620 KB', mockPagesText: ['Page 1: Steps to launch a private label product from factory selection to Amazon listing.', 'Page 2: Branding, packaging design, and label compliance requirements.'] },
      downloadOption: { title: 'Private Label Launch Checklist', fileUrl: '#', size: '85 KB', type: 'pdf' },
      relatedTopics: ['OEM', 'ODM', 'Brand', 'Packaging'],
      faqs: [
        { question: 'Is private label the same as white label?', answer: 'Similar but different. White label = one product, many brands (factory\'s standard product with just logo change). Private label = product customized more specifically for your brand (formula, packaging, recipe changes possible).' },
        { question: 'Do I need a trademark for private label?', answer: 'Yes! Always register your brand trademark before launching private label products. Without it, anyone can copy your brand name legally.' }
      ],
      commonMistakes: [
        'Starting private label without trademark registration — competitors can copy your brand name.',
        'Choosing a factory solely on price without checking product quality, certifications, and compliance.',
        'Using the factory\'s generic packaging without custom design — reduces perceived brand value significantly.'
      ],
      practicalTips: [
        'Register your brand trademark in your target country before placing your first private label order.',
        'Invest in quality packaging design — 80% of consumer purchase decisions are influenced by packaging.',
        'Order sample batches from 3 factories and compare quality, pricing, and MOQ before committing.'
      ],
      summary: 'Private Label means manufacturing products through a factory and selling them under your own brand name. It builds brand value without factory ownership. Always register your trademark and invest in premium packaging to stand out in the market.',
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'true-false',
          question: 'In a Private Label arrangement, the buyer designs and manufactures the product in their own factory.',
          correctAnswers: ['false'],
          explanation: 'False. In Private Label, a third-party factory manufactures the product. The buyer only owns the brand and packaging. The factory handles all manufacturing.'
        }
      ],
      objectives: ['Understand what Private Label means and how it differs from OEM/ODM.', 'Learn the steps to launch a private label product.'],
      writtenExplanation: 'Private Label is when a factory manufactures a product and you sell it under your own brand. You control the branding and packaging — the factory controls the production. This model allows businesses to build brands without manufacturing expertise or factory investment.',
      importantNotes: ['Register your trademark before launching any private label product.', 'Custom packaging design is key to private label success.'],
      keyPoints: ['Private Label = Factory makes, you brand', 'Register trademark first', 'Invest in packaging design']
    };
  }

  if (title === 'Product Specification') {
    return {
      definition: 'Product Specification (Product Spec or Tech Spec) is a detailed written document that describes every physical, functional, and quality requirement of a product — including dimensions, materials, weight, colors, performance standards, packaging requirements, and compliance certifications.',
      whyImportant: 'Without a clear product specification, factories will make whatever they want and you cannot complain. Product specs are your legal reference — if the factory delivers a product that doesn\'t match the spec, you can reject it and demand a refund or replacement.',
      businessExample: 'RBC orders 500 power banks from China. Their product spec says: Capacity = 10,000mAh, Size = 140mm × 68mm × 14mm, Color = Matte Black, Material = Aluminum alloy, USB ports = 2, Certification = CE + RoHS. The factory receives these specs and must produce exactly to these requirements.',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure 2.4: Technical specification document with product dimensions and material details.',
          highResUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 430
      },
      pdf: { pdfUrl: '#', title: 'Product Specification Template.pdf', totalPages: 2, size: '520 KB', mockPagesText: ['Page 1: How to write a complete product specification — dimensions, materials, performance.', 'Page 2: Common specification mistakes and how to avoid them.'] },
      downloadOption: { title: 'Product Spec Template Excel', fileUrl: '#', size: '90 KB', type: 'xls' },
      relatedTopics: ['MOQ', 'Product Sample', 'Quality Control'],
      faqs: [
        { question: 'What happens if the factory doesn\'t follow my product spec?', answer: 'You can reject the goods and negotiate a discount, replacement, or refund. A signed product spec serves as the legal basis for your claim against the factory.' },
        { question: 'Should I include packaging specs in my product specification?', answer: 'Yes, absolutely. Packaging specs include inner box size, master carton size, units per carton, barcode position, language on labels, and warning text requirements.' }
      ],
      commonMistakes: [
        'Sending only verbal specifications to factories — always send written, signed spec sheets.',
        'Not including tolerance limits (e.g., ±2mm size tolerance) — factories interpret this as "any size is acceptable".',
        'Forgetting to specify required certifications (CE, BIS, FDA) in the product spec.'
      ],
      practicalTips: [
        'Use a standard spec sheet template with sections: Product Name, SKU, Dimensions, Weight, Material, Color, Certification, Packaging.',
        'Always include photos, diagrams, or reference samples in your spec document for clarity.',
        'Get the factory to sign and stamp your product specification document before production starts.'
      ],
      summary: 'Product Specification is a written document defining every requirement of your product. It protects you legally and ensures the factory produces exactly what you ordered. Always include dimensions, materials, certifications, and packaging requirements in your spec sheet.',
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Why is a Product Specification document important in international trade?',
          options: [
            'It tells the shipping company which route to take.',
            'It defines exact product requirements and serves as legal reference if factory delivers wrong products.',
            'It sets the import duty rate for customs clearance.',
            'It confirms the buyer\'s payment terms with the bank.'
          ],
          correctAnswers: ['1'],
          explanation: 'Product Specification defines every product requirement. If a factory deviates from it, the buyer can legally reject the goods and demand replacement or refund.'
        }
      ],
      objectives: ['Learn to write a complete product specification document.', 'Understand how product specs protect buyers legally.'],
      writtenExplanation: 'Product Specification is a detailed document listing every requirement for a product — size, weight, material, color, certifications, and packaging. It is the legal reference between buyer and factory. Any deviation from the spec is grounds for rejection of goods.',
      importantNotes: ['Get spec document signed by factory before production.', 'Include tolerance limits for dimensions and weight.'],
      keyPoints: ['Product Spec = Legal document between buyer and factory', 'Include dimensions, materials, certifications', 'Factory must sign before production starts']
    };
  }

  if (title === 'Product Sample') {
    return {
      definition: 'A Product Sample is a physical unit of the product provided by the factory before mass production begins. The buyer evaluates the sample for quality, dimensions, appearance, and functionality to confirm it matches their requirements before placing a full order.',
      whyImportant: 'Samples protect buyers from receiving defective mass production. It is far cheaper to discover problems on a 5-unit sample than after receiving 5,000 units. Always approve a sample before paying your production deposit.',
      businessExample: 'RBC is considering ordering 2,000 wireless earbuds from a factory. They first request 3 sample units and pay a sample fee of $50. When the samples arrive, RBC tests sound quality, battery life, Bluetooth range, and charging case quality. They find the charging case is too flimsy. They ask the factory to use thicker plastic (0.8mm instead of 0.5mm) and approve the revised sample before confirming the main order.',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure 2.5: Product sample testing — checking quality, dimensions, and functionality before production.',
          highResUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 400
      },
      pdf: { pdfUrl: '#', title: 'Sample Evaluation Checklist.pdf', totalPages: 2, size: '480 KB', mockPagesText: ['Page 1: How to evaluate product samples — visual, functional, and safety tests.', 'Page 2: Sample approval process and how to communicate feedback to factories.'] },
      downloadOption: { title: 'Sample Evaluation Checklist Excel', fileUrl: '#', size: '70 KB', type: 'xls' },
      relatedTopics: ['Product Specification', 'MOQ', 'Quality Control'],
      faqs: [
        { question: 'How much does a product sample cost?', answer: 'Sample fees vary by product. Simple items cost $10–$50. Complex electronics or custom products cost $100–$500. Sample fees are usually refunded or deducted from your main order if you proceed.' },
        { question: 'How many samples should I request?', answer: 'Request at least 3 samples per product for proper testing. Test one, keep one as reference, and send one for lab testing if required.' }
      ],
      commonMistakes: [
        'Skipping sample approval and going straight to mass production — this leads to expensive quality rejections.',
        'Approving a sample verbally instead of in writing — always send written sample approval with noted specifications.',
        'Testing only appearance and not functionality — always test the product under real-use conditions.'
      ],
      practicalTips: [
        'Document all sample issues in writing to the factory with photos — this creates a record for quality accountability.',
        'Compare samples from 3 different factories before choosing your supplier.',
        'Keep one approved sample sealed in a bag — it becomes your production quality benchmark.'
      ],
      summary: 'Product Sample is a physical unit approved before mass production. It prevents expensive quality defects. Always test functionality, check dimensions against your spec, and get sample approval confirmed in writing before releasing your production deposit.',
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'true-false',
          question: 'It is safe to skip product sample testing if the factory has good reviews online.',
          correctAnswers: ['false'],
          explanation: 'Never skip sample testing. Online reviews don\'t guarantee your specific product will meet your requirements. Sample testing is the only way to verify quality before mass production.'
        }
      ],
      objectives: ['Understand the purpose and importance of product samples.', 'Learn how to evaluate and approve samples correctly.'],
      writtenExplanation: 'A Product Sample is a physical unit of a product provided before mass production for quality verification. The buyer tests and approves the sample before releasing a deposit for full production. Sample testing prevents expensive quality problems in large orders.',
      importantNotes: ['Always test sample under real conditions, not just visually.', 'Keep one approved sealed sample as production quality benchmark.'],
      keyPoints: ['Sample before mass production = essential', 'Test functionality + dimensions + quality', 'Written approval before deposit']
    };
  }

  if (title === 'Model Number') {
    return {
      definition: 'A Model Number is a unique alphanumeric code assigned by a manufacturer to identify a specific product design or version. It helps buyers, sellers, and logistics teams identify the exact product being ordered, shipped, or replaced. Example: Sony TV Model "KD-65X80L" identifies a specific 65-inch 4K TV with specific features.',
      whyImportant: 'Model numbers prevent ordering or shipping the wrong product. In international trade with hundreds of product variants, model numbers ensure all parties — factory, buyer, shipping agent, customs — are referring to the exact same product.',
      businessExample: 'RBC orders 300 units of a CCTV camera. The factory has 5 camera models: CM-100, CM-200, CM-300, CM-400, CM-500. RBC specifies Model CM-300 (2MP, 30m Night Vision). The shipping agent puts CM-300 on the packing list. Customs verifies CM-300 against the invoice. Everyone knows exactly what product is being shipped.',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1612178537253-bccd437b730e?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure 2.3: Product labels showing model numbers for identification and inventory control.',
          highResUrl: 'https://images.unsplash.com/photo-1612178537253-bccd437b730e?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 350
      },
      pdf: { pdfUrl: '#', title: 'Model Number Management Guide.pdf', totalPages: 1, size: '300 KB', mockPagesText: ['Page 1: How model numbers are used across documents — invoice, packing list, customs, and warranty.'] },
      downloadOption: { title: 'Product Model Register Template', fileUrl: '#', size: '55 KB', type: 'xls' },
      relatedTopics: ['SKU', 'Product Specification', 'Packing List'],
      faqs: [
        { question: 'Is model number the same as SKU?', answer: 'No. Model number is assigned by the manufacturer for their product design. SKU is your internal inventory tracking code. You can have your own SKU linked to the factory\'s model number.' },
        { question: 'What if a factory changes a model number?', answer: 'Always confirm that model numbers haven\'t changed between orders — factories sometimes update model numbers when they make design changes, even minor ones.' }
      ],
      commonMistakes: [
        'Not including model numbers on purchase orders, leading to factories shipping the wrong product version.',
        'Using product names instead of model numbers — names can be ambiguous, model numbers are precise.',
        'Not verifying that the model number on the packing list matches the purchase order and invoice.'
      ],
      practicalTips: [
        'Always include the exact factory model number on your Purchase Order and Commercial Invoice.',
        'Verify model numbers in the physical product against the shipping documents before warehouse acceptance.',
        'If a factory discontinues a model, request the technical spec sheet of the replacement model before accepting it.'
      ],
      summary: 'Model Number is the manufacturer\'s unique code for a specific product design. It ensures all trade documents — PO, invoice, packing list, and customs forms — refer to the exact same product version. Always include model numbers on all trade documents to prevent shipping errors.',
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'What is the primary purpose of a Model Number in international trade?',
          options: [
            'To calculate customs duty percentage.',
            'To uniquely identify a specific product design across all trade documents.',
            'To determine the shipping route for the cargo.',
            'To set the minimum order quantity for the product.'
          ],
          correctAnswers: ['1'],
          explanation: 'Model Number uniquely identifies a specific product design. It ensures everyone — factory, buyer, customs, and logistics — is referring to the exact same product version.'
        }
      ],
      objectives: ['Understand the purpose of model numbers in product identification.', 'Learn how model numbers are used across trade documents.'],
      writtenExplanation: 'A Model Number is a manufacturer-assigned code that uniquely identifies a specific product design. It is used across all trade documents to ensure the correct product is ordered, shipped, and received. Without model numbers, product mix-ups are common in bulk import/export operations.',
      importantNotes: ['Include model number on PO, invoice, and packing list.', 'Verify model number on received goods against documents.'],
      keyPoints: ['Model Number = Manufacturer\'s product ID code', 'Must appear on all trade documents', 'Prevents wrong product shipments']
    };
  }

  if (title === 'Brand') {
    return {
      definition: 'A Brand is the identity of a product or company — it includes the brand name, logo, tagline, color scheme, and the overall perception customers have. In international trade, "brand" also refers to whether a product is sold under the manufacturer\'s brand, the buyer\'s own brand, or a private label brand.',
      whyImportant: 'A strong brand creates customer loyalty, justifies premium pricing, and differentiates your products from competitors. In import-export, branded products generally command higher margins and customer trust than generic or unbranded goods.',
      businessExample: 'RBC imports LED bulbs from China. Generic bulbs sell at ₹50 each. But if RBC creates their own brand "RBC LightTech" with a premium logo, proper packaging, and CE certification, they can sell the same quality bulb at ₹150. The brand adds perceived value and allows higher pricing.',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure 2.9: Brand identity — logo, packaging, and product presentation create brand value.',
          highResUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 420
      },
      pdf: { pdfUrl: '#', title: 'Brand Building for Import-Export Businesses.pdf', totalPages: 2, size: '580 KB', mockPagesText: ['Page 1: How to create a brand identity for imported products — name, logo, packaging.', 'Page 2: Trademark registration process in India and internationally.'] },
      downloadOption: { title: 'Brand Checklist for Importers', fileUrl: '#', size: '70 KB', type: 'pdf' },
      relatedTopics: ['Private Label', 'Packaging', 'OEM'],
      faqs: [
        { question: 'Do I need to register my brand as a trademark?', answer: 'Yes. Trademark registration legally protects your brand name and logo. Without it, anyone can use your brand name. File for trademark with your country\'s IP authority.' },
        { question: 'Can I import products with another company\'s brand?', answer: 'No, this is illegal (trademark infringement) and customs will seize the shipment. Only import branded products if you are an authorized distributor with a written agreement.' }
      ],
      commonMistakes: [
        'Importing counterfeit branded products — customs worldwide actively seize fake branded goods and impose heavy penalties.',
        'Launching a brand without trademark registration — competitors can copy your brand legally.',
        'Using poor quality packaging for branded products — it undermines the brand value customers perceive.'
      ],
      practicalTips: [
        'Register your trademark before your first import shipment — trademark disputes are expensive to fight.',
        'Invest in professional logo and packaging design — it is the most visible part of your brand.',
        'Keep brand positioning consistent across all products, packaging, and marketing materials.'
      ],
      summary: 'Brand is the identity and perceived value of your products. In import-export, building your own brand allows higher pricing, customer loyalty, and market differentiation. Always register your trademark, invest in quality packaging, and never import counterfeit branded goods.',
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'true-false',
          question: 'Importing and selling products with a copied famous brand logo is legal if done in small quantities.',
          correctAnswers: ['false'],
          explanation: 'False. Importing counterfeit branded products is illegal regardless of quantity. Customs can seize the entire shipment and the importer faces heavy fines and legal action.'
        }
      ],
      objectives: ['Understand what a brand is and its role in import-export.', 'Learn how to build and protect your own brand.'],
      writtenExplanation: 'A Brand is the complete identity of a product — name, logo, color, and customer perception. In import-export, building your own brand on imported products creates higher margins and customer loyalty. Always register your trademark to legally protect your brand identity.',
      importantNotes: ['Register trademark before first commercial import.', 'Never import counterfeit branded products — it is illegal.'],
      keyPoints: ['Brand = Product identity and perception', 'Trademark registration = legal protection', 'Never import counterfeit brands']
    };
  }

  if (title === 'Packaging') {
    return {
      definition: 'Packaging in international trade refers to all materials and methods used to protect, contain, and present a product during shipping, storage, and sale. It includes inner packaging (retail box), master carton (export carton), and protective materials (bubble wrap, foam, desiccants). Packaging must meet both product safety and customs compliance requirements.',
      whyImportant: 'Good packaging prevents product damage during sea or air freight, reduces claims and rejections, and presents your product professionally to customers. In export, poor packaging is one of the most common causes of damage claims and financial losses.',
      businessExample: 'RBC imports glass photo frames from China. Without proper packaging, 40% of frames arrive broken — causing ₹80,000 in losses. After proper packaging redesign with foam inserts, corrugated dividers, and double-walled cartons, breakage drops to under 2%. The packaging investment of ₹8 per piece saves ₹150 per frame in damage claims.',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=600&q=80',
          caption: 'Figure 2.10: Export packaging — inner retail box, foam protection, and outer master carton.',
          highResUrl: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      video: {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 450
      },
      pdf: { pdfUrl: '#', title: 'Export Packaging Standards Guide.pdf', totalPages: 2, size: '600 KB', mockPagesText: ['Page 1: International packaging standards — ISTA, ASTM drop test requirements for sea freight.', 'Page 2: How to specify packaging on your purchase order and verify before shipment.'] },
      downloadOption: { title: 'Packaging Specification Template', fileUrl: '#', size: '80 KB', type: 'xls' },
      relatedTopics: ['Product Specification', 'CBM', 'Master Carton'],
      faqs: [
        { question: 'What information must appear on export cartons?', answer: 'Export cartons must show: Consignee name/address, Origin country, Product description, Gross/Net weight, Carton dimensions, Carton number (1 of 10, 2 of 10...), and any hazard labels if applicable.' },
        { question: 'What are desiccants and when should I use them?', answer: 'Desiccants are moisture-absorbing packets (silica gel) placed inside product packaging. Use them for electronics, leather goods, and metal products that can rust or deteriorate in humidity during sea freight.' }
      ],
      commonMistakes: [
        'Using thin single-walled cartons for heavy or fragile goods in sea freight — they collapse under stack weight.',
        'Not specifying carton strength requirements (ECT/burst test rating) on purchase orders.',
        'Forgetting to include "Country of Origin" on export cartons — required by customs in most countries.'
      ],
      practicalTips: [
        'For fragile goods (ceramics, glass, electronics), always request double-walled corrugated cartons with foam inserts.',
        'Include packing specifications in your purchase order: carton size, weight limit, units per carton, and wall thickness.',
        'Always inspect 10% of cartons upon factory loading to verify packaging quality before the container is sealed.'
      ],
      summary: 'Packaging protects products during sea/air freight and presents them to customers. Good packaging prevents damage claims and losses. Always specify packaging requirements in your purchase order, use appropriate protective materials, and verify carton quality before container loading.',
      quiz: [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: 'Which of the following MUST be printed on export master cartons?',
          options: [
            'The factory owner\'s personal phone number.',
            'Consignee address, Country of Origin, Gross Weight, and Carton Number.',
            'The bank account details for payment.',
            'The shipping line vessel schedule.'
          ],
          correctAnswers: ['1'],
          explanation: 'Export master cartons must show Consignee name/address, Country of Origin, Gross/Net weight, carton dimensions, and carton numbers. This is required for customs clearance at both origin and destination.'
        }
      ],
      objectives: ['Understand packaging requirements for international trade.', 'Learn how to specify packaging to prevent damage during freight.'],
      writtenExplanation: 'Packaging in international trade protects products during shipping and storage, and presents them to end customers. It includes inner packaging (retail box with protective inserts) and outer packaging (master export carton). Export cartons must carry specific information required by customs. Proper packaging prevents damage claims that can exceed the packaging investment cost many times over.',
      importantNotes: ['Always include "Country of Origin" on export cartons.', 'For fragile goods, specify double-walled cartons with foam inserts.'],
      keyPoints: ['Packaging = Protection + Compliance + Presentation', 'Specify packaging in Purchase Order', 'Inspect carton quality before container loading']
    };
  }

  return null;
};

const generateProgrammaticQuiz = (title: string, lessonId: string, lessonIndex: number): QuizQuestion[] => {
  const index = lessonIndex % 6;

  switch (index) {
    case 0:
      return [
        {
          id: `${lessonId}-q1`,
          type: 'true-false',
          question: `Is it true that ${title} plays a critical role in determining logistics timelines and cost allocations?`,
          correctAnswers: ['true'],
          explanation: `Yes, ${title} is key to planning transit phases, customs duties, and overall pricing.`
        }
      ];
    case 1:
      return [
        {
          id: `${lessonId}-q1`,
          type: 'true-false',
          question: `Does ${title} have absolutely no impact on customs clearance or cargo risk allocation?`,
          correctAnswers: ['false'],
          explanation: `Incorrect. ${title} directly impacts customs compliance, port clearance fees, and cargo risk allocation.`
        }
      ];
    case 2:
      return [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: `In international trade, which of the following best describes the main purpose of ${title}?`,
          options: [
            'To ignore custom duty calculations.',
            'To standardize operations, reduce port delays, and allocate freight risk/costs correctly.',
            'To double the retail price in domestic markets.',
            'To bypass international cargo inspection processes.'
          ],
          correctAnswers: ['1'],
          explanation: `${title} standardizes logistics operations, ensures legal compliance, and clarifies cost/risk boundaries.`
        }
      ];
    case 3:
      return [
        {
          id: `${lessonId}-q1`,
          type: 'true-false',
          question: `Is ${title} purely a local term that has no standard meaning in global shipping agreements?`,
          correctAnswers: ['false'],
          explanation: `${title} is governed by international trade regulations, customs protocols, or global standard practices.`
        }
      ];
    case 4:
      return [
        {
          id: `${lessonId}-q1`,
          type: 'mcq',
          question: `What is a common risk or mistake associated with mishandling ${title}?`,
          options: [
            'Receiving discounts from the shipping line.',
            'Importers incurring heavy demurrage, port detention, and customs penalty charges.',
            'Automatic approval of all custom declarations.',
            'Shorter ocean transit routes.'
          ],
          correctAnswers: ['1'],
          explanation: `Incorrectly handling ${title} often leads to severe customs inspection delays and substantial port penalty charges.`
        }
      ];
    default:
      return [
        {
          id: `${lessonId}-q1`,
          type: 'true-false',
          question: `Is a mismatch in documents related to ${title} a primary reason for customs holding shipments at the port of entry?`,
          correctAnswers: ['true'],
          explanation: `Yes, documentation inconsistencies regarding ${title} parameters will trigger manual audits and customs holds.`
        }
      ];
  }
};

// Seeding engine to populate all 15 modules and their respective lessons

// Helper to generate rich domain-specific content per module for all fallback topics
const getModuleDomainInfo = (title: string, moduleId: string) => {
  // Direct topic-specific lookup for unique definitions across all modules
  const topicMap: { [key: string]: { def: string; imp: string; ex: string; tip: string; mistake: string } } = {
    'Freight': {
      def: 'Freight is the transportation charge paid to a shipping line, airline, or logistics carrier for moving cargo from origin to destination.',
      imp: 'Freight is a major component of Landed Cost calculation. Negotiating competitive freight rates directly increases business profit margins.',
      ex: 'RBC pays $1,800 ocean freight to Maersk line for transporting a 20FT container from Shanghai to Mundra port.',
      tip: 'Request an itemized freight quote showing ocean freight, BAF (bunker fuel), and CAF (currency adjustment).',
      mistake: 'Focusing only on cheap ocean freight while ignoring expensive local terminal handling surcharges.'
    },
    'Sea Freight': {
      def: 'Sea Freight is the transportation of goods in shipping containers or bulk vessels across ocean routes between international seaports.',
      imp: 'Sea Freight is the most economical shipping method for large bulk cargo, accounting for 90% of global trade volume.',
      ex: 'RBC imports 10 tons of industrial machinery via Sea Freight from Ningbo to Nhava Sheva port, taking 18 days transit time at low cost.',
      tip: 'Book sea freight space 2-3 weeks in advance during peak import seasons.',
      mistake: 'Shipping urgent time-sensitive samples via sea freight instead of air freight.'
    },
    'Air Freight': {
      def: 'Air Freight is the rapid transport of cargo via dedicated freighter aircraft or passenger plane belly holds.',
      imp: 'Air Freight is essential for high-value, perishable, fragile, or time-critical shipments requiring arrival within 3-5 days.',
      ex: 'RBC ships urgent electronic prototypes from Shenzhen to Mumbai Airport via Air Freight in 3 days.',
      tip: 'Calculate Chargeable Weight (Max of scale weight vs volume weight ÷ 6000) before booking air freight.',
      mistake: 'Shipping low-value heavy bulk cargo via air freight, exceeding product value.'
    },
    'POL': {
      def: 'POL stands for Port of Loading — the designated seaport in the exporting country where container cargo is loaded onto the vessel.',
      imp: 'Declaring the correct POL on Bills of Lading and origin customs documents is mandatory for vessel tracking and tariff origin compliance.',
      ex: 'For RBC\'s import from China to India, Ningbo Port is POL (Port of Loading). Supplier delivers packed container to Ningbo POL terminal.',
      tip: 'Verify origin POL terminal cutoff dates (CY Cutoff) to ensure container is gated in before ship departs.',
      mistake: 'Confusing Port of Loading (POL) with Port of Discharge (POD) on transport documentation.'
    },
    'POD': {
      def: 'POD stands for Port of Discharge — the destination seaport in the importing country where the container is unloaded from the vessel.',
      imp: 'Customs clearance filing (Bill of Entry) and port demurrage free-days calculation start as soon as vessel docks at POD.',
      ex: 'For RBC\'s shipment from Ningbo to Mundra, Mundra Port is POD (Port of Discharge). RBC files customs Bill of Entry at Mundra POD.',
      tip: 'File advance Bill of Entry 2 days before vessel ETA at POD to clear customs immediately upon discharge.',
      mistake: 'Failing to track vessel ETA at POD, causing container to sit at port and incur expensive demurrage charges.'
    },
    'ICD': {
      def: 'ICD stands for Inland Container Depot (Dry Port) — an inland customs-bonded container handling facility located away from ocean ports.',
      imp: 'ICDs allow importers in inland cities (like Delhi, Ahmedabad, Jaipur) to complete customs clearance locally near their business without traveling to seaports.',
      ex: 'RBC ships container by rail from Mundra seaport directly to ICD Ahmedabad (Dry Port) to clear customs 15 minutes away from their warehouse.',
      tip: 'Specify your local ICD code as final destination on Bill of Lading (e.g., Destination: ICD Ahmedabad - SBIAD).',
      mistake: 'Clearing customs at seaport when an inland ICD is available near your city, increasing double handling truck costs.'
    },
    'CFS': {
      def: 'CFS stands for Container Freight Station — a customs-bonded warehouse at port or ICD where LCL cargo is consolidated or de-consolidated.',
      imp: 'At destination CFS, shared LCL containers are opened, individual importer cartons are sorted, and customs inspection takes place.',
      ex: 'RBC\'s shared LCL container arrives at Mundra CFS. Workers de-stuff container and separate RBC\'s 10 master cartons for customs audit.',
      tip: 'Verify CFS handling charges and free storage days (usually 5 days) before container arrival at CFS.',
      mistake: 'Leaving LCL goods at CFS beyond free storage period, incurring heavy daily storage rent.'
    },
    'Proforma Invoice': {
      def: 'Proforma Invoice (PI) is a preliminary billing document sent by the seller before order confirmation, detailing product specs, prices, terms, and bank details.',
      imp: 'PI serves as the official purchase agreement used by buyers to transfer advance payment deposits and open Letters of Credit (LC) with banks.',
      ex: 'RBC receives a Proforma Invoice from Ningbo supplier for 1,000 LED lights at $8/pc (Total $8,000). RBC signs PI and wires 30% deposit ($2,400) to start production.',
      tip: 'Check that PI explicitly lists Incoterms (FOB/CIF), HSN codes, payment terms, and factory bank SWIFT details before paying.',
      mistake: 'Paying advance deposit based on an informal WeChat or email quote instead of a signed formal Proforma Invoice.'
    },
    'Commercial Invoice': {
      def: 'Commercial Invoice (CI) is the legal billing document issued by seller upon dispatch, serving as the official record of sale and primary basis for customs valuation.',
      imp: 'Customs authorities calculate import duty and GST taxes directly from the Assessable Value declared on the Commercial Invoice.',
      ex: 'RBC submits the seller\'s Commercial Invoice ($12,000 CIF Mundra) to Indian Customs. Customs assesses 7.5% BCD + 18% IGST based on this CI.',
      tip: 'Ensure Invoice Number, Date, Buyer/Seller Tax IDs, Incoterms, HSN Codes, and Currency are accurately stated.',
      mistake: 'Under-declaring Commercial Invoice value to evade customs duty, which is a criminal offense leading to heavy penalties and cargo seizure.'
    },
    'Packing List': {
      def: 'Packing List (PL) is a detailed transport document created by the exporter specifying box count, dimensions, gross weight, net weight, and exact contents of every master carton.',
      imp: 'Customs officers and warehouse team use the Packing List to verify physical box count during inspection and match incoming inventory with purchase orders.',
      ex: 'RBC\'s Packing List states: 50 Master Cartons, Gross Weight 1,000 kg, Net Weight 850 kg, Total Volume 6 CBM.',
      tip: 'Attach a copy of the Packing List inside Container Box #1 and paste pouch copies on outer carton walls.',
      mistake: 'Mismatched box counts or weight discrepancies between Packing List and Bill of Lading, causing customs clearance holds.'
    },
    'Bill of Lading': {
      def: 'Bill of Lading (B/L) is the official ocean transport document issued by shipping line serving as a cargo receipt, contract of carriage, and legal document of title (ownership).',
      imp: 'Original B/L is a negotiable instrument representing legal ownership of cargo. Carrier will NOT release container at destination port without B/L surrender.',
      ex: 'Maersk issues 3 Original Bills of Lading to China supplier. Once RBC pays balance 70% payment, supplier surrenders B/L (Telex Release) so RBC can claim container in India.',
      tip: 'Request Telex Release (Surrender B/L) from supplier to avoid mailing physical original paper documents via international courier.',
      mistake: 'Losing original physical Bill of Lading paper documents, which requires bank guarantees and months of delay to get container released.'
    }
  };

  if (topicMap[title]) {
    return topicMap[title];
  }

  const map: { [key: string]: { def: string; imp: string; ex: string; tip: string; mistake: string } } = {
    'mod-3': {
      def: `${title} is a critical weight and measurement standard in cargo logistics. It dictates cargo density, space allocation, container loading capacity, and freight cost billing for sea and air transport.`,
      imp: `Accurately computing ${title} prevents freight overcharges, container overloading penalties, vessel stability risks, and customs clearance delays at origin and destination ports.`,
      ex: `RBC imports cargo under precise ${title} parameters, coordinating with freight forwarders to verify gross mass certificates (VGM) and optimize container space utilization.`,
      tip: `Always double-check outer carton dimensions and total scale weight before signing the final Packing List and VGM declaration.`,
      mistake: `Relying on estimated packaging weights or inner box dimensions rather than actual outer master carton measurements.`
    },
    'mod-4': {
      def: `${title} is an essential container transport concept defining container utilization, loading method, and cargo security protocols during ocean freight.`,
      imp: `Choosing the right container strategy (${title}) optimizes ocean freight rates, protects goods against transit damage, and ensures smooth port operations.`,
      ex: `RBC plans container logistics using ${title} standards, selecting the appropriate container size and seal specifications to safely transport goods from overseas suppliers.`,
      tip: `Inspect container floor integrity, door seal gaskets, and bolt seal numbers before signing container loading reports.`,
      mistake: `Selecting an improper container type or shipping mode leading to underutilized container space or excess freight charges.`
    },
    'mod-5': {
      def: `${title} represents a core maritime and air freight shipping term governing vessel schedules, transit times, carrier bookings, and freight movement.`,
      imp: `Understanding ${title} enables importers to track cargo milestones, plan inventory arrival schedules, and avoid unexpected port demurrage or transit delays.`,
      ex: `RBC monitors ${title} status on international tracking portals to coordinate destination customs clearance and warehouse receiving schedules.`,
      tip: `Request regular milestone updates (ETD, ETA, transshipment logs) from your freight forwarder to manage supply chain expectations.`,
      mistake: `Ignoring transit schedule updates and failing to prepare customs clearance documents before vessel arrival.`
    },
    'mod-6': {
      def: `${title} is an official Incoterm (International Commercial Term) published by the ICC defining the exact point of risk transfer, cost allocation, and division of responsibilities between seller and buyer.`,
      imp: `${title} clearly establishes who pays ocean freight, who purchases marine insurance, and who handles export/import customs clearance, preventing costly legal disputes.`,
      ex: `RBC negotiates contracts under ${title} terms, ensuring clear agreement on shipping costs, freight insurance coverage, and customs duty responsibilities.`,
      tip: `Always specify the exact named port or place alongside ${title} on your Purchase Order and Commercial Invoice (e.g. ${title} Shanghai Port).`,
      mistake: `Using ${title} without specifying a clear named port or failing to clarify who buys freight insurance.`
    },
    'mod-7': {
      def: `${title} is a key port and infrastructure concept in international trade, facilitating cargo handling, inland transit, warehousing, and customs clearance.`,
      imp: `Proper utilization of ${title} infrastructure speeds up cargo movement, reduces port dwell time, and avoids costly demurrage and detention charges.`,
      ex: `RBC routes imported containers through designated ${title} facilities for efficient customs inspection, container de-stuffing, and final door delivery.`,
      tip: `Verify free storage days and terminal handling rates at ${title} before routing cargo to prevent unexpected storage bills.`,
      mistake: `Delaying customs clearance documents while cargo sits at ${title}, accumulating expensive port demurrage.`
    },
    'mod-8': {
      def: `${title} is a critical trade document required for legal compliance, customs clearance, foreign exchange settlement, and title of ownership in international trade.`,
      imp: `Without an accurate ${title}, customs authorities cannot assess duty or clear shipments, leading to container holds, port fines, and payment delays.`,
      ex: `RBC verifies every detail on the ${title} (buyer name, invoice number, HSN codes, weights) before submitting it to customs brokers and banking channels.`,
      tip: `Ensure descriptions, values, HSN codes, and party names match identically across all trade documents (${title}, Invoice, Packing List).`,
      mistake: `Discrepancies in values, dates, or product descriptions between ${title} and other shipping documents.`
    },
    'mod-9': {
      def: `${title} is a statutory customs regulation, tariff classification, or compliance requirement governing import duties, taxes, and entry clearance.`,
      imp: `Strict compliance with ${title} ensures smooth customs release, prevents heavy penalty duties, avoids cargo confiscation, and ensures legal import entry.`,
      ex: `RBC consults licensed CHA brokers to verify ${title} duty rates, applicable cesses (BCD, SWS, IGST), and mandatory regulatory approvals before importing.`,
      tip: `Verify HSN code classification and duty structure under current customs tariff schedules before placing import orders.`,
      mistake: `Misclassifying HSN codes or under-declaring invoice values to evade ${title}, resulting in customs prosecution.`
    },
    'mod-10': {
      def: `${title} is a standard international financial payment mechanism governing trade settlement, credit risk management, and banking transfers.`,
      imp: `Using appropriate ${title} protects buyer and seller against payment default, currency fluctuations, and non-delivery of goods.`,
      ex: `RBC executes financial transactions using ${title} protocols, ensuring secure fund transfers through SWIFT banking channels upon document verification.`,
      tip: `Always use audited corporate bank accounts and verified bank SWIFT codes for ${title} transfers.`,
      mistake: `Making payments to unverified personal bank accounts or failing to verify SWIFT confirmation details.`
    },
    'mod-11': {
      def: `${title} refers to specific freight, terminal, or port handling fee charged by shipping lines, port authorities, and forwarders during cargo movement.`,
      imp: `Tracking ${title} prevents unexpected landed cost inflation and helps importers negotiate competitive all-inclusive freight quotes.`,
      ex: `RBC audits all freight invoices against agreed rate cards to verify ${title} items before approving payment to logistics providers.`,
      tip: `Request an itemized break-up of all origin and destination ${title} fees before approving freight quotes.`,
      mistake: `Accepting low ocean freight quotes without checking hidden destination ${title} surcharges.`
    },
    'mod-12': {
      def: `${title} is a formal quality control procedure, defect inspection method, or compliance standard ensuring manufactured goods meet required specifications.`,
      imp: `Implementing ${title} prevents receiving defective or non-compliant goods, protecting brand reputation and avoiding costly product recalls.`,
      ex: `RBC hires certified third-party inspection agencies to perform ${title} at the supplier factory before approving final balance payment.`,
      tip: `Define acceptable quality limits (AQL) and defect criteria in writing within your Purchase Order before production starts.`,
      mistake: `Releasing full payment to supplier before receiving official ${title} reports.`
    },
    'mod-13': {
      def: `${title} is a core operational process in international business workflows, governing order processing, quotation, production tracking, and order fulfillment.`,
      imp: `Streamlining ${title} ensures timely production execution, clear supplier communication, and reliable product delivery schedules.`,
      ex: `RBC tracks ${title} milestones in its ERP software to maintain real-time visibility over supplier order status and customer delivery commitments.`,
      tip: `Confirm all terms (pricing, lead time, specs, terms) in writing during ${title} processing before issuing deposits.`,
      mistake: `Relying on verbal agreements without formal signed documentation during ${title} stage.`
    },
    'mod-14': {
      def: `${title} is a key risk management protocol, insurance provision, or legal remedy designed to mitigate trade losses, transit damage, and contract breaches.`,
      imp: `Effective ${title} management protects business capital against unexpected maritime losses, shipment delays, and supplier default.`,
      ex: `RBC manages trade risks by implementing ${title} measures, purchasing comprehensive cargo insurance, and enforcing clear contract terms.`,
      tip: `Document cargo damage or shortages immediately with photos and written notices to carriers upon container opening.`,
      mistake: `Failing to notify carriers of damage within statutory time limits, invalidating insurance claims.`
    },
    'mod-15': {
      def: `${title} is a specialized internal operational workflow at RBC designed to ensure quality control, supplier verification, and seamless import execution.`,
      imp: `Following the ${title} procedure guarantees operational consistency, risk mitigation, and high customer satisfaction across all trade transactions.`,
      ex: `RBC team members execute ${title} according to standard operating procedures, ensuring every step from supplier check to delivery is audited.`,
      tip: `Complete all required checklist items in ${title} before escalating orders to the next operational phase.`,
      mistake: `Bypassing standard verification checks during ${title} execution.`
    }
  };

  return map[moduleId] || {
    def: `${title} is a fundamental operational term in global import-export trade, defining rules, documentation, and compliance standards.`,
    imp: `Understanding ${title} helps international trade teams optimize logistics costs, ensure legal compliance, and avoid customs delays.`,
    ex: `RBC applies ${title} guidelines across its international trade operations, coordinating with logistics partners to ensure compliant execution.`,
    tip: `Always verify documentation details and compliance rules for ${title} with your logistics agent before shipping.`,
    mistake: `Ignoring standard regulations for ${title}, leading to port delays or unexpected costs.`
  };
};

export const initialLessons: Lesson[] = (() => {
  const generated: Lesson[] = [];

  Object.entries(moduleLessonsMap).forEach(([moduleId, titles]) => {
    titles.forEach((title, idx) => {
      const lessonId = `les-${moduleId}-${idx + 1}`;
      const order = idx + 1;
      
      // Check if we have high-fidelity mock overrides
      const override = getHighFidelityContent(title, lessonId);
      
      if (override) {
        generated.push({
          id: lessonId,
          moduleId,
          title,
          description: `Master the key concepts and application guidelines for ${title} in international trade.`,
          duration: 15,
          order,
          content: override
        });
      } else {
        // Dynamic domain-aware fallback generation
        const info = getModuleDomainInfo(title, moduleId);
        generated.push({
          id: lessonId,
          moduleId,
          title,
          description: `Master the essential meaning, industry practices, and risk factors associated with ${title}.`,
          duration: 12,
          order,
          content: {
            definition: info.def,
            whyImportant: info.imp,
            businessExample: info.ex,
            images: [
              {
                url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
                caption: `Operational visualization of cargo handling and logistics planning for ${title}.`,
                highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
              }
            ],
            video: {
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
              thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
              duration: 653
            },
            pdf: {
              pdfUrl: '#',
              title: `${title} Reference Materials.pdf`,
              totalPages: 1,
              size: '300 KB',
              mockPagesText: [
                `Page 1: Explains technical details, standard values, weight metrics, custom fees, and best practice models for handling ${title} during sea or air shipment.`
              ]
            },
            downloadOption: {
              title: `${title} Reference Sheet`,
              fileUrl: '#',
              size: '45 KB',
              type: 'pdf'
            },
            relatedTopics: ['FOB', 'EXW', 'Customs Clearance'],
            faqs: [
              { question: `What is the role of ${title} in global transit?`, answer: `It clarifies handling protocols, standard documentation clearances, and freight quotes for cargo logistics.` }
            ],
            commonMistakes: [info.mistake, 'Failing to verify documentation details before vessel dispatch.'],
            practicalTips: [info.tip, 'Consult your customs broker (CHA) before finalizing purchase contracts.'],
            summary: `This lesson covered the foundational definition, business examples, FAQs, and risk assessments related to ${title}.`,
            quiz: generateProgrammaticQuiz(title, lessonId, idx),
            objectives: [`Understand the operational definition of ${title}.`, `Analyze the trade importance of ${title}.`],
            writtenExplanation: info.def,
            importantNotes: [`Always check local compliance guides for ${title}.`],
            keyPoints: [`Accurate execution of ${title} reduces demurrage risk.`, `Consolidate variables with forwarders beforehand.`]
          }
        });
      }
    });
  });

  return generated;
})();
