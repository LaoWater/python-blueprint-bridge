import React from 'react';

interface EditableContentProps {
  children: React.ReactNode;
  className?: string;
  contentId?: string;
  type?: string;
  page?: string;
  section?: string;
}

const EditableContent = ({ children, className }: EditableContentProps) => {
  return <div className={className}>{children}</div>;
};

export default EditableContent;