"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Download, Share2, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Certificate {
  id: string;
  courseTitle: string;
  courseSlug: string;
  instructor: string;
  completedDate: string;
  certificateNumber: string;
  validUntil?: string;
}

export default function CertificatesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock certificates
  const certificates: Certificate[] = [
    {
      id: "cert-1",
      courseTitle: "Complete Web Development Bootcamp 2024",
      courseSlug: "complete-web-development-bootcamp-2024",
      instructor: "John Smith",
      completedDate: "2024-06-15",
      certificateNumber: "CERT-WEB-2024-001234",
    },
    {
      id: "cert-2",
      courseTitle: "UI/UX Design Masterclass",
      courseSlug: "ui-ux-design-masterclass",
      instructor: "Emily Davis",
      completedDate: "2024-05-20",
      certificateNumber: "CERT-UX-2024-005678",
    },
    {
      id: "cert-3",
      courseTitle: "Mobile App Development with Flutter",
      courseSlug: "mobile-app-flutter",
      instructor: "Lisa Anderson",
      completedDate: "2024-04-10",
      certificateNumber: "CERT-MOB-2024-009012",
    },
    {
      id: "cert-4",
      courseTitle: "Machine Learning Fundamentals",
      courseSlug: "machine-learning-fundamentals",
      instructor: "Dr. James Wilson",
      completedDate: "2024-03-05",
      certificateNumber: "CERT-ML-2024-003456",
      validUntil: "2026-03-05",
    },
    {
      id: "cert-5",
      courseTitle: "Digital Marketing Strategy",
      courseSlug: "digital-marketing-strategy",
      instructor: "Sarah Martinez",
      completedDate: "2024-02-14",
      certificateNumber: "CERT-MKT-2024-007890",
    },
  ];

  const filteredCertificates = certificates.filter((cert) =>
    cert.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (certificateId: string, courseTitle: string) => {
    toast.success(`Downloading certificate for "${courseTitle}"`);
  };

  const handleShare = (certificateId: string, courseTitle: string) => {
    navigator.clipboard.writeText(`https://learnhub.com/certificates/${certificateId}`);
    toast.success("Certificate link copied to clipboard");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">My Certificates</h1>
        <p className="text-muted-foreground">
          {certificates.length} certificates earned
        </p>
      </div>

      {/* Search */}
      {certificates.length > 0 && (
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search certificates..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {/* Certificates Grid */}
      {filteredCertificates.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCertificates.map((cert) => (
            <Card key={cert.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="success" className="mb-2">
                      Verified
                    </Badge>
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                      {cert.courseTitle}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Instructor: {cert.instructor}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Completed</span>
                    <span className="font-medium">
                      {new Date(cert.completedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Certificate No.</span>
                    <span className="font-mono text-xs">{cert.certificateNumber}</span>
                  </div>
                  {cert.validUntil && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Valid Until</span>
                      <span className="font-medium">
                        {new Date(cert.validUntil).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleDownload(cert.id, cert.courseTitle)}
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleShare(cert.id, cert.courseTitle)}
                    className="flex-1"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>

                <Link href={`/courses/${cert.courseSlug}`} className="block mt-3">
                  <Button variant="ghost" size="sm" className="w-full">
                    View Course
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : certificates.length === 0 ? (
        <div className="text-center py-16 border rounded-lg">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Award className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No certificates yet</h3>
            <p className="text-muted-foreground mb-6">
              Complete courses to earn verified certificates
            </p>
            <Link href="/dashboard/courses">
              <Button>View My Courses</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border rounded-lg">
          <p className="text-muted-foreground text-lg mb-4">No certificates match your search</p>
          <Button onClick={() => setSearchQuery("")} variant="outline">
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
}
