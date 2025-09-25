import { createSchema, type ComponentLoaderArgs } from "@weaverse/hydrogen";
import clsx from "clsx";
import { forwardRef } from "react";
import { Section, type SectionProps } from "~/components/section";
import { Separator } from "~/components/ui/separator";
import Link from "~/components/link";
import BlogPostItems from "./post-item";

interface MyLatestPostsProps extends SectionProps {
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
  postsCount?: number;
  columnDesktop?: string;
  columnsMobile?: string;
  showViewAll?: boolean;
  viewAllText?: string;
  viewAllLink?: string;
  paddingTop?: number;
  paddingBottom?: number;
  backgroundColor?: string;
}

const MyLatestPosts = forwardRef<HTMLElement, MyLatestPostsProps>(
  (props, ref) => {
    const {
      heading = "Our Latest Posts",
      headingTag = "h2",
      headingWeight = "600",
      postsCount = 3,
      columnDesktop = "3",
      columnsMobile = "1",
      showViewAll = true,
      viewAllText = "View all posts",
      viewAllLink = "/blogs",
      paddingTop = 50,
      paddingBottom = 50,
      backgroundColor = "#ffffff",
      children,
      loaderData,
      ...rest
    } = props;

    const posts = loaderData?.articles?.nodes || [];

    const mobileClasses = {
      "1": "grid-cols-1",
      "2": "grid-cols-2",
    };

    const desktopClasses = {
      "1": "md:grid-cols-1",
      "2": "md:grid-cols-2",
      "3": "md:grid-cols-3",
      "4": "md:grid-cols-4",
    };

    const gridClasses = clsx(
      "grid gap-5",
      mobileClasses[columnsMobile as keyof typeof mobileClasses],
      desktopClasses[columnDesktop as keyof typeof desktopClasses],
    );

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
        style={{
          paddingTop: `${paddingTop}px`,
          paddingBottom: `${paddingBottom}px`,
        }}
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
              <Separator className="bg-black max-w-16 mx-auto mt-4" />
            </div>
          )}

          {/* blog post grid */}
          <div className="mb-10">
            {children ? (
              <div className={gridClasses}>{children}</div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Add blog post items to display content</p>
              </div>
            )}
          </div>

          {/* View all btn */}
          {showViewAll && (
            <div className="text-center">
              <Link
                to={viewAllLink}
                className="inline-block px-8 py-3 border border-[#1E1C1A] font-medium hover:bg-[#1E1C1A] hover:text-white transition-colors"
              >
                {viewAllText}
              </Link>
            </div>
          )}
        </div>
      </Section>
    );
  },
);

export default MyLatestPosts;

export const schema = createSchema({
  type: "my-latest-posts",
  title: "My Our Latest Posts",
  childTypes: ["blog-post-items"],
  settings: [
    {
      group: "Content",
      inputs: [
        {
          type: "text",
          name: "heading",
          label: "Heading",
          defaultValue: "Our Latest Posts",
          placeholder: "Enter section heading",
        },
        {
          type: "range",
          name: "postsCount",
          label: "Posts count",
          defaultValue: 3,
          shouldRevalidate: true,
          configs: {
            min: 1,
            max: 12,
            step: 1,
          },
        },
        {
          type: "switch",
          name: "showViewAll",
          label: "Show 'View all' link",
          defaultValue: true,
        },
        {
          type: "text",
          name: "viewAllText",
          label: "View all text",
          defaultValue: "View all posts",
          condition: (data: MyLatestPostsProps) => data.showViewAll,
        },
        {
          type: "text",
          name: "viewAllLink",
          label: "View all link",
          defaultValue: "/blogs",
          condition: (data: MyLatestPostsProps) => data.showViewAll,
        },
      ],
    },
    {
      group: "Typography",
      inputs: [
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
      group: "Layout & Style",
      inputs: [
        {
          type: "select",
          name: "columnDesktop",
          label: "Columns (desktop)",
          defaultValue: "3",
          configs: {
            options: [
              { value: "1", label: "1 column" },
              { value: "2", label: "2 columns" },
              { value: "3", label: "3 columns" },
              { value: "4", label: "4 columns" },
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
    heading: "Our Latest Posts",
    headingTag: "h2",
    headingWeight: "600",
    paddingTop: 60,
    paddingBottom: 60,
    backgroundColor: "#ffffff",
    children: [
      { type: "heading", content: "Our Latest Posts" },
      { type: "blog-post-items" },
    ],
  },
});

const BLOGS_WITH_ARTICLES_QUERY = `#graphql
  query BlogsWithArticles {
    blogs(first: 8) {
      nodes {
        handle
        title
        articles(first: 10) {
          nodes {
            id
            title
            handle
            publishedAt
            excerpt
            content
            contentHtml
            image {
              url
              altText
              width
              height
            }
            author {
              name
            }
          }
        }
      }
    }
  }
`;

export const loader = async ({ weaverse }: ComponentLoaderArgs) => {
  const { storefront } = weaverse;

  const { blogs } = await storefront.query(BLOGS_WITH_ARTICLES_QUERY);

  // Flatten all articles from all blogs
  const allArticles =
    blogs?.nodes?.flatMap(
      (blog) =>
        blog.articles?.nodes?.map((article) => ({
          ...article,
          blogHandle: blog.handle,
          blogTitle: blog.title,
        })) || [],
    ) || [];

  // Sort by publishedAt (newest first) and limit
  const sortedArticles = allArticles
    .filter((article) => article.publishedAt)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 12);

  // Debug: Log articles to see excerpt data
  console.log(
    "Blog articles:",
    sortedArticles.map((article) => ({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      hasExcerpt: !!article.excerpt,
      hasContent: !!article.content,
    })),
  );

  return {
    articles: { nodes: sortedArticles },
  };
};
