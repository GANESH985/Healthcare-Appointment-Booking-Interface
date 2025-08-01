import { Doctor } from '../types';

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'available',
    rating: 4.9,
    experience: 12,
    education: 'MD from Harvard Medical School',
    about: 'Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in treating cardiovascular diseases. She specializes in preventive cardiology and advanced cardiac imaging.',
    availability: [
      {
        date: '2025-01-20',
        slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
      },
      {
        date: '2025-01-21',
        slots: ['09:00', '10:00', '14:00', '15:00']
      },
      {
        date: '2025-01-22',
        slots: ['09:00', '11:00', '14:00', '15:00', '16:00']
      }
    ]
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Neurologist',
    image: 'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'available',
    rating: 4.8,
    experience: 15,
    education: 'MD from Johns Hopkins University',
    about: 'Dr. Michael Chen is a renowned neurologist specializing in epilepsy, stroke, and neurodegenerative diseases. He has published numerous research papers in leading medical journals.',
    availability: [
      {
        date: '2025-01-20',
        slots: ['10:00', '11:00', '15:00', '16:00']
      },
      {
        date: '2025-01-21',
        slots: ['09:00', '10:00', '11:00', '14:00', '15:00']
      },
      {
        date: '2025-01-23',
        slots: ['09:00', '10:00', '14:00', '15:00']
      }
    ]
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrician',
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'busy',
    rating: 4.9,
    experience: 8,
    education: 'MD from Stanford University',
    about: 'Dr. Emily Rodriguez is a compassionate pediatrician who provides comprehensive care for children from infancy through adolescence. She has a special interest in developmental pediatrics.',
    availability: [
      {
        date: '2025-01-22',
        slots: ['14:00', '15:00']
      },
      {
        date: '2025-01-23',
        slots: ['09:00', '10:00', '11:00']
      }
    ]
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialization: 'Orthopedic Surgeon',
    image: 'https://images.pexels.com/photos/6129020/pexels-photo-6129020.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'available',
    rating: 4.7,
    experience: 18,
    education: 'MD from Mayo Clinic',
    about: 'Dr. James Wilson is an experienced orthopedic surgeon specializing in joint replacement, sports medicine, and trauma surgery. He has performed over 3000 successful surgeries.',
    availability: [
      {
        date: '2025-01-20',
        slots: ['09:00', '10:00', '14:00']
      },
      {
        date: '2025-01-21',
        slots: ['11:00', '14:00', '15:00', '16:00']
      },
      {
        date: '2025-01-22',
        slots: ['09:00', '10:00', '11:00', '15:00']
      }
    ]
  },
  {
    id: '5',
    name: 'Dr. Lisa Thompson',
    specialization: 'Dermatologist',
    image: 'https://images.pexels.com/photos/5214413/pexels-photo-5214413.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'on-leave',
    rating: 4.8,
    experience: 10,
    education: 'MD from UCLA Medical School',
    about: 'Dr. Lisa Thompson is a board-certified dermatologist with expertise in medical, surgical, and cosmetic dermatology. She specializes in skin cancer detection and treatment.',
    availability: []
  },
  {
    id: '6',
    name: 'Dr. Robert Kumar',
    specialization: 'Gastroenterologist',
    image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'available',
    rating: 4.6,
    experience: 14,
    education: 'MD from University of Pennsylvania',
    about: 'Dr. Robert Kumar is a skilled gastroenterologist specializing in digestive disorders, liver diseases, and endoscopic procedures. He is known for his patient-centered approach.',
    availability: [
      {
        date: '2025-01-20',
        slots: ['11:00', '14:00', '15:00']
      },
      {
        date: '2025-01-22',
        slots: ['09:00', '10:00', '14:00', '16:00']
      },
      {
        date: '2025-01-23',
        slots: ['10:00', '11:00', '14:00', '15:00']
      }
    ]
  }
];