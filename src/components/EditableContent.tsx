
import React, { useState, useEffect, ReactElement, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Database } from '@/integrations/supabase/types';
import { User } from '@supabase/supabase-js';

type ContentRow = Database['public']['Tables']['content']['Row'];

interface EditableContentProps {
  type: 'title' | 'description' | 'code';
  page: string;
  section: string;
  children: React.ReactNode;
  className?: string;
  contentId?: string;
}

const EditableContent = ({ type, page, section, children, className, contentId }: EditableContentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState('');
  const [initialContent, setInitialContent] = useState('');
  const { isAdmin, user } = useAuth();

  // Effect to initialize content when editing starts
  useEffect(() => {
    if (isEditing) {
      // Try to extract current content from the children
      if (children) {
        // Check if children is a valid React element
        if (React.isValidElement(children)) {
          const childElement = children as ReactElement;
          // Check if the element has props and children
          if (childElement.props && 'children' in childElement.props) {
            const childContent = childElement.props.children;
            // Check if childContent is a string
            if (typeof childContent === 'string') {
              setContent(childContent);
              setInitialContent(childContent);
              return;
            } 
            // Check if childContent is a React element with string children
            else if (React.isValidElement(childContent) && 
                     'props' in childContent &&
                     childContent.props && 
                     'children' in childContent.props &&
                     typeof childContent.props.children === 'string') {
              setContent(childContent.props.children);
              setInitialContent(childContent.props.children);
              return;
            }
          }
        }
      }
      // Fallback if we couldn't extract content
      setContent('');
      setInitialContent('');
    }
  }, [isEditing, children]);

  const handleSave = async () => {
    try {
      // If the content hasn't changed, just close the editor
      if (content === initialContent) {
        setIsEditing(false);
        return;
      }
      
      if (contentId) {
        // Update existing content
        const updateData: Partial<ContentRow> = {
          updated_at: new Date().toISOString(),
        };

        // Set the appropriate field based on the type
        if (type === 'title') updateData.title = content;
        else if (type === 'description') updateData.description = content;
        else if (type === 'code') updateData.code = content;

        const { error } = await supabase
          .from('content')
          .update(updateData)
          .eq('id', contentId);

        if (error) throw error;
      } else {
        // Create new content if it doesn't exist
        const insertData: Database['public']['Tables']['content']['Insert'] = {
          page,
          section,
          created_by: user?.id,
          updated_at: new Date().toISOString(),
        };

        // Set the appropriate field based on the type
        if (type === 'title') insertData.title = content;
        else if (type === 'description') insertData.description = content;
        else if (type === 'code') insertData.code = content;

        const { error } = await supabase
          .from('content')
          .insert(insertData);

        if (error) throw error;
      }

      setIsEditing(false);
      toast({
        title: "Success",
        description: "Content updated successfully",
      });
      
      // Reload the page to see the changes
      window.location.reload();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update content",
        variant: "destructive",
      });
    }
  };

  // Only render the popover if user is admin
  if (!isAdmin) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Popover open={isEditing} onOpenChange={setIsEditing}>
      <PopoverTrigger asChild>
        <div 
          className={`${className} cursor-pointer border-dashed border-2 border-transparent hover:border-gray-300 p-1 transition-all`}
          title="Click to edit (Admin only)"
        >
          {children}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium">Edit {type}</h4>
          <Textarea
            className="min-h-[100px]"
            placeholder={`Enter ${type} here...`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            autoFocus
          />
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EditableContent;
