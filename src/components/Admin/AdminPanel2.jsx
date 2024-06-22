"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ServiceCard from "@/components/ui/ServiceCard";
import { subscribeToServicesAndProducts } from "@/firebase/firestore/servicesProducts";
import BackButton from "@/components/ui/BackButton";
import AddServicePopup from "@/components/Admin/Services/AddServicePopup";
import EditServicePopup from "@/components/Admin/Services/EditServicePopup";
import DeleteServicePopup from "@/components/Admin/Services/DeleteServicePopup";
import EditExplorePopup from "@/components/Admin/Explore/EditExplorePopup";
import DeleteExplorePopup from "@/components/Admin/Explore/DeleteExplorePopup";
import AddExplorePopup from "@/components/Admin/Explore/AddExplorePopup";
import { subscribeToExplore } from "@/firebase/firestore/explore";
function AdminPanel2() {
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState(null);
  const [products, setProducts] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [explore, setExplore] = useState();
  const [exploreAdd, setExploreAdd] = useState();
  const [editExploreOpen, setEditExploreOpen] = useState();
  const [deleteExploreOpen, setDeleteExploreOpen] = useState();
  const searchparam = useSearchParams();
  const previous = searchparam.get("previous");
  const type = searchparam.get("type");
  const content1 =
    services &&
    services.map((item) => (
      <ServiceCard
        name={item.name}
        url={item.iconUrl}
        slug={`/admin/level3?previous=${item.id}&beforeprevious=${previous}&type=services`}
      />
    ));
  const content2 =
    products &&
    products.map((item) => (
      <ServiceCard
        name={item.name}
        url={item.iconUrl}
        slug={`/admin/level3?previous=${item.id}&beforeprevious=${previous}&type=products`}
      />
    ));
  const content3 =
    explore &&
    explore.map((item) => (
      <ServiceCard
        name={item.name}
        url={item.iconUrl}
        slug={`/admin/level3?previous=${item.id}&beforeprevious=${previous}&type=explore`}
      />
    ));
  useEffect(() => {
    const unsubscribe1 = subscribeToServicesAndProducts(
      setServices,
      previous,
      null,
      "services"
    );
    const unsubscribe2 = subscribeToServicesAndProducts(
      setProducts,
      previous,
      null,
      "products"
    );
    const unsubscribe3 = subscribeToExplore(setExplore, previous);
    return () => {
      unsubscribe1();
      unsubscribe2();
      unsubscribe3();
    };
  }, []);
  return (
    <div className="p-10">
      <BackButton route="/admin" />
      <div className="flex justify-between items-center mb-14">
        <h1 className=" font-bold text-2xl md:text-4xl mr-10">
          {previous.charAt(0).toUpperCase() + previous.slice(1)}
        </h1>
        <div className="flex gap-x-10">
          {type === "explore" ? (
            <>
              <EditExplorePopup
                open={editExploreOpen}
                setOpen={setEditExploreOpen}
                data={explore}
                rootprevious={null}
                beforeprevious={null}
                previous={previous}
              />
              <DeleteExplorePopup
                open={deleteExploreOpen}
                setOpen={setDeleteExploreOpen}
                data={explore}
                rootprevious={null}
                beforeprevious={null}
                previous={previous}
              />
            </>
          ) : (
            <>
              <EditServicePopup
                open={editOpen}
                setOpen={setEditOpen}
                data={services}
                rootprevious={null}
                beforeprevious={null}
                previous={previous}
                type={type}
              />
              <DeleteServicePopup
                open={deleteOpen}
                setOpen={setDeleteOpen}
                data={services}
                rootprevious={null}
                beforeprevious={null}
                previous={previous}
                type={type}
              />
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 place-items-center gap-y-10 gap-x-10">
        {type == "services" ? content1 : content2}
        {type == "explore" && content3}
        {type == "explore" ? (
          <>
            <AddExplorePopup
              open={exploreAdd}
              setOpen={setExploreAdd}
              beforeprevious={null}
              previous={previous}
            />
          </>
        ) : (
          <>
            <AddServicePopup
              open={open}
              setOpen={setOpen}
              rootprevious={null}
              beforeprevious={null}
              previous={previous}
              type={type}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default AdminPanel2;