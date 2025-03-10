import { FaDollarSign, FaChartLine, FaShoppingBag, FaUsers } from 'react-icons/fa';
import { BarChart, LineChart } from '@/components/Charts';

const DashboardHome = () => {
  const metrics = [
    { 
      title: "Total Revenue", 
      value: "$24,532", 
      change: "+12.5%", 
      icon: <FaDollarSign className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-600"
    },
    { 
      title: "Sales Growth", 
      value: "34.6%", 
      change: "+8.2%", 
      icon: <FaChartLine className="w-6 h-6" />,
      color: "bg-teal-100 text-teal-600"
    },
    { 
      title: "New Orders", 
      value: "1,234", 
      change: "-3.1%", 
      icon: <FaShoppingBag className="w-6 h-6" />,
      color: "bg-orange-100 text-orange-600"
    },
    { 
      title: "Active Users", 
      value: "2,345", 
      change: "+5.7%", 
      icon: <FaUsers className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-600"
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div className={`p-3 rounded-lg ${metric.color}`}>
                {metric.icon}
              </div>
              <span className={`text -sm ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm mt-4">{metric.title}</h3>
            <p className="text-2xl font-semibold mt-2">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="h-80">
            <BarChart />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="h-80">
            <LineChart />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-3">Transaction</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="py-3">Order #100{i}</td>
                  <td>2024-02-{10 + i}</td>
                  <td>$1,23{i}.00</td>
                  <td>
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;