const generateUniqueId = require("../../src/utils/generateUniqueId");

describe("Generate Unique Id ", () => {
  it("Should generate as unique Id", () => {
    const id = generateUniqueId();
    expect(id).toHaveLength(8);
  });
});
