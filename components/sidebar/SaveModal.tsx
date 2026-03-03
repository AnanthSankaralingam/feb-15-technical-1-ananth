'use client';

import { useState } from 'react';
import { FormField, INPUT_CLASS } from '@/components/sidebar/editors/inputs/FormField';

interface SaveModalProps {
  onSave: (name: string) => void;
  onCancel: () => void;
  isSaving: boolean;
}

const SLUG_REGEX = /^[a-zA-Z0-9_-]+$/;

export const SaveModal = ({ onSave, onCancel, isSaving }: SaveModalProps) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Name is required.');
      return;
    }
    if (!SLUG_REGEX.test(trimmed)) {
      setError('Only letters, numbers, hyphens, and underscores are allowed.');
      return;
    }
    onSave(trimmed);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Name Your Preview</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Preview name">
            <input
              className={INPUT_CLASS}
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              placeholder="e.g. my-landing-page"
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </FormField>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSaving}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-sm font-medium"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
