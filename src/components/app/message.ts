import { defineMessages } from 'react-intl';

const messages = defineMessages({
  languageToggle: {
    id: 'language.toggle',
    defaultMessage: 'Change language',
    description: 'Label and tooltip for the language selection dropdown trigger.',
  },
  clipboardCopyShareLink: {
    id: 'clipboard.copyShareLink',
    defaultMessage: 'Copy share link',
    description: 'Button label for copying the room share link.',
  },
  clipboardCopied: {
    id: 'clipboard.copied',
    defaultMessage: 'Copied',
    description: 'Clipboard button state after a successful copy action.',
  },
  clipboardCopyFailed: {
    id: 'clipboard.copyFailed',
    defaultMessage: 'Copy failed',
    description: 'Clipboard button state after a failed copy action.',
  },
  themeLight: {
    id: 'theme.light',
    defaultMessage: 'Light',
    description: 'Theme option label for light mode.',
  },
  themeDark: {
    id: 'theme.dark',
    defaultMessage: 'Dark',
    description: 'Theme option label for dark mode.',
  },
  themeSystem: {
    id: 'theme.system',
    defaultMessage: 'System',
    description: 'Theme option label for following the system setting.',
  },
  qrcodeAlt: {
    id: 'qrcode.alt',
    defaultMessage: 'QR Code',
    description: 'Alt text for the QR code image.',
  },
});

export default messages;
