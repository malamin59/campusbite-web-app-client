import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth } from "../../firebase.config";
// import Swal from "sweetalert2";
import Lottie from "lottie-react";
import animation from "../../assets/register-Animation - 1751991442325 (1).json"; // your animation JSON file
import NavbarIcon from "../../Shard/Navbaricon";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import SocalLogin from "../../Shard/SocalLogin";
import LoadingSpinner from "../../Shard/LoadingSpinner/LoadingSpinner";
import { imageUpload } from "../../Api/Utils/util";
import PasswordInput from "../../Shard/PasswordInput/PasswordInput";
import Button from "../../Shard/Button/Button";

const Register = () => {
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const { createUser, loading, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      /* upload image to imgbb */
      const imageURL = await imageUpload(data.photoUrl?.[0]);
      /* create user i in firebase */
      const result = await createUser(data.email, data.password);
      /* update profile */
      await updateUserProfile(data.name, imageURL);
      Swal.fire("Registered!", "Account created successfully");
      navigate(from);
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
  };
  if (loading) return <LoadingSpinner />;
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8">
      <div className="w-full max-w-5xl bg-base-100 shadow-xl rounded-lg flex flex-col lg:flex-row overflow-hidden">
        <div>
          <NavbarIcon />
        </div>
        {/* Lottie Animation */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <Lottie animationData={animation} loop className="w-full h-96" />
        </div>

        {/* Register Form */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center mb-6">Register Now!</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="label">Name</label>
              <input
                type="text"
                className="input input-bordered w-full focus:outline-none"
                {...register("name", { required: "Name is required" })}
                placeholder="Your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered w-full focus:outline-none"
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Photo URL */}
            <div>
              <label className="label">Photo URL</label>
              <input
                type="file"
                accept="image/*"
                {...register("photoUrl", { required: "Photo is required" })}
                className="input input-bordered w-full focus:outline-none"
              />

              {errors.photoUrl && (
                <p className="text-red-500 text-sm">
                  {errors.photoUrl.message}
                </p>
              )}
            </div>

            {/* Password */}
            <PasswordInput
              register={register}
              error={errors.password}
              name="password"
              label="Password"
            />

            {/* google login */}
            <SocalLogin />

            <Button type="submit"> Register </Button>
            <p className="text-center">
              Already have a Please{" "}
              <small className="text-info underline">
                {" "}
                <Link to="/login"> login </Link>{" "}
              </small>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
