import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-6xl font-bold text-black/90">404</h1>
      <h2 className="mb-2 text-2xl font-semibold">Page Not Found</h2>
      <p className="mb-6 text-gray-600">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="inline-block rounded-md bg-black px-6 py-2 text-white transition-colors hover:bg-black/90"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
