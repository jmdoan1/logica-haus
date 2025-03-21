"use client";

import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("../app/components/PDFViewer"), {
  ssr: false,
});

export default function HSVolunteer() {
  return <PdfViewer pdf="/assets/projects/homesight/Volunteer-Agreement.pdf" />;
}
