import React, { useState, useMemo } from 'react';
import { Users, Search as SearchIcon } from 'lucide-react';
import { Doctor, SearchFilters } from '../types';
import DoctorCard from './DoctorCard';
import SearchBar from './SearchBar';

interface DoctorListProps {
  doctors: Doctor[];
  onDoctorSelect: (doctor: Doctor) => void;
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors, onDoctorSelect }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    status: '',
    specialization: ''
  });

  const specializations = useMemo(() => {
    const specs = doctors.map(doctor => doctor.specialization);
    return [...new Set(specs)].sort();
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      const matchesQuery = filters.query === '' || 
        doctor.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(filters.query.toLowerCase());

      const matchesStatus = filters.status === '' || doctor.status === filters.status;

      const matchesSpecialization = filters.specialization === '' || 
        doctor.specialization === filters.specialization;

      return matchesQuery && matchesStatus && matchesSpecialization;
    });
  }, [doctors, filters]);

  const availableDoctors = filteredDoctors.filter(doc => doc.status === 'available').length;
  const busyDoctors = filteredDoctors.filter(doc => doc.status === 'busy').length;

  return (
    <div>
      <SearchBar
        filters={filters}
        onFiltersChange={setFilters}
        specializations={specializations}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">{filteredDoctors.length}</h3>
              <p className="text-gray-600">Total Doctors</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">{availableDoctors}</h3>
              <p className="text-gray-600">Available Today</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">{busyDoctors}</h3>
              <p className="text-gray-600">Limited Slots</p>
            </div>
          </div>
        </div>
      </div>

      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDoctors.map(doctor => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onClick={onDoctorSelect}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <SearchIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No doctors found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or filters to find more results.
          </p>
          <button
            onClick={() => setFilters({ query: '', status: '', specialization: '' })}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorList;