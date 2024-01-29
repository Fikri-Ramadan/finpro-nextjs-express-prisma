import axios from 'axios';
import Image from 'next/image';

async function fetchSingleEvent(id) {
  try {
    const res = await axios.get(`http://localhost:8000/api/events/${id}`);
    return {
      name: res?.data?.results.name,
      location: res?.data?.results.location,
      price: res?.data?.results.price,
      description: res?.data?.results.description,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export default async function EventDetailsPage({ params }) {
  const event = await fetchSingleEvent(params.id);

  return (
    <section className="py-16 px-10">
      <div className="">
        <div className="flex flex-col items-center justify-center">
          <Image src={'/box.png'} width={200} height={200} alt={event?.name} />
        </div>
        <div className="mt-10 mx-20 flex flex-col gap-3">
          <h1 className="text-3xl font-bold uppercase">{event?.name}</h1>
          <p>{event?.location}</p>
          <p>{event?.price}</p>
        </div>
      </div>
    </section>
  );
}
