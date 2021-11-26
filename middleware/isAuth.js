export default function ({ app, redirect }) {
  // If the user is not authenticated
  if (!app.$auth.loggedIn || !app.$cookies.get('auth._user')) {
    return redirect('/login');
  }

  return true;
}
