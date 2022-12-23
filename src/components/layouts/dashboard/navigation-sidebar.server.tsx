import {
  ArchiveBoxIcon,
  FlagIcon,
  InboxIcon,
  NoSymbolIcon,
  PencilSquareIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const sidebarNavigation = [
  { name: "Open", href: "#", icon: InboxIcon, current: true },
  { name: "Archive", href: "#", icon: ArchiveBoxIcon, current: false },
  { name: "Customers", href: "#", icon: UserCircleIcon, current: false },
  { name: "Flagged", href: "#", icon: FlagIcon, current: false },
  { name: "Spam", href: "#", icon: NoSymbolIcon, current: false },
  { name: "Drafts", href: "#", icon: PencilSquareIcon, current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

/* Narrow sidebar*/
export const NavigationSidebar = () => {
  return (
    <div
      aria-label="Sidebar"
      className="inset-y-0 z-10 hidden w-20 bg-zinc-900 md:fixed md:flex md:flex-col"
    >
      {/* Logo area */}
      <div className="left-0 md:static md:flex-shrink-0">
        <Link
          href="/"
          className="flex h-16 w-16 items-center justify-center bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 md:w-20"
        >
          <Image
            src="https://tailwindui.com/img/logos/mark.svg?color=white"
            alt="Your Company"
            height="48"
            width="48"
          />
        </Link>
      </div>

      <nav className="hidden md:block md:flex-shrink-0 md:overflow-y-auto">
        <div className="relative flex w-20 flex-col space-y-3 p-3">
          {sidebarNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-400 hover:bg-gray-700",
                "inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg"
              )}
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default NavigationSidebar;
