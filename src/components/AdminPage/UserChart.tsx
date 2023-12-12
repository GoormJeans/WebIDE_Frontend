import { LineChart } from "@mui/x-charts"
import React from 'react'

const UserChart = () => {

  // Users
  // x축에 날짜 지정
  const today = new Date()
  today.setDate(today.getDate() - 7);
  console.log(today.toLocaleDateString('en-US'))
  const xUserLabels = Array(7).fill(0).map(_ => {
    today.setDate(today.getDate() + 1)
    return today.toLocaleDateString('en-US')
  })
  const userConnections = xUserLabels.map(() => Math.floor(Math.random() * 500)); // 사용자 관련한 접속 통계 가능할지 모르겠지만 
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
          { data: userConnections, label: 'Connected Users' },
        ]}
        xAxis={[{ scaleType: 'point', data: xUserLabels }]}
      />
    </div>
  )
}

export default UserChart