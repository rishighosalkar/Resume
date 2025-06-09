const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Load local HTML file
  const filePath = path.resolve(__dirname, 'index.html');
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
