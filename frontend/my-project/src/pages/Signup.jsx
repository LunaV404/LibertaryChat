import { FiMessageSquare } from "react-icons/fi";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { CiLock, CiUser, CiVoicemail } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast, { Toaster } from "react-hot-toast";


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });


  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.username.trim()) return toast.error("Username is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid format email")
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be atleast 6 characters");

    return true

  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success===true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col gap-2 items-center group">
              <div className="size-12 rounded-xl bg-violet-950 bg-opacity-50	 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <FiMessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started</p>
            </div>
          </div>
          {/* End Logo */}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center justify-center mx-auto space-y-4">
              {/* Username Input */}
              <div className="flex items-center w-full border border-gray-300 rounded-lg px-3 py-2">
                <CiUser className="text-gray-500 text-xl mr-2" />
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full outline-none bg-transparent"
                  value={formData.username}
                />
              </div>

              {/* Email Input */}
              <div className="flex items-center w-full border border-gray-300 rounded-lg px-3 py-2">
                <CiVoicemail className="text-gray-500 text-xl mr-2" />
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full outline-none bg-transparent"
                  value={formData.email}
                />
              </div>

              {/* Password Input */}
              <div className="relative w-full border border-gray-300 rounded-lg px-3 py-2 flex items-center">
                <CiLock className="text-gray-500 text-xl mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Password"
                  className="w-full outline-none bg-transparent"
                  value={formData.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-500 text-xl"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
             {/* Submit Button */}
                <button 
                  className="btn btn-outline btn-primary w-full flex items-center justify-center"
                  disabled={isSigningUp} // Désactive le bouton pendant l'envoi
                >
                {isSigningUp ? (
                  <div className="flex items-center">
                    <FaSpinner className="size-5 animate-spin mr-2" />
                    Submitting...
                  </div>
                ) : (
                "Submit"
                )}
            </button>
          {/* End Submit Button */}
            </div>
            <p className="text-center mt-4">Already have an account? <Link to="/login"><span className="link link-primary">Sign In</span> </Link></p>
          </form>
          {/* End Form */}
        </div>
      </div>
          {/* Right Side */}
          <AuthImagePattern title="Join our community" subtitle="Connect with anarchist and communist comrade !"/>
    </div>
  );
};

export default Signup;
