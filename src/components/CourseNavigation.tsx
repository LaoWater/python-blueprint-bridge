import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CourseNavigationProps {
  previousCourse?: {
    path: string;
    title: string;
    description: string;
  };
  nextCourse?: {
    path: string;
    title: string;
    description: string;
  };
}

const CourseNavigation = ({ previousCourse, nextCourse }: CourseNavigationProps) => {
  return (
    <div className="mt-16 pt-8 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Previous Course */}
        {previousCourse && (
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <Link to={previousCourse.path} className="block">
                <div className="flex items-center gap-3 mb-3">
                  <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-sm text-muted-foreground">Previous Course</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  {previousCourse.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {previousCourse.description}
                </p>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Next Course */}
        {nextCourse && (
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <Link to={nextCourse.path} className="block">
                <div className="flex items-center justify-end gap-3 mb-3">
                  <span className="text-sm text-muted-foreground">Next Course</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 text-right">
                  {nextCourse.title}
                </h3>
                <p className="text-sm text-muted-foreground text-right">
                  {nextCourse.description}
                </p>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CourseNavigation;