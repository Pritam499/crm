import React, { useState } from 'react';
import { getToken } from '../auth/sessions';
import ContactsPage from './ContactsPage';
import OpportunitiesPage from './OpportunitiesPage';

const CRMPage = () => {
  const [activeTab, setActiveTab] = useState('contacts');
  const token = getToken();

  if (!token) {
    return (
      <div className="flex h-screen items-center justify-center text-center">
        <p className="text-gray-600">Please login to continue</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white text-gray-800">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">SoftQubic CRM</h1>
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="contacts">Contacts</option>
          <option value="opportunities">Opportunities</option>
        </select>
      </header>

      <main className="p-6">
        {activeTab === 'contacts' && <ContactsPage />}
        {activeTab === 'opportunities' && <OpportunitiesPage />}
      </main>
    </div>
  );
};

export default CRMPage;
