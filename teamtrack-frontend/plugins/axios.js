export default defineNuxtPlugin(() => {
  const token = useCookie('token')
  const api = $fetch.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      Authorization: token.value ? `Bearer ${token.value}` : '',
    },
  })
  return { provide: { api } }
})
