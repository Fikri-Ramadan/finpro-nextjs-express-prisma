import Image from 'next/image';

export default function ListEventSection() {
  const eventLists = [
    {
      id: 1,
      name: 'Event 1',
      location: 'Jakarta',
      title: 'Lorem Ipsum Dolor',
      image: '/box.png',
    },
    {
      id: 2,
      name: 'Event 2',
      location: 'Jakarta',
      title: 'Lorem Ipsum Dolor',
      image: '/box.png',
    },
    {
      id: 3,
      name: 'Event 3',
      location: 'Jakarta',
      title: 'Lorem Ipsum Dolor',
      image: '/box.png',
    },
    {
      id: 4,
      name: 'Event 4',
      location: 'Jakarta',
      title: 'Lorem Ipsum Dolor',
      image: '/box.png',
    },
    {
      id: 5,
      name: 'Event 5',
      location: 'Jakarta',
      title: 'Lorem Ipsum Dolor',
      image: '/box.png',
    },
    {
      id: 6,
      name: 'Event 6',
      location: 'Jakarta',
      title: 'Lorem Ipsum Dolor',
      image: '/box.png',
    },
    {
      id: 7,
      name: 'Event 7',
      location: 'Jakarta',
      title: 'Lorem Ipsum Dolor',
      image: '/box.png',
    },
    {
      id: 8,
      name: 'Event 8',
      location: 'Jakarta',
      title: 'Lorem Ipsum Dolor',
      image: '/box.png',
    },
    {
      id: 9,
      name: 'Event 9',
      location: 'Jakarta',
      title: 'Lorem Ipsum Dolor',
      image: '/box.png',
    },
    {
      id: 10,
      name: 'Event 10',
      location: 'Jakarta',
      title: 'Lorem Ipsum Dolor',
      image: '/box.png',
    },
    {
      id: 11,
      name: 'Event 11',
      location: 'Jakarta',
      title: 'Lorem Ipsum Dolor',
      image: '/box.png',
    },
    {
      id: 12,
      name: 'Event 12',
      location: 'Jakarta',
      title: 'Lorem Ipsum Dolor',
      image: '/box.png',
    },
  ];
  return (
    <section className="md:px-36 md:py-8">
      <div className="px-6 mx-auto flex flex-row justify-between items-center">
        <span className="font-bold">Event List</span>
        <p className="text-xs">View All (99)</p>
      </div>
      <div className="p-6 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Start Product */}
        {eventLists.map((event, i) => (
          <article key={i} className="">
            <div className="flex flex-col shadow-lg bg-gray-50 p-10 items-center border rounded-xl">
              <a href="#">
                <Image src={event.image} alt="" width={100} height={100} />
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
        ))}

        {/* End Product */}
      </div>
    </section>
  );
}
