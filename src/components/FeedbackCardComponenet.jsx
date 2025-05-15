import { useState } from "react";
import axios from "axios";
import userImage from "../assets/images/user_placeholder.jpg";

function FeedbackCard({ carId, renterId, onSubmitted }) {
    const [rate, setRate] = useState(5);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!rate || rate < 1 || rate > 5) {
            alert("Rating must be between 1 and 5");
            return;
        }

        const feedbackData = {
            carId,
            renterId,
            comment,
            rate,
            createdAt: new Date().toISOString()
        };

        try {
            setSubmitting(true);
            await axios.post("http://localhost:5000/api/feedback", feedbackData); // Update with your actual API URL
            alert("Feedback submitted!");
            if (onSubmitted) onSubmitted();
        } catch (err) {
            console.error(err);
            alert("Failed to submit feedback.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md max-w-xs hover:shadow-xl transition overflow-hidden">
            <img
                src={userImage}
                alt="User"
                className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="px-4 pb-4">
                <h2 className="text-lg font-bold mb-2">Leave Feedback</h2>

                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={rate}
                        onChange={(e) => setRate(parseInt(e.target.value))}
                        className="w-full border rounded p-2"
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700">Comment</label>
                    <textarea
                        rows="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full border rounded p-2"
                    ></textarea>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {submitting ? "Submitting..." : "Submit Feedback"}
                </button>
            </div>
        </div>
    );
}

export default FeedbackCard;
