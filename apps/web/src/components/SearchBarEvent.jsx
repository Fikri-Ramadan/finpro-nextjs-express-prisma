export default function SearchBarEvent() {
  return (
    <section>
      <div className="py-6">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
          {' '}
          <div>
            <select
              id=""
              className="bg-gray-50 border w-40 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
            >
              <option>Event Category</option>
              <option value="">Lorem</option>
              <option value="">Lorem</option>
              <option value="">Lorem</option>
              <option value="">Lorem</option>
            </select>
          </div>
          <div>
            <select
              id=""
              className="bg-gray-50 border w-40 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
            >
              <option>Location</option>
              <option value="">Lorem</option>
              <option value="">Lorem</option>
              <option value="">Lorem</option>
              <option value="">Lorem</option>
            </select>
          </div>
          <div>
            <select
              id=""
              className="bg-gray-50 border w-40 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
            >
              <option>Price</option>
              <option value="">Lorem</option>
              <option value="">Lorem</option>
              <option value="">Lorem</option>
              <option value="">Lorem</option>
            </select>
          </div>
          <div>
            <select
              id=""
              className="bg-gray-50 border w-40 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
            >
              <option>Select Category</option>
              <option value="">Lorem</option>
              <option value="">Lorem</option>
              <option value="">Lorem</option>
              <option value="">Lorem</option>
            </select>
          </div>
          <div className="">
            <button
              type="button"
              className="text-white bg-gray-400 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-12 py-2.5  w-40"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
