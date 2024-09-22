export interface Trip {
  id?: string;
  alias?: string;
  country: Country;
  startDate: Date | undefined;
  endDate: Date | undefined;
  notes?: string;
  createdAt: Date;
  userIds: string[];
}