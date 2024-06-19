# Farmstack Frontend Application Configuration

## Repository Information
- **Repository Name:** farmstack-frontend
- **Repository URL:** [https://github.com/digitalgreenorg/farmstack-frontend.git](https://github.com/digitalgreenorg/farmstack-frontend.git)

## Overview
The Farmstack Frontend application is designed to support multiple versions, each tailored to different instances or requirements. The application allows for extensive customization through the `.env` file, enabling or disabling various sections, selecting different navbars, and supporting dynamic labelling. Additionally, it features AI capabilities that can be toggled as needed.

## Versions
The application supports the following versions:
- **EADP**
- **KADP**
- **VISTAAR**
- **DEFAULT (platform_farmer_chat)**

## Configuration Management
Configuration for the application is handled via the `.env` file. The settings within this file allow you to:
- Specify backend URLs.
- Enable or disable development mode.
- Select the desired instance/version.
- Customize the application using a JSON configuration object.

### .env File Keys
Below are the essential keys used in the `.env` file:

```env
# Backend URLs
REACT_APP_BASEURL=
REACT_APP_BASEURL_without_slash=

# Development mode
REACT_APP_DEV_MODE=true

# Instance/Version selection (Options: KADP, VISTAAR, EADP, DEFAULT)
REACT_APP_INSTANCE=DEFAULT 

# JSON configuration object
### note : the entire object must be in single line, to make this conf work. Because env doesn't allow the key to keep the value in multiple line.
REACT_APP_CONFIG_JSON={
    "title": "Farmstack Agricultural Data Sharing Platform",
    "enableBanner": true,
    "banner": "DEFAULT",
    "navBar": "DEFAULT",
    "enableSubBanners": {
        "first": true,
        "second": true,
        "third": true
    },
    "enableSections": {
        "datasets": false,
        "co_stewards": true,
        "participants": true,
        "connectors": false,
        "resources": true
    },
    "dynamicLabelling": {
        "datasets": "FLEW Registry",
        "co_steward": "States (or) Organisations",
        "participants": "Partners",
        "participant": "Partner",
        "contents": "Contents",
        "connector": "Use case",
        "connectors": "Use cases"
    },
    "footer": "DEFAULT",
    "enableFooter": true,
    "enableAI": true
}
```

## Configuration Details

### Title
The `title` field defines the title of the application.

### Banners
- **enableBanner:** Boolean value to enable or disable the main banner.
- **banner:** Defines the banner type to use.

### Navigation Bar
- **navBar:** Specifies the navigation bar type to be used.

### Sub Banners
- **enableSubBanners:** An object to enable or disable specific sub-banners (`first`, `second`, `third`).

### Sections
- **enableSections:** An object to enable or disable specific sections of the application such as `datasets`, `co_stewards`, `participants`, `connectors`, and `resources`.

### Dynamic Labelling
- **dynamicLabelling:** An object defining custom labels for various sections of the application. This includes `datasets`, `co_steward`, `participants`, `participant`, `contents`, `connector`, and `connectors`.

### Footer
- **footer:** Specifies the footer type to be used.
- **enableFooter:** Boolean value to enable or disable the footer.

### AI Features
- **enableAI:** Boolean value to enable or disable AI features that allow access to embeddings.

## Example Configuration
Here is an example of how the `.env` file might be configured for the VISTAAR instance:

```env
REACT_APP_BASEURL=https://api.example.com
REACT_APP_BASEURL_without_slash=https://api.example.com
REACT_APP_DEV_MODE=true
REACT_APP_INSTANCE=VISTAAR

REACT_APP_CONFIG_JSON={
    "title": "Farmstack Agricultural Data Sharing Platform",
    "enableBanner": true,
    "banner": "VISTAAR",
    "navBar": "VISTAAR",
    "enableSubBanners": {
        "first": true,
        "second": true,
        "third": true
    },
    "enableSections": {
        "datasets": false,
        "co_stewards": true,
        "participants": true,
        "connectors": false,
        "resources": true
    },
    "dynamicLabelling": {
        "datasets": "FLEW Registry",
        "co_steward": "States (or) Organisations",
        "participants": "Partners",
        "participant": "Partner",
        "contents": "Contents",
        "connector": "Use case",
        "connectors": "Use cases"
    },
    "footer": "VISTAAR",
    "enableFooter": true,
    "enableAI": true
}
```

## Conclusion
This document outlines the configuration settings necessary to customize the Farmstack Frontend application for different instances. By adjusting the keys and values in the `.env` file, users can enable or disable features, choose specific versions, and apply dynamic labelling to tailor the application to their needs. This flexibility ensures that the application can adapt to various requirements and use cases.

For any further questions or assistance with the configuration, please refer to the [repository](https://github.com/digitalgreenorg/farmstack-frontend.git) or contact the development team.
