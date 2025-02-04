import { Outlet } from "react-router";
import "./Default.css";

function Default() {
  return (
    <div className="mx-auto max-w-[50vw] min-h-[50vh]">
      <h1 className="text-5xl font-bold mb-14">Kouizz</h1>
      <Outlet />
    </div>
  );
}

export default Default;
