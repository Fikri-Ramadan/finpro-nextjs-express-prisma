'use client';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { CalendarDays } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { useFormik } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Checkbox } from '../ui/checkbox';
import Dropdown from './Categories';
import customAxios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '../ui/use-toast';
import { validateEvent } from '@/lib/validationEvent';

export default function FormEvent() {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: async ({
      name,
      price,
      startEvent,
      endEvent,
      categoryId,
      location,
      description,
      availableSeat,
      eventType,
    }) => {
      const res = await customAxios.post('/api/events', {
        name,
        price,
        startEvent,
        endEvent,
        categoryId,
        location,
        description,
        availableSeat,
        eventType,
      });
      console.log(res.data.results);
    },
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      startEvent: '2024-01-23T13:14:47.415Z',
      endEvent: '2024-01-23T13:14:47.415Z',
      categoryId: 'clrw5nz0o0003es9w8kqpsz1u',
      location: '',
      description: '',
      availableSeat: '',
      eventType: 'PAID',
    },
    validationSchema: validateEvent,
    onSubmit: ({
      name,
      price,
      startEvent,
      endEvent,
      categoryId,
      location,
      description,
      availableSeat,
      eventType,
    }) => {
      mutate(
        {
          name,
          price,
          startEvent,
          endEvent,
          categoryId,
          location,
          description,
          availableSeat,
          eventType,
        },
        {
          onSuccess: () => {
            toast({
              variant: 'success',
              title: 'Event created successfully',
              description: 'Event created successfully',
            });
            router.push('/events');
          },
          onError: () => {
            toast({
              variant: 'destructive',
              title: 'Failed to create event',
              description: 'Failed to create event',
            });
          },
        },
      );
    },
  });

  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());

  return (
    <section className="py-8 full flex flex-col gap-4 w-full justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="md:w-1/3 flex flex-col gap-4"
      >
        {/* Name Event */}
        <Input
          onChange={formik.handleChange}
          name="name"
          placeholder="Name Event"
        />
        <span>{formik.values.name}</span>

        {/* Location */}
        <Input
          onChange={formik.handleChange}
          name="location"
          placeholder="Location"
        />

        {/* Categories */}
        <Dropdown name="categories" onChange={formik.handleChange} />

        {/* Pick Calendar */}
        {/* <div className="flex flex-row justify-start gap-4 items-center h-[36px] w-full rounded-md bg-white border-solid border-[1px] border-gray-200 px-4 py-2">
          <CalendarDays className="mr-2 h-5 w-5 text-gray-600" />
          <p className="ml-0 whitespace-nowrap text-sm text-gray-500">
            Start Date:
          </p>
          <DatePicker
            className="mx-1 items-center w-[95%] px-0 text-sm"
            name="startEvent"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeInputLabel="Time:"
            dateFormat={'yyyy/MM/dd h:mm aa'}
          />
        </div>
        <div className="flex flex-row justify-start gap-4 items-center h-[36px] w-full rounded-md bg-white border-solid border-[1px] border-gray-200 px-4 py-2">
          <CalendarDays className="mr-2 h-5 w-5 text-gray-600" />
          <p className="ml-0 mr-2 whitespace-nowrap text-sm text-gray-500">
            End Date:
          </p>
          <DatePicker
            className="mx-1 items-center w-[95%] px-0 text-sm"
            name="endEvent"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            timeInputLabel="Time:"
            dateFormat={'yyyy/MM/dd h:mm aa'}
          />
        </div> */}

        {/* Available Seat */}
        <Input
          onChange={formik.handleChange}
          type="number"
          placeholder="Seat"
          name="seat"
        />

        {/* Price */}
        <div>
          <Input
            onChange={formik.handleChange}
            type="number"
            name="price"
            placeholder="Price"
          />
          <div className="py-1 items-center flex px-2">
            <Checkbox onChange={formik.handleChange} />
            <label
              htmlFor="price"
              className="ml-2 whitespace-nowrap leading-none text-xs peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500"
            >
              Free Ticket
            </label>
          </div>
        </div>

        {/* Description Event */}
        <Textarea
          onChange={formik.handleChange}
          placeholder="Description"
          name="description"
        />

        {/* Image Event */}
        <Label htmlFor="picture" className="pb-0">
          Picture
        </Label>
        <Input onChange={formik.handleChange} name="picture" type="file" />

        {/* Button */}
        <Button type="submit">Submit</Button>
      </form>
    </section>
  );
}
