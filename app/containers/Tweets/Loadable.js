/**
 *
 * Asynchronously loads the component for Tweets
 *
 */

import Loadable from 'react-loadable'

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
})
