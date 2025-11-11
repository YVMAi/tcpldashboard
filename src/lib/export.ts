import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export const exportToPDF = () => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(16);
  doc.text('TCPL Executive Summary FY26', 14, 15);
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString('en-IN')}`, 14, 22);
  
  let yPosition = 30;
  
  // Summary Cards
  doc.setFontSize(12);
  doc.text('Summary Metrics', 14, yPosition);
  yPosition += 8;
  
  autoTable(doc, {
    startY: yPosition,
    head: [['Metric', 'Value']],
    body: [
      ['Total Revenue', '₹950Cr'],
      ['Total Manpower', '45'],
      ['Active Projects', '31'],
      ['Compliance Score', '92%']
    ],
    theme: 'grid',
    styles: { fontSize: 9 },
    headStyles: { fillColor: [13, 27, 42] }
  });
  
  yPosition = (doc as any).lastAutoTable.finalY + 10;
  
  // AMS & O&M Section
  doc.setFontSize(12);
  doc.text('AMS & O&M - Contract Performance', 14, yPosition);
  yPosition += 8;
  
  autoTable(doc, {
    startY: yPosition,
    head: [['Client', 'Type', 'Plants', 'Capacity (MW)', 'Expected (₹Cr)', 'Actual (₹Cr)', 'Variance %', 'Status']],
    body: [
      ['Client A', 'AMS', '8', '250', '₹2.45Cr', '₹2.68Cr', '+9.40%', 'On Track'],
      ['Client C', 'AMS', '12', '380', '₹3.20Cr', '₹3.35Cr', '+4.70%', 'On Track'],
      ['Client B', 'O&M', '5', '180', '₹1.80Cr', '₹1.65Cr', '-8.30%', 'Behind'],
      ['Client D', 'O&M', '6', '220', '₹1.95Cr', '₹1.82Cr', '-6.70%', 'Behind']
    ],
    theme: 'grid',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [13, 27, 42] }
  });
  
  // Add new page for more sections
  doc.addPage();
  yPosition = 20;
  
  doc.setFontSize(12);
  doc.text('AMS & O&M - Manpower Breakdown', 14, yPosition);
  yPosition += 8;
  
  autoTable(doc, {
    startY: yPosition,
    head: [['Client', 'Type', 'Shared', 'Dedicated', 'Total', 'Manpower per MW']],
    body: [
      ['Client A', 'AMS', '5', '7', '12', '0.05'],
      ['Client C', 'AMS', '6', '9', '15', '0.04'],
      ['Client B', 'O&M', '3', '5', '8', '0.04'],
      ['Client D', 'O&M', '4', '6', '10', '0.05']
    ],
    theme: 'grid',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [13, 27, 42] }
  });
  
  // Save the PDF
  doc.save('TCPL_Executive_Summary_FY26.pdf');
};

export const exportToExcel = () => {
  const wb = XLSX.utils.book_new();
  
  // Summary Sheet
  const summaryData = [
    ['TCPL Executive Summary FY26'],
    ['Generated on:', new Date().toLocaleString('en-IN')],
    [],
    ['Metric', 'Value'],
    ['Total Revenue', '₹950Cr'],
    ['Total Manpower', '45'],
    ['Active Projects', '31'],
    ['Compliance Score', '92%']
  ];
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');
  
  // AMS & O&M - Contract Performance
  const amsData = [
    ['AMS & O&M - Contract Performance'],
    [],
    ['Client', 'Type', 'Plants', 'Capacity (MW)', 'Expected (₹Cr)', 'Actual (₹Cr)', 'Variance %', 'Status'],
    ['Client A', 'AMS', 8, 250, 2.45, 2.68, 9.4, 'On Track'],
    ['Client C', 'AMS', 12, 380, 3.20, 3.35, 4.7, 'On Track'],
    ['Client B', 'O&M', 5, 180, 1.80, 1.65, -8.3, 'Behind'],
    ['Client D', 'O&M', 6, 220, 1.95, 1.82, -6.7, 'Behind']
  ];
  const amsSheet = XLSX.utils.aoa_to_sheet(amsData);
  XLSX.utils.book_append_sheet(wb, amsSheet, 'AMS & O&M');
  
  // AMS & O&M - Manpower Breakdown
  const manpowerData = [
    ['Manpower Breakdown'],
    [],
    ['Client', 'Type', 'Shared', 'Dedicated', 'Total', 'Manpower per MW'],
    ['Client A', 'AMS', 5, 7, 12, 0.05],
    ['Client C', 'AMS', 6, 9, 15, 0.04],
    ['Client B', 'O&M', 3, 5, 8, 0.04],
    ['Client D', 'O&M', 4, 6, 10, 0.05]
  ];
  const manpowerSheet = XLSX.utils.aoa_to_sheet(manpowerData);
  XLSX.utils.book_append_sheet(wb, manpowerSheet, 'Manpower');
  
  // Engineering & Advisory
  const engineeringData = [
    ['Engineering & Advisory Services'],
    [],
    ['Client', 'Mandate Type', 'Status', 'Manpower', 'Expected (₹Cr)', 'Actual (₹Cr)'],
    ['Client X', 'Engineering', 'Active', 8, 1.20, 1.35],
    ['Client Y', 'Advisory', 'Active', 5, 0.80, 0.85],
    ['Client Z', 'Engineering', 'Completed', 6, 0.95, 1.00]
  ];
  const engineeringSheet = XLSX.utils.aoa_to_sheet(engineeringData);
  XLSX.utils.book_append_sheet(wb, engineeringSheet, 'Engineering & Advisory');
  
  // SaaS Products
  const saasData = [
    ['SaaS Products'],
    [],
    ['Product', 'AMS GWp', 'AMS Clients', 'SaaS GWp', 'SaaS Clients', 'Expected (₹Cr)', 'Actual (₹Cr)', 'Variance %'],
    ['TruGreen Core', 450, 'Client A, B, C', 520, 'Client D, E', 0.45, 0.52, 15.56],
    ['Assure', 380, 'Client F, G', 420, 'Client H', 0.38, 0.35, -7.89],
    ['Nexus', 520, 'Client I, J, K', 580, 'Client L, M', 0.52, 0.58, 11.54],
    ['Flow', 280, 'Client N', 310, 'Client O, P', 0.28, 0.31, 10.71],
    ['Flow Lite', 220, 'Client Q, R', 260, 'Client S', 0.22, 0.24, 9.09],
    ['Pulse', 310, 'Client T', 340, 'Client U, V', 0.31, 0.34, 9.68],
    ['Horizon', 190, 'Client W, X', 220, 'Client Y', 0.19, 0.21, 10.53]
  ];
  const saasSheet = XLSX.utils.aoa_to_sheet(saasData);
  XLSX.utils.book_append_sheet(wb, saasSheet, 'SaaS Products');
  
  // Save the Excel file
  XLSX.writeFile(wb, 'TCPL_Executive_Summary_FY26.xlsx');
};
