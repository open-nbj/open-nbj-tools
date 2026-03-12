'use client';

import { Laptop, Moon, Sun } from 'lucide-react';
import { useIntl } from 'react-intl';
import messages from './message';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { AppTheme, useAppContext } from './app-context';

export function ThemeToggleGroup() {
  const intl = useIntl();
  const { setTheme, theme } = useAppContext();
  return (
    <ToggleGroup
      onValueChange={([value]) => {
        if (value === 'light' || value === 'dark' || value === 'system') {
          setTheme(value as AppTheme);
        }
      }}
      size="sm"
      multiple={false}
      value={[theme]}
      variant="outline"
    >
      <ToggleGroupItem
        aria-label={intl.formatMessage(messages.themeLight)}
        title={intl.formatMessage(messages.themeLight)}
        value="light"
      >
        <Sun />
      </ToggleGroupItem>
      <ToggleGroupItem
        aria-label={intl.formatMessage(messages.themeDark)}
        title={intl.formatMessage(messages.themeDark)}
        value="dark"
      >
        <Moon />
      </ToggleGroupItem>
      <ToggleGroupItem
        aria-label={intl.formatMessage(messages.themeSystem)}
        title={intl.formatMessage(messages.themeSystem)}
        value="system"
      >
        <Laptop />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
