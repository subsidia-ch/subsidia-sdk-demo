'use client';

import {useSearchParams} from 'next/navigation';
import {useActionState, useState} from 'react';
import {signUpCustomer} from '@/app/customers/sign-up/actions';
import {Country, PostCustomerSignUpData} from '@subsidia-ch/sdk';
import InputField from '@/components/form/InputField';
import SelectField from '@/components/form/SelectField';

export type CustomerSignUpFormState = {
    success: boolean;
    error: boolean;
    requiredFields: (keyof PostCustomerSignUpData)[];
    hash?: string;
    formValues: PostCustomerSignUpData;
    invalidFields?: (keyof PostCustomerSignUpData)[];
}

type SignUpFormProps = {
    countries: Country[];
}

export default function SignUpForm({countries}: SignUpFormProps) {
    const searchParams = useSearchParams();
    const [showAllFields, setShowAllFields] = useState<boolean>(false);
    const requiredFieldsParam = searchParams.get('requiredFields');
    const requiredFields = requiredFieldsParam ? requiredFieldsParam.split(',') : ['firstName', 'lastName'];

    const [formState, formAction, isPending] = useActionState<CustomerSignUpFormState, FormData>(signUpCustomer, {
        success: false,
        error: false,
        requiredFields: requiredFields as (keyof PostCustomerSignUpData)[],
        formValues: {},
        invalidFields: [],
    });

    const isRequired = (field: keyof PostCustomerSignUpData) => requiredFields.includes(field);

    return (
        <div>
            <form action={formAction} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(isRequired('firstName') || showAllFields) && (
                        <InputField name="firstName"
                                    label="First Name"
                                    type="text"
                                    defaultValue={formState.formValues?.firstName || ''}
                                    required={isRequired('firstName')}
                                    error={!!formState.invalidFields?.includes('firstName')}/>
                    )}
                    {(isRequired('lastName') || showAllFields) && (
                        <InputField name="lastName"
                                    label="Last Name"
                                    type="text"
                                    defaultValue={formState.formValues?.lastName || ''}
                                    required={isRequired('lastName')}
                                    error={!!formState.invalidFields?.includes('lastName')}/>
                    )}

                    {(isRequired('companyName') || showAllFields) && (
                        <div className="col-span-2">
                            <InputField name="companyName"
                                        label="Company Name"
                                        type="text"
                                        defaultValue={formState.formValues?.companyName || ''}
                                        required={isRequired('companyName')}
                                        error={!!formState.invalidFields?.includes('companyName')}/>
                        </div>
                    )}

                    {(isRequired('email') || showAllFields) && (
                        <InputField name="email"
                                    label="Email"
                                    type="email"
                                    defaultValue={formState.formValues?.email || ''}
                                    required={isRequired('email')}
                                    error={!!formState.invalidFields?.includes('email')}/>
                    )}

                    {(isRequired('phone') || showAllFields) && (
                        <InputField name="phone"
                                    label="Phone"
                                    type="tel"
                                    defaultValue={formState.formValues?.phone || ''}
                                    required={isRequired('phone')}
                                    error={!!formState.invalidFields?.includes('phone')}/>
                    )}

                    {(isRequired('dateOfBirth') || showAllFields) && (
                        <InputField name="dateOfBirth"
                                    label="Date of Birth"
                                    type="date"
                                    defaultValue={formState.formValues?.dateOfBirth || ''}
                                    required={isRequired('dateOfBirth')}
                                    error={!!formState.invalidFields?.includes('dateOfBirth')}/>
                    )}

                    {(isRequired('gender') || showAllFields) && (
                        <SelectField name="gender"
                                     label="Gender"
                                     defaultValue={formState.formValues?.gender || ''}
                                     required={isRequired('gender')}
                                     options={[
                                         {
                                             value: 'MALE',
                                             label: 'Male',
                                         },
                                         {
                                             value: 'FEMALE',
                                             label: 'Female',
                                         },
                                         {
                                             value: 'OTHER',
                                             label: 'Other',
                                         },
                                     ]}
                                     error={!!formState.invalidFields?.includes('gender')}/>
                    )}

                    {(isRequired('website') || showAllFields) && (
                        <div className="col-span-2">
                            <InputField name="website"
                                        label="Website"
                                        type="text"
                                        defaultValue={formState.formValues?.website || ''}
                                        required={isRequired('website')}
                                        error={!!formState.invalidFields?.includes('website')}/>
                        </div>
                    )}

                    {(isRequired('title') || showAllFields) && (
                        <div className="col-span-2">
                            <InputField name="title"
                                        label="Title"
                                        type="text"
                                        defaultValue={formState.formValues?.title || ''}
                                        required={isRequired('title')}
                                        error={!!formState.invalidFields?.includes('title')}/>
                        </div>
                    )}
                    {(isRequired('additionalAddress') || showAllFields) && (
                        <div className="col-span-2">
                            <InputField name="additionalAddress"
                                        label="Address-Addition"
                                        type="text"
                                        defaultValue={formState.formValues?.additionalAddress || ''}
                                        required={isRequired('additionalAddress')}
                                        error={!!formState.invalidFields?.includes('additionalAddress')}/>
                        </div>
                    )}
                    {(isRequired('street') || isRequired('houseNo') || showAllFields) && (
                        <div className="col-span-2 grid grid-cols-3 md:grid-cols-4 gap-4">
                            <div className="col-span-2 md:col-span-3">
                                <InputField name="street"
                                            label="Street"
                                            type="text"
                                            defaultValue={formState.formValues?.street || ''}
                                            required={isRequired('street')}
                                            error={!!formState.invalidFields?.includes('street')}/>
                            </div>
                            <InputField name="houseNo"
                                        label="House-Number"
                                        type="text"
                                        defaultValue={formState.formValues?.houseNo || ''}
                                        required={isRequired('houseNo')}
                                        error={!!formState.invalidFields?.includes('houseNo')}/>
                        </div>
                    )}
                    {(isRequired('floor') || showAllFields) && (
                        <div className="col-span-2">
                            <InputField name="floor"
                                        label="Floor"
                                        type="text"
                                        defaultValue={formState.formValues?.floor || ''}
                                        required={isRequired('floor')}
                                        error={!!formState.invalidFields?.includes('floor')}/>
                        </div>
                    )}
                    {(isRequired('postBox') || showAllFields) && (
                        <div className="col-span-2">
                            <InputField name="postBox"
                                        label="Post-Box"
                                        type="text"
                                        defaultValue={formState.formValues?.postBox || ''}
                                        required={isRequired('postBox')}
                                        error={!!formState.invalidFields?.includes('postBox')}/>
                        </div>
                    )}
                    {(isRequired('zipCode') || isRequired('town') || showAllFields) && (
                        <div className="col-span-2 grid grid-cols-3 md:grid-cols-4 gap-4">
                            <InputField name="zipCode"
                                        label="ZIP Code"
                                        type="text"
                                        defaultValue={formState.formValues?.zipCode || ''}
                                        required={isRequired('zipCode')}
                                        error={!!formState.invalidFields?.includes('zipCode')}/>
                            <div className="col-span-2 md:col-span-3">
                                <InputField name="town"
                                            label="Town"
                                            type="text"
                                            defaultValue={formState.formValues?.town || ''}
                                            required={isRequired('town')}
                                            error={!!formState.invalidFields?.includes('town')}/>
                            </div>
                        </div>
                    )}

                    {(isRequired('countryCode') || showAllFields) && (
                        <div className="col-span-2">
                            <SelectField name="countryCode"
                                         label="Country"
                                         defaultValue={formState.formValues?.countryCode || ''}
                                         required={isRequired('countryCode')}
                                         options={countries.map((country) => ({
                                             value: country.countryCode,
                                             label: country.displayName,
                                         }))}
                                         error={!!formState.invalidFields?.includes('countryCode')}/>
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => setShowAllFields(!showAllFields)}
                    className="w-full bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none transition-all cursor-pointer"
                >
                    {showAllFields ? 'Hide additional fields' : 'Show all fields'}
                </button>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    {isPending ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
}