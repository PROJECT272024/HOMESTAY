import React from 'react'
import connectDB from '@/config/database'

const UserHome = async() => {
  await connectDB()
  return (
    <div>UserHome</div>
  )
}

export default UserHome