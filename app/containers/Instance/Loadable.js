/**
 *
 * Asynchronously loads the component for Instance
 *
 */

import Loadable from 'react-loadable'

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
})
