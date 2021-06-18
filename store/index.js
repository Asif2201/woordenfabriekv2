export const getters = {
  isAuthenticated(state) {
    return (state.auth.loggedIn)
  },

  loggedInUser(state) {
    return 'Jaap'
  }
}
