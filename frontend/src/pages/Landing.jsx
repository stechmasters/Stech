import React from 'react';
import { Phone, MessageSquare, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { contactInfo, services, benefits, reviews, paymentMethods, images } from '../utils/mockData';

const Landing = () => {
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
    <div className="min-h-screen">
      {/* Topbar */}
      <div className="sticky top-0 z-50 border-b bg-[rgba(5,11,22,0.78)] backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src={images.logo}
                alt="Logo Tech Masters Solutions" 
                className="h-16 w-16 rounded-2xl border border-white/10 object-cover shadow-2xl"
              />
              <div>
                <h1 className="text-lg font-black leading-tight">Tech Masters Solutions</h1>
                <p className="text-sm font-bold text-cyan-400">Energía y Tecnología para tu Hogar y Negocio</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold">
                📍 {contactInfo.location}
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold">
                📞 {contactInfo.phoneFormatted}
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold">
                ⚡ Same Day Service
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h2 className="mb-4 text-5xl font-black leading-tight tracking-tight lg:text-6xl">
                Soluciones profesionales de{' '}
                <span className="bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                  electricidad y tecnología
                </span>
              </h2>
              <p className="mb-6 text-lg text-slate-300">
                En Tech Masters Solutions ayudamos a hogares y negocios en Connecticut con reparaciones eléctricas, 
                diseño web y soporte técnico. Servicio rápido, imagen profesional y atención confiable.
              </p>
              <div className="mb-4 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Button 
                  onClick={handleCall}
                  className="bg-gradient-to-br from-green-400 to-green-600 font-black shadow-2xl transition-transform hover:scale-105 hover:opacity-95"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Llamar Ahora
                </Button>
                <Button 
                  onClick={handleSMS}
                  className="bg-gradient-to-br from-blue-500 to-blue-700 font-black shadow-2xl transition-transform hover:scale-105 hover:opacity-95"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Enviar Texto
                </Button>
                <Button 
                  onClick={handleWhatsApp}
                  className="bg-gradient-to-br from-yellow-200 to-yellow-400 font-black text-black shadow-2xl transition-transform hover:scale-105 hover:opacity-95"
                >
                  🟢 WhatsApp
                </Button>
                <Button 
                  onClick={handleEmail}
                  className="bg-gradient-to-br from-red-400 to-red-600 font-black shadow-2xl transition-transform hover:scale-105 hover:opacity-95"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
              </div>
              <div className="text-lg font-extrabold text-yellow-400">
                Rápido • Confiable • Profesional
              </div>
            </div>
            <Card className="overflow-hidden border-white/10 bg-white/5 shadow-2xl backdrop-blur-lg">
              <img 
                src={images.hero}
                alt="Branding Tech Masters Solutions" 
                className="aspect-[4/3] w-full object-cover"
              />
              <CardHeader>
                <CardTitle>Marca fuerte y servicio serio</CardTitle>
                <CardDescription className="text-slate-300">
                  Tu identidad visual ya se ve premium. Esta página está diseñada para convertir visitas en llamadas y mensajes.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
            <img 
              src={images.banner}
              alt="Banner Tech Masters Solutions" 
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h3 className="mb-2 text-4xl font-black">Nuestros Servicios</h3>
            <p className="mx-auto max-w-3xl text-slate-300">
              Presentación moderna y profesional para que el cliente entienda rápido qué haces y te contacte más fácil.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <Card 
                key={service.id} 
                className="border-white/10 bg-white/5 shadow-2xl backdrop-blur-lg transition-transform hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-yellow-400/20 to-blue-500/20 text-2xl">
                    {service.icon}
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription className="text-slate-300">{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-6 lg:grid-cols-2">
            <Card className="border-white/10 bg-white/5 p-4 shadow-2xl">
              <img 
                src={images.robot}
                alt="Mascota Tech Masters Solutions" 
                className="mx-auto max-h-[520px] w-full rounded-2xl bg-gradient-to-b from-slate-200 to-slate-300 object-contain"
              />
            </Card>
            <div className="space-y-4">
              {benefits.map((benefit) => (
                <Card 
                  key={benefit.id} 
                  className="border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-lg transition-transform hover:translate-x-2"
                >
                  <strong className="mb-2 block text-lg">{benefit.icon} {benefit.title}</strong>
                  <p className="text-slate-300">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h3 className="mb-2 text-4xl font-black">Pagos fáciles</h3>
            <p className="text-slate-300">
              Después puedes reemplazar estos enlaces por tus links reales de Zelle, Cash App y Venmo.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {paymentMethods.map((method) => (
              <Button
                key={method.id}
                variant="outline"
                className="min-w-[180px] cursor-not-allowed bg-white font-black text-black opacity-70 shadow-2xl transition-transform hover:scale-105"
                disabled={method.pending}
              >
                {method.name} (Pendiente)
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h3 className="mb-2 text-4xl font-black">Lo que dirán tus clientes</h3>
            <p className="text-slate-300">
              Luego puedes reemplazar estos testimonios por reseñas reales de Google o mensajes de clientes.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((review) => (
              <Card key={review.id} className="border-white/10 bg-white/5 shadow-2xl backdrop-blur-lg">
                <CardHeader>
                  <div className="mb-2 text-xl tracking-widest text-yellow-400">★★★★★</div>
                  <CardDescription className="text-slate-300">{review.text}</CardDescription>
                  <div className="mt-3 font-extrabold text-cyan-400">{review.author}</div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="border-white/10 bg-gradient-to-br from-blue-500/10 to-yellow-400/10 p-10 text-center shadow-2xl">
            <h3 className="mb-3 text-4xl font-black">¿Necesitas servicio hoy?</h3>
            <p className="mx-auto mb-6 max-w-3xl text-slate-300">
              Llama, envía un mensaje de texto o escríbenos por WhatsApp para recibir atención rápida en Connecticut.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button 
                onClick={handleCall}
                className="bg-gradient-to-br from-green-400 to-green-600 font-black shadow-2xl transition-transform hover:scale-105 hover:opacity-95"
              >
                <Phone className="mr-2 h-4 w-4" />
                Solicitar Servicio
              </Button>
              <Button 
                onClick={handleSMS}
                className="bg-gradient-to-br from-blue-500 to-blue-700 font-black shadow-2xl transition-transform hover:scale-105 hover:opacity-95"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Mensaje de Texto
              </Button>
              <Button 
                onClick={handleWhatsApp}
                className="bg-gradient-to-br from-yellow-200 to-yellow-400 font-black text-black shadow-2xl transition-transform hover:scale-105 hover:opacity-95"
              >
                🟢 WhatsApp
              </Button>
              <Button 
                onClick={handleEmail}
                className="bg-gradient-to-br from-red-400 to-red-600 font-black shadow-2xl transition-transform hover:scale-105 hover:opacity-95"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img 
                src={images.logo}
                alt="Logo Tech Masters Solutions" 
                className="h-14 w-14 rounded-2xl border border-white/10 object-cover"
              />
              <div className="text-sm text-slate-400">
                <strong className="text-white">Tech Masters Solutions</strong><br />
                {contactInfo.location}<br />
                {contactInfo.phoneFormatted}<br />
                {contactInfo.email}
              </div>
            </div>
            <div className="text-slate-400">
              Energía y Tecnología para tu Hogar y Negocio
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsApp}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-[#25D366] px-5 py-3 font-black text-white shadow-2xl transition-transform hover:scale-110"
      >
        💬 WhatsApp
      </button>
    </div>
  );
};

export default Landing;
