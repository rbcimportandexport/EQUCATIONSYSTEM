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
        // Fallback programmatic generation containing all 13 required sections
        generated.push({
          id: lessonId,
          moduleId,
          title,
          description: `Learn the essential meaning, industry practices, and risk factors associated with ${title}.`,
          duration: 10,
          order,
          content: {
            definition: `${title} is a standard commercial and operational term in global import-export trade. It dictates the procedures, requirements, and compliance standards for handling international shipments.`,
            whyImportant: `Understanding ${title} is vital for importers and exporters to optimize freight costs, ensure smooth customs clearance, avoid port detention fees, and maintain supply chain reliability.`,
            businessExample: `An international trading firm sourcing goods under ${title} guidelines coordinates with freight forwarders, customs brokers, and port authorities to verify documentation and ensure compliance.`,
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
            commonMistakes: [
              `Misdeclaring standard parameters, causing port detention fees.`,
              `Assuming local terms translate globally without checking international customs agreements.`
            ],
            practicalTips: [
              `Always cross-check values with packaging lists and forwarders before billing.`,
              `Request your logistics agent to verify the local terminal handling charges early.`
            ],
            summary: `This lesson covered the foundational definition, business examples, FAQs, and risk assessments related to ${title}.`,
            quiz: generateProgrammaticQuiz(title, lessonId, idx),
            objectives: [`Understand the operational definition of ${title}.`, `Analyze the trade importance of ${title}.`],
            writtenExplanation: `${title} is an essential operational component in international trade. Proper management and documentation of ${title} ensures full regulatory compliance, cost efficiency, and timely delivery of cargo.`,
            importantNotes: [`Always check local compliance guides for ${title}.`],
            keyPoints: [`Accurate execution of ${title} reduces demurrage risk.`, `Consolidate variables with forwarders beforehand.`]
          }
        });
      }
    });
  });

  return generated;
})();
