import React from 'react'
import SubHeader from '@/components/Dashboard/Subheader/Subheader'

const CommitsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <SubHeader />
        {children}
    </div>
  )
}

export default CommitsLayout