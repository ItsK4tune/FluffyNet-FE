// import { useEffect, useState } from "react";
// import { Outlet } from "react-router-dom";

function App() {
	// const [isLoading, setIsLoading] = useState(true);
	// useEffect(() => {}, []);

	return (
		<>
			{/* <Header /> */}
			{/* {!isLoading && <Outlet />} */}
			<div className="p-2 rounded-xl bg-gray-200 flex gap-2">
				<span className='mdi-filled'>mail</span>
				<input 
				  type="email" 
				  className="w-full" 
				  placeholder="Email" 
				/>
		        </div>
		</>
	);
}

export default App;
