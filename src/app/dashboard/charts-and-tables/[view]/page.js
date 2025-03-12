import PriceProjection from "../components/PriceProjection";
import CoefficientChart from "../components/CoefficientChart";
import YearOnYearChart from "../components/YearOnYearChart";
import PriceVolatility from "../components/PriceVolatility";
import CommodityPricesTable from "../components/CommodityPricesTable";
import CoefficientTable from "../components/CoefficientTable";
import PriceAverageTable from "../components/PriceAverageTable";
import InflationChart from "../components/InflationChart";

export default async function ViewPage({ params }) {
  const { view } = await params;

  const renderView = () => {
    switch (view) {
      case "price-projection":
        return <PriceProjection />;
      case "coefficient-chart":
        return <CoefficientChart />;
      case "year-on-year-chart":
        return <YearOnYearChart />;
      case "price-volatility":
        return <PriceVolatility />;
      case "commodity-prices-table":
        return <CommodityPricesTable />;
      case "price-averages-table":
        return <PriceAverageTable />;
      case "coefficient-table":
        return <CoefficientTable />;
      case "inflation-chart":
        return <InflationChart />;

      default:
        return <div>Select a chart from the dashboard</div>;
    }
  };

  return <div className="p-4">{renderView()}</div>;
}
