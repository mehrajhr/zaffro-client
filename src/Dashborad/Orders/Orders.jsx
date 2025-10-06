import { useEffect, useState } from "react";
import { Delete, Eye, Printer } from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Orders = () => {
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all"); // "all", "day", "month", "year"

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const { data } = await axiosSecure.get("/orders");
      setOrders(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    // Filter by status
    if (statusFilter !== "all" && order.status !== statusFilter) return false;

    // Filter by date
    if (dateFilter !== "all") {
      const orderDate = new Date(order.createdAt);
      const now = new Date();
      if (dateFilter === "day") {
        return (
          orderDate.getDate() === now.getDate() &&
          orderDate.getMonth() === now.getMonth() &&
          orderDate.getFullYear() === now.getFullYear()
        );
      } else if (dateFilter === "month") {
        return (
          orderDate.getMonth() === now.getMonth() &&
          orderDate.getFullYear() === now.getFullYear()
        );
      } else if (dateFilter === "year") {
        return orderDate.getFullYear() === now.getFullYear();
      }
    }

    return true;
  });

  // --- Update order status ---
  const handleChangeStatus = async (orderId, newStatus) => {
    Swal.fire({
      title: "Do you want to save the status?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/orders/${orderId}`, { status: newStatus });
          Swal.fire("Saved!", "", "success");
          fetchOrders();
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const handleViewDetails = (order) => {
    Swal.fire({
      title: `Order ${order._id.slice(-6)} Details`,
      html: `
        <b>Customer:</b> ${order.customer?.name} (${
        order.customer?.email ?? "N/A"
      })<br/>
        <b>Phone:</b> ${order.customer?.mobile ?? "N/A"}<br/>
        <b>Payment Method:</b> ${order.customer?.paymentMethod}<br/>
        <b>Status:</b> ${order.status}<br/>
        <b>Location: </b> ${order.customer?.location} <br/><br/>
        <b>Items:</b><br/>
        ${order.items
          .map(
            (item) =>
              `• ${item.name} (${item.size}) × ${item.quantity} - ৳${item.unitPrice}<br/>`
          )
          .join("")}<br/>
        <b>Subtotal:</b> ৳${order.subtotal}<br/>
        <b>Delivery:</b> ৳${order.deliveryFee}<br/>
        <b>Total:</b> ৳${order.total}
      `,
      showCloseButton: true,
      showCancelButton: true,
      cancelButtonText: "Print Invoice",
      confirmButtonText: "Close",
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        printInvoice(order);
      }
    });
  };

  const deletOrder = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/orders/${id}`);
         Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
          fetchOrders();
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
      }
  }});
  };

  const printInvoice = (order) => {
    const invoiceWindow = window.open("", "_blank");

    invoiceWindow.document.write(`
    <html>
    <head>
      <title>Invoice ${order._id.slice(-6)}</title>
      <style>
        body { font-family: 'Arial', sans-serif; padding: 30px; color: #333; }
        .header { display: flex; justify-content: space-between; align-items: center; }
        .logo { width: 150px; }
        h2 { text-align: center; margin-top: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #f5f5f5; }
        .totals { margin-top: 20px; width: 300px; float: right; }
        .totals div { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .footer { clear: both; margin-top: 60px; text-align: center; font-size: 14px; }
        .signature { margin-top: 150px; display: flex; justify-content: space-between; }
        .signature div { display:flex justify-item:between width: 200px; border-top: 1px solid #333; text-align: center; padding-top: 5px; }
      </style>
    </head>
    <body>
      <div class="header">
        <img src="/public/zaffrologo.png" alt="Zaffro Logo" class="logo"/>
        <div>
          <h3>Zaffro</h3>
          <p>www.zaffro.com</p>
        </div>
      </div>

      <h2>Invoice #${order._id.slice(-6)}</h2>

      <p><b>Order Date:</b> ${new Date(
        order.createdAt
      ).toLocaleDateString()}</p>
      <p><b>Customer Name:</b> ${order.customer?.name}</p>
      <p><b>Email:</b> ${order.customer?.email ?? "N/A"}</p>
      <p><b>Phone:</b> ${order.customer?.mobile ?? "N/A"}</p>
      <p><b>Location:</b> ${order.customer?.location ?? "N/A"}</p>
      <p><b>Payment Method:</b> ${order.customer?.paymentMethod}</p>

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${order.items
            .map(
              (item) => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.size}</td>
                  <td>${item.quantity}</td>
                  <td>৳${item.unitPrice}</td>
                  <td>৳${item.subtotal}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>

      <div class="totals">
        <div><span>Subtotal:</span> <span>৳${order.subtotal}</span></div>
        <div><span>Delivery:</span> <span>৳${order.deliveryFee}</span></div>
        <div style="font-weight:bold; font-size:18px;"><span>Total:</span> <span>৳${
          order.total
        }</span></div>
      </div>

      <div class="signature">
        <div>Authorized Sign</div>
        <div>Customer Sign</div>
      </div>

      <div class="footer">
        <p>Thank you for shopping with Zaffro</p>
        <p>We appreciate your trust in our brand.</p>
      </div>
    </body>
    </html>
  `);

    invoiceWindow.document.close();
    invoiceWindow.print();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-black">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Orders Dashboard</h2>
        <div className="flex gap-2">
          <select
            className="select select-bordered"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            className="select select-bordered"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="all">All Dates</option>
            <option value="day">Today</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders?.map((order) => (
              <tr key={order._id} className="hover">
                <td>{order._id.slice(-6)}</td>
                <td>{order.customer?.name}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>৳{order.total}</td>
                <td>
                  <select
                    className="select select-sm select-bordered"
                    value={order.status}
                    onChange={(e) =>
                      handleChangeStatus(order._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  {order.customer?.paymentMethod === "bkash" ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Unpaid</span>
                  )}
                </td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleViewDetails(order)}
                    className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => printInvoice(order)}
                    className="btn btn-sm bg-gray-600 text-white hover:bg-gray-700 flex items-center gap-1"
                  >
                    <Printer size={16} />
                  </button>
                  <button
                    onClick={() => deletOrder(order?._id)}
                    className="btn btn-warning gap-1 btn-sm"
                  >
                    <Delete size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
