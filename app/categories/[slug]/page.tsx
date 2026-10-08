import { redirect } from "next/navigation";

export default async function CategoriesSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/category/${slug}`);
}
