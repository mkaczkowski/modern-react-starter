export default function getMetaData(env) {
  return {
    name: env.APP_TITLE, // Must be <= 45 characters. Appears in places with more space
    author: env.APP_AUTHOR,
    short_name: env.PWA_SHORT_TITLE, // Should be <= 12 characters. Appears on the home screen
    description: env.APP_DESCRIPTION,
    background_color: env.PWA_BACKGROUND_COLOR, // Android: Background color of your splash screen
    theme_color: env.PWA_THEME_COLOR, // Should match the color in your theme-color meta tag
    filename: 'manifest.json',
    start_url: './index.html', // The path in your app where the user should start
    lang: 'en-US',
  };
}
