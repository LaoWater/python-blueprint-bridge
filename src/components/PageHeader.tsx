
import { useTheme } from "./theme-provider";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  const { theme } = useTheme();
  
  return (
    <div className="relative py-12 border-b border-border overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-small-white/[0.2] dark:bg-grid-small-white/[0.05] -z-10" />
        <div className="absolute inset-0 bg-python-blue/5 dark:bg-python-blue/10 -z-10" />
        <div className="absolute h-full w-full bg-gradient-to-br from-python-light/30 via-transparent to-python-blue/10 dark:from-python-dark/20 dark:via-transparent dark:to-python-blue/5 -z-10" />
      </div>
      
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="page-title animate-fade-in text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
          {title}
        </h1>
        <p className="page-subtitle animate-fade-in animation-delay-150 text-xl md:text-2xl text-gray-600 dark:text-gray-300">
          {subtitle}
        </p>
      </div>
      
      <div className="absolute -bottom-6 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-background"></div>
    </div>
  );
};

export default PageHeader;
