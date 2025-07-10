import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import { auth } from "../firebase/firebase.config";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import { saveUsersDb } from "../Api/Utils/util";

const SocalLogin = () => {
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const { googleProvider } = useAuth();
  const handleGoogleSign = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const userData = {
      name: result?.user.displayName,
      email: result?.user?.email,
      image: result?.user?.photoURL,
    };
    await saveUsersDb(userData)
      .then((res) => {
        console.log(res);
        navigate(from);

        toast.success("Login Successful", "Welcome back!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button
        onClick={handleGoogleSign}
        type="button"
        className="btn  font-black w-full mt-4"
      >
        <FcGoogle size={24} /> Login in with Google
      </button>
    </div>
  );
};

export default SocalLogin;
