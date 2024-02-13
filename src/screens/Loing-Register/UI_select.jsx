import { Link } from 'react-router-dom';

function UISelect() {
  return (
    <>
       <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="grid grid-cols-2 gap-4">
        <h2 className="text-3xl font-semibold mb-8 col-span-2 text-center">Choose your status</h2>
        {/* Customer Box */}
        <div className="bg-blue-500 text-white p-8 rounded-lg shadow-md flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold mb-4">Customer</h2>
          <Link to="/RegisterCustomer" className="text-lg bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-100">Go to Register Customer</Link>
        </div>
        {/* Driver Box */}
        <div className="bg-blue-500 text-white p-8 rounded-lg shadow-md flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold mb-4">Driver</h2>
          <Link to="/RegisterDriver" className="text-lg bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-100">Go to Register Dirver</Link>
        </div>
      </div>
    </div>
    </>
  );
}

export default UISelect;
