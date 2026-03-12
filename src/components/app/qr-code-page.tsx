'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Download, QrCode, RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';

const DEFAULT_TEXT = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const DEFAULT_FOREGROUND = '020617';
const DEFAULT_BACKGROUND = 'ffffff';

export function QrCodePage() {
  const [value, setValue] = useState(DEFAULT_TEXT);
  const text = value.trim();
  const qrCodeUrl = text
    ? `/api/qr-code?${new URLSearchParams({
        text,
        fg: DEFAULT_FOREGROUND,
        bg: DEFAULT_BACKGROUND,
      }).toString()}`
    : null;

  const handleReset = () => {
    setValue(DEFAULT_TEXT);
  };

  const handleDownload = () => {
    if (!qrCodeUrl) {
      return;
    }

    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qr-code.svg';
    link.click();
  };

  return (
    <main className="min-h-[calc(100vh-65px)] bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.08),_transparent_35%),linear-gradient(180deg,#f8fafc_0%,#e2e8f0_100%)] px-6 py-10 text-slate-950 dark:bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.12),_transparent_35%),linear-gradient(180deg,#020617_0%,#111827_100%)] dark:text-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              Utility
            </p>
            <h1 className="text-4xl font-semibold tracking-tight">QR code generator</h1>
            <p className="max-w-2xl text-sm text-slate-600 sm:text-base dark:text-slate-300">
              Enter any text or URL and generate an SVG QR code through the API.
            </p>
          </div>
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
          >
            Back home
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_420px]">
          <Card className="rounded-[2rem] border-white/70 bg-white/85 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur dark:border-white/10 dark:bg-slate-950/70 dark:ring-white/10">
            <CardHeader>
              <CardTitle>Create QR code</CardTitle>
              <CardDescription>This page uses the `/api/qr-code` endpoint to render the image.</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup className="gap-5">
                <Field>
                  <FieldLabel htmlFor="qr-text">Text or URL</FieldLabel>
                  <Textarea
                    id="qr-text"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    placeholder="Paste a URL or type any text"
                    className="min-h-56 resize-y rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-900/60"
                  />
                  <FieldDescription>The request is sent as query params to the QR-code API route.</FieldDescription>
                </Field>

                <div className="flex flex-wrap items-center gap-3">
                  <Button onClick={handleDownload} disabled={!text}>
                    <Download />
                    Download SVG
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    <RotateCcw />
                    Reset
                  </Button>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {value.length} character{value.length === 1 ? '' : 's'}
                  </p>
                </div>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-slate-200/80 bg-slate-950 text-white shadow-[0_24px_80px_rgba(15,23,42,0.2)] ring-0 dark:border-white/10 dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <QrCode className="size-5" />
                Live preview
              </CardTitle>
              <CardDescription className="text-slate-300">
                The preview is a component backed by the image-only API response.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-[1.75rem] bg-white p-6 shadow-inner shadow-slate-200">
                <div className="flex min-h-[320px] items-center justify-center">
                  {qrCodeUrl ? (
                    <Image
                      src={qrCodeUrl}
                      alt="Generated QR code"
                      width={280}
                      height={280}
                      className="size-[280px]"
                      unoptimized
                    />
                  ) : (
                    <p className="max-w-52 text-center text-sm text-slate-500">
                      Enter some text to generate a QR code.
                    </p>
                  )}
                </div>
              </div>

              <p className="text-xs leading-5 text-slate-400">
                Tip: URLs, plain text, contact info, and wifi credentials all work.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
