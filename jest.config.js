module.exports = {
  projects: [
    {
      displayName: "react-table",
      testEnvironment: "jsdom",
      testMatch: ["<rootDir>/packages/react-table/**/*.test.[jt]s?(x)"],
      setupFilesAfterEnv: [
        "<rootDir>/packages/react-table/__tests__/jest.setup.js",
      ],
      snapshotFormat: {
        printBasicPrototype: false,
      },
    },
    {
      displayName: "react-table-devtools",
      testEnvironment: "jsdom",
      testMatch: [
        "<rootDir>/packages/react-table-devtools/**/*.test.[jt]s?(x)",
      ],
      setupFilesAfterEnv: [
        "<rootDir>/packages/react-table-devtools/__tests__/jest.setup.js",
      ],
      snapshotFormat: {
        printBasicPrototype: false,
      },
    },
  ],
};
