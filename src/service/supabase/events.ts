import { supabase } from './client';

export async function getEventsSubase() {
  const { data, error } = await supabase.from('events').select('*');
  console.log('DATA: ', data);
  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }
  return data;
}
