import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const NCCRCarbonCreditMinting: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState("Project Alpha - Mangrove Reforestation (PRJ-MANG-001)");
  const [calculatedCO2, setCalculatedCO2] = useState(1250);
  const [mintCount, setMintCount] = useState(1250);
  const [nccrKey, setNccrKey] = useState("");
  const [error, setError] = useState("");

  // Sample table data
  const recentActivity = [
    { id: "PRJ-MANG-001", ccts: 1250, date: "2024-07-26", hash: "0xabc...123" },
    { id: "PRJ-WET-002", ccts: 800, date: "2024-07-25", hash: "0xdef...456" },
    { id: "PRJ-MANG-003", ccts: 950, date: "2024-07-24", hash: "0xghi...789" },
    { id: "PRJ-MANG-001", ccts: 1100, date: "2024-07-23", hash: "0xjkl...012" },
    { id: "PRJ-WET-002", ccts: 720, date: "2024-07-22", hash: "0xmn...345" },
  ];

  const handleMint = () => {
    alert(`Successfully minted ${mintCount} CCTs for ${selectedProject}`);
  };

  return (
    <div className="p-8">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold">NCCR Carbon Credit Minting</h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Efficiently calculate, mint, and issue carbon credit tokens for verified
          mangrove restoration projects on the blockchain.
        </p>
      </header>

      {/* Top Section: 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Carbon Credit Generation */}
        <Card>
          <CardHeader>
            <CardTitle>Carbon Credit Generation & Minting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Select Verified Project</label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Project Alpha - Mangrove Reforestation (PRJ-MANG-001)</option>
                <option>Project Beta - Wetland Restoration (PRJ-WET-002)</option>
                <option>Project Gamma - Mangrove Expansion (PRJ-MANG-003)</option>
              </select>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Calculated CO₂ Sequestration:</p>
              <p className="text-xl font-bold text-blue-600">{calculatedCO2.toLocaleString()} tCO₂e</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Carbon Credit Tokens (CCTs) to Mint:</p>
              <p className="text-xl font-bold text-blue-600">{mintCount.toLocaleString()} CCTs</p>
            </div>

            <Button onClick={handleMint} className="w-full">
              Mint Carbon Credits & Issue NFT Certificates
            </Button>
          </CardContent>
        </Card>

        {/* Card 2: Minting Calculation Parameters */}
        <Card>
          <CardHeader>
            <CardTitle>Minting Calculation Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tree Density (per hectare)</label>
              <Input value="2,500 trees/ha" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Average Species Factor</label>
              <Input value="0.85 (Mangrove Avicennia)" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Project Age (Current)</label>
              <Input value="3 years (post-restoration)" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Remaining Monitoring Period</label>
              <Input value="10 years" readOnly />
            </div>
          </CardContent>
        </Card>

        {/* Card 3: NFT Certificate Issuance */}
        <Card>
          <CardHeader>
            <CardTitle>NFT Certificate Issuance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <div className="w-40 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg shadow-md flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-2xl mb-1">🏆</div>
                  <div className="text-xs font-semibold">CCT NFT</div>
                  <div className="text-xs">Certificate</div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Assigned Wallet Address:</p>
              <p className="text-xs text-gray-800 break-all">
                0xNCCRWalletAddress1234567890abcdef123456
              </p>
            </div>
            <Button variant="outline" className="w-full">
              View Sample NFT Certificate
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Minting Activity Table */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">Recent Minting Activity</h2>
        <p className="text-sm text-gray-600 mb-4">
          Overview of the latest carbon credit minting transactions on the blockchain.
        </p>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project ID</TableHead>
              <TableHead>CCTs Minted</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Transaction Hash</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentActivity.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.ccts}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.hash}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default NCCRCarbonCreditMinting;
