import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

import { useParams } from "react-router";
import { imageUpload } from "../Api/Utils/util";
import useAuth from "../Hooks/useAuth";

const UpdateMeal = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();

  // Fetch existing meal
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/meals/${id}`).then((res) => {
      const meal = res.data;
      console.log("Fetched meal data:", meal);
      reset({
        title: meal.title,
        category: meal.category,
        ingredients: meal.ingredients.join(", "),
        description: meal.description,
        price: meal.price,
      });
    });
  }, [id, reset]);

  const onSubmit = async (data) => {
    setUploading(true);
    try {
      let imageUrl = null;

      const imageFile = data.image?.[0];
      if (imageFile) {
        imageUrl = await imageUpload(imageFile);
      }

      const updatedMeal = {
        title: data.title,
        category: data.category,
        ingredients: data.ingredients.split(",").map((i) => i.trim()),
        description: data.description,
        price: parseFloat(data.price),
      };

      if (imageUrl) {
        updatedMeal.image = imageUrl;
      }

      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/meals/${id}`,
        updatedMeal
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Meal updated successfully!", "success");
      } else {
        Swal.fire("Note", "No changes were made.", "info");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto bg-base-200 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Meal</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Title */}
        <div>
          <label className="label" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            {...register("title")}
            className="input input-bordered w-full"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="label" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            {...register("category")}
            className="select select-bordered w-full"
          >
            <option value="">Select category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>

        {/* Image */}
        <div className="md:col-span-2">
          <label className="label" htmlFor="image">
            Change Image (optional)
          </label>
          <input
            id="image"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            {...register("image")}
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Ingredients */}
        <div className="md:col-span-2">
          <label className="label" htmlFor="ingredients">
            Ingredients
          </label>
          <textarea
            id="ingredients"
            {...register("ingredients")}
            className="textarea textarea-bordered w-full"
            rows={2}
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="label" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            className="textarea textarea-bordered w-full"
            rows={2}
          />
        </div>

        {/* Price */}
        <div>
          <label className="label" htmlFor="price">
            Price (৳)
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            {...register("price", {
              min: { value: 0.01, message: "Price must be positive" },
            })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className={`btn btn-info w-full ${uploading ? "loading" : ""}`}
            disabled={uploading}
          >
            {uploading ? "Updating..." : "Update Meal"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMeal;
