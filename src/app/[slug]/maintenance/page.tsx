export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-center p-6">
      <div className="border border-[#C5A358]/20 p-12 bg-white/[0.01]">
        <h1 className="text-[#C5A358] text-5xl font-serif italic mb-6">Venue in Transition</h1>
        <p className="text-gray-500 uppercase tracking-[0.4em] text-[10px] max-w-xs leading-loose">
          This digital archive is currently under maintenance. 
          Please return once the gates reopen.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="w-12 h-[1px] bg-[#C5A358]"></div>
        </div>
      </div>
    </div>
  );
}