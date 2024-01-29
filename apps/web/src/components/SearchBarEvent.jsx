'use client';

import { useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';

export default function SearchBarEvent() {
  const searchRef = useRef();
  const router = useRouter();
  const [debounce] = useDebounce(searchRef.current?.value, 100);
  const handleSearch = (e) => {
    e.preventDefault();
    const encodedSearchQuery = encodeURI(debounce);
    router.push(`/event/search?name=${encodedSearchQuery}`);
    // router.refresh();
  };

  return (
    <section>
      <form>
        <div className="py-10 ">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
            <div>
              <span className="font-bold text-2xl">EVENT</span>
            </div>
            <div className="max-w-full">
              <Input
                type="text"
                placeholder="Search Event..."
                className="w-[400px]"
                ref={searchRef}
                onChange={handleSearch}
              />
            </div>
            <div className="">
              <Button onClick={handleSearch}>Search</Button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
