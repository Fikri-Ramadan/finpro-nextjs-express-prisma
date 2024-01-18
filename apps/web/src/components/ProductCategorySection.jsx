import Link from 'next/link';
import Image from 'next/image';

export default function ProductCategorySection() {
  return (
    <section className="md:px-36 md:py-8 bg-gray-100 text-gray-800">
      <div className=" container p-6 mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div className="font-bold">
            <span>Browse By Category</span>
          </div>
          <div className="text-sm">
            <Link href="/">View All (10)</Link>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Start Product */}
          <article className="">
            <div className="flex flex-col shadow-lg bg-gray-50 p-10 items-center border rounded-xl">
              <a href="#">
                <Image src="/box.png" alt="" width={100} height={100} />
              </a>
            </div>
            <div className="flex flex-col flex-1 p-1">
              <h3 className="flex-1 py-2 text-base font-semibold leadi uppercase">
                Lorem Ipsum Dolor
              </h3>
            </div>
          </article>
          {/* End Product */}
        </div>
      </div>

      {/* Start Pagination */}
      <div>
        <div className="flex justify-center space-x-1 text-gray-800">
          <button
            title="previous"
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md bg-gray-50 border-gray-100"
          >
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            type="button"
            title="Page 1"
            className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md bg-gray-50 text-indigo-600 border-indigo-600"
          >
            1
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md bg-gray-50 border-gray-100"
            title="Page 2"
          >
            2
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md bg-gray-50 border-gray-100"
            title="Page 3"
          >
            3
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md bg-gray-50 border-gray-100"
            title="Page 4"
          >
            4
          </button>
          <button
            title="next"
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md bg-gray-50 border-gray-100"
          >
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
