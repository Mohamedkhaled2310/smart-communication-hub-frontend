export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-gray-700 mb-2">404 - Page Not Found 🕵️‍♂️</h1>
      <p className="text-gray-500 mb-4">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <a
        href="/"
        className="text-blue-500 underline hover:text-blue-700"
      >
        Go back home
      </a>
    </div>
  );
}
