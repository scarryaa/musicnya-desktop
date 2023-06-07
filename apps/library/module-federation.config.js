module.exports = {
  name: 'library',
  exposes: {
    './Routes': 'apps/library/src/app/remote-entry/entry.routes.ts',
  },
};
