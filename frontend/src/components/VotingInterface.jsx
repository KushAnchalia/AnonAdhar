import React, { useState } from 'react';
import { useAnonAadhaar } from '@anon-aadhaar/react';
import { submitVote } from '../utils/contracts';

export const VotingInterface = () => {
    const { anonAadhaar } = useAnonAadhaar();
    const [selectedCandidate, setSelectedCandidate] = useState('');
    const candidates = ['Candidate A', 'Candidate B', 'Candidate C'];

    const handleVote = async () => {
        if (anonAadhaar?.status === 'logged in') {
            try {
                await submitVote(
                    anonAadhaar.proofData.a, 
                    anonAadhaar.proofData.b, 
                    anonAadhaar.proofData.c, 
                    anonAadhaar.proofData.input,
                    selectedCandidate
                );
                alert('Vote submitted successfully!');
            } catch (error) {
                console.error('Voting failed:', error);
                alert('Voting failed');
            }
        }
    };

    return (
        <div>
            <h2>Cast Your Vote</h2>
            {candidates.map((candidate) => (
                <button 
                    key={candidate}
                    onClick={() => setSelectedCandidate(candidate)}
                    className={`m-2 p-2 ${selectedCandidate === candidate ? 'bg-green-500' : 'bg-blue-500'}`}
                >
                    {candidate}
                </button>
            ))}
            <button 
                onClick={handleVote}
                disabled={!selectedCandidate || anonAadhaar?.status !== 'logged in'}
                className="bg-purple-500 text-white p-2 rounded"
            >
                Submit Vote
            </button>
        </div>
    );
};
