import React from 'react'
import ReactDOM from 'react-dom'

import App11 from './App11'
import App12 from './App12'

console.log('fdsfsdf')

export const init = (id) => {
  ReactDOM.render(
    <App11>
      <App12 />
    </App11>,
    document.getElementById(id)
  )
}

export default init
