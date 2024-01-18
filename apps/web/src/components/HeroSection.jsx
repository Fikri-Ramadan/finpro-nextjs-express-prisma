import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className=" bg-cover bg-gray-200 bg-blend-multiply mt-14 flex justify-center pt-20 md:pt-0 font-Poppins">
      <div className="md:pt-64 pb-14 w-auto ">
        <div className="flex items-center justify-center text-2xl py-11 font-bold">
          <span>Lorem ipsum dolor sit amet </span>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-auto">
            <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
              {' '}
              <div>
                <select
                  id=""
                  className="bg-gray-50 border w-56 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
                >
                  <option>Select Category</option>
                  <option value="">Lorem</option>
                  <option value="">Lorem</option>
                  <option value="">Lorem</option>
                  <option value="">Lorem</option>
                </select>
              </div>
              <div>
                <select
                  id=""
                  className="bg-gray-50 border w-56 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
                >
                  <option>Select Location</option>
                  <option value="">Lorem</option>
                  <option value="">Lorem</option>
                  <option value="">Lorem</option>
                  <option value="">Lorem</option>
                </select>
              </div>
              <div className="">
                <button
                  type="button"
                  className="text-white bg-gray-400 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-12 py-2.5  w-56"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
