import React from 'react'

const BackgroundPage: React.FC = () => {
  return (
    <div className="w-full h-screen bg-blue-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-blue-800 mb-2">
          Background Page
        </h2>
        <p className="text-blue-600">
          This is a blank background page.
        </p>
      </div>
    </div>
  )
}

export default BackgroundPage