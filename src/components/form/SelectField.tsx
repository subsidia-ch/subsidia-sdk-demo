import React, { SelectHTMLAttributes } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

type SelectFieldProps = {
  name: string;
  label: string;
  defaultValue: string;
  options: {
    value: string;
    label: string;
  }[];
  required?: boolean;
  error: boolean;
} & SelectHTMLAttributes<HTMLSelectElement>;

export default function SelectField({ label, name, options, defaultValue, required = false, error, ...props }: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block space-y-2">
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-500 md:text-base">{label}{required && '*'}</div>
        </div>
        <select
          name={name}
          defaultValue={defaultValue}
          className="text-dark-700 focus:ring-opacity-25 focus:border-signal-200 focus:ring-signal-300 w-full rounded border border-gray-300 bg-white px-4 py-2.5 text-base outline-none focus:ring-2 focus:outline-none"
          {...props}
        >
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
      {error && (
        <div className="flex items-center space-x-1">
          <ExclamationCircleIcon className="none flex h-4 w-4 text-red-400" />
          <div className="text-sm text-red-400 md:text-base">Dieses Feld muss valide ausgefüllt werden</div>
        </div>
      )}
    </div>
  );
}
