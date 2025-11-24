export default async function Reviews({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <h1>Reviews for product {id}</h1>;
}
