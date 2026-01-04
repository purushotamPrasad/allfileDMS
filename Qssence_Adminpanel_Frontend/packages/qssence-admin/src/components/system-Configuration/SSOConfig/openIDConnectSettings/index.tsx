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
        id: "authorizationURL",
        label: "Authorization URL",
        type: "text",
        validationMessage: "Authorization URL is required",
        fieldType: 'text',
        required: true,
        additionalValidations: {
            maxLength: {
                value: 100,
                message: "Maximum length exceeded for Authorization URL",
            },
            pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Only alphabets and spaces are allowed for Authorization URL",
            },
        },
    },
    {
        id: "tokenURL",
        label: "Token URL",
        type: "text",
        validationMessage: "Token URL is required",
        fieldType: 'text',
        required: true,
    },
    {
        id: "logoutURL",
        label: "Logout URL",
        type: "text",
        validationMessage: "Logout URL is required",
        fieldType: 'text',
        required: true,
    },
    {
        id: "userInfoURL",
        label: "User Info URL",
        type: "text",
        validationMessage: "User Info URL is required",
        fieldType: 'text',
        required: true,
    },
    {
        id: "issuer",
        label: "Issuer",
        type: "text",
        validationMessage: "Issuer is required",
        fieldType: 'text',
        required: true,
    },
    {
        id: "validateSignatures",
        label: "Validate Signatures", 
        type: "switch", 
        validationMessage: "Validate Signatures is required", 
        fieldType: 'switch', 
        required: false,
    },
    {
        id: "useJWKSURL",
        label: "Use JWKS URL", 
        type: "switch", 
        validationMessage: "Use JWKS URL is required", 
        fieldType: 'switch', 
        required: false,
    },
    {
        id: "JWKSURL",
        label: "JWKS URL",
        type: "text",
        validationMessage: "JWKS URL is required",
        fieldType: 'text',
        required: true,
    },
    {
        id: "validatingPublicKey",
        label: "Validating public key",
        type: "text",
        validationMessage: "Validating public key is required",
        fieldType: 'text',
        required: true,
    },
    {
        id: "validatingPublicKeyId",
        label: "Validating public key id",
        type: "text",
        validationMessage: "Validating public key id is required",
        fieldType: 'text',
        required: true,
    },
    {
        id: "usePKCE",
        label: "Use PKCE", 
        type: "switch", 
        validationMessage: "Use PKCE is required", 
        fieldType: 'switch', 
        required: false,
    },
];

const clientFormFields: FormField[] = [
    {
        id: "clientAuthentication",
        label: "Client authentication",
        type: "select",
        validationMessage: "Client authentication is required",
        fieldType: 'select',
        required: true,
        selectOptions: [
            { value: "Client secret sent as post", label: "Client secret sent as post" },
            { value: "Client secret sent as basic auth", label: "Client secret sent as basic auth" },
            { value: "JWT signed with client secret", label: "JWT signed with client secret" },
            { value: "JWT signed with private key", label: "JWT signed with private key" }
        ],
    },
    {
        id: "clientId",
        label: "Client ID",
        type: "text",
        validationMessage: "Client ID is required",
        fieldType: 'text',
        required: true,
    },
    {
        id: "clientSecret",
        label: "Client Secret",
        type: "text",
        validationMessage: "Client Secret is required",
        fieldType: 'text',
        required: true,
    },
    {
        id: "ClientAssertionSignatureAlgorithm",
        label: "Client assertion signature algorithm",
        type: "select",
        validationMessage: "Client assertion signature algorithm is required",
        fieldType: 'select',
        required: true,
        selectOptions: [
            { value: "Algorithm not specified", label: "Algorithm not specified" },
            { value: "ES256", label: "ES256" },
            { value: "ES384", label: "ES384" },
            { value: "ES512", label: "ES512" },
            { value: "HS384", label: "HS384" },
            { value: "HS512", label: "HS512" },
            { value: "PS256", label: "PS256" },
            { value: "PS384", label: "PS384" },
            { value: "PS512", label: "PS512" },
            { value: "PS256", label: "PS256" },
            { value: "RS384", label: "RS384" },
            { value: "RS512", label: "RS512" }
        ],
    },
];

const advanceFormFields: FormField[] = [
    {
        id: "passLogin_hint",
        label: "Pass login_hint", 
        type: "switch", 
        validationMessage: "Pass login_hint is required", 
        fieldType: 'switch', 
        required: false,
    },
    {
        id: "passMax_age",
        label: "Pass max_age", 
        type: "switch", 
        validationMessage: "Pass max_age is required", 
        fieldType: 'switch', 
        required: false,
    },
    {
        id: "passCurrentLocale",
        label: "Pass current locale", 
        type: "switch", 
        validationMessage: "Pass current locale is required", 
        fieldType: 'switch', 
        required: false,
    },
    {
        id: "backchannelLogout",
        label: "Backchannel logout", 
        type: "switch", 
        validationMessage: "Backchannel logout is required", 
        fieldType: 'switch', 
        required: false,
    },
    {
        id: "disableUserInfo",
        label: "Disable user info", 
        type: "switch", 
        validationMessage: "Disable user info is required", 
        fieldType: 'switch', 
        required: false,
    },
    {
        id: "disableNonce",
        label: "Disable nonce", 
        type: "switch", 
        validationMessage: "Disable nonce is required", 
        fieldType: 'switch', 
        required: false,
    },
    {
        id: "scopes",
        label: "Scopes",
        type: "text",
        validationMessage: "Scopes is required",
        fieldType: 'text',
        required: true,
    },
    {
        id: "prompt",
        label: "Prompt",
        type: "select",
        validationMessage: "Prompt is required",
        fieldType: 'select',
        required: true,
        selectOptions: [
            { value: "Unspecified", label: "Unspecified" },
            { value: "None", label: "None" },
            { value: "Consent", label: "Consent" },
            { value: "Login", label: "Login" },
            { value: "Select Account", label: "Select Account" }
        ],
    },
    {
        id: "acceptsPrompt=noneForwardFromClient",
        label: "Accepts prompt=none forward from client",
        type: "switch", 
        validationMessage: "Accepts prompt=none forward from client is required", 
        fieldType: 'switch', 
        required: false, 
    },
    {
        id: "allowedClockSkew",
        label: "Allowed clock skew",
        type: "text",
        validationMessage: "Allowed clock skew is required",
        fieldType: 'text',
        required: true,
    },
    {
        id: "forwardedQueryParameters",
        label: "Forwarded query parameters",
        type: "text",
        validationMessage: "Forwarded query parameters is required",
        fieldType: 'text',
        required: true,
    },
];
const formFieldsObject: { [key: string]: FormField[] } = {
    "": formFields,
    "Client settings": clientFormFields,
    "Advance": advanceFormFields
};

function OpenIDConnectSettings() {


    const onSubmit = async (data: any) => {
        console.log(data, "parent");
    };
    return (
        <div>
            <ConfigForm formFields={formFieldsObject} Submit={onSubmit} />
        </div>
    )
}
export default OpenIDConnectSettings