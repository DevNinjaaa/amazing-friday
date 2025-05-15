import React from "react";

function ProposalCard({ proposal, onAccept, onReject }) {
    return (
        <div className="bg-white rounded-lg shadow-md max-w-xs hover:shadow-xl transition overflow-hidden">
            {/* You can add an image of the car if available */}
            <div className="px-4 pb-4">
                <h2 className="text-lg font-bold">
                    Proposal #{proposal.carProposalId} - Status: {proposal.status}
                </h2>

                <p className="text-sm text-gray-600 mb-1">
                    Renter ID: {proposal.renterId}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                    Car ID: {proposal.carId}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                    Submitted at: {new Date(proposal.submittedAt).toLocaleString()}
                </p>

                <div className="flex gap-2">
                    <button
                        onClick={onAccept}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                    >
                        Accept
                    </button>
                    <button
                        onClick={onReject}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                    >
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProposalCard;
