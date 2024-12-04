import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

type ProductType = {
  id: number;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  color: string;
};

type ProductCardProps = {
  product: ProductType;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [hidden, setHidden] = useState(true);

  return (
    <div
      key={product.id}
      className="relative bg-gray-300 rounded-md"
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
    >
      <div className="relative">
        <img
          alt={product.imageAlt}
          src={product.imageSrc}
          className="aspect-square w-full rounded-md object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
        />

        <ChevronLeftIcon
          style={{ opacity: hidden ? 0 : 1, cursor: "pointer" }}
          className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-6 text-white bg-gray-300"
        />

        <ChevronRightIcon
          style={{ opacity: hidden ? 0 : 1, cursor: "pointer" }}
          className="absolute right-0 top-1/2 -translate-y-1/2 h-12 w-6 text-white bg-gray-300"
        />
      </div>

      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={product.href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.color}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
