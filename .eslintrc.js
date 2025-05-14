module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    // React Native rules
    // Typically style-related rules can be warnings or off based on team preferences
    'react-native/no-unused-styles': 'warn', // Was off, recommend warn to catch dead code
    'react-native/sort-styles': 'off', // Subjective style preference, keep off
    'react-native/no-inline-styles': 'warn', // Was off, recommend warn for maintainability
    'react-native/no-color-literals': 'off', // Keep off if you don't use a theming system
    'react-native/no-single-element-style-arrays': 'warn', // Was off, recommend warn for performance
    'react-native/no-raw-text': 'off', // Keep off if this conflicts with your component structure

    // React rules - errors for issues that could cause bugs
    'react/prop-types': 'off', // Keep off if using TypeScript for type checking
    'react/display-name': 'warn', // Was off, recommend warn for debugging and component tooling
    'react/jsx-curly-brace-presence': [
      'error', // Good as error - enforces consistent JSX syntax
      {props: 'never', children: 'never'},
    ],
    'react/jsx-key': 'error', // Correctly set as error - prevents rendering issues
    'react/jsx-no-duplicate-props': 'error', // Correctly set as error - prevents bugs

    // JavaScript rules
    'no-console': ['warn', {allow: ['warn', 'error']}], // Correctly set as warn
    'no-unused-vars': [
      'warn', // Correctly set as warn
      {argsIgnorePattern: '^_', varsIgnorePattern: '^_'},
    ],
    'no-duplicate-imports': 'error', // Correctly set as error - affects bundle size
    'no-var': 'error', // Correctly set as error - enforces modern JS
    'prefer-const': 'error', // Correctly set as error - prevents mutation bugs
    'prefer-template': 'warn', // Correctly set as warn - readability suggestion
    quotes: ['warn', 'single', {avoidEscape: true}], // Correctly set as warn - style preference
    semi: ['error', 'always'], // Correctly set as error - prevents ASI issues

    // TypeScript rules
    '@typescript-eslint/no-unused-vars': [
      'warn', // Correctly set as warn
      {argsIgnorePattern: '^_', varsIgnorePattern: '^_'},
    ],

    // Formatting - generally warnings as they don't affect functionality
    indent: ['warn', 2, {SwitchCase: 1}], // Correctly set as warn
    'max-len': [
      'warn', // Correctly set as warn
      {
        code: 100,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'comma-dangle': ['warn', 'always-multiline'], // Correctly set as warn

    // Additional recommended rules to consider
    'no-undef': 'error', // Should be error - catches reference errors
    eqeqeq: ['error', 'always'], // Should be error - prevents type coercion bugs
    'no-empty': 'warn', // Should be warn - empty blocks may indicate forgotten code
    curly: ['error', 'all'], // Consider error - enforces consistent block syntax
    '@typescript-eslint/explicit-function-return-type': 'off', // Off with TypeScript inference
    '@typescript-eslint/no-explicit-any': 'warn', // Consider warn to encourage proper typing
  },
};
