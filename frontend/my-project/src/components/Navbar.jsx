import { useAuthStore } from "../store/useAuthStore"
import { FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {

  const {logout, authUser} = useAuthStore()

  return (
    <div>
        <header className="w-screen bg-zinc-800">
          <nav className="flex flex-row justify-around p-4">
            <div className="logo flex flex-row">
               <FiMessageSquare className="size-7 mr-2 p-1 rounded-md text-red-600 bg-red-800 bg-opacity-50"/>
               <h1 className="text-red-600 font-bold text-xl">LibertaryChat</h1>
            </div>
            <div>
              {authUser ? (
                <ul className="text-md text-red-600 text-semibold flex flex-row">
                  <Link to="/"><li className="ml-4 hover:underline px-4 py-1 rounded-lg bg-zinc-900">Home</li></Link>
                  <Link to="/settings"><li className="ml-4 hover:underline rounded-lg px-4 py-1 bg-zinc-900">Settings</li></Link>
                  <button onClick={logout} className="ml-4 hover:underline rounded-lg px-4 py-1 bg-zinc-900">Log Out</button>
                </ul>
              ) : (
                <ul className="text-md text-red-600 font-semibold flex flex-row">
                  <Link to="/signup"><li className="ml-4 px-4 py-1 hover:underline bg-zinc-900 rounded-lg">Signup</li></Link>
                  <Link to="/login"><li className="ml-4 px-4 py-1 hover:underline bg-zinc-900 rounded-lg">Login</li></Link>
                </ul>
              )}
            </div>
          </nav>
        </header>
    </div>
  )
}

export default Navbar