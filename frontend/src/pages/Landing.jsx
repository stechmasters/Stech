import React, { useState, useEffect, useCallback } from 'react';
import { Phone, MessageSquare, Mail, Facebook, Instagram, Youtube, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { contactInfo, services, benefits, images } from '../utils/mockData';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const GOOGLE_REVIEW_URL = 'https://g.page/r/Cf38h7Od99BsEBM/review';

const Landing = () => {
  const [, setSocialMedia] = useState({ facebook: '', instagram: '', twitter: '', linkedin: '', youtube: '', tiktok: '' });
  const [scrollY, setScrollY] = useState(0);

  const fetchSocialMedia = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/social-media`);
      setSocialMedia(response.data);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching social media:', error);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    fetchSocialMedia();

    // Load Elfsight platform script (once)
    if (!document.querySelector('script[data-elfsight]')) {
      const script = document.createElement('script');
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      script.setAttribute('data-elfsight', 'true');
      document.body.appendChild(script);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchSocialMedia]);

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
              <div className="mb-6 flex flex-wrap justify-center gap-4 lg:justify-start">
                <Button 
                  onClick={handleCall}
                  className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 px-8 py-6 font-extrabold shadow-2xl shadow-emerald-500/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-400/60"
                >
                  <Phone className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  Llamar Ahora
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-400 to-green-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </Button>
                <Button 
                  onClick={handleSMS}
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 px-8 py-6 font-extrabold shadow-2xl shadow-blue-500/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/60"
                >
                  <MessageSquare className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  Enviar Texto
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </Button>
                <Button 
                  onClick={handleWhatsApp}
                  className="group relative overflow-hidden bg-gradient-to-r from-green-400 via-emerald-500 to-green-500 px-8 py-6 font-extrabold text-white shadow-2xl shadow-green-500/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-400/60"
                >
                  <svg className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-300 to-emerald-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </Button>
                <Button 
                  onClick={handleEmail}
                  className="group relative overflow-hidden bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 px-8 py-6 font-extrabold shadow-2xl shadow-rose-500/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-rose-400/60"
                >
                  <Mail className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  Email
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-rose-400 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
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
                <img src="https://customer-assets.emergentagent.com/job_tech-ct/artifacts/99apnirx_IMG_6768.jpeg" alt="Venmo QR - Tech Masters Solutions" />
              </div>

              <div className="ultra-card-info">
                <h4>Tech Masters Solutions</h4>
                <p>Escanea para pagar instantáneamente</p>
              </div>

              <a 
                href="https://venmo.com/u/Alex-Morales-25574" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ultra-btn ultra-venmo-btn"
              >
                Pagar con Venmo
              </a>
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
                <img src="https://customer-assets.emergentagent.com/job_tech-ct/artifacts/10mz20h3_IMG_6767.jpeg" alt="Cash App QR - Tech Masters Solutions" />
              </div>

              <div className="ultra-card-info">
                <h4>Tech Masters Solutions</h4>
                <p>Escanea para pagar al instante</p>
              </div>

              <a href="https://cash.app/$alexbladimir" target="_blank" rel="noopener noreferrer" className="ultra-btn ultra-cash-btn">Pagar con Cash App</a>
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

      {/* Google Reviews Section */}
      <section className="py-16" id="reviews">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-sm">
              <svg className="h-6 w-6" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/>
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                <path fill="#1976D2" d="M43.611 20.083L43.595 20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
              </svg>
              <span className="text-sm font-extrabold uppercase tracking-wider text-white">Reseñas verificadas de Google</span>
            </div>
            <h3 className="mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-5xl font-black text-transparent">
              Lo que dicen nuestros clientes
            </h3>
            <p className="mx-auto max-w-2xl text-lg text-slate-300">
              Lee las opiniones reales de quienes ya confiaron en Tech Masters Solutions. Tu satisfacción es nuestro mejor respaldo.
            </p>
          </div>

          {/* Elfsight Google Reviews Widget Placeholder */}
          <div className="mx-auto mb-10 max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-lg">
            <div
              className="elfsight-app-PLACEHOLDER"
              data-elfsight-app-lazy
              data-testid="google-reviews-widget"
            >
              {/* Fallback content while widget loads/configured */}
              <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-7 w-7 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-base text-slate-300">
                  Cargando reseñas de Google...
                </p>
                <a
                  href={GOOGLE_REVIEW_URL.replace('/review', '')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-cyan-400 underline-offset-4 hover:underline"
                  data-testid="google-profile-link"
                >
                  Ver perfil de Google
                </a>
              </div>
            </div>
          </div>

          {/* CTA: Leave a Google review */}
          <div className="text-center">
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 px-8 py-5 text-base font-extrabold text-white shadow-2xl shadow-blue-500/40 transition-all duration-300 hover:scale-105 hover:shadow-blue-400/60 sm:text-lg"
              data-testid="leave-google-review-btn"
            >
              <svg className="h-6 w-6" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/>
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                <path fill="#1976D2" d="M43.611 20.083L43.595 20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
              </svg>
              Déjanos una reseña en Google
              <span className="hidden sm:inline">⭐</span>
            </a>
            <p className="mt-3 text-sm text-slate-400">
              Solo te tomará 30 segundos y nos ayuda muchísimo a crecer.
            </p>
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
          {/* Social Media Section */}
          <div className="mb-12 text-center">
            <h3 className="mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-3xl font-black text-transparent">
              Síguenos en Redes Sociales
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a 
                href="https://www.facebook.com/share/18Vaxyzn4y/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-xl shadow-blue-500/30 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50"
              >
                <Facebook className="relative z-10 h-7 w-7 text-white transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </a>
              
              <a 
                href="https://www.instagram.com/stech_masters?igsh=aTZlMzVib3JtYTNk&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 shadow-xl shadow-pink-500/30 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-pink-500/50"
              >
                <Instagram className="relative z-10 h-7 w-7 text-white transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </a>
              
              <a 
                href="https://youtube.com/@techmasterssolutions?si=7WpUBeJuCiEwTLBg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 to-red-700 shadow-xl shadow-red-500/30 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-red-500/50"
              >
                <Youtube className="relative z-10 h-7 w-7 text-white transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </a>
              
              <a 
                href="https://www.tiktok.com/@stech_masters?_r=1&_t=ZP-96W98XiEGwZ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-black shadow-xl shadow-slate-500/30 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-slate-500/50"
              >
                <svg className="relative z-10 h-7 w-7 text-white transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-black opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </a>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
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
        className="group fixed bottom-6 left-6 z-50 flex items-center gap-3 rounded-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-500 px-7 py-5 font-black text-white shadow-2xl shadow-green-500/60 transition-all duration-300 hover:scale-110 hover:shadow-green-400/80"
      >
        <svg className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        WhatsApp
        <span className="absolute -right-1 -top-1 flex h-5 w-5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex h-5 w-5 rounded-full bg-white"></span>
        </span>
      </button>
    </div>
  );
};

export default Landing;
