'use client';

import { useState, useEffect } from 'react';
// Import your shared actions
import { fetchVenueEvents, submitInquiry, submitTableBooking } from './action'; 

interface BookingProps {
  venueId: string; 
  primaryColor: string;
  fontFamily: string;
  bgStyle: string;
  buttonStyle: string;
}

export default function DualBooking({ 
  venueId, 
  primaryColor, 
  fontFamily, 
  bgStyle, 
  buttonStyle 
}: BookingProps) {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState({ inquiry: false, table: false });
  const [success, setSuccess] = useState({ inquiry: false, table: false });

  const [inquiryData, setInquiryData] = useState({
    name: '', email: '', phone: '', event_date: '', guest_count: '', event_type: 'Wedding', message: '',
  });

  const [tableData, setTableData] = useState({
    name: '', phone: '', guest_count: '', event_id: '', table_type: 'VIP Lounge',
  });

  // --- Dynamic Styles ---
  const accentColor = { color: primaryColor };
  const accentBorder = { borderColor: primaryColor };
  const accentBg = { backgroundColor: primaryColor };
  const transparentAccentBg = { backgroundColor: `${primaryColor}1A` };

  const inputClasses = "w-full bg-transparent border-b border-white/10 py-4 text-white placeholder-gray-600 focus:outline-none transition-colors duration-500 font-light tracking-wider uppercase text-[10px]";
  const labelClasses = "absolute -top-4 left-0 text-[8px] tracking-widest uppercase";

  // --- REPLACED: Fetch Events using Server Action ---
  useEffect(() => {
    async function getEvents() {
      const data = await fetchVenueEvents(venueId);
      if (data) setEvents(data);
    }
    getEvents();
  }, [venueId]);

  // --- REPLACED: Inquiry Handler using Server Action ---
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading({ ...loading, inquiry: true });
    
    const result = await submitInquiry({ ...inquiryData, venue_id: venueId });
    
    if (result.success) {
      setSuccess({ ...success, inquiry: true });
      setInquiryData({ name: '', email: '', phone: '', event_date: '', guest_count: '', event_type: 'Wedding', message: '' });
      setTimeout(() => setSuccess({ ...success, inquiry: false }), 5000);
    } else {
        alert(result.error);
    }
    setLoading({ ...loading, inquiry: false });
  };

  // --- REPLACED: Table Handler using Server Action ---
  const handleTableSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading({ ...loading, table: true });
    
    const result = await submitTableBooking({ ...tableData, venue_id: venueId });
    
    if (result.success) {
      setSuccess({ ...success, table: true });
      setTableData({ name: '', phone: '', guest_count: '', event_id: '', table_type: 'VIP Lounge' });
      setTimeout(() => setSuccess({ ...success, table: false }), 5000);
    } else {
        alert(result.error);
    }
    setLoading({ ...loading, table: false });
  };

  return (
    <section id="booking" className={`py-32 px-4 ${bgStyle} ${fontFamily} transition-colors duration-1000`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">
            Secure Your <span className="italic font-light" style={accentColor}>Experience</span>
          </h2>
          <div className="h-px w-24 mx-auto mb-6" style={accentBg} />
        </div>

        <div className="grid lg:grid-cols-2 gap-24 items-start">
          
          {/* LEFT COLUMN: GENERAL INQUIRY */}
          <div className="space-y-12">
            <div className="space-y-2">
              <h3 className="text-2xl font-serif text-white">Event Inquiry</h3>
              <p className="text-gray-500 text-[10px] tracking-[0.3em] uppercase">Planning a grand celebration?</p>
            </div>

            {success.inquiry && (
              <div style={{ ...accentBorder, ...transparentAccentBg }} className="p-6 border text-center text-[10px] tracking-widest uppercase animate-in fade-in">
                <span style={accentColor}>Our event curator will contact you shortly.</span>
              </div>
            )}

            <form onSubmit={handleInquirySubmit} className="space-y-10">
              <div className="grid md:grid-cols-2 gap-10">
                <input type="text" placeholder="Full Name" value={inquiryData.name} onChange={e => setInquiryData({...inquiryData, name: e.target.value})} required className={inputClasses} />
                <input type="email" placeholder="Email Address" value={inquiryData.email} onChange={e => setInquiryData({...inquiryData, email: e.target.value})} required className={inputClasses} />
              </div>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="relative">
                  <label className={labelClasses} style={accentColor}>Occasion</label>
                  <select value={inquiryData.event_type} onChange={e => setInquiryData({...inquiryData, event_type: e.target.value})} className={inputClasses}>
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Private Party">Private Party</option>
                  </select>
                </div>
                <div className="relative">
                  <label className={labelClasses} style={accentColor}>Preferred Date</label>
                  <input type="date" value={inquiryData.event_date} onChange={e => setInquiryData({...inquiryData, event_date: e.target.value})} required className={inputClasses} />
                </div>
              </div>
              <textarea placeholder="Description..." value={inquiryData.message} onChange={e => setInquiryData({...inquiryData, message: e.target.value})} rows={3} className={inputClasses} />
              
              <button type="submit" disabled={loading.inquiry} style={buttonStyle === 'outline' ? accentBorder : accentBg} 
                className={`w-full py-5 text-[10px] font-bold uppercase tracking-[0.4em] transition-all relative overflow-hidden group ${buttonStyle === 'solid' ? 'text-black' : 'text-white'}`}>
                <div style={accentBg} className="absolute inset-0 z-0 translate-y-full transition-transform group-hover:translate-y-0" />
                <span className="relative z-10">{loading.inquiry ? 'Sending...' : 'Request Proposal'}</span>
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: TABLE BOOKING */}
          <div className="space-y-12 lg:border-l lg:border-white/5 lg:pl-24">
            <div className="space-y-2">
              <h3 className="text-2xl font-serif text-white">Table Reservation</h3>
              <p className="text-gray-500 text-[10px] tracking-[0.3em] uppercase">Join us for the night</p>
            </div>

            {success.table && (
              <div style={{ ...accentBorder, ...transparentAccentBg }} className="p-6 border text-center text-[10px] tracking-widest uppercase animate-in fade-in">
                <span style={accentColor}>Table request sent. Check your phone for confirmation.</span>
              </div>
            )}

            <form onSubmit={handleTableSubmit} className="space-y-10">
              <input type="text" placeholder="Reservation Name" value={tableData.name} onChange={e => setTableData({...tableData, name: e.target.value})} required className={inputClasses} />
              
              <div className="grid md:grid-cols-2 gap-10">
                <input type="tel" placeholder="Phone Number" value={tableData.phone} onChange={e => setTableData({...tableData, phone: e.target.value})} required className={inputClasses} />
                <input type="number" placeholder="Guest Count" value={tableData.guest_count} onChange={e => setTableData({...tableData, guest_count: e.target.value})} required className={inputClasses} />
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="relative">
                  <label className={labelClasses} style={accentColor}>Select Event</label>
                  <select value={tableData.event_id} onChange={e => setTableData({...tableData, event_id: e.target.value})} required className={inputClasses}>
                    <option value="">Choose an Event</option>
                    {events.map(ev => <option key={ev.id} value={ev.id}>{ev.title}</option>)}
                  </select>
                </div>
                <div className="relative">
                  <label className={labelClasses} style={accentColor}>Table Style</label>
                  <select value={tableData.table_type} onChange={e => setTableData({...tableData, table_type: e.target.value})} className={inputClasses}>
                    <option value="VIP Lounge">VIP Lounge</option>
                    <option value="Dance Floor Side">Dance Floor Side</option>
                    <option value="Elevated Deck">Elevated Deck</option>
                  </select>
                </div>
              </div>

              <button type="submit" disabled={loading.table} style={buttonStyle === 'outline' ? accentBorder : accentBg} 
                className={`w-full py-5 text-[10px] font-bold uppercase tracking-[0.4em] transition-all relative overflow-hidden group ${buttonStyle === 'solid' ? 'text-black' : 'text-white'}`}>
                <div style={accentBg} className="absolute inset-0 z-0 translate-y-full transition-transform group-hover:translate-y-0" />
                <span className="relative z-10">{loading.table ? 'Booking...' : 'Confirm Table'}</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}