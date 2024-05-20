import { use, expect,should } from 'chai'
import chaiHttp from 'chai-http'
const chai = use(chaiHttp)

// chai.request()

// // Configure chai
// chai.require(chaiHttp);
// chai.should();

let app = null;

before((done) => {
	server.then((result) => {
		app = result;
		done();
	});
});

describe("Products Operation", () => {
	describe("GET /NorthWind/Products", () => {
		it("+ should return a list of products", (done) => {
			chai.request(app)
				.get("/NorthWind/Products")
				.end((error, response) => {
					try {
						response.should.have.status(200);
						response.body.value.should.be.an("array").to.have.lengthOf(10);
						done();
					} catch (error) {
						done(error);
					}
				});
		});
	});
});