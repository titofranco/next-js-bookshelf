import Link from 'next/link'

export default function FourOhFour() {
  return (
    <div
      css={{
        height: '100%',
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        Sorry... nothing here. <Link href="/list">Go home</Link>
      </div>
    </div>
  )
}

