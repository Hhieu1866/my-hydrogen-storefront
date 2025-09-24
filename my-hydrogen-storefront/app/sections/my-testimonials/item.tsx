import { Image } from "@shopify/hydrogen";
import {
  createSchema,
  type HydrogenComponentProps,
  type WeaverseImage,
} from "@weaverse/hydrogen";
import { forwardRef } from "react";

export interface TestimonialItemProps extends HydrogenComponentProps {
  quote?: string;
  author?: string;
  avatar?: WeaverseImage;
}

const TestimonialItem = forwardRef<HTMLDivElement, TestimonialItemProps>(
  (props, ref) => {
    const { quote, author, avatar, ...rest } = props;

    return (
      <div
        ref={ref}
        {...rest}
        className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4"
      >
        {/* Quote mark */}
        <div className="">
          <img src="/testimonials-icon.webp" alt="" />
        </div>

        {/* quote */}
        <blockquote className="text-lg md:text-xl italic text-gray-700  leading-relaxed">
          {quote}
        </blockquote>

        {/* avatar */}
        <div className="flex flex-col items-center">
          {avatar && (
            <div className="size-16 rounded-full overflow-hidden">
              <Image
                data={avatar}
                width={64}
                height={64}
                className="size-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="font-bold uppercase text-sm tracking-wider">
          {author}
        </div>
      </div>
    );
  },
);

export default TestimonialItem;

export const schema = createSchema({
  type: "testimonial-item",
  title: "Testimonial Item",
  settings: [
    {
      group: "Content",
      inputs: [
        {
          type: "textarea",
          name: "quote",
          label: "Quote",
          defaultValue:
            "When a beautiful design is combined with powerful technology, it truly is an artwork. I love how my website operates and looks with this theme. Thank you for the awesome product.",
          placeholder: "Enter customer testimonial",
        },
        {
          type: "text",
          name: "author",
          label: "Author name",
          defaultValue: "Lee Hoang",
          placeholder: "Enter author name",
        },
        {
          type: "image",
          name: "avatar",
          label: "Author avatar",
          defaultValue: "",
        },
      ],
    },
  ],
});
