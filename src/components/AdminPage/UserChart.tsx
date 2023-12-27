import { LineChart } from "@mui/x-charts"
import React, { useEffect, useState } from 'react'

const UserChart: React.FC<{ counts: any }> = ({ counts }) => {

  const [xUserLabels, setXUserLabels] = useState<string[]>([]);
  const [userRegstrations, setUserRegstrations] = useState<number[]>([])

  useEffect(() => {
    setXUserLabels(Object.keys(counts[0]?.usersCounts || []));
    setUserRegstrations(Object.values(counts[0]?.usersCounts || []))
  }, [counts])

  return (
    <div className="w-full h-full">
      <LineChart
        className="w-full"
        sx={{
          backgroundColor: "white",
          border: "none",
          borderRadius: "12px"
        }}
        series={[
          { data: userRegstrations, label: 'User Register' },
        ]}
        xAxis={[{ scaleType: 'point', data: xUserLabels }]}
      />
    </div>
  )
}

export default UserChart