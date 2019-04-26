const app = require('../src/app')

describe('App', ()=> {
    it("GET/ responds with 200 'Hello World'", ()=> {
        return supertest(app)
        .get('/test')
        .query({test: 'test'})
        .then(res => {
            expect(res.body).to.equal('test')
        });
    });
});