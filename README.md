# Azure Active Directory B2C custom policy samples

This GitHub repository contains the following Azure Active Directory B2C custom policy samples:

| Name                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **sign_up_sign_in**              | **Sign-up** for a local account using an e-mail address *and* a phone number. The end user is prompted for verification of the e-mail address and the phone number. **Sign-in** for a local account using an e-mail address *or* a phone number. If the e-mail address hasn't been verified, then the end user is prompted for verification of the e-mail address. If the phone number hasn't been verified, then the end user is prompted for verification of the phone number.                                             |
| **sign_up_without_verification** | **Sign-up** for a local account using an e-mail address *and* a phone number. The end user is *not* prompted for verification of the e-mail address or the phone number.                                                                                                                                                                                                                                                                                                                                                     |
| **sign_in_with_verification**    | **Sign-in** for a local account using an e-mail address *or* a phone number. If the e-mail address hasn't been verified, then the end user is prompted for verification of the e-mail address. If the phone number hasn't been verified, then the end user is prompted for verification of the phone number.                                                                                                                                                                                                                 |
| **email_sign_up_any_sign_in**    | **Sign-up** for a local account using an e-mail address. The end user is prompted for verification of the e-mail address. A phone number can be linked to the local account using the **phone_linking** policy. **Sign-in** for a local account using an e-mail address *or* a phone number. If the e-mail address hasn't been verified, then the end user is prompted for verification of the e-mail address. If the phone number hasn't been verified, then the end user is prompted for verification of the phone number. |
| **phone_sign_up_any_sign_in**    | **Sign-up** for a local account using a phone number. The end user is prompted for verification of the phone number. An e-mail address can be linked to the local account using the **email_linking** policy. **Sign-in** for a local account using an e-mail address *or* a phone number. If the e-mail address hasn't been verified, then the end user is prompted for verification of the e-mail address. If the phone number hasn't been verified, then the end user is prompted for verification of the phone number.   |
| **email_linking**                | **Linking** of an e-mail address to a local account that has been registered using a phone number. The end user is prompted for verification of the e-mail address.                                                                                                                                                                                                                                                                                                                                                          |
| **phone_linking**                | **Linking** of a phone number to a local account that has been registered using an e-mail address. The end user is prompted for verification of the phone number.                                                                                                                                                                                                                                                                                                                                                            |

## Prerequisites

If you don't already have one, then you must [create an Azure AD B2C tenant](https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-tenant) that is linked to your Azure subscription.

## Prepare the Azure AD B2C tenant for the custom policies

Prepare your Azure AD B2C tenant by [creating the token signing and encryption keys](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-get-started-custom#add-signing-and-encryption-keys) and [creating the Identity Experience Framework applications](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-get-started-custom#register-applications).

## Create the custom attributes for the custom policies

[Create a custom attribute](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-reference-custom-attr) for each of the following attributes:

| Name              | Data Type   | Description                                                         |
|-------------------|-------------|---------------------------------------------------------------------|
| **EmailVerified** | **Boolean** | A value indicating the end-user's e-mail address has been verified. |
| **PhoneVerified** | **Boolean** | A value indicating the end-user's phone number has been verified.   |

## Clone or download the custom policies

From the command line:

```
git clone https://github.com/chrispadgettlivecom/active-directory-b2c-custom-policy-samples.git
```

## Configure the custom policies

The custom policies can be configured for your Azure AD B2C tenant by creating a configuration file and then generating the XML files to be uploaded to your Azure AD B2C tenant.

### Create a configuration file

Add a **local.json** file or edit the **default.json** file in the **Policies\config** directory with the configuration settings for your Azure AD B2C tenant.

```json
{
  "iefAuthenticationApplication": {
    "clientId": "<IdentityExperienceFrameworkApplicationAppId"
  },
  "iefAuthenticationProxyApplication": {
    "clientId": "ProxyIdentityExperienceFrameworkApplicationAppId"
  },
  "iefExtensionApplication": {
    "id": "B2CExtensionsApplicationObjectId",
    "clientId": "B2CExtensionsApplicationObjectId"
  },
  "tenant": {
    "name": "your-tenant-name.onmicrosoft.com"
  }
}
```

### Generate the XML files

Run the **build** task in the **Policies** directory to generate the XML files in the **Policies\dist** directory.

```
gulp build
```

## Upload the custom policies

[Upload the XML files](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-get-started-custom#upload-the-policies) in the following order in your Azure AD B2C tenant:

   1. B2C_1A_base.xml
   2. B2C_1A_extension.xml
   3. B2C_1A_sign_up_sign_in.xml
   4. B2C_1A_sign_up_without_verification.xml
   5. B2C_1A_sign_in_with_verification.xml

### Test the custom policies

[Test the custom policies](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-get-started-custom#test-the-custom-policy) in your Azure AD B2C tenant.
