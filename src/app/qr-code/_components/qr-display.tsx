'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { Download, ExternalLink, QrCode } from 'lucide-react';
import { useIntl } from 'react-intl';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQrCode } from './qr-code-provider';
import messages from './message';

export function QrDisplay() {
  const intl = useIntl();
  const { text, foreground, background } = useQrCode();

  const trimmed = text.trim();
  const canGenerate = !!trimmed;

  const qrCodeUrl = useMemo(() => {
    if (!trimmed) {
      return null;
    }

    return `/api/qr-code?${new URLSearchParams({
      text: trimmed,
      fg: foreground,
      bg: background,
    }).toString()}`;
  }, [trimmed, foreground, background]);

  const handleDownload = () => {
    if (!qrCodeUrl) return;
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qr-code.svg';
    link.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <QrCode className="size-5" />
          {intl.formatMessage(messages.previewTitle)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex min-h-[320px] items-center justify-center">
          {qrCodeUrl ? (
            <div className="flex flex-col items-center gap-3">
              <Image
                src={qrCodeUrl}
                alt={intl.formatMessage(messages.previewAlt)}
                width={280}
                height={280}
                className="size-[280px] border-1"
                unoptimized
                loading="eager"
              />
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button onClick={handleDownload} disabled={!canGenerate}>
                  <Download />
                  {intl.formatMessage(messages.previewDownload)}
                </Button>
                <a href={qrCodeUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" disabled={!canGenerate}>
                    <ExternalLink />
                    {intl.formatMessage(messages.previewOpen)}
                  </Button>
                </a>
              </div>
            </div>
          ) : (
            <p className="max-w-60 text-center text-sm text-slate-500">{intl.formatMessage(messages.previewEmpty)}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
