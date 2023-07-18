// ===========================================
// #00152
// ===========================================

import React, { createContext, useContext, useState } from 'react';

// Create the authentication context
export const InvoiceContext = createContext();

// Create the authentication provider component
export const InvoiceProvider = ({ children }) => {
  // ALL DATA
  const [selectedPropertyWithDetals, setSelectedPropertyWithDetals] = useState(
    {}
  );
  const [selectedCustomerWithDetals, setSelectedCustomerWithDetals] = useState(
    {}
  );

  const [paymentId, setPaymentId] = useState(0);
  const [paymentDone, setPaymentDone] = useState(0);

  const [formData, setFormData] = useState({
    logo: '',
    invoice_title: 'Invoice', // req
    invoice_summary: '',

    business_name: '', // req
    business_address: '', // req

    reminder_dates: [], // it should be an array
    send_reminder: 0,

    landlord_id: '', // req if no tenant
    tenant_id: '', // req if no landlord
    property_id: '', // req

    invoice_number: 0, // req
    invoice_date: '',
    due_date: '',

    status: 'draft', // req

    invoice_items: [
      // {
      //   "name": "name",
      //   "description": "description",
      //   "quantity": "1",
      //   "price": "1.1",
      //   "tax": "20",
      //   "amount": "300"
      // }
    ], // req

    discount_description: '',
    discount_amount: '',
    discound_type: 'fixed', // currency/percentage

    sub_total: 0,
    total_amount: 0,

    note: '',

    invoice_payments: [
      // {
      //   "amount": "10",
      //   "payment_method": "cash",
      //   "payment_date": "12/12/2012"
      // },
    ],

    footer_text: 'Thank you for business with us.',
  });

  return (
    <InvoiceContext.Provider
      value={{
        paymentDone,
        setPaymentDone,
        paymentId,
        setPaymentId,
        formData,
        setFormData,
        selectedPropertyWithDetals,
        setSelectedPropertyWithDetals,
        selectedCustomerWithDetals,
        setSelectedCustomerWithDetals,
      }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoiceDetails = () => {
  const {
    paymentDone,
    setPaymentDone,
    formData,
    setFormData,
    selectedPropertyWithDetals,
    setSelectedPropertyWithDetals,
    selectedCustomerWithDetals,
    setSelectedCustomerWithDetals,
    paymentId,
    setPaymentId,
  } = useContext(InvoiceContext);
  return {
    paymentDone,
    setPaymentDone,
    paymentId,
    setPaymentId,
    formData,
    setFormData,
    selectedPropertyWithDetals,
    setSelectedPropertyWithDetals,
    selectedCustomerWithDetals,
    setSelectedCustomerWithDetals,
  };
};
