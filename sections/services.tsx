import Card from "@/components/Card";
import { SERVICES } from "@/constants";

export default function Services() {
  const services = SERVICES.slice(0, 6);

  return (
    <section className="qualities-section sm:py-12 sm:px-4 sm:m-5 sm:mx-16 ">
      <h1 className="font-bold text-center my-8 p-7 text-5xl sm:text-7xl">
        Our Most Popular Services
      </h1>
      <div className="services-card-container  flex flex-col md:flex-row gap-6 px-4 container mx-auto">
        {services.map((service) => (
          <Card key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
