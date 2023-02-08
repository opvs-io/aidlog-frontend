import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  HomeIcon,
  Bars4Icon,
  XMarkIcon,
  BoltIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  MapIcon,
  UsersIcon,
  ArchiveBoxIcon,
} from '@heroicons/react/24/outline';
import cx from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

const generalNavigation = [
  { name: 'Panel', href: '#', icon: HomeIcon, current: true },
];

const aidNavigation = [
  { name: 'Bağışlar', href: '#', icon: ArrowLeftIcon, current: false },
  { name: 'Talepler', href: '#', icon: ArrowRightIcon, current: false },
  { name: 'Aksiyonlar', href: '#', icon: BoltIcon, current: false },
  { name: 'Envanter', href: '#', icon: ArchiveBoxIcon, current: false },
];

const contentNavigation = [
  { name: 'Toplanma Alanları', href: '#', icon: MapIcon, current: false },
  { name: 'Kullanıcılar', href: '#', icon: UsersIcon, current: false },
];

const userNavigation = [
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

const createUserAvatarUrl = (fullName: string) => {
  const firstLetter = fullName[0] || 'U';

  return `https://ui-avatars.com/api/?name=${firstLetter}&background=000&color=fff`;
};

const user = {
  name: 'Tom Cook',
  avatar: createUserAvatarUrl('Tom Cook'),
};

type Props = {
  children: React.ReactNode;
  title: string;
};

export default function SidebarLayout({ children, title }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
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
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700">
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
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <Link href="/">
                  <span className="text-white text-2xl font-bold">AidLog</span>
                </Link>
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto space-y-6">
                <nav className="px-2 space-y-1">
                  {generalNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={cx(
                        item.current
                          ? 'bg-indigo-800 text-white'
                          : 'text-indigo-100 hover:bg-indigo-600',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                      )}
                    >
                      <item.icon
                        className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>

                <div>
                  <span className="px-3 text-xs font-semibold text-indigo-200 uppercase tracking-wider">
                    İstek Yönetimi
                  </span>

                  <nav className="mt-2 px-2 space-y-1">
                    {aidNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={cx(
                          item.current
                            ? 'bg-indigo-800 text-white'
                            : 'text-indigo-100 hover:bg-indigo-600',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                        )}
                      >
                        <item.icon
                          className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </div>

                <div>
                  <span className="px-3 text-xs font-semibold text-indigo-200 uppercase tracking-wider">
                    İçerik Yönetimi
                  </span>

                  <nav className="mt-2 px-2 space-y-1">
                    {contentNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={cx(
                          item.current
                            ? 'bg-indigo-800 text-white'
                            : 'text-indigo-100 hover:bg-indigo-600',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                        )}
                      >
                        <item.icon
                          className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col flex-grow pt-5 bg-indigo-700 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Link href="/">
              <span className="text-white text-2xl font-bold">AidLog</span>
            </Link>
          </div>
          <div className="mt-5 flex-1 flex flex-col space-y-6">
            <nav className="px-2 space-y-1">
              {generalNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={cx(
                    item.current
                      ? 'bg-indigo-800 text-white'
                      : 'text-indigo-100 hover:bg-indigo-600',
                    'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                  )}
                >
                  <item.icon
                    className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </nav>

            <div>
              <span className="px-3 text-xs font-semibold text-indigo-200 uppercase tracking-wider">
                İstek Yönetimi
              </span>

              <nav className="mt-2 px-2 space-y-1">
                {aidNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={cx(
                      item.current
                        ? 'bg-indigo-800 text-white'
                        : 'text-indigo-100 hover:bg-indigo-600',
                      'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                    )}
                  >
                    <item.icon
                      className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <span className="px-3 text-xs font-semibold text-indigo-200 uppercase tracking-wider">
                İçerik Yönetimi
              </span>

              <nav className="mt-2 px-2 space-y-1">
                {contentNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={cx(
                      item.current
                        ? 'bg-indigo-800 text-white'
                        : 'text-indigo-100 hover:bg-indigo-600',
                      'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                    )}
                  >
                    <item.icon
                      className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars4Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="ml-4 flex flex-1 items-center justify-end md:ml-6">
              {/* Profile dropdown */}
              <Menu as="div" className="relative">
                <div>
                  <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Open user menu</span>

                    <Image
                      className="h-8 w-8 rounded-full"
                      alt="Avatar"
                      src={{
                        width: 100,
                        height: 100,
                        src: user.avatar,
                      }}
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <a
                            href={item.href}
                            className={cx(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700',
                            )}
                          >
                            {item.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <main>
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
