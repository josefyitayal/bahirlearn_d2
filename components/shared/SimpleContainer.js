import { cn } from '@/lib/utils'
import React from 'react'

function SimpleContainer({children, className}) {
  return (
    <div className={cn('rounded-md bg-white p-3 shadow-[0px_0px_5px_#dddddd] w-fit', className)} >
      {children}
    </div>
  )
}

export default SimpleContainer
