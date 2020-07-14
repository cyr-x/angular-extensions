module.exports = {
  docs: [
    {
      type: 'doc',
      id: 'installation'
    },
    {
      type: 'doc',
      id: 'usage',
    },
    {
      type: 'category',
      label: 'Directives',
      items: [
        'directives/click-outside',
        'directives/if-directive',
        'directives/let-directive',
      ],
    },
    {
      type: 'category',
      label: 'Services',
      items: [
        'services/document-ref',
        'services/window-ref',
      ],
    },
  ],
};
