export const unknownError = 999

export const RegistrationErrors = {
    incompleteForm: 10010,
    invalidEmail: 10011,
    emailTaken: 10012,
    passwordTooShort: 10013,
    passwordsNotTheSame: 10014,
    usernameTooShort: 10015,
    usernameTaken: 10016,
    unknown: unknownError
}

export const ConfirmationErrors = {
    alreadyVerified: 10001,
    userNotFound: 10002,
    pinExpired: 10003,
    pinInvalid: 10004
}

export const UserErrors = {
    userNotFound: 10030,
    accountNotVerified: 10033,
    passwordNotFound: 10034,
    passwordTooShort: 10035,
    pinExpired: 10037,
    invalidPin: 10038,
    passwordsNotTheSame: 10039,
    accountNotActive: 10040
}

export const LoginErrors = {
    userNotFound: 10024,
    badCredentials: 10025,
    credentialsNotFound: 10026
}

export const InternalRequestErrors = {
    urlNotFound: 1,
    tokenNotFound: 2,
    dataNotFound: 3,
    invalidDataFormat: 4
}
