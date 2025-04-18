
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RevenueChartProps {
  data: {
    month: string;
    revenue: number;
  }[];
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-realty-blue">Monthly Revenue (€)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [`€${value.toLocaleString()}`, 'Revenue']} 
              contentStyle={{ backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e2e8f0' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#ED8936" 
              activeDot={{ r: 8 }} 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
