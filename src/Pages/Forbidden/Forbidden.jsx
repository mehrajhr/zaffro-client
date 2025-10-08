import { Lock } from "lucide-react";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="bg-red-100 p-6 rounded-full inline-flex items-center justify-center shadow-md">
            <Lock className="w-12 h-12 text-red-600" />
          </div>
        </div>

        <h1 className="text-5xl font-bold mb-3 text-gray-800">403</h1>
        <h2 className="text-2xl font-semibold mb-2">Access Forbidden</h2>
        <p className="text-gray-600 mb-6">
          Sorry, you don’t have permission to access this page. Please contact
          the administrator if you believe this is a mistake.
        </p>

        <div className="flex justify-center gap-3">
          <Link
            to="/"
            className="btn bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
