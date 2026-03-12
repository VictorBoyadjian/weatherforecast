import { LineChart } from "@mui/x-charts/LineChart";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const blueTheme = createTheme({
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
  title?: string;
};

export default function WeatherChart({ hours, series, title }: WeatherChartProps) {
  if (!hours.length) return null;

  return (
    <ThemeProvider theme={blueTheme}>
      <div className="w-full">
        {title && (
          <p className="text-white/50 text-xs mb-1 ml-2">{title}</p>
        )}
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
            showMark: false,
            curve: "natural",
          }))}
          height={220}
          margin={{ left: 50, right: 20, top: 20, bottom: 30 }}
          sx={{
            ".MuiAreaElement-root": { fillOpacity: 0.06 },
            ".MuiLineElement-root": { strokeWidth: 2.5 },
            ".MuiChartsGrid-line": { stroke: "rgba(255,255,255,0.05)" },
          }}
          grid={{ horizontal: true }}
        />
      </div>
    </ThemeProvider>
  );
}
