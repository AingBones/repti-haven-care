
export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  gender: 'Male' | 'Female';
  color: string;
  specialNeeds: string[];
  medicalHistory: string[];
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  photo: string;
}

export interface Booking {
  id: string;
  petId: string;
  petName: string;
  ownerName: string;
  ownerPhone: string;
  checkInDate: string;
  checkOutDate: string;
  status: 'Pending' | 'Confirmed' | 'In Care' | 'Completed' | 'Cancelled';
  services: string[];
  totalCost: number;
  notes: string;
  createdAt: string;
}

export interface DailyReport {
  id: string;
  petId: string;
  date: string;
  feeding: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
    notes: string;
  };
  health: {
    temperature: number;
    activity: 'Low' | 'Normal' | 'High';
    appetite: 'Poor' | 'Normal' | 'Good';
    notes: string;
  };
  cleaning: {
    habitat: boolean;
    water: boolean;
    notes: string;
  };
  photos: string[];
  reportedBy: string;
  createdAt: string;
}

export const dummyPets: Pet[] = [
  {
    id: '1',
    name: 'Draco',
    species: 'Bearded Dragon',
    breed: 'Central Bearded Dragon',
    age: 3,
    weight: 450,
    gender: 'Male',
    color: 'Orange/Brown',
    specialNeeds: ['UV light 12 hours daily', 'Temperature 35-40°C'],
    medicalHistory: ['Vaccinated 2024', 'Healthy checkup March 2024'],
    ownerId: 'owner1',
    ownerName: 'Sarah Johnson',
    ownerPhone: '+62 812-1111-1111',
    photo: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400'
  },
  {
    id: '2',
    name: 'Medusa',
    species: 'Ball Python',
    breed: 'Royal Python',
    age: 5,
    weight: 1200,
    gender: 'Female',
    color: 'Brown/Black Pattern',
    specialNeeds: ['Humidity 50-60%', 'Temperature 26-30°C', 'Hide box required'],
    medicalHistory: ['Shed normally', 'No medical issues'],
    ownerId: 'owner2',
    ownerName: 'Michael Chen',
    ownerPhone: '+62 812-2222-2222',
    photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
  },
  {
    id: '3',
    name: 'Verde',
    species: 'Green Iguana',
    breed: 'American Iguana',
    age: 4,
    weight: 2500,
    gender: 'Male',
    color: 'Bright Green',
    specialNeeds: ['UVB lighting', 'High humidity', 'Large enclosure', 'Vegetarian diet'],
    medicalHistory: ['Regular vet checkups', 'Healthy growth'],
    ownerId: 'owner3',
    ownerName: 'Lisa Rodriguez',
    ownerPhone: '+62 812-3333-3333',
    photo: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
  },
  {
    id: '4',
    name: 'Spike',
    species: 'Blue Tongue Skink',
    breed: 'Northern Blue Tongue',
    age: 2,
    weight: 300,
    gender: 'Male',
    color: 'Gray with Blue Tongue',
    specialNeeds: ['Omnivore diet', 'Substrate for burrowing'],
    medicalHistory: ['Recent health check - excellent'],
    ownerId: 'owner4',
    ownerName: 'David Kim',
    ownerPhone: '+62 812-4444-4444',
    photo: 'https://images.unsplash.com/photo-1520637836862-4d197d17c980?w=400'
  },
  {
    id: '5',
    name: 'Cleo',
    species: 'Leopard Gecko',
    breed: 'Common Leopard Gecko',
    age: 1,
    weight: 65,
    gender: 'Female',
    color: 'Yellow with Black Spots',
    specialNeeds: ['Night heating', 'Calcium dusting', 'Shallow water dish'],
    medicalHistory: ['Young and healthy', 'First checkup pending'],
    ownerId: 'owner5',
    ownerName: 'Emma Watson',
    ownerPhone: '+62 812-5555-5555',
    photo: 'https://images.unsplash.com/photo-1597983073243-b8fcc0cc31ec?w=400'
  }
];

export const dummyBookings: Booking[] = [
  {
    id: 'book1',
    petId: '1',
    petName: 'Draco',
    ownerName: 'Sarah Johnson',
    ownerPhone: '+62 812-1111-1111',
    checkInDate: '2024-01-15',
    checkOutDate: '2024-01-22',
    status: 'In Care',
    services: ['Daily Care', 'Health Monitoring', 'Photo Updates'],
    totalCost: 875000,
    notes: 'Loves basking in the morning. Feed crickets every other day.',
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: 'book2',
    petId: '2',
    petName: 'Medusa',
    ownerName: 'Michael Chen',
    ownerPhone: '+62 812-2222-2222',
    checkInDate: '2024-01-20',
    checkOutDate: '2024-01-25',
    status: 'Confirmed',
    services: ['Daily Care', 'Feeding Service'],
    totalCost: 625000,
    notes: 'Shy snake, handle minimally. Feed frozen/thawed mice weekly.',
    createdAt: '2024-01-12T14:30:00Z'
  },
  {
    id: 'book3',
    petId: '3',
    petName: 'Verde',
    ownerName: 'Lisa Rodriguez',
    ownerPhone: '+62 812-3333-3333',
    checkInDate: '2024-01-10',
    checkOutDate: '2024-01-17',
    status: 'Completed',
    services: ['Daily Care', 'Health Monitoring', 'Exercise Time'],
    totalCost: 1050000,
    notes: 'Very active iguana. Loves fresh vegetables and climbing.',
    createdAt: '2024-01-05T09:15:00Z'
  },
  {
    id: 'book4',
    petId: '4',
    petName: 'Spike',
    ownerName: 'David Kim',
    ownerPhone: '+62 812-4444-4444',
    checkInDate: '2024-01-25',
    checkOutDate: '2024-01-30',
    status: 'Pending',
    services: ['Daily Care', 'Special Diet'],
    totalCost: 750000,
    notes: 'Omnivore diet - mix of insects and vegetables.',
    createdAt: '2024-01-18T16:45:00Z'
  },
  {
    id: 'book5',
    petId: '5',
    petName: 'Cleo',
    ownerName: 'Emma Watson',
    ownerPhone: '+62 812-5555-5555',
    checkInDate: '2024-02-01',
    checkOutDate: '2024-02-05',
    status: 'Confirmed',
    services: ['Daily Care', 'Night Heating'],
    totalCost: 500000,
    notes: 'First time boarding. Very gentle gecko, needs calcium supplement.',
    createdAt: '2024-01-20T11:20:00Z'
  }
];

export const dummyReports: DailyReport[] = [
  {
    id: 'report1',
    petId: '1',
    date: '2024-01-15',
    feeding: {
      morning: true,
      afternoon: false,
      evening: true,
      notes: 'Ate 5 crickets in morning, vegetables in evening'
    },
    health: {
      temperature: 37.5,
      activity: 'Normal',
      appetite: 'Good',
      notes: 'Active and alert, good basking behavior'
    },
    cleaning: {
      habitat: true,
      water: true,
      notes: 'Full habitat cleaning and fresh water'
    },
    photos: ['photo1.jpg', 'photo2.jpg'],
    reportedBy: 'Dr. Amanda',
    createdAt: '2024-01-15T18:00:00Z'
  },
  {
    id: 'report2',
    petId: '1',
    date: '2024-01-16',
    feeding: {
      morning: true,
      afternoon: false,
      evening: true,
      notes: 'Mixed diet of insects and leafy greens'
    },
    health: {
      temperature: 38.0,
      activity: 'High',
      appetite: 'Good',
      notes: 'Very active today, spent time climbing'
    },
    cleaning: {
      habitat: false,
      water: true,
      notes: 'Spot cleaning only, fresh water provided'
    },
    photos: ['photo3.jpg'],
    reportedBy: 'Dr. Amanda',
    createdAt: '2024-01-16T18:00:00Z'
  }
];

export const servicePackages = [
  {
    id: 'basic',
    name: 'Basic Care',
    price: 125000,
    duration: 'per day',
    features: [
      'Daily feeding',
      'Habitat maintenance',
      'Basic health check',
      'Daily photo updates'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Care',
    price: 175000,
    duration: 'per day',
    features: [
      'Specialized feeding',
      'Advanced health monitoring',
      'Exercise and enrichment',
      'Detailed daily reports',
      'Video calls available'
    ]
  },
  {
    id: 'medical',
    name: 'Medical Care',
    price: 250000,
    duration: 'per day',
    features: [
      'Veterinary supervision',
      'Medication administration',
      'Special dietary needs',
      'Hourly health monitoring',
      'Emergency care included'
    ]
  }
];

// Statistics for admin dashboard
export const dashboardStats = {
  totalPets: dummyPets.length,
  activBookings: dummyBookings.filter(b => b.status === 'In Care').length,
  monthlyRevenue: 12500000,
  occupancyRate: 75,
  averageStayDuration: 6.2,
  customerSatisfaction: 4.8
};
