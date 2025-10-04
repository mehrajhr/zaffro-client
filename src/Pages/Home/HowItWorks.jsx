import { Package, CreditCard, Truck, Smile } from "lucide-react";

const steps = [
  {
    icon: <Package className="w-10 h-10 text-black" />,
    title: "Choose Your Product",
    desc: "Browse our latest collections and select your favorite products from Zaffro.",
  },
  {
    icon: <CreditCard className="w-10 h-10 text-black" />,
    title: "Place Your Order",
    desc: "Add items to your cart and proceed with easy checkout using Cash on Delivery or bKash.",
  },
  {
    icon: <Truck className="w-10 h-10 text-black" />,
    title: "Fast Delivery",
    desc: "We deliver across Bangladesh. Inside Chittagong – 70৳, Outside Chittagong – 130৳.",
  },
  {
    icon: <Smile className="w-10 h-10 text-black" />,
    title: "Enjoy Your Style",
    desc: "Receive your order, look amazing, and enjoy wearing your new Zaffro pieces.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-base-200 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-black mb-4">How It Works</h2>
        <p className="text-gray-700 mb-12">
          From browsing to delivery — see how simple it is to shop with Zaffro.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
