import { Metadata } from "next";
type Props = {
  params: Promise<{ productId: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const productId = (await params).productId;
  const title: string = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Product ${productId}`);
    }, 1000);
  });

  return {
    title,
  };
};

export default async function Product({ params }: Props) {
  const productId = (await params).productId;
  return <div>Product {productId}</div>;
}
