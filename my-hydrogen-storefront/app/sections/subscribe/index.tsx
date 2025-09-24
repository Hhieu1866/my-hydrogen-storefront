import { forwardRef } from "react";
import { Section, type SectionProps } from "~/components/section";
import { Separator } from "~/components/ui/separator";

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
    heading = "Get 20% Off Your Next Order",
    headingTag = "h2",
    headingWeight = "600",
    highlightText = "20%",
    highlightColor = "#22c55e",
    buttonText = "SUBSCRIBE",
    placeholderText = "Enter you email",
    paddingTop = 50,
    paddingBottom = 50,
    backgroundColor = "#ffffff",
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

  const renderHeading = () => {
    if (!heading.includes(highlightText)) {
      return heading;
    }

    const parts = heading.split(highlightText);
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
        {heading && (
          <div className="text-center mb-8">
            <div
              className={`text-3xl md:text-4xl mb-4 ${weightClasses[headingWeight]}`}
            >
              {headingTag === "h1" && <h1>{renderHeading()}</h1>}
              {headingTag === "h2" && <h2>{renderHeading()}</h2>}
              {headingTag === "h3" && <h3>{renderHeading()}</h3>}
              {headingTag === "h4" && <h4>{renderHeading()}</h4>}
              {headingTag === "h5" && <h5>{renderHeading()}</h5>}
              {headingTag === "h6" && <h6>{renderHeading()}</h6>}
            </div>
            <Separator className="bg-black max-w-16 mx-auto" />
          </div>
        )}
      </div>
    </Section>
  );
});
