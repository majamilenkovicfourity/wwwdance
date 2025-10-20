import { EventData, Month } from './datatype';

export const initData: EventData = {
  id: '',
  about: '',
  date: {
    days: '',
    month: Month.December,
    year: 0,
  },
  address: '',
  location: '',
  image: '',
  name: '',
  isPdfUploaded: false,
};
