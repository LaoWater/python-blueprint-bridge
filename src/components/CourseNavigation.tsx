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
          <Button asChild variant="outline" size="sm" className="group">
            <Link to={previousCourse.path} className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              <span>Previous: {previousCourse.title}</span>
            </Link>
          </Button>
        ) : (
          <div></div>
        )}

        {/* Next Course */}
        {nextCourse ? (
          <Button asChild variant="outline" size="sm" className="group">
            <Link to={nextCourse.path} className="flex items-center gap-2">
              <span>Next: {nextCourse.title}</span>
              <ChevronRight className="w-4 h-4" />
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