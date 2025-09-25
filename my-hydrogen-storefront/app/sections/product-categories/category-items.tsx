import { createSchema, type HydrogenComponentProps } from "@weaverse/hydrogen";
import { forwardRef } from "react";
import clsx from "clsx";

interface CategoryGridProps extends HydrogenComponentProps {
  columnsDesktop?: string;
  columnsMobile?: string;
  paddingTop?: number;
  paddingBottom?: number;
}

const CategoryGrid = forwardRef<HTMLDivElement, CategoryGridProps>(
  (props, ref) => {
    const {
      columnsDesktop = "4",
      columnsMobile = "1",
      paddingTop = 20,
      paddingBottom = 20,
      children,
      ...rest
    } = props;

    const containerStyle = {
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
    };

    const mobileClasses = {
      "1": "grid-cols-1",
      "2": "grid-cols-2",
    };

    const desktopClasses = {
      "1": "md:grid-cols-1",
      "2": "md:grid-cols-2",
      "3": "md:grid-cols-3",
      "4": "md:grid-cols-4",
      "5": "md:grid-cols-5",
      "6": "md:grid-cols-6",
    };

    const gridClasses = clsx(
      "grid gap-5",
      mobileClasses[columnsMobile as keyof typeof mobileClasses],
      desktopClasses[columnsDesktop as keyof typeof desktopClasses],
    );

    return (
      <div ref={ref} {...rest} className={gridClasses} style={containerStyle}>
        {children}
      </div>
    );
  },
);

export default CategoryGrid;

export const schema = createSchema({
  type: "category-items",
  title: "Category items",
  childTypes: ["category-item"],
  settings: [
    {
      group: "Layout",
      inputs: [
        {
          type: "select",
          name: "columnsDesktop",
          label: "Columns (desktop)",
          defaultValue: "4",
          configs: {
            options: [
              { value: "1", label: "1 column" },
              { value: "2", label: "2 columns" },
              { value: "3", label: "3 columns" },
              { value: "4", label: "4 columns" },
              { value: "5", label: "5 columns" },
              { value: "6", label: "6 columns" },
            ],
          },
        },
        {
          type: "select",
          name: "columnsMobile",
          label: "Columns (mobile)",
          defaultValue: "1",
          configs: {
            options: [
              { value: "1", label: "1 column" },
              { value: "2", label: "2 columns" },
            ],
          },
        },
        {
          type: "range",
          name: "paddingTop",
          label: "Padding top",
          defaultValue: 20,
          configs: {
            min: 0,
            max: 100,
            step: 4,
            unit: "px",
          },
        },
        {
          type: "range",
          name: "paddingBottom",
          label: "Padding bottom",
          defaultValue: 0,
          configs: {
            min: 0,
            max: 100,
            step: 4,
            unit: "px",
          },
        },
      ],
    },
  ],
  presets: {
    columnsDesktop: "4",
    columnsMobile: "1",
    paddingTop: 20, 
    paddingBottom: 20,
    children: [
      {
        type: "category-item",
        categoryLabel: "Big Sale Products",
        title: "Plants For Interior",
        link: "/collections/interior",
      },
      {
        type: "category-item",
        categoryLabel: "New Arrivals",
        title: "Cactus Pot Flower",
        link: "/collections/cactus",
      },
      {
        type: "category-item",
        categoryLabel: "Top Products",
        title: "Plants For Healthy",
        link: "/collections/healthy",
      },
      {
        type: "category-item",
        categoryLabel: "Trending Products",
        title: "Plants For Outdoor",
        link: "/collections/outdoor",
      },
    ],
  },
});
