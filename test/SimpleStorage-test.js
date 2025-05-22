const { expect } = require("chai");

describe("SimpleStorage contract", function () {
  let SimpleStorage, simpleStorage, owner;

  beforeEach(async function () {
    SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorage.deploy();
    await simpleStorage.deployed();
    [owner] = await ethers.getSigners();
  });

  it("初始值應該是 0", async function () {
    expect(await simpleStorage.get()).to.equal(0);
  });

  it("設置數值後，get() 應該返回該數值", async function () {
    await simpleStorage.set(42);
    expect(await simpleStorage.get()).to.equal(42);
  });
});
