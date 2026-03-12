import type { Metadata } from 'next';
import { ThemeToggleGroup } from '@/components/app/theme-toggle-group';
import { LanguageSelector } from '@/components/app/language-selector';
import { QrGenerator } from './_components';

export const metadata: Metadata = {
  title: 'QR Code',
  description: 'Generate QR codes from text.',
};

export default function QrCodePage() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-end p-4 gap-4">
        <LanguageSelector />
        <ThemeToggleGroup />
      </div>
      <QrGenerator />
    </div>
  );
}
