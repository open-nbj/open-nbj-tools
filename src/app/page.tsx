import Link from 'next/link';

import { LanguageSelector } from '@/components/app/language-selector';
import { ThemeToggleGroup } from '@/components/app/theme-toggle-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getHomeIndex } from '@/lib/home-index';

export const runtime = 'nodejs';

export default async function Home() {
  const { tools, apis } = await getHomeIndex();

  return (
    <div className="flex flex-col">
      <div className="flex justify-end p-4 gap-4">
        <LanguageSelector />
        <ThemeToggleGroup />
      </div>

      <main className="mx-auto w-full max-w-5xl px-4 pb-16">
        <header className="space-y-2 py-10">
          <h1 className="text-3xl font-semibold tracking-tight">Tools</h1>
          <p className="text-muted-foreground">
            Free, frontend-first utilities. Current available tools and APIs are listed below.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Tools</CardTitle>
              <CardDescription>Available pages under the app router.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {tools.length ? (
                <ul className="space-y-2">
                  {tools.map((tool) => (
                    <li key={tool.route} className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="truncate font-medium">{tool.title}</div>
                        <code className="text-xs text-muted-foreground">{tool.route}</code>
                      </div>
                      <Link href={tool.route}>Open</Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No tools found.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API</CardTitle>
              <CardDescription>
                Available route handlers under <code>/api</code>.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {apis.length ? (
                <ul className="space-y-2">
                  {apis.map((api) => (
                    <li key={api.route} className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          {(api.methods.length ? api.methods : ['?']).map((method) => (
                            <span
                              key={`${api.route}:${method}`}
                              className="rounded-md bg-muted px-2 py-1 text-xs font-medium"
                            >
                              {method}
                            </span>
                          ))}
                          <code className="text-sm">{api.route}</code>
                        </div>
                      </div>
                      <Link href={api.route} target="_blank">
                        View
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No API routes found.</p>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
