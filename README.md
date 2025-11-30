# 6. UI Concepts

## Template files

- Templates are similar to layouts in that tehy are also UI shared between multiple pages
- Whenever a user navigates between routes sharing a template, you get a completely fresh start

  - a new template component instance is mounted
  - DOM elements are recreated
  - state is cleared
  - effects are re-synchronized

- Create a template by exporting a default React component from a template.js or template.tsx file

- Like layouts, templates need to accept a children prop to render the nested route segments

- We can use both layouts and templates in the same app

```tsx
// app/layout.tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

// app/template.tsx
export default function Template({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
```

## Loading files

- This file helps us create loading states that users see while waiting for content to load in a specific route segment

- The loading states appear instantly when navigating, letting users know that the application is responsive and actively loading content.

- To create loading states, we need to create a loading.js or loading.tsx file in the same directory as the page.js or page.tsx file.

### loading.tsx benifits

- It gives users immediate feedback when they navigate somewhere new. This makes your app feel snappy and responsive, and users know their click actually did something

- Next.js keeps shared layouts interactive while new content loads. Users can still use thinkgs like navigation menus or sidebars even if the main ontent isn't ready yet

## Error handling files(ErrorBoundary)

- ErrorBoundary is a component that catches and handles errors in the component tree below it

- ErrorBoundary components are client-side only

- To create an ErrorBoundary, we need to create an error.js or error.tsx file in the same directory as the page.js or page.tsx file

- It automatically wraps route segments and their nested children in a React ErrorBoundary

- You can create custom error UIs for specific segments using the file-system hierarchy

- It isolates errors to affected segments while keeping the rest of your app functional

- It enables you to attempt to recorver from an error without requiring a full page reload

## Component Hierarchy

```tsx
<Layout>
  <Template>
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<NotFound />}>
          <Page />
        </ErrorBoundary>
      </Suspense>
    </ErrorBoundary>
  </Template>
</Layout>
```

## Reload from ErrorBoundary

- ErrorBoundary provides a reset function that we can use to reload the page from an ErrorBoundary

- ErrorBoundary components are client-side only, to reload the server side page from an ErrorBoundary, we need to use the useRouter hook and the router.refresh() method along with startTransition to prevent the page from being reloaded;

```tsx
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  const reload = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };
  return (
    <>
      <h1>{error.message}</h1>
      <button onClick={() => reload()}>Try again</button>
    </>
  );
}
```

## Handle Error from nested routes

- Errors always bubble up to find the closest parent error boundary

- An error.tsx file handles errors not just for its own folder, but for all the nested child segments below it too

- By strategically placing error.tsx files at different levels in your route folders, you can control exactly how detailed your error handling gets

## Handling errors in layouts

- Use error.tsx files one level above the layout to handle errors for the entire layout

## Handling global errors

- Ques - If an erorr boundary can't catch errors in the layout.tsx file from the same segment, what about errors in the root layout.tsx file? It doesn't have a parent segment - how do we handle those errors?

- Answer - Next.js provides a special file called global-error.tsx that goes in your root app directory

- This is your last line of defense when something goes catastrophically wrong at the highest level of your app

- global-error.tsx works only in production mode and it requires html and body tags to be rendered.

```tsx
// app/global-error.tsx
"use client";
export default function GlobalError() {
  return (
    <html>
      <body>
        <h1>Something went wrong</h1>
        <button onClick={() => window.location.reload()}>Try again</button>
      </body>
    </html>
  );
}
```
