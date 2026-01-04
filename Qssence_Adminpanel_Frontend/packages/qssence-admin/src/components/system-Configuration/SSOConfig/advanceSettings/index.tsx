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
        id: "storeTokens",
        label: "Store tokens", 
        type: "switch",
        validationMessage: "Store Tokens is required",
        fieldType: 'switch', 
        required: false, 
    },
    {
        id: "storedTokensReadable",
        label: "Stored tokens readable", 
        type: "switch",
        validationMessage: "Stored tokens readable is required",
        fieldType: 'switch', 
        required: false, 
    },
    {
        id: "accessTokenIsJWT",
        label: "Access Token is JWT", 
        type: "switch",
        validationMessage: "Access Token is JWT is required",
        fieldType: 'switch', 
        required: false, 
    },
    {
        id: "trustEmail",
        label: "Trust Email", 
        type: "switch",
        validationMessage: "Trust Email is required",
        fieldType: 'switch', 
        required: false, 
    },
    {
        id: "accountLinkingOnly",
        label: "Account linking only", 
        type: "switch",
        validationMessage: "Account linking only is required",
        fieldType: 'switch', 
        required: false, 
    },
    {
        id: "hideOnLoginPage",
        label: "Hide on login page",
        type: "switch",
        validationMessage: "Hide on login page is required",
        fieldType: 'switch', 
        required: false, 
    },
    {
        id: "verifyEssentialClaim",
        label: "Verify essential claim", 
        type: "switch",
        validationMessage: "Verify essential claim is required",
        fieldType: 'switch', 
        required: false, 
    },
    {
        id: "firstLoginFlow",
        label: "First login flow",
        type: "select",
        validationMessage: "First login flow is required",
        fieldType: 'select',
        required: true,
        selectOptions: [
            { value: "browser", label: "browser" },
            { value: "direct grant", label: "direct grant" },
            { value: "registration", label: "registration" },
            { value: "reset credentials", label: "reset credentials" },
            { value: "first broker login", label: "first broker login" },
            { value: "docker auth", label: "docker auth" }
        ],
    },
    {
        id: "postLoginFlow",
        label: "Post login flow",
        type: "select",
        validationMessage: "Post login flow is required",
        fieldType: 'select',
        required: true,
        selectOptions: [
            { value: "browser", label: "browser" },
            { value: "direct grant", label: "direct grant" },
            { value: "registration", label: "registration" },
            { value: "reset credentials", label: "reset credentials" },
            { value: "first broker login", label: "first broker login" },
            { value: "docker auth", label: "docker auth" }
        ],
    },
    {
        id: "syncMode",
        label: "Sync mode",
        type: "select",
        validationMessage: "Sync mode is required",
        fieldType: 'select',
        required: true,
        selectOptions: [
            { value: "Import", label: "Import" },
            { value: "Legacy", label: "Legacy" },
            { value: "Force", label: "Force" }
        ],
    },
];

function AdvanceSettings() {
    const onSubmit = async (data: any) => {
        console.log(data);
    }

    return (
        <div>
            <ConfigForm formFields={{ "": formFields }} Submit={onSubmit} />
        </div>
    )
}

export default AdvanceSettings;
