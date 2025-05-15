import userImage from "../assets/images/user_placeholder.jpg";

function RequestCard({ data, onAccept, onReject }) {
  return (
    <div className="bg-white rounded-lg shadow-md max-w-xs hover:shadow-xl transition overflow-hidden">
      <img
        src={userImage || "/api/placeholder/320/200"}
        className="w-full h-48 object-cover rounded-t-lg"
      />

      <div className="px-4 pb-4">
        <h2 className="text-lg font-bold">{data.username}</h2>
        <div className="text-sm text-gray-600 mb-2">
          Requested at {new Date(data.requestedAt).toLocaleString()}
        </div>

        <h3 className="text-md font-semibold text-gray-800 mb-2">
          Type: {data.requestType}
        </h3>

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
export default RequestCard;
