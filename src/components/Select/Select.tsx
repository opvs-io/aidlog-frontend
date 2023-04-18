/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import cx from 'classnames';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

export type SelectItem = {
  id: number | string;
  name: string;
};

type Props<T> = {
  items: T[];
  value: T | undefined;
  onChange: (item: T) => void;
  label: string;
  showLabel?: boolean;
  placeholder?: string;
  error?: boolean;
  errorDescription?: string;
  disabled?: boolean;
};

const Select = <T extends SelectItem>({
  items,
  label,
  onChange,
  value,
  showLabel = true,
  placeholder,
  error,
  errorDescription,
  disabled,
}: Props<T>) => {
  return (
    <div
      className={cx({
        'group error': error,
      })}
    >
      <Listbox disabled={disabled} value={value} onChange={onChange}>
        {({ open }) => (
          <>
            {showLabel && label && (
              <Listbox.Label className="block  text-sm font-medium text-gray-700">
                {label}
              </Listbox.Label>
            )}

            <div className="mt-1 relative">
              <Listbox.Button
                className={cx(
                  'bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
                  'group-[.error]:border-red-300 group-[.error]:text-red-900 group-[.error]:placeholder-red-300 group-[.error]:focus:ring-red-500 group-[.error]:focus:border-red-500',
                  'disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-500 disabled: placeholder-gray-400',
                )}
              >
                <span className="block truncate">
                  {value?.name ? value.name : <>{placeholder || <>&nbsp;</>}</>}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {items.map((item) => (
                    <Listbox.Option
                      key={item.id}
                      className={({ active }) =>
                        cx(
                          active ? 'text-white bg-indigo-600' : 'text-gray-900',
                          'cursor-default select-none relative py-2 pl-3 pr-9',
                        )
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={cx(
                              selected ? 'font-semibold' : 'font-normal',
                              'block truncate',
                            )}
                          >
                            {item.name}
                          </span>

                          {selected && (
                            <span
                              className={cx(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>

            {Boolean(error) && Boolean(errorDescription) && (
              <p className="pt-2 text-sm text-red-600" id="email-error">
                {errorDescription}
              </p>
            )}
          </>
        )}
      </Listbox>
    </div>
  );
};

export default Select;
