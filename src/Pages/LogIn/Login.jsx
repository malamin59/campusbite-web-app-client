import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase.config";
// import Swal from "sweetalert2";
import animation from "../../assets/Login-Animation - 1751988912123.json";
import Lottie from "lottie-react";
import SocalLogin from "../../Shard/SocalLogin";
import NavbarIcon from "../../Shard/Navbaricon";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Shard/LoadingSpinner/LoadingSpinner";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import PasswordInput from "../../Shard/PasswordInput/PasswordInput";
import Button from "../../Shard/Button/Button";

const Login = () => {
  const { signIn, loading } = useAuth();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
      Swal.fire("Login Successful", "Welcome back!");
      navigate(from);
      watch();
    } catch (error) {
      Swal.fire("Login Failed", error.message, "error");
    }
  };
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="">
      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 ">
        <div className="w-full max-w-5xl bg-base-100 shadow-xl rounded-lg flex flex-col lg:flex-row overflow-hidden">
          <div>
            <NavbarIcon />
          </div>
          {/* Lottie Animation */}
          <div className="w-full lg:w-1/2  flex items-center justify-center bg-base-100">
            <Lottie
              animationData={animation}
              loop={true}
              className="w-full h-96"
            />
          </div>

          {/* Login Form */}
          <div className="w-full lg:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-center mb-6">Login Now!</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="label">Email </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full focus:outline-none"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <PasswordInput
                register={register}
                error={errors.password}
                name="password"
                label="Password"
              />
              {/* Forgot Password */}
              <div className="text-right">
                <a className="link link-hover text-sm">Forgot password?</a>
              </div>
              {/* google login */}
              <SocalLogin />
              {/* Submit Button */}
             <Button type="submit"> Login</Button>
              <p className="text-center">
                New this site Please{" "}
                <small className="text-info underline">
                  {" "}
                  <Link to="/register"> register </Link>{" "}
                </small>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
