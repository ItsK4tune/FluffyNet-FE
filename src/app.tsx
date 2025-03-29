import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      {/* <h1>Welcome to My App</h1> */}
      <Outlet />
	    {/* <button className="bg-blue-500 text-white p-2 rounded">Click Me</button> */}
    </div>
  );
}

export default App;