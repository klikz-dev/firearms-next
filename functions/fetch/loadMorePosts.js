/* eslint-disable react-hooks/rules-of-hooks */
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function loadMorePosts(cursor) {
  const { data, error } = useSWR(
    cursor ? `/api/posts/?cursor=${cursor}` : undefined,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}
