import React from "react";
import { getServicesDocs, getServicesList } from "@/firebase/firestore/getData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import GalleryCarousel from "@/components/GalleryCarousel";

export async function generateStaticParams() {
  const list = await getServicesList(null, null);
  const paths = await Promise.all(
    list.map(async (item) => {
      const list2 = await getServicesList(null, null, item);
      const subPaths = await Promise.all(
        list2.map(async (subitem) => {
          const list3 = await getServicesList(null, item, subitem);
          const subsubPaths = await Promise.all(
            list3.map(async (subitem2) => {
              const list4 = await getServicesList(item, subitem, subitem2);
              return list4.map((subitem3) => ({
                id: item,
                secondid: subitem,
                thirdid: subitem2,
                fourthid: subitem3,
              }));
            })
          );
          return subsubPaths.flat();
        })
      );
      return subPaths.flat();
    })
  );
  return paths.flat();
}

export default async function ServiceLevel4Page({ params }) {
  const { id, secondid, thirdid, fourthid } = params;
  const data = await getServicesDocs(id, secondid, thirdid, fourthid);
  console.log(data);
  return (
    <div>
      <Header />
      <BackButton route="/" />
      <div className="p-6">
        <div className="flex flex-col items-center justify-evenly py-6">
          <img src={data.profilepicture} alt="profile" />
          <h1 className="font-bold text-3xl pt-6">{data.name}</h1>
          <p className="text-grey font-medium">{data.location}</p>
          <p className="text-grey font-medium">{data.district}</p>
          <a
            href={`tel:${data.mobile}`}
            className="my-6 font-medium bg-kaavi text-white rounded-lg p-3 px-4"
          >
            Contact
          </a>
        </div>

        <h1 className="font-koulen text-3xl text-grey pb-4">About</h1>
        <p className="px-4 text-justify">{data.about}</p>

        <h1 className="font-koulen text-3xl py-6 text-grey">Gallery</h1>

        <GalleryCarousel />
        <h1>Reviews</h1>
      </div>

      <Footer />
    </div>
  );
}
