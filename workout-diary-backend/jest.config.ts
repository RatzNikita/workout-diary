const config = {
    clearMocks: true,
    coverageDirectory: "coverage",
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx"
    ],
    testEnvironment: "node",
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    }

};

export default config
