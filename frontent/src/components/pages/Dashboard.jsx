import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ color: "#333" }}>
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;