import { docsRoute } from 'next-rest-framework';

export const dynamic = 'force-dynamic';

export const { GET } = docsRoute({
  openApiJsonPath: '/openapi.json',
  docsConfig: {
    provider: 'redoc',
    title: 'open-nbj-tools API',
    description: 'Auto-generated API docs for tools in this repo.',
  },
  openApiObject: {
    openapi: '3.0.3',
    info: {
      title: 'open-nbj-tools API',
      version: '0.1.0',
    },
    paths: {},
  },
});
