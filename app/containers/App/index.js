/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react'
import Instances from '../Instances/Loadable'
import {Route, Switch} from 'react-router-dom'
import PrivacyPolicy from 'containers/PrivacyPolicy/Loadable'
import TermsOfUse from 'containers/TermsOfUse/Loadable'
import '../../styles/css/index.css'

export default function App () {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Instances}/>
        <Route path='/privacy-policy' component={PrivacyPolicy}/>
        <Route path='/terms-of-service' component={TermsOfUse}/>
      </Switch>
    </div>
  )
}
