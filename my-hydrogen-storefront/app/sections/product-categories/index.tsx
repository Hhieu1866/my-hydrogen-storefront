import { createSchema } from "@weaverse/hydrogen";
import { forwardRef } from "react";
import { layoutInputs, Section, type SectionProps } from "~/components/section";

interface ProductCategoriesProps extends SectionProps {
  paddingTop?: number;
  paddingBottom?: number;
  backgroundColor?: string;
}

const ProductCategories = forwardRef<HTMLElement, ProductCategoriesProps>(
  (props, ref) => {
    const {
      paddingTop = 50,
      paddingBottom = 50,
      backgroundColor = "#ffffff",
      children,
      ...rest
    } = props;

    return (
      <Section
        ref={ref}
        {...rest}
        style={{
          paddingTop: `${paddingTop}px`,
          paddingBottom: `${paddingBottom}px`,
        }}
        backgroundColor={backgroundColor}
        containerClassName="px-4 md:px-6 lg:px-8"
      >
        <div className="space-y-12">
          {children}
        </div>
      </Section>
    );
  },
);

export default ProductCategories;

export const schema = createSchema({
  type: "product-categories",
  title: "Product Categories",
  childTypes: ["my-heading", "category-grid"],
  settings: [
    {
      group: "Layout",
      inputs: [
        ...layoutInputs.filter((input) => input.name !== "borderRadius" && input.name !== "verticalPadding"),
        {
          type: "range",
          name: "paddingTop",
          label: "Padding top",
          defaultValue: 50,
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
          defaultValue: 50,
          configs: {
            min: 0,
            max: 120,
            step: 4,
            unit: "px",
          },
        },
        {
          type: "color",
          name: "backgroundColor",
          label: "Background color",
          defaultValue: "#ffffff",
        },
      ],
    },
  ],
  presets: {
    paddingTop: 60,
    paddingBottom: 60,
    backgroundColor: "#ffffff",
    children: [
      { type: "my-heading", heading: "Product Categories" },
      { type: "category-grid" },
    ],
  },
});
