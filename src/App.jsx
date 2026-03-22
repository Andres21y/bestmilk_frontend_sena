import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import PrivateRoute from './context/privetRoute';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './components/forgot';
import ResetPassword from './components/resetPassword';
import Landing from './viwes/Landing';
import Login from './viwes/Login';
import Signup from './viwes/Signup';
import Admin from './viwes/Admin';
import UsersTable from './components/usersTable';
import CattleList from './components/cattleList';
import NotAvailable from './components/erros/noaviable';
import NavBar from './components/navBar';

function AppLayout() {
  const location = useLocation();
  const hideNavBar = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavBar && <NavBar />}
      <Routes>
        {/* Rutas generales */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<Admin />}>
            <Route path="home" element={<NotAvailable />} />
            <Route path="users" element={<UsersTable />} />
            <Route path="cattles" element={<CattleList />} />
            <Route path="dashboard" element={<NotAvailable />} />
            <Route path="production" element={<NotAvailable />} />
            <Route path="health" element={<NotAvailable />} />
            <Route path="vaccine" element={<NotAvailable />} />
            <Route path="setting" element={<NotAvailable />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
         <AppLayout />
        </Router>
      </AuthProvider >
    </>
  )
}

export default App