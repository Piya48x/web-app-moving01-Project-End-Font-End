import { Link } from 'react-router-dom';

function UISelect() {
  return (
    <>
      <div className="bg-gray-100 h-screen flex justify-center items-center">
        <div className="max-w-xl">
          <h1 className="text-3xl font-semibold mb-8 text-center">Please select a role</h1>
          <div className="flex gap-4">
            <div className="w-72 h-64 bg-white p-8 rounded-lg shadow-lg flex justify-center items-center">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-center">Customer</h2>
                <Link to="/RegisterCustomer" className="block w-full bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600 transition duration-300">Customer</Link>
              </div>
            </div>
            <div className="w-72 bg-white p-8 rounded-lg shadow-lg flex justify-center items-center">
              <button >
                <h2 className="text-2xl font-semibold mb-4 text-center">Driver</h2>
                <Link to="/RegisterDriver" className="block w-full bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600 transition duration-300">Driver</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UISelect;
