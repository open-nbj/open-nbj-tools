import { defineMessages } from 'react-intl';

const messages = defineMessages({
  createTitle: {
    id: 'qrGenerator.create.title',
    defaultMessage: 'Create QR code',
    description: 'Title for the QR generator configuration card.',
  },
  createDescription: {
    id: 'qrGenerator.create.description',
    defaultMessage: 'This page uses the {endpoint} endpoint to render the image.',
    description: 'Description text explaining how the QR image is rendered.',
  },
  tabText: {
    id: 'qrGenerator.tabs.text',
    defaultMessage: 'Text',
    description: 'Tab label for generating a QR code from text or a URL.',
  },
  tabWifi: {
    id: 'qrGenerator.tabs.wifi',
    defaultMessage: 'WiFi',
    description: 'Tab label for generating a WiFi QR code.',
  },
  tabContact: {
    id: 'qrGenerator.tabs.contact',
    defaultMessage: 'Contact',
    description: 'Tab label for generating a contact (vCard) QR code.',
  },
  foregroundLabel: {
    id: 'qrGenerator.color.foreground',
    defaultMessage: 'Foreground',
    description: 'Label for the foreground color picker.',
  },
  backgroundLabel: {
    id: 'qrGenerator.color.background',
    defaultMessage: 'Background',
    description: 'Label for the background color picker.',
  },

  previewTitle: {
    id: 'qrGenerator.preview.title',
    defaultMessage: 'Live preview',
    description: 'Title for the QR code live preview card.',
  },
  previewAlt: {
    id: 'qrGenerator.preview.alt',
    defaultMessage: 'Generated QR code',
    description: 'Alt text for the generated QR code image.',
  },
  previewDownload: {
    id: 'qrGenerator.preview.download',
    defaultMessage: 'Download SVG',
    description: 'Button label for downloading the generated QR code image.',
  },
  previewOpen: {
    id: 'qrGenerator.preview.open',
    defaultMessage: 'Open',
    description: 'Button label for opening the generated QR code in a new tab.',
  },
  previewEmpty: {
    id: 'qrGenerator.preview.empty',
    defaultMessage: 'No QR code generated',
    description: 'Placeholder text shown when there is no QR code to preview.',
  },

  textLabel: {
    id: 'qrGenerator.text.label',
    defaultMessage: 'Text or URL',
    description: 'Label for the text/URL input textarea.',
  },
  textPlaceholder: {
    id: 'qrGenerator.text.placeholder',
    defaultMessage: 'Paste a URL or type any text',
    description: 'Placeholder for the text/URL input textarea.',
  },
  textClear: {
    id: 'qrGenerator.text.clear',
    defaultMessage: 'Clear text',
    description: 'Button label for clearing the text/URL input.',
  },
  textCharacterCount: {
    id: 'qrGenerator.text.characterCount',
    defaultMessage: '{count, plural, one {# character} other {# characters}}',
    description: 'Character count for the text/URL input.',
  },

  wifiSsidLabel: {
    id: 'qrGenerator.wifi.ssidLabel',
    defaultMessage: 'Network name (SSID)',
    description: 'Label for the WiFi SSID input.',
  },
  wifiSsidPlaceholder: {
    id: 'qrGenerator.wifi.ssidPlaceholder',
    defaultMessage: 'Network name',
    description: 'Placeholder for the WiFi SSID input.',
  },
  wifiSecurityLabel: {
    id: 'qrGenerator.wifi.securityLabel',
    defaultMessage: 'Security',
    description: 'Label for the WiFi security selection.',
  },
  wifiSecurityWpa: {
    id: 'qrGenerator.wifi.security.wpa',
    defaultMessage: 'WPA/WPA2',
    description: 'WiFi security option label for WPA/WPA2.',
  },
  wifiSecurityWep: {
    id: 'qrGenerator.wifi.security.wep',
    defaultMessage: 'WEP',
    description: 'WiFi security option label for WEP.',
  },
  wifiSecurityOpen: {
    id: 'qrGenerator.wifi.security.open',
    defaultMessage: 'Open',
    description: 'WiFi security option label for open networks.',
  },
  wifiPasswordLabel: {
    id: 'qrGenerator.wifi.passwordLabel',
    defaultMessage: 'Password',
    description: 'Label for the WiFi password input.',
  },
  wifiPasswordPlaceholder: {
    id: 'qrGenerator.wifi.passwordPlaceholder',
    defaultMessage: 'Network password',
    description: 'Placeholder for the WiFi password input.',
  },
  wifiHiddenLabel: {
    id: 'qrGenerator.wifi.hiddenLabel',
    defaultMessage: 'Hidden network',
    description: 'Label for the hidden network checkbox.',
  },
  wifiReset: {
    id: 'qrGenerator.wifi.reset',
    defaultMessage: 'Reset WiFi',
    description: 'Button label for resetting the WiFi form.',
  },
  statusReady: {
    id: 'qrGenerator.status.ready',
    defaultMessage: 'Ready to generate.',
    description: 'Status text shown when QR input is valid.',
  },
  wifiStatusIncomplete: {
    id: 'qrGenerator.wifi.status.incomplete',
    defaultMessage: 'Enter SSID and password to generate.',
    description: 'Status text shown when WiFi inputs are incomplete.',
  },

  contactNameLabel: {
    id: 'qrGenerator.contact.nameLabel',
    defaultMessage: 'Name',
    description: 'Label for the contact name section.',
  },
  contactFirstNamePlaceholder: {
    id: 'qrGenerator.contact.firstNamePlaceholder',
    defaultMessage: 'First name',
    description: 'Placeholder for the contact first name input.',
  },
  contactLastNamePlaceholder: {
    id: 'qrGenerator.contact.lastNamePlaceholder',
    defaultMessage: 'Last name',
    description: 'Placeholder for the contact last name input.',
  },
  contactOrganizationLabel: {
    id: 'qrGenerator.contact.organizationLabel',
    defaultMessage: 'Organization',
    description: 'Label for the contact organization input.',
  },
  contactOrganizationPlaceholder: {
    id: 'qrGenerator.contact.organizationPlaceholder',
    defaultMessage: 'Company',
    description: 'Placeholder for the contact organization input.',
  },
  contactUrlLabel: {
    id: 'qrGenerator.contact.urlLabel',
    defaultMessage: 'URL',
    description: 'Label for the contact URL input.',
  },
  contactUrlPlaceholder: {
    id: 'qrGenerator.contact.urlPlaceholder',
    defaultMessage: 'https://example.com',
    description: 'Placeholder for the contact URL input.',
  },
  contactPhoneLabel: {
    id: 'qrGenerator.contact.phoneLabel',
    defaultMessage: 'Phone',
    description: 'Label for the contact phone number input.',
  },
  contactPhonePlaceholder: {
    id: 'qrGenerator.contact.phonePlaceholder',
    defaultMessage: '+123456789',
    description: 'Placeholder for the contact phone number input.',
  },
  contactEmailLabel: {
    id: 'qrGenerator.contact.emailLabel',
    defaultMessage: 'Email',
    description: 'Label for the contact email input.',
  },
  contactEmailPlaceholder: {
    id: 'qrGenerator.contact.emailPlaceholder',
    defaultMessage: 'test@example.com',
    description: 'Placeholder for the contact email input.',
  },
  contactAddressLabel: {
    id: 'qrGenerator.contact.addressLabel',
    defaultMessage: 'Address',
    description: 'Label for the contact address section.',
  },
  contactStreetPlaceholder: {
    id: 'qrGenerator.contact.streetPlaceholder',
    defaultMessage: 'Street',
    description: 'Placeholder for the contact street input.',
  },
  contactCityPlaceholder: {
    id: 'qrGenerator.contact.cityPlaceholder',
    defaultMessage: 'City',
    description: 'Placeholder for the contact city input.',
  },
  contactRegionPlaceholder: {
    id: 'qrGenerator.contact.regionPlaceholder',
    defaultMessage: 'State / Region',
    description: 'Placeholder for the contact state/region input.',
  },
  contactPostalCodePlaceholder: {
    id: 'qrGenerator.contact.postalCodePlaceholder',
    defaultMessage: 'Postal code',
    description: 'Placeholder for the contact postal code input.',
  },
  contactCountryPlaceholder: {
    id: 'qrGenerator.contact.countryPlaceholder',
    defaultMessage: 'Country',
    description: 'Placeholder for the contact country input.',
  },
  contactReset: {
    id: 'qrGenerator.contact.reset',
    defaultMessage: 'Reset contact',
    description: 'Button label for resetting the contact form.',
  },
  contactStatusIncomplete: {
    id: 'qrGenerator.contact.status.incomplete',
    defaultMessage: 'Enter a name to generate.',
    description: 'Status text shown when contact inputs are incomplete.',
  },
});

export default messages;
