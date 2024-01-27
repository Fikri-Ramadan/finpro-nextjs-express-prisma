// 'use client';

// import { Label } from '../ui/label';
// import { Input } from '../ui/input';
// import { Button } from '../ui/button';
// import { CalendarDays } from 'lucide-react';
// import { Textarea } from '../ui/textarea';
// import { useFormik } from 'formik';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { useState } from 'react';
// import { Checkbox } from '../ui/checkbox';
// import Dropdown from './Categories';
// import { axiosInstance } from '@/lib/axios';
// import { useRouter } from 'next/navigation';
// import { useMutation } from '@tanstack/react-query';

// export default function FormEvent() {
//   const router = useRouter();
//   const [event, setEvent] = useState('');

//   const { mutate } = useMutation({
//     mutationFn: async ({
//       name,
//       price,
//       location,
//       categories,
//       startEvent,
//       endEvent,
//       availableSeat,
//       description,
//     }) => {
//       const res = await axiosInstance.post('/events', {
//         name,
//         price,
//         location,
//         categories,
//         startEvent,
//         endEvent,
//         availableSeat,
//         description,
//       });
//       return res.data;
//     },
//   });
//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       price: '',
//       location: '',
//       categories: '',
//       startEvent: '',
//       endEvent: '',
//       availableSeat: '',
//       description: '',
//     },
//     onSubmit: ({
//       name,
//       price,
//       location,
//       categories,
//       startEvent,
//       endEvent,
//       availableSeat,
//       description,
//     }) => {},
//   //   mutate (
//   //     {name, price, location, categories, startEvent, endEvent, availableSeat, description},
//   //   )
//   // });

//   const handleFormInput = async (event) => {
//     formik.setFieldValue(event.target.name, event.target.value);
//     try {
//       const response = await axiosInstance.post('/events', {
//         name,
//         price,
//         location,
//         categories,
//         startEvent,
//         endEvent,
//         availableSeat,
//         description,
//       });
//       router.push('/');
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   // const [startDate, setStartDate] = useState(new Date());
//   // const [endDate, setEndDate] = useState(new Date());

//   return (
//     <section className="py-8 full flex flex-col gap-4 w-full justify-center items-center">
//       <form
//         onSubmit={formik.handleSubmit}
//         className="md:w-1/3 flex flex-col gap-4"
//       >
//         {/* Name Event */}
//         <Input
//           onChange={handleFormInput}
//           name="name"
//           placeholder="Name Event"
//         />
//         <span>{formik.values.categories}</span>

//         {/* Location */}
//         <Input
//           onChange={handleFormInput}
//           name="location"
//           placeholder="Location"
//           id="location"
//         />

//         {/* Categories */}
//         <Dropdown name="categories" onChange={handleFormInput} />

//         {/* Pick Calendar */}
//         {/* <div className="flex flex-row justify-start gap-4 items-center h-[36px] w-full rounded-md bg-white border-solid border-[1px] border-gray-200 px-4 py-2">
//           <CalendarDays className="mr-2 h-5 w-5 text-gray-600" />
//           <p className="ml-0 whitespace-nowrap text-sm text-gray-500">
//             Start Date:
//           </p>
//           <DatePicker
//             className="mx-1 items-center w-[95%] px-0 text-sm"
//             name="startEvent"
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             showTimeSelect
//             timeInputLabel="Time:"
//             dateFormat={'yyyy/MM/dd h:mm aa'}
//           />
//         </div>
//         <div className="flex flex-row justify-start gap-4 items-center h-[36px] w-full rounded-md bg-white border-solid border-[1px] border-gray-200 px-4 py-2">
//           <CalendarDays className="mr-2 h-5 w-5 text-gray-600" />
//           <p className="ml-0 mr-2 whitespace-nowrap text-sm text-gray-500">
//             End Date:
//           </p>
//           <DatePicker
//             className="mx-1 items-center w-[95%] px-0 text-sm"
//             name="endEvent"
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             showTimeSelect
//             timeInputLabel="Time:"
//             dateFormat={'yyyy/MM/dd h:mm aa'}
//           />
//         </div> */}

//         {/* Available Seat */}
//         <Input
//           onChange={handleFormInput}
//           type="number"
//           name="seat"
//           placeholder="Seat"
//           id="location"
//         />

//         {/* Price */}
//         <div>
//           <Input
//             onChange={handleFormInput}
//             type="number"
//             name="price"
//             placeholder="Price"
//             id="price"
//           />
//           <div className="py-1 items-center flex px-2">
//             <Checkbox onChange={handleFormInput} />
//             <label
//               htmlFor="price"
//               className="ml-2 whitespace-nowrap leading-none text-xs peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500"
//             >
//               Free Ticket
//             </label>
//           </div>
//         </div>

//         {/* Description Event */}
//         <Textarea
//           onChange={handleFormInput}
//           name="description"
//           placeholder="Description"
//           id="description"
//         />

//         {/* Image Event */}
//         <Label htmlFor="picture" className="pb-0">
//           Picture
//         </Label>
//         <Input onChange={handleFormInput} id="picture" type="file" />

//         {/* Button */}
//         <Button type="submit">Submit</Button>
//       </form>
//     </section>
//   );
// }
