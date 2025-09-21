import React, { useState, useEffect } from "react";
import {
  FileText,
  Calendar,
  Filter,
  Download,
  BarChart2,
  TrendingUp,
  Leaf,
  CheckCircle,
  AlertCircle,
  Clock,
  Search,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ImpactReport {
  id: string;
  projectName: string;
  community: string;
  date: string;
  areaRestored: number;
  creditsGenerated: number;
  status: "pending" | "approved" | "rejected";
  notes?: string;
}

const ImpactReports: React.FC = () => {
  const [reports, setReports] = useState<ImpactReport[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });

  useEffect(() => {
    // Dummy data for demonstration
    setReports([
      {
        id: "REP-001",
        projectName: "Mangrove Restoration Phase 1",
        community: "Green Valley Community",
        date: "2025-09-01",
        areaRestored: 12.5,
        creditsGenerated: 250,
        status: "approved",
        notes: "Verified by drone imagery",
      },
      {
        id: "REP-002",
        projectName: "Forest Hills Regrowth",
        community: "Forest Hills Initiative",
        date: "2025-09-05",
        areaRestored: 8.3,
        creditsGenerated: 170,
        status: "pending",
        notes: "Awaiting NGO verification",
      },
      {
        id: "REP-003",
        projectName: "Rural Reforestation Drive",
        community: "Rural Development Collective",
        date: "2025-09-10",
        areaRestored: 15.2,
        creditsGenerated: 320,
        status: "rejected",
        notes: "Incomplete documentation",
      },
    ]);
  }, []);

  // Filtered reports based on search, status, and date
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.projectName.toLowerCase().includes(search.toLowerCase()) ||
      report.community.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = filterStatus === "all" || report.status === filterStatus;

    const matchesDate =
      (!dateRange.start || new Date(report.date) >= new Date(dateRange.start)) &&
      (!dateRange.end || new Date(report.date) <= new Date(dateRange.end));

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Export to CSV
  const exportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Project Name,Community,Date,Area Restored,Credits Generated,Status,Notes"]
        .concat(
          filteredReports.map((r) =>
            [
              r.id,
              r.projectName,
              r.community,
              r.date,
              r.areaRestored,
              r.creditsGenerated,
              r.status,
              r.notes || "",
            ].join(",")
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "impact_reports.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-green-700">
          <FileText className="w-6 h-6" />
          Impact Reports
        </h1>
        <div className="flex gap-2">
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search projects or communities..."
            className="w-full border rounded px-2 py-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            className="w-full border rounded px-2 py-1"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
          >
            <option value="all">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <input
            type="date"
            className="w-full border rounded px-2 py-1"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <input
            type="date"
            className="w-full border rounded px-2 py-1"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          />
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-green-600" />
            Credits Generated Over Time
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={reports}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="creditsGenerated" stroke="#16a34a" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Area Restored by Projects
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reports}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="projectName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="areaRestored" fill="#4ade80" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Detailed Impact Reports</h2>
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Project Name</th>
                <th className="border px-4 py-2">Community</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Area Restored (ha)</th>
                <th className="border px-4 py-2">Credits Generated</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} className="text-center hover:bg-gray-50">
                  <td className="border px-4 py-2">{report.id}</td>
                  <td className="border px-4 py-2">{report.projectName}</td>
                  <td className="border px-4 py-2">{report.community}</td>
                  <td className="border px-4 py-2">{report.date}</td>
                  <td className="border px-4 py-2">{report.areaRestored}</td>
                  <td className="border px-4 py-2">{report.creditsGenerated}</td>
                  <td className="border px-4 py-2">
                    {report.status === "approved" && (
                      <span className="text-green-600 flex items-center gap-1 justify-center">
                        <CheckCircle className="w-4 h-4" /> Approved
                      </span>
                    )}
                    {report.status === "pending" && (
                      <span className="text-yellow-600 flex items-center gap-1 justify-center">
                        <Clock className="w-4 h-4" /> Pending
                      </span>
                    )}
                    {report.status === "rejected" && (
                      <span className="text-red-600 flex items-center gap-1 justify-center">
                        <AlertCircle className="w-4 h-4" /> Rejected
                      </span>
                    )}
                  </td>
                  <td className="border px-4 py-2">{report.notes || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ImpactReports;
