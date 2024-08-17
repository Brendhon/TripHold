export interface Trip {
  id?: string;
  country: Country;
  startDate: Date | undefined;
  endDate: Date | undefined;
  notes?: string;
  createdAt: Date;
  userIds: string[];
}