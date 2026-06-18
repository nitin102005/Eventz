// import React, { useState, useEffect, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import api from '../utils/axios';
// import { AuthContext } from '../context/AuthContext';
// import { FaCalendarAlt, FaMapMarkerAlt, FaChair, FaMoneyBillWave } from 'react-icons/fa';

// const EventDetail = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { user } = useContext(AuthContext);
//     const [event, setEvent] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [bookingLoading, setBookingLoading] = useState(false);
//     const [otp, setOtp] = useState('');
//     const [showOTP, setShowOTP] = useState(false);
//     const [error, setError] = useState('');
//     const [successMsg, setSuccessMsg] = useState('');

//     useEffect(() => {
//         const fetchEvent = async () => {
//             try {
//                 const { data } = await api.get(`/events/${id}`);
//                 setEvent(data);
//             } catch (err) {
//                 setError('Failed to load event details.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchEvent();
//     }, [id]);

//     const handleBooking = async () => {
//         if (!user) {
//             navigate('/login');
//             return;
//         }
//         setBookingLoading(true);
//         setError('');
//         setSuccessMsg('');

//         try {
//             if (!showOTP) {
//                 await api.post('/bookings/send-otp');
//                 setShowOTP(true);
//                 setSuccessMsg('OTP sent to your email. Please verify to confirm booking.');
//             } else {
//                 await api.post('/bookings', { eventId: event._id, otp });
//                 setSuccessMsg('Booking requested! Awaiting admin confirmation.');
//                 setShowOTP(false);
//                 // Update local seats count dynamically after booking
//                 setEvent({ ...event, availableSeats: event.availableSeats - 1 });
//             }
//         } catch (err) {
//             setError(err.response?.data?.message || 'Booking failed');
//         } finally {
//             setBookingLoading(false);
//         }
//     };

//     if (loading) return <div className="text-center py-20 text-xl font-semibold">Loading...</div>;
//     if (error && !event) return <div className="text-center py-20 text-xl text-red-500">{error || 'Event not found'}</div>;

//     const isSoldOut = event.availableSeats <= 0;

//     return (
//         <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mt-8">
//             {event.image ? (
//                 <img src={event.image} alt={event.title} className="w-full h-80 object-cover" />
//             ) : (
//                 <div className="w-full h-64 bg-gray-900 flex items-center justify-center text-white/50 text-6xl font-black uppercase tracking-widest">
//                     {event.category}
//                 </div>
//             )}

//             <div className="p-8 md:p-12">
//                 <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
//                     <div>
//                         <div className="inline-block bg-gray-200 text-gray-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
//                             {event.category}
//                         </div>
//                         <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{event.title}</h1>
//                         <p className="text-gray-600 text-lg leading-relaxed mb-6">{event.description}</p>
//                     </div>

//                     <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 min-w-[300px] w-full md:w-auto shrink-0 shadow-sm">
//                         <h3 className="text-xl font-bold text-gray-800 mb-6">Booking Details</h3>

//                         <div className="space-y-4 mb-8">
//                             <div className="flex items-center gap-4 text-gray-600">
//                                 <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 shrink-0">
//                                     <FaMoneyBillWave />
//                                 </div>
//                                 <div>
//                                     <p className="text-sm font-semibold text-gray-400 uppercase">Ticket Price</p>
//                                     <p className="font-bold text-gray-800 text-lg">{event.ticketPrice === 0 ? <span className="text-green-500">Free</span> : `₹${event.ticketPrice}`}</p>
//                                 </div>
//                             </div>

//                             <div className="flex items-center gap-4 text-gray-600">
//                                 <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 shrink-0">
//                                     <FaChair />
//                                 </div>
//                                 <div>
//                                     <p className="text-sm font-semibold text-gray-400 uppercase">Availability</p>
//                                     <p className="font-bold text-gray-800">
//                                         <span className={event.availableSeats < 10 ? 'text-orange-500' : ''}>{event.availableSeats}</span> / {event.totalSeats}
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="flex items-center gap-4 text-gray-600">
//                                 <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 shrink-0">
//                                     <FaCalendarAlt />
//                                 </div>
//                                 <div>
//                                     <p className="text-sm font-semibold text-gray-400 uppercase">Date</p>
//                                     <p className="font-bold text-gray-800">{new Date(event.date).toLocaleDateString()}</p>
//                                 </div>
//                             </div>

//                             <div className="flex items-center gap-4 text-gray-600">
//                                 <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 shrink-0">
//                                     <FaMapMarkerAlt />
//                                 </div>
//                                 <div>
//                                     <p className="text-sm font-semibold text-gray-400 uppercase">Location</p>
//                                     <p className="font-bold text-gray-800">{event.location}</p>
//                                 </div>
//                             </div>
//                         </div>

//                         {showOTP && (
//                             <div className="mb-4">
//                                 <label className="block text-sm font-semibold text-gray-700 mb-2">Enter OTP to Confirm</label>
//                                 <input
//                                     type="text"
//                                     required
//                                     placeholder="6-digit code"
//                                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-700 transition shadow-sm font-bold tracking-widest text-center text-lg"
//                                     value={otp}
//                                     onChange={(e) => setOtp(e.target.value)}
//                                     maxLength="6"
//                                 />
//                             </div>
//                         )}

//                         <button
//                             onClick={handleBooking}
//                             disabled={isSoldOut || bookingLoading || (showOTP && !otp)}
//                             className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition shadow-lg ${isSoldOut || (successMsg && !showOTP)
//                                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                                 : 'bg-gray-900 hover:bg-black text-white hover:shadow-xl hover:-translate-y-1'
//                                 }`}
//                         >
//                             {bookingLoading ? 'Processing...' : (showOTP ? 'Verify OTP & Confirm' : (successMsg && !showOTP ? 'Request Sent' : (isSoldOut ? 'Sold Out' : 'Confirm Registration')))}
//                         </button>
//                         {error && <p className="text-red-500 mt-4 text-center font-medium bg-red-50 p-2 rounded">{error}</p>}
//                         {successMsg && <p className="text-green-600 mt-4 text-center font-medium bg-green-50 p-2 rounded">{successMsg}</p>}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EventDetail;
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import { AuthContext } from '../context/AuthContext';
import { FaCalendarAlt, FaMapMarkerAlt, FaChair, FaMoneyBillWave } from 'react-icons/fa';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await api.get(`/events/${id}`);
                setEvent(data);
            } catch (err) {
                setError('Failed to load event details.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleBooking = async () => {
        if (!user) { navigate('/login'); return; }
        setBookingLoading(true);
        setError('');
        setSuccessMsg('');
        try {
            if (!showOTP) {
                await api.post('/bookings/send-otp');
                setShowOTP(true);
                setSuccessMsg('OTP sent to your email. Please verify to confirm booking.');
            } else {
                await api.post('/bookings', { eventId: event._id, otp });
                setSuccessMsg('Booking requested! Awaiting admin confirmation.');
                setShowOTP(false);
                setEvent({ ...event, availableSeats: event.availableSeats - 1 });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Booking failed');
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');
                .ed-state { min-height: 100vh; background: #080808; display: flex; align-items: center; justify-content: center; font-family: 'DM Sans', sans-serif; color: rgba(255,255,255,0.3); font-size: 1rem; padding-top: 68px; }
                .loading-dots::after { content: ''; animation: dots 1.2s steps(4, end) infinite; }
                @keyframes dots { 0%{content:''} 25%{content:'.'} 50%{content:'..'} 75%{content:'...'} }
            `}</style>
            <div className="ed-state"><span className="loading-dots">Loading event</span></div>
        </>
    );

    if (error && !event) return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600&display=swap');
                .ed-state { min-height: 100vh; background: #080808; display: flex; align-items: center; justify-content: center; font-family: 'DM Sans', sans-serif; color: rgba(239,68,68,0.7); font-size: 1rem; padding-top: 68px; }
            `}</style>
            <div className="ed-state">{error || 'Event not found'}</div>
        </>
    );

    const isSoldOut = event.availableSeats <= 0;
    const seatPct = (event.availableSeats / event.totalSeats) * 100;
    const lowSeats = event.availableSeats < 10 && event.availableSeats > 0;

    const btnLabel = bookingLoading
        ? 'Processing'
        : showOTP
            ? 'Verify OTP & Confirm'
            : (successMsg && !showOTP)
                ? 'Request Sent'
                : isSoldOut
                    ? 'Sold Out'
                    : 'Confirm Registration';

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');

                .ed-root {
                    min-height: 100vh;
                    background: #080808;
                    font-family: 'DM Sans', sans-serif;
                    color: #fff;
                    padding-top: 68px;
                    padding-bottom: 5rem;
                }

                /* Background grid */
                .ed-grid {
                    position: fixed;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
                    background-size: 48px 48px;
                    pointer-events: none;
                    z-index: 0;
                }

                .ed-container {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 3rem 2rem 0;
                    position: relative;
                    z-index: 1;
                    animation: fadeUp 0.5s ease forwards;
                    opacity: 0;
                }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* ── Hero image ── */
                .ed-hero {
                    width: 100%;
                    height: 380px;
                    border-radius: 16px;
                    overflow: hidden;
                    position: relative;
                    margin-bottom: 2.5rem;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.07);
                }

                .ed-hero img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .ed-hero-placeholder {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Syne', sans-serif;
                    font-weight: 800;
                    font-size: 3.5rem;
                    color: rgba(255,255,255,0.07);
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                }

                /* Gradient overlay on hero */
                .ed-hero::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 50%;
                    background: linear-gradient(to bottom, transparent, rgba(8,8,8,0.7));
                    pointer-events: none;
                }

                /* ── Layout ── */
                .ed-layout {
                    display: grid;
                    grid-template-columns: 1fr 340px;
                    gap: 2rem;
                    align-items: start;
                }

                @media (max-width: 768px) {
                    .ed-layout { grid-template-columns: 1fr; }
                    .ed-hero { height: 240px; }
                }

                /* ── Left: info ── */
                .ed-category {
                    display: inline-block;
                    background: rgba(255,255,255,0.07);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: rgba(255,255,255,0.5);
                    font-size: 0.7rem;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    padding: 5px 14px;
                    border-radius: 100px;
                    margin-bottom: 1.1rem;
                }

                .ed-title {
                    font-family: 'Syne', sans-serif;
                    font-weight: 800;
                    font-size: clamp(1.8rem, 4vw, 2.8rem);
                    letter-spacing: -0.03em;
                    line-height: 1.1;
                    color: #fff;
                    margin: 0 0 1.5rem;
                }

                .ed-desc {
                    font-size: 0.95rem;
                    color: rgba(255,255,255,0.45);
                    line-height: 1.8;
                    margin: 0;
                }

                /* ── Right: booking card ── */
                .ed-card {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.09);
                    border-radius: 14px;
                    padding: 1.75rem;
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    box-shadow: 0 0 0 1px rgba(255,255,255,0.03) inset, 0 24px 48px rgba(0,0,0,0.4);
                    position: sticky;
                    top: 88px;
                }

                .ed-card-title {
                    font-family: 'Syne', sans-serif;
                    font-weight: 800;
                    font-size: 1.1rem;
                    color: #fff;
                    margin: 0 0 1.5rem;
                    letter-spacing: -0.01em;
                }

                /* Divider */
                .ed-divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
                    margin: 1.25rem 0;
                }

                /* Stat rows */
                .ed-stat {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    margin-bottom: 1rem;
                }

                .ed-stat-icon {
                    width: 38px;
                    height: 38px;
                    border-radius: 10px;
                    background: rgba(255,255,255,0.07);
                    border: 1px solid rgba(255,255,255,0.09);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: rgba(255,255,255,0.5);
                    font-size: 0.9rem;
                    flex-shrink: 0;
                }

                .ed-stat-label {
                    font-size: 0.68rem;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.28);
                    margin-bottom: 2px;
                }

                .ed-stat-value {
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: #fff;
                }

                .stat-free { color: #86efac; }
                .stat-low  { color: #fb923c; }

                /* Seat bar */
                .ed-seat-bar-bg {
                    width: 100%;
                    height: 3px;
                    background: rgba(255,255,255,0.07);
                    border-radius: 100px;
                    margin-top: 8px;
                    overflow: hidden;
                }

                .ed-seat-bar-fill {
                    height: 100%;
                    background: rgba(255,255,255,0.45);
                    border-radius: 100px;
                    transition: width 0.6s ease;
                }

                /* OTP input */
                .ed-otp-label {
                    font-size: 0.72rem;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.35);
                    margin-bottom: 8px;
                    display: block;
                }

                .ed-otp-input {
                    width: 100%;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px;
                    padding: 12px;
                    color: #fff;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 1.4rem;
                    font-weight: 700;
                    letter-spacing: 0.5em;
                    text-align: center;
                    outline: none;
                    transition: all 0.25s ease;
                    box-sizing: border-box;
                    margin-bottom: 1rem;
                }

                .ed-otp-input:focus {
                    background: rgba(255,255,255,0.08);
                    border-color: rgba(255,255,255,0.3);
                    box-shadow: 0 0 0 3px rgba(255,255,255,0.05);
                }

                /* Book button */
                .ed-btn {
                    width: 100%;
                    padding: 13px;
                    border: none;
                    border-radius: 8px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.95rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    letter-spacing: 0.01em;
                }

                .ed-btn-active {
                    background: #fff;
                    color: #000;
                }

                .ed-btn-active::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%;
                    width: 100%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent);
                    transition: left 0.45s ease;
                }

                .ed-btn-active:hover:not(:disabled)::before { left: 100%; }

                .ed-btn-active:hover:not(:disabled) {
                    background: #e8e8e8;
                    transform: translateY(-1px);
                    box-shadow: 0 8px 24px rgba(255,255,255,0.12);
                }

                .ed-btn-active:disabled {
                    opacity: 0.45;
                    cursor: not-allowed;
                    transform: none;
                }

                .ed-btn-disabled {
                    background: rgba(255,255,255,0.06);
                    color: rgba(255,255,255,0.25);
                    cursor: not-allowed;
                    border: 1px solid rgba(255,255,255,0.07);
                }

                /* Feedback messages */
                .ed-error {
                    margin-top: 0.75rem;
                    background: rgba(239,68,68,0.08);
                    border: 1px solid rgba(239,68,68,0.18);
                    color: #f87171;
                    padding: 10px 14px;
                    border-radius: 8px;
                    font-size: 0.83rem;
                    text-align: center;
                    animation: shake 0.4s ease;
                }

                .ed-success {
                    margin-top: 0.75rem;
                    background: rgba(134,239,172,0.07);
                    border: 1px solid rgba(134,239,172,0.18);
                    color: #86efac;
                    padding: 10px 14px;
                    border-radius: 8px;
                    font-size: 0.83rem;
                    text-align: center;
                }

                @keyframes shake {
                    0%,100%{transform:translateX(0)} 20%{transform:translateX(-5px)} 40%{transform:translateX(5px)} 60%{transform:translateX(-3px)} 80%{transform:translateX(3px)}
                }

                .loading-dots::after {
                    content: '';
                    animation: dots 1.2s steps(4,end) infinite;
                }
                @keyframes dots { 0%{content:''} 25%{content:'.'} 50%{content:'..'} 75%{content:'...'} }
            `}</style>

            <div className="ed-root">
                <div className="ed-grid" />

                <div className="ed-container">
                    {/* Hero image */}
                    <div className="ed-hero">
                        {event.image
                            ? <img src={event.image} alt={event.title} />
                            : <div className="ed-hero-placeholder">{event.category}</div>
                        }
                    </div>

                    <div className="ed-layout">
                        {/* ── Left: details ── */}
                        <div>
                            <span className="ed-category">{event.category}</span>
                            <h1 className="ed-title">{event.title}</h1>
                            <p className="ed-desc">{event.description}</p>
                        </div>

                        {/* ── Right: booking card ── */}
                        <div className="ed-card">
                            <h3 className="ed-card-title">Booking Details</h3>

                            {/* Price */}
                            <div className="ed-stat">
                                <div className="ed-stat-icon"><FaMoneyBillWave /></div>
                                <div>
                                    <div className="ed-stat-label">Ticket Price</div>
                                    <div className="ed-stat-value">
                                        {event.ticketPrice === 0
                                            ? <span className="stat-free">Free</span>
                                            : `₹${event.ticketPrice}`}
                                    </div>
                                </div>
                            </div>

                            {/* Seats */}
                            <div className="ed-stat">
                                <div className="ed-stat-icon"><FaChair /></div>
                                <div style={{ width: '100%' }}>
                                    <div className="ed-stat-label">Availability</div>
                                    <div className="ed-stat-value">
                                        <span className={lowSeats ? 'stat-low' : ''}>{event.availableSeats}</span>
                                        <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}> / {event.totalSeats} seats</span>
                                    </div>
                                    <div className="ed-seat-bar-bg">
                                        <div className="ed-seat-bar-fill" style={{ width: `${seatPct}%` }} />
                                    </div>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="ed-stat">
                                <div className="ed-stat-icon"><FaCalendarAlt /></div>
                                <div>
                                    <div className="ed-stat-label">Date</div>
                                    <div className="ed-stat-value">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="ed-stat">
                                <div className="ed-stat-icon"><FaMapMarkerAlt /></div>
                                <div>
                                    <div className="ed-stat-label">Location</div>
                                    <div className="ed-stat-value">{event.location}</div>
                                </div>
                            </div>

                            <div className="ed-divider" />

                            {/* OTP field */}
                            {showOTP && (
                                <>
                                    <label className="ed-otp-label">Enter OTP to Confirm</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="000000"
                                        className="ed-otp-input"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        maxLength="6"
                                    />
                                </>
                            )}

                            {/* Book button */}
                            <button
                                onClick={handleBooking}
                                disabled={isSoldOut || bookingLoading || (showOTP && !otp) || (successMsg && !showOTP)}
                                className={`ed-btn ${isSoldOut || (successMsg && !showOTP) ? 'ed-btn-disabled' : 'ed-btn-active'}`}
                            >
                                {bookingLoading
                                    ? <span className="loading-dots">Processing</span>
                                    : btnLabel
                                }
                            </button>

                            {error && <div className="ed-error">{error}</div>}
                            {successMsg && <div className="ed-success">{successMsg}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventDetail;