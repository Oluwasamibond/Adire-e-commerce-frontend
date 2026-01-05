import React from 'react'
import '../UserStyles/Form.css'

function Register() {
  return (
    <div className="form-container container">
        <div className='form-content'>
            <form className="form">
                <h2>Sign Up</h2>
                <div className='input-group'>
                    <input type='text' placeholder='Username' name='name' />
                </div>
                <div className='input-group'>
                    <input type='email' placeholder='User Email' name='email' />
                </div>
                <div className='input-group'>
                    <input type='password' placeholder='Password' name='password' />
                </div>
                <div className='input-group avatar-group'>
                    <input type='file'  name='avatar' className='file-input' accept='image/' />
                    <img src='' alt='Avatar Prview' />
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register