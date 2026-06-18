// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../utils/axios';
// import { FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaRegClock, FaTicketAlt, FaShieldAlt } from 'react-icons/fa';

// const Home = () => {
//     const [events, setEvents] = useState([]);
//     const [search, setSearch] = useState('');
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const timeoutId = setTimeout(() => {
//             fetchEvents();
//         }, 400); // 400ms debounce
//         return () => clearTimeout(timeoutId);
//     }, [search]);

//     const fetchEvents = async () => {
//         try {
//             const { data } = await api.get(`/events?search=${search}`);
//             setEvents(data);
//         } catch (error) {
//             console.error('Error fetching events:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex flex-col min-h-screen">
//             {/* Hero Section */}
//             <div className="relative bg-black text-white rounded-3xl overflow-hidden mb-12 shadow-2xl">
//                 <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=3000&auto=format&fit=crop')] bg-cover bg-center"></div>
//                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
//                 <div className="relative p-10 md:p-20 text-center flex flex-col items-center z-10">
//                     <span className="bg-white/20 text-white backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 border border-white/20">Welcome to EVENTZ</span>
//                     <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight drop-shadow-lg">
//                         Find Your Next <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Unforgettable</span> Experience
//                     </h1>
//                     <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
//                         Discover the best tech conferences, late-night music festivals, and hands-on workshops happening directly in your area. Secure your spot today.
//                     </p>

//                     <div className="w-full max-w-2xl mx-auto relative flex items-center shadow-2xl group">
//                         <FaSearch className="absolute left-6 text-gray-500 text-xl group-focus-within:text-black transition-colors" />
//                         <input
//                             type="text"
//                             placeholder="Search events by title..."
//                             className="w-full pl-16 pr-6 py-5 rounded-full text-lg text-black bg-white/95 backdrop-blur-sm border-2 border-transparent focus:border-gray-500 focus:outline-none transition-all placeholder-gray-400 font-medium"
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* Why Choose Us / Features row */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-4">
//                 <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
//                     <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-md shadow-gray-200/50">
//                         <FaRegClock />
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Booking</h3>
//                     <p className="text-gray-500 text-sm leading-relaxed">Secure your tickets instantly with our fast streamlined booking infrastructure built for speed.</p>
//                 </div>
//                 <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
//                     <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-md shadow-gray-200/50">
//                         <FaTicketAlt />
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-3">Seamless Access</h3>
//                     <p className="text-gray-500 text-sm leading-relaxed">Download tickets instantly or manage them right from your personal dashboard with easily.</p>
//                 </div>
//                 <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
//                     <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-md shadow-gray-200/50">
//                         <FaShieldAlt />
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Platform</h3>
//                     <p className="text-gray-500 text-sm leading-relaxed">All transactions and registrations are bounded by cutting-edge security and 2FA OTP tech.</p>
//                 </div>
//             </div>

//             <div className="flex items-center justify-between mb-8 px-2 border-b border-gray-200 pb-4">
//                 <h2 className="text-3xl font-extrabold text-gray-900">Upcoming Events</h2>
//                 <div className="text-gray-500 font-medium">{events.length} results found</div>
//             </div>

//             {loading ? (
//                 <div className="text-center py-20 text-xl font-semibold text-gray-600">Loading events...</div>
//             ) : events.length === 0 ? (
//                 <div className="text-center py-20 text-xl text-gray-500">No events found matching your search.</div>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {events.map(event => (
//                         <div key={event._id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition flex flex-col">
//                             <div className="h-48 bg-gray-200 overflow-hidden relative">
//                                 {event.image ? (
//                                     <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
//                                 ) : (
//                                     <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 font-bold text-2xl">
//                                         {event.category || 'Event'}
//                                     </div>
//                                 )}
//                                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold shadow-sm">
//                                     {event.ticketPrice === 0 ? <span className="text-green-600">FREE</span> : <span className="text-gray-900">₹{event.ticketPrice}</span>}
//                                 </div>
//                             </div>
//                             <div className="p-6 flex-grow flex flex-col">
//                                 <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">{event.category}</div>
//                                 <h2 className="text-xl font-bold text-gray-800 mb-3">{event.title}</h2>
//                                 <div className="flex flex-col gap-2 mb-4 text-gray-600 text-sm">
//                                     <div className="flex items-center gap-2">
//                                         <FaCalendarAlt className="text-gray-400" />
//                                         <span>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
//                                     </div>
//                                     <div className="flex items-center gap-2">
//                                         <FaMapMarkerAlt className="text-gray-400" />
//                                         <span>{event.location}</span>
//                                     </div>
//                                 </div>
//                                 <div className="mt-auto">
//                                     <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
//                                         <div className="bg-gray-700 h-2 rounded-full" style={{ width: `${(event.availableSeats / event.totalSeats) * 100}%` }}></div>
//                                     </div>
//                                     <p className="text-xs text-gray-500 mb-4">{event.availableSeats} of {event.totalSeats} seats remaining</p>
//                                     <Link to={`/events/${event._id}`} className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2 rounded-lg transition">
//                                         View Details
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* Footer Section */}
//             <footer className="mt-auto pt-16 pb-8 border-t border-gray-200 text-center">
//                 <div className="flex justify-center items-center gap-2 mb-4">
//                     <FaTicketAlt className="text-gray-800 text-2xl" />
//                     <span className="text-xl font-bold text-gray-900">EVENTZ</span>
//                 </div>
//                 <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
//                     The simplest, most dynamic way to manage, discover, and host world-class events in your local city. Let's make memories together.
//                 </p>
//                 <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">
//                     &copy; {new Date().getFullYear()} EVENTZ Platform. All rights reserved.
//                 </div>
//             </footer>
//         </div>
//     );
// };

// export default Home;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/axios';
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaRegClock, FaTicketAlt, FaShieldAlt } from 'react-icons/fa';
import { TbCalendarEvent } from "react-icons/tb";

const Home = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchEvents();
        }, 400);
        return () => clearTimeout(timeoutId);
    }, [search]);

    const fetchEvents = async () => {
        try {
            const { data } = await api.get(`/events?search=${search}`);
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');

                .home-root {
                    min-height: 100vh;
                    background: #080808;
                    font-family: 'DM Sans', sans-serif;
                    color: #fff;
                    padding-top: 68px; /* navbar height */
                }

                /* ── HERO ── */
                .hero {
                    position: relative;
                    overflow: hidden;
                    padding: 100px 2rem 90px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .hero-bg {
                    position: absolute;
                    inset: 0;
                    background: url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=3000&auto=format&fit=crop') center/cover no-repeat;
                    opacity: 0.18;
                }

                .hero-gradient {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, transparent 0%, #080808 90%);
                }

                /* Grid overlay */
                .hero-grid {
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
                    background-size: 48px 48px;
                }

                .hero-content {
                    position: relative;
                    z-index: 2;
                    max-width: 780px;
                    margin: 0 auto;
                }

                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(255,255,255,0.07);
                    border: 1px solid rgba(255,255,255,0.12);
                    color: rgba(255,255,255,0.7);
                    padding: 6px 18px;
                    border-radius: 100px;
                    font-size: 0.72rem;
                    font-weight: 600;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    margin-bottom: 2rem;
                    animation: fadeUp 0.6s 0.1s ease forwards;
                    opacity: 0;
                }

                .hero-badge-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #fff;
                    animation: pulse 2s ease infinite;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50%       { opacity: 0.4; transform: scale(0.75); }
                }

                .hero-title {
                    font-family: 'Syne', sans-serif;
                    font-weight: 800;
                    font-size: clamp(2.8rem, 7vw, 5.5rem);
                    line-height: 1.05;
                    letter-spacing: -0.03em;
                    margin: 0 0 1.5rem;
                    animation: fadeUp 0.6s 0.2s ease forwards;
                    opacity: 0;
                }

                .hero-title-accent {
                    background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.45) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .hero-sub {
                    color: rgba(255,255,255,0.45);
                    font-size: 1.05rem;
                    line-height: 1.75;
                    max-width: 560px;
                    margin: 0 auto 3rem;
                    font-weight: 400;
                    animation: fadeUp 0.6s 0.3s ease forwards;
                    opacity: 0;
                }

                /* Search bar */
                .search-wrap {
                    width: 100%;
                    max-width: 580px;
                    position: relative;
                    animation: fadeUp 0.6s 0.4s ease forwards;
                    opacity: 0;
                }

                .search-icon {
                    position: absolute;
                    left: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: rgba(255,255,255,0.3);
                    font-size: 1rem;
                    transition: color 0.25s ease;
                    pointer-events: none;
                }

                .search-wrap:focus-within .search-icon {
                    color: rgba(255,255,255,0.7);
                }

                .search-input {
                    width: 100%;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 100px;
                    padding: 16px 24px 16px 52px;
                    color: #fff;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 1rem;
                    outline: none;
                    transition: all 0.25s ease;
                    box-sizing: border-box;
                    backdrop-filter: blur(12px);
                }

                .search-input::placeholder { color: rgba(255,255,255,0.25); }

                .search-input:focus {
                    background: rgba(255,255,255,0.09);
                    border-color: rgba(255,255,255,0.3);
                    box-shadow: 0 0 0 4px rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.4);
                }

                /* ── FEATURES ── */
                .features-section {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 1.25rem;
                    padding: 0 2rem 5rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .feature-card {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 14px;
                    padding: 2rem;
                    text-align: center;
                    transition: all 0.3s ease;
                    animation: fadeUp 0.5s ease forwards;
                    opacity: 0;
                }

                .feature-card:nth-child(1) { animation-delay: 0.1s; }
                .feature-card:nth-child(2) { animation-delay: 0.2s; }
                .feature-card:nth-child(3) { animation-delay: 0.3s; }

                .feature-card:hover {
                    background: rgba(255,255,255,0.07);
                    border-color: rgba(255,255,255,0.14);
                    transform: translateY(-4px);
                    box-shadow: 0 16px 40px rgba(0,0,0,0.4);
                }

                .feature-icon {
                    width: 52px;
                    height: 52px;
                    background: rgba(255,255,255,0.08);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    color: #fff;
                    margin: 0 auto 1.25rem;
                    transition: background 0.3s ease;
                }

                .feature-card:hover .feature-icon {
                    background: rgba(255,255,255,0.14);
                }

                .feature-title {
                    font-family: 'Syne', sans-serif;
                    font-weight: 700;
                    font-size: 1rem;
                    color: #fff;
                    margin: 0 0 8px;
                }

                .feature-desc {
                    font-size: 0.855rem;
                    color: rgba(255,255,255,0.4);
                    line-height: 1.65;
                    margin: 0;
                }

                /* ── EVENTS SECTION ── */
                .events-section {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem 6rem;
                }

                .events-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 2rem;
                    padding-bottom: 1.25rem;
                    border-bottom: 1px solid rgba(255,255,255,0.07);
                }

                .events-title {
                    font-family: 'Syne', sans-serif;
                    font-weight: 800;
                    font-size: 1.75rem;
                    color: #fff;
                    margin: 0;
                    letter-spacing: -0.02em;
                }

                .events-count {
                    font-size: 0.85rem;
                    color: rgba(255,255,255,0.35);
                    font-weight: 500;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.08);
                    padding: 5px 14px;
                    border-radius: 100px;
                }

                /* Loading / Empty */
                .events-loading,
                .events-empty {
                    text-align: center;
                    padding: 80px 0;
                    color: rgba(255,255,255,0.3);
                    font-size: 1rem;
                }

                .events-loading-dots::after {
                    content: '';
                    animation: dots 1.2s steps(4, end) infinite;
                }
                @keyframes dots {
                    0%   { content: ''; }
                    25%  { content: '.'; }
                    50%  { content: '..'; }
                    75%  { content: '...'; }
                }

                /* ── EVENT GRID ── */
                .events-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 1.5rem;
                }

                .event-card {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 14px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    transition: all 0.3s ease;
                    animation: fadeUp 0.45s ease forwards;
                    opacity: 0;
                }

                .event-card:hover {
                    background: rgba(255,255,255,0.065);
                    border-color: rgba(255,255,255,0.13);
                    transform: translateY(-4px);
                    box-shadow: 0 20px 48px rgba(0,0,0,0.5);
                }

                .event-img-wrap {
                    height: 196px;
                    position: relative;
                    overflow: hidden;
                    background: rgba(255,255,255,0.05);
                }

                .event-img-wrap img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                .event-card:hover .event-img-wrap img {
                    transform: scale(1.04);
                }

                .event-img-placeholder {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Syne', sans-serif;
                    font-weight: 800;
                    font-size: 1.3rem;
                    color: rgba(255,255,255,0.15);
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                }

                .event-price-badge {
                    position: absolute;
                    top: 14px;
                    right: 14px;
                    background: rgba(10,10,10,0.8);
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(255,255,255,0.12);
                    padding: 5px 12px;
                    border-radius: 100px;
                    font-size: 0.8rem;
                    font-weight: 700;
                }

                .price-free { color: #86efac; }
                .price-paid { color: #fff; }

                .event-body {
                    padding: 1.4rem;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 0;
                }

                .event-category {
                    font-size: 0.7rem;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.35);
                    margin-bottom: 8px;
                }

                .event-title {
                    font-family: 'Syne', sans-serif;
                    font-weight: 700;
                    font-size: 1.05rem;
                    color: #fff;
                    margin: 0 0 14px;
                    line-height: 1.35;
                    letter-spacing: -0.01em;
                }

                .event-meta {
                    display: flex;
                    flex-direction: column;
                    gap: 7px;
                    margin-bottom: 16px;
                }

                .event-meta-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.835rem;
                    color: rgba(255,255,255,0.4);
                }

                .event-meta-row svg {
                    color: rgba(255,255,255,0.2);
                    flex-shrink: 0;
                    font-size: 0.8rem;
                }

                .event-footer {
                    margin-top: auto;
                }

                /* Seat progress bar */
                .seat-bar-bg {
                    width: 100%;
                    height: 3px;
                    background: rgba(255,255,255,0.07);
                    border-radius: 100px;
                    margin-bottom: 7px;
                    overflow: hidden;
                }

                .seat-bar-fill {
                    height: 100%;
                    background: rgba(255,255,255,0.5);
                    border-radius: 100px;
                    transition: width 0.6s ease;
                }

                .seat-text {
                    font-size: 0.75rem;
                    color: rgba(255,255,255,0.25);
                    margin-bottom: 14px;
                }

                /* View details button */
                .event-btn {
                    display: block;
                    width: 100%;
                    text-align: center;
                    background: rgba(255,255,255,0.07);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: rgba(255,255,255,0.75);
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.875rem;
                    font-weight: 600;
                    padding: 10px;
                    border-radius: 8px;
                    text-decoration: none;
                    transition: all 0.25s ease;
                    box-sizing: border-box;
                }

                .event-btn:hover {
                    background: rgba(255,255,255,0.13);
                    border-color: rgba(255,255,255,0.22);
                    color: #fff;
                }

                /* ── FOOTER ── */
                .home-footer {
                    border-top: 1px solid rgba(255,255,255,0.07);
                    padding: 3rem 2rem;
                    text-align: center;
                }

                .footer-logo {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    font-family: 'Syne', sans-serif;
                    font-weight: 800;
                    font-size: 1.2rem;
                    color: #fff;
                    margin-bottom: 1rem;
                }

                .footer-desc {
                    font-size: 0.875rem;
                    color: rgba(255,255,255,0.3);
                    max-width: 400px;
                    margin: 0 auto 1.25rem;
                    line-height: 1.7;
                }

                .footer-copy {
                    font-size: 0.75rem;
                    color: rgba(255,255,255,0.18);
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                }

                /* ── ANIMATIONS ── */
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(18px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <div className="home-root">

                {/* ── Hero ── */}
                <section className="hero">
                    <div className="hero-bg" />
                    <div className="hero-grid" />
                    <div className="hero-gradient" />

                    <div className="hero-content">
                        <div className="hero-badge">
                            <span className="hero-badge-dot" />
                            Welcome to EVENTZ
                        </div>

                        <h1 className="hero-title">
                            Find Your Next<br />
                            <span className="hero-title-accent">Unforgettable</span> Experience
                        </h1>

                        <p className="hero-sub">
                            Discover the best tech conferences, late-night music festivals, and hands-on workshops. Secure your spot today.
                        </p>

                        <div className="search-wrap">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search events by title..."
                                className="search-input"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                {/* ── Features ── */}
                <div className="features-section">
                    {[
                        { icon: <FaRegClock />, title: 'Fast Booking', desc: 'Secure your tickets instantly with our streamlined booking infrastructure built for speed.' },
                        { icon: <TbCalendarEvent />, title: 'Seamless Access', desc: 'Download tickets instantly or manage them right from your personal dashboard with ease.' },
                        { icon: <FaShieldAlt />, title: 'Secure Platform', desc: 'All transactions and registrations are protected by cutting-edge security and 2FA OTP tech.' },
                    ].map((f, i) => (
                        <div className="feature-card" key={i}>
                            <div className="feature-icon">{f.icon}</div>
                            <h3 className="feature-title">{f.title}</h3>
                            <p className="feature-desc">{f.desc}</p>
                        </div>
                    ))}
                </div>

                {/* ── Events ── */}
                <div className="events-section">
                    <div className="events-header">
                        <h2 className="events-title">Upcoming Events</h2>
                        <span className="events-count">{events.length} results</span>
                    </div>

                    {loading ? (
                        <div className="events-loading">
                            <span className="events-loading-dots">Loading events</span>
                        </div>
                    ) : events.length === 0 ? (
                        <div className="events-empty">No events found matching your search.</div>
                    ) : (
                        <div className="events-grid">
                            {events.map((event, idx) => (
                                <div
                                    key={event._id}
                                    className="event-card"
                                    style={{ animationDelay: `${idx * 0.06}s` }}
                                >
                                    <div className="event-img-wrap">
                                        {event.image ? (
                                            <img src={event.image} alt={event.title} />
                                        ) : (
                                            <div className="event-img-placeholder">
                                                {event.category || 'Event'}
                                            </div>
                                        )}
                                        <div className="event-price-badge">
                                            {event.ticketPrice === 0
                                                ? <span className="price-free">FREE</span>
                                                : <span className="price-paid">₹{event.ticketPrice}</span>
                                            }
                                        </div>
                                    </div>

                                    <div className="event-body">
                                        <div className="event-category">{event.category}</div>
                                        <h2 className="event-title">{event.title}</h2>

                                        <div className="event-meta">
                                            <div className="event-meta-row">
                                                <FaCalendarAlt />
                                                <span>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                            </div>
                                            <div className="event-meta-row">
                                                <FaMapMarkerAlt />
                                                <span>{event.location}</span>
                                            </div>
                                        </div>

                                        <div className="event-footer">
                                            <div className="seat-bar-bg">
                                                <div
                                                    className="seat-bar-fill"
                                                    style={{ width: `${(event.availableSeats / event.totalSeats) * 100}%` }}
                                                />
                                            </div>
                                            <p className="seat-text">{event.availableSeats} of {event.totalSeats} seats remaining</p>
                                            <Link to={`/events/${event._id}`} className="event-btn">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ── Footer ── */}
                <footer className="home-footer">
                    <div className="footer-logo">
                    <TbCalendarEvent />
                        EVENTZ
                    </div>
                    <p className="footer-desc">
                        The simplest, most dynamic way to manage, discover, and host world-class events. Let's make memories together.
                    </p>
                    <div className="footer-copy">
                        &copy; {new Date().getFullYear()} EVENTZ Platform. All rights reserved.
                    </div>
                </footer>

            </div>
        </>
    );
};

export default Home;