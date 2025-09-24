import {
  createSchema,
  type HydrogenComponentProps,
  type WeaverseImage,
} from "@weaverse/hydrogen";
import { forwardRef } from "react";
import { Image } from "@shopify/hydrogen";
import { Section, type SectionProps } from "~/components/section";
import { cn } from "~/utils/cn";
import { Link } from "~/components/link";

interface MyHeroBannerProps extends SectionProps {
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
  headingColor?: string;
  description?: string;
  descriptionColor?: string;
  buttonText?: string;
  buttonUrl?: string;
  buttonTextColor?: string;
  buttonBackgroundColor?: string;
  image?: WeaverseImage;
  imagePosition?: "left" | "right" | "full";
  contentPosition?: "left" | "right";
  backgroundColor?: string;
  paddingTop?: number;
  paddingBottom?: number;
}

const MyHeroBanner = forwardRef<HTMLElement, MyHeroBannerProps>(
  (props, ref) => {
    const {
      heading = "Plants The Perfect Choice!",
      headingTag = "h1",
      headingWeight = "700",
      headingColor = "#000000",
      description = "Discount 20% Off For Lukani Members",
      descriptionColor = "#000000",
      buttonText = "Discover Now",
      buttonUrl = "/collections/all",
      buttonTextColor = "#ffffff",
      buttonBackgroundColor = "#000000",
      image,
      imagePosition = "right",
      contentPosition = "left",
      backgroundColor = "#ffffff",
      paddingTop = 60,
      paddingBottom = 60,
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

    // Determine layout classes based on image and content positions
    const isFullImage = imagePosition === "full";
    const contentOrder =
      contentPosition === "right" ? "order-last" : "order-first";
    const imageOrder = imagePosition === "left" ? "order-first" : "order-last";

    return (
      <Section
        ref={ref}
        {...rest}
        style={{
          paddingTop: `${paddingTop}px`,
          paddingBottom: `${paddingBottom}px`,
        }}
        backgroundColor={backgroundColor}
        className={cn(isFullImage && "relative overflow-hidden")}
      >
        {isFullImage ? (
          // Full image layout with absolute positioning
          <>
            <div className="absolute inset-0 w-full h-full">
              <Image
                data={
                  image || {
                    url: "/fallback.webp",
                    altText: "Hero banner placeholder",
                  }
                }
                aspectRatio="3.2/1"
                className="w-full h-full object-cover"
                sizes="100vw"
              />
            </div>
            <div className="container relative mx-auto px-4">
              <div
                className={cn(
                  "max-w-lg py-16",
                  contentPosition === "right" ? "ml-auto" : "",
                )}
              >
                <div
                  className={cn(
                    "text-4xl md:text-5xl lg:text-6xl mb-6",
                    weightClasses[headingWeight],
                  )}
                  style={{ color: headingColor }}
                >
                  {headingTag === "h1" && <h1>{heading}</h1>}
                  {headingTag === "h2" && <h2>{heading}</h2>}
                  {headingTag === "h3" && <h3>{heading}</h3>}
                  {headingTag === "h4" && <h4>{heading}</h4>}
                  {headingTag === "h5" && <h5>{heading}</h5>}
                  {headingTag === "h6" && <h6>{heading}</h6>}
                </div>

                <div className="mb-4">
                  <p
                    className="uppercase tracking-wide text-sm"
                    style={{ color: descriptionColor }}
                  >
                    {description}
                  </p>
                </div>

                {buttonText && (
                  <Link
                    to={buttonUrl}
                    className="inline-block px-8 py-3 uppercase tracking-wider transition-colors"
                    style={{
                      color: buttonTextColor,
                      backgroundColor: buttonBackgroundColor,
                    }}
                  >
                    {buttonText}
                  </Link>
                )}
              </div>
            </div>
          </>
        ) : (
          // Split layout (image left/right)
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center -mx-4">
              {/* Content */}
              <div
                className={cn(
                  "w-full md:w-1/2 px-4 mb-8 md:mb-0",
                  contentOrder,
                )}
              >
                <div
                  className={cn(
                    "text-4xl md:text-5xl lg:text-6xl mb-6",
                    weightClasses[headingWeight],
                  )}
                  style={{ color: headingColor }}
                >
                  {headingTag === "h1" && <h1>{heading}</h1>}
                  {headingTag === "h2" && <h2>{heading}</h2>}
                  {headingTag === "h3" && <h3>{heading}</h3>}
                  {headingTag === "h4" && <h4>{heading}</h4>}
                  {headingTag === "h5" && <h5>{heading}</h5>}
                  {headingTag === "h6" && <h6>{heading}</h6>}
                </div>

                <div className="max-w-lg mx-auto md:mx-0">
                  <div className="mb-4">
                    <p
                      className="uppercase tracking-wide text-sm"
                      style={{ color: descriptionColor }}
                    >
                      {description}
                    </p>
                  </div>

                  {buttonText && (
                    <Link
                      to={buttonUrl}
                      className="inline-block px-8 py-3 font-semibold uppercase tracking-wider transition-colors"
                      style={{
                        color: buttonTextColor,
                        backgroundColor: buttonBackgroundColor,
                      }}
                    >
                      {buttonText}
                    </Link>
                  )}
                </div>
              </div>

              {/* Image */}
              <div className={cn("w-full md:w-1/2 px-4", imageOrder)}>
                <Image
                  data={
                    image || {
                      url: "/fallback.webp",
                      altText: "Hero banner placeholder",
                      width: 600,
                      height: 400,
                    }
                  }
                  aspectRatio="16/9"
                  className="w-full object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        )}
      </Section>
    );
  },
);

export default MyHeroBanner;

export const schema = createSchema({
  type: "my-herobanner",
  title: "My Hero Banner",
  settings: [
    {
      group: "Content",
      inputs: [
        {
          type: "text",
          name: "heading",
          label: "Heading",
          defaultValue: "Plants The Perfect Choice!",
          placeholder: "Enter heading text",
        },
        {
          type: "select",
          name: "headingTag",
          label: "Heading tag",
          defaultValue: "h1",
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
          label: "Heading weight",
          defaultValue: "700",
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
          type: "color",
          name: "headingColor",
          label: "Heading color",
          defaultValue: "#000000",
        },
        {
          type: "text",
          name: "description",
          label: "Description",
          defaultValue: "Discount 20% Off For Lukani Members",
          placeholder: "Enter description text",
        },
        {
          type: "color",
          name: "descriptionColor",
          label: "Description color",
          defaultValue: "#000000",
        },
        {
          type: "text",
          name: "buttonText",
          label: "Button text",
          defaultValue: "Discover Now",
          placeholder: "Enter button text",
        },
        {
          type: "url",
          name: "buttonUrl",
          label: "Button URL",
          defaultValue: "/collections/all",
          placeholder: "Enter button URL",
        },
        {
          type: "color",
          name: "buttonTextColor",
          label: "Button text color",
          defaultValue: "#ffffff",
        },
        {
          type: "color",
          name: "buttonBackgroundColor",
          label: "Button background color",
          defaultValue: "#1E1C1A",
        },
        {
          type: "image",
          name: "image",
          label: "Image",
          defaultValue: "",
        },
      ],
    },
    {
      group: "Layout",
      inputs: [
        {
          type: "select",
          name: "contentPosition",
          label: "Content position",
          defaultValue: "left",
          configs: {
            options: [
              { value: "left", label: "Left" },
              { value: "right", label: "Right" },
            ],
          },
        },
        {
          type: "select",
          name: "imagePosition",
          label: "Image position",
          defaultValue: "right",
          configs: {
            options: [
              { value: "left", label: "Left" },
              { value: "right", label: "Right" },
              { value: "full", label: "Full width" },
            ],
          },
        },
        {
          type: "color",
          name: "backgroundColor",
          label: "Background color",
          defaultValue: "#ffffff",
        },
        {
          type: "range",
          name: "paddingTop",
          label: "Padding top",
          defaultValue: 60,
          configs: {
            min: 0,
            max: 120,
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
      ],
    },
  ],
  presets: {
    heading: "Plants The Perfect Choice!",
    headingTag: "h1",
    headingWeight: "700",
    headingColor: "#000000",
    description: "Discount 20% Off For Lukani Members",
    descriptionColor: "#000000",
    buttonText: "Discover Now",
    buttonUrl: "/collections/all",
    buttonTextColor: "#ffffff",
    buttonBackgroundColor: "#000000",
    imagePosition: "right",
    contentPosition: "left",
    backgroundColor: "#ffffff",
    paddingTop: 60,
    paddingBottom: 60,
  },
});
