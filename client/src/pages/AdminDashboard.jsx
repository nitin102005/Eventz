// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import api from '../utils/axios';
// import { useNavigate } from 'react-router-dom';

// const AdminDashboard = () => {
//     const { user } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const [events, setEvents] = useState([]);
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const [showEventForm, setShowEventForm] = useState(false);
//     const [formData, setFormData] = useState({
//         title: '', description: '', date: '', location: '', category: '', totalSeats: '', ticketPrice: '', image: ''
//     });

//     useEffect(() => {
//         if (!user || user.role !== 'admin') {
//             navigate('/login');
//             return;
//         }
//         fetchData();
//     }, [user, navigate]);

//     const fetchData = async () => {
//         try {
//             const [eventsRes, bookingsRes] = await Promise.all([
//                 api.get('/events'),
//                 api.get('/bookings/my') // Admin gets all bookings
//             ]);
//             setEvents(eventsRes.data);
//             setBookings(bookingsRes.data);
//         } catch (error) {
//             console.error('Error fetching admin data', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCreateEvent = async (e) => {
//         e.preventDefault();
//         try {
//             await api.post('/events', formData);
//             setShowEventForm(false);
//             setFormData({ title: '', description: '', date: '', location: '', category: '', totalSeats: '', ticketPrice: '', image: '' });
//             fetchData();
//         } catch (error) {
//             alert(error.response?.data?.message || 'Error creating event');
//         }
//     };

//     const handleDeleteEvent = async (id) => {
//         if (window.confirm('Are you sure you want to delete this event?')) {
//             try {
//                 await api.delete(`/events/${id}`);
//                 fetchData();
//             } catch (error) {
//                 alert('Error deleting event');
//             }
//         }
//     };

//     const handleConfirmBooking = async (id, paymentStatus) => {
//         try {
//             await api.put(`/bookings/${id}/confirm`, { paymentStatus });
//             fetchData();
//         } catch (error) {
//             alert(error.response?.data?.message || 'Error confirming booking');
//         }
//     };

//     const handleCancelBooking = async (id) => {
//         if (window.confirm('Cancel this user\'s booking request?')) {
//             try {
//                 await api.delete(`/bookings/${id}`);
//                 fetchData();
//             } catch (error) {
//                 alert(error.response?.data?.message || 'Error cancelling booking');
//             }
//         }
//     };

//     if (loading) return <div className="text-center py-20 text-xl font-semibold">Loading admin panel...</div>;

//     return (
//         <div className="max-w-7xl mx-auto">
//             <div className="bg-black text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-lg flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
//                 <div>
//                     <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">Admin Dashboard</h1>
//                     <p className="text-gray-300">Manage events and manually confirm bookings.</p>
//                 </div>
//                 <button
//                     onClick={() => setShowEventForm(!showEventForm)}
//                     className="w-full md:w-auto bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition shadow-md"
//                 >
//                     {showEventForm ? 'Cancel Creation' : '+ Create New Event'}
//                 </button>
//             </div>

//             {/* Admin Stats Row */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
//                     <div>
//                         <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Total Revenue</p>
//                         <h3 className="text-3xl font-black text-green-600">₹{bookings.reduce((sum, b) => b.paymentStatus === 'paid' && b.status === 'confirmed' ? sum + b.amount : sum, 0)}</h3>
//                     </div>
//                     <div className="w-12 h-12 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xl font-bold">₹</div>
//                 </div>
//                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
//                     <div>
//                         <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Paid Clients</p>
//                         <h3 className="text-3xl font-black text-blue-600">{new Set(bookings.filter(b => b.paymentStatus === 'paid' && b.status === 'confirmed').map(b => b.userId?._id)).size}</h3>
//                     </div>
//                     <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-xl font-bold">👤</div>
//                 </div>
//                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
//                     <div>
//                         <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Pending Requests</p>
//                         <h3 className="text-3xl font-black text-yellow-600">{bookings.filter(b => b.status === 'pending').length}</h3>
//                     </div>
//                     <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xl font-bold">⏳</div>
//                 </div>
//             </div>

//             {showEventForm && (
//                 <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 animation-slideDown">
//                     <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Event</h2>
//                     <form onSubmit={handleCreateEvent} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <input required type="text" placeholder="Event Title" className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-gray-700 outline-none transition" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
//                         <input required type="text" placeholder="Category (e.g., Tech, Music)" className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-gray-700 outline-none transition" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
//                         <input required type="date" className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-gray-700 outline-none transition" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
//                         <input required type="text" placeholder="Location" className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-gray-700 outline-none transition" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
//                         <input required type="number" placeholder="Total Seats" className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-gray-700 outline-none transition" value={formData.totalSeats} onChange={e => setFormData({ ...formData, totalSeats: e.target.value })} />
//                         <input required type="number" placeholder="Ticket Price (0 for free)" className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-gray-700 outline-none transition" value={formData.ticketPrice} onChange={e => setFormData({ ...formData, ticketPrice: e.target.value })} />

//                         <div className="md:col-span-2">
//                             <input type="text" placeholder="Image URL (Provide any direct link to an image)" className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-gray-700 outline-none transition" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
//                         </div>

//                         <textarea required placeholder="Event Description" className="border px-4 py-3 rounded-lg md:col-span-2 h-32 focus:ring-2 focus:ring-gray-700 outline-none transition" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
//                         <button type="submit" className="md:col-span-2 bg-gray-900 text-white font-bold py-3 mt-2 rounded-lg hover:bg-black transition shadow-md">Publish Event</button>
//                     </form>
//                 </div>
//             )}

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 {/* Events Section */}
//                 <div className="flex flex-col">
//                     <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
//                         <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 text-sm">{events.length}</span>
//                         All Events
//                     </h2>
//                     <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                         <ul className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
//                             {events.length === 0 ? <li className="p-6 text-gray-500 text-center">No events created yet.</li> :
//                                 events.map(event => (
//                                     <li key={event._id} className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50 transition border-b border-gray-100 last:border-0">
//                                         <div>
//                                             <h4 className="font-bold text-gray-900 mb-1 leading-tight">{event.title}</h4>
//                                             <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
//                                                 <span className="flex items-center gap-1 font-medium"><div className="w-2 h-2 rounded-full bg-blue-500"></div> {new Date(event.date).toLocaleDateString()}</span>
//                                                 <span className="flex items-center gap-1 font-medium"><div className={`w-2 h-2 rounded-full ${event.availableSeats > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div> {event.availableSeats}/{event.totalSeats} seats</span>
//                                             </div>
//                                         </div>
//                                         <button onClick={() => handleDeleteEvent(event._id)} className="w-full sm:w-auto text-red-500 hover:text-white hover:bg-red-500 border border-red-200 px-4 py-2 rounded-lg text-sm font-bold transition shadow-sm shrink-0">
//                                             Delete
//                                         </button>
//                                     </li>
//                                 ))
//                             }
//                         </ul>
//                     </div>
//                 </div>

//                 {/* Bookings Section */}
//                 <div className="flex flex-col">
//                     <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
//                         <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 text-sm font-bold">{bookings.length}</span>
//                         Booking Requests
//                     </h2>
//                     <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                         <ul className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
//                             {bookings.length === 0 ? <li className="p-6 text-gray-500 text-center">No bookings yet.</li> :
//                                 bookings.map(booking => (
//                                     <li key={booking._id} className={`p-6 hover:bg-gray-50 transition border-l-4 ${booking.status === 'pending' ? 'border-l-yellow-400' : booking.status === 'confirmed' ? 'border-l-green-400' : 'border-l-red-400'}`}>
//                                         <div className="flex justify-between items-start mb-3">
//                                             <h4 className="font-bold text-gray-900 text-lg leading-tight">{booking.eventId?.title || 'Deleted Event'}</h4>
//                                             <div className="flex flex-col gap-1 items-end shrink-0 ml-4">
//                                                 <span className={`px-2 py-1 text-[10px] font-black rounded uppercase tracking-wider ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{booking.status}</span>
//                                                 {booking.status !== 'cancelled' && <span className={`px-2 py-1 text-[10px] font-black rounded uppercase tracking-wider ${booking.paymentStatus === 'paid' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-200 text-gray-800'}`}>{booking.paymentStatus.replace('_', ' ')}</span>}
//                                             </div>
//                                         </div>
//                                         <div className="bg-gray-50 rounded-lg p-3 mb-3 border border-gray-100 text-sm">
//                                             <p className="text-gray-700 flex items-center gap-2 mb-1">
//                                                 <span className="font-bold w-16 text-gray-500 uppercase text-xs">User:</span>
//                                                 <span className="font-semibold">{booking.userId?.name}</span>
//                                                 <span className="text-gray-400">({booking.userId?.email})</span>
//                                             </p>
//                                             <p className="text-gray-700 flex items-center gap-2 mb-1">
//                                                 <span className="font-bold w-16 text-gray-500 uppercase text-xs">Amount:</span>
//                                                 <span className={`font-semibold ${booking.amount === 0 ? 'text-green-600' : ''}`}>{booking.amount === 0 ? 'Free' : `₹${booking.amount}`}</span>
//                                             </p>
//                                             <p className="text-gray-700 flex items-center gap-2 mb-1">
//                                                 <span className="font-bold w-16 text-gray-500 uppercase text-xs">Date:</span>
//                                                 <span>{new Date(booking.bookedAt).toLocaleString()}</span>
//                                             </p>
//                                             {booking.eventId && (
//                                                 <p className="text-gray-700 flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
//                                                     <span className="font-bold w-16 text-gray-500 uppercase text-xs">Seats:</span>
//                                                     <span className={`font-bold ${booking.eventId.availableSeats > 0 ? 'text-green-600' : 'text-red-500'}`}>{booking.eventId.availableSeats}</span> remaining of {booking.eventId.totalSeats}
//                                                 </p>
//                                             )}
//                                         </div>

//                                         {/* Action buttons for admin */}
//                                         {booking.status === 'pending' && (
//                                             <div className="flex flex-wrap gap-2 mt-2">
//                                                 <button onClick={() => handleConfirmBooking(booking._id, 'paid')} className="flex-1 min-w-[120px] bg-green-50 text-green-700 hover:bg-green-600 hover:text-white border border-green-200 text-xs font-bold py-2.5 px-3 rounded-lg shadow-sm transition">
//                                                     ✓ Approve as Paid
//                                                 </button>
//                                                 <button onClick={() => handleConfirmBooking(booking._id, 'not_paid')} className="flex-1 min-w-[120px] bg-gray-50 text-gray-700 hover:bg-gray-800 hover:text-white border border-gray-200 text-xs font-bold py-2.5 px-3 rounded-lg shadow-sm transition">
//                                                     ✓ Approve Undecided
//                                                 </button>
//                                                 <button onClick={() => handleCancelBooking(booking._id)} className="w-[80px] bg-red-50 text-red-600 hover:bg-red-500 hover:text-white border border-red-200 text-xs font-bold py-2.5 px-3 rounded-lg transition">
//                                                     ✕ Reject
//                                                 </button>
//                                             </div>
//                                         )}
//                                     </li>
//                                 ))
//                             }
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;


import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEventForm, setShowEventForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '', description: '', date: '', location: '', category: '', totalSeats: '', ticketPrice: '', image: ''
    });

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login');
            return;
        }
        const token = localStorage.getItem('token') || user.token;
        if (!token) {
            navigate('/login');
            return;
        }
        fetchData();
    }, [user, navigate]);

    const fetchData = async () => {
        try {
            const [eventsRes, bookingsRes] = await Promise.all([
                api.get('/events'),
                api.get('/bookings/my')
            ]);
            setEvents(eventsRes.data);
            setBookings(bookingsRes.data);
        } catch (error) {
            console.error('Error fetching admin data', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            await api.post('/events', formData);
            setShowEventForm(false);
            setFormData({ title: '', description: '', date: '', location: '', category: '', totalSeats: '', ticketPrice: '', image: '' });
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Error creating event');
        }
    };

    const handleDeleteEvent = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await api.delete(`/events/${id}`);
                fetchData();
            } catch (error) {
                alert('Error deleting event');
            }
        }
    };

    const handleConfirmBooking = async (id, paymentStatus) => {
        try {
            await api.put(`/bookings/${id}/confirm`, { paymentStatus });
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Error confirming booking');
        }
    };

    const handleCancelBooking = async (id) => {
        if (window.confirm("Cancel this user's booking request?")) {
            try {
                await api.delete(`/bookings/${id}`);
                fetchData();
            } catch (error) {
                alert(error.response?.data?.message || 'Error cancelling booking');
            }
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#080808] flex items-center justify-center text-white/30 text-sm font-['DM_Sans',sans-serif]">
            Loading admin panel...
        </div>
    );

    const totalRevenue = bookings.reduce((sum, b) => b.paymentStatus === 'paid' && b.status === 'confirmed' ? sum + b.amount : sum, 0);
    const paidClients = new Set(bookings.filter(b => b.paymentStatus === 'paid' && b.status === 'confirmed').map(b => b.userId?._id)).size;
    const pendingCount = bookings.filter(b => b.status === 'pending').length;

    const inputClass = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 outline-none transition focus:bg-white/8 focus:border-white/30 focus:ring-2 focus:ring-white/5";

    return (
        <div className="min-h-screen bg-[#080808] pt-[68px] pb-20 font-['DM_Sans',sans-serif]">

            {/* Background grid */}
            <div className="fixed inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                    backgroundSize: '48px 48px'
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

                {/* ── Header ── */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pt-8">
                    <div>
                        <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-2">EVENTZ</p>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
                            style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.03em' }}>
                            Admin Dashboard
                        </h1>
                        <p className="text-white/40 text-sm mt-1">Manage events and confirm booking requests.</p>
                    </div>
                    <button
                        onClick={() => setShowEventForm(!showEventForm)}
                        className="shrink-0 bg-white text-black font-bold text-sm py-3 px-6 rounded-lg transition hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,255,255,0.12)] active:translate-y-0"
                    >
                        {showEventForm ? '✕ Cancel' : '+ Create New Event'}
                    </button>
                </div>

                {/* ── Stats ── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {[
                        { label: 'Total Revenue', value: `₹${totalRevenue}`, accent: 'text-emerald-400', dot: 'bg-emerald-400' },
                        { label: 'Paid Clients', value: paidClients, accent: 'text-sky-400', dot: 'bg-sky-400' },
                        { label: 'Pending Requests', value: pendingCount, accent: 'text-amber-400', dot: 'bg-amber-400' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white/4 border border-white/8 rounded-2xl p-6 backdrop-blur-sm flex items-center justify-between">
                            <div>
                                <p className="text-white/35 text-[0.65rem] font-bold uppercase tracking-widest mb-2">{stat.label}</p>
                                <p className={`text-3xl font-black ${stat.accent}`} style={{ fontFamily: 'Syne, sans-serif' }}>{stat.value}</p>
                            </div>
                            <div className={`w-2.5 h-2.5 rounded-full ${stat.dot} opacity-70`} />
                        </div>
                    ))}
                </div>

                {/* ── Create Event Form ── */}
                {showEventForm && (
                    <div className="bg-white/4 border border-white/9 rounded-2xl p-6 sm:p-8 mb-8 backdrop-blur-sm shadow-[0_24px_48px_rgba(0,0,0,0.4)]">
                        <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}>
                            Create New Event
                        </h2>
                        <form onSubmit={handleCreateEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input required type="text" placeholder="Event Title" className={inputClass} value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            <input required type="text" placeholder="Category (e.g. Tech, Music)" className={inputClass} value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                            <input required type="date" className={`${inputClass} [color-scheme:dark]`} value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                            <input required type="text" placeholder="Location" className={inputClass} value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                            <input required type="number" placeholder="Total Seats" className={inputClass} value={formData.totalSeats} onChange={e => setFormData({ ...formData, totalSeats: e.target.value })} />
                            <input required type="number" placeholder="Ticket Price (0 for free)" className={inputClass} value={formData.ticketPrice} onChange={e => setFormData({ ...formData, ticketPrice: e.target.value })} />
                            <div className="md:col-span-2">
                                <input type="text" placeholder="Image URL (optional)" className={inputClass} value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                            </div>
                            <div className="md:col-span-2">
                                <textarea required placeholder="Event Description" rows={4}
                                    className={`${inputClass} resize-none`}
                                    value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                            <div className="md:col-span-2">
                                <button type="submit"
                                    className="w-full bg-white text-black font-bold text-sm py-3 rounded-lg transition hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,255,255,0.12)]">
                                    Publish Event
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* ── Two-column: Events + Bookings ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Events list */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>All Events</h2>
                            <span className="bg-white/8 border border-white/10 text-white/40 text-xs font-bold px-3 py-1 rounded-full">{events.length}</span>
                        </div>

                        <div className="bg-white/4 border border-white/8 rounded-2xl overflow-hidden backdrop-blur-sm">
                            <ul className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
                                {events.length === 0
                                    ? <li className="p-8 text-center text-white/25 text-sm">No events created yet.</li>
                                    : events.map(event => (
                                        <li key={event._id} className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-white/3 transition">
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-white text-sm mb-1.5 truncate">{event.title}</h4>
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <span className="flex items-center gap-1.5 text-[0.75rem] text-white/35">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400/70 inline-block" />
                                                        {new Date(event.date).toLocaleDateString()}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 text-[0.75rem] text-white/35">
                                                        <span className={`w-1.5 h-1.5 rounded-full inline-block ${event.availableSeats > 0 ? 'bg-emerald-400/70' : 'bg-red-400/70'}`} />
                                                        {event.availableSeats}/{event.totalSeats} seats
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteEvent(event._id)}
                                                className="shrink-0 text-red-400/70 hover:text-white hover:bg-red-500/80 border border-red-400/20 hover:border-red-500 px-4 py-1.5 rounded-lg text-xs font-bold transition"
                                            >
                                                Delete
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>

                    {/* Bookings list */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>Booking Requests</h2>
                            <span className="bg-amber-400/10 border border-amber-400/20 text-amber-400/80 text-xs font-bold px-3 py-1 rounded-full">{bookings.length}</span>
                        </div>

                        <div className="bg-white/4 border border-white/8 rounded-2xl overflow-hidden backdrop-blur-sm">
                            <ul className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
                                {bookings.length === 0
                                    ? <li className="p-8 text-center text-white/25 text-sm">No bookings yet.</li>
                                    : bookings.map(booking => {
                                        const isPending = booking.status === 'pending';
                                        const isConfirmed = booking.status === 'confirmed';
                                        const borderColor = isPending ? 'border-l-amber-400/60' : isConfirmed ? 'border-l-emerald-400/60' : 'border-l-red-400/60';

                                        return (
                                            <li key={booking._id} className={`p-5 border-l-2 ${borderColor} hover:bg-white/3 transition`}>
                                                {/* Top row */}
                                                <div className="flex justify-between items-start mb-3 gap-3">
                                                    <h4 className="font-semibold text-white text-sm leading-tight flex-1 min-w-0 truncate">
                                                        {booking.eventId?.title || 'Deleted Event'}
                                                    </h4>
                                                    <div className="flex gap-1.5 shrink-0">
                                                        <span className={`px-2 py-0.5 text-[0.6rem] font-black rounded uppercase tracking-wider ${
                                                            isConfirmed ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
                                                            : booking.status === 'cancelled' ? 'bg-red-400/10 text-red-400 border border-red-400/20'
                                                            : 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                                                        }`}>{booking.status}</span>
                                                        {booking.status !== 'cancelled' && (
                                                            <span className={`px-2 py-0.5 text-[0.6rem] font-black rounded uppercase tracking-wider ${
                                                                booking.paymentStatus === 'paid'
                                                                ? 'bg-sky-400/10 text-sky-400 border border-sky-400/20'
                                                                : 'bg-white/6 text-white/35 border border-white/10'
                                                            }`}>{booking.paymentStatus.replace('_', ' ')}</span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Details */}
                                                <div className="bg-white/4 border border-white/7 rounded-lg p-3 mb-3 space-y-1.5">
                                                    {[
                                                        { label: 'User', value: `${booking.userId?.name} (${booking.userId?.email})` },
                                                        { label: 'Amount', value: booking.amount === 0 ? 'Free' : `₹${booking.amount}`, green: booking.amount === 0 },
                                                        { label: 'Booked', value: new Date(booking.bookedAt).toLocaleString() },
                                                    ].map(({ label, value, green }) => (
                                                        <p key={label} className="flex items-start gap-2 text-xs">
                                                            <span className="text-white/25 font-bold uppercase tracking-wider w-14 shrink-0 pt-px">{label}</span>
                                                            <span className={`font-medium ${green ? 'text-emerald-400' : 'text-white/60'} truncate`}>{value}</span>
                                                        </p>
                                                    ))}
                                                    {booking.eventId && (
                                                        <p className="flex items-center gap-2 text-xs pt-1.5 border-t border-white/7 mt-1">
                                                            <span className="text-white/25 font-bold uppercase tracking-wider w-14 shrink-0">Seats</span>
                                                            <span className={`font-bold ${booking.eventId.availableSeats > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                                                {booking.eventId.availableSeats}
                                                            </span>
                                                            <span className="text-white/30">/ {booking.eventId.totalSeats} remaining</span>
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Action buttons */}
                                                {isPending && (
                                                    <div className="flex flex-wrap gap-2">
                                                        <button
                                                            onClick={() => handleConfirmBooking(booking._id, 'paid')}
                                                            className="flex-1 min-w-[110px] bg-emerald-400/10 text-emerald-400 hover:bg-emerald-500 hover:text-white border border-emerald-400/25 text-xs font-bold py-2 px-3 rounded-lg transition"
                                                        >
                                                            ✓ Approve Paid
                                                        </button>
                                                        <button
                                                            onClick={() => handleConfirmBooking(booking._id, 'not_paid')}
                                                            className="flex-1 min-w-[110px] bg-white/5 text-white/50 hover:bg-white/15 hover:text-white border border-white/10 text-xs font-bold py-2 px-3 rounded-lg transition"
                                                        >
                                                            ✓ Approve Undecided
                                                        </button>
                                                        <button
                                                            onClick={() => handleCancelBooking(booking._id)}
                                                            className="bg-red-400/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-400/20 text-xs font-bold py-2 px-3 rounded-lg transition"
                                                        >
                                                            ✕ Reject
                                                        </button>
                                                    </div>
                                                )}
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;