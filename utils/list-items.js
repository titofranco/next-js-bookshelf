import { useQuery, useMutation, useQueryClient } from 'react-query'
import { setQueryDataForBook } from './books'
import { useClient } from '../context/auth-context'

function useListItem(bookId, options) {
  const listItems = useListItems(options)
  return listItems?.find(li => li.bookId == bookId) ?? null
}

function useListItems(options = {}) {
  const client = useClient()

  const {data: listItems} = useQuery({
    queryKey: 'list_items',
    queryFn: () => client('list_items').then(data => data),
    ...options,
    config: {
      ...options.config,
      onSuccess: async listItems => {
        await options.config?.onSuccess?.(listItems)
        for (const listItem of listItems) {
          setQueryDataForBook(listItem.book)
        }
      },
    },
  })
  return listItems ?? []
}

const defaultMutationOptions = (queryClient) => {
  return {
    onError: (err, variables, recover) =>
    typeof recover === 'function' ? recover() : null,
    onSettled: () => {
      queryClient.invalidateQueries('list_items')
    },
  }
}

function useUpdateListItem(options) {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation(
    updates =>
      client(`list_items/${updates.id}`, {
        method: 'PUT',
        data: updates,
      }),
    {
      onMutate: (newItem) => {

        const previousItems = queryClient.getQueryData('list_items')

        queryClient.setQueryData('list_items', old => {
          return old.map(item => {
            return item.id === newItem.id ? {...item, ...newItem} : item
          })
        })

        return () => queryClient.setQueryData('list_items', previousItems)
      },
      ...defaultMutationOptions(queryClient),
      ...options,
    },
  )
}

function useRemoveListItem(options) {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation(({id}) => client(`list_items/${id}`, {method: 'DELETE'}), {
    onMutate: removedItem => {
      const previousItems = queryClient.getQueryData('list_items')

      queryClient.setQueryData('list_items', old => {
        return old.filter(item => item.id !== removedItem.id)
      })

      return () => queryClient.setQueryData('list_items', previousItems)
    },
    ...defaultMutationOptions(queryClient),
    ...options,
  })
}

function useCreateListItem(options) {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation(({bookId, startDate}) => client('list_items', {data: {bookId, startDate}}), {
    ...defaultMutationOptions(queryClient),
    ...options,
  })
}

export {
  useListItem,
  useListItems,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
}
