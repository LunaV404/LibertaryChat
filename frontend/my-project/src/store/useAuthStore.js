import { create } from "zustand";
import toast, { Toaster } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    
    checkAuth: async() => {
        try {
            const response = axiosInstance.get("/auth/check");

            set({authUser: response.data})
        } catch (error) {
            set({authUser:null});
            console.log("Error in checkingAuth:", error)
        } finally {
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        try {
            set({isSigningUp: true});
    
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser: res.data});
            toast.success("Account created successfully !!");
    
        } catch (error) {
            // Vérifier si `error.response` est défini avant d'y accéder
            console.error("Error details:", error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message); // Message d'erreur spécifique
            } else {
                // Si `error.response` est indéfini, afficher un message générique
                toast.error("An unexpected error occurred. Please try again later.");
            }
        } finally {
            set({isSigningUp: false});
        }
    },

    logout: async() => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("Logged Out successfully")
        } catch (error) {
            toast.error(error.response.data.message)
            console.error("Error: ", error.message)
        }
    }
}) )