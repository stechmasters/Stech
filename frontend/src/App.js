import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </AuthProvider>
      </LanguageProvider>
    </div>
  );
}

export default App;
