import EventForm from '@/components/event/eventForm';

const CreateEvent = () => {
  return (
    <>
      <section className="bg-gray-100 bg-cover bg-center py-8 px-16">
        <h3 className="text-wrap font-bold text-center sm:left">
          Create Event
        </h3>
      </section>
      <div className="my-8">
        <EventForm />
      </div>
    </>
  );
};

export default CreateEvent;
