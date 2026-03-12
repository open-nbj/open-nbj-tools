'use client';

import { useEffect, useMemo, useState } from 'react';
import { Building2, Link2, MapPin, RotateCcw, UserRound } from 'lucide-react';
import { useIntl } from 'react-intl';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useQrCode } from './qr-code-provider';
import messages from './message';

function escapeVCardValue(value: string) {
  return value.replace(/([\\;,])/g, '\\$1').replace(/\r?\n/g, '\\n');
}

function buildVCardPayload({
  lastName,
  firstName,
  org,
  url,
  phone,
  email,
  adr,
}: {
  lastName: string;
  firstName: string;
  org: string;
  url: string;
  phone: string;
  email: string;
  adr: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
}) {
  const escapedLastName = escapeVCardValue(lastName);
  const escapedFirstName = escapeVCardValue(firstName);
  const lines = ['BEGIN:VCARD', 'VERSION:3.0', `N:${escapedLastName};${escapedFirstName}`];

  if (org) {
    lines.push(`ORG:${escapeVCardValue(org)}`);
  }
  if (url) {
    lines.push(`URL:${escapeVCardValue(url)}`);
  }
  if (phone) {
    lines.push(`TEL:${escapeVCardValue(phone)}`);
  }
  if (email) {
    lines.push(`EMAIL:${escapeVCardValue(email)}`);
  }
  if (adr.street || adr.city || adr.region || adr.postalCode || adr.country) {
    lines.push(
      `ADR:;;${escapeVCardValue(adr.street)};${escapeVCardValue(adr.city)};${escapeVCardValue(adr.region)};${escapeVCardValue(adr.postalCode)};${escapeVCardValue(adr.country)}`,
    );
  }

  lines.push('END:VCARD');

  return [...lines].join('\r\n');
}

export function ContactInput() {
  const intl = useIntl();
  const { setText } = useQrCode();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [org, setOrg] = useState('');
  const [url, setUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const payload = useMemo(() => {
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedOrg = org.trim();
    const trimmedUrl = url.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();
    const trimmedStreet = street.trim();
    const trimmedCity = city.trim();
    const trimmedRegion = region.trim();
    const trimmedPostalCode = postalCode.trim();
    const trimmedCountry = country.trim();

    if (!trimmedFirstName && !trimmedLastName) {
      return '';
    }

    return buildVCardPayload({
      lastName: trimmedLastName,
      firstName: trimmedFirstName,
      org: trimmedOrg,
      url: trimmedUrl,
      phone: trimmedPhone,
      email: trimmedEmail,
      adr: {
        street: trimmedStreet,
        city: trimmedCity,
        region: trimmedRegion,
        postalCode: trimmedPostalCode,
        country: trimmedCountry,
      },
    });
  }, [city, country, email, firstName, lastName, org, phone, postalCode, region, street, url]);

  // Keep provider text in sync with this tab's payload.
  // (When invalid/incomplete, clear text so the preview shows empty.)
  useEffect(() => {
    setText(payload);
  }, [payload, setText]);

  const reset = () => {
    setFirstName('');
    setLastName('');
    setOrg('');
    setUrl('');
    setPhone('');
    setEmail('');
    setStreet('');
    setCity('');
    setRegion('');
    setPostalCode('');
    setCountry('');
    setText('');
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <FieldGroup className="gap-5">
        <Field>
          <FieldLabel htmlFor="contact-first-name">
            <span className="inline-flex items-center gap-2">
              <UserRound className="size-4" />
              {intl.formatMessage(messages.contactNameLabel)}
            </span>
          </FieldLabel>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              id="contact-first-name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder={intl.formatMessage(messages.contactFirstNamePlaceholder)}
              autoComplete="given-name"
            />
            <Input
              id="contact-last-name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              placeholder={intl.formatMessage(messages.contactLastNamePlaceholder)}
              autoComplete="family-name"
            />
          </div>
        </Field>

        <Field>
          <FieldLabel htmlFor="contact-org">
            <span className="inline-flex items-center gap-2">
              <Building2 className="size-4" />
              {intl.formatMessage(messages.contactOrganizationLabel)}
            </span>
          </FieldLabel>
          <Input
            id="contact-org"
            value={org}
            onChange={(event) => setOrg(event.target.value)}
            placeholder={intl.formatMessage(messages.contactOrganizationPlaceholder)}
            autoComplete="organization"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="contact-url">
            <span className="inline-flex items-center gap-2">
              <Link2 className="size-4" />
              {intl.formatMessage(messages.contactUrlLabel)}
            </span>
          </FieldLabel>
          <Input
            id="contact-url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder={intl.formatMessage(messages.contactUrlPlaceholder)}
            type="url"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="contact-phone">{intl.formatMessage(messages.contactPhoneLabel)}</FieldLabel>
          <Input
            id="contact-phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder={intl.formatMessage(messages.contactPhonePlaceholder)}
            inputMode="tel"
            autoComplete="tel"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="contact-email">{intl.formatMessage(messages.contactEmailLabel)}</FieldLabel>
          <Input
            id="contact-email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={intl.formatMessage(messages.contactEmailPlaceholder)}
            type="email"
            autoComplete="email"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="contact-street">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4" />
              {intl.formatMessage(messages.contactAddressLabel)}
            </span>
          </FieldLabel>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              id="contact-street"
              value={street}
              onChange={(event) => setStreet(event.target.value)}
              placeholder={intl.formatMessage(messages.contactStreetPlaceholder)}
              autoComplete="street-address"
            />
            <Input
              id="contact-city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder={intl.formatMessage(messages.contactCityPlaceholder)}
              autoComplete="address-level2"
            />
            <Input
              id="contact-region"
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              placeholder={intl.formatMessage(messages.contactRegionPlaceholder)}
              autoComplete="address-level1"
            />
            <Input
              id="contact-postal-code"
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
              placeholder={intl.formatMessage(messages.contactPostalCodePlaceholder)}
              autoComplete="postal-code"
            />
            <Input
              id="contact-country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              placeholder={intl.formatMessage(messages.contactCountryPlaceholder)}
              autoComplete="country-name"
              className="sm:col-span-2"
            />
          </div>
        </Field>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={reset}
            disabled={
              firstName === '' &&
              lastName === '' &&
              org === '' &&
              url === '' &&
              phone === '' &&
              email === '' &&
              street === '' &&
              city === '' &&
              region === '' &&
              postalCode === '' &&
              country === ''
            }
          >
            <RotateCcw />
            {intl.formatMessage(messages.contactReset)}
          </Button>
          <div className="prose">{JSON.stringify(payload, null, 2)}</div>
          <p className="text-sm text-muted-foreground">
            {payload ? intl.formatMessage(messages.statusReady) : intl.formatMessage(messages.contactStatusIncomplete)}
          </p>
        </div>
      </FieldGroup>
    </form>
  );
}
