/**
 *
 * Asynchronously loads the component for PrivacyPolicy
 *
 */

import Loadable from 'react-loadable'

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
})
