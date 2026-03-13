import React from 'react'

const index = ({value, label}: {value: number, label: string}) => {
  return (
     <div className="glass p-4 rounded-xl">
        <p className="text-sm text-foreground/60 mb-1">{label}</p>
        <p className="text-3xl font-bold text-primary">{value}</p>
        {/* <p className="text-xs text-foreground/50 mt-1">People you invited</p> */}
      </div>
  )
}

export default index
