import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

type ProductType = {
  id: number;
  name: string;
  description: string;
  stock: number;
  category_id: number;
  subCategory_id?: number; // Made optional
  price: number;
  images: string[]; // Array of image URLs or paths
  created_at?: Date;
  modified_at?: Date;
  deleted_at?: Date; // Made optional for soft deletion compatibility
};

type ProductCardProps = {
  product: ProductType;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  console.log(product);
  const [hidden, setHidden] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex =
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1;
      console.log("Next Image Index:", newIndex);
      return newIndex;
    });
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex =
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1;
      console.log("Previous Image Index:", newIndex);
      return newIndex;
    });
  };

  const imageUrl = product.images[currentIndex];

  return (
    <div
      key={product.id}
      className="relative bg-gray-300 rounded-md"
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
    >
      <div className="relative">
        <img
          alt={product.name}
          src={imageUrl}
          className="aspect-square w-full rounded-md object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
        />

        <ChevronLeftIcon
          onClick={prevImage}
          style={{ opacity: hidden ? 0 : 1, cursor: "pointer" }}
          className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-6 text-white bg-gray-300"
        />
        <ChevronRightIcon
          onClick={nextImage}
          style={{ opacity: hidden ? 0 : 1, cursor: "pointer" }}
          className="absolute right-0 top-1/2 -translate-y-1/2 h-12 w-6 text-white bg-gray-300"
        />
      </div>
      <div
        className={`relative grid-flow-col grid grid-cols-${product.images.length}`}
      >
        {product.images.map((image, index) => (
          <div
            key={index}
            className={`h-1 ${
              index === currentIndex ? "bg-black-2" : "bg-white"
            }`}
          ></div>
        ))}
      </div>
      <div className="my-2 flex justify-between px-4">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href="#">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
          {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
        </div>
        <p className="text-sm font-medium text-gray-900">{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
