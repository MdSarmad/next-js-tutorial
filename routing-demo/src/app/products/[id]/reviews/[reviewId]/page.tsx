import { notFound } from "next/navigation";
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
