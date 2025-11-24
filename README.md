# Routing

- Next.js has a file-system based routing system.
- URLs you can access in your browser are determined by how you organize your files and folders in your codebase.

## Routing conventions

- All routes must live inside the app folder
- Route files must be named either page.js or page.tsx
- Each folder represents a segment of the URL path

When these conventions are followed, the file automatically becomes available as a route.

### File Based routting

- Scenario 1: We want to create a route for the home page when someone visits the root URL
  - Create a file named page.tsx in the app folder
  - Add the following code to the file

```tsx
export default function Home() {
  return <h1>Welcome Home</h1>;
}
```

    src/app
    |---page.tsx

- Scenario 2: We want to create two additional routes for the about and profile page when someone visits the /about and /profile URL
  - Create two folders named about and profile in the app folder
  - Create a file named page.tsx in each folder
  - Add the following code to each file

```tsx
export default function About() {
  return <h1>About me</h1>;
}
```

```tsx
export default function Profile() {
  return <h1>My Profile</h1>;
}
```

    src/app
    |---page.tsx
    |---about
    |   |---page.tsx
    |---profile
    |   |---page.tsx

- Scenario 3: (Nested routes) We want to create a route for the blog page when someone visits the /blog URL also we want to create a route for the blog post when someone visits the /blog/first or /blog/second URL
  - Create a folder named blog in the app folder
  - Create a file named page.tsx in the blog folder
  - Add the following code to the file

```tsx
export default function Blog() {
  return <h1>Blog</h1>;
}
```

- Create a folder named first in the blog folder
- Create a file named page.tsx in the first folder
- Add the following code to the file

```tsx
export default function First() {
  return <h1>First Post</h1>;
}
```

- Create a folder named second in the blog folder
- Create a file named page.tsx in the second folder
- Add the following code to the file

```tsx
export default function Second() {
  return <h1>Second Post</h1>;
}
```

    src/app
    |---page.tsx
    |---about
    |   |---page.tsx
    |---profile
    |   |---page.tsx
    |---blog
    |   |---page.tsx
    |   |---first
    |   |   |---page.tsx
    |   |---second
    |       |---page.tsx

- Scenario 4: (Dynamic routes) We want to create a route for the products page when someone visits the /products URL it should display all the products also we want to create a dynamic route /products/:id to display a specific product details
  - Create a folder named products in the app folder
  - Create a file named page.tsx in the products folder
  - Add the following code to the file

```tsx
export default function Products() {
  return <h1>Products</h1>;
}
```

- Create a folder named [id] in the products folder
- Create a file named page.tsx in the [id] folder
- Add the following code to the file

```tsx
export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <h1>Product details {id}</h1>;
}
```

    src/app
    |---page.tsx
    |---about
    |   |---page.tsx
    |---profile
    |   |---page.tsx
    |---blog
    |   |---page.tsx
    |   |---first
    |   |   |---page.tsx
    |   |---second
    |       |---page.tsx
    |---products
    |   |---page.tsx
    |   |---[id]
    |       |---page.tsx

- Scenario 5: (Dynamic nested routes) We want to create a route for the product reviews when someone visits the /products/:id/reviews/:reviewId URL it should display a specific review for the product.
  - Create a folder named reviews in the products folder
  - Create a file named page.tsx in the reviews folder
  - Add the following code to the file

```tsx
export default async function Reviews({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <h1>Reviews for product {id}</h1>;
}
```

- Create a folder named [reviewId] in the reviews folder
- Create a file named page.tsx in the [reviewId] folder
- Add the following code to the file

```tsx
export default async function Review({
  params,
}: {
  params: Promise<{ id: string; reviewId: string }>;
}) {
  const { id, reviewId } = await params;
  return (
    <h1>
      Review - {reviewId} for product {id}
    </h1>
  );
}
```

    src/app
    |---page.tsx
    |---about
    |   |---page.tsx
    |---profile
    |   |---page.tsx
    |---blog
    |   |---page.tsx
    |   |---first
    |   |   |---page.tsx
    |   |---second
    |       |---page.tsx
    |---products
    |   |---page.tsx
    |   |---[id]
    |   |   |---page.tsx
    |   |   |---reviews
    |   |       |---page.tsx
    |           |---[reviewId]
    |               |---page.tsx

- Scenario 6: (Catch-all segments) let's say we have a sidenav with 20 features and there are 5 sub nav routes for each feature. If we create 20 folders and 5 sub folders for each feature it will be a lot of work. We can use catch-all segments to create a dynamic route for each feature and sub feature.
  - Create a folder named docs in the app folder
  - Create a sub folder named [...slug] in the docs folder
  - Create a file named page.tsx in the [...slug] folder
  - Add the following code to the file

```tsx
export default async function Docs({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const slug = (await params).slug;
  return <h1>Docs - {slug.join("/")}</h1>;
}
```

Note: We can use [[...slug]] to make the catch-all segment optional. It will match the root URL as well. ex: docs, docs/routing, docs/routing/catch-all-segments

## Not found page

- This page is used to handle 404 errors
- Create a file named not-found.tsx or not-found.jsx in the app folder
- Add the following code to the file

```tsx
export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}
```

- We can also redirect to not-found page programatically using the notFound() function
- Add the following code to [reviewId]/page.tsx
- If reviewId is greater than 1000, redirect to not-found page

```tsx
export default async function Review({
  params,
}: {
  params: Promise<{ id: string; reviewId: string }>;
}) {
  const { id, reviewId } = await params;
  if (parseInt(reviewId) > 1000) {
    notFound();
  }
  return (
    <h1>
      Review - {reviewId} for product {id}
    </h1>
  );
}
```

- If you want an specific not-found page for reviews, create a file named not-found.tsx or not-found.jsx in the reviews folder
- Add the following code to the file

```tsx
export default function NotFound() {
  return (
    <div>
      <h1>404 - Review Not Found</h1>
      <p>Sorry, the review you are looking for does not exist.</p>
    </div>
  );
}
```

- NotFound page does not accept any props
- For dynamic changes in not-found page, use usePathname() hook
- To use hook in server component, add "use client" directive at the top of the file

## Private folders

- A way to tell Next.js "Hey, this folder is just for internal stuff and don't include it in te routing system."

- The folder and all its subfolders are excluded from the routing.

- Add an underscore (\_) at the start of the folder name to make it private.

ex: \_lib

Private folders are super useful for a bunch of things:

- Keeping your UI logic separate from routing logic
- Having a consistent way to organize internal files in your project
- Making it easier to group related files in your code editor
- Avoiding potential naming conflicts with future Next.js file naming conventions
- If you actually want an underscore in your URL, either use a catch-all segment or use "%5f" instead of "\_". That's just the URL encoded version of an underscore.

## Route groups

- Route groups allow you to group related routes together in the file system.
- Create a folder named "(auth)" in the app folder
- Create three folders named login, register, and forgetPassword in the (auth) folder
- Create a file named page.tsx in each folder
- Add the following code to the file

```tsx
export default function Login() {
  return <h1>Login</h1>;
}
```

```tsx
export default function Register() {
  return <h1>Register</h1>;
}
```

```tsx
export default function ForgetPassword() {
  return <h1>Forget Password</h1>;
}
```

- The routes will be grouped together in the file system.
- The routes will be accessible(without the group name i.e. "(auth)") at the following URLs:
  - /login
  - /register
  - /forgetPassword
