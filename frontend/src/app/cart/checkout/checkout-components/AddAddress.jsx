import React from 'react'
// import { AddressSectionProps } from './AddressSection'

const AddAddress = ({handleSelectPage}) => {
    return (
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Select Address</h2>
            <button
                className="text-orange-orange500 font-semibold hover:underline"
                onClick={()=>handleSelectPage("add-address")}
            >
                + Add New Address
            </button>
        </div>
    )
}

export default AddAddress
