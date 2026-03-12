'use client';

import { ChevronDown, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIntl } from 'react-intl';
import messages from './message';
import { useAppContext } from './app-context';
import { AVAILABLE_LOCALES } from '@/i18n/messages';

export function LanguageSelector() {
  const intl = useIntl();
  const { locale, setLocale } = useAppContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            aria-label={intl.formatMessage(messages.languageToggle)}
            size="sm"
            title={intl.formatMessage(messages.languageToggle)}
            variant="outline"
            className="uppercase"
          />
        }
      >
        <Languages />
        {locale}
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup onValueChange={setLocale} value={locale}>
          {AVAILABLE_LOCALES.map((availableLocale) => (
            <DropdownMenuRadioItem className="uppercase" key={availableLocale} value={availableLocale}>
              {availableLocale}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
