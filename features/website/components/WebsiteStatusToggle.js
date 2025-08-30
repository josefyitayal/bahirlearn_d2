'use client'

import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { updateWebsiteStatus } from '../actions/update-website-status'

export function WebsiteStatusToggle({ status }) {
  const [currentStatus, setCurrentStatus] = useState(status)

  const onChange = async (nextStatus) => {
    setCurrentStatus(nextStatus) // optimistic UI update

    try {
      await updateWebsiteStatus(nextStatus)
      // Optionally: show toast or feedback
    } catch (error) {
      console.error('Failed to update status:', error)
      // Optionally: revert UI or show error
      setCurrentStatus(status)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={currentStatus === 'published'}
        onCheckedChange={(checked) => onChange(checked ? 'published' : 'private')}
      />
      <Label>{currentStatus === 'published' ? 'Published' : 'Private'}</Label>
    </div>
  )
}
