import React from 'react';

const Redeem = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Redeem Your Points</h1>

      {/* Placeholder for redeeming functionality */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <p className="text-lg font-semibold mb-4">Available Points: 1000</p>
        <p className="mb-6">Choose a reward to redeem your points.</p>

        {/* Example Rewards */}
        <div className="flex flex-col space-y-4">
          <div className="border border-gray-300 p-4 rounded-lg">
            <h2 className="font-semibold">Gift Card</h2>
            <p>1000 Points</p>
            <button className="bg-[#2E8B57] text-white py-2 px-4 rounded mt-2">
              Redeem Now
            </button>
          </div>

          <div className="border border-gray-300 p-4 rounded-lg">
            <h2 className="font-semibold">Discount Voucher</h2>
            <p>500 Points</p>
            <button className="bg-[#2E8B57] text-white py-2 px-4 rounded mt-2">
              Redeem Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Redeem;
