/**
 *
 * Asynchronously loads the component for TermsOfUse
 *
 */

import Loadable from 'react-loadable'

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
})
