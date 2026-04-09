import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      toast.success('¡Inicio de sesión exitoso!');
      navigate('/admin');
    } else {
      toast.error(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <div className="container mx-auto flex min-h-screen max-w-md flex-col justify-center">
        <Link to="/" className="mb-8 flex items-center gap-2 text-slate-300 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>
        
        <Card className="border-slate-700 bg-slate-800/50">
          <CardHeader className="text-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_tech-ct/artifacts/917ybyua_6B480388-2114-489F-BA49-0495B1020E34.jpeg"
              alt="Tech Masters Solutions"
              className="mx-auto mb-4 h-20 w-20 rounded-2xl"
            />
            <CardTitle className="text-2xl text-white">Iniciar Sesión</CardTitle>
            <CardDescription>Panel Administrativo - Tech Masters Solutions</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@techmasters.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-slate-600 bg-slate-700 pl-10 text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-slate-600 bg-slate-700 pl-10 text-white"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>
            
            <div className="mt-4 text-center text-sm text-slate-400">
              <p>Credenciales por defecto:</p>
              <p className="text-slate-300">admin@techmasters.com / TechMasters2025!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
