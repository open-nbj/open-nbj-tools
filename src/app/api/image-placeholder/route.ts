import { escapeXml } from '@/utils/escape-xml';
import { normalizeColor } from '@/utils/normalize-color';
import { route, routeOperation, TypedNextResponse } from 'next-rest-framework';
import { z } from 'zod';

export const runtime = 'nodejs';

const DEFAULT_WIDTH = 640;
const DEFAULT_HEIGHT = 360;
const DEFAULT_BG = '#e5e7eb';
const DEFAULT_COLOR = '#374151';

function clampInt(value: string | null, fallback: number, min: number, max: number) {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function buildSvg({
  width,
  height,
  text,
  color,
  bg,
}: {
  width: number;
  height: number;
  text: string;
  color: string;
  bg: string;
}) {
  const safeText = escapeXml(text) || `${width}x${height}`;
  const minSide = Math.min(width, height);
  const fontSize = Math.max(12, Math.min(96, Math.round(minSide * 0.18)));
  const textLength = Math.max(0, Math.round(width * 0.9));

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
    `<rect width="100%" height="100%" fill="${bg}"/>`,
    `<rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" fill="none" stroke="rgba(15, 23, 42, 0.18)"/>`,
    `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${color}" font-size="${fontSize}" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'" textLength="${textLength}" lengthAdjust="spacingAndGlyphs">${safeText}</text>`,
    `</svg>`,
  ].join('');
}

const imagePlaceholderQuerySchema = z.object({
  w: z.string().optional(),
  h: z.string().optional(),
  text: z.string().optional(),
  color: z.string().optional(),
  bg: z.string().optional(),
  format: z.string().optional(),
});

export const { GET } = route({
  getImagePlaceholder: routeOperation({
    method: 'GET',
    openApiOperation: {
      summary: 'Generate a placeholder image (SVG or PNG).',
      parameters: [
        {
          name: 'w',
          in: 'query',
          required: false,
          schema: { type: 'integer', minimum: 1, maximum: 4096 },
          description: 'Width in pixels (default 640).',
        },
        {
          name: 'h',
          in: 'query',
          required: false,
          schema: { type: 'integer', minimum: 1, maximum: 4096 },
          description: 'Height in pixels (default 360).',
        },
        {
          name: 'text',
          in: 'query',
          required: false,
          schema: { type: 'string' },
          description: 'Centered label text (default: {w}x{h}).',
        },
        {
          name: 'color',
          in: 'query',
          required: false,
          schema: { type: 'string' },
          description: 'Text hex color (with or without #).',
        },
        {
          name: 'bg',
          in: 'query',
          required: false,
          schema: { type: 'string' },
          description: "bg hex color (with or without #) or 'transparent'.",
        },
        {
          name: 'format',
          in: 'query',
          required: false,
          schema: { type: 'string', enum: ['svg', 'png'] },
          description: 'Image format (default: svg).',
        },
      ],
    },
  })
    .input({
      querySchema: imagePlaceholderQuerySchema,
    })
    .outputs([
      { status: 200, contentType: 'image/svg+xml', body: z.string() as any },
      { status: 200, contentType: 'image/png', body: z.any() as any },
      { status: 400, contentType: 'text/plain', body: z.string() as any },
    ] as const)
    .handler(async (req) => {
      const { searchParams } = new URL(req.url);

      const width = clampInt(searchParams.get('w'), DEFAULT_WIDTH, 1, 4096);
      const height = clampInt(searchParams.get('h'), DEFAULT_HEIGHT, 1, 4096);
      const bg = normalizeColor(searchParams.get('bg'), DEFAULT_BG);
      const text = (searchParams.get('text') ?? `${width}x${height}`).trim();
      const color = normalizeColor(searchParams.get('color'), DEFAULT_COLOR);
      const format = (searchParams.get('format') ?? 'svg').toLowerCase();

      if (format !== 'svg' && format !== 'png') {
        return new TypedNextResponse('Unsupported `format`. Supported: svg, png.', {
          status: 400,
          headers: {
            'content-type': 'text/plain',
          },
        });
      }

      const label = text || `${width}x${height}`;

      if (format === 'png') {
        const { ImageResponse } = await (async () => {
          try {
            return await import('next/og');
          } catch {
            return await import('next/og.js');
          }
        })();
        const React = await import('react');

        const imageResponse = new ImageResponse(
          React.createElement(
            'div',
            {
              style: {
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bg,
                border: '1px solid rgba(15, 23, 42, 0.18)',
                color,
                fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
                fontSize: Math.max(12, Math.min(96, Math.round(Math.min(width, height) * 0.18))),
                padding: 16,
                textAlign: 'center',
                lineHeight: 1.1,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              },
            },
            label,
          ),
          { width, height },
        );

        const png = await imageResponse.arrayBuffer();
        return new TypedNextResponse(png, {
          status: 200,
          headers: {
            'content-type': 'image/png',
            'cache-control': 'public, max-age=0, s-maxage=86400',
            'content-disposition': 'inline; filename="image-placeholder.png"',
          },
        });
      }

      const svg = buildSvg({ width, height, text: label, color, bg });
      return new TypedNextResponse(svg, {
        status: 200,
        headers: {
          'content-type': 'image/svg+xml',
          'cache-control': 'public, max-age=0, s-maxage=86400',
          'content-disposition': 'inline; filename="image-placeholder.svg"',
        },
      });
    }),
});
