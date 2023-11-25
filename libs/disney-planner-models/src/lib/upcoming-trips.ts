const DISNEY_PARK_MAP = {  
  epcot: 'Epcot',
  studios: 'Hollywood Studios',
  animal: 'Animal Kingdom',
  magic: 'Magic Kingdom',
}

export type DisneyPark = keyof typeof DISNEY_PARK_MAP;

export interface UpcomingTrip {
  date: string;
  park: DisneyPark;
}
