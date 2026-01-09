import React from 'react'
import '../UserStyles/UserDashboard.css'

function UserDashboard({user}) {
  return (
    <div className='dashboard-container'>
        <div className='profile-header'>
            <span className='profile-name'> {user.name || 'User'}</span>
        </div>
    </div>
  )
}

export default UserDashboard