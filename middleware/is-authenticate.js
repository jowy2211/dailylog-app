export default ({ app, redirect }) => {
  if (!app.$auth.loggedIn && !app.$auth.user) return redirect('/');

  return true;
}