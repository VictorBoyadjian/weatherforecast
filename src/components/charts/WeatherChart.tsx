import { LineChart } from "@mui/x-charts/LineChart";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: { mode: "dark" },
});

type ChartSeries = {
  data: number[];
  label: string;
  color: string;
};

type WeatherChartProps = {
  hours: string[];
  series: ChartSeries[];
};

export default function WeatherChart({ hours, series }: WeatherChartProps) {
  if (!hours.length) return null;

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="w-full">
        <LineChart
          xAxis={[
            {
              data: hours,
              scaleType: "point",
            },
          ]}
          series={series.map((s) => ({
            data: s.data,
            label: s.label,
            color: s.color,
            area: true,
            showMark: true,
          }))}
          height={260}
          margin={{ left: 50, right: 20, top: 40, bottom: 30 }}
          sx={{
            ".MuiAreaElement-root": { fillOpacity: 0.08 },
            ".MuiLineElement-root": { strokeWidth: 2.5 },
            ".MuiMarkElement-root": { scale: "0.8" },
          }}
        />
      </div>
    </ThemeProvider>
  );
}
