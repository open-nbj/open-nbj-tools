'use client';

import { useState } from 'react';
import { useIntl } from 'react-intl';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ColorPicker } from '@/components/ui/color-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQrCode } from './qr-code-provider';
import { ContactInput } from './contact-input';
import { TextUrlInput } from './text-url-input';
import { WifiInput } from './wifi-input';
import { QrDisplay } from './qr-display';
import { Separator } from '@/components/ui/separator';
import messages from './message';

type QrMode = 'text' | 'wifi' | 'contact';

export function QrGeneratorContent() {
  const intl = useIntl();
  const [mode, setMode] = useState<QrMode>('text');
  const { foreground, setForeground, background, setBackground } = useQrCode();

  return (
    <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>{intl.formatMessage(messages.createTitle)}</CardTitle>
          <CardDescription>
            {intl.formatMessage(messages.createDescription, {
              endpoint: '/api/qr-code',
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={mode} onValueChange={setMode}>
            <TabsList className="mb-6" variant="line">
              <TabsTrigger value="text">{intl.formatMessage(messages.tabText)}</TabsTrigger>
              <TabsTrigger value="wifi">{intl.formatMessage(messages.tabWifi)}</TabsTrigger>
              <TabsTrigger value="contact">{intl.formatMessage(messages.tabContact)}</TabsTrigger>
            </TabsList>

            <TabsContent value="text">
              <TextUrlInput />
            </TabsContent>

            <TabsContent value="wifi">
              <WifiInput />
            </TabsContent>

            <TabsContent value="contact">
              <ContactInput />
            </TabsContent>
          </Tabs>

          <Separator className="my-3" />
          <div className="grid gap-3 grid-cols-2">
            <ColorPicker
              label={intl.formatMessage(messages.foregroundLabel)}
              value={foreground}
              onChange={(nextValue) => setForeground(nextValue)}
            />
            <ColorPicker
              label={intl.formatMessage(messages.backgroundLabel)}
              value={background}
              onChange={(nextValue) => setBackground(nextValue)}
            />
          </div>
        </CardContent>
      </Card>

      <QrDisplay />
    </div>
  );
}
