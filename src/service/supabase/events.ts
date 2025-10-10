import { EventData } from '@utils/datatype';
import { supabase } from './client';
import { sortEvents } from '@utils/dateHelpers';

export async function getEventsSubase() {
  const { data, error } = await supabase.from('events').select('*');
  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }

  return sortEvents(data) as EventData[];
}
