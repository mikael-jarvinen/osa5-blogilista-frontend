import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import Container from '@material-ui/core/Container'

const render = () => {
  console.log('rendering')
  ReactDOM.render(
    <Container>
      <Provider store={store}>
        <App />
      </Provider>
    </Container>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)