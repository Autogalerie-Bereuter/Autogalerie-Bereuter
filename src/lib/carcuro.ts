
export interface CarcuroCar {
  id: number;
  status: number;
  number: number;
  state: string;
  car_type: string;
  vin: string | null;
  name: string;
  make: string;
  model: string;
  model_meta: string;
  mileage: number;
  power_ps: number;
  power_kw: number;
  initial_registration: string;
  initial_registration_formatted: string;
  description: string;
  description_website?: string;
  fuel_type: string;
  price: number;
  equipments: string[];
  images: string[];
  highlights?: string;
  notes?: string;
  color: string;
  color_name: string;
  interior: string;
  drive_type: string;
  gear_type: string;
  gears: number;
  capacity: number;
  cylinder: number;
  doors: number;
  seats: number;
  accident_free: number;
  consumptions?: {
    urban: number;
    extra_urban: number;
    combined: number;
    emission_class: string;
    emission_sticker: string;
    emission_efficiency_class: string;
    emission_co2_liquid: number;
  };
}

export interface CarcuroResponse {
  success: boolean;
  cars: CarcuroCar[];
}

const CARCURO_API_BASE = 'https://app.carcuro.com/api/inventory/public';

export async function fetchCarcuroCars(token: string, status: 'stock' | 'sold' = 'stock'): Promise<CarcuroCar[]> {
  const url = `${CARCURO_API_BASE}/cars?company_token=${token}&status=${status}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Carcuro API error: ${response.statusText}`);
    }
    
    const data: CarcuroResponse = await response.json();
    if (!data.success) {
      throw new Error('Carcuro API returned success: false');
    }
    
    return data.cars;
  } catch (error) {
    console.error('Error fetching cars from Carcuro:', error);
    throw error;
  }
}
