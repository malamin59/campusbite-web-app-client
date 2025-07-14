import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { imageUpload } from "../../../Api/Utils/util";
import useAuth from "../../../Hooks/useAuth";

const AddMeal = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();

  const onSubmit = async (data) => {
    setUploading(true);
    try {
      const imageFile = data.image?.[0];
      if (!imageFile) {
        Swal.fire("Error", "Please select an image", "error");
        return;
      }

      const imageUrl = await imageUpload(imageFile);

      const mealData = {
        title: data.title,
        category: data.category,
        image: imageUrl,
        ingredients: data.ingredients.split(",").map((i) => i.trim()),
        description: data.description,
        price: parseFloat(data.price),
        post_time: new Date().toISOString(),
        distributor_name: user?.displayName || "Admin",
        distributor_email: user?.email || "admin@example.com",
        rating: 0,
        likes: 0,
        reviews_count: 0,
      };
      console.log(mealData)

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/meals`,
        mealData
      );  

      if (res.data.insertedId) {
        Swal.fire("Success", "Meal added successfully!", "success");
        reset();
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        Swal.fire("Error", "Failed to add meal", "error");
      }
    } 


    
    catch (error)
     {
      console.error(error);
      Swal.fire("Error", "Something went wrong!", "error");
    } 
    finally {
      setUploading(false);
    }
  };

  return (
    <div className=" max-w-3xl w-full  m bg-base-200 p-4 rounded-lg shadow-md overflow-y-auto max-h-[90vh]">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Meal</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div>
          <label className="label" htmlFor="title">Title</label>
          <input
            id="title"
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full"
            placeholder="Meal title"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="label" htmlFor="category">Category</label>
          <select
            id="category"
            {...register("category", { required: "Category is required" })}
            className="select bg- select-bordered w-full"
          >
            <option value="">Select category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        {/* Image */}
        <div className="md:col-span-2">
          <label className="label" htmlFor="image">Meal Image</label>
          <input
            id="image"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            className="file-input file-input-bordered w-full"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        </div>

        {/* Ingredients */}
        <div className="md:col-span-2">
          <label className="label" htmlFor="ingredients">Ingredients</label>
          <textarea
            id="ingredients"
            {...register("ingredients", { required: "Ingredients required" })}
            className="textarea textarea-bordered w-full"
            placeholder="List ingredients separated by commas"
            rows={2}
          />
          {errors.ingredients && <p className="text-red-500 text-sm">{errors.ingredients.message}</p>}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="label" htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register("description", { required: "Description required" })}
            className="textarea textarea-bordered w-full"
            placeholder="Describe the meal"
            rows={2}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="label" htmlFor="price">Price (৳)</label>
          <input
            id="price"
            type="number"
            step="0.01"
            {...register("price", {
              required: "Price is required",
              min: { value: 0.01, message: "Price must be positive" },
            })}
            className="input input-bordered w-full"
            placeholder="Price in Taka"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        {/* Distributor Name */}
        <div>
          <label className="label">Distributor Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Distributor Email */}
        <div className="md:col-span-2">
          <label className="label">Distributor Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className={`btn btn-info w-full ${uploading ? "loading" : ""}`}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Add Meal"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMeal;
