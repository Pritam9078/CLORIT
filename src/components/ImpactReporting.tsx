import React from "react";
import { CurrencyUtils } from "../utils/currency";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Colors for the Pie Chart
const pieColors = ["#4F46E5", "#F87171", "#34D399", "#60A5FA"];

const ImpactReporting: React.FC = () => {
  // Data for CO2 Sequestration Over Time
  const co2Data = [
    { month: "Jan", co2: 800 },
    { month: "Feb", co2: 1200 },
    { month: "Mar", co2: 1600 },
    { month: "Apr", co2: 2000 },
    { month: "May", co2: 2400 },
    { month: "Jun", co2: 2800 },
    { month: "Jul", co2: 3000 },
    { month: "Aug", co2: 3200 },
  ];

  // Data for Carbon Credit Distribution
  const creditDistribution = [
    { name: "Project Alpha", value: 40 },
    { name: "Project Beta", value: 30 },
    { name: "Project Gamma", value: 20 },
    { name: "Project Delta", value: 10 },
  ];

  // Detailed project table data
  const projectDetails = [
    {
      name: "Sundarban Mangrove Restoration",
      area: "10 Hectares",
      co2: "3,000 tCO₂e",
      status: "Verified & Minted",
      credits: "2,500 CCTs",
    },
    {
      name: "Coastal Karnataka Reforestation",
      area: "8 Hectares",
      co2: "2,000 tCO₂e",
      status: "Verified & Minted",
      credits: "1,800 CCTs",
    },
    {
      name: "Kerala Backwater Initiative",
      area: "5 Hectares",
      co2: "1,000 tCO₂e",
      status: "Pending NCCR Approval",
      credits: "700 CCTs",
    },
    {
      name: "Goa Estuary Conservation",
      area: "3 Hectares",
      co2: "500 tCO₂e",
      status: "Under NGO Review",
      credits: "300 CCTs",
    },
    {
      name: "Andaman Island Pilot Project",
      area: "2 Hectares",
      co2: "300 tCO₂e",
      status: "Community Registered",
      credits: "0 CCTs",
    },
  ];

  return (
    <div className="p-8">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Impact Visualization & Reporting</h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Explore the verified success of blue carbon projects, analyze key metrics,
          and track environmental and economic impact.
        </p>
      </header>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="text-center py-6">
            <h2 className="text-2xl font-bold text-blue-600">5,000</h2>
            <p className="text-sm text-gray-600">Carbon Credit Tokens minted on blockchain</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center py-6">
            <h2 className="text-2xl font-bold text-red-500">23</h2>
            <p className="text-sm text-gray-600">Mangrove areas successfully replanted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center py-6">
            <h2 className="text-2xl font-bold text-green-600">6,000</h2>
            <p className="text-sm text-gray-600">Tonnes of CO₂ equivalent sequestered</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center py-6">
            <h2 className="text-2xl font-bold text-purple-600">3</h2>
            <p className="text-sm text-gray-600">Projects approved and contributing to impact</p>
          </CardContent>
        </Card>
      </div>

      {/* Project Status */}
      <Card className="mb-8 max-w-sm">
        <CardHeader>
          <CardTitle>Current Project Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><strong>Project Alpha:</strong> Verified & Minted</li>
            <li><strong>Project Beta:</strong> Verified & Minted</li>
            <li><strong>Project Gamma:</strong> Pending NCCR Approval</li>
            <li><strong>Project Delta:</strong> Under NGO Review</li>
          </ul>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>CO₂ Sequestration Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={co2Data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="co2" stroke="#4F46E5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Carbon Credit Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={creditDistribution}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  innerRadius={40}
                  label
                >
                  {creditDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Project Performance Table */}
      <section>
        <h2 className="text-xl font-bold mb-4">Detailed Project Performance</h2>
        <p className="text-sm text-gray-600 mb-4">
          Comprehensive details for all registered blue carbon projects.
        </p>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Area Restored</TableHead>
              <TableHead>CO₂ Offset</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Minted Credits</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectDetails.map((project, index) => (
              <TableRow key={index}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.area}</TableCell>
                <TableCell>{project.co2}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>
                  {project.credits}
                  {CurrencyUtils.shouldShowConversion(project.credits) && (
                    <div style={{...CurrencyUtils.getConversionStyle(), fontSize: '0.75em'}}>
                      {CurrencyUtils.getConversionString(project.credits)}
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-6 flex gap-4">
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Generate Full Report
          </Button>
          <Button variant="outline">
            View Corporate Microsites
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ImpactReporting;
