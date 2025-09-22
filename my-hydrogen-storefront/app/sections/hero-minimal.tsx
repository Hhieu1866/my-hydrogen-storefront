import { forwardRef } from "react";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { createSchema } from "@weaverse/hydrogen";
import {
  BackgroundImage,
  backgroundInputs,
} from "~/components/background-image";
import type { BackgroundImageProps } from "~/components/background-image";

interface HeroMinimalProps
  extends HydrogenComponentProps,
    BackgroundImageProps {
  heading?: string;
  subheading?: string;
  ctaText?: string;
  ctaLink?: string;
  align?: "left" | "center" | "right";
  maxWidth?: number;
  overlayOpacity?: number;
  backgroundColor?: string;
}

const HeroMinimal = forwardRef<HTMLElement, HeroMinimalProps>((props, ref) => {
  const {
    heading,
    subheading,
    ctaText,
    ctaLink,
    align = "center",
    maxWidth = 720,
    backgroundImage,
    backgroundFit,
    backgroundPosition,
    backgroundColor,
    overlayOpacity = 0,
    children,
    ...rest
  } = props;

  return (
    <section
      ref={ref}
      {...rest}
      className="relative"
      style={{ backgroundColor }}
    >
      {/* Background Image */}
      <BackgroundImage
        backgroundImage={backgroundImage}
        backgroundFit={backgroundFit}
        backgroundPosition={backgroundPosition}
      />

      {/* Overlay */}
      {backgroundImage && overlayOpacity > 0 && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity / 100 }}
        />
      )}

      {/* Content */}
      <div
        style={{ margin: "0 auto", maxWidth }}
        className={`text-${align} px-6 py-16 md:py-24 relative z-10`}
      >
        {subheading && (
          <p className="mb-2 text-sm opacity-80 tracking-wide uppercase">
            {subheading}
          </p>
        )}
        {heading && (
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            {heading}
          </h2>
        )}
        {ctaText && ctaLink && (
          <a href={ctaLink} className="mt-6 inline-block underline">
            {ctaText}
          </a>
        )}
        {children}
      </div>
    </section>
  );
});

export default HeroMinimal;

export const schema = createSchema({
  type: "hero-minimal",
  title: "Hero Minimal",
  enabledOn: { pages: ["INDEX", "PAGE", "COLLECTION"] },
  limit: 1,
  settings: [
    {
      group: "Content",
      inputs: [
        {
          type: "text",
          name: "heading",
          label: "Heading",
          defaultValue: "Welcome to our store",
        },
        {
          type: "text",
          name: "subheading",
          label: "Subheading",
          defaultValue: "Quality you can feel",
        },
        {
          type: "text",
          name: "ctaText",
          label: "CTA Text",
          defaultValue: "Shop now",
        },
        {
          type: "text",
          name: "ctaLink",
          label: "CTA Link",
          defaultValue: "/collections/all",
        },
      ],
    },
    {
      group: "Style",
      inputs: [
        {
          type: "select",
          name: "align",
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
          type: "range",
          name: "maxWidth",
          label: "Max width (px)",
          defaultValue: 720,
          configs: { min: 480, max: 1440, step: 40 },
        },
      ],
    },
    {
      group: "Background",
      inputs: [
        {
          type: "color",
          name: "backgroundColor",
          label: "Background Color",
          defaultValue: "",
        },
        ...backgroundInputs.filter(
          (input) =>
            input.name !== "backgroundFor" && input.name !== "backgroundColor",
        ),
        {
          type: "range",
          name: "overlayOpacity",
          label: "Overlay Opacity (%)",
          defaultValue: 0,
          configs: { min: 0, max: 80, step: 5 },
        },
      ],
    },
  ],
  presets: {
    heading: "Welcome To Our Store",
    subheading: "Discover amazing products",
    ctaText: "Shop all",
    ctaLink: "/collections/all",
    backgroundPosition: "center center",
    backgroundFit: "cover",
    overlayOpacity: 0,
    backgroundColor: "#f8fafc",
  },
});
