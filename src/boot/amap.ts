import { boot } from 'quasar/wrappers';
import { useAmap } from '@dabu/vue3-amap'
import '@dabu/vue3-amap/dist/style.css'

const { initAMapApiLoader } = useAmap()
export default boot(async ({ app, router, store }) => {
  // something to do
  await initAMapApiLoader({
    key: '7be2db04cd9f4731621badb1e5ae6dec',
    version: '2.0'
  })
})
