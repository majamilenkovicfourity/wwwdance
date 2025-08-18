import client from "../../../backend/pb_hooks/main";

export const getEvents = async () => {
  return await client
    .collection("Events")
    .getFullList()
    .then((res) => {
      const events = res.map((event) => {
        return {
          id: event.id,
          name: event.name,
          date: {
            days: event.date.days,
            month: event.date.month,
            year: event.date.year,
          },
          address: event.address,
          city: event.city,
          image: client.files.getURL(event, event.image),
          document: event.document,
          about: event.about,
          isPdfUploaded: event.isPdfUploaded,
        };
      });
      return events;
    });
};
