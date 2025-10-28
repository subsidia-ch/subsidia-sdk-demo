'use server';

import {getSubsidiaClient} from '@/subsidia/client';
import {
    ApiPostCustomerSignUpResponse,
    CustomerGender, CustomerPhoneType,
    PostCustomerSignUpData,
    PostCustomerSignUpValidationResponse,
} from '@subsidia-ch/sdk';
import {CustomerSignUpFormState} from '@/components/customers/sign-up/sign-up-form';
import {redirect} from 'next/navigation';

export async function signUpCustomer(formState: CustomerSignUpFormState, formData: FormData): Promise<CustomerSignUpFormState> {
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const companyName = formData.get('companyName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const phoneType = formData.get('phoneType') as CustomerPhoneType;
    const dateOfBirth = formData.get('dateOfBirth') as string;
    const gender = formData.get('gender') as CustomerGender;
    const website = formData.get('website') as string;
    const title = formData.get('title') as string;
    const additionalAddress = formData.get('additionalAddress') as string;
    const street = formData.get('street') as string;
    const houseNo = formData.get('houseNo') as string;
    const floor = formData.get('floor') as string;
    const postBox = formData.get('postBox') as string;
    const zipCode = formData.get('zipCode') as string;
    const town = formData.get('town') as string;
    const countryCode = formData.get('countryCode') as string;
    const acceptTerms = formData.get('acceptTerms') as string;

    const customerData: PostCustomerSignUpData = {
        firstName,
        lastName,
        companyName,
        dateOfBirth,
        website,
        gender,
        email,
        phone,
        phoneType,
        title,
        additionalAddress,
        street,
        houseNo,
        floor,
        postBox,
        zipCode,
        town,
        countryCode,
        acceptTerms: acceptTerms === 'on',
        agbUrl: formState.agbUrl,
    };

    let response: ApiPostCustomerSignUpResponse | PostCustomerSignUpValidationResponse | undefined;

    try {
        const client = await getSubsidiaClient();

        response = await client.customer.postCustomerSignUp({
            requiredFields: formState.requiredFields,
            resource: customerData,
        });
    } catch (error) {
        console.log(response, error);
        return {
            success: false,
            error: true,
            requiredFields: formState.requiredFields,
            invalidFields: [],
            formValues: customerData,
            agbUrl: formState.agbUrl,
        }
    } finally {
        if (response) {
            if ('valid' in response) {
                return {
                    success: false,
                    error: true,
                    requiredFields: formState.requiredFields,
                    invalidFields: response.invalidFields,
                    hash: undefined,
                    formValues: customerData,
                    agbUrl: formState.agbUrl,
                }
            }

            if ('hash' in response) {
                redirect(`/customers/sign-up/${response.hash}?validTill=${response.validTill}`);
            }
        }

        return {
            success: true,
            error: false,
            requiredFields: formState.requiredFields,
            invalidFields: [],
            formValues: customerData,
            agbUrl: formState.agbUrl,
        }
    }
}