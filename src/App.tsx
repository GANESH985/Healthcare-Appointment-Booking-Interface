import React, { useState } from 'react';
import Layout from './components/Layout';
import DoctorList from './components/DoctorList';
import DoctorProfile from './components/DoctorProfile';
import { AppointmentProvider } from './context/AppointmentContext';
import { mockDoctors } from './data/mockData';
import { Doctor } from './types';

type AppView = 'list' | 'profile';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('list');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setCurrentView('profile');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedDoctor(null);
  };

  return (
    <AppointmentProvider>
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentView === 'list' && (
            <>
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Find Your Perfect Doctor
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Book appointments with top-rated healthcare professionals. 
                  Choose from our extensive network of specialists.
                </p>
              </div>
              
              <DoctorList 
                doctors={mockDoctors}
                onDoctorSelect={handleDoctorSelect}
              />
            </>
          )}

          {currentView === 'profile' && selectedDoctor && (
            <DoctorProfile
              doctor={selectedDoctor}
              onBack={handleBackToList}
            />
          )}
        </div>
      </Layout>
    </AppointmentProvider>
  );
}

export default App;