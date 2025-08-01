import React, { useState } from 'react';
import { X, Calendar, Clock, User, Mail, CheckCircle } from 'lucide-react';
import { Doctor, AppointmentForm } from '../types';
import { useAppointment } from '../context/AppointmentContext';

interface BookingModalProps {
  doctor: Doctor;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ doctor, onClose }) => {
  const { state, addAppointment } = useAppointment();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState<AppointmentForm>({
    patientName: '',
    email: '',
    date: '',
    time: ''
  });
  const [errors, setErrors] = useState<Partial<AppointmentForm>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<AppointmentForm> = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    addAppointment({
      doctorId: doctor.id,
      doctorName: doctor.name,
      patientName: formData.patientName,
      email: formData.email,
      date: formData.date,
      time: formData.time
    });

    setStep('success');
  };

  const handleInputChange = (field: keyof AppointmentForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const getAvailableSlots = (selectedDate: string) => {
    const dayAvailability = doctor.availability.find(day => day.date === selectedDate);
    return dayAvailability ? dayAvailability.slots : [];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-md w-full p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h2>
            <p className="text-gray-600">
              Your appointment has been successfully booked with Dr. {doctor.name}.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">Appointment Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Doctor:</span>
                <span className="font-medium">{doctor.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{formatDate(formData.date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{formData.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Patient:</span>
                <span className="font-medium">{formData.patientName}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            A confirmation email has been sent to {formData.email}
          </p>

          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Book Appointment</h2>
            <p className="text-gray-600">with Dr. {doctor.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline h-4 w-4 mr-1" />
              Patient Name *
            </label>
            <input
              type="text"
              value={formData.patientName}
              onChange={(e) => handleInputChange('patientName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.patientName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.patientName && (
              <p className="mt-1 text-sm text-red-600">{errors.patientName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="inline h-4 w-4 mr-1" />
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Select Date *
            </label>
            <select
              value={formData.date}
              onChange={(e) => {
                handleInputChange('date', e.target.value);
                handleInputChange('time', ''); 
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.date ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select a date</option>
              {doctor.availability.map((day, index) => (
                <option key={index} value={day.date}>
                  {formatDate(day.date)} ({day.slots.length} slots available)
                </option>
              ))}
            </select>
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date}</p>
            )}
          </div>

          {formData.date && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline h-4 w-4 mr-1" />
                Select Time *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {getAvailableSlots(formData.date).map((slot, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleInputChange('time', slot)}
                    className={`p-3 border rounded-lg text-sm font-medium transition-all duration-200 ${
                      formData.time === slot
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {errors.time && (
                <p className="mt-1 text-sm text-red-600">{errors.time}</p>
              )}
            </div>
          )}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={state.loading}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                state.loading
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
              }`}
            >
              {state.loading ? 'Booking...' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;