// components/common/Loader.jsx
const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white font-semibold text-lg">
      {message}
    </div>
  );
};

export default Loader;
