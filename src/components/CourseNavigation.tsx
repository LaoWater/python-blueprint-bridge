import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CourseNavigationProps {
  previousCourse?: {
    path: string;
    title: string;
  };
  nextCourse?: {
    path: string;
    title: string;
  };
}

const CourseNavigation = ({ previousCourse, nextCourse }: CourseNavigationProps) => {
  return (
    <div className="mt-12 pt-6 border-t border-border/50">
      <div className="flex justify-between items-center max-w-4xl">
        {/* Previous Course */}
        {previousCourse ? (
          <Button asChild variant="ghost" className="group h-auto p-4 flex-col items-start">
            <Link to={previousCourse.path}>
              <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors mb-1">
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm">Previous</span>
              </div>
              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                {previousCourse.title}
              </span>
            </Link>
          </Button>
        ) : (
          <div></div>
        )}

        {/* Next Course */}
        {nextCourse ? (
          <Button asChild variant="ghost" className="group h-auto p-4 flex-col items-end">
            <Link to={nextCourse.path}>
              <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors mb-1">
                <span className="text-sm">Next</span>
                <ChevronRight className="w-4 h-4" />
              </div>
              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                {nextCourse.title}
              </span>
            </Link>
          </Button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default CourseNavigation;