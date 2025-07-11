import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Auth/LoginPage';
import Layout from './components/Layout/Layout';
import DashboardPage from './components/Dashboard/DashboardPage';
import ProductsPage from './components/Products/ProductsPage';
import CategoriesPage from './components/Categories/CategoriesPage';
import UnitsPage from './components/Units/UnitsPage';
import UnitCreationPage from './components/Units/UnitCreationPage';
import UsersPage from './components/Users/UsersPage';
import OrdersPage from './components/Orders/OrdersPage';
import ReportsPage from './components/Reports/ReportsPage';
import OffersPage from './components/Offers/OffersPage';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  return <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />} />
        <Route path="/*" element={isAuthenticated ? <Layout onLogout={handleLogout}>
                <Routes>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/units" element={<UnitsPage />} />
                  <Route path="/units/create" element={<UnitCreationPage />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/reports" element={<ReportsPage />} />
                  <Route path="/offers" element={<OffersPage />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </Layout> : <Navigate to="/login" />} />
      </Routes>
    </Router>;
}