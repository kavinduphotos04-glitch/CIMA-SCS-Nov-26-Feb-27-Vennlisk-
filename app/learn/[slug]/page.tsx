import { notFound } from "next/navigation";
import { modules } from "@/lib/content";
import { LessonPage } from "@/components/learning";
export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!modules.some((m) => m.slug === slug)) notFound();
  return <LessonPage key={slug} slug={slug} />;
}
