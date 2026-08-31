const fs = require('fs');
const path = require('path');

const replacements = [
  ["Wapis", "\u0648\u0627\u067e\u0633"],
  ["Crop Doctor", "\u06a9\u0631\u0627\u067e \u0688\u0627\u06a9\u0679\u0631"],
  ["Apni fasal ki problem batayein ya photo bhejein, AI aapko ilaj bataega.", "\u0627\u067e\u0646\u06cc \u0641\u0635\u0644 \u06a9\u06cc \u0645\u0634\u06a9\u0644 \u0628\u062a\u0627\u0626\u06cc\u06ba \u06cc\u0627 \u062a\u0635\u0648\u06cc\u0631 \u0628\u06be\u06cc\u062c\u06cc\u06ba\u060c AI \u0622\u067e \u06a9\u0648 \u0639\u0644\u0627\u062c \u0628\u062a\u0627\u0626\u06d2 \u06af\u0627\u06d4"],
  ["Poochein", "\u067e\u0648\u0686\u06be\u06cc\u06ba"],
  ["Sochh raha hai...", "\u0633\u0648\u0686 \u0631\u06c1\u0627 \u06c1\u06d2..."],
  ["\ud83d\udcf7 Fasal ki tasveer lagayein", "\ud83d\udcf7 \u0641\u0635\u0644 \u06a9\u06cc \u062a\u0635\u0648\u06cc\u0631 \u0644\u06af\u0627\u0626\u06cc\u06ba"],
  ["Price Oracle", "\u067e\u0631\u0627\u0626\u0633 \u0627\u0648\u0631\u06cc\u06a9\u0644"],
  ["Aaj ki mandi rates", "\u0622\u062c \u06a9\u06cc \u0645\u0646\u0688\u06cc \u0631\u06cc\u0679\u0633"],
  ["Deal Guardian", "\u068a\u06cc\u0644 \u06af\u0627\u0631\u0688\u06cc\u0646"],
  ["Fasal bechne ka mehfooz, verify-able contract banayein.", "\u0641\u0635\u0644 \u0628\u06cc\u0686\u0646\u06d2 \u06a9\u0627 \u0645\u062d\u0641\u0648\u0638 \u0627\u06cc\u06af\u0631\u06cc\u0645\u0646\u0679 \u0628\u0646\u0627\u0626\u06cc\u06ba\u06d4"],
  ["Fasal ka naam", "\u0641\u0635\u0644 \u06a9\u0627 \u0646\u0627\u0645"],
  ["Contract Banayein", "\u0627\u06cc\u06af\u0631\u06cc\u0645\u0646\u0679 \u0628\u0646\u0627\u0626\u06cc\u06ba"],
  ["Weather Alert", "\u0645\u0648\u0633\u0645 \u0627\u0644\u0631\u0679"],
  ["Mausam dekh kar fasal ki hifazat ke mashware payein.", "\u0645\u0648\u0633\u0645 \u062f\u06cc\u06a9\u06be \u06a9\u0631 \u0641\u0635\u0644 \u06a9\u06cc \u062d\u0641\u0627\u0638\u062a \u06a9\u06d2 \u0645\u0634\u0648\u0631\u06d2 \u067e\u0627\u0626\u06cc\u06ba\u06d4"],
  ["Apna shehar chunein", "\u0627\u067e\u0646\u0627 \u0634\u06c1\u0631 \u0686\u0646\u06cc\u06ba"],
  ["Mausam Dekhein", "\u0645\u0648\u0633\u0645 \u062f\u06cc\u06a9\u06be\u06cc\u06ba"],
  ["Soil Advisor", "\u0645\u0679\u06cc \u06a9\u0627 \u0645\u0634\u06cc\u0631"],
  ["Apni mitti aur fasal batayein, khaad aur paani ke mashware payein.", "\u0627\u067e\u0646\u06cc \u0645\u0679\u06cc \u0627\u0648\u0631 \u0641\u0635\u0644 \u0628\u062a\u0627\u0626\u06cc\u06ba\u060c \u062e\u0627\u062f \u0627\u0648\u0631 \u067e\u0627\u0646\u06cc \u06a9\u06d2 \u0645\u0634\u0648\u0631\u06d2 \u067e\u0627\u0626\u06cc\u06ba\u06d4"],
  ["Mitti ki qisam", "\u0645\u0679\u06cc \u06a9\u06cc \u0642\u0633\u0645"],
  ["Mashware Lein", "\u0645\u0634\u0648\u0631\u06c1 \u0644\u06cc\u06ba"],
  ["Voice Assistant", "\u0622\u0648\u0627\u0632\u06cc \u0627\u0633\u0633\u0679\u0646\u0679"],
  ["Bolein apni fasal ki problem, AI aawaz mein jawab dega.", "\u0628\u0648\u0644\u06cc\u06ba \u0627\u067e\u0646\u06cc \u0641\u0635\u0644 \u06a9\u06cc \u067e\u0631\u0627\u0628\u0644\u0645\u060c AI \u0622\u0648\u0627\u0632 \u0645\u06cc\u06ba \u062c\u0648\u0627\u0628 \u062f\u06d2 \u06af\u0627\u06d4"],
  ["Mic dabayein aur bolein", "\u0645\u0627\u0626\u06a9 \u062f\u0628\u0627\u0626\u06cc\u06ba \u0627\u0648\u0631 \u0628\u0648\u0644\u06cc\u06ba"],
];

const pages = [
  'app/crop-doctor/page.tsx',
  'app/price-oracle/page.tsx',
  'app/deal-guardian/page.tsx',
  'app/weather-alert/page.tsx',
  'app/soil-advisor/page.tsx',
  'app/voice-assistant/page.tsx',
];

pages.forEach((p) => {
  const fp = path.join(__dirname, p);
  if (!fs.existsSync(fp)) { console.log('SKIP: ' + p); return; }
  let content = fs.readFileSync(fp, 'utf8');
  replacements.forEach(([en, ur]) => {
    content = content.split(en).join(ur);
  });
  content = content.replace(/(<div className="min-h-screen[^"]*")/, '$1 dir="rtl"');
  fs.writeFileSync(fp, content, 'utf8');
  console.log('DONE: ' + p);
});
console.log('All finished!');