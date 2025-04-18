
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface OccupancyChartProps {
  data: {
    month: string;
    occupancyRate: number;
  }[];
}

const OccupancyChart = ({ data }: OccupancyChartProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-realty-blue">Occupancy Rate (%)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} />
            <Tooltip 
              formatter={(value: number) => [`${value}%`, 'Occupancy Rate']} 
              contentStyle={{ backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e2e8f0' }}
            />
            <Bar 
              dataKey="occupancyRate" 
              fill="#4FD1C5" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OccupancyChart;
