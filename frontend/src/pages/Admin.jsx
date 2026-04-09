import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Settings, 
  Star, 
  DollarSign, 
  Wrench,
  Trash2,
  Plus,
  Save
} from 'lucide-react';
import { toast } from 'sonner';

const Admin = () => {
  // Estado para servicios
  const [services, setServices] = useState([
    { id: 1, icon: '⚡', title: 'Reparaciones Eléctricas', description: 'Diagnóstico, reparación y soluciones eléctricas rápidas y seguras.' },
    { id: 2, icon: '💻', title: 'Diseño Web', description: 'Páginas modernas para negocios que buscan verse profesionales.' },
    { id: 3, icon: '🛠', title: 'Soporte Técnico', description: 'Ayuda con computadoras, configuración, optimización y reparación.' }
  ]);

  // Estado para reseñas
  const [reviews, setReviews] = useState([
    { id: 1, rating: 5, text: 'Muy profesional y rápido. Excelente servicio.', author: 'Cliente Local' },
    { id: 2, rating: 5, text: 'Me resolvió el problema eléctrico el mismo día.', author: 'Cliente en Connecticut' },
    { id: 3, rating: 5, text: 'Buena atención, imagen profesional y servicio confiable.', author: 'Cliente Comercial' }
  ]);

  // Estado para métodos de pago
  const [paymentMethods, setPaymentMethods] = useState({
    zelle: '',
    cashapp: '',
    venmo: ''
  });

  // Estado para configuración general
  const [generalSettings, setGeneralSettings] = useState({
    phone: '2033170884',
    email: 'stechmasters@gmail.com',
    location: 'Connecticut',
    companyName: 'Tech Masters Solutions',
    tagline: 'Energía y Tecnología para tu Hogar y Negocio'
  });

  // Nuevo servicio
  const [newService, setNewService] = useState({ icon: '', title: '', description: '' });
  const [newReview, setNewReview] = useState({ rating: 5, text: '', author: '' });

  const handleAddService = () => {
    if (!newService.title || !newService.description) {
      toast.error('Por favor completa todos los campos del servicio');
      return;
    }
    const service = {
      id: services.length + 1,
      icon: newService.icon || '🔧',
      title: newService.title,
      description: newService.description
    };
    setServices([...services, service]);
    setNewService({ icon: '', title: '', description: '' });
    toast.success('Servicio agregado correctamente');
  };

  const handleDeleteService = (id) => {
    setServices(services.filter(s => s.id !== id));
    toast.success('Servicio eliminado');
  };

  const handleAddReview = () => {
    if (!newReview.text || !newReview.author) {
      toast.error('Por favor completa todos los campos de la reseña');
      return;
    }
    const review = {
      id: reviews.length + 1,
      rating: newReview.rating,
      text: newReview.text,
      author: newReview.author
    };
    setReviews([...reviews, review]);
    setNewReview({ rating: 5, text: '', author: '' });
    toast.success('Reseña agregada correctamente');
  };

  const handleDeleteReview = (id) => {
    setReviews(reviews.filter(r => r.id !== id));
    toast.success('Reseña eliminada');
  };

  const handleSavePayments = () => {
    toast.success('Métodos de pago actualizados correctamente');
    console.log('Payment methods:', paymentMethods);
  };

  const handleSaveGeneralSettings = () => {
    toast.success('Configuración general guardada correctamente');
    console.log('General settings:', generalSettings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-black text-white">Panel Administrativo</h1>
          <p className="text-slate-400">Gestiona el contenido de tu página web</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800">
            <TabsTrigger value="general">
              <Settings className="mr-2 h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="services">
              <Wrench className="mr-2 h-4 w-4" />
              Servicios
            </TabsTrigger>
            <TabsTrigger value="reviews">
              <Star className="mr-2 h-4 w-4" />
              Reseñas
            </TabsTrigger>
            <TabsTrigger value="payments">
              <DollarSign className="mr-2 h-4 w-4" />
              Pagos
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card className="border-slate-700 bg-slate-800/50">
              <CardHeader>
                <CardTitle className="text-white">Configuración General</CardTitle>
                <CardDescription>Actualiza la información básica de tu negocio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-slate-200">Nombre de la Empresa</Label>
                    <Input
                      id="companyName"
                      value={generalSettings.companyName}
                      onChange={(e) => setGeneralSettings({...generalSettings, companyName: e.target.value})}
                      className="border-slate-600 bg-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tagline" className="text-slate-200">Eslogan</Label>
                    <Input
                      id="tagline"
                      value={generalSettings.tagline}
                      onChange={(e) => setGeneralSettings({...generalSettings, tagline: e.target.value})}
                      className="border-slate-600 bg-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-200">Teléfono</Label>
                    <Input
                      id="phone"
                      value={generalSettings.phone}
                      onChange={(e) => setGeneralSettings({...generalSettings, phone: e.target.value})}
                      className="border-slate-600 bg-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-200">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={generalSettings.email}
                      onChange={(e) => setGeneralSettings({...generalSettings, email: e.target.value})}
                      className="border-slate-600 bg-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-slate-200">Ubicación</Label>
                    <Input
                      id="location"
                      value={generalSettings.location}
                      onChange={(e) => setGeneralSettings({...generalSettings, location: e.target.value})}
                      className="border-slate-600 bg-slate-700 text-white"
                    />
                  </div>
                </div>
                <Button onClick={handleSaveGeneralSettings} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Cambios
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Management */}
          <TabsContent value="services">
            <div className="space-y-6">
              <Card className="border-slate-700 bg-slate-800/50">
                <CardHeader>
                  <CardTitle className="text-white">Agregar Nuevo Servicio</CardTitle>
                  <CardDescription>Añade un nuevo servicio a tu página</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="serviceIcon" className="text-slate-200">Icono (emoji)</Label>
                      <Input
                        id="serviceIcon"
                        placeholder="⚡"
                        value={newService.icon}
                        onChange={(e) => setNewService({...newService, icon: e.target.value})}
                        className="border-slate-600 bg-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="serviceTitle" className="text-slate-200">Título del Servicio</Label>
                      <Input
                        id="serviceTitle"
                        placeholder="Nombre del servicio"
                        value={newService.title}
                        onChange={(e) => setNewService({...newService, title: e.target.value})}
                        className="border-slate-600 bg-slate-700 text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceDescription" className="text-slate-200">Descripción</Label>
                    <Textarea
                      id="serviceDescription"
                      placeholder="Describe el servicio..."
                      value={newService.description}
                      onChange={(e) => setNewService({...newService, description: e.target.value})}
                      className="border-slate-600 bg-slate-700 text-white"
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleAddService} className="bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Servicio
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-slate-700 bg-slate-800/50">
                <CardHeader>
                  <CardTitle className="text-white">Servicios Actuales</CardTitle>
                  <CardDescription>Gestiona los servicios existentes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-start justify-between rounded-lg border border-slate-600 bg-slate-700/50 p-4">
                      <div className="flex gap-3">
                        <div className="text-2xl">{service.icon}</div>
                        <div>
                          <h4 className="font-bold text-white">{service.title}</h4>
                          <p className="text-sm text-slate-300">{service.description}</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleDeleteService(service.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reviews Management */}
          <TabsContent value="reviews">
            <div className="space-y-6">
              <Card className="border-slate-700 bg-slate-800/50">
                <CardHeader>
                  <CardTitle className="text-white">Agregar Nueva Reseña</CardTitle>
                  <CardDescription>Añade testimonios de clientes satisfechos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="reviewAuthor" className="text-slate-200">Nombre del Cliente</Label>
                      <Input
                        id="reviewAuthor"
                        placeholder="Nombre del cliente"
                        value={newReview.author}
                        onChange={(e) => setNewReview({...newReview, author: e.target.value})}
                        className="border-slate-600 bg-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reviewRating" className="text-slate-200">Calificación</Label>
                      <Input
                        id="reviewRating"
                        type="number"
                        min="1"
                        max="5"
                        value={newReview.rating}
                        onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                        className="border-slate-600 bg-slate-700 text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reviewText" className="text-slate-200">Testimonio</Label>
                    <Textarea
                      id="reviewText"
                      placeholder="Escribe el testimonio del cliente..."
                      value={newReview.text}
                      onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                      className="border-slate-600 bg-slate-700 text-white"
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleAddReview} className="bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Reseña
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-slate-700 bg-slate-800/50">
                <CardHeader>
                  <CardTitle className="text-white">Reseñas Actuales</CardTitle>
                  <CardDescription>Gestiona las reseñas existentes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {reviews.map((review) => (
                    <div key={review.id} className="flex items-start justify-between rounded-lg border border-slate-600 bg-slate-700/50 p-4">
                      <div className="flex-1">
                        <div className="mb-1 text-yellow-400">{'★'.repeat(review.rating)}</div>
                        <p className="mb-2 text-slate-300">{review.text}</p>
                        <p className="text-sm font-bold text-cyan-400">{review.author}</p>
                      </div>
                      <Button
                        onClick={() => handleDeleteReview(review.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Payment Methods */}
          <TabsContent value="payments">
            <Card className="border-slate-700 bg-slate-800/50">
              <CardHeader>
                <CardTitle className="text-white">Métodos de Pago</CardTitle>
                <CardDescription>Configura los enlaces de tus plataformas de pago</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="zelle" className="text-slate-200">Zelle (Email o Teléfono)</Label>
                  <Input
                    id="zelle"
                    placeholder="tu@email.com o número de teléfono"
                    value={paymentMethods.zelle}
                    onChange={(e) => setPaymentMethods({...paymentMethods, zelle: e.target.value})}
                    className="border-slate-600 bg-slate-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cashapp" className="text-slate-200">Cash App ($Cashtag)</Label>
                  <Input
                    id="cashapp"
                    placeholder="$tucashtag"
                    value={paymentMethods.cashapp}
                    onChange={(e) => setPaymentMethods({...paymentMethods, cashapp: e.target.value})}
                    className="border-slate-600 bg-slate-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="venmo" className="text-slate-200">Venmo (@username)</Label>
                  <Input
                    id="venmo"
                    placeholder="@tuusername"
                    value={paymentMethods.venmo}
                    onChange={(e) => setPaymentMethods({...paymentMethods, venmo: e.target.value})}
                    className="border-slate-600 bg-slate-700 text-white"
                  />
                </div>
                <Button onClick={handleSavePayments} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Métodos de Pago
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
