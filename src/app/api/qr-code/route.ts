import QRCode from 'qrcode';
import { route, routeOperation, TypedNextResponse } from 'next-rest-framework';
import { z } from 'zod';
import { normalizeColor } from '@/utils/normalize-color';

const DEFAULT_FOREGROUND = '#020617';
const DEFAULT_BACKGROUND = '#ffffff';

const qrCodeQuerySchema = z.object({
  text: z.string().optional(),
  fg: z.string().optional(),
  bg: z.string().optional(),
});

export const { GET } = route({
  getQrCode: routeOperation({
    method: 'GET',
    openApiOperation: {
      summary: 'Generate a QR code (SVG).',
      parameters: [
        {
          name: 'text',
          in: 'query',
          required: true,
          schema: { type: 'string' },
          description: 'Text or URL to encode.',
        },
        {
          name: 'fg',
          in: 'query',
          required: false,
          schema: { type: 'string' },
          description: 'Foreground hex color (with or without #).',
        },
        {
          name: 'bg',
          in: 'query',
          required: false,
          schema: { type: 'string' },
          description: 'Background hex color (with or without #).',
        },
      ],
    },
  })
    .input({
      querySchema: qrCodeQuerySchema,
    })
    .outputs([
      { status: 200, contentType: 'image/svg+xml', body: z.string() as any },
      { status: 400, contentType: 'text/plain', body: z.string() as any },
    ] as const)
    .handler(async (req) => {
      const { searchParams } = new URL(req.url);
      const text = searchParams.get('text')?.trim();

      if (!text) {
        return new TypedNextResponse('Missing required `text` query parameter.', {
          status: 400,
          headers: {
            'content-type': 'text/plain',
          },
        });
      }

      const fg = normalizeColor(searchParams.get('fg'), DEFAULT_FOREGROUND);
      const bg = normalizeColor(searchParams.get('bg'), DEFAULT_BACKGROUND);

      const svg = await QRCode.toString(text, {
        type: 'svg',
        color: {
          dark: fg,
          light: bg,
        },
        margin: 1,
        errorCorrectionLevel: 'M',
      });

      return new TypedNextResponse(svg, {
        status: 200,
        headers: {
          'content-type': 'image/svg+xml',
          'cache-control': 'public, max-age=0, s-maxage=86400',
          'content-disposition': 'inline; filename="qr-code.svg"',
        },
      });
    }),
});
