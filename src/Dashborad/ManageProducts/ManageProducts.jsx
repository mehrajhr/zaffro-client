import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Pages/Loading/Loading";
import { Plus } from "lucide-react";

const ManageProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get(
        `/products?search=${search}&category=${category}`
      );
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  // ✅ Delete product
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/products/${id}`);
          Swal.fire("Deleted!", "Product has been removed.", "success");
          fetchProducts();
        } catch (error) {
          Swal.fire("Error!", "Failed to delete product.", "error");
        }
      }
    });
  };

  return (
    <div className="p-6 bg-base-100 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
        <h2 className="text-2xl font-bold text-black">Manage Products</h2>
        <Link to="/dashboard/add-product">
          <button className="btn btn-primary"><Plus></Plus> Add New Product</button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-5">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered border-black text-black w-full md:w-1/2"
        />
        <select
          className="select select-bordered border-black text-black w-full md:w-1/4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="hoodie">Hoodie</option>
          <option value="tshirt">T-Shirt</option>
          <option value="poloshirt">Polo Shirt</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-sm text-gray-700">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.length > 0 ? (
                products?.map((product, index) => (
                  <tr key={product?._id}>
                    <td className="text-gray-600">{index + 1}</td>
                    <td>
                      <img
                        src={product?.images[0]}
                        alt={product?.name}
                        className="w-12 h-12 rounded-md object-cover"
                      />
                    </td>
                    <td className="font-semibold text-gray-600">{product.name}</td>
                    <td className="capitalize text-gray-600">{product.category}</td>
                    <td className="text-gray-600">{product.price} BDT</td>
                    <td className="flex items-center gap-2">
                      <Link to={`/dashboard/edit-product/${product._id}`}>
                        <button className="btn btn-xs btn-info">Edit</button>
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-xs btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
