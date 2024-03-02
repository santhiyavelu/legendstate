const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const {
  createSentryMetroSerializer,
} = require('@sentry/react-native/dist/js/tools/sentryMetroSerializer');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  serializer: {
    customSerializer: createSentryMetroSerializer(),
  },
};

// 2. Enable Tamagui
const {withTamagui} = require('@tamagui/metro-plugin');
module.exports = withTamagui(config, {
  components: ['tamagui'],
  config: './tamagui.config.ts',
  outputCSS: './tamagui-web.css',
});
module.exports = mergeConfig(getDefaultConfig(__dirname), config);
