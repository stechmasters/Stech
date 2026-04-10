import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Settings, Star, DollarSign, Wrench, Trash2, Plus, Save, LogOut, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Admin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState({ zelle: '', cashapp: '', venmo: '' });
  const [socialMedia, setSocialMedia] = useState({ facebook: '', instagram: '', twitter: '', linkedin: '', youtube: '', tiktok: '' });
  const [generalSettings, setGeneralSettings] = useState({
    phone: '',
    email: '',
    location: '',
    companyName: '',
    tagline: ''
  });
  const [newService, setNewService] = useState({ icon: '', title: '', description: '' });
  const [newReview, setNewReview] = useState({ rating: 5, text: '', author: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [settingsRes, servicesRes, reviewsRes, paymentsRes, socialRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/settings`, { withCredentials: true }),
        axios.get(`${BACKEND_URL}/api/services`, { withCredentials: true }),
        axios.get(`${BACKEND_URL}/api/reviews`, { withCredentials: true }),
        axios.get(`${BACKEND_URL}/api/payments`, { withCredentials: true }),
        axios.get(`${BACKEND_URL}/api/social-media`, { withCredentials: true })
      ]);
      
      setGeneralSettings(settingsRes.data);
      setServices(servicesRes.data);
      setReviews(reviewsRes.data);
      setPaymentMethods(paymentsRes.data);
      setSocialMedia(socialRes.data);
    } catch (error) {
      toast.error('Error al cargar datos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleAddService = async () => {
    if (!newService.title || !newService.description) {
      toast.error('Por favor completa todos los campos del servicio');
      return;
    }
    
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/services`,
        { icon: newService.icon || '🔧', title: newService.title, description: newService.description },
        { withCredentials: true }
      );
      setServices([...services, response.data]);
      setNewService({ icon: '', title: '', description: '' });
      toast.success('Servicio agregado correctamente');
    } catch (error) {
      toast.error('Error al agregar servicio');
    }
  };

  const handleDeleteService = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/services/${id}`, { withCredentials: true });
      setServices(services.filter(s => s.id !== id));
      toast.success('Servicio eliminado');
    } catch (error) {
      toast.error('Error al eliminar servicio');
    }
  };

  const handleAddReview = async () => {
    if (!newReview.text || !newReview.author) {
      toast.error('Por favor completa todos los campos de la reseña');
      return;
    }
    
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/reviews`,
        newReview,
        { withCredentials: true }
      );
      setReviews([...reviews, response.data]);
      setNewReview({ rating: 5, text: '', author: '' });
      toast.success('Reseña agregada correctamente');
    } catch (error) {
      toast.error('Error al agregar reseña');
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/reviews/${id}`, { withCredentials: true });
      setReviews(reviews.filter(r => r.id !== id));
      toast.success('Reseña eliminada');
    } catch (error) {
      toast.error('Error al eliminar reseña');
    }
  };

  const handleSavePayments = async () => {
    try {
      await axios.put(`${BACKEND_URL}/api/payments`, paymentMethods, { withCredentials: true });
      toast.success('Métodos de pago actualizados correctamente');
    } catch (error) {
      toast.error('Error al actualizar métodos de pago');
    }
  };

  const handleSaveGeneralSettings = async () => {
    try {
      await axios.put(`${BACKEND_URL}/api/settings`, generalSettings, { withCredentials: true });
      toast.success('Configuración general guardada correctamente');
    } catch (error) {
      toast.error('Error al guardar configuración');
    }
  };

  const handleSaveSocialMedia = async () => {
    try {
      await axios.put(`${BACKEND_URL}/api/social-media`, socialMedia, { withCredentials: true });
      toast.success('Redes sociales actualizadas correctamente');
    } catch (error) {
      toast.error('Error al actualizar redes sociales');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-slate-300">Cargando panel administrativo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-black text-white">Panel Administrativo</h1>
            <p className="text-slate-400">Gestiona el contenido de tu página web</p>
            {user && <p className="mt-1 text-sm text-cyan-400">Conectado como: {user.email}</p>}
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-slate-600 text-slate-200">
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800">
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
            <TabsTrigger value="social">
              <Share2 className="mr-2 h-4 w-4" />
              Redes
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
                <CardDescription>Configura los enlaces y QR codes de tus plataformas de pago</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="rounded-lg border border-slate-600 bg-slate-700/30 p-4">
                    <Label className="mb-2 block text-lg font-bold text-purple-400">Zelle</Label>
                    <div className="space-y-2">
                      <Input
                        placeholder="Nombre o email de Zelle"
                        value={paymentMethods.zelle}
                        onChange={(e) => setPaymentMethods({...paymentMethods, zelle: e.target.value})}
                        className="border-slate-600 bg-slate-700 text-white"
                      />
                      <Input
                        placeholder="URL de la imagen QR de Zelle"
                        value={paymentMethods.zelle_qr}
                        onChange={(e) => setPaymentMethods({...paymentMethods, zelle_qr: e.target.value})}
                        className="border-slate-600 bg-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-600 bg-slate-700/30 p-4">
                    <Label className="mb-2 block text-lg font-bold text-green-400">Cash App</Label>
                    <div className="space-y-2">
                      <Input
                        placeholder="$cashtag"
                        value={paymentMethods.cashapp}
                        onChange={(e) => setPaymentMethods({...paymentMethods, cashapp: e.target.value})}
                        className="border-slate-600 bg-slate-700 text-white"
                      />
                      <Input
                        placeholder="URL de la imagen QR de Cash App"
                        value={paymentMethods.cashapp_qr}
                        onChange={(e) => setPaymentMethods({...paymentMethods, cashapp_qr: e.target.value})}
                        className="border-slate-600 bg-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-600 bg-slate-700/30 p-4">
                    <Label className="mb-2 block text-lg font-bold text-blue-400">Venmo</Label>
                    <div className="space-y-2">
                      <Input
                        placeholder="@username"
                        value={paymentMethods.venmo}
                        onChange={(e) => setPaymentMethods({...paymentMethods, venmo: e.target.value})}
                        className="border-slate-600 bg-slate-700 text-white"
                      />
                      <Input
                        placeholder="URL de la imagen QR de Venmo"
                        value={paymentMethods.venmo_qr}
                        onChange={(e) => setPaymentMethods({...paymentMethods, venmo_qr: e.target.value})}
                        className="border-slate-600 bg-slate-700 text-white"
                      />
                    </div>
                  </div>
                </div>
                <Button onClick={handleSavePayments} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Métodos de Pago
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Media */}
          <TabsContent value="social">
            <Card className="border-slate-700 bg-slate-800/50">
              <CardHeader>
                <CardTitle className="text-white">Redes Sociales</CardTitle>
                <CardDescription>Configura los enlaces de tus redes sociales</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="facebook" className="text-slate-200">Facebook</Label>
                    <Input
                      id="facebook"
                      placeholder="https://facebook.com/tupagina"
                      value={socialMedia.facebook}
                      onChange={(e) => setSocialMedia({...socialMedia, facebook: e.target.value})}
                      className="border-slate-600 bg-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram" className="text-slate-200">Instagram</Label>
                    <Input
                      id="instagram"
                      placeholder="https://instagram.com/tuusuario"
                      value={socialMedia.instagram}
                      onChange={(e) => setSocialMedia({...socialMedia, instagram: e.target.value})}
                      className="border-slate-600 bg-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter" className="text-slate-200">Twitter / X</Label>
                    <Input
                      id="twitter"
                      placeholder="https://twitter.com/tuusuario"
                      value={socialMedia.twitter}
                      onChange={(e) => setSocialMedia({...socialMedia, twitter: e.target.value})}
                      className="border-slate-600 bg-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="text-slate-200">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      placeholder="https://linkedin.com/company/tuempresa"
                      value={socialMedia.linkedin}
                      onChange={(e) => setSocialMedia({...socialMedia, linkedin: e.target.value})}
                      className="border-slate-600 bg-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="youtube" className="text-slate-200">YouTube</Label>
                    <Input
                      id="youtube"
                      placeholder="https://youtube.com/@tucanal"
                      value={socialMedia.youtube}
                      onChange={(e) => setSocialMedia({...socialMedia, youtube: e.target.value})}
                      className="border-slate-600 bg-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tiktok" className="text-slate-200">TikTok</Label>
                    <Input
                      id="tiktok"
                      placeholder="https://tiktok.com/@tuusuario"
                      value={socialMedia.tiktok}
                      onChange={(e) => setSocialMedia({...socialMedia, tiktok: e.target.value})}
                      className="border-slate-600 bg-slate-700 text-white"
                    />
                  </div>
                </div>
                <Button onClick={handleSaveSocialMedia} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Redes Sociales
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
