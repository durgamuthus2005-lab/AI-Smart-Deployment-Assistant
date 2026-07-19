import { jsPDF } from "jspdf";

export const exportAnalysisPDF = (analysis) => {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();

  // Title
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("AI Smart Deployment Assistant", pageWidth / 2, 20, {
    align: "center",
  });

  // Subtitle
  doc.setFontSize(14);
  doc.text("Deployment Analysis Report", pageWidth / 2, 30, {
    align: "center",
  });

  let y = 45;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Severity:", 15, y);
  doc.setFont("helvetica", "normal");
  doc.text(analysis.severity || "N/A", 45, y);

  y += 12;

  doc.setFont("helvetica", "bold");
  doc.text("Generated On:", 15, y);
  doc.setFont("helvetica", "normal");
  doc.text(new Date(analysis.createdAt).toLocaleString(), 55, y);

  y += 18;

  doc.setFont("helvetica", "bold");
  doc.text("Deployment Log", 15, y);

  y += 8;

  doc.setFont("helvetica", "normal");
  const log = doc.splitTextToSize(
    analysis.deploymentLog || "No deployment log available.",
    180
  );
  doc.text(log, 15, y);

  y += log.length * 7 + 10;

  // Add a new page if needed
  if (y > 250) {
    doc.addPage();
    y = 20;
  }

  doc.setFont("helvetica", "bold");
  doc.text("AI Analysis", 15, y);

  y += 8;

  doc.setFont("helvetica", "normal");
  const aiText = doc.splitTextToSize(
    analysis.analysis || "No AI analysis available.",
    180
  );
  doc.text(aiText, 15, y);

  doc.save(`Analysis_Report_${analysis.id}.pdf`);
};