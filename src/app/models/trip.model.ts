export interface Trip {
  id: string;
  country: Country;
  startDate: Date;
  endDate: Date;
  notes?: string;
}