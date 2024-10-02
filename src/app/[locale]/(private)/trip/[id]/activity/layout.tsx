'use client';

import { CreateActivityStructure } from 'components';
import { ActivityCreationDataProvider } from 'context/ActivityCreationDataContext';

export default function ActivityLayout({ children }: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <ActivityCreationDataProvider>
      <CreateActivityStructure>
        {children}
      </CreateActivityStructure>
    </ActivityCreationDataProvider>
  );
}