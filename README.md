# 5. Navigation

## Link component navigation

- for client-side navigation we can use Link component
- The `<Link>` component is a React component that extends the HTML `<a>` element, and it's the primary way to navigate between pages in Next.js
- To use the `<Link>` component, we need to import it from 'next/link'

```tsx
<Link href="/about">About</Link>
```

### replace

- replace attribut in Link component overrides the history stack of the navigation

```tsx
<Link href="/about" replace>
  About
</Link>
```

## Params and searchParams

- For a given URL,

### params

- params is a promise that resolves to an object containing the dynamic route parameters (like id)

### searchParams

- searchParams is a promise that resolves to an object containing the query parameters (like ?id=1)

```tsx
// server component
import Link from "next/link";
export default async function NewsArticle({
  params,
  searchParams,
}: {
  params: Promise<{ articleId: string }>;
  searchParams: Promise<{ lang?: "en" | "es" | "fr" }>;
}) {
  const { articleId = "" } = await params;
  const { lang = "en" } = await searchParams;

  return (
    <div>
      <h1>News article {articleId}</h1>
      <p>Reading in language {lang}</p>
      <div>
        <Link href={`/articles/${articleId}?lang=en`}>Read in English</Link>
        <Link href={`/articles/${articleId}?lang=es`}>Read in Spanish</Link>
        <Link href={`/articles/${articleId}?lang=fr`}>Read in French</Link>
      </div>
    </div>
  );
}
```

```tsx
// client component
"use client";
import Link from "next/link";
import { use } from "react";
export default function NewsArticle({
  params,
  searchParams,
}: {
  params: Promise<{ articleId: string }>;
  searchParams: Promise<{ lang?: "en" | "es" | "fr" }>;
}) {
  const { articleId = "" } = use(params);
  const { lang = "en" } = use(searchParams);

  return (
    <div>
      <h1>News article {articleId}</h1>
      <p>Reading in language {lang}</p>
      <div>
        <Link href={`/articles/${articleId}?lang=en`}>Read in English</Link>
        <Link href={`/articles/${articleId}?lang=es`}>Read in Spanish</Link>
        <Link href={`/articles/${articleId}?lang=fr`}>Read in French</Link>
      </div>
    </div>
  );
}
```

- While page.tsx has access to both params and searchParams, layout.tsx only has access to params

## Navigating programmatically

- useRouter hook is used to navigate programmatically

```tsx
import { useRouter } from "next/navigation";
const router = useRouter();
router.push("/");
```

- redirect function is used to redirect to another page

```tsx
import { redirect } from "next/navigation";
redirect("/");
```
