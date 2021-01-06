import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

import ImageCard from "../components/ImageCard";
import ImageSearch from "../components/ImageSearch";

const Index = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");

  const pixabayUrl = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`;

  useEffect(async () => {
    try {
      const res = await fetch(pixabayUrl);
      const data = await res.json();
      setImages(data.hits);
      setIsLoading(false);
      console.log(images);
    } catch (err) {
      console.log(err);
    }
  }, [term]);

  return (
    <div className="container mx-auto py-5">
      {!isLoading && images.length === 0 && (
        <h1 className="text-5xl text-center mx-auto mt-32">No images found!</h1>
      )}

      {isLoading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
      ) : (
        <div>
          <ImageSearch searchText={text => setTerm(text)} />
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-20">
              {images.map(image => {
                return <ImageCard key={image.id} image={image} />;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
