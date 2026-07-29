import { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { BarChart, LineChart, PieChart } from "echarts/charts";
import { GridComponent, LegendComponent, MarkPointComponent, TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import type { EChartsOption } from "echarts";

echarts.use([BarChart, LineChart, PieChart, GridComponent, LegendComponent, MarkPointComponent, TooltipComponent, CanvasRenderer]);

interface EChartPanelProps {
  className?: string;
  height?: number;
  option: EChartsOption;
  onChartClick?: (params: unknown) => void;
}

export default function EChartPanel({ className, height = 320, option, onChartClick }: EChartPanelProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const chart = echarts.init(containerRef.current);
    chart.setOption(option);

    if (onChartClick) {
      chart.on("click", onChartClick);
    }

    const resizeObserver = new ResizeObserver(() => chart.resize());
    resizeObserver.observe(containerRef.current);

    return () => {
      if (onChartClick) {
        chart.off("click", onChartClick);
      }
      resizeObserver.disconnect();
      chart.dispose();
    };
  }, [onChartClick, option]);

  return <div className={className} ref={containerRef} style={{ height }} />;
}
