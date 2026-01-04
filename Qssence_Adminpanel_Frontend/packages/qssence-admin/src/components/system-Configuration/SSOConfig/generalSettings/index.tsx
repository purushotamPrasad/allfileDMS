import ConfigForm from "@/components/configForm";

interface FormField {
    id: string;
    label: string;
    type: string;
    validationMessage: string;
    fieldType: 'text' | 'select' | 'switch' | 'autocomplete'; // Add 'switch' as a field type
    selectOptions?: { value: string; label: string }[];
    autocompleteOptions?: { value: string; label: string }[];
    required: boolean;
    additionalValidations?: { [key: string]: any };
}

const formFields: FormField[] = [
    {
        id: "redirectUrl",
        label: "Redirect URI",
        type: "text",
        validationMessage: "Redirect Url is required",
        fieldType: 'text',
        required: true,
        additionalValidations: {
            maxLength: {
                value: 100,
                message: "Maximum length exceeded for Redirect URI",
            },
            pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Only alphabets and spaces are allowed for Redirect URI",
            },
        },
    },
    {
        id: "alias",
        label: "Alias",
        type: "text",
        validationMessage: "Alias is required",
        fieldType: 'text',
        required: true,
    },
    {
        id: "displayName",
        label: "Display Name",
        type: "text",
        validationMessage: "", 
        fieldType: 'text',
        required: true,
    },
    {
        id: "displayOrder",
        label: "Display Order",
        type: "text",
        validationMessage: "Display Order is required",
        fieldType: 'text',
        required: true,
    },
];

const formFieldsObject: { [key: string]: FormField[] } = {
    "": formFields,
};

const GeneralSettings = () => {
    const onSubmit = async (data: any) => {
        console.log(data, "parent");
    };

    return (
        <div>
            <ConfigForm formFields={formFieldsObject} Submit={onSubmit} />
        </div>
    );
};

export default GeneralSettings;
