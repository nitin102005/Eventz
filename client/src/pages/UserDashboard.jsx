// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import api from '../utils/axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaTicketAlt, FaTimesCircle } from 'react-icons/fa';

// const UserDashboard = () => {
//     const { user } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (!user) {
//             navigate('/login');
//             return;
//         }
//         fetchBookings();
//     }, [user, navigate]);

//     const fetchBookings = async () => {
//         try {
//             const { data } = await api.get('/bookings/my');
//             setBookings(data);
//         } catch (error) {
//             console.error('Error fetching bookings', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const cancelBooking = async (id) => {
//         if (window.confirm('Are you sure you want to cancel this booking request?')) {
//             try {
//                 await api.delete(`/bookings/${id}`);
//                 fetchBookings();
//             } catch (error) {
//                 alert(error.response?.data?.message || 'Error cancelling booking');
//             }
//         }
//     };

//     if (loading) return <div className="text-center py-20 text-xl font-semibold">Loading dashboard...</div>;

//     return (
//         <div className="max-w-6xl mx-auto">
//             <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-8 border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6">
//                 <div className="w-20 h-20 bg-gray-200 text-gray-900 rounded-full flex items-center justify-center text-3xl font-bold uppercase tracking-widest shrink-0">
//                     {user?.name.charAt(0)}
//                 </div>
//                 <div className="flex flex-col items-center sm:items-start">
//                     <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Welcome, {user?.name}!</h1>
//                     <p className="text-gray-500 flex items-center justify-center sm:justify-start gap-2">
//                         <span className="w-2 h-2 rounded-full bg-green-500"></span> User Dashboard
//                     </p>
//                 </div>
//             </div>

//             <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
//                     <FaTicketAlt className="text-gray-700" /> My Bookings requests
//                 </h2>
//             </div>

//             {bookings.length === 0 ? (
//                 <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
//                     <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <FaTicketAlt className="text-gray-300 text-3xl" />
//                     </div>
//                     <p className="text-xl text-gray-500 mb-6 mt-4 font-medium">You haven't booked any events yet.</p>
//                     <Link to="/" className="inline-block bg-gray-900 hover:bg-black text-white font-bold py-3 px-8 rounded-lg transition shadow-md">
//                         Browse Events
//                     </Link>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {bookings.map((booking) => (
//                         <div key={booking._id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col">
//                             <div className="p-6 border-b border-gray-50 flex-grow">
//                                 {booking.eventId ? (
//                                     <>
//                                         <div className="flex justify-between items-start mb-4">
//                                             <h3 className="text-lg font-bold text-gray-900 leading-tight">{booking.eventId.title}</h3>
//                                             <div className="flex flex-col gap-1 items-end">
//                                                 <span className={`px-2 py-1 text-[10px] font-black rounded uppercase tracking-wider ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
//                                                     booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
//                                                         'bg-yellow-100 text-yellow-700'
//                                                     }`}>
//                                                     {booking.status}
//                                                 </span>
//                                                 {booking.status !== 'cancelled' && (
//                                                     <span className={`px-2 py-1 text-[10px] font-black rounded uppercase tracking-wider ${booking.paymentStatus === 'paid' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
//                                                         }`}>
//                                                         {booking.paymentStatus.replace('_', ' ')}
//                                                     </span>
//                                                 )}
//                                             </div>
//                                         </div>
//                                         <div className="text-sm text-gray-500 mb-4 space-y-1">
//                                             <p><strong className="text-gray-700">Date:</strong> {new Date(booking.eventId.date).toLocaleDateString()}</p>
//                                             <p><strong className="text-gray-700">Amount:</strong> {booking.amount === 0 ? 'Free' : `₹${booking.amount}`}</p>
//                                             <p><strong className="text-gray-700">Requested:</strong> {new Date(booking.bookedAt).toLocaleDateString()}</p>
//                                         </div>
//                                     </>
//                                 ) : (
//                                     <p className="text-red-500 italic">Event details unavailable (might have been deleted)</p>
//                                 )}
//                             </div>
//                             <div className="p-4 bg-gray-50 flex justify-between items-center shrink-0">
//                                 {booking.eventId && booking.status !== 'cancelled' ? (
//                                     <>
//                                         <Link to={`/events/${booking.eventId._id}`} className="text-gray-900 font-semibold text-sm hover:underline">View Event</Link>
//                                         <button
//                                             onClick={() => cancelBooking(booking._id)}
//                                             className="text-red-500 font-semibold text-sm hover:text-red-700 transition flex items-center gap-1"
//                                         >
//                                             <FaTimesCircle /> Cancel
//                                         </button>
//                                     </>
//                                 ) : (
//                                     <div className="w-full text-center text-sm text-gray-500 italic">Booking Cancelled</div>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UserDashboard;



import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaTicketAlt, FaTimesCircle } from 'react-icons/fa';

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        const token = localStorage.getItem('token') || user.token;
        if (!token) {
            navigate('/login');
            return;
        }
        fetchBookings();
    }, [user, navigate]);

    const fetchBookings = async () => {
        try {
            const { data } = await api.get('/bookings/my');
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings', error);
        } finally {
            setLoading(false);
        }
    };

    const cancelBooking = async (id) => {
        if (window.confirm('Are you sure you want to cancel this booking request?')) {
            try {
                await api.delete(`/bookings/${id}`);
                fetchBookings();
            } catch (error) {
                alert(error.response?.data?.message || 'Error cancelling booking');
            }
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#080808] flex items-center justify-center text-white/30 text-sm">
            Loading dashboard...
        </div>
    );

    return (
        <div className="min-h-screen bg-[#080808] pt-[68px] pb-20 font-['DM_Sans',sans-serif] text-white">

            {/* Background grid */}
            <div className="fixed inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                    backgroundSize: '48px 48px'
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-8">

                {/* ── Profile header ── */}
                <div className="bg-white/4 border border-white/8 rounded-2xl p-6 sm:p-8 mb-8 backdrop-blur-sm flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-2xl font-black uppercase text-white shrink-0"
                        style={{ fontFamily: 'Syne, sans-serif' }}>
                        {user?.name.charAt(0)}
                    </div>
                    <div>
                        <p className="text-white/30 text-[0.65rem] font-bold uppercase tracking-widest mb-1">Your Account</p>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1"
                            style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.025em' }}>
                            Welcome, {user?.name}
                        </h1>
                        <p className="text-white/35 text-sm flex items-center justify-center sm:justify-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                            {user?.email}
                        </p>
                    </div>
                </div>

                {/* ── Section header ── */}
                <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                        My Booking Requests
                    </h2>
                    {bookings.length > 0 && (
                        <span className="bg-white/8 border border-white/10 text-white/40 text-xs font-bold px-3 py-1 rounded-full">
                            {bookings.length}
                        </span>
                    )}
                </div>

                {/* ── Empty state ── */}
                {bookings.length === 0 ? (
                    <div className="bg-white/4 border border-white/8 rounded-2xl p-14 text-center backdrop-blur-sm">
                        <div className="w-16 h-16 bg-white/5 border border-white/8 rounded-2xl flex items-center justify-center mx-auto mb-5">
                            <FaTicketAlt className="text-white/15 text-2xl" />
                        </div>
                        <p className="text-white/35 text-base font-medium mb-6">You haven't booked any events yet.</p>
                        <Link
                            to="/"
                            className="inline-block bg-white text-black font-bold text-sm py-3 px-8 rounded-lg transition hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,255,255,0.12)]"
                        >
                            Browse Events
                        </Link>
                    </div>
                ) : (
                    /* ── Bookings grid ── */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {bookings.map((booking) => {
                            const isPending   = booking.status === 'pending';
                            const isConfirmed = booking.status === 'confirmed';
                            const isCancelled = booking.status === 'cancelled';

                            const borderColor = isPending   ? 'border-l-amber-400/60'
                                              : isConfirmed ? 'border-l-emerald-400/60'
                                              : 'border-l-red-400/60';

                            return (
                                <div key={booking._id}
                                    className={`bg-white/4 border border-white/8 border-l-2 ${borderColor} rounded-2xl overflow-hidden flex flex-col hover:bg-white/6 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition backdrop-blur-sm`}>

                                    <div className="p-5 flex-grow">
                                        {booking.eventId ? (
                                            <>
                                                {/* Title + badges */}
                                                <div className="flex justify-between items-start gap-3 mb-4">
                                                    <h3 className="text-sm font-semibold text-white leading-tight flex-1 min-w-0">
                                                        {booking.eventId.title}
                                                    </h3>
                                                    <div className="flex flex-col gap-1 items-end shrink-0">
                                                        <span className={`px-2 py-0.5 text-[0.6rem] font-black rounded uppercase tracking-wider ${
                                                            isConfirmed ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
                                                            : isCancelled ? 'bg-red-400/10 text-red-400 border border-red-400/20'
                                                            : 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                                                        }`}>
                                                            {booking.status}
                                                        </span>
                                                        {booking.status !== 'cancelled' && (
                                                            <span className={`px-2 py-0.5 text-[0.6rem] font-black rounded uppercase tracking-wider ${
                                                                booking.paymentStatus === 'paid'
                                                                ? 'bg-sky-400/10 text-sky-400 border border-sky-400/20'
                                                                : 'bg-white/6 text-white/35 border border-white/10'
                                                            }`}>
                                                                {booking.paymentStatus.replace('_', ' ')}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Details */}
                                                <div className="space-y-1.5">
                                                    {[
                                                        { label: 'Date',      value: new Date(booking.eventId.date).toLocaleDateString() },
                                                        { label: 'Amount',    value: booking.amount === 0 ? 'Free' : `₹${booking.amount}`, green: booking.amount === 0 },
                                                        { label: 'Requested', value: new Date(booking.bookedAt).toLocaleDateString() },
                                                    ].map(({ label, value, green }) => (
                                                        <p key={label} className="flex items-center gap-2 text-xs">
                                                            <span className="text-white/25 font-bold uppercase tracking-wider w-16 shrink-0">{label}</span>
                                                            <span className={`font-medium ${green ? 'text-emerald-400' : 'text-white/55'}`}>{value}</span>
                                                        </p>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <p className="text-red-400/60 text-xs italic">Event details unavailable (may have been deleted)</p>
                                        )}
                                    </div>

                                    {/* Card footer */}
                                    <div className="px-5 py-3 border-t border-white/6 flex justify-between items-center shrink-0">
                                        {booking.eventId && !isCancelled ? (
                                            <>
                                                <Link
                                                    to={`/events/${booking.eventId._id}`}
                                                    className="text-white/50 hover:text-white text-xs font-semibold transition relative group"
                                                >
                                                    View Event
                                                    <span className="absolute -bottom-px left-0 w-0 h-px bg-white transition-all group-hover:w-full" />
                                                </Link>
                                                <button
                                                    onClick={() => cancelBooking(booking._id)}
                                                    className="flex items-center gap-1.5 text-red-400/60 hover:text-red-400 text-xs font-semibold transition"
                                                >
                                                    <FaTimesCircle className="text-[0.7rem]" /> Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <span className="w-full text-center text-xs text-white/20 italic">Booking Cancelled</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;