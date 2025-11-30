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
