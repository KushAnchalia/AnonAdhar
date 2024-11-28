import React from 'react';
import { useAnonAadhaar } from '@anon-aadhaar/react';

export const AadhaarLogin: React.FC = () => {
    const { login, anonAadhaar } = useAnonAadhaar();

    return (
        <div>
            {anonAadhaar?.status === 'logged out' && (
                <button onClick={() => login()} className="bg-blue-500 text-white p-2 rounded">
                    Login with Anon Aadhaar
                </button>
            )}
            {anonAadhaar?.status === 'logged in' && (
                <div>
                    <p>Successfully Authenticated!</p>
                </div>
            )}
        </div>
    );
};