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
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        duration: 10
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
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=600&q=80',
        duration: 10
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
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
        duration: 10
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

  return null;
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
            definition: `${title} is a core operational term in global logistics and trade logistics. It represents the standards for specifying, handling, and executing shipments.`,
            whyImportant: `Understanding ${title} allows supply chain teams to allocate freight costs, avoid terminal demurrage, clear customs duties, and trace transport milestones successfully.`,
            businessExample: `An import firm sourcing cargo from Munich uses ${title} rules to determine custom declarations, container stuffing bounds, and freight insurance coverage.`,
            images: [
              {
                url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
                caption: `Operational visualization of cargo handling and logistics planning for ${title}.`,
                highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
              }
            ],
            video: {
              videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
              thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
              duration: 10
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
            quiz: [
              {
                id: `${lessonId}-q1`,
                type: 'true-false',
                question: `Correctly understanding ${title} helps logistics agencies avoid delays and customs penalty charges.`,
                correctAnswers: ['true'],
                explanation: `Accurate application of trade and cargo terms prevents customs disputes, loading discrepancies, and freight rate penalties.`
              }
            ],
            objectives: [`Understand the operational definition of ${title}.`, `Analyze the trade importance of ${title}.`],
            writtenExplanation: `Detailed explanation block for ${title} in international logistics. Managing ${title} requires standard documentation, custom declarations, and cargo tracking protocols.`,
            importantNotes: [`Always check local compliance guides for ${title}.`],
            keyPoints: [`Accurate execution of ${title} reduces demurrage risk.`, `Consolidate variables with forwarders beforehand.`]
          }
        });
      }
    });
  });

  return generated;
})();
