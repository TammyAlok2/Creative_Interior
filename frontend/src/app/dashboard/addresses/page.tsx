import React ,{Suspense} from 'react'
import ManageAddresses from './address-subcomponents/ManageAddresses'
import DashboardLayout from '../DashboardLayout'

const Address = () => {
  return (
    <DashboardLayout>
      <div className='w-full'>

        
      <Suspense fallback={<div>Loading...</div>}>
        <ManageAddresses />
      </Suspense>
      </div>
    </DashboardLayout>
  )
}

export default Address
