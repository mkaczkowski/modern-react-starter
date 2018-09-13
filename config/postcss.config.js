export default {
  stage: false,
  features: {
    'nesting-rules': true,
    'custom-media-queries': {
      extensions: {
        '--phone': '(max-width: 767px)',
        '--tablet': '(min-width: 768px)',
        '--desktop': '(min-width: 992px)',
        '--large-desktop': '(min-width: 1200px)',
      },
    },
  },
};
