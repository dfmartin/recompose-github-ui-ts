import * as React from 'react'
import { render } from 'react-dom'
import { componentFromStream, createEventHandler } from 'recompose'
import { combineLatest } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import User from './User'
import './observableConfig'
const App = componentFromStream(prop$ => {
  const { handler, stream } = createEventHandler()
  const value$ = stream.pipe(
    map(e => e.target.value.trim()),
    startWith('')
  )

  return combineLatest(prop$, value$).pipe(
    map(([props, value]) => (
      <div>
        <input onChange={handler} placeholder="GitHub username" />
        <User user={value} />
      </div>
    ))
  )
})

const rootElement = document.getElementById('root')
render(<App />, rootElement)
