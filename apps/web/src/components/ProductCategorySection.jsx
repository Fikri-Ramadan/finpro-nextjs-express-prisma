import Link from 'next/link';
import Image from 'next/image';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function ProductCategorySection({ apiEvents }) {
  return (
    <section className="md:px-36 md:py-8 bg-gray-50 text-gray-800">
      <div className=" container p-6 mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div className="font-bold">
            <span>Browse By Category</span>
          </div>
          <div className="text-sm">
            <Link href="/">View All (10)</Link>
          </div>
        </div>
        <div className="grid grid-cols-3 md:text-base text-xs gap-x-4 gap-y-8 md:grid-cols-4 lg:grid-cols-4">
          {/* Start Product */}

          {apiEvents.map((event, i) => (
            <article key={i} className="">
              <div className="flex flex-col shadow-lg bg-gray-50 p-10 items-center border rounded-xl">
                <a href="#">
                  <Image
                    src={event.image || '/banner.jpg'}
                    alt=""
                    width={100}
                    height={100}
                  />
                </a>
              </div>
              <div className="flex flex-col flex-1 p-1">
                <h3 className="flex-1 py-2 text-base font-semibold leadi uppercase">
                  {event.name}
                </h3>
              </div>
            </article>
          ))}
          {/* End Product */}
        </div>
      </div>
      {/* Start Pagination */}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
