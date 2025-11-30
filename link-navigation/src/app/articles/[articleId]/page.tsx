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

// params and search params in client component
// "use client";
// import Link from "next/link";
// import { use } from "react";
// export default function NewsArticle({
//   params,
//   searchParams,
// }: {
//   params: Promise<{ articleId: string }>;
//   searchParams: Promise<{ lang?: "en" | "es" | "fr" }>;
// }) {
//   const { articleId = "" } = use(params);
//   const { lang = "en" } = use(searchParams);

//   return (
//     <div>
//       <h1>News article {articleId}</h1>
//       <p>Reading in language {lang}</p>
//       <div>
//         <Link href={`/articles/${articleId}?lang=en`}>Read in English</Link>
//         <Link href={`/articles/${articleId}?lang=es`}>Read in Spanish</Link>
//         <Link href={`/articles/${articleId}?lang=fr`}>Read in French</Link>
//       </div>
//     </div>
//   );
// }
