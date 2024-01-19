import Image from 'next/image';
import Link from 'next/link';

import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
export default function TestimonialSection() {
  return (
    <section className="md:px-36 md:py-8 p-6 ">
      <div>
        <div className="flex justify-start mx-6">
          <span className="font-bold m-2">Reviews</span>
        </div>
        <div className="flex flex-col items-center justify-center py-4 ">
          <div className="object-cover w-12 h-12 rounded-full bg-gray-500 z-10 ">
            {/* <Image src="/" alt="" width={100} height={100} />{' '} */}
          </div>
          <div className="flex flex-row items-center justify-center">
            <div className="z-10 -mr-2">
              <Link href="/">
                <AiFillLeftCircle />
              </Link>
            </div>
            <div className="text-sm rounded-lg gap-3 flex flex-col items-center justify-center md:w-1/3 bg-gray-200 p-6 pt-8 -z-10 -mt-6">
              <h1 className="font-bold uppercase ">LOREM IPSUM</h1>
              <p className="text-justify">
                Vivamus sit amet turpis leo. Praesent varius eleifend elit, eu
                dictum lectus consequat vitae. Etiam ut dolor id justo fringilla
                finibus.
              </p>
            </div>
            <div className="z-10 -ml-2">
              <Link href="/">
                <AiFillRightCircle />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
