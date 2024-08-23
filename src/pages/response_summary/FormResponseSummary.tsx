import React, { useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import html2pdf from "html2pdf.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dummyData } from "./data";
import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const FormResponseSummary: React.FC = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<string>("");
  const [chartType, setChartType] = useState<string>("");
  const [dashboardCharts, setDashboardCharts] = useState<JSX.Element[]>([]);
  const [isDownloadVisible, setIsDownloadVisible] = useState<boolean>(false);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedQuestion(e.target.value);
  };

  const handleChartTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChartType(e.target.value);
  };

  const handleAddToDashboard = () => {
    if (!selectedQuestion || !chartType) return;

    const question = dummyData.find((q) => q.question === selectedQuestion);

    if (!question) return;

    const chartData = {
      labels: question.options,
      datasets: [
        {
          label: question.question,
          data: question.responses,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        },
      ],
    };

    const chartElement =
      chartType === "bar" ? (
        <Bar data={chartData} options={{ responsive: true }} />
      ) : chartType === "pie" ? (
        <Pie data={chartData} options={{ responsive: true }} />
      ) : (
        <Line data={chartData} options={{ responsive: true }} />
      );

    setDashboardCharts((prevCharts) => [...prevCharts, chartElement]);

    // Show the download button when there is at least one chart
    if (dashboardCharts.length === 0) {
      setIsDownloadVisible(true);
    }
  };

  const totalResponses = dummyData.reduce(
    (sum, q) => sum + q.responses.reduce((a, b) => a + b, 0),
    0
  );

  const averageResponseTime = 5; // Dummy value, replace with actual calculation

  const submissionRate = 80; // Dummy value, replace with actual calculation

  const handleDownloadPDF = () => {
    const element = document.getElementById("content-to-download");
    if (element) {
      const options = {
        margin: 1,
        filename: "document.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      html2pdf().from(element).set(options).save();
    } else {
      console.error("Element to download not found");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Full Width Heading */}
      <div className="flex justify-center items-center bg-gray-100 p-4 w-full">
        <img src={logo} alt="logo" className="w-16 h-16" />
        <h1 className="text-4xl font-bold text-slate-900 ml-4">
          Research Data Collector Platform
        </h1>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4">
          {/* Overall Response Summary */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Overall Response Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Total Responses: {totalResponses}</p>
              <p>Submission Rate: {submissionRate}%</p>
              <p>Average Response Time: {averageResponseTime} minutes</p>
            </CardContent>
          </Card>

          {/* Dashboard Section */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  Data Visualization Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                {dashboardCharts.length === 0 ? (
                  <p className="text-center text-gray-500">
                    No charts selected or rendered yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {dashboardCharts.map((chart, index) => (
                      <div key={index} className="w-full">
                        {chart}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Download/Export Options */}
          {isDownloadVisible && (
            <div className="flex justify-end mt-8">
              <Button onClick={handleDownloadPDF}>Download as PDF</Button>
            </div>
          )}
        </div>

        {/* Chart Selection Section */}
        <div className="w-80 bg-gray-100 border-l border-gray-300 h-full sticky top-0">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Chart Selection</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
              <div className="mb-6">
                <label className="block mb-1">Select Question:</label>
                <select
                  value={selectedQuestion}
                  onChange={handleQuestionChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="" disabled>
                    Select a question
                  </option>
                  {dummyData.map((question, index) => (
                    <option key={index} value={question.question}>
                      {question.question}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label className="block mb-1">Select Chart Type:</label>
                <select
                  value={chartType}
                  onChange={handleChartTypeChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="" disabled>
                    Select the chart type
                  </option>
                  <option value="bar">Bar Chart</option>
                  <option value="pie">Pie Chart</option>
                  <option value="line">Line Chart</option>
                </select>
              </div>
              <Button onClick={handleAddToDashboard} className="mt-4">
                Add to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FormResponseSummary;
