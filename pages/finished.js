import Link from "next/link"
import { ListItemList } from "../components/list-item-list"
import Layout from "../components/layout"

export default function Finished() {
  return (
    <Layout>
      <ListItemList
        filterListItems={li => Boolean(li.finishDate)}
        noListItems={
          <p>
            Hey there! This is where books will go when you've finished reading
            them. Get started by heading over to{' '}
            <Link href="/discover">the Discover page</Link> to add books to your
            list.
          </p>
        }
        noFilteredListItems={
          <p>
            Looks like you've got some reading to do! Check them out in your{' '}
            <Link href="/list">reading list</Link> or{' '}
            <Link href="/discover">discover more</Link>.
          </p>
        }
      />
    </Layout>
  )
}
