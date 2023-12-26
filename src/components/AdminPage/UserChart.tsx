import { LineChart } from "@mui/x-charts"
import React from 'react'

const UserChart: React.FC<{ userCounts: any }> = ({ userCounts }) => {

  // Users
  // x축에 날짜 지정
  const xUserLabels: string[] = Object.keys(userCounts)
  const userConnections: number[] = Object.values(userCounts); // 사용자 관련한 접속 통계 가능할지 모르겠지만 
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