import React, { useState, useEffect, memo } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

type ProductType = {
  id: number;
  name: string;
  description: string;
  stock: number;
  category_id: number;
  subCategory_id: number;
  price: number;
  images: string[];
};

// pre-load images
// const preloadImages = (images: string[]) => {
//   images.forEach((image) => {
//     const img = new Image();
//     img.src = image;
//   });
// };

const ProductCard: React.FC<{ product: ProductType }> = memo(({ product }) => {
  const [hidden, setHidden] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ref:pre-load images
  // useEffect(() => {
  //   preloadImages(product.images);
  // }, [product.images]);

  const nextImage = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );

  const prevImage = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );

  const imageUrl = product.images[currentIndex];

  return (
    <div
      className="relative bg-gray-300 rounded-md shadow-md hover:shadow-lg"
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
    >
      <div className="relative">
        <a href={`/product/${product.id}`}>
          <img
            alt={product.name}
            src={imageUrl}
            className="aspect-square w-full rounded-md object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
          />
        </a>
        <ChevronLeftIcon
          onClick={prevImage}
          style={{ opacity: hidden ? 0 : 1, cursor: "pointer" }}
          className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-6 text-white bg-gray-300 transition-opacity duration-300"
        />
        <ChevronRightIcon
          onClick={nextImage}
          style={{ opacity: hidden ? 0 : 1, cursor: "pointer" }}
          className="absolute right-0 top-1/2 -translate-y-1/2 h-12 w-6 text-white bg-gray-300 transition-opacity duration-300"
        />
      </div>
      <div
        className={`relative grid-flow-col grid grid-cols-${product.images.length} transition-opacity duration-300`}
        style={{ opacity: hidden ? 0 : 1, cursor: "pointer" }}
      >
        {product.images.map((_, index) => (
          <div
            key={index}
            className={`h-1 ${
              index === currentIndex ? "bg-black" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
      <div className="px-4 py-2">
        <h3 className="text-sm text-gray-700 font-semibold">{product.name}</h3>
        <p className="text-sm font-medium text-gray-900">${product.price}</p>
      </div>
    </div>
  );
});

export default ProductCard;
