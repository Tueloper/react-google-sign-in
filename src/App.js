import './App.css';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { gapi, loadAuth2, loadAuth2WithProps, loadClientAuth2 } from 'gapi-script';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

function App() {
  const [ user, setUser ] = useState(null);

  function handleCallbackResponse(response) {
    console.log(response);
    // const userObject = jwtDecode(response.accessToken);
    // console.log(userObject);
    setUser(response.profileObj);
    document.getElementById("signInDiv").hidden = false;
  }

  function handleSignOut(response) {
    console.log(response);
    setUser(null);
    document.getElementById("signInDiv").hidden = true;
  }

  const responseGoogle = (response) => {
    console.log(response);
  }

  useEffect(() => {
    // function start() {
    //   gapi.auth2.getAuthInstance({
    //     clientId: '576210486221-o3s6eut8r16q5oql11m6t9ibclhk9a3q.apps.googleusercontent.com',
    //     plugin_name: "chat"
    //   });
    // }

    // gapi.load('client:auth2', start);
    window.gapi.load('client:auth2', () => {
      window.gapi.auth2.getAuthInstance({
          clientId: '576210486221-o3s6eut8r16q5oql11m6t9ibclhk9a3q.apps.googleusercontent.com',
          plugin_name: "chat"
      })
    });
  }, []);

  return (
    <div className="App">
      <h1 className='name'> Google Sign In App</h1>
      <div id="signInDiv">
      {
         user !== null && 
        <div className="flex">
            <br></br>
            
              <img src={user.imageUrl}></img>
              <h2>{user.name}</h2>
              <h3>{user.email}</h3>
   
          <GoogleLogout
            clientId="576210486221-o3s6eut8r16q5oql11m6t9ibclhk9a3q.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={handleSignOut}
          />
        </div>
      }
      </div>

      <GoogleLogin
        clientId="576210486221-o3s6eut8r16q5oql11m6t9ibclhk9a3q.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={handleCallbackResponse}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
     
    </div>

   
  );
}

export default App;
