import { Component } from '@/types/components';
import { TextRenderer } from '@/components/preview/TextRenderer';
import { ButtonRenderer } from '@/components/preview/ButtonRenderer';
import { ImageRenderer } from '@/components/preview/ImageRenderer';

interface ComponentWrapperProps {
  component: Component;
}

export const ComponentWrapper = ({ component }: ComponentWrapperProps) => {
  const { container } = component;

  const alignmentClass = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }[container.alignment];

  return (
    <div className={`w-full flex ${alignmentClass} py-2`}>
      <div>
        {component.type === 'text' && <TextRenderer component={component} />}
        {component.type === 'button' && <ButtonRenderer component={component} />}
        {component.type === 'image' && <ImageRenderer component={component} />}
      </div>
    </div>
  );
};
