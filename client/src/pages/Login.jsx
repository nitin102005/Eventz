// import React, { useState, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate, Link } from 'react-router-dom';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [otp, setOtp] = useState('');
//     const [showOTP, setShowOTP] = useState(false);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);

//     const { login, verifyOTP } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');
//         try {
//             if (!showOTP) {
//                 const data = await login(email, password);
//                 if (data.role === 'admin') navigate('/admin');
//                 else navigate('/dashboard');
//             } else {
//                 const data = await verifyOTP(email, otp);
//                 if (data.role === 'admin') navigate('/admin');
//                 else navigate('/dashboard');
//             }
//         } catch (err) {
//             if (err.needsVerification) {
//                 setShowOTP(true);
//                 setError('Account not verified. A new OTP has been sent to your email.');
//             } else {
//                 setError(err.message || err);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
//             <div className="text-center mb-8">
//                 <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
//                 <p className="text-gray-500">Sign in to your EVENTZ account</p>
//             </div>

//             {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-center shadow-inner border border-red-100">{error}</div>}

//             <form onSubmit={handleSubmit} className="space-y-6">
//                 {!showOTP ? (
//                     <>
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
//                             <input
//                                 type="email"
//                                 required
//                                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-700 focus:border-gray-700 transition shadow-sm"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
//                             <input
//                                 type="password"
//                                 required
//                                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-700 focus:border-gray-700 transition shadow-sm"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                         </div>
//                     </>
//                 ) : (
//                     <div>
//                         <label className="block text-sm font-semibold text-gray-700 mb-2">Verification Code (OTP)</label>
//                         <input
//                             type="text"
//                             required
//                             placeholder="6-digit code"
//                             className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-700 transition shadow-sm font-bold tracking-widest text-center text-lg"
//                             value={otp}
//                             onChange={(e) => setOtp(e.target.value)}
//                             maxLength="6"
//                         />
//                     </div>
//                 )}
//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-black focus:ring-4 focus:ring-gray-200 transition shadow-md"
//                 >
//                     {loading ? 'Processing...' : (showOTP ? 'Verify OTP & Log In' : 'Sign In')}
//                 </button>
//             </form>

//             <p className="text-center mt-8 text-gray-600">
//                 Don't have an account? <Link to="/register" className="text-gray-900 font-bold hover:underline">Sign up</Link>
//             </p>
//         </div>
//     );
// };

// export default Login;



import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaTicketAlt } from 'react-icons/fa';
import { TbCalendarEvent } from "react-icons/tb";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, verifyOTP } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (!showOTP) {
                const data = await login(email, password);
                if (data.role === 'admin') navigate('/admin');
                else navigate('/dashboard');
            } else {
                const data = await verifyOTP(email, otp);
                if (data.role === 'admin') navigate('/admin');
                else navigate('/dashboard');
            }
        } catch (err) {
            if (err.needsVerification) {
                setShowOTP(true);
                setError('Account not verified. A new OTP has been sent to your email.');
            } else {
                setError(err.message || err);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');

                .login-page {
                    min-height: 100vh;
                    background: #080808;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'DM Sans', sans-serif;
                    padding: 2rem 1rem;
                    position: relative;
                    overflow: hidden;
                }

                /* Ambient background orbs */
                .login-page::before,
                .login-page::after {
                    content: '';
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    pointer-events: none;
                    animation: drift 10s ease-in-out infinite alternate;
                }

                .login-page::before {
                    width: 420px;
                    height: 420px;
                    background: rgba(255,255,255,0.03);
                    top: -100px;
                    right: -100px;
                }

                .login-page::after {
                    width: 320px;
                    height: 320px;
                    background: rgba(255,255,255,0.025);
                    bottom: -80px;
                    left: -80px;
                    animation-delay: -5s;
                }

                @keyframes drift {
                    from { transform: translate(0, 0) scale(1); }
                    to   { transform: translate(20px, 20px) scale(1.05); }
                }

                /* Grid texture */
                .login-grid {
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
                    background-size: 48px 48px;
                    pointer-events: none;
                }

                /* Card */
                .login-card {
                    position: relative;
                    z-index: 1;
                    width: 100%;
                    max-width: 420px;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.09);
                    border-radius: 16px;
                    padding: 2.75rem 2.5rem;
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    box-shadow:
                        0 0 0 1px rgba(255,255,255,0.04) inset,
                        0 32px 64px rgba(0,0,0,0.5);
                    animation: cardIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                    opacity: 0;
                }

                @keyframes cardIn {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* Logo */
                .login-logo {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    text-decoration: none;
                    margin-bottom: 2rem;
                    font-family: 'Syne', sans-serif;
                    font-weight: 800;
                    font-size: 1.4rem;
                    color: #fff;
                    animation: cardIn 0.5s 0.05s ease forwards;
                    opacity: 0;
                }

                .login-logo-icon {
                    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .login-logo:hover .login-logo-icon {
                    transform: rotate(-15deg) scale(1.15);
                }

                .login-logo-text {
                    background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                /* Header text */
                .login-heading {
                    font-family: 'Syne', sans-serif;
                    font-weight: 800;
                    font-size: 1.75rem;
                    color: #fff;
                    text-align: center;
                    margin: 0 0 6px;
                    letter-spacing: -0.02em;
                    animation: cardIn 0.5s 0.1s ease forwards;
                    opacity: 0;
                }

                .login-sub {
                    color: rgba(255,255,255,0.4);
                    font-size: 0.9rem;
                    text-align: center;
                    margin: 0 0 2rem;
                    animation: cardIn 0.5s 0.15s ease forwards;
                    opacity: 0;
                }

                /* Divider */
                .login-divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
                    margin-bottom: 2rem;
                    animation: cardIn 0.5s 0.18s ease forwards;
                    opacity: 0;
                }

                /* Error */
                .login-error {
                    background: rgba(239,68,68,0.08);
                    border: 1px solid rgba(239,68,68,0.2);
                    color: #f87171;
                    padding: 12px 16px;
                    border-radius: 8px;
                    font-size: 0.875rem;
                    text-align: center;
                    margin-bottom: 1.5rem;
                    animation: shake 0.4s ease;
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20%       { transform: translateX(-6px); }
                    40%       { transform: translateX(6px); }
                    60%       { transform: translateX(-4px); }
                    80%       { transform: translateX(4px); }
                }

                /* Form */
                .login-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                    animation: cardIn 0.5s 0.2s ease forwards;
                    opacity: 0;
                }

                .login-field {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .login-label {
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: rgba(255,255,255,0.5);
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                }

                .login-input {
                    width: 100%;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px;
                    padding: 12px 16px;
                    color: #fff;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.95rem;
                    transition: all 0.25s ease;
                    outline: none;
                    box-sizing: border-box;
                }

                .login-input::placeholder {
                    color: rgba(255,255,255,0.2);
                }

                .login-input:focus {
                    background: rgba(255,255,255,0.08);
                    border-color: rgba(255,255,255,0.35);
                    box-shadow: 0 0 0 3px rgba(255,255,255,0.05);
                }

                .login-input-otp {
                    text-align: center;
                    font-size: 1.5rem;
                    font-weight: 700;
                    letter-spacing: 0.5em;
                    padding: 14px 16px;
                }

                /* OTP hint */
                .otp-hint {
                    text-align: center;
                    font-size: 0.8rem;
                    color: rgba(255,255,255,0.3);
                    margin-top: -4px;
                }

                /* Submit button */
                .login-btn {
                    width: 100%;
                    background: #fff;
                    color: #000;
                    border: none;
                    border-radius: 8px;
                    padding: 13px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.95rem;
                    font-weight: 700;
                    cursor: pointer;
                    letter-spacing: 0.01em;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    margin-top: 4px;
                }

                .login-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent);
                    transition: left 0.45s ease;
                }

                .login-btn:hover:not(:disabled)::before {
                    left: 100%;
                }

                .login-btn:hover:not(:disabled) {
                    background: #e8e8e8;
                    transform: translateY(-1px);
                    box-shadow: 0 8px 24px rgba(255,255,255,0.12);
                }

                .login-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                /* Loading dots */
                .loading-dots::after {
                    content: '';
                    animation: dots 1.2s steps(4, end) infinite;
                }

                @keyframes dots {
                    0%   { content: ''; }
                    25%  { content: '.'; }
                    50%  { content: '..'; }
                    75%  { content: '...'; }
                }

                /* Footer link */
                .login-footer {
                    text-align: center;
                    margin-top: 1.75rem;
                    font-size: 0.875rem;
                    color: rgba(255,255,255,0.35);
                    animation: cardIn 0.5s 0.28s ease forwards;
                    opacity: 0;
                }

                .login-footer a {
                    color: rgba(255,255,255,0.8);
                    font-weight: 600;
                    text-decoration: none;
                    position: relative;
                }

                .login-footer a::after {
                    content: '';
                    position: absolute;
                    bottom: -1px;
                    left: 0;
                    width: 0;
                    height: 1px;
                    background: #fff;
                    transition: width 0.3s ease;
                }

                .login-footer a:hover::after {
                    width: 100%;
                }

                .login-footer a:hover {
                    color: #fff;
                }
            `}</style>

            <div className="login-page">
                <div className="login-grid" />

                <div className="login-card">
                    {/* Logo */}
                    <Link to="/" className="login-logo">
                        <span className="login-logo-icon"><TbCalendarEvent /></span>
                        <span className="login-logo-text">EVENTZ</span>
                    </Link>

                    {/* Heading */}
                    <h2 className="login-heading">Welcome Back</h2>
                    <p className="login-sub">Sign in to your EVENTZ account</p>

                    <div className="login-divider" />

                    {/* Error */}
                    {error && <div className="login-error">{error}</div>}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="login-form">
                        {!showOTP ? (
                            <>
                                <div className="login-field">
                                    <label className="login-label">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="login-input"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="login-field">
                                    <label className="login-label">Password</label>
                                    <input
                                        type="password"
                                        required
                                        className="login-input"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="login-field">
                                <label className="login-label">Verification Code</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="000000"
                                    className="login-input login-input-otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength="6"
                                />
                                <p className="otp-hint">Enter the 6-digit code sent to your email</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="login-btn"
                        >
                            {loading
                                ? <span className="loading-dots">Processing</span>
                                : (showOTP ? 'Verify & Sign In' : 'Sign In')
                            }
                        </button>
                    </form>

                    <p className="login-footer">
                        Don't have an account?{' '}
                        <Link to="/register">Sign up</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;