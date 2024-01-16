import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className=" bg-bg-hero bg-cover bg-gray-700 bg-blend-multiply mt-16 h-screen flex">
      <div className="flex flex-col items-center justify-center md:flex-row md:px-4 px-8">
        <div className="md:w-1/2 items-center justify-center">
          <Image src="/band.png" width={200} height={200} alt="band" />
        </div>
        <div className="md:w-1/2">
          <div className="py-12 flex flex-col">
            <div>
              <span className="text-xl text-white">
                SBS MTV The Kpop <br /> Show Ticket Package
              </span>
            </div>
            <div className="w-2/3">
              <span className="text-sm text-white">
                Look no further! Our SBS The Show tickets are the simplest way
                for you to experience a live Kpop recording.
              </span>
            </div>
            {/* start button */}
            <div className="flex flex-row items-center h-auto">
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2"
              >
                Get Ticket
              </button>
              <button
                type="button"
                class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 "
              >
                Get More
              </button>
            </div>
            {/* end button */}
          </div>
        </div>
      </div>
    </section>
  );
}
