'use client';

import { useMemo, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { cn } from '@/lib/utils';
import type { ButtonProps } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

function ColorPicker({
  disabled,
  value,
  onChange,
  onBlur,
  name,
  className,
  ...props
}: Omit<ButtonProps, 'value' | 'onChange' | 'onBlur'> & ColorPickerProps) {
  const [open, setOpen] = useState(false);

  const parsedValue = useMemo(() => {
    return value || '#FFFFFF';
  }, [value]);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <div className="flex gap-2">
        <div>{props.label}</div>
        <PopoverTrigger
          disabled={disabled}
          onBlur={onBlur}
          render={
            <Button
              {...props}
              className={cn(className)}
              name={name}
              style={{
                backgroundColor: parsedValue,
              }}
              variant="outline"
              size={'icon-xs'}
            >
              <div />
            </Button>
          }
        />
      </div>

      <PopoverContent className="w-full">
        <HexColorPicker color={parsedValue} onChange={onChange} />
        <Input
          maxLength={7}
          onChange={(e) => {
            onChange(e?.currentTarget?.value);
          }}
          value={parsedValue}
        />
      </PopoverContent>
    </Popover>
  );
}
ColorPicker.displayName = 'ColorPicker';

export { ColorPicker };
