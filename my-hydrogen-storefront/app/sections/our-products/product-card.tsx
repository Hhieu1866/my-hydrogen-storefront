import { Money } from "@shopify/hydrogen";
import clsx from "clsx";
import { useState } from "react";
import type { ProductCardFragment } from "storefront-api.generated";
import { Image } from "~/components/image";
import { Link } from "~/components/link";
import { Spinner } from "~/components/spinner";
import { calculateAspectRatio } from "~/utils/image";
import { SaleBadge, SoldOutBadge } from "~/components/product/badges";

// Custom NewBadge component with customizable color
function CustomNewBadge({ backgroundColor = "#000000", textColor = "#ffffff" }) {
  return (
    <div 
      className="flex items-center justify-center px-2 py-1 text-xs font-medium uppercase"
      style={{ backgroundColor, color: textColor }}
    >
      New
    </div>
  );
}

// Check if product is new (published within last 30 days)
function isNewProduct(publishedAt: string): boolean {
  const publishDate = new Date(publishedAt);
  const now = new Date();
  const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
  return publishDate >= thirtyDaysAgo;
}

export function OurProductCard({
  product,
  className,
  newBgColor = "#000000",
  newTextColor = "#ffffff",
}: {
  product: ProductCardFragment;
  className?: string;
  newBgColor?: string;
  newTextColor?: string;
}) {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const { images, priceRange } = product;
  const { minVariantPrice, maxVariantPrice } = priceRange;

  const firstVariant = product.selectedOrFirstAvailableVariant;
  const params = new URLSearchParams();
  if (firstVariant?.selectedOptions) {
    for (const option of firstVariant.selectedOptions) {
      params.set(option.name, option.value);
    }
  }

  const image = images.nodes[0];
  const isOnSale = firstVariant?.compareAtPrice && 
    firstVariant.price.amount < firstVariant.compareAtPrice.amount;
  const isOutOfStock = !firstVariant?.availableForSale;
  const isNew = isNewProduct(product.publishedAt);

  return (
    <div className={clsx("group", className)}>
      <div className="relative overflow-hidden">
        {/* Image */}
        {image && (
          <Link
            to={`/products/${product.handle}?${params.toString()}`}
            prefetch="intent"
            className="block aspect-square overflow-hidden bg-gray-100"
          >
            {/* Loading skeleton overlay */}
            {isImageLoading && <Spinner />}
            <Image
              className="h-full w-full transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
              data={image}
              width={500}
              alt={image.altText || `Picture of ${product.title}`}
              loading="lazy"
              onLoad={() => setIsImageLoading(false)}
            />
          </Link>
        )}

        {/* Badges */}
        <div className="absolute top-2.5 right-2.5 flex gap-1">
          {isNew && (
            <CustomNewBadge backgroundColor={newBgColor} textColor={newTextColor} />
          )}
          {isOnSale && (
            <SaleBadge
              price={firstVariant.price}
              compareAtPrice={firstVariant.compareAtPrice}
            />
          )}
          {isOutOfStock && <SoldOutBadge />}
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-3 space-y-1 text-left">
        <Link
          to={`/products/${product.handle}?${params.toString()}`}
          prefetch="intent"
          className="block font-medium text-gray-900 hover:underline"
        >
          {product.title}
        </Link>
        
        <div className="text-sm">
          <Money withoutTrailingZeros data={minVariantPrice} />
          {isOnSale && firstVariant?.compareAtPrice && (
            <span className="ml-2 text-gray-500 line-through">
              <Money withoutTrailingZeros data={firstVariant.compareAtPrice} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
