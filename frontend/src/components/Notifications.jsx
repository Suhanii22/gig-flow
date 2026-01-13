import { useSocket } from "../context/SocketContext";

const Notifications = () => {
  const { notifications } = useSocket();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 bg-yellow-100 p-2 rounded shadow">
      {notifications.map((n, idx) => (
        <p key={idx}>📢 {n.message}</p>
      ))}
    </div>
  );
};

export default Notifications;
