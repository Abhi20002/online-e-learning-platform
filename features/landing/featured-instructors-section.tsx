import Link from "next/link";
import { Star, BookOpen, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { instructors } from "@/mock/users";
import { getInitials } from "@/lib/utils";

export function FeaturedInstructorsSection() {
  // Get first 4 instructors
  const featuredInstructors = instructors.slice(0, 4);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Learn from the Best
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our instructors are industry experts passionate about sharing their knowledge
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredInstructors.map((instructor) => (
            <Card key={instructor.id} className="group hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center space-y-4">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={instructor.avatar} alt={instructor.name} />
                  <AvatarFallback className="text-2xl">
                    {getInitials(instructor.name)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                    {instructor.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {instructor.designation}
                  </p>

                  <div className="flex flex-wrap gap-1 justify-center mb-3">
                    {instructor.expertise.slice(0, 2).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{instructor.totalCourses}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{(instructor.totalStudents / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{instructor.rating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline">
            <Link href="/instructors">View All Instructors</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
