import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import React from 'react';

type NativeProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type Props = NativeProps & {
  label: string;
  showLabel?: boolean;
  value?: string;
  error?: boolean;
  errorDescription?: string;
};

const TextInput = ({
  label,
  showLabel = true,
  value,
  error,
  errorDescription,
  ...props
}: Props) => {
  return (
    <div
      className={classNames('space-y-1', {
        'group error': error,
      })}
    >
      {showLabel && Boolean(label) && (
        <label
          htmlFor="project-name"
          className="block text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type="text"
          value={value}
          className={classNames(
            'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed ',
            'disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-500 disabled: placeholder-gray-400',
            'group-[.error]:border-red-300 group-[.error]:text-red-900 group-[.error]:placeholder-red-300 group-[.error]:focus:ring-red-500 group-[.error]:focus:border-red-500',
          )}
          {...props}
        />

        {Boolean(error) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {Boolean(error) && Boolean(errorDescription) && (
        <p className="pt-2 text-sm text-red-600" id="email-error">
          {errorDescription}
        </p>
      )}
    </div>
  );
};

export default TextInput;
