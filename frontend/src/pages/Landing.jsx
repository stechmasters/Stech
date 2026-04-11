import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Mail, Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { contactInfo, services, benefits, reviews, paymentMethods, images } from '../utils/mockData';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Landing = () => {
  const [socialMedia, setSocialMedia] = useState({ facebook: '', instagram: '', twitter: '', linkedin: '', youtube: '', tiktok: '' });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    fetchSocialMedia();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchSocialMedia = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/social-media`);
      setSocialMedia(response.data);
    } catch (error) {
      console.error('Error fetching social media:', error);
    }
  };

  const handleCall = () => {
    window.location.href = `tel:${contactInfo.phoneLink}`;
  };

  const handleSMS = () => {
    window.location.href = `sms:${contactInfo.phoneLink}`;
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${contactInfo.phoneLink}?text=${encodeURIComponent(contactInfo.whatsappMessage)}`, '_blank');
  };

  const handleEmail = () => {
    window.location.href = `mailto:${contactInfo.email}?subject=${encodeURIComponent('Solicitud de Servicio')}&body=${encodeURIComponent('Hola, necesito información sobre sus servicios.')}`;
  };

  const socialIcons = {
    facebook: { icon: Facebook, color: 'hover:bg-blue-600' },
    instagram: { icon: Instagram, color: 'hover:bg-pink-600' },
    twitter: { icon: Twitter, color: 'hover:bg-sky-500' },
    linkedin: { icon: Linkedin, color: 'hover:bg-blue-700' },
    youtube: { icon: Youtube, color: 'hover:bg-red-600' }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-700 to-slate-800"></div>
        <div 
          className="absolute left-0 top-0 h-96 w-96 animate-pulse rounded-full bg-blue-400/20 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        ></div>
        <div 
          className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-yellow-400/20 blur-3xl delay-1000"
          style={{ transform: `translateY(${-scrollY * 0.2}px)` }}
        ></div>
      </div>

      {/* Topbar */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/90 backdrop-blur-2xl">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 transition-transform hover:scale-105">
              <img 
                src={images.logo}
                alt="Logo Tech Masters Solutions" 
                className="h-16 w-16 rounded-2xl border border-white/10 object-cover shadow-2xl shadow-blue-400/30 transition-shadow hover:shadow-blue-400/50"
              />
              <div>
                <h1 className="bg-gradient-to-r from-white via-blue-100 to-yellow-200 bg-clip-text text-lg font-black leading-tight text-transparent">
                  Tech Masters Solutions
                </h1>
                <p className="text-sm font-bold text-cyan-300">Energía y Tecnología para tu Hogar y Negocio</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="group rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/20">
                📍 {contactInfo.location}
              </div>
              <div className="group rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/20">
                📞 {contactInfo.phoneFormatted}
              </div>
              <div className="group rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/20">
                ⚡ Same Day Service
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="animate-fade-in-up text-center lg:text-left">
              <h2 className="mb-6 text-5xl font-black leading-[1.1] tracking-tight text-white lg:text-7xl">
                Soluciones profesionales de{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                    electricidad y tecnología
                  </span>
                  <div className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-yellow-400/0 via-yellow-400/60 to-yellow-400/0"></div>
                </span>
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-slate-100 lg:text-xl">
                En Tech Masters Solutions ayudamos a hogares y negocios en Connecticut con reparaciones eléctricas, 
                diseño web y soporte técnico. Servicio rápido, imagen profesional y atención confiable.
              </p>
              <div className="mb-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Button 
                  onClick={handleCall}
                  className="group bg-gradient-to-br from-green-400 to-green-600 font-black shadow-2xl shadow-green-500/30 transition-all hover:scale-105 hover:shadow-green-500/50"
                >
                  <Phone className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                  Llamar Ahora
                </Button>
                <Button 
                  onClick={handleSMS}
                  className="group bg-gradient-to-br from-blue-500 to-blue-700 font-black shadow-2xl shadow-blue-500/30 transition-all hover:scale-105 hover:shadow-blue-500/50"
                >
                  <MessageSquare className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                  Enviar Texto
                </Button>
                <Button 
                  onClick={handleWhatsApp}
                  className="group bg-gradient-to-br from-yellow-200 to-yellow-400 font-black text-black shadow-2xl shadow-yellow-500/30 transition-all hover:scale-105 hover:shadow-yellow-500/50"
                >
                  🟢 WhatsApp
                </Button>
                <Button 
                  onClick={handleEmail}
                  className="group bg-gradient-to-br from-red-400 to-red-600 font-black shadow-2xl shadow-red-500/30 transition-all hover:scale-105 hover:shadow-red-500/50"
                >
                  <Mail className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                  Email
                </Button>
              </div>
              <div className="animate-pulse text-lg font-extrabold text-yellow-400">
                Rápido • Confiable • Profesional
              </div>
            </div>
            <Card className="group overflow-hidden border-white/10 bg-white/5 shadow-2xl backdrop-blur-lg transition-all hover:scale-[1.02] hover:border-white/20 hover:shadow-blue-500/20">
              <img 
                src={images.hero}
                alt="Branding Tech Masters Solutions" 
                className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
              />
              <CardHeader>
                <CardTitle className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Expertos en Electricidad y Tecnología
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Transformamos espacios con soluciones eléctricas y tecnológicas de calidad. Servicio rápido, confiable y profesional en todo Connecticut.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl transition-all hover:border-white/20 hover:shadow-blue-400/30">
            <img 
              src={images.banner}
              alt="Banner Tech Masters Solutions" 
              className="w-full transition-transform group-hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h3 className="mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-5xl font-black text-transparent">
              Nuestros Servicios
            </h3>
            <p className="mx-auto max-w-3xl text-lg text-slate-200">
              Ofrecemos soluciones completas en electricidad, diseño web y soporte técnico para hogares y negocios en todo Connecticut.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service, index) => (
              <Card 
                key={service.id} 
                className="group border-white/10 bg-white/5 shadow-2xl backdrop-blur-lg transition-all hover:-translate-y-2 hover:border-white/20 hover:shadow-blue-400/30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-yellow-400/20 to-blue-400/20 text-3xl shadow-lg transition-all group-hover:scale-110 group-hover:shadow-blue-400/50">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                  <CardDescription className="text-slate-200">{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <Card className="group border-white/10 bg-white/5 p-6 shadow-2xl transition-all hover:border-white/20 hover:shadow-blue-500/30">
              <img 
                src={images.robot}
                alt="Mascota Tech Masters Solutions" 
                className="mx-auto max-h-[520px] w-full rounded-2xl bg-gradient-to-b from-slate-200 to-slate-300 object-contain transition-transform group-hover:scale-105"
              />
            </Card>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <Card 
                  key={benefit.id} 
                  className="group border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-lg transition-all hover:translate-x-2 hover:border-white/20 hover:shadow-blue-500/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <strong className="mb-2 block text-lg">{benefit.icon} {benefit.title}</strong>
                  <p className="text-slate-300">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ultra Pro Payment Section */}
      <section className="ultra-pay-section" id="payments">
        <div className="ultra-pay-bg"></div>

        <div className="ultra-pay-container">
          <div className="ultra-pay-header">
            <span className="ultra-pay-label">PAGOS SEGUROS</span>
            <h2>Elige Tu Método de Pago Preferido</h2>
            <p>
              Paga rápido y seguro usando Zelle, Venmo o Cash App.
              Escanea el código QR o toca el botón de pago debajo de cada método.
            </p>
          </div>

          <div className="ultra-pay-grid">
            {/* ZELLE */}
            <article className="ultra-card ultra-zelle">
              <div className="ultra-top-line"></div>
              <div className="ultra-card-head">
                <div className="ultra-logo-box ultra-zelle-box">Z</div>
                <div>
                  <h3>Zelle</h3>
                  <span>Transferencia bancaria</span>
                </div>
              </div>

              <div className="ultra-qr-wrap">
                <img src="https://customer-assets.emergentagent.com/job_tech-ct/artifacts/791op84b_IMG_6766.png" alt="Zelle QR - Tech Masters Solutions" />
              </div>

              <div className="ultra-card-info">
                <h4>Tech Masters Solutions</h4>
                <p>Escanea el QR con tu app bancaria para completar el pago.</p>
              </div>

              <a href="#zelle-help" className="ultra-btn ultra-zelle-btn">Pagar con Zelle</a>
            </article>

            {/* VENMO */}
            <article className="ultra-card ultra-venmo">
              <div className="ultra-top-line"></div>
              <div className="ultra-card-head">
                <div className="ultra-logo-box ultra-venmo-box">V</div>
                <div>
                  <h3>Venmo</h3>
                  <span>Pago móvil rápido</span>
                </div>
              </div>

              <div className="ultra-qr-wrap">
                <img src="https://customer-assets.emergentagent.com/job_tech-ct/artifacts/10mz20h3_IMG_6767.jpeg" alt="Venmo QR - Tech Masters Solutions" />
              </div>

              <div className="ultra-card-info">
                <h4>Tech Masters Solutions</h4>
                <p>Escanea para pagar instantáneamente</p>
              </div>

              <a href="#venmo-help" className="ultra-btn ultra-venmo-btn">Pagar con Venmo</a>
            </article>

            {/* CASH APP */}
            <article className="ultra-card ultra-cash">
              <div className="ultra-top-line"></div>
              <div className="ultra-card-head">
                <div className="ultra-logo-box ultra-cash-box">$</div>
                <div>
                  <h3>Cash App</h3>
                  <span>Transferencia móvil instantánea</span>
                </div>
              </div>

              <div className="ultra-qr-wrap">
                <img src="https://customer-assets.emergentagent.com/job_tech-ct/artifacts/99apnirx_IMG_6768.jpeg" alt="Cash App QR - Tech Masters Solutions" />
              </div>

              <div className="ultra-card-info">
                <h4>Tech Masters Solutions</h4>
                <p>Escanea para pagar al instante</p>
              </div>

              <a href="#cashapp-help" className="ultra-btn ultra-cash-btn">Pagar con Cash App</a>
            </article>
          </div>

          <div className="ultra-pay-footer" id="zelle-help">
            <p>
              <strong>Soporte de pago:</strong> Si un botón no se abre en tu teléfono,
              simplemente escanea el código QR directamente o contáctanos para asistencia.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h3 className="mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-5xl font-black text-transparent">
              Lo que dicen nuestros clientes
            </h3>
            <p className="text-lg text-slate-300">
              La satisfacción de nuestros clientes es nuestro mejor respaldo. Lee lo que opinan sobre nuestro servicio.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((review, index) => (
              <Card 
                key={review.id} 
                className="group border-white/10 bg-white/5 shadow-2xl backdrop-blur-lg transition-all hover:-translate-y-2 hover:border-white/20 hover:shadow-yellow-500/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="mb-3 text-2xl tracking-widest text-yellow-400">★★★★★</div>
                  <CardDescription className="text-base text-slate-300">{review.text}</CardDescription>
                  <div className="mt-4 font-extrabold text-cyan-400">{review.author}</div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="border-white/10 bg-gradient-to-br from-blue-500/10 to-yellow-400/10 p-12 text-center shadow-2xl backdrop-blur-lg">
            <h3 className="mb-4 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-5xl font-black text-transparent">
              ¿Necesitas servicio hoy?
            </h3>
            <p className="mx-auto mb-8 max-w-3xl text-lg text-slate-300">
              Llama, envía un mensaje de texto o escríbenos por WhatsApp para recibir atención rápida en Connecticut.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button 
                onClick={handleCall}
                className="group bg-gradient-to-br from-green-400 to-green-600 font-black shadow-2xl shadow-green-500/30 transition-all hover:scale-105"
              >
                <Phone className="mr-2 h-4 w-4 group-hover:rotate-12" />
                Solicitar Servicio
              </Button>
              <Button 
                onClick={handleSMS}
                className="group bg-gradient-to-br from-blue-500 to-blue-700 font-black shadow-2xl shadow-blue-500/30 transition-all hover:scale-105"
              >
                <MessageSquare className="mr-2 h-4 w-4 group-hover:rotate-12" />
                Mensaje de Texto
              </Button>
              <Button 
                onClick={handleWhatsApp}
                className="group bg-gradient-to-br from-yellow-200 to-yellow-400 font-black text-black shadow-2xl shadow-yellow-500/30 transition-all hover:scale-105"
              >
                🟢 WhatsApp
              </Button>
              <Button 
                onClick={handleEmail}
                className="group bg-gradient-to-br from-red-400 to-red-600 font-black shadow-2xl shadow-red-500/30 transition-all hover:scale-105"
              >
                <Mail className="mr-2 h-4 w-4 group-hover:rotate-12" />
                Email
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-900/80 py-12 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex items-center gap-4">
              <img 
                src={images.logo}
                alt="Logo Tech Masters Solutions" 
                className="h-16 w-16 rounded-2xl border border-white/10 object-cover shadow-lg"
              />
              <div className="text-sm text-slate-300">
                <strong className="text-lg text-white">Tech Masters Solutions</strong><br />
                {contactInfo.location}<br />
                {contactInfo.phoneFormatted}<br />
                {contactInfo.email}
              </div>
            </div>
            
            <div className="text-center">
              <p className="mb-4 text-slate-300">Síguenos en redes sociales</p>
              <div className="flex justify-center gap-3">
                {Object.entries(socialMedia).map(([platform, url]) => {
                  if (!url || !socialIcons[platform]) return null;
                  const IconComponent = socialIcons[platform].icon;
                  const colorClass = socialIcons[platform].color;
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`rounded-full border border-white/20 bg-white/10 p-3 text-white transition-all hover:scale-110 ${colorClass}`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
            
            <div className="text-center text-slate-300 md:text-right">
              <p className="text-lg font-bold text-white">Energía y Tecnología</p>
              <p>para tu Hogar y Negocio</p>
              <p className="mt-4 text-xs">© 2025 Tech Masters Solutions</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsApp}
        className="group fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-4 font-black text-white shadow-2xl shadow-green-500/50 transition-all hover:scale-110 hover:shadow-green-500/70"
      >
        💬 WhatsApp
        <span className="absolute -right-1 -top-1 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500"></span>
        </span>
      </button>
    </div>
  );
};

export default Landing;
