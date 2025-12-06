import { SalesBarChart } from "@/components/seller/chart/barChart";
import { SalesLineChart } from "@/components/seller/chart/lineChart";
import { CategoryPieChart } from "@/components/seller/chart/pieChart";

export default function SellerDashboard() {
  return (
    <div className="p-6 space-y-6">
      <SalesLineChart />
      <SalesBarChart />
      <CategoryPieChart />
    </div>
  );
}
