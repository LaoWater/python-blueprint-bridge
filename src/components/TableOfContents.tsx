
interface TOCItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

const TableOfContents = ({ items }: TableOfContentsProps) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-md transition-all duration-300 animate-fade-in shadow-sm hover:shadow-md">
      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">On This Page</h3>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className="text-gray-600 dark:text-gray-400 hover:text-python-blue dark:hover:text-python-yellow text-left w-full transition-colors"
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
