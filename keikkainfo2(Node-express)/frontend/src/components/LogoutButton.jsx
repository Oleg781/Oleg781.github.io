import { useNavigate } from "react-router-dom";

export default function LogoutButton({ onLogout }) {
  const navigate = useNavigate();

  const handleClick = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <button onClick={handleClick} className="logout-btn">
      Kirjaudu ulos
    </button>
  );
}
