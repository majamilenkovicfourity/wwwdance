export type EventData = {
  id?: string;
  name: string;
  date: {
    days: string;
    month: Month;
    year: number;
  };
  address: string;
  city: string;
  imgSrc?: string;
  about: string;
  pdfUploaded: boolean;
};

export enum Month {
  January = "January",
  February = "February",
  March = "March",
  April = "April",
  May = "May",
  June = "June",
  July = "July",
  August = "August",
  September = "September",
  October = "October",
  November = "November",
  December = "December",
}
