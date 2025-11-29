# 3. Layout

- Pagest are route-specific UI components
- A layout is a shared UI component that is common to multiple routes

Ex: Header, Footer, Sidebar

## How to create layouts

- Default export a React component from a layout.js or layout.tsx file
- That component takes a children prop, which Next.js will populate with your page content.

```tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
```

## Nested layouts

- Layouts can be created for specific routes, group of routes, inside other layouts or all routes.

- Layouts are merged at runtime

- To create nested layouts, create a layout.tsx file in products/[productId] directory

- Write following code in layout.tsx file

```tsx
export default function ProductDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1>Featured Product</h1>
      {children}
    </>
  );
}
```

    src/app
    |--- layout.tsx
    |--- products
    | |--- [productId]
    | | |--- layout.tsx
    | | |--- page.tsx

## Multiple root layout

- Problem: let's say we want to add a global header and footer to all pages like login, signup and forget password pages

- Solution: Route Group

- Route group uses:
  - Organize our project structure without affecting URL
  - Apply layouts selectively to specific routes
