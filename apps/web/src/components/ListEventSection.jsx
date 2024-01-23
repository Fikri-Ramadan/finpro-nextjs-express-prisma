import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';

export default async function ListEventSection() {
  const res = await axios.get('http://localhost:8000/api/events');
  const events = await res?.data?.results;
  console.log(events);
  // const router = useRouter();
  return (
    <section className="md:px-36 md:py-8">
      <div className="px-6 mx-auto flex flex-row justify-between items-center">
        <span className="font-bold">Event List</span>
        <p className="text-xs">View All (99)</p>
      </div>
      <div className="p-6 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Start Product */}
        {events.map((event, i) => (
          <Link href={`/event/${event.id}`} key={i}>
            <article className="">
              <div className="flex flex-col shadow-lg bg-gray-50 p-10 items-center border rounded-xl">
                <a href="#">
                  <Image src={'/band.png'} alt="" width={100} height={100} />
                </a>
              </div>
              <div className="flex flex-row gap-3  justify-start  p-1 items-center">
                <h3 className="  py-1 text-sm leadi uppercase w-auto">
                  {event.name},
                </h3>
                <p className="font-bold text-sm italic">{event.location}</p>
              </div>
              <div className="flex flex-col flex-1 px-1 py-0">
                <h3 className="flex-1 py-0 text-base font-semibold leadi uppercase">
                  {event.title}
                </h3>
              </div>
            </article>
          </Link>
        ))}

        {/* End Product */}
      </div>
    </section>
  );
}
