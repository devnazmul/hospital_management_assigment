// ===========================================
// #00104
// ===========================================

import { useContext, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import CustomLoading from '../components/CustomLoading';
import { AuthContext } from '../context/AuthContext';
import { useInvoiceDetails } from '../context/InvoiceContext';
import Navbar from './Navbar/Navbar';
import AdminLayoutSidebar from './SideBar/AdminLayoutSidebar';

export default function AdminLayout() {
  const { isAuthenticated, setIsRouteChange } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const {
    setFormData,
    setSelectedCustomerWithDetals,
    setSelectedPropertyWithDetals,
  } = useInvoiceDetails();
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
    setFormData({
      logo: '',
      invoice_title: '',
      invoice_summary: '',

      business_name: 'Four Arms Tech',
      business_address: '1332 Narisha, Dohar, Dhaka',

      reminder_dates: [],
      send_reminder: 0,

      landlord_id: 0,
      tenant_id: 0,
      property_id: 0,

      invoice_number: 0,
      invoice_date: '',
      due_date: '',

      status: 'draft',

      invoice_items: [],

      discount_description: '',
      discount_amount: '',
      discound_type: 'fixed',

      sub_total: 0,
      total_amount: 0,

      note: '',

      invoice_payments: [],

      footer_text: '',
    });
    setSelectedCustomerWithDetals({});
    setSelectedPropertyWithDetals({});
  }, [location.pathname]);
  return (
    <>
      {isLoading ? (
        <CustomLoading />
      ) : (
        <div
          className={
            'h-screen w-full bg-base-100 flex justify-between items-center md:py-2 md:pl-2'
          }>
          <Toaster position="top-right" reverseOrder={false} />
          <aside
            className={
              'h-full rounded-md overflow-hidden shadow-sm hidden md:block md:w-2/12'
            }>
            <AdminLayoutSidebar />
          </aside>
          <div className={'w-full md:w-10/12 h-full'}>
            <nav className={``}>
              <Navbar />
            </nav>
            <main className={`py-3 px-1 md:px-3 overflow-y-auto`}>
              <Outlet />
            </main>
            <footer className={`px-1 md:px-3 hidden`}>Footer</footer>
          </div>
        </div>
      )}
    </>
  );
}
