export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  city: string;
  state: string;
  favoriteTeam: string;
  servicesOffered?: Service[];
  travelPlans?: TravelPlan[];
}

interface Service {
  id: number;
  description: string;
  date: string;
  price?: number;
}

interface TravelPlan {
  id: number;
  destination: string;
  date: string;
}
