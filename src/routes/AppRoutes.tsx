// src/routes/AppRoutes.tsx
import React from 'react';
import { IonRouterOutlet } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';

import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import ProfilePage from '../pages/profile/ProfilePage';
import SearchPage from '../pages/search/SearchPage';
import ReportsPage from '../pages/reports/ReportsPage';
import RoadmapPage from '../pages/roadmap/RoadmapPage';
import DocumentsPage from '../pages/documents/DocumentsPage';
import AdminDashboardPage from '../pages/dashboard/AdminDashboardPage';

/**
 * AppRoutes — rutas de la aplicación.
 *
 * Públicas:   /login, /register
 * Protegidas: /dashboard, /profile, /search, /reports, /roadmap, /documents
 * Admin:      /admin/dashboard
 * Raíz /      → redirige a /login
 */
const AppRoutes: React.FC = () => {
  return (
    <IonRouterOutlet>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/dashboard" component={DashboardPage} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route exact path="/search" component={SearchPage} />
      <Route exact path="/reports" component={ReportsPage} />
      <Route exact path="/roadmap" component={RoadmapPage} />
      <Route exact path="/documents" component={DocumentsPage} />
      <Route exact path="/admin/dashboard" component={AdminDashboardPage} />
      <Route exact path="/" render={() => <Redirect to="/login" />} />
    </IonRouterOutlet>
  );
};

export default AppRoutes;
