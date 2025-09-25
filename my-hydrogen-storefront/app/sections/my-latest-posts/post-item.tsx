import { Image } from "@shopify/hydrogen";
import { createSchema, useParentInstance } from "@weaverse/hydrogen";
import clsx from "clsx";
import { forwardRef } from "react";

interface BlogPostItemsProps {
  // blog item styles
  titleColor?: string;
  excerptColor?: string;
  metaColor?: string;
  linkColor?: string;
  cardBorderRadius?: "none" | "sm" | "md" | "lg" | "xl";
  excerptLineClamp?: "1" | "2" | "3" | "4";
  cardPadding?: "sm" | "md" | "lg";
  cardBackground?: string;
  cardBorder?: string;
  cardShadow?: "none" | "sm" | "md" | "lg";
}

const BlogPostItems = forwardRef<HTMLDivElement, BlogPostItemsProps>(
  (props, ref) => {
    const {
      titleColor = "#000000",
      excerptColor = "#6b7280",
      metaColor = "#6b7280",
      linkColor = "#000000",
      cardBorderRadius = "lg",
      excerptLineClamp = "2",
      cardPadding = "md",
      cardBackground = "#ffffff",
      cardBorder = "transparent",
      cardShadow = "sm",
      ...rest
    } = props;

    const parent = useParentInstance();
    const posts = parent.data?.loaderData?.articles?.nodes || [];

    // style mapping objects
    const borderRadiusClasses = {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    };

    const paddingClasses = {
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    };

    const shadowClasses = {
      none: "",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
    };

    const lineClampClasses = {
      "1": "line-clamp-1",
      "2": "line-clamp-2",
      "3": "line-clamp-3",
      "4": "line-clamp-4",
    };

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    return (
      <>
        {posts.map((post) => (
          <article
            key={post.id}
            ref={ref}
            {...rest}
            className={clsx(
              "group cursor-pointer overflow-hidden",
              borderRadiusClasses[cardBorderRadius],
              shadowClasses[cardShadow],
            )}
            style={{
              backgroundColor: cardBackground,
              borderColor: cardBorder,
              borderWidth: cardBorder !== "transparent" ? "1px" : "0",
            }}
          >
            {/* Image */}
            {post.image && (
              <div className="overflow-hidden">
                <Image
                  data={post.image}
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
                  aspectRatio="16/9"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            )}

            {/* Content */}
            <div className={clsx(paddingClasses[cardPadding])}>
              {/* Meta */}
              <div
                className="flex mb-3 space-x-1 text-sm"
                style={{ color: metaColor }}
              >
                {post.author?.name && <span>By {post.author.name}</span>}
                <span>|</span>
                <span>{formatDate(post.publishedAt)}</span>
              </div>

              {/* Title */}
              <h3
                className="mb-3 text-xl font-semibold leading-tight line-clamp-1"
                style={{ color: titleColor }}
              >
                {post.title}
              </h3>

              {/* Excerpt */}
              {(post.excerpt || post.content) && (
                <p
                  className={clsx(
                    "mb-4 text-sm leading-relaxed",
                    lineClampClasses[excerptLineClamp],
                  )}
                  style={{ color: excerptColor }}
                >
                  {post.excerpt || post.content}
                </p>
              )}

              {/* Read more */}
              <div className="mt-auto">
                <a
                  href={`/blogs/${post.blogHandle}/${post.handle}`}
                  className="inline-flex items-center text-sm font-medium hover:underline"
                  style={{ color: linkColor }}
                >
                  Read more
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </article>
        ))}
      </>
    );
  },
);

export default BlogPostItems;

export const schema = createSchema({
  type: "blog-post-items",
  title: "Blog post items",
  settings: [
    {
      group: "Typography",
      inputs: [
        {
          type: "color",
          name: "titleColor",
          label: "Title color",
          defaultValue: "#000000",
        },
        {
          type: "color",
          name: "excerptColor",
          label: "Excerpt color",
          defaultValue: "#6b7280",
        },
        {
          type: "color",
          name: "metaColor",
          label: "Meta color",
          defaultValue: "#6b7280",
        },
        {
          type: "color",
          name: "linkColor",
          label: "Link color",
          defaultValue: "#000000",
        },
        {
          type: "select",
          name: "excerptLineClamp",
          label: "Excerpt line clamp",
          defaultValue: "2",
          configs: {
            options: [
              { value: "1", label: "1 line" },
              { value: "2", label: "2 lines" },
              { value: "3", label: "3 lines" },
              { value: "4", label: "4 lines" },
            ],
          },
        },
      ],
    },
    {
      group: "Layout & Style",
      inputs: [
        {
          type: "select",
          name: "cardBorderRadius",
          label: "Card border radius",
          defaultValue: "lg",
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
          type: "select",
          name: "cardPadding",
          label: "Card padding",
          defaultValue: "md",
          configs: {
            options: [
              { value: "sm", label: "Small" },
              { value: "md", label: "Medium" },
              { value: "lg", label: "Large" },
            ],
          },
        },
        {
          type: "color",
          name: "cardBackground",
          label: "Card background",
          defaultValue: "#ffffff",
        },
        {
          type: "color",
          name: "cardBorder",
          label: "Card border",
          defaultValue: "transparent",
        },
        {
          type: "select",
          name: "cardShadow",
          label: "Card shadow",
          defaultValue: "sm",
          configs: {
            options: [
              { value: "none", label: "None" },
              { value: "sm", label: "Small" },
              { value: "md", label: "Medium" },
              { value: "lg", label: "Large" },
            ],
          },
        },
      ],
    },
  ],
});
