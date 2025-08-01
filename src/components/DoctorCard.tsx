import React from 'react';
import { Star, Clock, Award } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
  onClick: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'on-leave':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Available Today';
      case 'busy':
        return 'Limited Slots';
      case 'on-leave':
        return 'On Leave';
      default:
        return 'Unknown';
    }
  };

  const hasAvailableSlots = doctor.availability.some(day => day.slots.length > 0);

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={() => onClick(doctor)}
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
              <Award className="h-4 w-4 text-white" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {doctor.name}
                </h3>
                <p className="text-blue-600 font-medium text-sm">
                  {doctor.specialization}
                </p>
              </div>
              
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(doctor.status)}`}>
                {getStatusText(doctor.status)}
              </span>
            </div>
            
            <div className="flex items-center space-x-4 mb-3">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-700">
                  {doctor.rating}
                </span>
              </div>
              
              <div className="flex items-center space-x-1 text-gray-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm">
                  {doctor.experience} years exp.
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {doctor.about}
            </p>
            
            {hasAvailableSlots && doctor.status === 'available' ? (
              <div className="flex items-center justify-between">
                <div className="text-sm text-green-600 font-medium">
                  Next available: Today
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                  Book Now
                </button>
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                {doctor.status === 'on-leave' ? 'Currently unavailable' : 'Limited availability'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;