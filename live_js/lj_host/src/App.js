import React, { Suspense, useEffect } from 'react'
// import { init } from 'app1/index'
import { init } from 'app1/init'

const App11 = React.lazy(() => import('app1/App11'))
const App12 = React.lazy(() => import('app1/App12'))
// const { init } = import('app1/init')

const App = () => {
  useEffect(() => init('app1'), [])

  return (
    <div>
      <div
        style={{
          margin: '10px',
          padding: '10px',
          textAlign: 'center',
          backgroundColor: 'greenyellow',
        }}
      >
        <h1>Host</h1>
      </div>

      <hr />

      <Suspense fallback={'loading...'}>
        <App11>hgdfjkghkjd</App11>
        <App12 />
      </Suspense>

      <hr />

      <div id='app1'></div>
    </div>
  )
}

export default App
