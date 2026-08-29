import Link from "next/link";

const features = [
  { href: "/crop-doctor", name: "Crop Doctor", desc: "Fasal ki photo se bimari ki tashkhees aur ilaj.", mark: "🌾" },
  { href: "/price-oracle", name: "Price Oracle", desc: "Mandi ka sahi rate, aarti ke ghalat daam se bachao.", mark: "⚖" },
  { href: "/deal-guardian", name: "Deal Guardian", desc: "Mehfooz, verify-able sale contracts.", mark: "✎" },
  { href: "/weather-alert", name: "Weather Alert", desc: "Mausam dekh kar fasal ki hifazat ke mashware.", mark: "☁" },
  { href: "/soil-advisor", name: "Soil Advisor", desc: "Mitti aur khaad ke mashware, behtareen paidawar ke liye.", mark: "◆" },
  { href: "/voice-assistant", name: "Voice Assistant", desc: "Bolein apni problem, AI aawaz mein jawab dega.", mark: "◐" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F4EDE0] text-[#2A2118]">
      <header className="relative flex items-center justify-between px-8 sm:px-14 py-7 max-w-6xl mx-auto">
        <span className="text-2xl tracking-tight" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
          Zamindar<span className="text-[#B5622F] italic">AI</span>
        </span>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm text-[#5C4A38] hover:text-[#2A2118] transition-colors">Login</Link>
          <Link href="/signup" className="text-sm bg-[#2A2118] text-[#F4EDE0] px-5 py-2.5 rounded-sm font-medium hover:bg-[#3D2817] transition-colors">Signup</Link>
        </div>
      </header>

      <main className="relative max-w-5xl mx-auto px-8 sm:px-14 pt-16 pb-28">
        <p className="text-xs tracking-[0.25em] uppercase text-[#B5622F] font-semibold mb-6">Kisan ka apna sathi</p>
        <h1 className="text-[2.75rem] sm:text-7xl leading-[1.05] tracking-tight max-w-3xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
          Aapki fasal.<br /><span className="text-[#B5622F]">Aapka daam.</span>
        </h1>
        <p className="mt-8 text-lg text-[#5C4A38] max-w-xl leading-relaxed">
          ZamindarAI Pakistan ke kisanon ko sahi mandi rate, fasal ki bimari ki tashkhees, aur mehfooz contracts deta hai bina kisi beechon-beech wale ke.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a href="/crop-doctor" className="bg-[#2A2118] text-[#F4EDE0] font-medium px-8 py-4 rounded-sm hover:bg-[#3D2817] transition-colors text-center">Shuru Karein</a>
          <button className="border border-[#2A2118]/25 px-8 py-4 rounded-sm hover:border-[#2A2118] transition-colors text-[#3D2817]">Mazeed Jaanein</button>
        </div>
      </main>

      <section className="relative border-t border-[#2A2118]/10">
        <div className="max-w-6xl mx-auto px-8 sm:px-14 py-20">
          <p className="text-xs tracking-[0.25em] uppercase text-[#B5622F] font-semibold mb-3">Char khet, aik chhat</p>
          <h2 className="text-3xl sm:text-4xl mb-14 max-w-lg" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            Har mausam, har masla ek jagah.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2A2118]/10 border border-[#2A2118]/10">
            {features.map((f) => (
              <a key={f.href} href={f.href} className="group bg-[#F4EDE0] hover:bg-[#EDE3D0] transition-colors p-8 flex flex-col gap-4">
                <span className="text-2xl text-[#B5622F]">{f.mark}</span>
                <div>
                  <p className="font-semibold text-lg mb-1.5 group-hover:text-[#B5622F] transition-colors">{f.name}</p>
                  <p className="text-sm text-[#5C4A38] leading-relaxed">{f.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative border-t border-[#2A2118]/10 py-10">
        <p className="text-center text-xs text-[#5C4A38]/70 tracking-wide">ZamindarAI Pakistan ke kisanon ke liye, kisanon ke sath.</p>
      </footer>
    </div>
  );
}