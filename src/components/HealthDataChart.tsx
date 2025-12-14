import { HealthData } from '../App';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface HealthDataChartProps {
  data: HealthData[];
}

export function HealthDataChart({ data }: HealthDataChartProps) {
  const chartData = data.map((item, index) => ({
    name: `${index + 1}`,
    time: new Date(item.timestamp).toLocaleString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    나트륨: item.sodium,
    혈당: item.glucose
  }));

  const latestData = data[data.length - 1];
  const averageSodium = data.reduce((sum, item) => sum + item.sodium, 0) / data.length;
  const averageGlucose = data.reduce((sum, item) => sum + item.glucose, 0) / data.length;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-emerald-100 p-2.5 rounded-xl">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-gray-900">건강 데이터 추이</h2>
          <p className="text-xs text-gray-600">측정 {data.length}회</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-blue-50 rounded-xl p-3">
          <p className="text-xs text-blue-700 mb-1">최근 나트륨</p>
          <p className="text-sm text-blue-900">{latestData.sodium} mEq/L</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-3">
          <p className="text-xs text-blue-700 mb-1">평균 나트륨</p>
          <p className="text-sm text-blue-900">{averageSodium.toFixed(1)} mEq/L</p>
        </div>
        <div className="bg-rose-50 rounded-xl p-3">
          <p className="text-xs text-rose-700 mb-1">최근 혈당</p>
          <p className="text-sm text-rose-900">{latestData.glucose} mg/dL</p>
        </div>
        <div className="bg-rose-50 rounded-xl p-3">
          <p className="text-xs text-rose-700 mb-1">평균 혈당</p>
          <p className="text-sm text-rose-900">{averageGlucose.toFixed(1)} mg/dL</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 mb-5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 10, fill: '#6b7280' }}
              label={{ value: '측정 순서', position: 'insideBottom', offset: -5, style: { fontSize: 10, fill: '#6b7280' } }}
            />
            <YAxis 
              yAxisId="left"
              tick={{ fontSize: 10, fill: '#3b82f6' }}
              domain={[120, 160]}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 10, fill: '#f43f5e' }}
              domain={[50, 160]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '8px',
                fontSize: '12px'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
              iconSize={10}
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="나트륨" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="혈당" 
              stroke="#f43f5e" 
              strokeWidth={2}
              dot={{ fill: '#f43f5e', r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Reference Ranges */}
      <div className="space-y-3">
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-700 mb-2">나트륨 정상 범위</p>
          <p className="text-xs text-gray-600">정상: 135-145 mEq/L</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-700 mb-2">혈당 정상 범위</p>
          <p className="text-xs text-gray-600">공복: 70-100 mg/dL | 식후: 70-140 mg/dL</p>
        </div>
      </div>
    </div>
  );
}