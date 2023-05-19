const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", () => {
    test("Solve a puzzle with valid puzzle string: POST request to /api/solve", function (done) {
        chai.request(server)
            .post("/api/solve")
            .send({
                puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
            })
            .end(function (err, res) {
                assert.equal(
                    res.body.solution,
                    "135762984946381257728459613694517832812936745357824196473298561581673429269145378"
                );
                done();
            });
    });

    test("Solve a puzzle with missing puzzle string: POST request to /api/solve", function (done) {
        chai.request(server)
            .post("/api/solve")
            .send()
            .end(function (err, res) {
                assert.equal(res.body.error, "Required field missing");
                done();
            });
    });

    test("Solve a puzzle with invalid characters: POST request to /api/solve", function (done) {
        chai.request(server)
            .post("/api/solve")
            .send({
                puzzle: "1.5..2.84..x3.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
            })
            .end(function (err, res) {
                assert.equal(res.body.error, "Invalid characters in puzzle");
                done();
            });
    });

    test("Solve a puzzle with incorrect length: POST request to /api/solve", function (done) {
        chai.request(server)
            .post("/api/solve")
            .send({
                puzzle: "1.5..2.84..3.12.7.2..5.....9..1....8.9.47...8..1..16....926914.37.",
            })
            .end(function (err, res) {
                assert.equal(
                    res.body.error,
                    "Expected puzzle to be 81 characters long"
                );
                done();
            });
    });

    test("Solve a puzzle that cannot be solved: POST request to /api/solve", function (done) {
        chai.request(server)
            .post("/api/solve")
            .send({
                puzzle: "155..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
            })
            .end(function (err, res) {
                assert.equal(res.body.error, "Puzzle cannot be solved");
                done();
            });
    });
});
