import React from 'react'

interface SeperatorProps {
  text: string
}

export const Seperator: React.FC<SeperatorProps> = ({text}) => {
  return (
<div className="relative py-4">
  <div className="absolute inset-0 flex items-center">
    <div className="w-full border-b border-gray-300"></div>
  </div>
  <div className="relative flex justify-center">
    <span className="bg-gray-950 px-4 text-lg text-white-500">{text}</span>
  </div>
</div>
  )
}
