import { getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { fetchAllImages } from "../../services";

export const ImageGrid = () => {
  const [imgs, setImgs] = useState<string[]>([]);
  const getUrlsFromImages = async () => {
    try {
      const images = await fetchAllImages();
      images.items.forEach(async (img) => {
        const url = await getDownloadURL(img);
        setImgs((value) => [...value, url]);
      });
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getUrlsFromImages();
  }, []);
  return (
    <div className="grid grid-cols-4 gap-2">
      {imgs
        ? imgs.map((img, index) => {
            return <img className="bg-center w-[200px]" key={index} src={img} alt="img"/>;
          })
        : null}
    </div>
  );
};