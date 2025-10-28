// had to wrap this in suspense https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
import { Suspense } from 'react'
import Registered from './Registered' 

export default function Page() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
        {/* the text is in <Registered /> */}
      <Registered />
    </Suspense>
  )
}
