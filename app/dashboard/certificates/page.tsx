"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Download, Share2, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/common/empty-state";
import { toast } from "sonner";
import { APP_URL } from "@/constants";

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
    navigator.clipboard.writeText(`${APP_URL}/certificates/${certificateId}`);
    toast.success("Certificate link copied to clipboard");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-lg font-extrabold text-ink-900">Your Certificates</h1>
        <p className="mt-1 text-sm text-ink-500">
          {certificates.length} verified certificates earned
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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {filteredCertificates.map((cert) => (
            <Card key={cert.id} className="overflow-hidden">
              <div className="relative flex h-36 items-center justify-center bg-brand-700 p-5">
                <Award size={40} className="text-amber-accent" />
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
              </div>
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                    Certificate of Completion
                  </p>
                  <Badge variant="success">Verified</Badge>
                </div>
                <h3 className="mt-1 font-bold text-ink-900">{cert.courseTitle}</h3>
                <p className="mt-1 text-sm text-ink-500">
                  Instructor: {cert.instructor}
                </p>

                <div className="mt-3 space-y-1.5 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-ink-500">Issued</span>
                    <span className="font-medium text-ink-800">
                      {new Date(cert.completedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-500">Certificate No.</span>
                    <span className="font-mono text-xs text-ink-700">{cert.certificateNumber}</span>
                  </div>
                  {cert.validUntil && (
                    <div className="flex items-center justify-between">
                      <span className="text-ink-500">Valid Until</span>
                      <span className="font-medium text-ink-800">
                        {new Date(cert.validUntil).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleDownload(cert.id, cert.courseTitle)}
                    className="w-full"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleShare(cert.id, cert.courseTitle)}
                    className="w-full"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    Share
                  </Button>
                </div>

                <Link
                  href={`/courses/${cert.courseSlug}`}
                  className="mt-3 flex items-center justify-center rounded-xl bg-brand-50 py-2 text-sm font-bold text-brand-700 hover:bg-brand-100"
                >
                  View Course
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : certificates.length === 0 ? (
        <EmptyState
          icon={Award}
          title="No certificates yet"
          description="Complete courses to earn verified certificates"
          action={
            <Link href="/dashboard/courses">
              <Button>View My Courses</Button>
            </Link>
          }
        />
      ) : (
        <EmptyState
          icon={Search}
          title="No certificates match your search"
          action={
            <Button onClick={() => setSearchQuery("")} variant="outline">
              Clear Search
            </Button>
          }
        />
      )}
    </div>
  );
}
