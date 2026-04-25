import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface VehicleState {
  make: string;
  model: string;
  year: string;
  engine: string;
  transmission: string;
  trim: string;
  vin: string;
  setMake: (make: string) => void;
  setModel: (model: string) => void;
  setYear: (year: string) => void;
  setEngine: (engine: string) => void;
  setTransmission: (transmission: string) => void;
  setTrim: (trim: string) => void;
  setVin: (vin: string) => void;
  reset: () => void;
}

export const useVehicleStore = create<VehicleState>()(
  persist(
    (set) => ({
      make: '',
      model: '',
      year: '',
      engine: '',
      transmission: '',
      trim: '',
      vin: '',
      setMake: (make) => set({ make, model: '', year: '', engine: '', transmission: '', trim: '', vin: '' }),
      setModel: (model) => set({ model, year: '', engine: '', transmission: '', trim: '', vin: '' }),
      setYear: (year) => set({ year, engine: '', transmission: '', trim: '', vin: '' }),
      setEngine: (engine) => set({ engine, transmission: '', trim: '', vin: '' }),
      setTransmission: (transmission) => set({ transmission, trim: '', vin: '' }),
      setTrim: (trim) => set({ trim, vin: '' }),
      setVin: (vin) => set({ vin, make: '', model: '', year: '', engine: '', transmission: '', trim: '' }),
      reset: () => set({ make: '', model: '', year: '', engine: '', transmission: '', trim: '', vin: '' }),
    }),
    {
      name: 'vehicle-storage',
    }
  )
);
