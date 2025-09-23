import React from 'react';
import WalletConnector from '../components/WalletConnector';

const WalletTestPage: React.FC = () => {
  const handleWalletConnect = (address: string, provider: any) => {
    console.log('Wallet connected:', { address, provider });
    alert(`Wallet connected successfully!\nAddress: ${address}`);
  };

  const handleWalletDisconnect = () => {
    console.log('Wallet disconnected');
    alert('Wallet disconnected successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            CLORIT Wallet Test
          </h1>
          <p className="text-gray-600">
            Test the Web3 wallet connection functionality
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <WalletConnector
            onConnect={handleWalletConnect}
            onDisconnect={handleWalletDisconnect}
            className="w-full"
          />
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Instructions:</h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Make sure you have MetaMask, Coinbase Wallet, or Phantom installed</li>
            <li>• Click on your preferred wallet to connect</li>
            <li>• Approve the connection in your wallet extension</li>
            <li>• Your wallet address will be displayed once connected</li>
          </ul>
        </div>

        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-green-800 mb-2">✅ Features Resolved:</h3>
          <ul className="text-xs text-green-700 space-y-1">
            <li>• Fixed "Cannot redefine property: ethereum" errors</li>
            <li>• Added conflict resolution for multiple wallet extensions</li>
            <li>• Enhanced error handling and timeout protection</li>
            <li>• Support for MetaMask, Coinbase Wallet, and Phantom</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WalletTestPage;
