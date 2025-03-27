// import { useEffect, useState } from "react";
// import { Outlet } from "react-router-dom";
// import { InputForm } from "./components/elements/input-form";
// import { PostItem } from "./components/post-item";
import { Login } from "./pages/login";

// const samplePost = {
// 	post_id: 1,
// 	user_id: 123,
// 	body: "This is a test post",
// 	image: "/images/placeholder.png",
// 	video: "",
// 	repost_id: 0,
// 	createdAt: new Date("2021-06-20T23:30:00.000Z"),
// 	updatedAt: new Date("2021-06-20T23:30:00.000Z"),
// };

// const samplePost1 = {
// 	post_id: 1,
// 	user_id: 123,
// 	body: "This is a test post",
// 	image: "",
// 	video: "",
// 	repost_id: 0,
// 	createdAt: new Date("2021-06-20T23:30:00.000Z"),
// 	updatedAt: new Date("2021-06-20T23:30:00.000Z"),
// };

function App() {
	// const [isLoading, setIsLoading] = useState(true);
	// useEffect(() => {}, []);

	return (
		<>
			{/* <Header /> */}
			{/* {!isLoading && <Outlet />} */}
			
			<Login/>

			{/* <PostItem data={samplePost1} user_id={1}/>
			<PostItem data={samplePost} user_id={1}/>
			<PostItem data={samplePost} user_id={1}/>
			<PostItem data={samplePost} user_id={1}/> */}
		</>
	);
}

export default App;
