'use client';

import { useSiteBuilder } from '@/contexts/SiteBuilderContext';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { PreviewPanel } from '@/components/preview/PreviewPanel';

export function EditorLayout() {
  const { components } = useSiteBuilder();
  return (
    <div className="flex h-screen">
      <Sidebar />
      <PreviewPanel components={components} />
    </div>
  );
}
