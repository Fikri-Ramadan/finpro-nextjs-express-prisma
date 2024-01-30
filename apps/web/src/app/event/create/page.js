import dynamic from 'next/dynamic';

const FormEvent = dynamic(
  () => import('../../../components/createEvent/FormEvent'),
  { ssr: false },
);

const CreateEvent = () => {
  return (
    <>
      <section className="r mt-14 px-16">
        <div>
          <FormEvent />
        </div>
      </section>
    </>
  );
};

export default CreateEvent;
