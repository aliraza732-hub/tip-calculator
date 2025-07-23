// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'hsl(172, 67%, 45%)',
        'green-900': 'hsl(183, 100%, 15%)',
        'grey-500': 'hsl(186, 14%, 43%)',
        'grey-400': 'hsl(184, 14%, 56%)',
        'grey-200': 'hsl(185, 41%, 84%)',
        'grey-50': 'hsl(189, 47%, 97%)',
      },
      fontSize: {
        form: '24px',
      },
      fontFamily: {
        body: ['"Space Mono"', 'monospace'], // Match design typography
      },
    },
  },
};
