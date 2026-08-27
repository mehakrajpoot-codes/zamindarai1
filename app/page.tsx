import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F1C15] text-[#F5F1E8] font-sans">
      <header className="flex items-center justify-between px-8 py-6 max-w-6xl mx-auto">
        <span className="text-lg font-semibold tracking-tight">Zamindar<span className="text-[#8FBC6A]">AI</span></span>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-[#A8B5A0] hover:text-[#F5F1E8] transition-colors">Login</Link>
          <Link href="/signup" className="text-sm bg-[#8FBC6A] text-[#0F1C15] px-4 py-2 rounded-full font-medium hover:bg-[#7DA85C] transition-colors">Signup</Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-8 pt-20 pb-32 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight">Aapki fasal.<br /><span className="text-[#8FBC6A]">Aapka daam.</span></h1>
        <p className="mt-6 text-lg text-[#A8B5A0] max-w-xl mx-auto leading-relaxed">ZamindarAI Pakistan ke kisanon ko sahi mandi rate, fasal ki bimari ki tashkhees, aur mehfooz contracts deta hai bina kisi beechon-beech wale ke.</p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/crop-doctor" className="bg-[#8FBC6A] text-[#0F1C15] font-semibold px-7 py-3 rounded-lg hover:bg-[#7DA85C] transition-colors">Shuru Karein</a>
          <button className="border border-[#2A3B2A] px-7 py-3 rounded-lg hover:bg-[#16241A] transition-colors">Mazeed Jaanein</button>
        </div>
      </main>
      <section className="border-t border-[#2A3B2A]">
        <div className="max-w-5xl mx-auto px-8 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <a href="/crop-doctor" className="block hover:opacity-80 transition-opacity">
            <p className="text-[#8FBC6A] text-sm font-medium mb-2">Crop Doctor</p>
            <p className="text-[#A8B5A0] text-sm leading-relaxed">Fasal ki photo se bimari ki tashkhees aur ilaj.</p>
          </a>
          <a href="/price-oracle" className="block hover:opacity-80 transition-opacity">
            <p className="text-[#8FBC6A] text-sm font-medium mb-2">Price Oracle</p>
            <p className="text-[#A8B5A0] text-sm leading-relaxed">Mandi ka sahi rate, aarti ke ghalat daam se bachao.</p>
          </a>
          <a href="/deal-guardian" className="block hover:opacity-80 transition-opacity">
            <p className="text-[#8FBC6A] text-sm font-medium mb-2">Deal Guardian</p>
            <p className="text-[#A8B5A0] text-sm leading-relaxed">Mehfooz, verify-able sale contracts.</p>
          </a>
          <a href="/weather-alert" className="block hover:opacity-80 transition-opacity">
            <p className="text-[#8FBC6A] text-sm font-medium mb-2">Weather Alert</p>
            <p className="text-[#A8B5A0] text-sm leading-relaxed">Mausam dekh kar fasal ki hifazat ke mashware.</p>
          </a>
        </div>
      </section>
    </div>
  );
}