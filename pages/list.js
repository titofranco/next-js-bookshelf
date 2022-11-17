import Link from 'next/link'
import { ListItemList } from "../components/list-item-list"
import Layout from '../components/layout'

export default function List() {
  return (
    <Layout>
      <ListItemList
        filterListItems={li => !li.finishDate}
        noListItems={
          <p>
            Hey there! Welcome to your bookshelf reading list. Get started by
            heading over to <Link href="/discover">the Discover page</Link> to add
            books to your list.
          </p>
        }
        noFilteredListItems={
          <p>
            Looks like you've finished all your books! Check them out in your{' '}
            <Link href="/finished">finished books</Link> or{' '}
            <Link href="/discover">discover more</Link>.
          </p>
        }
      />
    </Layout>
  )
}


