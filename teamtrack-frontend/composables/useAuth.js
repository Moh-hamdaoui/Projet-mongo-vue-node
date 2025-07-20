export const useAuth = () => {
  const token = useCookie('token') 
  const user = useState('user', () => null)
  const isAuthenticated = computed(() => !!token.value)
  const { $api } = useNuxtApp()
  const router = useRouter()

  const login = async (email, password) => {
    try {
      const res = await $fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        body: { email, password },
      })

      if (res.token) {
        token.value = res.token
        user.value = res.user
        return { success: true }
      } else {
        return { success: false, error: 'Token manquant' }
      }
    } catch (err) {
      return { success: false, error: 'Identifiants invalides ou serveur indisponible' }
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    router.push('/login')
  }

  return {
    login,
    logout,
    token,
    user,
    isAuthenticated
  }
}
