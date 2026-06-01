import { jsPDF } from 'jspdf';
import { BabyProfile } from '../types';

// Palette Colors in RGB
const PALETTE = {
  sageGreen: [203, 213, 192] as [number, number, number],
  babyPink: [245, 214, 214] as [number, number, number],
  skyBlue: [214, 228, 245] as [number, number, number],
  tanBeige: [224, 204, 190] as [number, number, number],
  creamBg: [249, 247, 242] as [number, number, number],
  darkText: [67, 62, 58] as [number, number, number],
  subtleLine: [225, 223, 218] as [number, number, number],
};

export function generateBabyDiaryPDF(profile: BabyProfile): Uint8Array {
  // A4 size: 210 x 297 mm
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const babyName = profile.name.trim() || 'My Little Angel';
  const parentName = profile.parentName.trim() || 'Loving Parents';
  const displayDOB = profile.birthDate || profile.expectedDate || 'Soon to Arrive';
  const genderLabel = profile.gender === 'boy' ? 'Baby Boy' : profile.gender === 'girl' ? 'Baby Girl' : 'Baby';

  // Helper function to draw borders & headers
  const drawPageShell = (pageNum: number, title: string, subtitle: string, accentColor: [number, number, number] = PALETTE.sageGreen) => {
    // Fill page background
    doc.setFillColor(PALETTE.creamBg[0], PALETTE.creamBg[1], PALETTE.creamBg[2]);
    doc.rect(0, 0, 210, 297, 'F');

    // Soft border
    doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.setLineWidth(1.2);
    doc.roundedRect(8, 8, 194, 281, 4, 4, 'D');

    // Secondary subtle inner border
    doc.setDrawColor(PALETTE.subtleLine[0], PALETTE.subtleLine[1], PALETTE.subtleLine[2]);
    doc.setLineWidth(0.3);
    doc.roundedRect(10, 10, 190, 277, 3, 3, 'D');

    // Title Block
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(PALETTE.darkText[0], PALETTE.darkText[1], PALETTE.darkText[2]);
    doc.text(title, 105, 24, { align: 'center' });

    // Subtitle
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(PALETTE.darkText[0] + 40, PALETTE.darkText[1] + 40, PALETTE.darkText[2] + 40);
    doc.text(subtitle, 105, 30, { align: 'center' });

    // Dividers
    doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.setLineWidth(0.6);
    doc.line(20, 34, 190, 34);

    // Footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(PALETTE.darkText[0] + 60, PALETTE.darkText[1] + 60, PALETTE.darkText[2] + 60);
    doc.text(`Baby Care Diary   |   Page ${pageNum}`, 20, 283);
    doc.text('Designed for Sweet Milestones & Memories', 190, 283, { align: 'right' });
  };

  // ==========================================
  // PAGE 1: COVER PAGE (Elegantly Decorated)
  // ==========================================
  // Fill cover background
  doc.setFillColor(PALETTE.creamBg[0], PALETTE.creamBg[1], PALETTE.creamBg[2]);
  doc.rect(0, 0, 210, 297, 'F');

  // Multi-layered beautiful pastel borders
  doc.setDrawColor(PALETTE.babyPink[0], PALETTE.babyPink[1], PALETTE.babyPink[2]);
  doc.setLineWidth(2.5);
  doc.roundedRect(6, 6, 198, 285, 6, 6, 'D');

  doc.setDrawColor(PALETTE.sageGreen[0], PALETTE.sageGreen[1], PALETTE.sageGreen[2]);
  doc.setLineWidth(0.8);
  doc.roundedRect(9, 9, 192, 279, 5, 5, 'D');

  // Decorative illustrations using circles and geometries (Teddy Bear shape or Rainbow)
  // Let's draw a beautiful pastel sun/rainbow in the center
  const centerX = 105;
  const centerY = 135;

  // Draw Boho Concentric Arches by overdrawing filled circles (a solid vector technique)
  // Arch 1: Pink
  doc.setFillColor(PALETTE.babyPink[0], PALETTE.babyPink[1], PALETTE.babyPink[2]);
  doc.circle(centerX, centerY, 30, 'F');
  doc.setFillColor(PALETTE.creamBg[0], PALETTE.creamBg[1], PALETTE.creamBg[2]);
  doc.circle(centerX, centerY, 24, 'F');

  // Arch 2: Sage Green
  doc.setFillColor(PALETTE.sageGreen[0], PALETTE.sageGreen[1], PALETTE.sageGreen[2]);
  doc.circle(centerX, centerY, 22, 'F');
  doc.setFillColor(PALETTE.creamBg[0], PALETTE.creamBg[1], PALETTE.creamBg[2]);
  doc.circle(centerX, centerY, 16, 'F');

  // Arch 3: Sky Blue
  doc.setFillColor(PALETTE.skyBlue[0], PALETTE.skyBlue[1], PALETTE.skyBlue[2]);
  doc.circle(centerX, centerY, 14, 'F');
  doc.setFillColor(PALETTE.creamBg[0], PALETTE.creamBg[1], PALETTE.creamBg[2]);
  doc.circle(centerX, centerY, 8, 'F');

  // Cover the bottom half with a cream rectangle to turn the rings into arches
  doc.setFillColor(PALETTE.creamBg[0], PALETTE.creamBg[1], PALETTE.creamBg[2]);
  doc.rect(centerX - 35, centerY, 70, 35, 'F');

  // Cute Little Cloud pillows at the base of rainbow arches
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(PALETTE.tanBeige[0], PALETTE.tanBeige[1], PALETTE.tanBeige[2]);
  doc.setLineWidth(0.5);
  // Left cloud
  doc.circle(centerX - 24, centerY, 8, 'FD');
  doc.circle(centerX - 18, centerY - 3, 7, 'FD');
  doc.circle(centerX - 12, centerY, 6, 'FD');
  // Right cloud
  doc.circle(centerX + 12, centerY, 6, 'FD');
  doc.circle(centerX + 18, centerY - 3, 7, 'FD');
  doc.circle(centerX + 24, centerY, 8, 'FD');

  // Header texts on Cover
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(PALETTE.darkText[0] + 30, PALETTE.darkText[1] + 30, PALETTE.darkText[2] + 30);
  doc.text('THE PRESET & PRINTABLE DIGITAL JOURNAL', 105, 55, { align: 'center', charSpace: 1.5 });

  doc.setFontSize(40);
  doc.setTextColor(PALETTE.darkText[0], PALETTE.darkText[1], PALETTE.darkText[2]);
  doc.text('Baby Care', 105, 78, { align: 'center' });
  doc.text('Diary', 105, 96, { align: 'center' });

  doc.setFontSize(11);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(PALETTE.sageGreen[0] - 20, PALETTE.sageGreen[1] - 20, PALETTE.sageGreen[2] - 20);
  doc.text('COMPLETE PLANNER & MEMORY JOURNAL (0 - 5 YEARS)', 105, 108, { align: 'center' });

  // Custom Personalization Box below rainbow
  doc.setFillColor(248, 244, 238);
  doc.setDrawColor(PALETTE.tanBeige[0], PALETTE.tanBeige[1], PALETTE.tanBeige[2]);
  doc.setLineWidth(0.4);
  doc.roundedRect(40, 185, 130, 48, 3, 3, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(PALETTE.darkText[0] + 50, PALETTE.darkText[1] + 50, PALETTE.darkText[2] + 50);
  doc.text('PREPARED WITH LOVE FOR:', 105, 194, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  let nameSize = 18;
  if (babyName.length > 25) {
    nameSize = 12;
  } else if (babyName.length > 16) {
    nameSize = 14;
  }
  doc.setFontSize(nameSize);
  doc.setTextColor(PALETTE.darkText[0], PALETTE.darkText[1], PALETTE.darkText[2]);
  doc.text(babyName, 105, 206, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(PALETTE.darkText[0] + 40, PALETTE.darkText[1] + 40, PALETTE.darkText[2] + 40);
  doc.text(`${genderLabel}  •  Arrival/Due: ${displayDOB}`, 105, 214, { align: 'center' });
  doc.text(`Parent: ${parentName}`, 105, 222, { align: 'center' });

  // Cute footer tag
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.text('“Every tiny step is a giant milestone.”', 105, 255, { align: 'center' });

  // ==========================================
  // PAGE 2: BABY PROFILE & INFORMATION
  // ==========================================
  doc.addPage();
  drawPageShell(2, 'Baby Profile & Identity', 'General Information', PALETTE.babyPink);

  // Outer Profile Grid Box
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(20, 42, 170, 75, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(PALETTE.darkText[0], PALETTE.darkText[1], PALETTE.darkText[2]);

  const items = [
    { label: 'Baby Name:', val: babyName },
    { label: 'Mother/Parent Name:', val: parentName },
    { label: 'Date of Birth:', val: displayDOB },
    { label: 'Gender / Type:', val: genderLabel },
    { label: 'Birth Weight:', val: profile.birthWeight || '7.5 lbs' },
    { label: 'Birth Height / Length:', val: profile.birthHeight || '21 inches' },
  ];

  let yOffset = 52;
  items.forEach((item) => {
    doc.setFont('helvetica', 'bold');
    doc.text(item.label, 26, yOffset);
    doc.setFont('helvetica', 'normal');
    doc.text(item.val, 72, yOffset);
    yOffset += 10;
  });

  // Milestone checklists
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('Important First Milestones Tracker', 20, 132);
  doc.setLineWidth(0.3);
  doc.setDrawColor(PALETTE.babyPink[0], PALETTE.babyPink[1], PALETTE.babyPink[2]);
  doc.line(20, 135, 190, 135);

  const milestones = [
    { name: 'First Smiling response to parent', age: 'Estimated 2 Months' },
    { name: 'Supporting head & chest elevation', age: 'Estimated 3 Months' },
    { name: 'First adorable belly laugh', age: 'Estimated 4 Months' },
    { name: 'Rolling over from back to tummy', age: 'Estimated 5 Months' },
    { name: 'Sitting independently without support', age: 'Estimated 6-8 Months' },
    { name: 'Crawling across the room explorer', age: 'Estimated 9 Months' },
    { name: 'Saying first sweet word (Mama/Dada)', age: 'Estimated 10-12 Months' },
    { name: 'Taking first independent toddler steps', age: 'Estimated 12 Months' },
  ];

  let mY = 145;
  milestones.forEach((m) => {
    // Checkbox square
    doc.setLineWidth(0.4);
    doc.setDrawColor(PALETTE.darkText[0]);
    doc.rect(22, mY - 3.5, 4, 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(PALETTE.darkText[0]);
    doc.text(m.name, 30, mY);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(PALETTE.darkText[0] + 60);
    doc.text(m.age, 190, mY, { align: 'right' });

    mY += 10;
  });

  // Notes Box at the bottom of Page 2
  doc.setFillColor(250, 248, 244);
  doc.roundedRect(20, 235, 170, 30, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(PALETTE.darkText[0]);
  doc.text('Special Delivery Notes / Wishes:', 25, 241);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(PALETTE.subtleLine[0], PALETTE.subtleLine[1], PALETTE.subtleLine[2]);
  doc.text('__________________________________________________________________________________________', 25, 249);
  doc.text('__________________________________________________________________________________________', 25, 258);

  // ==========================================
  // PAGE 3: DAILY BABY FEEDING TRACKER
  // ==========================================
  doc.addPage();
  drawPageShell(3, 'Daily Feeding Tracker', 'Daily Routine & Nutrition Log', PALETTE.skyBlue);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(PALETTE.darkText[0] + 20);
  doc.text('Date: ____________________', 20, 43);
  doc.text('Overall Feeding Target: _______________ oz/ml', 110, 43);

  // Table setup
  const headers = ['Time', 'Breast (L/R)', 'Formula (oz)', 'Solid Food', 'Diaper (W/D)', 'Notes'];
  const colWidths = [18, 30, 24, 34, 26, 38];
  const tableXStart = 20;
  const tableYStart = 51;
  const rowHeight = 12;

  // Draw Header Row
  doc.setFillColor(PALETTE.skyBlue[0], PALETTE.skyBlue[1], PALETTE.skyBlue[2]);
  doc.rect(tableXStart, tableYStart, 170, rowHeight, 'F');
  doc.setDrawColor(PALETTE.darkText[0]);
  doc.setLineWidth(0.4);
  doc.rect(tableXStart, tableYStart, 170, rowHeight, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(PALETTE.darkText[0]);

  let currentX = tableXStart;
  headers.forEach((h, idx) => {
    doc.text(h, currentX + colWidths[idx] / 2, tableYStart + 7.5, { align: 'center' });
    if (idx < headers.length - 1) {
      currentX += colWidths[idx];
      doc.line(currentX, tableYStart, currentX, tableYStart + rowHeight);
    }
  });

  // Draw 12 Blank Rows for custom logging
  let currentY = tableYStart + rowHeight;
  for (let i = 0; i < 12; i++) {
    // Alternating rows
    if (i % 2 === 1) {
      doc.setFillColor(245, 248, 250);
      doc.rect(tableXStart, currentY, 170, rowHeight, 'F');
    }
    doc.setDrawColor(PALETTE.subtleLine[0], PALETTE.subtleLine[1], PALETTE.subtleLine[2]);
    doc.rect(tableXStart, currentY, 170, rowHeight, 'D');

    // Drawer Vertical dividers
    let colX = tableXStart;
    for (let j = 0; j < colWidths.length - 1; j++) {
      colX += colWidths[j];
      doc.line(colX, currentY, colX, currentY + rowHeight);
    }
    currentY += rowHeight;
  }

  // Summary box at the bottom of Table
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(20, 210, 170, 52, 2, 2, 'FD');
  doc.setDrawColor(PALETTE.skyBlue[0], PALETTE.skyBlue[1], PALETTE.skyBlue[2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(20, 210, 170, 52, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(PALETTE.darkText[0]);
  doc.text('Daily Feeding Summary & Observations:', 24, 218);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(PALETTE.darkText[0] + 55);
  doc.text('Total Wet Diapers: _________   |   Total Dirty Diapers: _________   |   Overall Quality: [  ] Happy  [  ] Fuss  [  ] Gassy', 24, 227);
  doc.text('Medicines/Vitamins Check: [  ] Vitamin D Drops   [  ] Prescription   Time Given: _________________', 24, 237);
  doc.text('Notes / Sleep Sync Patterns: ____________________________________________________________________________', 24, 247);
  doc.text('____________________________________________________________________________________________________', 24, 255);

  // ==========================================
  // PAGE 4: SLEEP & DIAPER LOGS
  // ==========================================
  doc.addPage();
  drawPageShell(4, 'Daily Sleep & Diaper Logs', 'Schedules & Comfort Logbook', PALETTE.tanBeige);

  // Split section 1: Sleep Tracker (Top Half)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(PALETTE.darkText[0]);
  doc.text('1. Sleep Session Tracker (Naps & Overnight)', 20, 43);

  // Draw Sleep Grid
  const sleepHeaders = ['Time Began', 'Time Woke Up', 'Nap Duration', 'Sleep Quality', 'Wake Up Mood'];
  const sleepWidths = [30, 30, 30, 40, 40];
  const sX = 20;
  const sY = 51;
  const sRowH = 10;

  doc.setFillColor(PALETTE.tanBeige[0], PALETTE.tanBeige[1], PALETTE.tanBeige[2]);
  doc.rect(sX, sY, 170, sRowH, 'F');
  doc.setDrawColor(PALETTE.darkText[0]);
  doc.rect(sX, sY, 170, sRowH, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  let curX = sX;
  sleepHeaders.forEach((h, idx) => {
    doc.text(h, curX + sleepWidths[idx] / 2, sY + 6, { align: 'center' });
    if (idx < sleepHeaders.length - 1) {
      curX += sleepWidths[idx];
      doc.line(curX, sY, curX, sY + sRowH);
    }
  });

  let curY = sY + sRowH;
  for (let i = 0; i < 6; i++) {
    doc.rect(sX, curY, 170, sRowH, 'D');
    let divisionX = sX;
    for (let j = 0; j < sleepWidths.length - 1; j++) {
      divisionX += sleepWidths[j];
      doc.line(divisionX, curY, divisionX, curY + sRowH);
    }
    curY += sRowH;
  }

  // Split section 2: Diaper Log (Bottom Half)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(PALETTE.darkText[0]);
  doc.text('2. Diaper Change log & Health Indicators', 20, 135);

  const diaperHeaders = ['Time', 'Wet?', 'Dirty?', 'Consistency', 'Stool Color', 'Care / Creams'];
  const diaperWidths = [22, 22, 22, 34, 34, 36];
  const dX = 20;
  const dY = 143;
  const dRowH = 10;

  doc.setFillColor(PALETTE.babyPink[0], PALETTE.babyPink[1], PALETTE.babyPink[2]);
  doc.rect(dX, dY, 170, dRowH, 'F');
  doc.setDrawColor(PALETTE.darkText[0]);
  doc.rect(dX, dY, 170, dRowH, 'D');

  doc.setFont('helvetica', 'bold');
  curX = dX;
  diaperHeaders.forEach((h, idx) => {
    doc.text(h, curX + diaperWidths[idx] / 2, dY + 6, { align: 'center' });
    if (idx < diaperHeaders.length - 1) {
      curX += diaperWidths[idx];
      doc.line(curX, dY, curX, dY + dRowH);
    }
  });

  curY = dY + dRowH;
  for (let i = 0; i < 7; i++) {
    doc.rect(dX, curY, 170, dRowH, 'D');
    let divisionX = dX;
    for (let j = 0; j < diaperWidths.length - 1; j++) {
      divisionX += diaperWidths[j];
      doc.line(divisionX, curY, divisionX, curY + dRowH);
    }
    curY += dRowH;
  }

  // Tummy Time Log box right at bottom
  doc.setFillColor(250, 248, 244);
  doc.roundedRect(20, 236, 170, 28, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(PALETTE.darkText[0]);
  doc.text('3. Daily Tummy Time Tracker (Aim for 3-4 sessions totaling 20-30 min)', 25, 242);
  doc.setFont('helvetica', 'normal');
  doc.text('Session 1: _______ min   |   Session 2: _______ min   |   Session 3: _______ min   |   Session 4: _______ min', 25, 250);
  doc.text('Baby Reaction: [  ] Enjoyed   [  ] Tolerated   [  ] Disliked / Cried   Milestone achievements: __________________', 25, 258);

  // ==========================================
  // PAGE 5: VACCINATION & HEALTH RECORDS
  // ==========================================
  doc.addPage();
  drawPageShell(5, 'Vaccination & Wellness Record', 'Comprehensive Health Logging', PALETTE.sageGreen);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Immunization Log: First 24 Months Scheduled Shots', 20, 43);

  // Table structure
  const vaccHeaders = ['Shot Name', 'Recommended Age', 'Target Disease', 'Date Given', 'Batch / Clinic', 'Wellness Notes'];
  const vaccWidths = [30, 28, 32, 26, 26, 28];
  const vX = 20;
  const vY = 51;
  const vRowH = 12;

  doc.setFillColor(PALETTE.sageGreen[0], PALETTE.sageGreen[1], PALETTE.sageGreen[2]);
  doc.rect(vX, vY, 170, vRowH, 'F');
  doc.setDrawColor(PALETTE.darkText[0]);
  doc.rect(vX, vY, 170, vRowH, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  curX = vX;
  vaccHeaders.forEach((h, idx) => {
    doc.text(h, curX + vaccWidths[idx] / 2, vY + 7.5, { align: 'center' });
    if (idx < vaccHeaders.length - 1) {
      curX += vaccWidths[idx];
      doc.line(curX, vY, curX, vY + vRowH);
    }
  });

  // Recommended Vaccines
  const scheduledShots = [
    { name: 'HepB Vaccine', age: 'Birth / 2 Mos', tar: 'Liver Disease' },
    { name: 'DTaP Vaccine', age: '2, 4, 6, 15 Mos', tar: 'Whooping Cough' },
    { name: 'Hib Vaccine', age: '2, 4, 6 Mos', tar: 'Meningitis' },
    { name: 'IPV (Polio)', age: '2, 4, 6 Mos', tar: 'Polio Disease' },
    { name: 'PCV13 (Pneumo)', age: '2, 4, 6, 12 Mos', tar: 'Pneumo/Sepsis' },
    { name: 'Rotavirus RV', age: '2, 4, 6 Mos', tar: 'Sev Diarrhea' },
    { name: 'MMR Vaccine', age: '12-15 Mos', tar: 'Measles/Mumps' },
    { name: 'Varicella (Pox)', age: '12-15 Mos', tar: 'Chickenpox' },
  ];

  curY = vY + vRowH;
  for (let i = 0; i < scheduledShots.length; i++) {
    // Fill values
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(PALETTE.darkText[0]);
    doc.text(scheduledShots[i].name, vX + 2, curY + 7);
    doc.text(scheduledShots[i].age, vX + vaccWidths[0] + 2, curY + 7);
    doc.text(scheduledShots[i].tar, vX + vaccWidths[0] + vaccWidths[1] + 2, curY + 7);

    doc.rect(vX, curY, 170, vRowH, 'D');
    let divisionX = vX;
    for (let j = 0; j < vaccWidths.length - 1; j++) {
      divisionX += vaccWidths[j];
      doc.line(divisionX, curY, divisionX, curY + vRowH);
    }
    curY += vRowH;
  }

  // Doctor visit list
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Growth Checkups Log (Pediatrician Visits)', 20, 171);

  const growHeaders = ['Visit Target', 'Typical Age', 'Weight', 'Height', 'Percentiles', 'Pediatrician Sign'];
  const growWidths = [28, 24, 28, 28, 30, 32];
  const gX = 20;
  const gY = 179;
  const gRowH = 11;

  doc.setFillColor(PALETTE.skyBlue[0], PALETTE.skyBlue[1], PALETTE.skyBlue[2]);
  doc.rect(gX, gY, 170, gRowH, 'F');
  doc.setDrawColor(PALETTE.darkText[0]);
  doc.rect(gX, gY, 170, gRowH, 'D');

  doc.setFont('helvetica', 'bold');
  curX = gX;
  growHeaders.forEach((h, idx) => {
    doc.text(h, curX + growWidths[idx] / 2, gY + 7, { align: 'center' });
    if (idx < growHeaders.length - 1) {
      curX += growWidths[idx];
      doc.line(curX, gY, curX, gY + gRowH);
    }
  });

  const checkups = [
    { n: '1 Week Checkup', a: '3-5 Days Old' },
    { n: '1 Month Review', a: '1 Month' },
    { n: '2 Months Milestone', a: '2 Months' },
    { n: '4 Months Milestone', a: '4 Months' },
    { n: '6 Months Pediatric', a: '6 Months' },
    { n: '9 Months Pediatric', a: '9 Months' },
    { n: '1 Year Birthday Check', a: '12 Months' },
  ];

  curY = gY + gRowH;
  for (let i = 0; i < checkups.length; i++) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(checkups[i].n, gX + 2, curY + 7);
    doc.text(checkups[i].a, gX + growWidths[0] + 2, curY + 7);

    doc.rect(gX, curY, 170, gRowH, 'D');
    let divisionX = gX;
    for (let j = 0; j < growWidths.length - 1; j++) {
      divisionX += growWidths[j];
      doc.line(divisionX, curY, divisionX, curY + gRowH);
    }
    curY += gRowH;
  }

  // ==========================================
  // PAGE 6: BABY SHOWER PLANNING & CHECKLIST
  // ==========================================
  doc.addPage();
  drawPageShell(6, 'Baby Shower Event Planner', 'Preparation Checklist & Gift Log', PALETTE.babyPink);

  const sChecklists = [
    { c: '6 Weeks Before', i: 'Settle theme, determine budget limits, book venue & make guest draft list.' },
    { c: '4 Weeks Before', i: 'Send stylish pastel digital or printed invitations and set up baby registry.' },
    { c: '2 Weeks Before', i: 'Plan games list (e.g. Baby Bingo), arrange food catering menu & baker cake.' },
    { c: '1 Week Before', i: 'Confirm final guest RSVP counts, coordinate styling decoration & setups.' },
    { c: 'Day of Event', i: 'Hand over host tasks, display gifts corner, take photographs, enjoy the joy!' },
  ];

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('A. Master Milestone Timeline Checkpoints', 20, 43);

  let cY = 51;
  sChecklists.forEach((ch) => {
    // Checkbox box
    doc.setLineWidth(0.4);
    doc.setDrawColor(PALETTE.darkText[0]);
    doc.rect(22, cY + 1, 4, 4);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(ch.c, 30, cY + 4.5);

    doc.setFont('helvetica', 'normal');
    // Wrap text to fit
    const splitLines = doc.splitTextToSize(ch.i, 110);
    doc.text(splitLines, 72, cY + 4.5);

    cY += 12;
  });

  // Gift Tracker
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('B. Guest Gift Registry Logbook & Thank-You Tracker', 20, 121);

  const giftHeaders = ['Guest Name', 'Gift Description', 'Contact Details', 'Registry Source', 'Thank You?'];
  const giftWidths = [34, 46, 36, 28, 26];
  const gifX = 20;
  const gifY = 129;
  const gifRowH = 11;

  doc.setFillColor(PALETTE.babyPink[0], PALETTE.babyPink[1], PALETTE.babyPink[2]);
  doc.rect(gifX, gifY, 170, gifRowH, 'F');
  doc.setDrawColor(PALETTE.darkText[0]);
  doc.rect(gifX, gifY, 170, gifRowH, 'D');

  doc.setFont('helvetica', 'bold');
  curX = gifX;
  giftHeaders.forEach((h, idx) => {
    doc.text(h, curX + giftWidths[idx] / 2, gifY + 7, { align: 'center' });
    if (idx < giftHeaders.length - 1) {
      curX += giftWidths[idx];
      doc.line(curX, gifY, curX, gifY + gifRowH);
    }
  });

  curY = gifY + gifRowH;
  for (let i = 0; i < 11; i++) {
    doc.rect(gifX, curY, 170, gifRowH, 'D');
    let divisionX = gifX;
    for (let j = 0; j < giftWidths.length - 1; j++) {
      divisionX += giftWidths[j];
      doc.line(divisionX, curY, divisionX, curY + gifRowH);
    }
    curY += gifRowH;
  }

  // ==========================================
  // PAGE 7: KEEPSAKES & LETTERS TO MY BABY
  // ==========================================
  doc.addPage();
  drawPageShell(7, 'Letters To My Baby & Keepsakes', 'Precious Words of Affection', PALETTE.tanBeige);

  // Decorative vector border for letter
  doc.setDrawColor(PALETTE.tanBeige[0], PALETTE.tanBeige[1], PALETTE.tanBeige[2]);
  doc.setLineWidth(0.6);
  doc.roundedRect(18, 42, 174, 222, 2, 2, 'D');

  // Letter Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(PALETTE.darkText[0]);
  doc.text('“A Love Letter Written with Endless Joy”', 105, 52, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(PALETTE.darkText[0] + 20);

  doc.text(`Dearest ${babyName},`, 28, 64);

  const letterLines = [
    'The moment we first learned about you, our hearts were filled with a love larger than we ever imagined.',
    'We began dreaming of your soft smile, your tiny fingers, and the beautiful adventure we would share.',
    'This diary holds the maps of your smallest days: your feeding schedules, your sleepy sighs, and your first rolls.',
    'But deeper than calendars, it holds our hopes, our laughs, and our lifelong commitment to you.',
    'No matter how tall you grow, always remember that you are our perfect, cherished gift.',
    'With all of our hearts, we love you.',
  ];

  let lY = 74;
  letterLines.forEach((line) => {
    const wrappedText = doc.splitTextToSize(line, 154);
    doc.text(wrappedText, 28, lY);
    lY += (wrappedText.length * 6) + 3;
  });

  doc.setFont('helvetica', 'italic');
  doc.text('Written with all my heart & soul,', 110, 160);
  doc.setFont('helvetica', 'bold');
  doc.text(`— Your Devoted Parent, ${parentName}`, 110, 168);

  // Keepsakes and Photos Box in Bottom Half of Page 7
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(PALETTE.tanBeige[0], PALETTE.tanBeige[1], PALETTE.tanBeige[2]);
  doc.setLineWidth(0.4);
  doc.roundedRect(24, 185, 162, 70, 2, 2, 'FD');

  // Photo dotted outline
  doc.setDrawColor(PALETTE.tanBeige[0] - 20, PALETTE.tanBeige[1] - 20, PALETTE.tanBeige[2] - 20);
  doc.setLineWidth(0.3);
  doc.setLineDashPattern([2, 2], 0);
  doc.roundedRect(80, 192, 50, 50, 1, 1, 'D');
  doc.setLineDashPattern([], 0); // Reset

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(PALETTE.darkText[0] + 50);
  doc.text('Affix First Family Photo', 105, 215, { align: 'center' });
  doc.text('or Hospital Anklet Here', 105, 221, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(PALETTE.darkText[0]);
  doc.text('First Photo Memory Frame', 105, 250, { align: 'center' });

  // Output bytes
  const bytes = doc.output('arraybuffer');
  return new Uint8Array(bytes);
}
