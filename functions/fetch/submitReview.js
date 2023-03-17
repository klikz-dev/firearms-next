export async function submitReview(data) {
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Token ${process.env.NEXT_PUBLIC_BACKEND_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    redirect: 'follow',
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reviews/`,
      requestOptions
    )
    if (!response.ok) {
      return new Error(response.statusText)
    }
    return await response.json()
  } catch (error) {
    return new Error('Failed to submit review')
  }
}
