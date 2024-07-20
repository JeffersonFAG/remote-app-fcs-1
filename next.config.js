const NextFederationPlugin = require("@module-federation/nextjs-mf");

module.exports = {
  webpack(config, options) {
    const { isServer } = options;

    config.plugins.push(
      new NextFederationPlugin({
        name: "remote3", // Cambia el nombre según la aplicación remota
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./Pokemon": "./src/components/Atoms/Pokemon3",
        },
        shared: {
          react: {
            singleton: true,
          },
          "react-dom": {
            singleton: true,
          },
        },
      })
    );

    return config;
  },
};
