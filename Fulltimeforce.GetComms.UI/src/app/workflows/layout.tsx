import SubHeader from '@/components/Dashboard/Subheader/Subheader'
import React from 'react'

const WorkflowsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <SubHeader />
        {children}
    </div>
  )
}

export default WorkflowsLayout