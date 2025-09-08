import {HTMLInputTypeAttribute} from 'react';
import {ExclamationCircleIcon} from '@heroicons/react/24/solid';

type InputFieldProps = {
    name: string;
    label: string;
    type: HTMLInputTypeAttribute;
    defaultValue: string;
    required?: boolean;
    error: boolean;
};

export default function InputField({label, type, name, defaultValue, required = false, error}: InputFieldProps) {
    return (
        <div className="space-y-2">
            <label className="block space-y-2">
                <div className="flex items-center space-x-2">
                    <div className="text-sm text-gray-500 md:text-base">{label}{required ? '*' : ''}</div>
                </div>
                <input
                    type={type}
                    name={name}
                    defaultValue={defaultValue}
                    className={`text-dark-700 focus:ring-opacity-25 w-full rounded border bg-white px-4 py-2 text-base outline-none focus:ring-2 focus:outline-none ${error ? 'border-red-300 focus:ring-red-400' : 'focus:border-signal-200 focus:ring-signal-300 border-gray-300'}`}
                />
            </label>
            {error && (
                <div className="flex items-center space-x-1">
                    <ExclamationCircleIcon className="none flex h-4 w-4 text-red-400"/>
                    <div className="text-sm text-red-400 md:text-base">Dieses Feld muss valide ausgefüllt werden</div>
                </div>
            )}
        </div>
    );
}
