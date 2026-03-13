import { promises as fs } from 'node:fs';
import path from 'node:path';

export const runtime = 'nodejs';

const TOOL_DIR_EXCLUSIONS = new Set(['api', '_next']);

export type ToolInfo = {
  route: string;
  title: string;
};

export type ApiInfo = {
  route: string;
  methods: string[];
};

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function toTitleCaseFromSegment(segment: string) {
  return segment
    .split('-')
    .filter(Boolean)
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(' ');
}

function parseMetadataTitle(source: string) {
  const metadataBlock = source.match(/export\s+const\s+metadata\b[\s\S]*?=\s*\{([\s\S]*?)\};/m);
  if (!metadataBlock) return null;

  const titleMatch = metadataBlock[1]?.match(/title\s*:\s*["'`](.*?)["'`]/m);
  return titleMatch?.[1]?.trim() || null;
}

async function findFirstExistingFile(baseDir: string, filenames: string[]) {
  for (const filename of filenames) {
    const fullPath = path.join(baseDir, filename);
    if (await fileExists(fullPath)) return fullPath;
  }
  return null;
}

async function listTools(appDir: string): Promise<ToolInfo[]> {
  const entries = await fs.readdir(appDir, { withFileTypes: true });
  const tools: ToolInfo[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (TOOL_DIR_EXCLUSIONS.has(entry.name)) continue;
    if (entry.name.startsWith('_')) continue;

    const toolDir = path.join(appDir, entry.name);
    const pagePath = await findFirstExistingFile(toolDir, ['page.tsx', 'page.ts', 'page.jsx', 'page.js']);
    if (!pagePath) continue;

    const route = `/${entry.name}`;
    let title = toTitleCaseFromSegment(entry.name);

    try {
      const source = await fs.readFile(pagePath, 'utf8');
      title = parseMetadataTitle(source) ?? title;
    } catch {
      // ignore and fall back
    }

    tools.push({ route, title });
  }

  tools.sort((a, b) => a.title.localeCompare(b.title));
  return tools;
}

function parseApiMethods(source: string) {
  const methods: string[] = [];
  const re = /export\s+(?:async\s+)?function\s+(GET|POST|PUT|PATCH|DELETE|OPTIONS|HEAD)\b/g;

  for (const match of source.matchAll(re)) {
    const method = match[1];
    if (!method) continue;
    if (!methods.includes(method)) methods.push(method);
  }

  return methods;
}

async function listApis(apiDir: string): Promise<ApiInfo[]> {
  const apis: ApiInfo[] = [];

  async function walk(currentDir: string, segments: string[]) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath, [...segments, entry.name]);
        continue;
      }

      if (!entry.isFile()) continue;
      if (!/^route\.(t|j)sx?$/.test(entry.name)) continue;

      try {
        const source = await fs.readFile(fullPath, 'utf8');
        const methods = parseApiMethods(source);
        const route = `/api/${segments.join('/')}`;
        apis.push({ route, methods });
      } catch {
        // ignore unreadable route handlers
      }
    }
  }

  if (await fileExists(apiDir)) {
    await walk(apiDir, []);
  }

  apis.sort((a, b) => a.route.localeCompare(b.route));
  return apis;
}

export async function getHomeIndex() {
  const appDir = path.join(process.cwd(), 'src', 'app');
  const apiDir = path.join(appDir, 'api');

  const [tools, apis] = await Promise.all([listTools(appDir), listApis(apiDir)]);
  return { tools, apis };
}
