// import { useEffect, useState } from "react";
// import { Outlet } from "react-router-dom";

import PostItem from "./components/elements/PostItem";

const samplePost = {
	post_id: 1,
	user_id: 123,
	body: "This is a test post",
	image: "/images/placeholder.png",
	video: "",
	repost_id: 0,
	createdAt: new Date("2021-06-20T23:30:00.000Z"),
	updatedAt: new Date("2021-06-20T23:30:00.000Z"),
  };

  const samplePost1 = {
	post_id: 1,
	user_id: 123,
	body: "This is a test post",
	image: "",
	video: "",
	repost_id: 0,
	createdAt: new Date("2021-06-20T23:30:00.000Z"),
	updatedAt: new Date("2021-06-20T23:30:00.000Z"),
  };

function App() {
	// const [isLoading, setIsLoading] = useState(true);
	// useEffect(() => {}, []);

	return (
		<>
			{/* <Header /> */}
			{/* {!isLoading && <Outlet />} */}
			<div className="p-2 rounded-xl bg-gray-200 flex gap-2 align-center justify-center">
				<span className='mdi-filled'>mail</span>
				<input 
				  type="email" 
				  className="w-full" 
				  placeholder="Email" 
				/>
		        </div>
			
			<PostItem data={samplePost1} user_id={1}/>
			<PostItem data={samplePost} user_id={1}/>
			<PostItem data={samplePost} user_id={1}/>
			<PostItem data={samplePost} user_id={1}/>
		</>
	);
}

export default App;
