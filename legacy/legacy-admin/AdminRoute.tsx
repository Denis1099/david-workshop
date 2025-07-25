'use client';

import React from 'react';
import { redirect } from 'next/navigation';
import { AdminService } from '../../services/adminService';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const isAuthenticated = AdminService.isAuthenticated();
  
  if (!isAuthenticated) {
    redirect('/admin/login');
    return null;
  }
  
  return <>{children}</>;
};

export default AdminRoute;