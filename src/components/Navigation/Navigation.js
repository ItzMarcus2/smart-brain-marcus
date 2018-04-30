import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn) {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <div className='shadow-4 br1 ma4'>
            <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa2 pointer button-size'>Sign Out</p>
          </div>
        </nav>
      );
    } else {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <div className='shadow-4 br1 ma3'>
            <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa2 pointer button-size'>Sign In</p>
          </div>
          <div className='shadow-4 br1 ma3'>
            <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa2 pointer button-size'>Register</p>
          </div>
        </nav>
      );
    }
}

export default Navigation;
