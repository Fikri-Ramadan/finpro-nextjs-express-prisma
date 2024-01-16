import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (

    <section className=" bg-bg-hero bg-cover bg-gray-700 bg-blend-multiply mt-14 h-screen flex justify-center pt-20 md:pt-0">
      <div className="flex flex-col md:items-center md:justify-center md:flex-row md:px-4 ">
        <div className="md:w-1/2 md:h-auto flex items-center justify-center">
          <div className=" ">
            <Image src="/band.png" width={400} height={400} alt="band" />
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="py-12 flex flex-col md:w-2/3 mx-6 md:mx-0">
            <div className="">

              <span className="text-xl text-white">
                SBS MTV The Kpop <br /> Show Ticket Package
              </span>
            </div>
            <div className="">
              <span className="text-sm text-white">
                Look no further! Our SBS The Show tickets are the simplest way
                for you to experience a live Kpop recording.
              </span>
            </div>
            {/* start button */}
            <div className="flex flex-row items-center h-auto">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-white font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2"
              >
                Get Ticket
              </button>
              <button
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-300 focus:ring-1 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 "
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
