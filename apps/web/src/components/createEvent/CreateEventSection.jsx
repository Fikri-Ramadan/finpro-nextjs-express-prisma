import { Label } from '../ui/label';
import FormEvent from './FormEvent';

export default function CreateEventSection() {
  return (
    <>
      <section className="mx-20 md:justify-start items-center py-2">
        <div className="w-full flex flex-col gap-4 md:justify-start justify-center items-center pb-8">
          <div className="">
            <Label className="font-bold text-xl ">
              Please Input Detail of Event
            </Label>
          </div>
          <div className="w-full flex justify-center">
            <FormEvent />
          </div>
        </div>
      </section>
    </>
  );
}
