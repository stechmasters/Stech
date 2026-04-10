import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Mail, Facebook, Instagram, Twitter, Linkedin, Youtube, Globe } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { contactInfo, images } from '../utils/mockData';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Landing = () => {
  const { language, toggleLanguage, t } = useLanguage();
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

  // Dynamic data based on language
  const services = [
    { id: 1, icon: '⚡', title: t('service1Title'), description: t('service1Desc') },
    { id: 2, icon: '💻', title: t('service2Title'), description: t('service2Desc') },
    { id: 3, icon: '🛠', title: t('service3Title'), description: t('service3Desc') }
  ];

  const benefits = [
    { id: 1, icon: '⚡', title: t('benefit1Title'), description: t('benefit1Desc') },
    { id: 2, icon: '🏠', title: t('benefit2Title'), description: t('benefit2Desc') },
    { id: 3, icon: '🔧', title: t('benefit3Title'), description: t('benefit3Desc') },
    { id: 4, icon: '💯', title: t('benefit4Title'), description: t('benefit4Desc') }
  ];

  const reviews = [
    { id: 1, rating: 5, text: t('review1'), author: t('review1Author') },
    { id: 2, rating: 5, text: t('review2'), author: t('review2Author') },
    { id: 3, rating: 5, text: t('review3'), author: t('review3Author') }
  ];

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
                <p className="text-sm font-bold text-cyan-300">{t('tagline')}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="group rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/20">
                📍 {t('location')}
              </div>
              <div className="group rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/20">
                📞 {contactInfo.phoneFormatted}
              </div>
              <div className="group rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/20">
                ⚡ {t('sameDayService')}
              </div>
              <button
                onClick={toggleLanguage}
                className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/20"
              >
                <Globe className="h-4 w-4" />
                {language === 'es' ? 'EN' : 'ES'}
              </button>
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
                {t('heroTitle')}{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                    {t('heroTitleHighlight')}
                  </span>
                  <div className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-yellow-400/0 via-yellow-400/60 to-yellow-400/0"></div>
                </span>
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-slate-100 lg:text-xl">
                {t('heroDescription')}
              </p>
              <div className="mb-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Button 
                  onClick={handleCall}
                  className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-6 font-black shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/50"
                >
                  <Phone className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                  {t('callNow')}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </Button>
                <Button 
                  onClick={handleSMS}
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-6 font-black shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50"
                >
                  <MessageSquare className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                  {t('sendText')}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </Button>
                <Button 
                  onClick={handleWhatsApp}
                  className="group relative overflow-hidden bg-gradient-to-r from-green-400 via-green-500 to-emerald-500 px-6 py-6 font-black text-white shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/50"
                >
                  <svg className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-300 to-emerald-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </Button>
                <Button 
                  onClick={handleEmail}
                  className="group relative overflow-hidden bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-6 font-black shadow-lg shadow-rose-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-rose-500/50"
                >
                  <Mail className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                  {t('email')}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-rose-400 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </Button>
              </div>
              <div className="animate-pulse text-lg font-extrabold text-yellow-400">
                {t('heroNote')}
              </div>
            </div>
              <div className="mb-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Button 
                  onClick={handleCall}
                  className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-6 font-black shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/50"
                >
                  <Phone className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                  Llamar Ahora
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </Button>
                <Button 
                  onClick={handleSMS}
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-6 font-black shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50"
                >
                  <MessageSquare className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                  Enviar Texto
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </Button>
                <Button 
                  onClick={handleWhatsApp}
                  className="group relative overflow-hidden bg-gradient-to-r from-green-400 via-green-500 to-emerald-500 px-6 py-6 font-black text-white shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/50"
                >
                  <svg className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-300 to-emerald-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </Button>
                <Button 
                  onClick={handleEmail}
                  className="group relative overflow-hidden bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-6 font-black shadow-lg shadow-rose-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-rose-500/50"
                >
                  <Mail className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                  Email
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-rose-400 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </Button>
              </div>
              <div className="animate-pulse text-lg font-extrabold text-yellow-400">
                {t('heroNote')}
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
                  {t('heroCardTitle')}
                </CardTitle>
                <CardDescription className="text-slate-300">
                  {t('heroCardDesc')}
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
              {t('servicesTitle')}
            </h3>
            <p className="mx-auto max-w-3xl text-lg text-slate-200">
              {t('servicesDesc')}
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
                  className="group border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-lg transition-all hover:translate-x-2 hover:border-white/20 hover:shadow-blue-400/20"
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

      {/* Payment Methods - Ultra Pro Design */}
      <section className="ultra-pay-section" id="payments">
        <div className="ultra-pay-bg"></div>

        <div className="ultra-pay-container">
          <div className="ultra-pay-header">
            <span className="ultra-pay-label">{t('paymentsLabel')}</span>
            <h2>{t('paymentsTitle')}</h2>
            <p>
              {t('paymentsDesc')}
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
                  <span>{t('zelleSubtitle')}</span>
                </div>
              </div>

              <div className="ultra-qr-wrap">
                <img 
                  src="https://customer-assets.emergentagent.com/job_tech-ct/artifacts/791op84b_IMG_6766.png" 
                  alt="Zelle QR for Alex Morales Tacuri"
                  loading="lazy"
                />
              </div>

              <div className="ultra-card-info">
                <h4>Alex Morales Tacuri</h4>
                <p>{t('zelleInfo')}</p>
              </div>

              <a href="#zelle-help" className="ultra-btn ultra-zelle-btn">{t('payWithZelle')}</a>
            </article>

            {/* VENMO */}
            <article className="ultra-card ultra-venmo">
              <div className="ultra-top-line"></div>
              <div className="ultra-card-head">
                <div className="ultra-logo-box ultra-venmo-box">V</div>
                <div>
                  <h3>Venmo</h3>
                  <span>{t('venmoSubtitle')}</span>
                </div>
              </div>

              <div className="ultra-qr-wrap">
                <img 
                  src="https://customer-assets.emergentagent.com/job_tech-ct/artifacts/99apnirx_IMG_6768.jpeg" 
                  alt="Venmo QR for Alex Morales"
                  loading="lazy"
                />
              </div>

              <div className="ultra-card-info">
                <h4>Alex Morales</h4>
                <p>@Alex-Morales-25574</p>
              </div>

              <a href="https://venmo.com/Alex-Morales-25574" target="_blank" rel="noopener noreferrer" className="ultra-btn ultra-venmo-btn">
                {t('payWithVenmo')}
              </a>
            </article>

            {/* CASH APP */}
            <article className="ultra-card ultra-cash">
              <div className="ultra-top-line"></div>
              <div className="ultra-card-head">
                <div className="ultra-logo-box ultra-cash-box">$</div>
                <div>
                  <h3>Cash App</h3>
                  <span>{t('cashAppSubtitle')}</span>
                </div>
              </div>

              <div className="ultra-qr-wrap">
                <img 
                  src="https://customer-assets.emergentagent.com/job_tech-ct/artifacts/10mz20h3_IMG_6767.jpeg" 
                  alt="Cash App QR for Alex Morales Tacuri"
                  loading="lazy"
                />
              </div>

              <div className="ultra-card-info">
                <h4>Alex Morales Tacuri</h4>
                <p>$alexbladimir</p>
              </div>

              <a href="https://cash.app/$alexbladimir" target="_blank" rel="noopener noreferrer" className="ultra-btn ultra-cash-btn">
                {t('payWithCashApp')}
              </a>
            </article>
          </div>

          <div className="ultra-pay-footer" id="zelle-help">
            <p>
              <strong>{t('paymentSupport')}</strong> {t('paymentSupportDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h3 className="mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-5xl font-black text-transparent">
              Testimonios de Clientes
            </h3>
            <p className="text-lg text-slate-300">
              Lee lo que nuestros clientes satisfechos tienen que decir sobre nuestro trabajo.
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
              {t('ctaTitle')}
            </h3>
            <p className="mx-auto mb-8 max-w-3xl text-lg text-slate-300">
              {t('ctaDesc')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button 
                onClick={handleCall}
                className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-6 font-black shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/50"
              >
                <Phone className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                {t('requestService')}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </Button>
              <Button 
                onClick={handleSMS}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-6 font-black shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50"
              >
                <MessageSquare className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                {t('textMessage')}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </Button>
              <Button 
                onClick={handleWhatsApp}
                className="group relative overflow-hidden bg-gradient-to-r from-green-400 via-green-500 to-emerald-500 px-6 py-6 font-black text-white shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/50"
              >
                <svg className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-300 to-emerald-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </Button>
              <Button 
                onClick={handleEmail}
                className="group relative overflow-hidden bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-6 font-black shadow-lg shadow-rose-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-rose-500/50"
              >
                <Mail className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                {t('email')}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-rose-400 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </Button>
            </div>
          </Card>
            <div className="flex flex-wrap justify-center gap-3">
              <Button 
                onClick={handleCall}
                className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-6 font-black shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/50"
              >
                <Phone className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                Solicitar Servicio
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </Button>
              <Button 
                onClick={handleSMS}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-6 font-black shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50"
              >
                <MessageSquare className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                Mensaje de Texto
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </Button>
              <Button 
                onClick={handleWhatsApp}
                className="group relative overflow-hidden bg-gradient-to-r from-green-400 via-green-500 to-emerald-500 px-6 py-6 font-black text-white shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/50"
              >
                <svg className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-300 to-emerald-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </Button>
              <Button 
                onClick={handleEmail}
                className="group relative overflow-hidden bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-6 font-black shadow-lg shadow-rose-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-rose-500/50"
              >
                <Mail className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                Email
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-rose-400 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
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
              <p className="mb-4 text-slate-300">{t('followUs')}</p>
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
              <p className="text-lg font-bold text-white">{t('footerTagline')}</p>
              <p>{t('footerSubtitle')}</p>
              <p className="mt-4 text-xs">© 2025 Tech Masters Solutions</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsApp}
        className="group fixed bottom-8 left-8 z-50 flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 font-black text-white shadow-2xl shadow-green-500/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-green-500/70"
      >
        <div className="relative flex items-center gap-2">
          <svg className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span className="hidden transition-all duration-300 group-hover:inline-block sm:inline-block">WhatsApp</span>
        </div>
        <span className="absolute -right-1 -top-1 flex h-5 w-5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75"></span>
          <span className="relative inline-flex h-5 w-5 rounded-full bg-green-400"></span>
        </span>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </button>
    </div>
  );
};

export default Landing;
