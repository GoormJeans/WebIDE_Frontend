import { PieChart, pieArcLabelClasses } from "@mui/x-charts"
import React, { useEffect, useState } from 'react'

const LangChart: React.FC<{ counts: any }> = ({ counts }) => {

  // Language
  const [chartData, setChartData] = useState<{
    percentage: number; label: string; value: number;
  }[]>([]);

  useEffect(() => {
    const algos = counts ? counts[0]?.algos[0] || [] : [];
    // Generate random data for the chart
    const generateChartData = () => {
      const languages = ['Java', 'Python3', 'C++'];
      const values = [algos?.java || 0, algos?.python3 || 0, algos?.cpp || 0];
      const sum = algos.total
      const normalizedValues = values.map((val) => Math.round((val / sum) * 100));
      const data = languages.map((language, index) => ({
        label: language,
        value: values[index],
        percentage: normalizedValues[index],
      })).filter((x) => x.value > 0);

      setChartData(data);
    };

    generateChartData();
  }, [counts]);
  return (
    <div className="w-full">
      {chartData.length > 0 ? <PieChart
        colors={['#14B8A6', '#3B82F6', '#EC4899', '#6366F1', '#F59E0B',]}
        series={[
          {
            arcLabel: (item) => `${item.label} (${item.value})`,
            highlightScope: { faded: 'global', highlighted: 'item' },
            highlighted: { additionalRadius: 2 },
            data: chartData,
            innerRadius: 60,
            outerRadius: 100,
            paddingAngle: 3,
            cornerRadius: 5,
          },
        ]}
        sx={{
          border: "none",
          borderRadius: "12px",
          backgroundColor: 'white',
          [`& .${pieArcLabelClasses.root}`]: {
            fontSize: '0.7rem',
            fontWeight: 'bold',
            fontFamily: 'K2D',
          },
        }}

        height={200}
      />
        :
        <div>
          언어 데이터가 없습니다.
        </div>
      }
    </div>
  )
}

export default LangChart