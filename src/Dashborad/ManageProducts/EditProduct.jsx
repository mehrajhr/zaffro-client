import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const imgbbApiKey = import.meta.env.VITE_IMAGEBB_KEY;

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const [currentImages, setCurrentImages] = useState([]); // URLs for preview
  const [imageFiles, setImageFiles] = useState([]); // Actual File objects for changed images
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, control, reset, watch, setValue } = useForm({
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
  } = useFieldArray({
    control,
    name: "tags",
  });

  const {
    fields: sizeFields,
    append: addSize,
    remove: removeSize,
  } = useFieldArray({
    control,
    name: "sizes",
  });

  const watchImages = watch("images");

  // --- Load product data ---
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosSecure.get(`/products/${id}`);
        const data = res.data;

        reset({
          name: data.name,
          category: data.category,
          brand: data.brand,
          description: data.description,
          price: data.price,
          discountPrice: data.discountPrice || null,
          tags: data.tags.length ? data.tags : [""],
          sizes: data.sizes.length ? data.sizes : [{ size: "", stock: "" }],
          isNewArrival: data.isNewArrival ? "true" : "false",
        });

        setCurrentImages(data.images || []);
        setImageFiles(new Array(data.images.length).fill(null));
        setLoading(false);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch product",
          text: error.message,
        });
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, axiosSecure, reset]);

  const generateSlug = (name) =>
    name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

  const handleImageChange = (e, index) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFiles((prev) => {
        const newFiles = [...prev];
        newFiles[index] = file;
        return newFiles;
      });
      setCurrentImages((prev) =>
        prev.map((img, i) => (i === index ? URL.createObjectURL(file) : img))
      );
    }
  };

  const onSubmit = async (data) => {
    try {
      setUploading(true);

      // Upload only changed images
      const uploadedImages = [...currentImages];
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        if (file) {
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
          if (imgData.success) uploadedImages[i] = imgData.data.display_url;
        }
      }

      const updatedProduct = {
        name: data.name,
        slug: generateSlug(data.name),
        description: data.description,
        category: data.category,
        brand: data.brand,
        images: uploadedImages,
        price: parseFloat(data.price),
        discountPrice: data.discountPrice
          ? parseFloat(data.discountPrice)
          : null,
        tags: data.tags.filter((t) => t.trim() !== ""),
        sizes: data.sizes
          .filter((s) => s.size && s.stock)
          .map((s) => ({ size: s.size, stock: parseInt(s.stock) })), // stock as int
        isNewArrival: data.isNewArrival === "true",
      };

      const res = await axiosSecure.put(`/products/${id}`, updatedProduct);

      if (res.data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "Product Updated!",
          text: "Product details have been updated successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/dashboard/manage-products");
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Update Failed", text: error.message });
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="bg-base-200 min-h-screen p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-black">
        Edit Product
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto bg-base-100 p-6 rounded-xl shadow-md space-y-6 text-black"
      >
        {/* Product Name & Category */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Product Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Category</label>
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
          <label className="block mb-1 text-sm font-medium">Description</label>
          <textarea
            {...register("description")}
            className="textarea textarea-bordered w-full"
            rows={3}
          />
        </div>

        {/* Brand & Price */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Brand</label>
            <input
              type="text"
              {...register("brand", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Price (৳)</label>
            <input
              type="number"
              {...register("price", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Discount Price (৳)
          </label>
          <input
            type="number"
            {...register("discountPrice")}
            className="input input-bordered w-full"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Product Images
          </label>
          <div className="flex gap-4 mb-2">
            {currentImages.map((img, idx) => (
              <div key={idx} className="relative flex flex-col items-center">
                <img
                  src={img}
                  alt={`Product ${idx}`}
                  className="w-24 h-24 object-cover rounded-md mb-1"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id={`image-${idx}`}
                  onChange={(e) => handleImageChange(e, idx)}
                />
                <label
                  htmlFor={`image-${idx}`}
                  className="btn btn-xs btn-outline cursor-pointer"
                >
                  Change
                </label>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            Click "Change" on an image to replace it individually. Leave blank
            to keep current image.
          </p>
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-2 text-sm font-medium">Tags</label>
          {tagFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input
                {...register(`tags.${index}`)}
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

        {/* Sizes & Stock */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Sizes & Stock
          </label>
          {sizeFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-2 gap-2 mb-2">
              <input
                {...register(`sizes.${index}.size`)}
                className="input input-bordered"
                placeholder="e.g. M"
              />
              <input
                type="number"
                {...register(`sizes.${index}.stock`)}
                className="input input-bordered"
                placeholder="Stock"
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

        {/* New Arrival */}
        <div>
          <label className="block mb-1 text-sm font-medium">
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
          {uploading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
