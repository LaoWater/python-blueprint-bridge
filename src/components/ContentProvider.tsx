
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type ContentRow = Database['public']['Tables']['content']['Row'];
type ContentMap = Record<string, Record<string, ContentRow>>;

interface ContentContextType {
  content: ContentMap;
  loading: boolean;
  getContent: (page: string, section: string) => ContentRow | undefined;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ContentMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*');

      if (error) {
        console.error('Error fetching content:', error);
        return;
      }

      // Organize by page and section for easy lookup
      const contentMap: ContentMap = {};
      data.forEach((item) => {
        if (!contentMap[item.page]) {
          contentMap[item.page] = {};
        }
        contentMap[item.page][item.section] = item;
      });

      setContent(contentMap);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const getContent = (page: string, section: string) => {
    return content[page]?.[section];
  };

  return (
    <ContentContext.Provider value={{ content, loading, getContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
