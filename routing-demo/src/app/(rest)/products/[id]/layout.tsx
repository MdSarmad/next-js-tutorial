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
