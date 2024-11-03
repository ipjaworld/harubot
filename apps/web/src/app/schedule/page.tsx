// src/app/schedule/page.tsx
'use client'

import { api } from '@/app/lib/api';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function SchedulePage() {
  const { data: session } = useSession();
  /**
   * Fixme:
   * 엔티티 정의 후 나중에 타입 정의 필요
   */
  const [schedules, setSchedules] = useState<any[]>([]);

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

  // const createSchedule = async (newSchedule: ICreateScheduleDto) => {
  //   try {
  //     const created = await api.post('/api/schedules', newSchedule);
  //     setSchedules([...schedules, created]);
  //   } catch (error) {
  //     console.error('Failed to create schedule:', error);
  //   }
  // };

  console.log(schedules);

  return (
    <>
      <div>

      </div>
    </>
  );
}