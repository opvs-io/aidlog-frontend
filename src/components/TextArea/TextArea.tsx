import cx from 'classnames';
import React, { TextareaHTMLAttributes } from 'react';

type NativeProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

type Props = NativeProps & {
  label: string;
  showLabel?: boolean;
  value?: string;
  error?: boolean;
  errorDescription?: string;
};

const TextArea = ({
  label,
  showLabel = true,
  value,
  error,
  errorDescription,
  ...props
}: Props) => {
  return (
    <div
      className={cx('space-y-1', {
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

      <div>
        <textarea
          type="text"
          value={value}
          className={cx(
            'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
            'disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-500 disabled: placeholder-gray-400',
            'group-[.error]:border-red-300 group-[.error]:text-red-900 group-[.error]:placeholder-red-300 group-[.error]:focus:ring-red-500 group-[.error]:focus:border-red-500',
          )}
          {...props}
        />

        {Boolean(error) && Boolean(errorDescription) && (
          <p className="pt-2 text-sm text-red-600" id="email-error">
            {errorDescription}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextArea;
