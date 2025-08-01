import React, { useState } from 'react';
import { Star, Award, Clock, ArrowLeft, Calendar } from 'lucide-react';
import { Doctor } from '../types';
import BookingModal from './BookingModal';

interface DoctorProfileProps {
  doctor: Doctor;
  onBack: () => void;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({ doctor, onBack }) => {
  const [showBooking, setShowBooking] = useState(false);

  const hasAvailableSlots = doctor.availability.some(day => day.slots.length > 0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 font-medium transition-colors duration-200"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Doctors</span>
      </button>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-8 text-white">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold mb-2">{doctor.name}</h1>
              <p className="text-blue-100 text-lg mb-3">{doctor.specialization}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{doctor.rating}</span>
                  <span className="text-blue-100">rating</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Clock className="h-5 w-5" />
                  <span>{doctor.experience} years experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">About Dr. {doctor.name.split(' ')[1]}</h2>
                <p className="text-gray-600 leading-relaxed">{doctor.about}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Education</h3>
                <p className="text-gray-600">{doctor.education}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Slots</h3>
                {doctor.availability.length > 0 ? (
                  <div className="space-y-4">
                    {doctor.availability.map((day, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">
                          {formatDate(day.date)}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {day.slots.map((slot, slotIndex) => (
                            <span
                              key={slotIndex}
                              className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-sm font-medium"
                            >
                              {slot}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No available slots at the moment</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Appointment</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Consultation Fee</span>
                    <span className="font-semibold">$150</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className={`font-medium ${
                      doctor.status === 'available' ? 'text-green-600' : 
                      doctor.status === 'busy' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {doctor.status === 'available' ? 'Available' : 
                       doctor.status === 'busy' ? 'Limited Slots' : 'On Leave'}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowBooking(true)}
                  disabled={!hasAvailableSlots || doctor.status === 'on-leave'}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                    hasAvailableSlots && doctor.status !== 'on-leave'
                      ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {hasAvailableSlots && doctor.status !== 'on-leave' 
                    ? 'Book Appointment' 
                    : 'Currently Unavailable'}
                </button>
                
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Appointments can be cancelled up to 24 hours in advance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showBooking && (
        <BookingModal
          doctor={doctor}
          onClose={() => setShowBooking(false)}
        />
      )}
    </div>
  );
};

export default DoctorProfile;