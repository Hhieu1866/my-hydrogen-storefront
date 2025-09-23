import { createSchema } from "@weaverse/hydrogen";
import { forwardRef } from "react";
import { Section, type SectionProps } from "~/components/section";
import { Separator } from "~/components/ui/separator";

interface MyTestimonialsProps extends SectionProps {
  heading?: string;
  headingTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  headingWeight?:
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  paddingTop?: number;
  paddingBottom?: number;
  backgroundColor?: string;
}

const MyTestimonials = forwardRef<HTMLElement, MyTestimonialsProps>(
  (props, ref) => {
    const {
      heading = "What Our Customers Says?",
      headingTag = "h2",
      headingWeight = "600",
      paddingTop = 50,
      paddingBottom = 50,
      backgroundColor = "#ffffff",
      children,
      ...rest
    } = props;

    const sectionStyle = {
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
    };

    const weightClasses = {
      "100": "font-thin",
      "200": "font-extralight",
      "300": "font-light",
      "400": "font-normal",
      "500": "font-medium",
      "600": "font-semibold",
      "700": "font-bold",
      "800": "font-extrabold",
      "900": "font-black",
    };

    return (
      <Section
        ref={ref}
        {...rest}
        style={sectionStyle}
        backgroundColor={backgroundColor}
      >
        <div className="container mx-auto px-4">
          {/* heading */}

          {heading && (
            <div className="text-center mb-12">
              <div
                className={`text-3xl md:text-4xl ${weightClasses[headingWeight]}`}
              >
                {headingTag === "h1" && <h1>{heading}</h1>}
                {headingTag === "h2" && <h2>{heading}</h2>}
                {headingTag === "h3" && <h3>{heading}</h3>}
                {headingTag === "h4" && <h4>{heading}</h4>}
                {headingTag === "h5" && <h5>{heading}</h5>}
                {headingTag === "h6" && <h6>{heading}</h6>}
              </div>
              <Separator className=" bg-black max-w-16 mx-auto" />
            </div>
          )}

          {/* testimonials items */}
          <div className="space-y-16">{children}</div>
        </div>
      </Section>
    );
  },
);

export default MyTestimonials;

export const schema = createSchema({
  type: "my-testimonials",
  title: "My Testimonials",
  childTypes: ["testimonial-item"],
  settings: [
    {
      group: "Content",
      inputs: [
        {
          type: "text",
          name: "heading",
          label: "Heading",
          defaultValue: "What Our Customers Says?",
          placeholder: "Enter section heading",
        },
        {
          type: "select",
          name: "headingTag",
          label: "HTML tag",
          defaultValue: "h2",
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
          defaultValue: "600",
          configs: {
            options: [
              { value: "100", label: "100 - Thin" },
              { value: "200", label: "200 - Extra Light" },
              { value: "300", label: "300 - Light" },
              { value: "400", label: "400 - Normal" },
              { value: "500", label: "500 - Medium" },
              { value: "600", label: "600 - Semi Bold" },
              { value: "700", label: "700 - Bold" },
              { value: "800", label: "800 - Extra Bold" },
              { value: "900", label: "900 - Black" },
            ],
          },
        },
      ],
    },
    {
      group: "Layout",
      inputs: [
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
          defaultValue: 60,
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
    heading: "What Our Customers Says?",
    headingTag: "h2",
    headingWeight: "600",
    paddingTop: 60,
    paddingBottom: 60,
    backgroundColor: "#ffffff",
    children: [
      {
        type: "testimonial-item",
        quote:
          "When a beautiful design is combined with powerful technology, it truly is an artwork. I love how my website operates and looks with this theme. Thank you for the awesome product.",
        author: "LINDSY NELOMS",
        role: "CEO OF SFD",
        avatar: "",
      },
    ],
  },
});
