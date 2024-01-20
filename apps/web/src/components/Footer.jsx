import Link from 'next/link';
import {
  RiFacebookCircleFill,
  RiGithubFill,
  RiInstagramFill,
  RiTwitterXFill,
} from 'react-icons/ri';

export const Footer = () => {
  return (
    <section className="px-6 py-2 md:px-36 md:py-8 pb-8 flex items-center  bg-gray-400 w-full">
      <div className="flex flex-row justify-center gap-40 w-full ">
        <div className="flex flex-col gap-3 items-center justify-center">
          <span className="font-bold">BRAND LOGO</span>
          <h1>Social Media</h1>
          <div className="flex flex-row gap-3">
            <Link href="/">
              <RiInstagramFill />
            </Link>
            <Link href="/">
              <RiGithubFill />
            </Link>
            <Link href="/">
              <RiTwitterXFill />
            </Link>
            <Link href="/">
              <RiFacebookCircleFill />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Event</h1>
          <div className="text-sm flex flex-col">
            <p>Lorem</p>
            <p>Ipsum</p>
            <p>Dolor</p>
            <p>Sit</p>
            <p>Amet</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Location</h1>
          <div className="text-sm flex flex-col">
            <p>Jakarta</p>
            <p>Bandung</p>
            <p>Yogyakarta</p>
            <p>Malang</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Quick Links</h1>
          <div className="text-sm flex flex-col">
            <p>Home</p>
            <p>Event Lists</p>
            <p>About Us</p>
          </div>
        </div>
      </div>
    </section>
  );
};
