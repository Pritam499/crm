import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice.js";
import Button from "./Button.jsx";

export default function Header() {
  const dispatch = useDispatch();
  return (
    <header className="h-16 bg-white flex items-center justify-between px-6 shadow">
      <h1 className="text-xl font-semibold">SoftQubic CRM</h1>
      <Button variant="outline" onClick={() => dispatch(logout())}>
        Logout
      </Button>
    </header>
  );
}
