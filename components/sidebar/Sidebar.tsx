'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSiteBuilder } from '@/contexts/SiteBuilderContext';
import { ComponentList } from '@/components/sidebar/ComponentList';
import { ComponentEditor } from '@/components/sidebar/ComponentEditor';
import { SaveModal } from '@/components/sidebar/SaveModal';
import { Toast, useToast } from '@/components/Toast';

export const Sidebar = () => {
  const router = useRouter();
  const { components, selectedComponentId, previewId } = useSiteBuilder();
  const selectedComponent = components.find((c) => c.id === selectedComponentId);
  const { message, showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = async (name: string) => {
    try {
      setIsSaving(true);
      const response = await fetch('/api/previews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ components, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast(data.error ?? 'Error saving preview. Please try again.');
        setIsModalOpen(false);
        return;
      }

      showToast('Preview saved. Redirecting...');
      router.push(`/${name}`);
    } catch (error) {
      console.error(error);
      showToast('Error saving preview. Please try again.');
      setIsModalOpen(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setIsSaving(true);
      const response = await fetch(`/api/previews/${previewId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ components }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast(data.error ?? 'Error saving. Please try again.');
        return;
      }

      showToast('Saved!');
    } catch (error) {
      console.error(error);
      showToast('Error saving. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveClick = () => {
    if (components.length === 0) {
      showToast('Add components before saving a preview');
      return;
    }
    if (previewId) {
      handleUpdate();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="w-96 bg-gray-50 border-r border-gray-200 h-screen flex flex-col">
      <div className="p-3 border-b border-gray-200 flex justify-end">
        <button
          onClick={handleSaveClick}
          disabled={isSaving}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
        <Toast message={message} />
      </div>
      <div className="flex-1 overflow-hidden">
        {selectedComponent ? <ComponentEditor /> : <ComponentList />}
      </div>
      {isModalOpen && (
        <SaveModal
          onSave={handleCreate}
          onCancel={() => setIsModalOpen(false)}
          isSaving={isSaving}
        />
      )}
    </div>
  );
};
