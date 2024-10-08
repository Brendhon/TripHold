export interface Trip {
  id?: string;
  alias?: string;
  country: Country;
  startDate: DateType;
  endDate: DateType;
  notes?: string;
  createdAt: Date;
  userIds: string[];
}

export interface TripDayRange {
  id: number;
  startDate: DateType;
  endDate: DateType;
}