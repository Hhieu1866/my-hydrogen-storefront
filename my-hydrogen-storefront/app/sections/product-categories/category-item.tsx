import { Image } from "@shopify/hydrogen";
import {
  createSchema,
  type HydrogenComponentProps,
  type WeaverseImage,
} from "@weaverse/hydrogen";
import { forwardRef } from "react";
import Link from "~/components/link";
import clsx from "clsx";

export interface CategoryItemProps extends HydrogenComponentProps {
  categoryLabel?: string;
  title?: string;
  image?: WeaverseImage;
  link?: string;
  textAlign?: "left" | "center" | "right";
  contentPosition?: "top" | "middle" | "bottom";
  buttonText?: string;
  overlayOpacity?: number;
  cardBorderRadius?: "none" | "sm" | "md" | "lg" | "xl";
  categoryLabelColor?: string;
  titleColor?: string;
  buttonTextColor?: string;
  categoryLabelSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  titleSize?:
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl";
  buttonTextSize?: "xs" | "sm" | "base" | "lg" | "xl";
}

const CategoryItem = forwardRef<HTMLDivElement, CategoryItemProps>(
  (props, ref) => {
    const {
      categoryLabel = "Category Label",
      title = "Category Title",
      image,
      link = "/collections/all",
      textAlign = "center",
      contentPosition = "middle",
      buttonText = "SHOP NOW",
      overlayOpacity = 0.3,
      cardBorderRadius = "none",
      categoryLabelColor = "#d1d5db",
      titleColor = "#ffffff",
      buttonTextColor = "#ffffff",
      categoryLabelSize = "sm",
      titleSize = "xl",
      buttonTextSize = "sm",
      ...rest
    } = props;

    const alignClasses = {
      left: "items-start",
      center: "items-center",
      right: "items-end",
    };

    const positionClasses = {
      top: "justify-start",
      middle: "justify-center",
      bottom: "justify-end",
    };

    const borderRadiusClasses = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
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
    };

    return (
      <div
        ref={ref}
        {...rest}
        className={clsx(
          "relative overflow-hidden group",
          borderRadiusClasses[cardBorderRadius],
        )}
        style={{
          aspectRatio: "467/300",
        }}
      >
        {/* background Image */}
        <Image
          data={image || { url: "/fallback.webp", altText: title }}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          width={467}
          height={300}
        />

        {/* overlay */}
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />

        {/* content */}
        <div
          className={clsx(
            "relative z-10 h-full flex flex-col p-4",
            positionClasses[contentPosition],
            alignClasses[textAlign],
          )}
        >
          <div>
            {/* category Label */}
            <p
              className={clsx(
                "mb-2 uppercase tracking-wide",
                sizeClasses[categoryLabelSize],
              )}
              style={{ color: categoryLabelColor }}
            >
              {categoryLabel}
            </p>

            {/* title */}
            <p
              className={clsx(
                "font-bold mb-2 leading-tight",
                sizeClasses[titleSize],
              )}
              style={{ color: titleColor }}
            >
              {title}
            </p>

            {/* btn */}
            <Link
              to={link}
              className={clsx(
                "inline-block underline font-medium uppercase tracking-wide hover:opacity-80 transition-opacity",
                sizeClasses[buttonTextSize],
              )}
              style={{
                color: buttonTextColor,
              }}
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    );
  },
);

export default CategoryItem;

export const schema = createSchema({
  type: "category-item",
  title: "Category Item",
  settings: [
    {
      group: "Content",
      inputs: [
        {
          type: "image",
          name: "image",
          label: "Background Image",
          defaultValue: "",
        },
        {
          type: "text",
          name: "categoryLabel",
          label: "Category Label",
          defaultValue: "Big Sale Products",
          placeholder: "Enter category label",
        },
        {
          type: "text",
          name: "title",
          label: "Title",
          defaultValue: "Plants For Interior",
          placeholder: "Enter category title",
        },
        {
          type: "text",
          name: "buttonText",
          label: "Button Text",
          defaultValue: "SHOP NOW",
          placeholder: "Enter button text",
        },
        {
          type: "url",
          name: "link",
          label: "Link",
          defaultValue: "/collections/all",
          placeholder: "/collections/all",
        },
      ],
    },
    {
      group: "Typography",
      inputs: [
        {
          type: "color",
          name: "categoryLabelColor",
          label: "Category Label Color",
          defaultValue: "#d1d5db",
        },
        {
          type: "select",
          name: "categoryLabelSize",
          label: "Category Label Size",
          defaultValue: "sm",
          configs: {
            options: [
              { value: "xs", label: "Extra Small" },
              { value: "sm", label: "Small" },
              { value: "base", label: "Base" },
              { value: "lg", label: "Large" },
              { value: "xl", label: "Extra Large" },
              { value: "2xl", label: "2X Large" },
              { value: "3xl", label: "3X Large" },
            ],
          },
        },
        {
          type: "color",
          name: "titleColor",
          label: "Title Color",
          defaultValue: "#ffffff",
        },
        {
          type: "select",
          name: "titleSize",
          label: "Title Size",
          defaultValue: "xl",
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
            ],
          },
        },
        {
          type: "color",
          name: "buttonTextColor",
          label: "Button Text Color",
          defaultValue: "#ffffff",
        },
        {
          type: "select",
          name: "buttonTextSize",
          label: "Button Text Size",
          defaultValue: "sm",
          configs: {
            options: [
              { value: "xs", label: "Extra Small" },
              { value: "sm", label: "Small" },
              { value: "base", label: "Base" },
              { value: "lg", label: "Large" },
              { value: "xl", label: "Extra Large" },
            ],
          },
        },
      ],
    },
    {
      group: "Layout & Style",
      inputs: [
        {
          type: "toggle-group",
          name: "textAlign",
          label: "Alignment",
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
          type: "select",
          name: "contentPosition",
          label: "Position",
          defaultValue: "middle",
          configs: {
            options: [
              { value: "top", label: "Top" },
              { value: "middle", label: "Middle" },
              { value: "bottom", label: "Bottom" },
            ],
          },
        },
        {
          type: "select",
          name: "cardBorderRadius",
          label: "Card border radius",
          defaultValue: "none",
          configs: {
            options: [
              { value: "none", label: "None" },
              { value: "sm", label: "Small" },
              { value: "md", label: "Medium" },
              { value: "lg", label: "Large" },
              { value: "xl", label: "Extra Large" },
            ],
          },
        },
        {
          type: "range",
          name: "overlayOpacity",
          label: "Overlay Opacity",
          defaultValue: 0.3,
          configs: {
            min: 0,
            max: 0.8,
            step: 0.1,
          },
        },
      ],
    },
  ],
});
