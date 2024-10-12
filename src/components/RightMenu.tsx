import React from 'react'
import FriendRequests from './FriendRequests'
import Birthdays from './Birthdays'
import Advertisement from './Advertisement'
import UserInfoCard from './UserInfoCard'
import UserMediaCard from './UserMediaCard'

const RightMenu = ({userId} : {userId?: string}) => {
  return (
    <div className='flex flex-col gap-6'>
      {userId ? (
        <>
        <UserInfoCard userId={userId} />
        <UserMediaCard userId={userId} />
        </>
      ) : null}
      <FriendRequests/>
      <Birthdays/>
      <Advertisement size="md"/>

    </div>
  )
}

export default RightMenu