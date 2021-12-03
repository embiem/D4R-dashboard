import { Fragment, useState } from "react";
import { Link } from "remix";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExternalLinkIcon,
  CollectionIcon,
  HomeIcon,
  BadgeCheckIcon,
  MenuIcon,
  XIcon,
  EyeOffIcon,
} from "@heroicons/react/outline";
import { useLocation } from "react-router-dom";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const D4RLogo = () => (
  <div className="text-xl tracking-tight text-gray-100">
    <img
      className="inline-block h-10 w-10 rounded-full"
      src="/d4r_logo.png"
      alt="D4R"
    />
    <span className="ml-3">Devs for Revolution</span>
  </div>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();

  const navigation = [
    {
      name: "Tools",
      href: "/",
      icon: HomeIcon,
      current: location.pathname === "/tools",
    },
    {
      name: "Airdrop Checker",
      href: "/tools/airdrop",
      icon: BadgeCheckIcon,
      current: location.pathname.startsWith("/tools/airdrop"),
    },
    {
      name: "NFT Collection",
      href: "/tools/collection",
      icon: CollectionIcon,
      current: location.pathname.startsWith("/tools/collection"),
    },
    {
      name: "Privacy Notice",
      href: "/privacy",
      icon: EyeOffIcon,
      current: location.pathname.startsWith("/privacy"),
    },
    {
      name: "Developer DAO Website",
      href: "https://developerdao.com",
      icon: ExternalLinkIcon,
      current: false,
    },
    /*     {
      name: "D_D Newsletter",
      href: "https://developerdao.substack.com/",
      icon: ExternalLinkIcon,
      current: false,
    }, */
  ];

  const nav = navigation.map((item) => (
    <Link
      key={item.name}
      to={item.href}
      className={classNames(
        item.current
          ? "bg-gray-900 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white",
        "group flex items-center px-2 py-2 text-base font-medium rounded-md"
      )}
    >
      <item.icon
        className={classNames(
          item.current
            ? "text-gray-300"
            : "text-gray-400 group-hover:text-gray-300",
          "mr-4 flex-shrink-0 h-6 w-6"
        )}
        aria-hidden="true"
      />
      {item.name}
    </Link>
  ));

  const user = <></>;
  /* <div className="flex-shrink-0 flex p-4 mt-5">
      <a href="#" className="flex-shrink-0 w-full group block">
        <div className="flex items-center">
          <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
            <svg
              className="h-full w-full text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Tom Cook</p>
            <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
              View profile
            </p>
          </div>
        </div>
      </a>
    </div> */

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <D4RLogo />
                  </div>
                  {user}
                  <nav className="mt-5 px-2 space-y-1">{nav}</nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <D4RLogo />
              </div>
              {user}
              <nav className="mt-5 flex-1 px-2 space-y-1">{nav}</nav>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
