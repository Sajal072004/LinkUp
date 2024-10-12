import React from 'react'
import FriendRequests from './FriendRequests'
import Birthdays from './Birthdays'
import Advertisement from './Advertisement'

const RightMenu = ({userId} : {userId?: string}) => {
  return (
    <div className='flex flex-col gap-6'>
      <FriendRequests/>
      <Birthdays/>
      <Advertisement size="md"/>

    </div>
  )
}

export default RightMenu