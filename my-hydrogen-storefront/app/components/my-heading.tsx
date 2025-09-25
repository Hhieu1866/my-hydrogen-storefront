import { createSchema, type HydrogenComponentProps } from "@weaverse/hydrogen";
import { forwardRef } from "react";
import { Separator } from "~/components/ui/separator";

interface MyHeadingProps extends HydrogenComponentProps {
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
  showSeparator?: boolean;
  separatorColor?: string;
  textAlign?: "left" | "center" | "right";
}

const MyHeading = forwardRef<HTMLDivElement, MyHeadingProps>((props, ref) => {
  const {
    heading = "Heading",
    headingTag = "h2",
    headingWeight = "600",
    showSeparator = true,
    separatorColor = "#000000",
    textAlign = "center",
    ...rest
  } = props;

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

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div ref={ref} {...rest} className={`mb-8 ${alignClasses[textAlign]}`}>
      <div
        className={`text-3xl md:text-4xl mb-4 ${weightClasses[headingWeight]}`}
      >
        {headingTag === "h1" && <h1>{heading}</h1>}
        {headingTag === "h2" && <h2>{heading}</h2>}
        {headingTag === "h3" && <h3>{heading}</h3>}
        {headingTag === "h4" && <h4>{heading}</h4>}
        {headingTag === "h5" && <h5>{heading}</h5>}
        {headingTag === "h6" && <h6>{heading}</h6>}
      </div>
      {showSeparator && (
        <Separator
          className={`max-w-16 ${textAlign === "center" ? "mx-auto" : ""}`}
          style={{ backgroundColor: separatorColor }}
        />
      )}
    </div>
  );
});

export default MyHeading;

export const schema = createSchema({
  type: "my-heading",
  title: "My Heading",
  settings: [
    {
      group: "Content",
      inputs: [
        {
          type: "text",
          name: "heading",
          label: "Heading",
          defaultValue: "Heading",
          placeholder: "Enter heading text",
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
        {
          type: "select",
          name: "textAlign",
          label: "Text alignment",
          defaultValue: "center",
          configs: {
            options: [
              { value: "left", label: "Left" },
              { value: "center", label: "Center" },
              { value: "right", label: "Right" },
            ],
          },
        },
        {
          type: "switch",
          name: "showSeparator",
          label: "Show separator",
          defaultValue: true,
        },
        {
          type: "color",
          name: "separatorColor",
          label: "Separator color",
          defaultValue: "#000000",
          condition: (data: MyHeadingProps) => data.showSeparator,
        },
      ],
    },
  ],
  presets: {
    heading: "Heading",
    headingTag: "h2",
    headingWeight: "600",
    showSeparator: true,
    separatorColor: "#000000",
    textAlign: "center",
  },
});
