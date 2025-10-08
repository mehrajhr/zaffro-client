import { useEffect, useState } from "react";
import { ShoppingBag, Wallet, Clock, CheckCircle } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Overview = () => {
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosSecure.get("/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [axiosSecure]);

  // ✅ Calculate metrics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;
  const totalRevenue = orders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + (o.total || 0), 0);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-black">Dashboard Overview</h2>

      {/* Metric Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Orders */}
        <div className="bg-white p-5 rounded-xl shadow-md flex items-center justify-between border-l-4 border-blue-500">
          <div>
            <p className="text-gray-700">Total Orders</p>
            <h3 className="text-3xl font-bold text-black">{totalOrders}</h3>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <ShoppingBag className="text-blue-500 w-8 h-8" />
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-5 rounded-xl shadow-md flex items-center justify-between border-l-4 border-yellow-500">
          <div>
            <p className="text-gray-700">Pending Orders</p>
            <h3 className="text-3xl font-bold text-black">{pendingOrders}</h3>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full">
            <Clock className="text-yellow-500 w-8 h-8" />
          </div>
        </div>

        {/* Delivered Orders */}
        <div className="bg-white p-5 rounded-xl shadow-md flex items-center justify-between border-l-4 border-green-500">
          <div>
            <p className="text-gray-700">Delivered Orders</p>
            <h3 className="text-3xl font-bold text-black">{deliveredOrders}</h3>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="text-green-500 w-8 h-8" />
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-xl shadow-md flex items-center justify-between border-l-4 border-purple-500">
          <div>
            <p className="text-gray-700">Total Revenue</p>
            <h3 className="text-3xl font-bold text-black">
              ৳{totalRevenue.toLocaleString()}
            </h3>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <Wallet className="text-purple-500 w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Optional: Add chart or latest orders later */}
    </div>
  );
};

export default Overview;
