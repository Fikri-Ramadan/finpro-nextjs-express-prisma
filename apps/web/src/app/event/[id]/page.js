import customAxios from '@/lib/axios'; 
import axios from 'axios';
import Image from 'next/image';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

async function fetchSingleEvent(id) {
  try {
    const res = await customAxios.get(`/api/events/${id}`);
    return {
      name: res?.data?.results.name,
      location: res?.data?.results.location,
      price: res?.data?.results.price,
      description: res?.data?.results.description,
      eventType: res?.data?.results.eventType,
      category: res?.data?.results.category.name,
      organizer: res?.data?.results.organizer.username,
      startDate: (res?.data?.results.startEvent).split('T')[0],
      endDate: (res?.data?.results.endEvent).split('T')[0],
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export default async function EventDetailsPage({ params }) {
  const event = await fetchSingleEvent(params.id);

  return (
    <section className="my-16 mx-10">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={'/banner.jpg'}
            width={1000}
            height={1000}
            alt={event?.name}
            className="h-full min-h-[300px] object-center object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="font-bold uppercase">{event?.name}</h2>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="flex justify-center font-bold items-center text-xs rounded-full bg-green-500/20 px-3 py-0.5 text-green-700">
                  {event?.price
                    ? `Rp.${Intl.NumberFormat('id-ID').format(event?.price)}`
                    : 'FREE'}
                </p>
                <p className="text-sm rounded-full bg-gray-500/10 px-4 py-2.5 text-gray-500">
                  {event?.category}
                </p>
              </div>
              <p className="text-base ml-2 mt-2 sm:mt-0 ">
                by <span className="text-indigo-500">{event?.organizer}</span>
              </p>
            </div>
          </div>
          {/* Checkout Button */}
          <div className="flex flex-col gap-5">
            <div className=" flex gap-2 md:gap-3 items-center">
              <div className='"mx-2 flex items-center"'>
                <FaCalendarAlt />
              </div>
              <div className="text-base lg:text-lg flex flex-wrap items-center justify-center">
                <p>{event?.startDate}</p>
              </div>
            </div>
            <div className="text-base flex items-center gap-2 md:gap-3">
              <div className=" flex items-center justify-center">
                <FaLocationDot />
              </div>
              <p className="text-base lg:text-lg flex-wrap">
                {event?.location}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-bold text-gray-600">Whatt You'll Learn:</p>
            <p className="text-base md:text-lg truncate">
              {event?.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
