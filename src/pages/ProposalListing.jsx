import React, { useState, useEffect } from "react";
import ProposalCard from "../components/ProposalCard";
import { useNavigate } from "react-router-dom";

function ProposalListing() {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const carOwner = localStorage.getItem("carOwner");
        if (carOwner !== "true") {
            navigate("/");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchProposals = async () => {
            const ownerId = localStorage.getItem("userId");

            if (!ownerId) {
                setError("Owner ID is missing from localStorage.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:5112/api/Proposal?ownerId=${ownerId}`);
                const text = await response.text();

                let data;
                try {
                    data = JSON.parse(text);
                } catch (e) {
                    throw new Error("Response is not valid JSON: " + text);
                }

                // Check response validity
                if (!Array.isArray(data)) {
                    throw new Error("Unexpected response structure.");
                }

                setProposals(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProposals();
    }, []);

    const updateProposalStatus = async (id, status) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:5112/api/proposal/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) throw new Error(`Failed to ${status.toLowerCase()} proposal`);

            setProposals((prev) =>
                prev.map((proposal) =>
                    proposal.carProposalId === id ? { ...proposal, status } : proposal
                )
            );
        } catch (err) {
            console.error(err);
            alert(`Error: ${err.message}`);
        }
    };

    const handleAccept = (id) => updateProposalStatus(id, "Accepted");
    const handleReject = (id) => updateProposalStatus(id, "Rejected");

    const filteredProposals = proposals.filter((proposal) =>
        proposal.renterId.toString().includes(searchTerm) ||
        proposal.carId.toString().includes(searchTerm)
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 bg-slate-950">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
            </div>
        );
    }

    return (
        <div className="py-12 p-20 bg-slate-950">
            <h1 className="text-3xl font-extrabold text-white mb-8">Car Proposals</h1>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
                    <p className="text-red-700">Error loading proposals: {error}</p>
                </div>
            )}

            {!error && proposals.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="Search by renter ID or car ID..."
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            )}

            {!error && filteredProposals.length > 0 && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {filteredProposals.map((proposal) => (
                        <ProposalCard
                            key={proposal.carProposalId}
                            proposal={proposal}
                            onAccept={() => handleAccept(proposal.carProposalId)}
                            onReject={() => handleReject(proposal.carProposalId)}
                        />
                    ))}
                </div>
            )}

            {!error && proposals.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-white text-lg">No proposals are available at the moment.</p>
                </div>
            )}

            {!error && proposals.length > 0 && filteredProposals.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-white text-lg">No proposals match your search.</p>
                </div>
            )}
        </div>
    );
}

export default ProposalListing;
