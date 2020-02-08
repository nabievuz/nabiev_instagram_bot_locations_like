const ig = require('./instagram');

(async () => {

  await ig.initialize();

  await ig.login('yourlogin', 'yourpassword');

  await ig.likeLocationsProcess(['421531425','48811293','1031836266','236070306','195140977708957','236365685','218553139','621492874688929','1721644888057246','759448708','645888888','1018184399','119776798581296']);

})();
