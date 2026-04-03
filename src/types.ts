export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  power: number; // in PS
  imageUrl: string;
  description: string;
}

export const MOCK_CARS: Car[] = [
  {
    id: '1',
    make: 'Porsche',
    model: '911 Carrera S',
    year: 2022,
    price: 145000,
    mileage: 12000,
    fuelType: 'Benzin',
    transmission: 'Automatik',
    power: 450,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop',
    description: 'Top gepflegter Porsche 911 Carrera S in Tiefschwarz Metallic.'
  },
  {
    id: '2',
    make: 'Audi',
    model: 'RS6 Avant',
    year: 2021,
    price: 115000,
    mileage: 25000,
    fuelType: 'Benzin',
    transmission: 'Automatik',
    power: 600,
    imageUrl: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=1000&auto=format&fit=crop',
    description: 'Brachiale Leistung trifft auf Alltagstauglichkeit. RS6 in Nardograu.'
  },
  {
    id: '3',
    make: 'BMW',
    model: 'M4 Competition',
    year: 2023,
    price: 98000,
    mileage: 5000,
    fuelType: 'Benzin',
    transmission: 'Automatik',
    power: 510,
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1000&auto=format&fit=crop',
    description: 'Neuwertiger M4 Competition in Isle of Man Green.'
  },
  {
    id: '4',
    make: 'Mercedes-Benz',
    model: 'G 63 AMG',
    year: 2020,
    price: 185000,
    mileage: 45000,
    fuelType: 'Benzin',
    transmission: 'Automatik',
    power: 585,
    imageUrl: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1000&auto=format&fit=crop',
    description: 'Die Ikone unter den Geländewagen. G63 AMG in Matt-Schwarz.'
  }
];
