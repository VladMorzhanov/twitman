/**
 *
 * Asynchronously loads the component for Instances
 *
 */

import Loadable from 'react-loadable'

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
})
