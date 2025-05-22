
import { useState } from 'react';
import { useAuth } from './AuthContext';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Database } from '@/integrations/supabase/types';

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
  const { isAdmin } = useAuth();

  const handleSave = async () => {
    try {
      // Define the data to update, starting with updated_at
      const updateData: Partial<ContentRow> = {
        updated_at: new Date().toISOString(),
      };

      // Set the appropriate field based on the type
      if (type === 'title') updateData.title = content;
      else if (type === 'description') updateData.description = content;
      else if (type === 'code') updateData.code = content;

      if (contentId) {
        // Update existing content
        const { error } = await supabase
          .from('content')
          .update(updateData)
          .eq('id', contentId);

        if (error) throw error;
      } else {
        // Create new content if it doesn't exist
        // Make sure page and section are included for new content
        const insertData = {
          ...updateData,
          page,
          section,
        };
        
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
      // In a more sophisticated app, you would update state instead
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
        <div className={`${className} cursor-pointer border-dashed border-2 border-transparent hover:border-gray-300 p-1 transition-all`}>
          {children}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium">Edit {type}</h4>
          <Textarea
            className="min-h-[100px]"
            placeholder={`Enter ${type} here...`}
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
