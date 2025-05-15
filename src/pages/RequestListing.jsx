import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RequestCard from "../components/RequestCard";

function RequestListing() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // Redirect non-admin users
    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role !== "Admin") {
            navigate("/");
        }
    }, [navigate]);

    // Fetch approval requests
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch("http://localhost:5112/api/UserRequest/approval_request");
                console.log(response)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setRequests(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    // Update request approval status
    const updateRequestStatus = async (id, status) => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(`http://localhost:5112/api/UserRequest/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ id, status }),
            });

            if (!response.ok) throw new Error(`Failed to ${status.toLowerCase()} request`);

            setRequests((prev) => prev.filter((req) => req.requestId !== id));
        } catch (err) {
            console.error(err);
            alert(`Error: ${err.message}`);
        }
    };
    const handleAccept = (id) => updateRequestStatus(id, "Approved");
    const handleReject = (id) => updateRequestStatus(id, "Rejected");

    // Filter requests by username
    const filteredRequests = requests

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 bg-slate-950">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
            </div>
        );
    }

    return (
        <div className="py-12 p-20 bg-slate-950">
            <h1 className="text-3xl font-extrabold text-white mb-8">Approval Requests</h1>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
                    <p className="text-red-700">Error loading requests: {error}</p>
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search by username..."
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredRequests.map((req) => (
                    <RequestCard
                        key={req.requestId}
                        data={req}
                        onAccept={() => handleAccept(req.requestId)}
                        onReject={() => handleReject(req.requestId)}
                    />
                ))}
            </div>

            {filteredRequests.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-white text-lg">No matching requests found.</p>
                </div>
            )}
        </div>
    );
}

export default RequestListing;
