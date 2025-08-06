const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white font-semibold text-lg space-y-3">
      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

      {/* Message */}
      <p>{message}</p>
    </div>
  );
};
export default Loader;
