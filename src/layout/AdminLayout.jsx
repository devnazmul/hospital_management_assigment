// ===========================================
// #00104
// ===========================================

import { useContext, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import CustomLoading from '../components/CustomLoading';
import { AuthContext } from '../context/AuthContext';
import AdminLayoutSidebar from './SideBar/AdminLayoutSidebar';

export default function AdminLayout() {
  const { isAuthenticated, setIsRouteChange } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    if (!isAuthenticated && !localStorage.getItem('token')) {
      // Redirect to the login page
      navigate('/auth/login');
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setIsRouteChange(Math.random());
  }, [location.pathname]);
  return (
    <>
      {isLoading ? (
        <CustomLoading />
      ) : (
        <div
          className={
            'h-screen transition-all duration-150 w-full bg-base-100 flex justify-between items-center'
          }>
          <Toaster position="top-right" reverseOrder={false} />
          <aside className={ 'z-20 h-full w-auto' }>
            <AdminLayoutSidebar />
          </aside>
          <div className={'w-full h-full'}>
            <main className={`py-3 overflow-y-auto`}>
              <Outlet />
            </main>
            <footer className={`px-1 md:px-3 hidden`}>Footer</footer>
          </div>
        </div>
      )}
    </>
  );
}
