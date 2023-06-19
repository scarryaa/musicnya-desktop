module.exports = {
  name: 'room',
  exposes: {
    './Routes': 'apps/room/src/app/remote-entry/entry.routes.ts',
  },
}