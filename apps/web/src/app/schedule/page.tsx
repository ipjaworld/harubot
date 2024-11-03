// src/app/schedule/page.tsx
'use client'

import { api } from '@/lib/api';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function SchedulePage() {
  const { data: session } = useSession();
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    async function loadSchedules() {
      if (session) {
        try {
          const data = await api.get('/api/schedules');
          setSchedules(data);
        } catch (error) {
          console.error('Failed to load schedules:', error);
        }
      }
    }

    loadSchedules();
  }, [session]);

  const createSchedule = async (newSchedule: any) => {
    try {
      const created = await api.post('/api/schedules', newSchedule);
      setSchedules([...schedules, created]);
    } catch (error) {
      console.error('Failed to create schedule:', error);
    }
  };

  return (
    // UI 구현
  );
}