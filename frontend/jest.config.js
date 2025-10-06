module.exports = {
    clearMocks: true,
    coverageProvider: 'v8',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    roots: ['<rootDir>/tests', '<rootDir>/src'],
}