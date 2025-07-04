import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Rectangle,
  ResponsiveContainer,
} from 'recharts'
import { MonthlyBookType } from '../_types'

export default function MonthlyGraph({
  data,
}: {
  data: MonthlyBookType[]
}) {
  return (
    <ResponsiveContainer
      width={'100%'}
      height={300}
    >
      <BarChart
        data={data.reverse()}
        margin={{
          top: 5,
          right: 30,
          left: -10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="readBooks"
          fill="#72A9F7"
          activeBar={
            <Rectangle
              fill="#6482AD"
              stroke="#DFF2EB"
            />
          }
        />
        <Bar
          dataKey="reviewBooks"
          fill="#87CEEB"
          activeBar={
            <Rectangle
              fill="#8DBCC7"
              stroke="#DFF2EB"
            />
          }
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
