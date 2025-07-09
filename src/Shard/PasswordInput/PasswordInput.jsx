import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordInput = ({ register, error, name = "password", label = "Password" }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <label className="label">{label}</label>

      <input
        type={showPassword ? "text" : "password"}
        placeholder={label}
        className="input input-bordered w-full focus:outline-none pr-12" // <== make space for icon
        {...register(name, {
          required: `${label} is required`,
        })}
      />

      {/* Eye icon inside the input field */}
      <span
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-[34px]  hover:text-info z-10 right-4 text-xl text-gray-500  cursor-pointer"
      >
        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </span>

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default PasswordInput;
