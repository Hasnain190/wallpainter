"use client";
import Image from "next/image";
import { useState } from "react";

export default function Card({
  service,
}: {
  service: {
    id: string;
    title: string;
    description: string;
    image: string;
  };
}) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  return (
    <div
      key={service.id}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer flex-1 hover:scale-105"
      onClick={() =>
        setSelectedService(selectedService === service.id ? null : service.id)
      }
    >
      {/* Service Image */}
      <div className="relative h-48 w-full">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-110 transition-all duration-300"
        />
      </div>

      {/* Service Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          {service.title}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {service.description}
        </p>
      </div>
    </div>
  );
}
