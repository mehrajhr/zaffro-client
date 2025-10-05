import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const imgbbApiKey = import.meta.env.VITE_IMAGEBB_KEY;

console.log(imgbbApiKey);

const AddProduct = () => {
  const { register, handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      tags: [""],
      sizes: [{ size: "", stock: "" }],
      discountPrice: null,
    },
  });

  const {
    fields: tagFields,
    append: addTag,
    remove: removeTag,
  } = useFieldArray({ control, name: "tags" });
  const {
    fields: sizeFields,
    append: addSize,
    remove: removeSize,
  } = useFieldArray({ control, name: "sizes" });

  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);

  const watchImages1 = watch("image1");
  const watchImages2 = watch("image2");

  // Helper: generate slug from name
  const generateSlug = (name) =>
    name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

  const onSubmit = async (data) => {
    try {
      if (!data.image1?.[0] || !data.image2?.[0]) {
        Swal.fire({
          icon: "warning",
          title: "Two images required!",
          text: "Please upload exactly 2 images for the product.",
        });
        return;
      }

      setUploading(true);

      // Upload images separately
      const uploadedImages = [];
      for (let file of [data.image1[0], data.image2[0]]) {
        const formData = new FormData();
        formData.append("image", file);
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const imgData = await res.json();
        console.log(imgData);
        if (imgData.success) uploadedImages.push(imgData?.data?.display_url);
      }

      const newProduct = {
        name: data.name,
        slug: generateSlug(data.name),
        description: data.description,
        category: data.category,
        brand: data.brand,
        images: uploadedImages,
        price: parseFloat(data.price),
        discountPrice: parseFloat(data.discountPrice),
        tags: data.tags.filter((t) => t.trim() !== ""),
        sizes: data.sizes.filter((s) => s.size && s.stock),
        isNewArrival: data.isNewArrival === "true",
      };

      const res = await axiosSecure.post("/products", newProduct);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Product Added!",
          text: "Your product has been successfully added.",
          timer: 1500,
          showConfirmButton: false,
        });
        reset();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Add Product",
        text: error.message,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-base-200 min-h-screen p-6 rounded-lg">
      <h2 className="text-2xl text-black font-semibold mb-6 text-center">
        Add New Product
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto bg-base-100 p-6 rounded-xl shadow-md space-y-6 text-black"
      >
        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Product Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter product name"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              {...register("category", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select category</option>
              <option value="poloshirt">Poloshirt</option>
              <option value="tshirt">T-Shirt</option>
              <option value="hoodie">Hoodie</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            {...register("description")}
            placeholder="Product details..."
            className="textarea textarea-bordered w-full"
            rows="3"
          ></textarea>
        </div>

        {/* Brand & Price */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Brand</label>
            <input
              type="text"
              {...register("brand", { required: true })}
              placeholder="e.g. Zaffro Originals"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price (৳)</label>
            <input
              type="number"
              {...register("price", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Discount Price (৳)
          </label>
          <input
            type="number"
            {...register("discountPrice")}
            className="input input-bordered w-full"
          />
        </div>

        {/* Two Image Upload */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Image 1</label>
            <input
              type="file"
              {...register("image1", { required: true })}
              accept="image/*"
              className="file-input file-input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image 2</label>
            <input
              type="file"
              {...register("image2", { required: true })}
              accept="image/*"
              className="file-input file-input-bordered w-full"
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          {tagFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input
                {...register(`tags.${index}`)}
                placeholder="e.g. casual"
                className="input input-bordered flex-1"
              />
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="btn btn-error btn-sm"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addTag("")}
            className="btn btn-outline btn-sm"
          >
            + Add Tag
          </button>
        </div>

        {/* Sizes */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Sizes & Stock
          </label>
          {sizeFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-2 gap-2 mb-2">
              <input
                {...register(`sizes.${index}.size`, {
                  setValueAs: (val) => val.toUpperCase(),
                })}
                placeholder="e.g. M"
                className="input input-bordered uppercase"
              />
              <input
                type="number"
                {...register(`sizes.${index}.stock`, {
                  setValueAs: (value) => parseInt(value, 10) || 0,
                })}
                placeholder="Stock"
                className="input input-bordered"
              />
              <button
                type="button"
                onClick={() => removeSize(index)}
                className="btn btn-error btn-xs col-span-2"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addSize({ size: "", stock: "" })}
            className="btn btn-outline btn-sm mt-1"
          >
            + Add Size
          </button>
        </div>

        {/* Is New Arrival */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Is New Arrival?
          </label>
          <select
            {...register("isNewArrival")}
            className="select select-bordered w-full"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={uploading}
          className="btn btn-primary w-full mt-4"
        >
          {uploading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
