import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Appointment } from '../types';

interface AppointmentState {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
}

type AppointmentAction =
  | { type: 'ADD_APPOINTMENT'; payload: Appointment }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CANCEL_APPOINTMENT'; payload: string };

interface AppointmentContextType {
  state: AppointmentState;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => void;
  cancelAppointment: (id: string) => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

const appointmentReducer = (state: AppointmentState, action: AppointmentAction): AppointmentState => {
  switch (action.type) {
    case 'ADD_APPOINTMENT':
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
        loading: false,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'CANCEL_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.map(apt =>
          apt.id === action.payload ? { ...apt, status: 'cancelled' } : apt
        ),
      };
    default:
      return state;
  }
};

const initialState: AppointmentState = {
  appointments: [],
  loading: false,
  error: null,
};

export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appointmentReducer, initialState);

  const addAppointment = (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
  
    setTimeout(() => {
      const newAppointment: Appointment = {
        ...appointmentData,
        id: Date.now().toString(),
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };
      
      dispatch({ type: 'ADD_APPOINTMENT', payload: newAppointment });
    }, 1000);
  };

  const cancelAppointment = (id: string) => {
    dispatch({ type: 'CANCEL_APPOINTMENT', payload: id });
  };

  return (
    <AppointmentContext.Provider value={{ state, addAppointment, cancelAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointment must be used within an AppointmentProvider');
  }
  return context;
};