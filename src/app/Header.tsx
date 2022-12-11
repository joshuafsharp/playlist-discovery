// import React from "react";
// import Image from "next/image";
// import { Home, User } from "heroicons-react";
// import {} from "@supabase/supabase-js";

// async function signInWithSpotify() {
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: "spotify",
//   });
// }

// async function signout() {
//   const { error } = await supabase.auth.signOut();
// }

// const Header = () => {
//   return (
//     <div className="flex w-full items-center justify-between bg-gray-800 py-4 px-6 text-white">
//       <Image
//         src="https://via.placeholder.com/24"
//         alt="Spotify logo"
//         width={24}
//         height={24}
//       />

//       <div className="flex w-auto items-center">
//         <a href="/home" className="mr-6 text-white hover:text-gray-300">
//           <Home className="text-white" />
//         </a>
//         <a href="/profile" className="mr-6 text-white hover:text-gray-300">
//           <User className="text-white" />
//         </a>

//         <button
//           className="bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
//           onClick={signInWithSpotify}
//         >
//           Log In
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Header;
