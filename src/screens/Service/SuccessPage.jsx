/* eslint-disable react/prop-types */


function SuccessPage({ onBackToDashboard }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Job Finished Successfully!</h1>
      <div className="flex justify-center">
        <button onClick={onBackToDashboard} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default SuccessPage;
