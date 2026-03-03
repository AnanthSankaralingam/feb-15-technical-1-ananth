import { notFound } from 'next/navigation';
import { getPreviewBySlug } from '@/lib/previews';
import { SiteBuilderProvider } from '@/contexts/SiteBuilderContext';
import { EditorLayout } from '@/components/EditorLayout';

interface PreviewPageProps {
  params: { id: string };
}

export default function PreviewPage({ params }: PreviewPageProps) {
  const preview = getPreviewBySlug(params.id);

  if (!preview || preview.deleted) {
    notFound();
  }

  return (
    <SiteBuilderProvider initialComponents={preview.components} previewId={preview.id}>
      <EditorLayout />
    </SiteBuilderProvider>
  );
}
