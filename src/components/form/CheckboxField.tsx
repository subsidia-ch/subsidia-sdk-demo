import React, { InputHTMLAttributes, ReactNode } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

type CheckboxFieldProps = {
  name: string;
  label: ReactNode;
  defaultChecked?: boolean;
  required?: boolean;
  error: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children' | 'defaultValue' | 'defaultChecked' | 'name'>;

export default function CheckboxField({
  label,
  name,
  defaultChecked = false,
  required = false,
  error,
  className,
  ...props
}: CheckboxFieldProps) {
  const ringColor = error
    ? 'focus-visible:ring-red-400 focus-visible:border-red-500'
    : 'focus-visible:ring-neutral-400 focus-visible:border-neutral-500';

  const checkboxClasses = [
    'h-4 w-4 rounded border bg-white accent-neutral-900',
    error ? 'border-red-300' : 'border-gray-300',
    'focus-visible:outline-none focus-visible:ring-2',
    ringColor,
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="space-y-2">
      <label className="block space-y-2">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name={name}
            defaultChecked={defaultChecked}
            aria-invalid={error || undefined}
            aria-describedby={error ? `${name}-error` : undefined}
            className={checkboxClasses}
            {...props}
          />
          <span className="text-sm font-medium text-gray-700 [&_a]:text-neutral-900 [&_a]:underline [&_a]:decoration-neutral-400 hover:[&_a]:no-underline">
            {label} {required ? <span aria-hidden className="text-red-500">*</span> : null}
          </span>
        </div>
      </label>
      {error && (
        <div id={`${name}-error`} className="flex items-center gap-1 text-sm text-red-600">
          <ExclamationCircleIcon className="h-4 w-4" />
          <span>Dieses Feld muss valide ausgefüllt werden</span>
        </div>
      )}
    </div>
  );
}
