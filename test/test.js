const cds = require("@sap/cds");

describe("Testing DB Connection", () => {
  it("should deploy the db schema to sqlite in-memory", async () => {
    db = await cds.deploy(__dirname + "/index").to("sqlite::memory:");
    expect(db.model).toBeDefined();
  });
});

describe("Testing northwind app", () => {
  it("Service name check", async () => {
    let srv = await cds.serve("northwind").from(__dirname + "/");
    expect(srv.name).toMatch("northwind");
  });

  it("Select on Northwind with value", async () => {
    const { Products } = cds.entities;
    let obj = await SELECT.one
      .from(Products, (c) => {
        c.Name, c.Description;
      })
      .where({ Name: "Milk" });

    expect(obj).toMatchObject({ Description: "Low fat milk" });
  });

  it("Insert Northwind product", async () => {
    const { Products } = cds.entities;
    return INSERT.into(Products).entries({
      Name: "Mango",
      Description: "Fruit king",
      ReleaseDate: "1992-01-01T00:00:00Z",
      DiscontinuedDate: null,
      Rating: 4,
      Price: "2.5",
    });
  });
});
