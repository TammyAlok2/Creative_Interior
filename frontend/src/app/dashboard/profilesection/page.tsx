import React from 'react'
import Profile from './ProfileSection'
import DashboardLayout from '../DashboardLayout'

const ProfileSection = () => {
  return (
    <DashboardLayout>
      <div className='box-shadow border p-2 rounded-xl w-[100%]'>
        <Profile />
      </div>
    </DashboardLayout>
  )
}

export default ProfileSection