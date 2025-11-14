// had to wrap this in suspense https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
import { Suspense } from 'react'
import Holyfuckingshit from './holyfuckingshit' 

export default function Page() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <Holyfuckingshit/>
    </Suspense>
  )
}
