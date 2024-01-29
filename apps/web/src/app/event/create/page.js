import dynamic from 'next/dynamic';

const FormEvent = dynamic(() => import('../../../components/createEvent/FormEvent'), { ssr: false })

const CreateEvent = () => {
  return (
    <>
      <section className="bg-gray-100 bg-cover bg-center py-4 md:py10 px-16">
        <h3 className="text-wrap font-bold text-center sm:left">
          Create Event
        </h3>
      </section>
      <div>
        <FormEvent />
      </div>
    </>
  );
};

export default CreateEvent;
