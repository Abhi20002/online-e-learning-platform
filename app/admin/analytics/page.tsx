"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, BookOpen, ArrowUp, ArrowDown } from "lucide-react";

export default function AdminAnalyticsPage() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$124,563",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "New Students",
      value: "2,845",
      change: "+18.2%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Course Enrollments",
      value: "15,234",
      change: "+8.4%",
      trend: "up",
      icon: BookOpen,
    },
    {
      title: "Completion Rate",
      value: "68.5%",
      change: "-2.1%",
      trend: "down",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">
          Platform performance metrics and insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === "up" ? ArrowUp : ArrowDown;
          const trendColor = metric.trend === "up" ? "text-green-600" : "text-red-600";

          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendIcon className={`h-4 w-4 ${trendColor}`} />
                  <span className={`text-sm font-medium ${trendColor}`}>
                    {metric.change}
                  </span>
                  <span className="text-sm text-muted-foreground">vs last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            Chart visualization would go here
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Course Title #{i}</p>
                    <p className="text-sm text-muted-foreground">{Math.floor(Math.random() * 1000)} students</p>
                  </div>
                  <span className="font-bold text-green-600">${(Math.random() * 10000).toFixed(0)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Student Name #{i}</p>
                    <p className="text-sm text-muted-foreground">Enrolled in Course Name</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{i}h ago</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
