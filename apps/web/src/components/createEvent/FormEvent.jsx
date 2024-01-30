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
import customAxios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '../ui/use-toast';
import { validateEvent } from '@/lib/validation';
import { useState } from 'react';
import useCategories from '@/hooks/useCategories';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useCookies } from 'next-client-cookies';

export default function FormEvent() {
  const router = useRouter();
  const { toast } = useToast();
  const [isFreeEvent, setFreeEvent] = useState(false);
  const [startEvent, setStartEvent] = useState(new Date());
  const [endEvent, setEndEvent] = useState(new Date());
  const cookies = useCookies();
  const token = cookies.get('token');

  const { data: categories, isLoading: loadingCategories } = useCategories();

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
      const res = await customAxios.post(
        '/api/events',
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.data.results;
    },
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      price: 0,
      startEvent: new Date(),
      endEvent: new Date(),
      categoryId: '',
      location: '',
      description: '',
      availableSeat: '',
      eventType: 'PAID',
      image: '',
    },
    validationSchema: validateEvent,
    onSubmit: ({
      name,
      price,
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
            router.push('/event');
            router.refresh();
          },
          onError: (error) => {
            console.log(error);
            toast({
              variant: 'destructive',
              title: 'Failed to create event',
              description:
                error.response?.data?.error || error.response?.data?.message,
            });
          },
        },
      );
    },
  });

  return (
    <section className="py-8 full flex flex-col gap-4 w-full justify-center items-center">
      <span className="text-wrap font-bold  text-center sm:left">
        CREATE EVENT
      </span>
      <form
        onSubmit={formik.handleSubmit}
        className="md:w-1/3 flex flex-col gap-4"
      >
        {/* Name Event */}
        <Input
          name="name"
          type="text"
          placeholder="Name Event"
          className="border-slate-400"
          {...formik.getFieldProps('name')}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-xs text-red-500">{formik.errors.name}</div>
        ) : null}

        {/* Location */}
        <Input
          name="location"
          type="text"
          placeholder="Location"
          className="border-slate-400"
          {...formik.getFieldProps('location')}
        />
        {formik.touched.location && formik.errors.location ? (
          <div className="text-xs text-red-500">{formik.errors.location}</div>
        ) : null}

        {/* Category */}
        <Select
          onValueChange={(value) => {
            formik.setFieldValue('categoryId', value);
          }}
        >
          <SelectTrigger className="text-slate-500 border-slate-400">
            {loadingCategories ? (
              <SelectValue placeholder="Fetching Categories" />
            ) : (
              <SelectValue placeholder="Choose a Category" />
            )}
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category, i) => (
              <SelectItem key={i} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Pick Calendar */}
        <div className="flex flex-row justify-start gap-4 items-center h-[36px] w-full rounded-md bg-white border-solid border-[1px] border-slate-400 px-4 py-2">
          <CalendarDays className="mr-2 h-5 w-5 text-gray-600" />
          <p className="ml-0 whitespace-nowrap text-sm text-gray-500">
            Start Date:
          </p>
          <DatePicker
            className="mx-1 items-center w-[95%] px-0 text-sm"
            name="startEvent"
            selected={startEvent}
            onChange={(date) => setStartEvent(date)}
            showTimeSelect
            timeInputLabel="Time:"
            dateFormat={'yyyy/MM/dd h:mm aa'}
          />
        </div>
        <div className="flex flex-row justify-start gap-4 items-center h-[36px] w-full rounded-md bg-white border-solid border-[1px] border-slate-400 px-4 py-2">
          <CalendarDays className="mr-2 h-5 w-5 text-gray-600" />
          <p className="ml-0 mr-2 whitespace-nowrap text-sm text-gray-500">
            End Date:
          </p>
          <DatePicker
            className="mx-1 items-center w-[95%] px-0 text-sm"
            name="endEvent"
            selected={endEvent}
            onChange={(date) => setEndEvent(date)}
            showTimeSelect
            timeInputLabel="Time:"
            dateFormat={'yyyy/MM/dd h:mm aa'}
          />
        </div>

        {/* Available Seat */}
        <Input
          type="number"
          placeholder="Available Seat"
          name="availableSeat"
          className="border-slate-400"
          {...formik.getFieldProps('availableSeat')}
        />
        {formik.touched.availableSeat && formik.errors.availableSeat ? (
          <div className="text-xs text-red-500">
            {formik.errors.availableSeat}
          </div>
        ) : null}

        {/* Price */}
        <div>
          <Input
            type="number"
            name="price"
            placeholder="Price"
            className="border-slate-400"
            {...formik.getFieldProps('price')}
            disabled={isFreeEvent}
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="text-xs text-red-500 pt-4">
              {formik.errors.price}
            </div>
          ) : null}
          <div className="py-1 flex items-center pt-2">
            <Checkbox
              className="border-slate-400"
              onCheckedChange={(e) => {
                setFreeEvent(e);
                if (e) {
                  formik.setFieldValue('eventType', 'FREE');
                } else {
                  formik.setFieldValue('eventType', 'PAID');
                }
              }}
            />
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
          placeholder="Description"
          type="text"
          name="description"
          className="border-slate-400"
          {...formik.getFieldProps('description')}
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="text-xs text-red-500">
            {formik.errors.description}
          </div>
        ) : null}

        {/* Image Event */}
        <Label htmlFor="picture" className="pb-0">
          Picture
        </Label>
        <Input
          name="picture"
          type="file"
          className="border-slate-400"
          {...formik.getFieldProps('image')}
        />
        {formik.touched.image && formik.errors.image ? (
          <div className="text-xs text-red-500">{formik.errors.image}</div>
        ) : null}

        {/* Button */}
        <Button type="submit" onClick={() => console.log('clicked!')}>
          Submit
        </Button>
      </form>
    </section>
  );
}
