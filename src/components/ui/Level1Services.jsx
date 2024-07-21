"use client";
import React from "react";
import { useState, useEffect } from "react";
import { subscribeToServicesAndProducts } from "@/firebase/firestore/servicesProducts";
import ServiceCard from "@/components/ui/ServiceCard";

function Level1Services() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const unsubscribe = subscribeToServicesAndProducts(
      setData,
      null,
      null,
      "services"
    );
    return () => unsubscribe();
  }, []);

  return (
    <>
      {data &&
        data.slice(0, 6).map((item) => (
          <div key={item.id} className="mx-auto">
            <ServiceCard
              name={item.id}
              url={item.iconUrl}
              slug={`/services/${item.id}`}
            />
          </div>
        ))}
    </>
  );
}

export default Level1Services;
