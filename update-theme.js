const fs = require('fs');
const path = require('path');

const pagesToUpdate = [
  'app/crop-doctor/page.tsx',
  'app/price-oracle/page.tsx',
  'app/deal-guardian/page.tsx',
  'app/weather-alert/page.tsx',
  'app/soil-advisor/page.tsx',
  'app/voice-assistant/page.tsx',
];

pagesToUpdate.forEach((filePath) => {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) {
    console.log('SKIP: ' + filePath);
    return;
  }
  let content = fs.readFileSync(fullPath, 'utf8');
  content = content.replace(/className="min-h-screen bg-\[#[0-9A-Fa-f]{6}\] text-\[#[0-9A-Fa-f]{6}\]/g, 'className="min-h-screen bg-[#F4EDE0] text-[#2A2118]');
  content = content.split('#1C1510').join('#F4EDE0');
  content = content.split('#241C15').join('#EDE3D0');
  content = content.split('#3D2E20').join('#2A2118');
  content = content.split('#D4A24C').join('#B5622F');
  content = content.split('#C97C4C').join('#8B4A28');
  content = content.split('#C9B8A3').join('#5C4A38');
  content = content.split('#8A7860').join('#5C4A38');
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('FIXED: ' + filePath);
});
console.log('Done!');