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
        data={data}
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
          name="읽은 책"
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
          name="작성한 독후감"
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
