import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DefaultShell } from "./components/DefaultShell";
import { TenantShell } from "./components/TenantShell";
import { AdminLayout } from "./components/AdminLayout";
import { RequireAuth } from "./components/RequireAuth";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Especialidades from "./pages/Especialidades";
import Equipe from "./pages/Equipe";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import TenantForm from "./pages/admin/TenantForm";
import { ScrollToTop } from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<DefaultShell />}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/especialidades" element={<Especialidades />} />
          <Route path="/equipe" element={<Equipe />} />
          <Route path="/contato" element={<Contato />} />
        </Route>

        <Route path="/c/:slug" element={<TenantShell />}>
          <Route index element={<Home />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="especialidades" element={<Especialidades />} />
          <Route path="equipe" element={<Equipe />} />
          <Route path="contato" element={<Contato />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="new" element={<TenantForm />} />
          <Route path=":id/edit" element={<TenantForm />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
