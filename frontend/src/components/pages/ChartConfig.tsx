import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export const Chart = ({ data }: { data: { name: string, value: number }[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <XAxis dataKey="name" stroke="#ccc" />
        <YAxis stroke="#ccc"/>
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#38bdf8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
