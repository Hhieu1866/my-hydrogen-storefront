import { createSchema } from "@weaverse/hydrogen";
import { forwardRef } from "react";
import { Section, type SectionProps } from "~/components/section";
import { Separator } from "~/components/ui/separator";
import { Mail } from "lucide-react";

interface SubscribeProps extends SectionProps {
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
  content?: string;
  contentSize?:
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl";
  contentSpacing?: number;
  highlightText?: string;
  highlightColor?: string;
  buttonText?: string;
  placeholderText?: string;
  paddingTop?: number;
  paddingBottom?: number;
  backgroundColor?: string;
}

const Subscribe = forwardRef<HTMLElement, SubscribeProps>((props, ref) => {
  const {
    heading = "Subscribe",
    headingTag = "h2",
    headingWeight = "600",
    content = "Get 20% Off Your Next Order",
    contentSize = "lg",
    contentSpacing = 32,
    highlightText = "20%",
    highlightColor = "#79A206",
    buttonText = "SUBSCRIBE",
    placeholderText = "Enter you email",
    paddingTop = 50,
    paddingBottom = 50,
    backgroundColor = "#ffffff",
    children,
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

  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
    "7xl": "text-7xl",
    "8xl": "text-8xl",
    "9xl": "text-9xl",
  };

  const renderContent = () => {
    if (!content.includes(highlightText)) {
      return content;
    }

    const parts = content.split(highlightText);
    return (
      <>
        {parts[0]}
        <span style={{ color: highlightColor }}>{highlightText}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <Section
      ref={ref}
      {...rest}
      style={{
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
      }}
      backgroundColor={backgroundColor}
    >
      <div className="container mx-auto px-4">
        {/* heading */}
        {children}

        {/* content */}
        {content && (
          <div className="text-center mb-8">
            <p
              className={`${sizeClasses[contentSize]}`}
              style={{
                paddingTop: `${contentSpacing}px`,
                paddingBottom: `${contentSpacing}px`,
              }}
            >
              {renderContent()}
            </p>
          </div>
        )}

        {/* sub form */}
        <div className="max-w-md mx-auto">
          <form className="flex items-center border-b border-black pb-2">
            <Mail className="size-5 mr-2" />

            <input
              type="email"
              placeholder={placeholderText}
              className="flex-1 bg-transparent placeholder-gray-600 outline-none"
              required
            />

            <button
              type="submit"
              className={`ml-4 text-black text-sm font-medium uppercase tracking-wide transition-colors`}
              style={
                {
                  "--hover-color": highlightColor,
                } as React.CSSProperties
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.color = highlightColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "black";
              }}
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
});

export default Subscribe;

export const schema = createSchema({
  type: "subscribe",
  title: "Subscribe",
  childTypes: ["my-heading"],
  settings: [
    {
      group: "Content",
      inputs: [
        {
          type: "text",
          name: "heading",
          label: "Heading",
          defaultValue: "Subscribe",
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
          type: "text",
          name: "content",
          label: "Content",
          defaultValue: "Get 20% Off Your Next Order",
          placeholder: "Enter content text",
        },
        {
          type: "select",
          name: "contentSize",
          label: "Content size",
          defaultValue: "lg",
          configs: {
            options: [
              { value: "xs", label: "Extra Small" },
              { value: "sm", label: "Small" },
              { value: "base", label: "Base" },
              { value: "lg", label: "Large" },
              { value: "xl", label: "Extra Large" },
              { value: "2xl", label: "2X Large" },
              { value: "3xl", label: "3X Large" },
              { value: "4xl", label: "4X Large" },
              { value: "5xl", label: "5X Large" },
              { value: "6xl", label: "6X Large" },
              { value: "7xl", label: "7X Large" },
              { value: "8xl", label: "8X Large" },
              { value: "9xl", label: "9X Large" },
            ],
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
          type: "text",
          name: "highlightText",
          label: "Highlight text",
          defaultValue: "20%",
          placeholder: "Text to highlight",
        },
        {
          type: "color",
          name: "highlightColor",
          label: "Highlight color",
          defaultValue: "#79A206",
        },
        {
          type: "text",
          name: "buttonText",
          label: "Button text",
          defaultValue: "SUBSCRIBE",
          placeholder: "Button text",
        },
        {
          type: "text",
          name: "placeholderText",
          label: "Placeholder text",
          defaultValue: "Enter you email",
          placeholder: "Email placeholder",
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
    heading: "Subscribe",
    headingTag: "h2",
    headingWeight: "600",
    content: "Get 20% Off Your Next Order",
    contentSpacing: 32,
    highlightText: "20%",
    highlightColor: "#79A206",
    buttonText: "SUBSCRIBE",
    placeholderText: "Enter you email",
    paddingTop: 60,
    paddingBottom: 60,
    backgroundColor: "#ffffff",
    children: [{ type: "my-heading", heading: "Subscribe" }],
  },
});
