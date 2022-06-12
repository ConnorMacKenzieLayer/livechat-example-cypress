describe('Sleep test', () => {
    it('successfully loads', () => {
        let sleep = Math.floor(Math.random() * 100) + 1;
        cy.wait(sleep * 1000)
        cy.visit('/')
    })
})
