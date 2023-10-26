import SubHeader from '@/components/Dashboard/Subheader/Subheader'
import React from 'react'

const BranchesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <SubHeader />
        {children}
    </div>
  )
}

export default BranchesLayout