const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const indexPath = path.join(__dirname, 'index.html');
  const workExpPath = path.join(__dirname, 'workExperienceForMicrosoftApplication.html');

  let indexHtml = fs.readFileSync(indexPath, 'utf8');
  const workExpHtml = fs.readFileSync(workExpPath, 'utf8');

  indexHtml = indexHtml.replace(
    '<div id="work-experience-container"></div>',
    `<div id="work-experience-container">${workExpHtml}</div>`
  );
  // Load local HTML file
  const filePath = path.resolve(__dirname, 'temp.html');
  fs.writeFileSync(filePath, indexHtml);
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });

  // Generate PDF
  await page.pdf({
    path: 'Rushikesh_Ghosalkar_Resume.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      right: '30px',
      bottom: '20px',
      left: '30px',
    },
  });

  await browser.close();
  console.log('✅ PDF generated successfully!');
})();
