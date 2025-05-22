
import { useContent } from './ContentProvider';
import { useAuth } from './AuthContext';
import EditableContent from './EditableContent';
import { useTheme } from "./theme-provider";

interface PageHeaderProps {
  page: string;
  defaultTitle: string;
  defaultSubtitle: string;
}

const EditablePageHeader = ({ page, defaultTitle, defaultSubtitle }: PageHeaderProps) => {
  const { theme } = useTheme();
  const { getContent } = useContent();
  const { isAdmin } = useAuth();
  
  const headerContent = getContent(page, 'header');
  const title = headerContent?.title || defaultTitle;
  const subtitle = headerContent?.description || defaultSubtitle;
  
  return (
    <div className="relative py-12 border-b border-border overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-small-white/[0.2] dark:bg-grid-small-white/[0.05] -z-10" />
        <div className="absolute inset-0 bg-python-blue/5 dark:bg-python-blue/10 -z-10" />
        <div className="absolute h-full w-full bg-gradient-to-br from-python-light/30 via-transparent to-python-blue/10 dark:from-python-dark/20 dark:via-transparent dark:to-python-blue/5 -z-10" />
      </div>
      
      <div className="max-w-4xl mx-auto px-4">
        <EditableContent 
          type="title" 
          page={page} 
          section="header" 
          contentId={headerContent?.id}
          className="page-title animate-fade-in text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400"
        >
          <h1>{title}</h1>
        </EditableContent>
        
        <EditableContent 
          type="description" 
          page={page} 
          section="header" 
          contentId={headerContent?.id}
          className="page-subtitle animate-fade-in animation-delay-150 text-xl md:text-2xl text-gray-600 dark:text-gray-300"
        >
          <p>{subtitle}</p>
        </EditableContent>
      </div>
      
      <div className="absolute -bottom-6 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-background"></div>
    </div>
  );
};

export default EditablePageHeader;
