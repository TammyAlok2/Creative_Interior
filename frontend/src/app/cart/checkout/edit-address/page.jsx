import React from 'react'
import EditDeliveryAddress from './EditDeliveryAddress'
// import { AddressSectionProps } from '../checkout-components/AddressSection'

const EditDeliveryAddressContainer = ({handleSelectPage, deliveryAddressId}) => {
  return (
    <div>
      <EditDeliveryAddress handleSelectPage={handleSelectPage} deliveryAddressId={deliveryAddressId} />
    </div>
  )
}

export default EditDeliveryAddressContainer
