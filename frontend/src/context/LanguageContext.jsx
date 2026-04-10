import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  es: {
    // Header
    tagline: 'Energía y Tecnología para tu Hogar y Negocio',
    location: 'Connecticut',
    sameDayService: 'Same Day Service',
    
    // Hero
    heroTitle: 'Soluciones profesionales de',
    heroTitleHighlight: 'electricidad y tecnología',
    heroDescription: 'En Tech Masters Solutions ayudamos a hogares y negocios en Connecticut con reparaciones eléctricas, diseño web y soporte técnico. Servicio rápido, imagen profesional y atención confiable.',
    callNow: 'Llamar Ahora',
    sendText: 'Enviar Texto',
    email: 'Email',
    heroNote: 'Rápido • Confiable • Profesional',
    
    // Hero Card
    heroCardTitle: 'Expertos en Electricidad y Tecnología',
    heroCardDesc: 'Más de 5 años brindando soluciones eléctricas profesionales y servicios tecnológicos a hogares y negocios en Connecticut.',
    
    // Services
    servicesTitle: 'Nuestros Servicios',
    servicesDesc: 'Soluciones completas en electricidad, diseño web y soporte técnico para satisfacer todas tus necesidades.',
    service1Title: 'Reparaciones Eléctricas',
    service1Desc: 'Diagnóstico, reparación y soluciones eléctricas rápidas y seguras para hogar y negocio.',
    service2Title: 'Diseño Web',
    service2Desc: 'Páginas modernas para negocios que buscan verse profesionales y conseguir más clientes.',
    service3Title: 'Soporte Técnico',
    service3Desc: 'Ayuda con computadoras, configuración, optimización, reparación y soporte digital.',
    
    // Benefits
    benefit1Title: 'Servicio de Emergencia 24/7',
    benefit1Desc: 'Atendemos emergencias eléctricas a cualquier hora. Llámanos y estaremos en tu hogar o negocio el mismo día.',
    benefit2Title: 'Residencial y Comercial',
    benefit2Desc: 'Servimos tanto a propiedades residenciales como comerciales en todo Connecticut con la misma calidad profesional.',
    benefit3Title: 'Técnicos Certificados',
    benefit3Desc: 'Nuestros electricistas están completamente licenciados, asegurados y capacitados en las últimas tecnologías.',
    benefit4Title: 'Satisfacción Garantizada',
    benefit4Desc: 'Trabajo de calidad respaldado por garantía. Tu satisfacción es nuestra prioridad número uno.',
    
    // Payments
    paymentsLabel: 'PAGOS SEGUROS',
    paymentsTitle: 'Elige tu Método de Pago Preferido',
    paymentsDesc: 'Paga de forma rápida y segura usando Zelle, Venmo o Cash App. Escanea el código QR o toca el botón de pago debajo de cada método.',
    zelleSubtitle: 'Transferencia bancaria',
    zelleInfo: 'Escanea el QR con tu app bancaria para completar el pago.',
    payWithZelle: 'Pagar con Zelle',
    venmoSubtitle: 'Pago móvil rápido',
    payWithVenmo: 'Pagar con Venmo',
    cashAppSubtitle: 'Transferencia móvil instantánea',
    payWithCashApp: 'Pagar con Cash App',
    paymentSupport: 'Soporte de pago:',
    paymentSupportDesc: 'Si un botón no se abre en tu teléfono, simplemente escanea el código QR directamente o contáctanos para asistencia.',
    
    // Reviews
    reviewsTitle: 'Testimonios de Clientes',
    reviewsDesc: 'Lee lo que nuestros clientes satisfechos tienen que decir sobre nuestro trabajo.',
    review1: 'Muy profesional y rápido. Excelente servicio y buena comunicación.',
    review1Author: 'Cliente Local',
    review2: 'Me resolvió el problema eléctrico el mismo día. Lo recomiendo.',
    review2Author: 'Cliente en Connecticut',
    review3: 'Buena atención, imagen profesional y servicio confiable de principio a fin.',
    review3Author: 'Cliente Comercial',
    
    // CTA
    ctaTitle: '¿Necesitas servicio hoy?',
    ctaDesc: 'Llama, envía un mensaje de texto o escríbenos por WhatsApp para recibir atención rápida en Connecticut.',
    requestService: 'Solicitar Servicio',
    textMessage: 'Mensaje de Texto',
    
    // Footer
    footerTagline: 'Energía y Tecnología',
    footerSubtitle: 'para tu Hogar y Negocio',
    followUs: 'Síguenos en redes sociales'
  },
  
  en: {
    // Header
    tagline: 'Energy and Technology for Your Home and Business',
    location: 'Connecticut',
    sameDayService: 'Same Day Service',
    
    // Hero
    heroTitle: 'Professional solutions for',
    heroTitleHighlight: 'electricity and technology',
    heroDescription: 'At Tech Masters Solutions we help homes and businesses in Connecticut with electrical repairs, web design and technical support. Fast service, professional image and reliable attention.',
    callNow: 'Call Now',
    sendText: 'Send Text',
    email: 'Email',
    heroNote: 'Fast • Reliable • Professional',
    
    // Hero Card
    heroCardTitle: 'Experts in Electricity and Technology',
    heroCardDesc: 'Over 5 years providing professional electrical solutions and technology services to homes and businesses in Connecticut.',
    
    // Services
    servicesTitle: 'Our Services',
    servicesDesc: 'Complete solutions in electricity, web design and technical support to meet all your needs.',
    service1Title: 'Electrical Repairs',
    service1Desc: 'Diagnosis, repair and fast, safe electrical solutions for home and business.',
    service2Title: 'Web Design',
    service2Desc: 'Modern websites for businesses looking to look professional and get more customers.',
    service3Title: 'Technical Support',
    service3Desc: 'Help with computers, configuration, optimization, repair and digital support.',
    
    // Benefits
    benefit1Title: '24/7 Emergency Service',
    benefit1Desc: 'We handle electrical emergencies at any time. Call us and we will be at your home or business the same day.',
    benefit2Title: 'Residential and Commercial',
    benefit2Desc: 'We serve both residential and commercial properties throughout Connecticut with the same professional quality.',
    benefit3Title: 'Certified Technicians',
    benefit3Desc: 'Our electricians are fully licensed, insured and trained in the latest technologies.',
    benefit4Title: 'Satisfaction Guaranteed',
    benefit4Desc: 'Quality work backed by warranty. Your satisfaction is our number one priority.',
    
    // Payments
    paymentsLabel: 'SECURE PAYMENTS',
    paymentsTitle: 'Choose Your Preferred Payment Method',
    paymentsDesc: 'Pay quickly and securely using Zelle, Venmo or Cash App. Scan the QR code or tap the payment button below each method.',
    zelleSubtitle: 'Bank transfer payment',
    zelleInfo: 'Scan the QR with your banking app to complete the payment.',
    payWithZelle: 'Pay with Zelle',
    venmoSubtitle: 'Fast mobile payment',
    payWithVenmo: 'Pay with Venmo',
    cashAppSubtitle: 'Instant mobile transfer',
    payWithCashApp: 'Pay with Cash App',
    paymentSupport: 'Payment support:',
    paymentSupportDesc: 'If a button does not open on your phone, simply scan the QR code directly or contact us for assistance.',
    
    // Reviews
    reviewsTitle: 'Customer Testimonials',
    reviewsDesc: 'Read what our satisfied customers have to say about our work.',
    review1: 'Very professional and fast. Excellent service and good communication.',
    review1Author: 'Local Customer',
    review2: 'Solved my electrical problem the same day. I recommend it.',
    review2Author: 'Connecticut Customer',
    review3: 'Good attention, professional image and reliable service from start to finish.',
    review3Author: 'Commercial Customer',
    
    // CTA
    ctaTitle: 'Need service today?',
    ctaDesc: 'Call, send a text message or write to us on WhatsApp for fast service in Connecticut.',
    requestService: 'Request Service',
    textMessage: 'Text Message',
    
    // Footer
    footerTagline: 'Energy and Technology',
    footerSubtitle: 'for Your Home and Business',
    followUs: 'Follow us on social media'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'es' ? 'en' : 'es';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
