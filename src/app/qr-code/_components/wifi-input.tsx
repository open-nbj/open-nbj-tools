'use client';

import { useEffect, useMemo, useState } from 'react';
import { RotateCcw, Wifi } from 'lucide-react';
import { useIntl } from 'react-intl';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useQrCode } from './qr-code-provider';
import messages from './message';

type WifiAuthType = 'WPA' | 'WEP' | 'nopass';

function escapeWifiValue(value: string) {
  return value.replace(/[\\;,:]/g, (match) => `\\${match}`);
}

function buildWifiPayload({
  ssid,
  password,
  authType,
  hidden,
}: {
  ssid: string;
  password: string;
  authType: WifiAuthType;
  hidden: boolean;
}) {
  const escapedSsid = escapeWifiValue(ssid);
  const escapedPassword = escapeWifiValue(password);
  const parts: string[] = [`WIFI:T:${authType};`, `S:${escapedSsid};`];

  if (authType !== 'nopass') {
    parts.push(`P:${escapedPassword};`);
  }

  if (hidden) {
    parts.push('H:true;');
  }

  parts.push(';');
  return parts.join('');
}

export function WifiInput() {
  const intl = useIntl();
  const { setText } = useQrCode();
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [authType, setAuthType] = useState<WifiAuthType>('WPA');
  const [hidden, setHidden] = useState(false);

  const payload = useMemo(() => {
    const trimmedSsid = ssid.trim();
    if (!trimmedSsid) {
      return '';
    }
    if (authType !== 'nopass' && !password) {
      return '';
    }
    return buildWifiPayload({
      ssid: trimmedSsid,
      password,
      authType,
      hidden,
    });
  }, [ssid, password, authType, hidden]);

  // Keep provider text in sync with this tab's payload.
  // (When invalid/incomplete, clear text so the preview shows empty.)
  useEffect(() => {
    setText(payload);
  }, [payload, setText]);

  const reset = () => {
    setSsid('');
    setPassword('');
    setAuthType('WPA');
    setHidden(false);
    setText('');
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <FieldGroup className="gap-5">
        <Field>
          <FieldLabel htmlFor="wifi-ssid">
            <span className="inline-flex items-center gap-2">
              <Wifi className="size-4" />
              {intl.formatMessage(messages.wifiSsidLabel)}
            </span>
          </FieldLabel>
          <Input
            id="wifi-ssid"
            value={ssid}
            onChange={(event) => setSsid(event.target.value)}
            placeholder={intl.formatMessage(messages.wifiSsidPlaceholder)}
          />
        </Field>

        <Field>
          <FieldLabel>{intl.formatMessage(messages.wifiSecurityLabel)}</FieldLabel>
          <ToggleGroup
            value={[authType]}
            multiple={false}
            variant="outline"
            onValueChange={([next]) => {
              if (next === 'WPA' || next === 'WEP' || next === 'nopass') {
                setAuthType(next);
              }
            }}
          >
            <ToggleGroupItem value="WPA">{intl.formatMessage(messages.wifiSecurityWpa)}</ToggleGroupItem>
            <ToggleGroupItem value="WEP">{intl.formatMessage(messages.wifiSecurityWep)}</ToggleGroupItem>
            <ToggleGroupItem value="nopass">{intl.formatMessage(messages.wifiSecurityOpen)}</ToggleGroupItem>
          </ToggleGroup>
        </Field>

        {authType !== 'nopass' && (
          <Field>
            <FieldLabel htmlFor="wifi-password">{intl.formatMessage(messages.wifiPasswordLabel)}</FieldLabel>
            <Input
              id="wifi-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={intl.formatMessage(messages.wifiPasswordPlaceholder)}
              type="password"
              autoComplete="off"
            />
          </Field>
        )}

        <div className="flex items-center gap-3">
          <input
            id="wifi-hidden"
            type="checkbox"
            checked={hidden}
            onChange={(event) => setHidden(event.target.checked)}
            className="size-4 accent-slate-950 dark:accent-slate-50"
          />
          <label htmlFor="wifi-hidden" className="text-sm">
            {intl.formatMessage(messages.wifiHiddenLabel)}
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={reset} disabled={!ssid && !password && !hidden}>
            <RotateCcw />
            {intl.formatMessage(messages.wifiReset)}
          </Button>
          <p className="text-sm text-muted-foreground">
            {payload ? intl.formatMessage(messages.statusReady) : intl.formatMessage(messages.wifiStatusIncomplete)}
          </p>
        </div>
      </FieldGroup>
    </form>
  );
}
