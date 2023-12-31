import { LineChart } from "@mui/x-charts"
import React, { useEffect, useState } from 'react'

const UserChart: React.FC<{ counts: any }> = ({ counts }) => {

  const [xUserLabels, setXUserLabels] = useState<string[]>([]);
  const [userRegstrations, setUserRegstrations] = useState<number[]>([])

  useEffect(() => {
    const label = Object.keys(counts ? counts[0]?.usersCounts || [] : []);
    const number: number[] = Object.values(counts ? counts[0]?.usersCounts || [] : [])
    setXUserLabels(label.reverse());
    setUserRegstrations(number.reverse());

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