'use client';

import { RotateCcw } from 'lucide-react';
import { useIntl } from 'react-intl';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { useQrCode } from './qr-code-provider';
import messages from './message';

export function TextUrlInput() {
  const intl = useIntl();
  const { text, setText } = useQrCode();

  return (
    <FieldGroup className="gap-5">
      <Field>
        <FieldLabel htmlFor="qr-text">{intl.formatMessage(messages.textLabel)}</FieldLabel>
        <Textarea
          id="qr-text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={intl.formatMessage(messages.textPlaceholder)}
          className="min-h-56 resize-y rounded-2xl"
        />
      </Field>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" onClick={() => setText('')} disabled={text === ''}>
          <RotateCcw />
          {intl.formatMessage(messages.textClear)}
        </Button>
        <p className="text-sm">
          {intl.formatMessage(messages.textCharacterCount, {
            count: text.length,
          })}
        </p>
      </div>
    </FieldGroup>
  );
}
