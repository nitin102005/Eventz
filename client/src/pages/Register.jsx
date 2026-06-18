// import React, { useState, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate, Link } from 'react-router-dom';

// const Register = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [otp, setOtp] = useState('');
//     const [showOTP, setShowOTP] = useState(false);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);

//     const { register, verifyOTP } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');
//         try {
//             if (!showOTP) {
//                 await register(name, email, password);
//                 setShowOTP(true);
//                 setError('');
//             } else {
//                 await verifyOTP(email, otp);
//                 navigate('/dashboard');
//             }
//         } catch (err) {
//             setError(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
//             <div className="text-center mb-8">
//                 <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Create an Account</h2>
//                 <p className="text-gray-500">Join EVENTZ today</p>
//             </div>

//             {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-center shadow-inner border border-red-100">{error}</div>}

//             <form onSubmit={handleSubmit} className="space-y-5">
//                 {!showOTP ? (
//                     <>
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
//                             <input
//                                 type="text"
//                                 required
//                                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-700 transition shadow-sm"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
//                             <input
//                                 type="email"
//                                 required
//                                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-700 transition shadow-sm"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
//                             <input
//                                 type="password"
//                                 required
//                                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-700 transition shadow-sm"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                         </div>
//                     </>
//                 ) : (
//                     <div>
//                         <p className="text-sm text-green-700 bg-green-50 p-3 mb-4 rounded border border-green-200">
//                             An OTP has been sent to your email. Please verify your account.
//                         </p>
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
//                     className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-black focus:ring-4 focus:ring-gray-200 transition shadow-md mt-4"
//                 >
//                     {loading ? 'Processing...' : (showOTP ? 'Verify & Complete' : 'Sign Up')}
//                 </button>
//             </form>

//             {!showOTP && (
//                 <p className="text-center mt-6 text-gray-600">
//                     Already have an account? <Link to="/login" className="text-gray-900 font-bold hover:underline">Sign in</Link>
//                 </p>
//             )}
//         </div>
//     );
// };

// export default Register;
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaTicketAlt } from 'react-icons/fa';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register, verifyOTP } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (!showOTP) {
                await register(name, email, password);
                setShowOTP(true);
                setError('');
            } else {
                await verifyOTP(email, otp);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');

                .reg-page {
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

                /* Ambient orbs */
                .reg-page::before,
                .reg-page::after {
                    content: '';
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    pointer-events: none;
                    animation: drift 10s ease-in-out infinite alternate;
                }
                .reg-page::before {
                    width: 420px; height: 420px;
                    background: rgba(255,255,255,0.03);
                    top: -100px; right: -100px;
                }
                .reg-page::after {
                    width: 320px; height: 320px;
                    background: rgba(255,255,255,0.025);
                    bottom: -80px; left: -80px;
                    animation-delay: -5s;
                }

                @keyframes drift {
                    from { transform: translate(0,0) scale(1); }
                    to   { transform: translate(20px,20px) scale(1.05); }
                }

                /* Grid texture */
                .reg-grid {
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
                    background-size: 48px 48px;
                    pointer-events: none;
                }

                /* Card */
                .reg-card {
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
                    animation: cardIn 0.5s cubic-bezier(0.4,0,0.2,1) forwards;
                    opacity: 0;
                }

                @keyframes cardIn {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }



                /* Step indicator */
                .reg-steps {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    margin-bottom: 1.75rem;
                    animation: cardIn 0.5s 0.08s ease forwards;
                    opacity: 0;
                }

                .reg-step {
                    height: 3px;
                    border-radius: 100px;
                    transition: all 0.4s ease;
                }

                .reg-step-active {
                    width: 32px;
                    background: #fff;
                }

                .reg-step-done {
                    width: 32px;
                    background: rgba(255,255,255,0.5);
                }

                .reg-step-inactive {
                    width: 16px;
                    background: rgba(255,255,255,0.12);
                }

                /* Heading */
                .reg-heading {
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

                .reg-sub {
                    color: rgba(255,255,255,0.4);
                    font-size: 0.9rem;
                    text-align: center;
                    margin: 0 0 2rem;
                    animation: cardIn 0.5s 0.15s ease forwards;
                    opacity: 0;
                }

                /* Divider */
                .reg-divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
                    margin-bottom: 2rem;
                    animation: cardIn 0.5s 0.18s ease forwards;
                    opacity: 0;
                }

                /* Error */
                .reg-error {
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

                /* OTP sent notice */
                .reg-notice {
                    background: rgba(134,239,172,0.07);
                    border: 1px solid rgba(134,239,172,0.18);
                    color: #86efac;
                    padding: 12px 16px;
                    border-radius: 8px;
                    font-size: 0.855rem;
                    text-align: center;
                    margin-bottom: 1.5rem;
                }

                @keyframes shake {
                    0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)}
                }

                /* Form */
                .reg-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                    animation: cardIn 0.5s 0.2s ease forwards;
                    opacity: 0;
                }

                .reg-field {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .reg-label {
                    font-size: 0.72rem;
                    font-weight: 700;
                    color: rgba(255,255,255,0.4);
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                }

                .reg-input {
                    width: 100%;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px;
                    padding: 12px 16px;
                    color: #fff;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.95rem;
                    outline: none;
                    transition: all 0.25s ease;
                    box-sizing: border-box;
                }

                .reg-input::placeholder { color: rgba(255,255,255,0.18); }

                .reg-input:focus {
                    background: rgba(255,255,255,0.08);
                    border-color: rgba(255,255,255,0.35);
                    box-shadow: 0 0 0 3px rgba(255,255,255,0.05);
                }

                .reg-input-otp {
                    text-align: center;
                    font-size: 1.5rem;
                    font-weight: 700;
                    letter-spacing: 0.5em;
                    padding: 14px 16px;
                }

                .reg-otp-hint {
                    font-size: 0.78rem;
                    color: rgba(255,255,255,0.25);
                    text-align: center;
                    margin-top: -4px;
                }

                /* Submit button */
                .reg-btn {
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

                .reg-btn::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%;
                    width: 100%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent);
                    transition: left 0.45s ease;
                }

                .reg-btn:hover:not(:disabled)::before { left: 100%; }

                .reg-btn:hover:not(:disabled) {
                    background: #e8e8e8;
                    transform: translateY(-1px);
                    box-shadow: 0 8px 24px rgba(255,255,255,0.12);
                }

                .reg-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .loading-dots::after {
                    content: '';
                    animation: dots 1.2s steps(4,end) infinite;
                }
                @keyframes dots { 0%{content:''} 25%{content:'.'} 50%{content:'..'} 75%{content:'...'} }

                /* Footer */
                .reg-footer {
                    text-align: center;
                    margin-top: 1.75rem;
                    font-size: 0.875rem;
                    color: rgba(255,255,255,0.35);
                    animation: cardIn 0.5s 0.28s ease forwards;
                    opacity: 0;
                }

                .reg-footer a {
                    color: rgba(255,255,255,0.8);
                    font-weight: 600;
                    text-decoration: none;
                    position: relative;
                }

                .reg-footer a::after {
                    content: '';
                    position: absolute;
                    bottom: -1px; left: 0;
                    width: 0; height: 1px;
                    background: #fff;
                    transition: width 0.3s ease;
                }

                .reg-footer a:hover::after { width: 100%; }
                .reg-footer a:hover { color: #fff; }
            `}</style>

            <div className="reg-page">
                <div className="reg-grid" />

                <div className="reg-card">
                   

                    {/* Step indicator */}
                    {/* <div className="reg-steps">
                        <div className={`reg-step ${showOTP ? 'reg-step-done' : 'reg-step-active'}`} />
                        <div className={`reg-step ${showOTP ? 'reg-step-active' : 'reg-step-inactive'}`} />
                    </div> */}

                    <h2 className="reg-heading">
                        {showOTP ? 'Verify Your Email' : 'Create an Account'}
                    </h2>
                    <p className="reg-sub">
                        {showOTP ? 'Enter the code we sent you' : 'Join EVENTZ today'}
                    </p>

                    <div className="reg-divider" />

                    {/* Error */}
                    {error && <div className="reg-error">{String(error)}</div>}

                    {/* OTP notice */}
                    {showOTP && !error && (
                        <div className="reg-notice">
                            A verification code has been sent to your email.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="reg-form">
                        {!showOTP ? (
                            <>
                                <div className="reg-field">
                                    <label className="reg-label">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="reg-input"
                                        placeholder="Jane Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="reg-field">
                                    <label className="reg-label">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="reg-input"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="reg-field">
                                    <label className="reg-label">Password</label>
                                    <input
                                        type="password"
                                        required
                                        className="reg-input"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="reg-field">
                                <label className="reg-label">Verification Code</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="000000"
                                    className="reg-input reg-input-otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength="6"
                                />
                                <p className="reg-otp-hint">Enter the 6-digit code sent to your email</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="reg-btn"
                        >
                            {loading
                                ? <span className="loading-dots">Processing</span>
                                : showOTP ? 'Verify & Complete' : 'Create Account'
                            }
                        </button>
                    </form>

                    {!showOTP && (
                        <p className="reg-footer">
                            Already have an account?{' '}
                            <Link to="/login">Sign in</Link>
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Register;