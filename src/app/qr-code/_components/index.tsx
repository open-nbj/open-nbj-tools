import { QrCodeProvider } from './qr-code-provider';
import { QrGeneratorContent } from './qr-generator-content';

export function QrGenerator() {
  return (
    <QrCodeProvider>
      <QrGeneratorContent />
    </QrCodeProvider>
  );
}
