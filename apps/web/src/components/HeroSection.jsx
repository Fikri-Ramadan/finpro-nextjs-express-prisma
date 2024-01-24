import Link from 'next/link';
import Image from 'next/image';
// import hero from '../../public/hero.jpg';

export default function HeroSection() {
  return (
    <section className="bg-cover bg-gray-200 bg-blend-multiply  flex justify-center pt-20 md:pt-0 font-Poppins h-1/3 w-full border">
      <div>
        <Image
          src={'/hero.jpg'}
          alt="hero"
          width={500}
          height={500}
          className="object-contain w-max"
        />
      </div>
    </section>
  );
}
