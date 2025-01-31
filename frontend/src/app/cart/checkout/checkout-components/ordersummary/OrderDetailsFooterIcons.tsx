import Image from 'next/image'
import React from 'react'

const OrderDetailsFooterIconsContainer = () => {
  return (
    <div className="flex justify-between items-center text-[.7rem] max-[1626px]:text-[.5rem] mt-4 opacity-[.8] font-thin">
        <div className="flex items-center justify-center flex-col text-center gap-2 px-[1rem]">
        <Image width={70} height={70} src={"/images/checkout/securityicon.jpg"} alt="icon"/>
        <h1>100% Safe & Secure Payments</h1>
        </div>
        <div className="flex items-center justify-center flex-col text-center gap-2 px-[1rem]">
        <Image width={65} height={65} src={"/images/checkout/returnandreplacement.jpg"} alt="icon"/>
        <h1>Easy return and replacements</h1>
        </div>
        <div className="flex items-center justify-center flex-col text-center gap-2 mt-[-.3rem] px-[1rem]">
        <Image width={80} height={80} src={"/images/checkout/shiping.jpg"} alt="icon" className="mb-[-.2rem]"/>
        <h1>Trusted Shipping</h1>
        </div>
      </div>
  )
}

export default OrderDetailsFooterIconsContainer
