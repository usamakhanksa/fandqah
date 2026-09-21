/* Fandaqah — expanded content for the Features and About pages.

   EVERY string in this file is taken from, or is a faithful translation of,
   content published on fandaqah.com. Nothing here is invented:

     • capability groups, deep features, the reports list and the FAQs
       → fandaqah.com/store/features
     • intro, vision, mission, values, partnership
       → fandaqah.com/store/about_us
     • testimonials
       → fandaqah.com/store/features. The Arabic is reproduced verbatim from
         the published carousel; the English is a translation of that Arabic.
         Names and roles are exactly as published. The source site attaches no
         company or property name to any of them, so none is added here.

   The Arabic is the source of record. Quotations are left exactly as
   published, including their punctuation. */

/* ==========================================================================
   The three lead modules. These carry the real product screenshots.
   ========================================================================== */

export const MODULES = [
  {
    id: "pms",
    img: "pms-min-1.png",
    eyebrow: { ar: "قلب التشغيل", en: "The operating core" },
    t: { ar: "نظام إدارة الممتلكات PMS", en: "Property Management System" },
    lede: {
      ar: "لوحة تحكم واحدة يرى فيها موظف الاستقبال حالة كل وحدة، ونسبة الإشغال، ووافدي اليوم ومغادريه، مع إمكانية إضافة حجز سريع من الشاشة نفسها.",
      en: "One board where the front desk sees every unit’s status, the day’s occupancy, and who arrives and departs today, with quick booking entry on the same screen."
    },
    points: {
      ar: [
        "إدارة كاملة للحجوزات الفردية والجماعية",
        "مراجعة العقد وملخص الحجز والقسائم من شاشة واحدة",
        "مراسلة الضيف مباشرة عبر الرسائل القصيرة أو البريد",
        "تسجيل الطلبات الخاصة وملاحظات النزيل"
      ],
      en: [
        "Full management of individual and group bookings",
        "Contract, booking summary and vouchers from a single screen",
        "Message the guest directly by SMS or email",
        "Special requests and guest notes recorded against the stay"
      ]
    }
  },
  {
    id: "channel",
    img: "Channel-Manager-min-1.png",
    eyebrow: { ar: "التوزيع", en: "Distribution" },
    t: { ar: "مدير القنوات", en: "Channel Manager" },
    lede: {
      ar: "مزامنة فورية للأسعار والتوافر عبر منصات الحجز المحلية والعالمية، فلا يُنشأ الحجز المزدوج أصلًا بدل معالجته بعد وقوعه.",
      en: "Instant rate and availability sync across local and global booking platforms, so the double booking is never created rather than cleaned up afterwards."
    },
    points: {
      ar: [
        "مزامنة فورية للأسعار والتوافر عبر جميع منصات الحجز",
        "إدارة حجوزات ذكية متوافقة مع توافر العقارات، تقلل الأخطاء",
        "تحديث الأسعار والعروض الترويجية عبر جميع القنوات بنقرة واحدة",
        "تعزيز ظهورك على مواقع الحجز وتحسين صور ووصف العقار"
      ],
      en: [
        "Instant rate and availability sync across every booking platform",
        "Smart booking management matched to real availability, which reduces errors",
        "Update rates and promotions across all channels with one click",
        "Stronger visibility on booking sites, with better property photos and descriptions"
      ]
    }
  },
  {
    id: "booking",
    img: "Website-Booking-Engine-min-1.png",
    eyebrow: { ar: "الحجز المباشر", en: "Direct booking" },
    t: { ar: "الموقع ومحرك الحجز", en: "Website & Booking Engine" },
    lede: {
      ar: "موقع خاص بمنشأتك ومحرك حجز مباشر، مع بوابات دفع متعددة تشمل Apple Pay وGoogle Pay وSamsung Pay.",
      en: "Your own property website and a direct booking engine, with multiple payment gateways including Apple Pay, Google Pay and Samsung Pay."
    },
    points: {
      ar: [
        "إنشاء وتخصيص موقع ويب لعقاراتك",
        "توزيع ونشر الأسعار عبر منصات الحجز العالمية والمحلية",
        "خيارات دفع متعددة عبر بوابات الدفع",
        "توقيع اتفاقيات الإيجار إلكترونيًا وتخزين آمن للمستندات"
      ],
      en: [
        "Build and customise a website for your properties",
        "Distribute and publish rates across global and local booking platforms",
        "Multiple payment options through payment gateways",
        "Lease agreements signed electronically, with secure document storage"
      ]
    }
  }
];

/* ==========================================================================
   Capability groups. Bullets are the published list, regrouped only for
   reading order; no capability was added, removed or embellished.
   ========================================================================== */

export const CAPABILITY_GROUPS = [
  {
    icon: "bolt",
    t: { ar: "نظام الأتمتة الذكي", en: "Smart automation" },
    items: {
      ar: [
        "جدولة تلقائية لمهام التنظيف والصيانة والتفتيش",
        "أقفال ذكية آلية مع رموز دخول مؤقتة آمنة تُرسل مباشرة إلى الضيوف",
        "تحصيل وتوزيع ومعالجة المدفوعات تلقائيًا، دون تدخل يدوي",
        "رسائل ترحيب ووداع تلقائية عبر البريد الإلكتروني والرسائل"
      ],
      en: [
        "Automatic scheduling of cleaning, maintenance and inspection tasks",
        "Smart locks with secure temporary access codes sent straight to guests",
        "Payments collected, distributed and processed automatically, with no manual step",
        "Automatic welcome and farewell messages by email and SMS"
      ]
    }
  },
  {
    icon: "layers",
    t: { ar: "إدارة العقارات", en: "Property management" },
    items: {
      ar: [
        "مساعد مدعوم بالذكاء الاصطناعي يعمل على مدار الساعة لإدارة الحجوزات والرد على استفسارات الضيوف",
        "تسجيل دخول وخروج عبر الهاتف المحمول",
        "تحسين ديناميكي للأسعار في الوقت الفعلي بناءً على الطلب ومقارنة المنافسين",
        "توقيع اتفاقيات الإيجار تلقائيًا وتخزين إلكتروني آمن للمستندات"
      ],
      en: [
        "An AI assistant working around the clock on bookings and guest enquiries",
        "Mobile check-in and check-out",
        "Dynamic real-time rate optimisation based on demand and competitor benchmarking",
        "Lease agreements signed automatically, with secure electronic document storage"
      ]
    }
  },
  {
    icon: "calendar",
    t: { ar: "العمليات والتنفيذ", en: "Operations and execution" },
    items: {
      ar: [
        "تعيين وتحسين مهام تنظيف الغرف لرفع إنتاجية الموظفين",
        "تتبع حضور الموظفين إلكترونيًا عبر الهاتف المحمول",
        "جدولة تلقائية للمدفوعات لمزودي الخدمات والموردين",
        "تطبيق جوال للضيوف يتيح طلبات واستفسارات الخدمة داخل الغرفة",
        "توزيع ونشر الأسعار عبر منصات الحجز العالمية والمحلية"
      ],
      en: [
        "Housekeeping tasks assigned and optimised to raise staff productivity",
        "Electronic staff attendance tracking from a phone",
        "Automatic payment scheduling for service providers and suppliers",
        "A guest mobile app for in-room service requests and enquiries",
        "Rate distribution and publishing across global and local booking platforms"
      ]
    }
  },
  {
    icon: "chat",
    t: { ar: "التواصل والدعم", en: "Communication and support" },
    items: {
      ar: [
        "مركز تواصل موحد للضيوف يجمع البريد الإلكتروني وواتساب والرسائل القصيرة في مكان واحد",
        "روبوت محادثة يتعامل مع الأسئلة الشائعة ويقدّم الدعم بلغات متعددة على مدار الساعة",
        "مراقبة وإدارة ذكية للمراجعات وردود فعل الضيوف عبر الإنترنت",
        "منصة مراسلة آمنة وخاصة تربط أصحاب العقارات بأعضاء الفريق",
        "دليل ترحيب رقمي يحتوي التعليمات والمعلومات الأساسية"
      ],
      en: [
        "A unified guest inbox bringing email, WhatsApp and SMS into one place",
        "A chatbot handling common questions and offering support in several languages, around the clock",
        "Smart monitoring and management of online reviews and guest feedback",
        "A secure private messaging platform linking owners and team members",
        "A digital welcome guide carrying instructions and essential information"
      ]
    }
  },
  {
    icon: "chart",
    t: { ar: "التقارير والتحليلات", en: "Reports and analytics" },
    items: {
      ar: [
        "لوحة تحكم توفر مؤشرات أداء رئيسية في الوقت الفعلي حول الإشغال والإيرادات وتقييمات الضيوف",
        "رؤية فورية للتكاليف والأرباح لكل عقار، مربوطة بمحفظتك المالية",
        "قوائم مالية شهرية فورية لأصحاب العقارات، مدعومة بالوثائق",
        "إدارة الإيرادات والطلب مدعومة بتحليلات تنبؤية"
      ],
      en: [
        "A dashboard of real-time KPIs for occupancy, revenue and guest ratings",
        "Immediate visibility of cost and profit per property, tied to your financial wallet",
        "Instant monthly statements for owners, fully backed by documentation",
        "Revenue and demand management supported by predictive analytics"
      ]
    }
  },
  {
    icon: "plug",
    t: { ar: "التكاملات", en: "Integrations" },
    items: {
      ar: [
        "التكامل المباشر مع شموس ووزارة السياحة وهيئة الزكاة والضريبة والجمارك",
        "العمل بسلاسة مع أنظمة نقاط البيع وبوابات الدفع وبرامج المحاسبة",
        "تكامل برمجيات المحاسبة مثل QuickBooks وXero وZoho",
        "مركز تحكم موحد للإضاءة ودرجة الحرارة والأمان",
        "تكامل المساعد الصوتي لمساعدة الضيوف وتوجيههم"
      ],
      en: [
        "Direct integration with Shomoos, the Ministry of Tourism and ZATCA",
        "Works smoothly with point-of-sale systems, payment gateways and accounting software",
        "Accounting integrations including QuickBooks, Xero and Zoho",
        "A unified control centre for lighting, temperature and security",
        "Voice assistant integration to help and direct guests"
      ]
    }
  }
];

/* ==========================================================================
   Deep features. These carry the longest published descriptions, so they get
   room to be read rather than being compressed into a card.
   ========================================================================== */

export const DEEP_FEATURES = [
  {
    id: "scanner",
    figure: "< 2",
    figureLabel: { ar: "ثانية لكل وثيقة", en: "seconds per document" },
    t: { ar: "ماسح فوري لجميع الجوازات والهويات السعودية", en: "Instant scanner for passports and Saudi IDs" },
    d: {
      ar: "تقنية متقدمة تقرأ الجوازات والهويات والإقامات السعودية خلال أقل من ثانيتين، مع تعبئة تلقائية ودقيقة لبيانات النزلاء داخل النظام دون أي إدخال يدوي أو حفظ للصور، مما يضمن أعلى مستويات الخصوصية. تُسرّع إجراءات تسجيل الوصول، وتقلل الأخطاء، وترفع كفاءة فريق الاستقبال، مع توافق كامل مع أنظمة شموس والسياحة.",
      en: "Advanced scanning that reads passports, Saudi national IDs and residence permits in under two seconds, filling guest data into the system accurately with no manual entry and no image retention, which keeps privacy at its highest. It speeds up check-in, reduces errors and raises front-desk efficiency, with full compatibility with the Shomoos and Ministry of Tourism systems."
    }
  },
  {
    id: "reader",
    figure: "0",
    figureLabel: { ar: "إدخال يدوي", en: "manual entries" },
    t: { ar: "الدخول السريع عبر قارئ الوثائق", en: "Fast check-in through the document reader" },
    d: {
      ar: "يختصر قارئ الوثائق وقت الوصول بإدخال بيانات النزلاء بدقة، فيلغي الانتظار ويرفع إنتاجية الموظفين بتقليل الأعمال اليدوية، مع التزام كامل بالمعايير الرقمية لحفظ البيانات وتنظيمها. يتكامل النظام تلقائيًا مع الأنظمة الحكومية المعتمدة مثل شموس وزاتكا والسياحة، فتُرسل البيانات مباشرة وتُحدَّث في جميع الجهات المطلوبة.",
      en: "The document reader shortens arrival time by entering guest data accurately, removing the queue and raising staff productivity by cutting manual work, while fully meeting the digital standards for storing and organising data. It integrates automatically with the approved government systems, Shomoos, ZATCA and the Ministry of Tourism, so the data is filed directly and updated everywhere it is required."
    }
  },
  {
    id: "esign",
    figure: "100%",
    figureLabel: { ar: "بلا أوراق", en: "paperless" },
    t: { ar: "التوقيع الإلكتروني عبر أجهزة التابلت", en: "Electronic signature on a tablet" },
    d: {
      ar: "حل حديث يسهّل إجراءات تسجيل الوصول والمغادرة بسرعة وكفاءة. يتيح للضيوف التوقيع إلكترونيًا دون الحاجة للأوراق، مما يقلل الوقت والجهد ويدعم التحول الرقمي، ويساعد على تحسين دقة البيانات وتقليل الأخطاء، مع حفظ التوقيعات بشكل آمن وسهل الرجوع إليه.",
      en: "A modern way to make check-in and check-out quick and efficient. Guests sign electronically with no paper, which cuts time and effort and supports the move to digital, improves data accuracy and reduces errors, with signatures stored securely and easy to retrieve."
    }
  },
  {
    id: "reviews",
    figure: "92%",
    figureLabel: { ar: "رضا العملاء", en: "customer satisfaction" },
    t: { ar: "تقييمات النزلاء", en: "Guest reviews" },
    d: {
      ar: "يقيّم الضيوف تجربتهم مباشرة عبر نموذج يُرسل إليهم بالبريد الإلكتروني أو الرسائل القصيرة بعد المغادرة، فتصلك ملاحظاتهم مباشرة لتحسين تجربة الضيوف وتطوير أداء عملك.",
      en: "Guests rate their stay through a form sent by email or SMS after departure, so their feedback reaches you directly and can be used to improve the guest experience and the performance of the business."
    }
  }
];

/* The published reports list, verbatim. A hotel finance team recognises these
   by name, which is why they are listed rather than summarised. */
export const REPORTS = {
  ar: ["المقبوضات", "المصروفات", "التقرير الشهري", "العملاء", "الوحدات",
       "نسبة الإشغال والإتاحة", "تنظيف الغرف والصيانة", "حركة الصندوق",
       "الإيرادات والضرائب", "مصادر الحجز", "الإفصاح الشهري لمنصة بلدي"],
  en: ["Receipts", "Expenses", "Monthly report", "Customers", "Units",
       "Occupancy and availability", "Housekeeping and maintenance", "Cash movement",
       "Revenue and tax", "Booking sources", "Monthly Balady disclosure"]
};

/* ==========================================================================
   Testimonials, reproduced from fandaqah.com/store/features.
   Arabic verbatim. English is a translation of that Arabic.
   ========================================================================== */

export const TESTIMONIALS = [
  {
    q: {
      ar: "منذ أن اعتمدنا فندقة، أصبح لدينا تحكم كامل في الحجوزات، حتى من خلال الهاتف المحمول، سهولة غير مسبوقة",
      en: "Since we adopted Fandaqah we have had full control of bookings, even from a mobile phone. Unprecedented ease."
    },
    name: { ar: "محمد الحماد", en: "Mohammed Al-Hammad" },
    role: { ar: "مدير الفندق", en: "Hotel manager" }
  },
  {
    q: {
      ar: "النظام فعلاً وفر علينا وقتًا كبيرًا، كنا نقضي ساعات في إدخال البيانات يدويًا، الآن كل شيء يتم تلقائيًا.",
      en: "The system really has saved us a great deal of time. We used to spend hours entering data by hand; now everything happens automatically."
    },
    name: { ar: "أحمد علام", en: "Ahmed Allam" },
    role: { ar: "مدير التشغيل", en: "Operations manager" }
  },
  {
    q: {
      ar: "ساعدتنا التقارير اليومية من النظام في اتخاذ قرارات تسعير ذكية بناءً على الطلب الفعلي",
      en: "The system’s daily reports helped us make smart pricing decisions based on actual demand."
    },
    name: { ar: "محمد البيطار", en: "Mohammed Al-Baitar" },
    role: { ar: "مدير الفندق", en: "Hotel manager" }
  },
  {
    q: {
      ar: "كنا نواجه مشاكل في التسكين اليدوي ، لكن مع فندقة اصبح كل شي واضح و بسيط ، حتى الموظفين الجدد فهموه بسرعة",
      en: "We used to have problems with manual room allocation, but with Fandaqah everything became clear and simple. Even new staff picked it up quickly."
    },
    name: { ar: "باسل العدوان", en: "Basel Al-Adwan" },
    role: { ar: "مدير الفندق", en: "Hotel manager" }
  },
  {
    q: {
      ar: "ميزة التوقيع الإلكتروني وفرت علينا وقتًا وجهدًا كبيرًا، خصوصًا في التعامل مع الشركات والعملاء عن بُعد.",
      en: "The electronic signature feature saved us a lot of time and effort, especially when dealing with companies and remote clients."
    },
    name: { ar: "سعيد الشهراني", en: "Saeed Al-Shahrani" },
    role: { ar: "مدير مكتب الاستقبال", en: "Front office manager" }
  },
  {
    q: {
      ar: "كلما واجهنا تحديًا تقنيًا، نجد أحد أفراد فريق فندقة يتابع معنا شخصيًا حتى يتم الحل، دون تحويل أو تأخير",
      en: "Whenever we hit a technical problem, someone from the Fandaqah team follows it up with us personally until it is solved, with no hand-offs and no delay."
    },
    name: { ar: "محمد سعيد", en: "Mohammed Saeed" },
    role: { ar: "مدير الفندق", en: "Hotel manager" }
  },
  {
    q: {
      ar: "فندقة ليس مجرد نظام تشغيل، بل فريق متكامل يقف معنا في كل خطوة، وهذا ما يميزهم عن غيرهم",
      en: "Fandaqah is not just an operating system; it is a whole team standing with us at every step, and that is what sets them apart."
    },
    name: { ar: "أحمد شداد", en: "Ahmed Shaddad" },
    role: { ar: "مدير الفندق", en: "Hotel manager" }
  },
  {
    q: {
      ar: "خدمة العملاء لديهم محترفة، يتحدثون بلغة العميل، ويفهمون احتياجاتنا بدقة دون تعقيد",
      en: "Their customer service is professional. They speak the customer’s language and understand exactly what we need, without complication."
    },
    name: { ar: "عبدالله العتيبي", en: "Abdullah Al-Otaibi" },
    role: { ar: "موظف الاستقبال", en: "Receptionist" }
  },
  {
    q: {
      ar: "ما أعجبني أكثر هو أن النظام يرسل رسالة ترحيب للضيوف قبل الوصول - يجعلهم يشعرون بالاهتمام والتقدير",
      en: "What I liked most is that the system sends guests a welcome message before they arrive. It makes them feel looked after and valued."
    },
    name: { ar: "مرشد حسين", en: "Murshid Hussein" },
    role: { ar: "مدير الفندق", en: "Hotel manager" }
  },
  {
    q: {
      ar: "بدأ الضيوف بالإشادة بعملية الوداع لدينا - الرسالة التي يتلقونها بعد المغادرة تترك انطباعًا رائعًا",
      en: "Guests have started praising our farewell process. The message they receive after checking out leaves a wonderful impression."
    },
    name: { ar: "محمد أحمد", en: "Mohammed Ahmed" },
    role: { ar: "موظف خدمة عملاء", en: "Customer service agent" }
  }
];

/* ==========================================================================
   About. Vision and mission are translations of the published Arabic; the
   Arabic is lightly repunctuated for readability without changing meaning.
   ========================================================================== */

export const ABOUT = {
  intro: {
    ar: "في عالم الضيافة سريع التطور، تميّزت شركة فندقة لتقنية المعلومات كشركة سعودية متخصصة في تقديم حلول رقمية ذكية لإدارة منشآت الضيافة. نحن لا نقدّم فقط نظام إدارة ممتلكات (PMS)، بل نقدّم تجربة تشغيلية متكاملة مبنية على فهم عميق للتحديات الحقيقية التي تواجهها منشآت الضيافة يوميًا.",
    en: "In a fast-moving hospitality industry, Fandaqah Information Technology Company has established itself as a Saudi company specialising in smart digital solutions for running hospitality properties. We do not simply supply a property management system; we supply a complete operational experience built on a deep understanding of the real challenges these properties face every day."
  },
  vision: {
    label: { ar: "الرؤية", en: "Vision" },
    text: {
      ar: "إعادة تعريف إدارة الضيافة من خلال تقنية مرنة ومتكاملة مدعومة بالتجربة، تحسّن الكفاءة التشغيلية وترفع من رضا الضيوف.",
      en: "To redefine hospitality management through flexible, integrated technology grounded in experience, improving operational efficiency and raising guest satisfaction."
    }
  },
  mission: {
    label: { ar: "الرسالة", en: "Mission" },
    text: {
      ar: "نُمكّن مشغّلي الضيافة من التركيز على ضيوفهم بينما نتعامل نحن مع تعقيدات العمليات اليومية. نظامنا مصمم ليكون ذكيًا ومتوافقًا مع الاحتياجات الواقعية، لأننا نعيش نفس التحديات التشغيلية من خلال شراكتنا الاستراتيجية مع ضيافة، وهي شركة متخصصة في تشغيل منشآت الضيافة.",
      en: "We let hospitality operators focus on their guests while we absorb the complexity of daily operations. Our system is designed to be intelligent and matched to real needs, because we live the same operational challenges through our strategic partnership with Diyafa, a company that specialises in operating hospitality properties."
    }
  },
  partnership: {
    t: { ar: "لماذا يهم ذلك", en: "Why that matters" },
    d: {
      ar: "معظم أنظمة إدارة الفنادق تُبنى في معزل عن التشغيل، ثم تُباع للمشغّلين. فندقة تعمل في الاتجاه المعاكس: الشراكة مع ضيافة تعني أن الفريق الذي يكتب النظام يرى نتائج قراراته في منشأة تعمل فعلًا، كل يوم. الميزة التي لا تصمد أمام ليلة تشغيل واقعية لا تصل إلى النسخة التالية.",
      en: "Most hotel systems are built away from operations and then sold to operators. Fandaqah works the other way round: the partnership with Diyafa means the team writing the system sees the result of its decisions inside a property that is actually running, every day. A feature that does not survive a real operating night does not reach the next release."
    }
  },
  values: [
    {
      t: { ar: "الخبرة التشغيلية", en: "Operational experience" },
      d: {
        ar: "مبادراتنا مبنية على الخبرة التشغيلية الحقيقية في مجال الضيافة، وليس على الافتراضات.",
        en: "What we build rests on real operational experience in hospitality, not on assumptions."
      }
    },
    {
      t: { ar: "المرونة التقنية", en: "Technical flexibility" },
      d: {
        ar: "نفهم أن كل منشأة فريدة من نوعها، ونظامنا مرن لتلبية احتياجاتك الخاصة.",
        en: "We understand that every property is different, and the system flexes to your particular needs."
      }
    },
    {
      t: { ar: "الشفافية والثقة", en: "Transparency and trust" },
      d: {
        ar: "نؤمن بالتواصل الواضح واتخاذ القرارات القائمة على البيانات.",
        en: "We believe in clear communication and decisions made on data."
      }
    },
    {
      t: { ar: "الابتكار المستمر", en: "Continuous innovation" },
      d: {
        ar: "نطوّر منصتنا باستمرار لتلبية المطالب المتغيرة للسوق.",
        en: "We keep developing the platform to meet a market that keeps changing."
      }
    },
    {
      t: { ar: "شراكة حقيقية", en: "A real partnership" },
      d: {
        ar: "نرى أنفسنا جزءًا من نجاحك، وليس مجرد مزوّد برمجيات.",
        en: "We see ourselves as part of your success, not merely a software vendor."
      }
    }
  ],
  closing: {
    ar: "فندقة ليست مجرد حل تقني؛ نحن شريك استراتيجي يفهم احتياجاتك. دعنا نوضّح لك كيف يمكن للتقنية أن تحوّل التعقيد إلى وضوح والروتين إلى فرصة.",
    en: "Fandaqah is not merely a technical solution; we are a strategic partner that understands what you need. Let us show you how technology turns complexity into clarity and routine into opportunity."
  }
};

/* Extra FAQs published on fandaqah.com/store/features */
export const FAQ_EXTRA = [
  {
    page: "features",
    q: { ar: "هل أحتاج إلى فريق تقني لتشغيل فندقة؟", en: "Do I need a technical team to run Fandaqah?" },
    a: {
      ar: "لا. فندقة سهلة الاستخدام ولا تحتاج إلى أي خبرة تقنية، ونقدّم موارد تدريبية تساعدك على الإعداد وتحسين استخدامك للنظام.",
      en: "No. Fandaqah is straightforward to use and needs no technical background, and we provide training resources to help you set up and get more out of the system."
    }
  },
  {
    page: "features",
    q: { ar: "ماذا يحدث أثناء العرض التوضيحي؟", en: "What happens during the demo?" },
    a: {
      ar: "نأخذك في جولة عبر المنصة بالكامل، ونعرض المميزات الرئيسية مثل إدارة الحجوزات والتقارير والنظام الآلي الذكي، فتحصل على معاينة عملية لكيفية تبسيط فندقة للعمليات.",
      en: "We take you through the whole platform and show the main capabilities, including booking management, reports and the smart automation, so you get a practical preview of how Fandaqah simplifies operations."
    }
  },
  {
    page: "about",
    q: { ar: "كيف أبدأ مع فندقة؟", en: "How do I get started with Fandaqah?" },
    a: {
      ar: "البدء سهل. احجز موعد عرض توضيحي مع الفريق لترى كيف يمكن لفندقة تحسين إدارة منشأتك وتجربة ضيوفك. الفريق متاح من الأحد إلى الخميس، من ٩:٠٠ صباحًا حتى ٥:٠٠ مساءً.",
      en: "Getting started is easy. Book a demo with the team to see how Fandaqah can improve the way your property runs and what your guests experience. The team is available Sunday to Thursday, 9:00 AM to 5:00 PM."
    }
  },
  {
    page: "about",
    q: { ar: "ما علاقة فندقة بضيافة؟", en: "What is the relationship between Fandaqah and Diyafa?" },
    a: {
      ar: "ضيافة شركة متخصصة في تشغيل منشآت الضيافة، وشراكتنا الاستراتيجية معها هي مصدر الخبرة التشغيلية التي يُبنى عليها النظام. هذا ما يجعل فندقة مبنية على واقع التشغيل اليومي لا على افتراضات.",
      en: "Diyafa is a company that specialises in operating hospitality properties, and our strategic partnership with it is where the operational experience behind the system comes from. That is what grounds Fandaqah in the reality of daily operations rather than in assumptions."
    }
  }
];
