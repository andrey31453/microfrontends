import React, { Suspense } from 'react'
const App1 = React.lazy(() => import('app1/App'))

const App = () => {
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
        <App1 />
      </Suspense>
    </div>
  )
}

export default App
