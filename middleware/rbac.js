import _ from 'lodash';

const privilegeCheck = (auth, url) => {
  const routes = [
    {
      id: 1,
      url: [
        '/',
      ],
    },
    {
      id: 2,
      url: [
        '/',
        '/profile',
        '/projects',
      ],
    },
  ];

  const d = _.find(routes, { id: auth.role_id });

  if (d) return !!_.find(d.url, (o) => o === url);
};

export default function ({
  app,
  route,
  error,
}) {
  // Force logout ketika state masih login tapi token cookies expired
  if (app.$auth.loggedIn) {
    app.$auth.logout();
    return false;
  }

  const auth = app.$auth.user;
  const { matched } = route;
  const oPath = _.last(matched);

  if (!privilegeCheck(auth, (oPath && oPath.path) || '/')) {
    error({ statusCode: 403, message: 'You don\'t have any permission to access this page.' });
  }

  return true;
}
