import React, { Suspense } from 'react'
import AddDeliveryAddress from './add-address-components/AddDelivertyAddress'

const AddDeliveryAddressContainer = ({ handleSelectPage }) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AddDeliveryAddress handleSelectPage={handleSelectPage} />
      </Suspense>
    </div>
  )
}

export default AddDeliveryAddressContainer