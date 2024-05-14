import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-1">
    <Image
      src="/logo.png"
      alt="admin logo"width="40" height={"40"}
      style={{ width: "40px", filter: "invert(100%)" }}
    />
    <span  className="text-2xl font-bold letter-spacing-wide">
      Dev
    </span>
   </Link >
)
}

export default Logo