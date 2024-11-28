// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@anon-aadhaar/contracts/AnonAadhaarVerifier.sol";

contract AnonAadhaarVoting {
    AnonAadhaarVerifier public verifier;
    mapping(address => bool) public hasVoted;
    mapping(string => uint256) public voteCounts;
    string[] public candidates;

    constructor(address _verifierAddress, string[] memory _candidates) {
        verifier = AnonAadhaarVerifier(_verifierAddress);
        candidates = _candidates;
    }

    function vote(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[34] memory input,
        string memory candidate
    ) public {
        require(verifier.verifyProof(a, b, c, input), "Invalid proof");
        require(input[3] == 1, "Must be over 18");
        require(!hasVoted[msg.sender], "Already voted");
        
        bool validCandidate = false;
        for (uint i = 0; i < candidates.length; i++) {
            if (keccak256(bytes(candidates[i])) == keccak256(bytes(candidate))) {
                validCandidate = true;
                break;
            }
        }
        require(validCandidate, "Invalid candidate");

        voteCounts[candidate]++;
        hasVoted[msg.sender] = true;
    }

    function getCandidateResults() public view returns (string[] memory, uint256[] memory) {
        uint256[] memory results = new uint256[](candidates.length);
        for (uint i = 0; i < candidates.length; i++) {
            results[i] = voteCounts[candidates[i]];
        }
        return (candidates, results);
    }
}