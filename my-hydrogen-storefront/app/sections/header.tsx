// app/sections/header.tsx
import { MagnifyingGlassIcon, UserIcon } from "@phosphor-icons/react";
import { createSchema, type HydrogenComponentProps } from "@weaverse/hydrogen";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import { forwardRef, Suspense } from "react";
import {
  Await,
  useLocation,
  useRouteError,
  useRouteLoaderData,
} from "react-router";
import useWindowScroll from "react-use/esm/useWindowScroll";
import { CartDrawer } from "~/components/layout/cart-drawer";
import { DesktopMenu } from "~/components/layout/desktop-menu";
import { MobileMenu } from "~/components/layout/mobile-menu";
import { PredictiveSearchButton } from "~/components/layout/predictive-search";
import Link from "~/components/link";
import { Logo } from "~/components/logo";
import type { RootLoader } from "~/root";
import { cn } from "~/utils/cn";
import { DEFAULT_LOCALE } from "~/utils/const";

interface HeaderProps extends HydrogenComponentProps {
  logoPosition: "left" | "center";
  mobileLogoPosition: "left" | "center";
  backgroundColor: string;
  headerWidth?: "full" | "stretch" | "fixed";
}

const variants = cva("", {
  variants: {
    width: {
      full: "h-full w-full",
      stretch: "h-full w-full",
      fixed: "mx-auto h-full w-full max-w-(--page-width)",
    },
    padding: {
      full: "",
      stretch: "px-3 md:px-10 lg:px-16",
      fixed: "mx-auto px-3 md:px-4 lg:px-6",
    },
  },
});

function useIsHomeCheck() {
  const { pathname } = useLocation();
  const rootData = useRouteLoaderData<RootLoader>("root");
  const selectedLocale = rootData?.selectedLocale ?? DEFAULT_LOCALE;
  return pathname.replace(selectedLocale.pathPrefix, "") === "/";
}

const MyHeader = forwardRef<HTMLElement, HeaderProps>((props, ref) => {
  const {
    logoPosition = "left",
    mobileLogoPosition = "center",
    backgroundColor = "",
    headerWidth = "fixed",
    ...rest
  } = props;

  const { y } = useWindowScroll();
  const scrolled = y >= 50;

  return (
    <header
      ref={ref}
      {...rest}
      style={{
        backgroundColor: backgroundColor || undefined,
      }}
      className={cn(
        "z-10 w-full",
        "transition-all duration-300 ease-in-out",
        "border-line-subtle border-b",
        variants({ padding: headerWidth }),
        scrolled ? "shadow-header" : "shadow-none",
        "sticky top-0",
        "[&_.cart-count]:text-(--color-header-bg)",
        "[&_.cart-count]:bg-(--color-header-text)",
        "[&_.main-logo]:opacity-100",
        "[&_.transparent-logo]:opacity-0",
      )}
    >
      <div
        className={cn(
          "flex h-(--height-nav) items-center gap-2 py-1.5 lg:gap-8 lg:py-3",
          variants({ width: headerWidth }),
        )}
      >
        {/* Mobile Menu - luôn hiển thị bên trái */}
        <MobileMenu />

        {/* Layout khác nhau tùy theo logo position */}
        {logoPosition === "left" ? (
          // Layout khi logo ở trái
          <>
            <Link to="/search" className="p-1.5 lg:hidden">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </Link>
            <Logo />
            <DesktopMenu />
            <div className="z-1 flex items-center gap-1">
              <PredictiveSearchButton />
              <AccountLink className="relative flex h-8 w-8 items-center justify-center" />
              <CartDrawer />
            </div>
          </>
        ) : (
          <>
            <div className="flex-1">
              <DesktopMenu />
              <Link to="/search" className="p-1.5 lg:hidden">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </Link>
            </div>

            <div className="flex-shrink-0">
              <Logo />
            </div>

            <div className="flex-1 flex justify-end items-center gap-1">
              <PredictiveSearchButton />
              <AccountLink className="relative flex h-8 w-8 items-center justify-center" />
              <CartDrawer />
            </div>
          </>
        )}
      </div>
    </header>
  );
});

function AccountLink({ className }: { className?: string }) {
  const rootData = useRouteLoaderData<RootLoader>("root");
  const isLoggedIn = rootData?.isLoggedIn;

  return (
    <Link to="/account" className={clsx("transition-none", className)}>
      <Suspense fallback={<UserIcon className="size-5" />}>
        <Await
          resolve={isLoggedIn}
          errorElement={<UserIcon className="size-5" />}
        >
          {(loggedIn) =>
            loggedIn ? (
              <UserIcon className="h-5 w-5" />
            ) : (
              <UserIcon className="h-5 w-5" />
            )
          }
        </Await>
      </Suspense>
    </Link>
  );
}

export default MyHeader;

export const schema = createSchema({
  type: "my-header",
  title: "My Header",
  limit: 1,
  settings: [
    {
      group: "Layout",
      inputs: [
        {
          type: "select",
          name: "logoPosition",
          label: "Logo position",
          defaultValue: "left",
          configs: {
            options: [
              { value: "left", label: "Left" },
              { value: "center", label: "Middle center" },
            ],
          },
        },
        {
          type: "select",
          name: "mobileLogoPosition",
          label: "Mobile logo position",
          defaultValue: "center",
          configs: {
            options: [
              { value: "left", label: "Left" },
              { value: "center", label: "Center" },
            ],
          },
        },
        {
          type: "select",
          name: "headerWidth",
          label: "Header width",
          defaultValue: "fixed",
          configs: {
            options: [
              { value: "full", label: "Full page" },
              { value: "stretch", label: "Stretch" },
              { value: "fixed", label: "Fixed" },
            ],
          },
        },
      ],
    },
    {
      group: "Colors",
      inputs: [
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
    logoPosition: "left",
    mobileLogoPosition: "center",
    headerWidth: "fixed",
    backgroundColor: "#ffffff",
  },
});
