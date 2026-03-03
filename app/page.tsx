'use client';

import { SiteBuilderProvider } from '@/contexts/SiteBuilderContext';
import { EditorLayout } from '@/components/EditorLayout';

export default function Home() {
  return (
    <SiteBuilderProvider>
      <EditorLayout />
    </SiteBuilderProvider>
  );
}
