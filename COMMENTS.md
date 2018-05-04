## const () => or function() for components? 

There is not really anything wrong with this here but I prefere instead of writing components like:

```
const Component = () => (
  <div>...</div>
);
```

I prefer this way:

```
function Component() {
  return <div>...</div>;
}
```

this comes from Engineers at AirBnB who created guidelines for React code you can find it here: https://github.com/airbnb/javascript/tree/master/react#class-vs-reactcreateclass-vs-stateless
 it is pretty nice :D)
Why?: https://medium.com/@stevemao/do-not-use-anonymous-functions-to-construct-react-functional-components-c5408ec8f4c7

## When structuring components in directories

When you have a structure like this: 
`/components/Signin/SignIn.js';`

you will have to import the component like this
`import SignIn from './components/Signin/SignIn.js';`
Where you end up typing out the name twice.

If you changed it to:
`/components/Signin/index.js';`

you could import it like this:
`import SignIn from './components/Signin';`
A bit short and less text to type :D

## Dealing with API calls

Generally it is preferred to keep the API calls outside of the components as the component don't really "need to know" about how the API call works.

example:
file: `src/components/Register/Register.js`
you have the following API call when registering:
```
onRegisterSubmit = () => {

  fetch('https://secret-crag-71418.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    }).then(response => response.json()).then(user => {
      if (user.id) {
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      }
  })
}
```
You could take the API call outside of the component; example:

file: `src/api/index.js`
```
export function registerUser(email, name, pasword) {
	return fetch('https://secret-crag-71418.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name,
        email,
        password,
      })
    }).then(response => response.json())
}
```

file: `src/components/Register/Register.js`

```
import { registerUser } from '../../api';

...

onRegisterSubmit = () => {
  const { name, email, password } = this.state;
  registerUser(name, email, password).then(user => {
	  if (user.id) {
      this.props.loadUser(user);
      this.props.onRouteChange('home');
    }
  })
}
```

This should simplify the code a bit more and also make a bit more reusable :) (at least that is what I think)

Also if you do like the above you might end up having all your API calls centralized, when you can avoid hardcoding the api url :) for example lets say you have multiple api function like the one above in the `src/api/index.js` you could do this:

```
const API_ROOT = 'https://secret-crag-71418.herokuapp.com';

...

export function registerUser(email, name, pasword) {
	return fetch(`${API_ROOT}/register`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name,
        email,
        password,
      })
    }).then(response => response.json())
}

...

export function otherAPIFunction) {
	return fetch(`${API_ROOT}/something`, {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
      body: {},
    }).then(response => response.json())
}
```

Then you only have the root url once and it will be easier to switch out and maintain if you move it to another heroku server for example then you just have to change it in one place :D
