import { createSchema, type ComponentLoaderArgs } from "@weaverse/hydrogen";
import clsx from "clsx";
import { forwardRef } from "react";
import { layoutInputs, Section, type SectionProps } from "~/components/section";
import { PRODUCT_CARD_FRAGMENT } from "~/graphql/fragments";
import type { ProductQuery } from "storefront-api.generated";
import { OurProductCard } from "./product-card";

interface OurProductsProps extends SectionProps {
  heading?: string;
  description?: string;
  headingTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  headingWeight?: "400" | "500" | "600" | "700" | "800" | "900";
  headerSpacing?: number;
  contentSpacing?: number;
  productsCount?: number;
  columnDesktop?: number;
  columnsMobile?: number;
  showViewAll?: boolean;
  viewAllText?: string;
  viewAllLink?: string;
  sortBy?: "BEST_SELLING" | "CREATED_AT" | "PRICE" | "PRICE_DESC";
  paddingTop?: number;
  paddingBottom?: number;
  newBgColor?: string;
  newTextColor?: string;
}

const OurProducts = forwardRef<HTMLElement, OurProductsProps>((props, ref) => {
  const {
    heading,
    description,
    headingTag = "h4",
    headingWeight = "700",
    headerSpacing = 24,
    contentSpacing = 32,
    productsCount = 6,
    columnDesktop = 3,
    columnsMobile = 2,
    showViewAll = true,
    viewAllText = "View all products",
    viewAllLink = "/products",
    paddingTop = 40,
    paddingBottom = 40,
    newBgColor = "#000000",
    newTextColor = "#ffffff",
    loaderData,
    ...rest
  } = props;

  const products = loaderData?.products?.nodes;

  const sectionStyle = {
    paddingTop: `${paddingTop}px`,
    paddingBottom: `${paddingBottom}px`,
  };

  // Grid classes mapping
  const mobileClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
  };

  const desktopClasses = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    5: "md:grid-cols-5",
    6: "md:grid-cols-6",
  };

  const gridClasses = clsx(
    "grid gap-4",
    mobileClasses[columnsMobile as keyof typeof mobileClasses],
    desktopClasses[columnDesktop as keyof typeof desktopClasses],
  );

  // Font weight mapping
  const fontWeightClasses = {
    "400": "font-normal",
    "500": "font-medium",
    "600": "font-semibold",
    "700": "font-bold",
    "800": "font-extrabold",
    "900": "font-black",
  };

  return (
    <Section ref={ref} {...rest} style={sectionStyle}>
      <div className="container mx-auto px-4">
        {/* header */}
        <div
          className="text-center"
          style={{ marginBottom: `${headerSpacing}px` }}
        >
          {heading && (
            <div
              className={clsx(
                "text-3xl md:text-4xl mb-4",
                fontWeightClasses[headingWeight],
              )}
            >
              {headingTag === "h1" && <h1>{heading}</h1>}
              {headingTag === "h2" && <h2>{heading}</h2>}
              {headingTag === "h3" && <h3>{heading}</h3>}
              {headingTag === "h4" && <h4>{heading}</h4>}
              {headingTag === "h5" && <h5>{heading}</h5>}
              {headingTag === "h6" && <h6>{heading}</h6>}
            </div>
          )}

          {description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* products grid */}
        <div
          style={{ marginBottom: showViewAll ? `${contentSpacing}px` : "0" }}
        >
          {products && products.length > 0 ? (
            <div className={gridClasses}>
              {products.slice(0, productsCount).map((product) => (
                <OurProductCard
                  key={product.id}
                  product={product}
                  className="w-full"
                  newBgColor={newBgColor}
                  newTextColor={newTextColor}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </div>

        {/* view all btn */}
        {showViewAll && products && products.length > 0 && (
          <div className="text-center mt-8">
            <a
              href={viewAllLink}
              className="inline-block bg-black text-white border border-black uppercase px-8 py-3 font-semibold hover:bg-white hover:text-black transition-colors tracking-wider"
            >
              {viewAllText}
            </a>
          </div>
        )}
      </div>
    </Section>
  );
});

export default OurProducts;

// graphql Query
const OUR_PRODUCTS_QUERY = `#graphql
  query OurProducts(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $sortKey: ProductSortKeys
  ) @inContext(country: $country, language: $language) {
    products(first: $first, sortKey: $sortKey) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

export type OurProductsLoaderData = Awaited<ReturnType<typeof loader>>;

export const loader = async ({
  weaverse,
  data,
}: ComponentLoaderArgs<OurProductsProps>) => {
  const { storefront } = weaverse;
  const { productsCount = 6, sortBy = "BEST_SELLING" } = data;

  const { language, country } = storefront.i18n;

  return await storefront.query<ProductQuery>(OUR_PRODUCTS_QUERY, {
    variables: {
      country,
      language,
      first: productsCount,
      sortKey: sortBy,
    },
    cache: storefront.CacheLong(),
  });
};

export const schema = createSchema({
  type: "our-products",
  title: "Our Products",
  settings: [
    {
      group: "Content",
      inputs: [
        {
          type: "text",
          name: "heading",
          label: "Heading",
          defaultValue: "Our Products",
          placeholder: "Enter section heading",
        },
        {
          type: "select",
          name: "headingTag",
          label: "HTML tag",
          defaultValue: "h4",
          configs: {
            options: [
              { value: "h1", label: "<h1> (Heading 1)" },
              { value: "h2", label: "<h2> (Heading 2)" },
              { value: "h3", label: "<h3> (Heading 3)" },
              { value: "h4", label: "<h4> (Heading 4)" },
              { value: "h5", label: "<h5> (Heading 5)" },
              { value: "h6", label: "<h6> (Heading 6)" },
            ],
          },
        },
        {
          type: "select",
          name: "headingWeight",
          label: "Weight",
          defaultValue: "700",
          configs: {
            options: [
              { value: "400", label: "400 - Normal" },
              { value: "500", label: "500 - Medium" },
              { value: "600", label: "600 - Semi Bold" },
              { value: "700", label: "700 - Bold" },
              { value: "800", label: "800 - Extra Bold" },
              { value: "900", label: "900 - Black" },
            ],
          },
        },

        {
          type: "textarea",
          name: "description",
          label: "Description",
          defaultValue: "Discover our latest collection of products.",
          placeholder: "Enter section description",
        },
        {
          type: "range",
          name: "productsCount",
          label: "Product count",
          defaultValue: 6,
          shouldRevalidate: true,
          configs: {
            min: 1,
            max: 20,
            step: 1,
          },
        },
        {
          type: "select",
          name: "sortBy",
          label: "Sort products by",
          defaultValue: "CREATED_AT",
          shouldRevalidate: true,
          configs: {
            options: [
              { value: "CREATED_AT", label: "Newest" },
              { value: "BEST_SELLING", label: "Best selling" },
              { value: "PRICE", label: "Price: Low to high" },
              { value: "PRICE_DESC", label: "Price: High to low" },
            ],
          },
        },
        {
          type: "switch",
          name: "showViewAll",
          label: "Show 'View all' link",
          defaultValue: true,
        },
        {
          type: "text",
          name: "viewAllText",
          label: "View all text",
          defaultValue: "View all products",
          condition: (data: OurProductsProps) => data.showViewAll,
        },
        {
          type: "text",
          name: "viewAllLink",
          label: "View all link",
          defaultValue: "/products",
          condition: (data: OurProductsProps) => data.showViewAll,
        },
        {
          type: "color",
          name: "newBgColor",
          label: "New badge background",
          defaultValue: "#000000",
        },
        {
          type: "color",
          name: "newTextColor",
          label: "New badge text",
          defaultValue: "#ffffff",
        },
      ],
    },
    {
      group: "Layout",
      inputs: [
        {
          type: "range",
          name: "headerSpacing",
          label: "Header spacing",
          defaultValue: 24,
          configs: {
            min: 0,
            max: 80,
            step: 4,
            unit: "px",
          },
        },
        {
          type: "range",
          name: "contentSpacing",
          label: "Content spacing",
          defaultValue: 32,
          configs: {
            min: 0,
            max: 80,
            step: 4,
            unit: "px",
          },
        },
        {
          type: "range",
          name: "columnDesktop",
          label: "Columns (desktop)",
          defaultValue: 3,
          configs: {
            min: 1,
            max: 6,
            step: 1,
          },
        },
        {
          type: "range",
          name: "columnsMobile",
          label: "Columns (mobile)",
          defaultValue: 2,
          configs: {
            min: 1,
            max: 3,
            step: 1,
          },
        },
        {
          type: "range",
          name: "paddingTop",
          label: "Padding Top",
          defaultValue: 40,
          configs: {
            min: 0,
            max: 100,
            step: 5,
            unit: "px",
          },
        },
        {
          type: "range",
          name: "paddingBottom",
          label: "Padding Bottom",
          defaultValue: 40,
          configs: {
            min: 0,
            max: 100,
            step: 5,
            unit: "px",
          },
        },
      ],
    },
  ],
  presets: {
    heading: "Our Products",
    description: "Discover our latest collection of products.",
    headingTag: "h4",
    headingWeight: "700",
    headerSpacing: 24,
    contentSpacing: 32,
    productsCount: 6,
    columnDesktop: 3,
    columnsMobile: 2,
    showViewAll: true,
    viewAllText: "View all products",
    viewAllLink: "/products",
    sortBy: "CREATED_AT",
    paddingTop: 20,
    paddingBottom: 20,
    newBgColor: "#000000",
    newTextColor: "#ffffff",
  },
});
