/* ============================================================
   Fandaqah, site content, bilingual.
   Every figure here is taken from the live fandaqah.com.
   Nothing is invented; unknowns are explicit [PLACEHOLDERS].
   ============================================================ */

export const SITE = {
  origin: "https://fandaqah.com",
  brand: { ar: "فندقة", en: "Fandaqah" },
  legal: {
    ar: "شركة فندقة لتقنية المعلومات",
    en: "Fandaqah Information Technology Company"
  },
  // Verified from fandaqah.com/store/contact_us
  phoneUnified: "920066456",
  phone: "+966555947522",
  whatsapp: "966555947522",
  email: "[CONFIRM: info@fandaqah.com]",
  address: {
    street: { ar: "شارع الأمير تركي، قرية الدغيثر", en: "Prince Turki Street, Aldugheither Village" },
    city:   { ar: "الخبر", en: "Al Khobar" },
    region: { ar: "المنطقة الشرقية", en: "Eastern Province" },
    postal: "34611",
    country: "SA"
  },
  hours: { ar: "الأحد – الخميس، ٩:٠٠ ص – ٥:٠٠ م", en: "Sunday – Thursday, 9:00 AM – 5:00 PM" },
  social: [
    ["linkedin",  "https://www.linkedin.com/company/fandaqah/"],
    ["x",         "https://twitter.com/fandaqah"],
    ["instagram", "https://www.instagram.com/fandaqah.pms"],
    ["facebook",  "https://www.facebook.com/pmsfandaqah/"]
  ],
  app: {
    trial: "https://app.fandaqah.com/register",
    login: "https://app.fandaqah.com/home/login"
  },
  blogRoot: "https://fandaqah.com/blogs",
  founded: "2019"
};

/* Verified metrics, straight from the live site */
export const STATS = [
  { v: "800", suffix: "+",  k: { ar: "فندق ومنشأة شريكة", en: "Partner hotels & properties" } },
  { v: "250,000", suffix: "+", k: { ar: "حجز تمت معالجته", en: "Bookings processed" } },
  { v: "15", suffix: "",    k: { ar: "تكامل مع أنظمة خارجية", en: "System integrations" } },
  { v: "92", suffix: "%",   k: { ar: "رضا العملاء", en: "Customer satisfaction" } }
];

export const NAV = [
  { key: "features", ar: "المميزات",  en: "Features" },
  { key: "pricing",  ar: "الباقات",   en: "Pricing"  },
  { key: "about",    ar: "من نحن",    en: "About"    },
  { key: "blog",     ar: "المدونة",   en: "Blog"     },
  { key: "contact",  ar: "اتصل بنا",  en: "Contact"  }
];

export const UI = {
  trial:    { ar: "ابدأ تجربة مجانية", en: "Start free trial" },
  demo:     { ar: "اطلب عرضًا",        en: "Request a demo" },
  quote:    { ar: "اطلب عرض سعر",      en: "Request a quote" },
  login:    { ar: "تسجيل الدخول",      en: "Log in" },
  menu:     { ar: "القائمة",           en: "Menu" },
  skip:     { ar: "تخطَّ إلى المحتوى",  en: "Skip to content" },
  home:     { ar: "الرئيسية",          en: "Home" },
  whatsapp: { ar: "راسلنا على واتساب", en: "Message us on WhatsApp" },
  readMore: { ar: "اقرأ المزيد",       en: "Read more" },
  allPosts: { ar: "تصفّح كل المقالات", en: "Browse all articles" },
  rights:   { ar: "جميع الحقوق محفوظة.", en: "All rights reserved." },
  langSwitch: { ar: "English", en: "العربية" },
  faqTitle: { ar: "الأسئلة الشائعة", en: "Frequently Asked Questions" },
  product:  { ar: "المنتج",   en: "Product" },
  company:  { ar: "الشركة",   en: "Company" },
  legalNav: { ar: "قانوني",   en: "Legal" },
  contactNav:{ ar: "تواصل",   en: "Get in touch" },
  privacy:  { ar: "سياسة الخصوصية", en: "Privacy Policy" },
  terms:    { ar: "الشروط والأحكام", en: "Terms & Conditions" }
};

/* ---- the three headline products, with the real site's imagery ---- */
export const PRODUCTS = [
  {
    img: "pms-min-1.png",
    t: { ar: "نظام إدارة الممتلكات PMS", en: "Property Management System (PMS)" },
    d: {
      ar: "قلب التشغيل: لوحة تحكم للاستقبال، وإدارة الحجوزات، والتدبير الفندقي، والفوترة، والتقارير، في مكان واحد.",
      en: "The operating core: a front-desk dashboard, reservations, housekeeping, billing and reporting in one place."
    }
  },
  {
    img: "Channel-Manager-min-1.png",
    t: { ar: "مدير القنوات", en: "Channel Manager" },
    d: {
      ar: "مزامنة فورية للأسعار والإتاحة عبر منصات الحجز المحلية والعالمية، وتحديث التسعير بنقرة واحدة.",
      en: "Real-time rate and availability sync across local and global booking platforms, with one-click pricing updates."
    }
  },
  {
    img: "Website-Booking-Engine-min-1.png",
    t: { ar: "الموقع الإلكتروني ومحرك الحجز", en: "Website & Booking Engine" },
    d: {
      ar: "موقع خاص بمنشأتك ومحرك حجز مباشر بعمولة صفر، مع بوابات دفع متعددة.",
      en: "Your own property website and a zero-commission direct booking engine, with multiple payment gateways."
    }
  }
];

/* ---- Saudi compliance integrations: the real differentiator ---- */
export const COMPLIANCE = [
  {
    img: "4f66e78a-bac1-47cf-acb2-2ef299b5ec0c.png",
    t: { ar: "هيئة الزكاة والضريبة والجمارك (زاتكا)", en: "Zakat, Tax and Customs Authority (ZATCA)" },
    d: { ar: "فوترة إلكترونية متوافقة مع المرحلة الثانية، وضريبة قيمة مضافة ١٥٪ محتسبة تلقائيًا.",
         en: "Phase 2 compliant e-invoicing, with 15% VAT calculated automatically." }
  },
  {
    img: "fba646cc-0ce3-40ea-849a-7aa97eb8af05-1.png",
    t: { ar: "وزارة السياحة (المنصة الوطنية للرصد السياحي)", en: "Ministry of Tourism (National Tourism Monitoring Platform)" },
    d: { ar: "رفع بيانات الإشغال والنزلاء آليًا إلى المنصة الوطنية دون إدخال يدوي.",
         en: "Occupancy and guest data filed to the national platform automatically, with no manual entry." }
  },
  {
    img: "1b09ac3f-3146-4476-9587-02bd48431e9d-1.png",
    t: { ar: "منصة شموس", en: "Shomoos Platform" },
    d: { ar: "تسجيل النزلاء والتحقق من الهوية عبر شموس، متوافق مع متطلبات الخصوصية.",
         en: "Guest registration and identity verification through Shomoos, compliant with privacy requirements." }
  }
];

/* ---- feature groups, from the live features page ---- */
export const FEATURES = [
  {
    icon: "grid",
    t: { ar: "لوحة التحكم", en: "Dashboard" },
    d: { ar: "مصممة لكفاءة موظفي الاستقبال: حالات الوحدات، وإدخال حجز سريع، ونِسب الإشغال، وتفاصيل الوصول والمغادرة، وتنبيهات المغادرة.",
         en: "Built for front-office speed: unit statuses, quick booking entry, occupancy rates, arrival and departure detail, and checkout notifications." }
  },
  {
    icon: "calendar",
    t: { ar: "إدارة الحجوزات", en: "Booking Management" },
    d: { ar: "إنشاء حجز مبسّط مع ملاحظات النزيل، ومراجعة العقود، وملخصات الحجز، والقسائم، ورسائل SMS والبريد، وتسجيل الطلبات الخاصة للأفراد والشركات.",
         en: "Simplified booking creation with guest notes, contract review, booking summaries, vouchers, SMS and email messaging, and special requests for individual and corporate bookings." }
  },
  {
    icon: "chart",
    t: { ar: "التقارير", en: "Reports" },
    d: { ar: "تحليلات شاملة: الذمم، والمصروفات، والنزلاء، والوحدات، والإشغال، والتنظيف، والصيانة، والتدفق النقدي، والإيرادات، والضرائب، ومصادر الحجز، وتقارير الإفصاح لمنصة بلدي.",
         en: "Receivables, expenses, guests, units, occupancy, housekeeping, maintenance, cash flow, revenue, taxes, booking sources, and Balady platform disclosure reports." }
  },
  {
    icon: "scan",
    t: { ar: "الماسح الفوري للجوازات والهويات", en: "Instant Passport & Saudi ID Scanner" },
    d: { ar: "تقنية مسح متقدمة تعالج الوثيقة في أقل من ثانيتين وتدخل البيانات تلقائيًا بدقة، بما يضمن الالتزام بخصوصية أنظمة شموس.",
         en: "Advanced scanning that processes a document in under two seconds and enters the data automatically and accurately, keeping you compliant with Shomoos privacy rules." }
  },
  {
    icon: "pen",
    t: { ar: "التوقيع الإلكتروني عبر أجهزة Sign Stay", en: "E-signature via Sign Stay tablets" },
    d: { ar: "يُبسّط تسجيل الوصول والمغادرة بسرعة وكفاءة، بتوقيع رقمي وتشغيل بلا ورق وتخزين آمن.",
         en: "Simplifies check-in and check-out quickly and efficiently, with digital signatures, paperless operation and secure storage." }
  },
  {
    icon: "bolt",
    t: { ar: "نظام الأتمتة الذكي", en: "Smart Automation" },
    d: { ar: "جدولة آلية للتنظيف والصيانة والتفتيش، وأقفال ذكية برموز دخول لمرة واحدة، وتحصيل مدفوعات تلقائي، ورسائل ترحيب ومغادرة آلية.",
         en: "Automated cleaning, maintenance and inspection scheduling, smart locks with one-time guest codes, automatic payment collection, and automated welcome and departure messages." }
  },
  {
    icon: "shield",
    t: { ar: "الأمن والحماية", en: "Security & Protection" },
    d: { ar: "خوادم آمنة، وتخزين مشفّر لملفات النزلاء، وتحقق آلي من الهوية.",
         en: "Secure servers, encrypted guest profile storage, and automated identity verification." }
  },
  {
    icon: "star",
    t: { ar: "تقييمات النزلاء", en: "Guest Reviews" },
    d: { ar: "نماذج تقييم تُرسل بعد المغادرة عبر البريد أو الرسائل النصية، لجمع ملاحظات مباشرة وتحسين الخدمة.",
         en: "Post-checkout evaluation forms sent by email or SMS, collecting direct feedback to improve service." }
  },
  {
    icon: "chat",
    t: { ar: "مركز التواصل والدعم", en: "Communication & Support Hub" },
    d: { ar: "مركز موحّد للبريد وواتساب والرسائل النصية، ومساعد ذكي للأسئلة الشائعة، ودعم متعدد اللغات على مدار الساعة، ومراقبة التقييمات.",
         en: "A single hub for email, WhatsApp and SMS, an AI assistant for FAQs, 24/7 multilingual support, and online review monitoring." }
  },
  {
    icon: "coin",
    t: { ar: "التسعير الديناميكي بالذكاء الاصطناعي", en: "AI Dynamic Pricing" },
    d: { ar: "تحسين الأسعار تلقائيًا حسب الطلب، مع تحليلات تنبؤية لإدارة الإيرادات.",
         en: "Automatic price optimisation based on demand, with predictive analytics for revenue management." }
  },
  {
    icon: "home",
    t: { ar: "التكاملات الذكية", en: "Smart Integrations" },
    d: { ar: "دعم المساعدات الصوتية، والتحكم بالإضاءة والحرارة والأمن، والربط ببرامج المحاسبة، والتحقق الآلي من الهوية.",
         en: "Voice assistant support, lighting, temperature and security controls, accounting software connectivity, and automated identity verification." }
  },
  {
    icon: "mobile",
    t: { ar: "تطبيق النزيل والتشغيل من الجوال", en: "Guest App & Mobile Operations" },
    d: { ar: "تسجيل وصول ومغادرة من الجوال، وطلبات خدمة من تطبيق النزيل، وتتبّع حضور الموظفين، ودليل ترحيب رقمي.",
         en: "Mobile check-in and check-out, service requests from the guest app, employee attendance tracking, and a digital welcome guide." }
  }
];

export const ADVANTAGES = [
  { svg: "advantages1.svg", t: { ar: "نظام آلي", en: "Automated by default" },
    d: { ar: "المهام المتكررة تُنجز نفسها: التنظيف، والفوترة، والرسائل، والامتثال.", en: "Repetitive work runs itself: housekeeping, invoicing, messaging and compliance." } },
  { svg: "advantages2.svg", t: { ar: "دعم فني ٢٤/٧", en: "24/7 technical support" },
    d: { ar: "فريق سعودي يعرف تشغيل الضيافة، متاح بالعربية والإنجليزية.", en: "A Saudi team that knows hospitality operations, available in Arabic and English." } },
  { svg: "advantages3.svg", t: { ar: "نظام سحابي آمن", en: "Secure cloud system" },
    d: { ar: "خوادم آمنة وبيانات مشفّرة، بكفاءة تشغيلية ٩٩.٩٪.", en: "Secure servers and encrypted data, at 99.9% operational efficiency." } },
  { svg: "advantages5.svg", t: { ar: "خاصية الربط المتعدد", en: "Multi-integration" },
    d: { ar: "١٥ تكاملًا جاهزًا مع الجهات الحكومية وقنوات الحجز وبوابات الدفع.", en: "15 ready integrations with government platforms, booking channels and payment gateways." } }
];

export const SEGMENTS = [
  { img: "why_image_1.svg",
    photo: "hotel-reception-lobby",
    photoAlt: { ar: "بهو فندق حديث مع موظف عند مكتب الاستقبال", en: "A modern hotel lobby with a member of staff at the reception desk" },
    t: { ar: "الفنادق والمنتجعات", en: "Hotels & Resorts" },
    d: { ar: "وصول كثيف ومجموعات وفعاليات، مع تدقيق ليلي بنقرة واحدة وصلاحيات متعددة الورديات.", en: "High-volume arrivals, groups and events, with one-click night audit and multi-shift roles." } },
  { img: "why_image_2.svg",
    photo: "serviced-apartment-corridor",
    photoAlt: { ar: "ممر وحدات سكنية مخدومة بأبواب متتالية", en: "A corridor of serviced apartment units" },
    t: { ar: "الشقق المخدومة", en: "Serviced Apartments" },
    d: { ar: "فوترة شهرية، وعقود إيجار موقّعة إلكترونيًا، وتسجيل وصول ذاتي لكل وحدة.", en: "Monthly billing, e-signed lease agreements and self check-in for every unit." } },
  { img: "why_image_3.svg",
    photo: "chalet-pool-terrace",
    photoAlt: { ar: "شاليه بمسبح ونخيل في ضوء النهار", en: "A chalet pool terrace framed by palms" },
    t: { ar: "الشاليهات والوحدات السياحية", en: "Chalets & Tourist Units" },
    d: { ar: "مواسم الذروة، وتجهيز عن بُعد، وأقفال ذكية، وربط بقنوات الحجز.", en: "Seasonal peaks, remote turnovers, smart locks and channel connectivity." } }
];

/* ============================================================
   FAQs, the AEO layer. Each question is one a real operator
   types into Google or asks an AI assistant, answered in the
   first sentence.
   ============================================================ */

export const FAQ = {
  home: [
    { q: { ar: "ما هو نظام فندقة؟", en: "What is Fandaqah?" },
      a: { ar: "فندقة هو نظام سحابي سعودي لإدارة الفنادق والشقق المخدومة والمنتجعات، يجمع إدارة الممتلكات (PMS) ومدير القنوات ومحرك الحجز المباشر في منصة واحدة، مع تكامل مباشر مع زاتكا ووزارة السياحة ومنصة شموس. تعتمد عليه أكثر من ٨٠٠ منشأة في المملكة.",
           en: "Fandaqah is a Saudi cloud system for managing hotels, serviced apartments and resorts. It combines a property management system (PMS), a channel manager and a direct booking engine in one platform, with native integration to ZATCA, the Ministry of Tourism and the Shomoos platform. More than 800 properties in the Kingdom run on it." } },
    { q: { ar: "هل نظام فندقة متوافق مع زاتكا والفوترة الإلكترونية؟", en: "Is Fandaqah compliant with ZATCA e-invoicing?" },
      a: { ar: "نعم. فندقة متوافق مع المرحلة الثانية من الفوترة الإلكترونية لهيئة الزكاة والضريبة والجمارك، وتُحتسب ضريبة القيمة المضافة ١٥٪ تلقائيًا على كل فاتورة، وتُرفع الفواتير إلى المنصة دون خطوات يدوية.",
           en: "Yes. Fandaqah is compliant with ZATCA Phase 2 e-invoicing. VAT at 15% is calculated automatically on every invoice, and invoices are filed to the authority's platform with no manual steps." } },
    { q: { ar: "هل يتكامل فندقة مع منصة شموس ووزارة السياحة؟", en: "Does Fandaqah integrate with Shomoos and the Ministry of Tourism?" },
      a: { ar: "نعم. يسجّل النظام بيانات النزلاء في منصة شموس ويرفع بيانات الإشغال إلى المنصة الوطنية للرصد السياحي التابعة لوزارة السياحة تلقائيًا، إضافة إلى تقارير الإفصاح لمنصة بلدي.",
           en: "Yes. The system registers guest data with the Shomoos platform and files occupancy data to the Ministry of Tourism's National Tourism Monitoring Platform automatically, plus disclosure reports for the Balady platform." } },
    { q: { ar: "كم يستغرق تشغيل النظام؟", en: "How long does it take to go live?" },
      a: { ar: "يبدأ التشغيل برسوم تركيب لمرة واحدة قدرها ٣٠٠ ريال سعودي، ويشمل الإعداد وربط القنوات وتدريب الفريق. تتوفر نسخة تجريبية مجانية قبل الاشتراك.",
           en: "Onboarding starts with a one-time setup fee of SAR 300 and covers configuration, channel connection and team training. A free trial is available before you subscribe." } },
    { q: { ar: "هل النظام متاح بالعربية والإنجليزية؟", en: "Is the system available in Arabic and English?" },
      a: { ar: "نعم، الواجهة والتقارير والدعم الفني متاحة بالعربية والإنجليزية بالكامل، مع دعم متعدد اللغات لمراسلة النزلاء على مدار الساعة.",
           en: "Yes. The interface, reports and technical support are fully available in Arabic and English, with 24/7 multilingual guest messaging." } }
  ],
  features: [
    { q: { ar: "ما الفرق بين PMS ومدير القنوات؟", en: "What is the difference between a PMS and a channel manager?" },
      a: { ar: "نظام إدارة الممتلكات (PMS) يدير التشغيل الداخلي: الحجوزات، والاستقبال، والتدبير الفندقي، والفوترة. أما مدير القنوات فيزامن الأسعار والإتاحة مع منصات الحجز الخارجية. يوفّر فندقة الاثنين في منصة واحدة، فلا تحدث حجوزات مزدوجة بين النظامين.",
           en: "A property management system (PMS) runs internal operations: reservations, front desk, housekeeping and billing. A channel manager syncs rates and availability with external booking platforms. Fandaqah provides both in one platform, so double bookings between the two systems cannot occur." } },
    { q: { ar: "كم يستغرق مسح الهوية أو الجواز؟", en: "How fast is the ID and passport scanner?" },
      a: { ar: "أقل من ثانيتين لكل وثيقة، مع إدخال البيانات تلقائيًا في ملف النزيل ورفعها إلى شموس دون كتابة يدوية.",
           en: "Under two seconds per document, with the data entered into the guest profile automatically and filed to Shomoos with no manual typing." } },
    { q: { ar: "هل يدعم النظام الأقفال الذكية؟", en: "Does the system support smart locks?" },
      a: { ar: "نعم، يدعم النظام الأقفال الذكية برموز دخول تُنشأ لمرة واحدة لكل حجز، إضافة إلى التحكم بالإضاءة والحرارة والأمن.",
           en: "Yes. The system supports smart locks with one-time access codes generated per booking, plus lighting, temperature and security controls." } },
    { q: { ar: "ما التقارير التي يوفّرها النظام؟", en: "What reports does the system provide?" },
      a: { ar: "تقارير الذمم والمصروفات والنزلاء والوحدات والإشغال والتنظيف والصيانة والتدفق النقدي والإيرادات والضرائب ومصادر الحجز، إضافة إلى تقارير الإفصاح لمنصة بلدي ومؤشرات الأداء اللحظية.",
           en: "Receivables, expenses, guests, units, occupancy, housekeeping, maintenance, cash flow, revenue, taxes and booking sources, plus Balady disclosure reports and a real-time KPI dashboard." } }
  ],
  pricing: [
    { q: { ar: "كم تكلفة نظام فندقة؟", en: "How much does Fandaqah cost?" },
      a: { ar: "هناك أربع باقات سنوية: ستارتر مجانًا (مستخدم واحد، حتى ١٠ وحدات)، وكور بـ ١٢٠٠ ريال، وكونكت بـ ١٩٨٠ ريال، وبرو بـ ٣٠٠٠ ريال. الأسعار غير شاملة الضريبة، وتُضاف رسوم تثبيت ٣٠٠ ريال مرة واحدة وضريبة قيمة مضافة ١٥٪.",
           en: "There are four annual packages: Starter is free (1 user, up to 10 units), Core is SAR 1,200, Connect is SAR 1,980 and Pro is SAR 3,000. Prices exclude VAT, and a one-time SAR 300 setup fee plus 15% VAT are added." } },
    { q: { ar: "هل توجد نسخة تجريبية مجانية؟", en: "Is there a free trial?" },
      a: { ar: "نعم، يمكنك التسجيل للحصول على نسخة تجريبية مجانية قبل الاشتراك، دون الحاجة إلى بطاقة ائتمانية.",
           en: "Yes. You can register for a free trial before subscribing, with no credit card required." } },
    { q: { ar: "هل رسوم التركيب متكررة؟", en: "Is the setup fee recurring?" },
      a: { ar: "لا، رسوم التركيب البالغة ٣٠٠ ريال سعودي تُدفع لمرة واحدة عند بدء التشغيل فقط.",
           en: "No. The SAR 300 setup fee is charged once, at onboarding only." } },
    { q: { ar: "هل هناك رسوم على عدد المستخدمين؟", en: "Are there per-user fees?" },
      a: { ar: "باقة ستارتر تسمح بمستخدم واحد فقط. أما كور وكونكت وبرو فعدد المستخدمين فيها مرن، وتُحدَّد الباقة بعدد الوحدات والتكاملات الحكومية التي تحتاجها، لا بعدد المستخدمين.",
           en: "Starter allows one user. Core, Connect and Pro have flexible user counts: the package is decided by unit count and the government integrations you need, not by users." } }
  ],
  about: [
    { q: { ar: "من هي شركة فندقة؟", en: "Who is Fandaqah?" },
      a: { ar: "فندقة لتقنية المعلومات شركة سعودية متخصصة في الحلول الرقمية الذكية لإدارة منشآت الضيافة، ومقرها الخبر في المنطقة الشرقية. تخدم أكثر من ٨٠٠ منشأة وعالجت أكثر من ٢٥٠٬٠٠٠ حجز.",
           en: "Fandaqah Information Technology is a Saudi company specialising in smart digital solutions for hospitality property management, based in Al Khobar in the Eastern Province. It serves more than 800 properties and has processed over 250,000 bookings." } },
    { q: { ar: "أين يقع مقر فندقة؟", en: "Where is Fandaqah based?" },
      a: { ar: "المقر في شارع الأمير تركي، قرية الدغيثر، الخبر ٣٤٦١١، المملكة العربية السعودية.",
           en: "The head office is at Prince Turki Street, Aldugheither Village, Al Khobar 34611, Saudi Arabia." } },
    { q: { ar: "ما علاقة فندقة بضيافة؟", en: "What is Fandaqah's relationship with Diyafa?" },
      a: { ar: "صُمم النظام بشراكة استراتيجية مع ضيافة، المتخصصة في تشغيل منشآت الضيافة، ما جعله مبنيًا على خبرة تشغيلية حقيقية لا على افتراضات برمجية.",
           en: "The system was designed in strategic partnership with Diyafa, a hospitality property operations specialist, so it is built on real operational experience rather than software assumptions." } }
  ],
  contact: [
    { q: { ar: "كيف أتواصل مع الدعم الفني؟", en: "How do I reach technical support?" },
      a: { ar: "الدعم الفني متاح على مدار الساعة للعملاء المشتركين. للاستفسارات العامة، تواصل على الرقم الموحد 920066456 أو عبر واتساب على +966555947522 من الأحد إلى الخميس، ٩:٠٠ ص – ٥:٠٠ م.",
           en: "Technical support is available 24/7 for subscribers. For general enquiries call the unified number 920066456 or message +966555947522 on WhatsApp, Sunday to Thursday, 9:00 AM – 5:00 PM." } },
    { q: { ar: "هل يمكنني حجز عرض توضيحي؟", en: "Can I book a demo?" },
      a: { ar: "نعم، املأ نموذج التواصل في هذه الصفحة أو سجّل للحصول على نسخة تجريبية مجانية، وسيتواصل معك الفريق لترتيب عرض على بيانات منشأتك.",
           en: "Yes. Fill in the contact form on this page or register for a free trial, and the team will arrange a walkthrough using your property's own data." } }
  ]
};

/* ============================================================
   Per-page metadata and copy
   ============================================================ */

export const PAGES = {
  home: {
    slug: "",
    file: "index.html",
    nav: null,
    title: {
      ar: "فندقة | نظام إدارة الفنادق والشقق المخدومة السحابي في السعودية",
      en: "Fandaqah | Cloud Hotel Management System (PMS) in Saudi Arabia"
    },
    desc: {
      ar: "نظام سحابي سعودي لإدارة الفنادق والشقق المخدومة والمنتجعات. متكامل مع زاتكا وشموس ووزارة السياحة، ويجمع PMS ومدير القنوات ومحرك الحجز. ٨٠٠+ منشأة.",
      en: "Saudi cloud PMS for hotels, serviced apartments and resorts. Native ZATCA, Shomoos and Ministry of Tourism integration. Trusted by 800+ properties."
    },
    keywords: {
      ar: "نظام إدارة فنادق, برنامج فنادق سعودي, PMS سعودي, نظام شقق مخدومة, ربط شموس, فوترة زاتكا, مدير قنوات",
      en: "hotel management system saudi arabia, cloud PMS, ZATCA e-invoicing hotel, Shomoos integration, channel manager, serviced apartment software"
    },
    h1: {
      ar: "تمكين الفنادق من إدارة عملياتها عبر نظام فندقة الذكي",
      en: "Run your property on one intelligent Saudi hospitality platform"
    },
    lede: {
      ar: "منصة واحدة تجمع إدارة الممتلكات ومدير القنوات ومحرك الحجز المباشر، متكاملة أصلًا مع زاتكا وشموس ووزارة السياحة، حتى يركّز فريقك على الضيف بدل الأنظمة.",
      en: "One platform for property management, channel distribution and direct booking, integrated natively with ZATCA, Shomoos and the Ministry of Tourism, so your team can focus on the guest instead of the paperwork."
    }
  },

  features: {
    slug: "features", file: "features.html", nav: "features",
    title: { ar: "مميزات نظام فندقة | PMS ومدير قنوات وتكامل حكومي",
             en: "Features | PMS, Channel Manager & Saudi Compliance | Fandaqah" },
    desc: { ar: "لوحة تحكم الاستقبال، وإدارة الحجوزات، والتقارير، وماسح الهويات الفوري، والتوقيع الإلكتروني، والأتمتة الذكية، والتكامل مع زاتكا وشموس.",
            en: "Front-desk dashboard, booking management, reporting, two-second ID scanning, e-signature, smart automation, and native ZATCA and Shomoos integration." },
    keywords: { ar: "مميزات نظام فنادق, ماسح هوية فندق, توقيع إلكتروني فندق, تقارير فندقية, أتمتة فنادق",
                en: "hotel PMS features, hotel ID scanner, hotel e-signature, hospitality reports, hotel automation saudi" },
    h1: { ar: "كل ما تحتاجه لإدارة منشأتك وتعزيز نموّها", en: "Everything you need to run the property, and grow it" },
    lede: { ar: "من تسجيل وصول النزيل في ثانيتين إلى تقرير الإيراد في نهاية الشهر، كل وظيفة تشغيلية في مكان واحد، ومتوافقة مع الأنظمة السعودية من اليوم الأول.",
            en: "From a two-second guest check-in to the month-end revenue report: every operational function in one place, compliant with Saudi regulation from day one." }
  },

  pricing: {
    slug: "pricing", file: "pricing.html", nav: "pricing",
    title: { ar: "الباقات والأسعار | نظام فندقة لإدارة الفنادق",
             en: "Pricing & Packages | Fandaqah Hotel Management System" },
    desc: { ar: "أربع باقات سنوية: ستارتر مجانًا، كور ١٢٠٠، كونكت ١٩٨٠، برو ٣٠٠٠ ريال. غير شاملة الضريبة، مع رسوم تثبيت ٣٠٠ ريال لمرة واحدة.",
            en: "Four annual packages: Starter free, Core SAR 1,200, Connect SAR 1,980, Pro SAR 3,000. Excluding VAT, with a one-time SAR 300 setup fee." },
    keywords: { ar: "أسعار نظام فنادق, تكلفة PMS, باقات نظام فندقة, اشتراك نظام فنادق سعودي",
                en: "hotel PMS pricing saudi arabia, hotel software cost, fandaqah packages, hotel system subscription" },
    h1: { ar: "أربع باقات. اختر بحسب ما ترفعه للجهات، لا بعدد الغرف", en: "Four packages. Choose on what you must file, not on room count" },
    lede: { ar: "كل الأسعار سنوية وغير شاملة الضريبة. الفرق الحقيقي بين الباقات هو التكامل الحكومي وإدارة عدة منشآت، لا عدد المزايا.",
            en: "All prices are annual and exclude VAT. The real difference between packages is government integration and multi-property control, not the feature count." }
  },

  about: {
    slug: "about", file: "about.html", nav: "about",
    title: { ar: "من نحن | شركة فندقة لتقنية المعلومات",
             en: "About Us | Fandaqah Information Technology Company" },
    desc: { ar: "فندقة لتقنية المعلومات شركة سعودية مقرها الخبر، متخصصة في الحلول الرقمية الذكية لإدارة منشآت الضيافة. ٨٠٠+ منشأة، ٢٥٠٬٠٠٠+ حجز، ٩٢٪ رضا عملاء.",
            en: "A Saudi company in Al Khobar building smart digital solutions for hospitality management. 800+ properties, 250,000+ bookings, 92% satisfaction." },
    keywords: { ar: "شركة فندقة, فندقة لتقنية المعلومات, شركة برمجيات فنادق سعودية, الخبر",
                en: "fandaqah company, saudi hotel software company, hospitality technology al khobar" },
    h1: { ar: "شركة سعودية بُنيت على خبرة تشغيلية حقيقية", en: "A Saudi company built on real operational experience" },
    lede: { ar: "لا نقدّم نظام إدارة ممتلكات فحسب، بل تجربة تشغيلية متكاملة مبنية على فهم عميق للتحديات اليومية التي تواجه منشآت الضيافة.",
            en: "We do not simply offer a property management system. We deliver a complete operational experience built on a deep understanding of the challenges hospitality businesses face every day." }
  },

  blog: {
    slug: "blog", file: "blog.html", nav: "blog",
    title: { ar: "المدونة | أدلة تشغيل الفنادق والامتثال في السعودية",
             en: "Blog | Saudi Hotel Operations & Compliance Guides | Fandaqah" },
    desc: { ar: "أدلة عملية لمشغّلي الفنادق في السعودية: الامتثال لزاتكا، وربط شموس، وإدارة الإيرادات، وزيادة الحجوزات المباشرة، واختيار نظام PMS.",
            en: "Practical guides for Saudi hotel operators: ZATCA compliance, Shomoos integration, revenue management, increasing direct bookings and choosing a PMS." },
    keywords: { ar: "مدونة فنادق, إدارة إيرادات فنادق, حجوزات مباشرة, زاتكا فنادق, نظام PMS",
                en: "hotel blog saudi arabia, hotel revenue management, direct bookings, ZATCA hotels, PMS guide" },
    h1: { ar: "أدلة لتشغيل الفنادق في السوق السعودي", en: "Guides for running hotels in the Saudi market" },
    lede: { ar: "مقالات يكتبها فريق يعمل يوميًا مع مشغّلي الفنادق والشقق المخدومة في المملكة، عن الامتثال، والإيراد، والتشغيل.",
            en: "Written by a team working daily with hotel and serviced-apartment operators in the Kingdom, on compliance, revenue and operations." }
  },

  contact: {
    slug: "contact", file: "contact.html", nav: "contact",
    title: { ar: "اتصل بنا | نظام فندقة | الخبر، السعودية",
             en: "Contact Us | Fandaqah, Al Khobar, Saudi Arabia" },
    desc: { ar: "تواصل مع فريق فندقة: الرقم الموحد 920066456، واتساب +966555947522، المقر في الخبر. الأحد إلى الخميس ٩:٠٠ ص – ٥:٠٠ م.",
            en: "Contact the Fandaqah team: unified number 920066456, WhatsApp +966555947522, offices in Al Khobar. Sunday to Thursday, 9:00 AM – 5:00 PM." },
    keywords: { ar: "اتصل بفندقة, دعم فني فندقة, نظام فنادق الخبر, حجز عرض توضيحي",
                en: "contact fandaqah, hotel software support saudi, book demo hotel pms" },
    h1: { ar: "تحدّث إلى فريق يعرف تشغيل الضيافة", en: "Talk to a team that knows hospitality operations" },
    lede: { ar: "اطلب عرضًا توضيحيًا على بيانات منشأتك، أو اسأل عن التكامل مع زاتكا وشموس، أو احصل على عرض سعر.",
            en: "Request a walkthrough on your own property data, ask about ZATCA and Shomoos integration, or get a quote." }
  },

  privacy: {
    slug: "privacy", file: "privacy.html", nav: null, noindexHint: false,
    title: { ar: "سياسة الخصوصية | فندقة", en: "Privacy Policy | Fandaqah" },
    desc: { ar: "سياسة الخصوصية الخاصة بنظام فندقة: البيانات التي نجمعها، وكيفية استخدامها وحمايتها، وحقوقك.",
            en: "Fandaqah's privacy policy: the data we collect, how it is used and protected, and your rights." },
    keywords: { ar: "سياسة الخصوصية فندقة", en: "fandaqah privacy policy" },
    h1: { ar: "سياسة الخصوصية", en: "Privacy Policy" },
    lede: { ar: "كيف نتعامل مع بياناتك وبيانات نزلائك.", en: "How we handle your data and your guests' data." }
  },

  terms: {
    slug: "terms", file: "terms.html", nav: null,
    title: { ar: "الشروط والأحكام | فندقة", en: "Terms & Conditions | Fandaqah" },
    desc: { ar: "الشروط والأحكام لاستخدام منصة فندقة: الاشتراك والرسوم، واستخدام الخدمة، وبيانات النزلاء، والتوفّر والدعم، والقانون الواجب التطبيق.",
            en: "The terms and conditions for using the Fandaqah hospitality management system." },
    keywords: { ar: "شروط وأحكام فندقة", en: "fandaqah terms and conditions" },
    h1: { ar: "الشروط والأحكام", en: "Terms & Conditions" },
    lede: { ar: "شروط استخدام المنصة والخدمات المرتبطة بها.", en: "The terms governing use of the platform and its related services." }
  }
};

/* Blog categories for the index page, drawn from the real post set */
export const BLOG_TOPICS = [
  { t: { ar: "الامتثال والأنظمة السعودية", en: "Saudi compliance & regulation" },
    d: { ar: "زاتكا، شموس، وزارة السياحة، وبلدي.", en: "ZATCA, Shomoos, Ministry of Tourism and Balady." },
    posts: [
      { ar: "الامتثال الكامل للمرحلة الثانية من زاتكا وتسجيل الوصول الآلي", en: "Achieving full ZATCA Phase 2 compliance & automated hotel check-in", url: "/blogs/achieving-full-zatca-phase-2-compliance-automated-hotel-check-in-saudi-arabia/25" },
      { ar: "١٢ ميزة أساسية في نظام PMS سعودي متوافق مع زاتكا", en: "12 essential features in a ZATCA-compliant Saudi PMS", url: "/blogs/12-ميزة-أساسية-في-نظام-pms-سعودي-متوافق-مع-زاتكا/164" },
      { ar: "الدليل الكامل لأفضل برامج إدارة الفنادق في السعودية", en: "Best hotel management software in Saudi Arabia: the complete guide", url: "/blogs/best-hotel-management-software-in-saudi-arabia-2026-the-complete-guide-to-pms-zatca-shomoos-channel-manager/66" }
    ] },
  { t: { ar: "الإيرادات والحجوزات المباشرة", en: "Revenue & direct bookings" },
    d: { ar: "التسعير، والعمولات، وزيادة الحجز المباشر.", en: "Pricing, commissions and growing direct bookings." },
    posts: [
      { ar: "٨ طرق لزيادة الحجوزات المباشرة بدون تخفيض الأسعار", en: "8 ways to increase direct bookings without cutting rates", url: "/blogs/8-طرق-لزيادة-الحجوزات-المباشرة-بدون-تخفيض-الأسعار/163" },
      { ar: "٢٠ نظام إدارة إيرادات (RMS) يجب مقارنتها قبل الشراء", en: "20 revenue management systems to compare before buying", url: "/blogs/20-نظام-إدارة-إيرادات-rms-يجب-مقارنتها-قبل-الشراء/166" },
      { ar: "٥٠ فكرة لتسويق الفنادق تزيد الحجوزات فعليًا", en: "50 hotel marketing ideas that actually increase bookings", url: "/blogs/50-فكرة-لتسويق-الفنادق-تزيد-الحجوزات-فعليًا/144" }
    ] },
  { t: { ar: "التشغيل وتجربة الضيف", en: "Operations & guest experience" },
    d: { ar: "الأخطاء الشائعة، والتقييمات، وكفاءة الفريق.", en: "Common mistakes, reviews and team efficiency." },
    posts: [
      { ar: "١٥ خطأ شائع في إدارة الفنادق يكلّف آلاف الريالات", en: "15 common hotel management mistakes costing thousands", url: "/blogs/15-خطأ-شائع-في-إدارة-الفنادق-يكلف-آلاف-الريالات/165" },
      { ar: "٧ نقاط احتكاك تقتل تقييم فندقك في غوغل بالرياض وجدة", en: "7 friction points killing your hotel's Google rating in Riyadh & Jeddah", url: "/blogs/7-friction-points-killing-your-hotel-s-google-rating-in-riyadh-jeddah/77" },
      { ar: "٧ علامات تدل أن نظام PMS الحالي يكلّفك أكثر مما تتخيل", en: "7 signs your current PMS is costing more than you think", url: "/blogs/7-علامات-تدل-أن-نظام-pms-الحالي-يكلفك-أكثر-مما-تتخيل/134" }
    ] },
  { t: { ar: "الذكاء الاصطناعي والتحول الرقمي", en: "AI & digital transformation" },
    d: { ar: "الأتمتة، والفنادق الذاتية، والمدفوعات.", en: "Automation, autonomous hotels and payments." },
    posts: [
      { ar: "الذكاء الاصطناعي في الفنادق السعودية: كيف تبدأ رحلة التحول", en: "AI in Saudi hotels: how to start your smart transformation", url: "/blogs/ai-in-saudi-hotels-how-to-start-your-smart-transformation-journey-to-boost-efficiency-revenue/72" },
      { ar: "الأتمتة مقابل الاستقلالية: الفنادق الذاتية في السعودية", en: "Automation vs autonomy: autonomous hotels in Saudi Arabia", url: "/blogs/automation-vs-autonomy-autonomous-hotels-saudi-arabia/113" },
      { ar: "أفضل بوابات الدفع للفنادق السعودية: دليل مدى و STC Pay", en: "Best payment gateways for Saudi hotels: the Mada & STC Pay guide", url: "/blogs/best-payment-gateways-for-saudi-hotels-the-ultimate-mada-stc-pay-integration/81" }
    ] }
];

/* ============================================================
   PLANS, scraped from the live checkout at fandaqah.com/store
   on 2026-09-20. Prices are per YEAR and exclude VAT, exactly
   as the store states. Nothing here is estimated.
   ============================================================ */

export const PLAN_META = {
  setupFee: 300,
  vat: 15,
  currency: "SAR",
  period: { ar: "سَنة", en: "year" },
  vatNote: { ar: "غير شامل الضريبة", en: "VAT not included" },
  gateway: { ar: "الدفع الآمن مدعوم من كليك باي", en: "Secure payment powered by ClickPay" },
  addonRange: { min: 350, max: 1800 }
};

export const PLANS = [
  {
    id: "starter",
    name: { ar: "ستارتر", en: "Starter" },
    price: 0,
    tag: { ar: "ابدأ بلا تكلفة", en: "Start at no cost" },
    for: { ar: "منشأة واحدة صغيرة تبدأ التشغيل الرقمي", en: "A single small property going digital for the first time" },
    limits: [
      { ar: "عدد المستخدمين: 1", en: "Users: 1" },
      { ar: "عدد الوحدات: حتى 10 وحدات", en: "Units: up to 10" }
    ],
    integrations: [],
    features: [
      { ar: "إدارة الاستقبال والحجوزات", en: "Front desk and reservations" },
      { ar: "تقارير أساسية", en: "Basic reports" },
      { ar: "تدريب مبدئي على النظام", en: "Introductory system training" },
      { ar: "دعم فني أساسي", en: "Basic technical support" },
      { ar: "إعداد عبر الإنترنت", en: "Online setup" },
      { ar: "واجهة سهلة الاستخدام لإدارة العمليات اليومية", en: "An easy interface for daily operations" }
    ],
    cta: { ar: "ابدأ مجانًا", en: "Start free" },
    featured: false
  },
  {
    id: "core",
    name: { ar: "كور", en: "Core" },
    price: 1200,
    tag: { ar: "التشغيل الكامل", en: "Full operations" },
    for: { ar: "فندق أو مجمع شقق يدير التشغيل والإيراد معًا", en: "A hotel or apartment block running operations and revenue together" },
    limits: [
      { ar: "عدد المستخدمين: مرن", en: "Users: flexible" },
      { ar: "عدد الوحدات: 100", en: "Units: 100" }
    ],
    integrations: [],
    features: [
      { ar: "إدارة الاستقبال والحجوزات", en: "Front desk and reservations" },
      { ar: "إدارة التدبير الفندقي", en: "Housekeeping management" },
      { ar: "إدارة المجموعات وبيانات الضيوف", en: "Group and guest data management" },
      { ar: "الفوترة والضرائب والمصروفات", en: "Invoicing, taxes and expenses" },
      { ar: "خطط تسعير مرنة", en: "Flexible rate plans" },
      { ar: "إدارة الإيرادات", en: "Revenue management" },
      { ar: "محرك حجز متجاوب", en: "Responsive booking engine" },
      { ar: "تقارير متقدمة وصلاحيات مرنة", en: "Advanced reports and flexible permissions" },
      { ar: "تدريب مباشر على النظام", en: "Live system training" },
      { ar: "دعم فني متقدم", en: "Advanced technical support" },
      { ar: "نظام دفع آمن", en: "Secure payment system" }
    ],
    cta: { ar: "اشترك في كور", en: "Choose Core" },
    featured: false
  },
  {
    id: "connect",
    name: { ar: "كونكت", en: "Connect" },
    price: 1980,
    tag: { ar: "الأكثر اختيارًا", en: "Most chosen" },
    for: { ar: "منشآت متعددة تحتاج الربط الحكومي وحجزًا مركزيًا", en: "Multi-property operators needing government filing and central reservations" },
    limits: [],
    integrations: [
      { ar: "شموس: سنة واحدة", en: "Shomoos: 1 year" },
      { ar: "السياحة: سنة واحدة", en: "Ministry of Tourism: 1 year" },
      { ar: "رسائل نصية: 500", en: "SMS messages: 500" }
    ],
    features: [
      { ar: "كل ما في باقة كور", en: "Everything in Core" },
      { ar: "التحكم في إدارة عدة منشآت", en: "Multi-property control" },
      { ar: "نظام حجز مركزي", en: "Central reservation system" },
      { ar: "تكامل نقاط البيع (POS)", en: "Point of sale (POS) integration" },
      { ar: "تقارير موحدة وصلاحيات مرنة", en: "Consolidated reports and flexible permissions" },
      { ar: "دعم وتدريب على مدار الساعة", en: "24/7 support and training" }
    ],
    cta: { ar: "اشترك في كونكت", en: "Choose Connect" },
    featured: true
  },
  {
    id: "pro",
    name: { ar: "برو", en: "Pro" },
    price: 3000,
    tag: { ar: "الامتثال الكامل", en: "Full compliance" },
    for: { ar: "مجموعات فندقية تحتاج زاتكا وموقعًا وربطًا كاملًا بالقنوات", en: "Hotel groups needing ZATCA, a website and full channel connectivity" },
    limits: [],
    integrations: [
      { ar: "شموس: سنة واحدة", en: "Shomoos: 1 year" },
      { ar: "السياحة: سنة واحدة", en: "Ministry of Tourism: 1 year" },
      { ar: "زاتكا (المرحلة الثانية): سنة واحدة", en: "ZATCA (Phase 2): 1 year" },
      { ar: "الموقع الإلكتروني", en: "Property website" },
      { ar: "رسائل نصية: 1000", en: "SMS messages: 1,000" }
    ],
    features: [
      { ar: "كل ما في باقة كونكت", en: "Everything in Connect" },
      { ar: "الربط مع مواقع الحجوزات", en: "Connectivity to booking sites" },
      { ar: "تكامل نقاط البيع (POS)", en: "Point of sale (POS) integration" },
      { ar: "نظام حجز مركزي", en: "Central reservation system" },
      { ar: "دعم وتدريب على مدار الساعة", en: "24/7 support and training" }
    ],
    cta: { ar: "اشترك في برو", en: "Choose Pro" },
    featured: false
  }
];

/* The comparison matrix. Every row is a capability the store lists. */
export const PLAN_MATRIX = [
  { k: { ar: "إدارة الاستقبال والحجوزات", en: "Front desk & reservations" },      v: [1,1,1,1] },
  { k: { ar: "واجهة العمليات اليومية",     en: "Daily operations interface" },     v: [1,1,1,1] },
  { k: { ar: "تقارير أساسية",              en: "Basic reports" },                  v: [1,1,1,1] },
  { k: { ar: "إدارة التدبير الفندقي",      en: "Housekeeping management" },        v: [0,1,1,1] },
  { k: { ar: "إدارة المجموعات والضيوف",    en: "Group & guest management" },       v: [0,1,1,1] },
  { k: { ar: "الفوترة والضرائب والمصروفات",en: "Invoicing, taxes & expenses" },    v: [0,1,1,1] },
  { k: { ar: "خطط تسعير مرنة",             en: "Flexible rate plans" },            v: [0,1,1,1] },
  { k: { ar: "إدارة الإيرادات",            en: "Revenue management" },             v: [0,1,1,1] },
  { k: { ar: "محرك حجز متجاوب",            en: "Responsive booking engine" },      v: [0,1,1,1] },
  { k: { ar: "تقارير متقدمة وصلاحيات",     en: "Advanced reports & permissions" }, v: [0,1,1,1] },
  { k: { ar: "دعم وتدريب على مدار الساعة", en: "24/7 support & training" },        v: [0,0,1,1] },
  { k: { ar: "إدارة عدة منشآت",            en: "Multi-property control" },         v: [0,0,1,1] },
  { k: { ar: "نظام حجز مركزي",             en: "Central reservation system" },     v: [0,0,1,1] },
  { k: { ar: "تكامل نقاط البيع (POS)",     en: "POS integration" },                v: [0,0,1,1] },
  { k: { ar: "تكامل شموس",                 en: "Shomoos integration" },            v: [0,0,1,1] },
  { k: { ar: "تكامل وزارة السياحة",        en: "Ministry of Tourism integration" },v: [0,0,1,1] },
  { k: { ar: "رسائل نصية",                 en: "SMS messages" },                   v: ["–","–","500","1,000"] },
  { k: { ar: "زاتكا (المرحلة الثانية)",    en: "ZATCA (Phase 2)" },                v: [0,0,0,1] },
  { k: { ar: "الموقع الإلكتروني",          en: "Property website" },               v: [0,0,0,1] },
  { k: { ar: "الربط مع مواقع الحجوزات",    en: "Booking-site connectivity" },      v: [0,0,0,1] }
];
