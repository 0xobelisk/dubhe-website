import Link from 'next/link';

// This page renders when a route is requested that doesn't exist.
// Since we don't know the locale in this case, we'll provide a simple fallback.
export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-gray-400 mb-8">
            The page you're looking for doesn't exist.
          </p>
          <Link 
            href="/en" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </body>
    </html>
  );
}