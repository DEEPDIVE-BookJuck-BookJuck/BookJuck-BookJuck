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

let data = [
  {
    month: '2025-06',
    readBooks: 6,
    reviewBooks: 2,
  },
  {
    month: '2025-05',
    readBooks: 0,
    reviewBooks: 1,
  },
  {
    month: '2025-04',
    readBooks: 0,
    reviewBooks: 0,
  },
  {
    month: '2025-03',
    readBooks: 0,
    reviewBooks: 0,
  },
  {
    month: '2025-02',
    readBooks: 0,
    reviewBooks: 0,
  },
  {
    month: '2025-01',
    readBooks: 0,
    reviewBooks: 0,
  },
]

data = data.reverse()

export default function MonthlyGraph() {
  return (
    <ResponsiveContainer
      width={'100%'}
      // height={'85%'}
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
