// Requerimos el smart contract
const Concert = artifacts.require('Concert');

// Variables
const ticketPrice = 2;
let instance;

//  Por cada test se genera una nueva instancia del contrato
beforeEach(async () => {
    instance = await Concert.new("Metallica", ticketPrice);
});

contract('Concert', accounts => {

    // Test del buyTicket 1
    it('should allow purchase if correct value is sent', async () => {
        try {
            await instance.buyTicket(
                {   from:   accounts[0],
                    value:  web3.utils.toWei(ticketPrice.toString(), 'ether'),
                }
            );
        } catch (e) {
            assert.fail(e.reason);
        }
    });
    // Test del buyTicket 2
    it('should not allow purchase if incorrect value is sent', async () => {
        try {
            await instance.buyTicket(
                {   from:   accounts[0],
                    value:  web3.utils.toWei("1", 'ether'),
                }
            );
            assert.fail('Incorrect purchase');
        } catch (e) {
            assert(e.reason == 'IncorrectPrice');
        }
    });
    // Ticket refund to another account
    it('should allow to refund to another account if it is a customr', async () => {
        try {
            await instance.buyTicket(
                {   from:   accounts[0],
                    value:  web3.utils.toWei(ticketPrice.toString(), 'ether'),
                }
            );
            let balanceOld = await web3.eth.getBalance(accounts[1]);
            await instance.refundTicketToAccount(
                accounts[1],
                {   from:   accounts[0],
                }
            );    
            let balanceNew = await web3.eth.getBalance(accounts[1]); 
            assert(balanceNew - balanceOld == web3.utils.toWei(ticketPrice.toString(), 'ether'));
        } catch (e) {
            assert.fail(e.reason);
        }
    });
    // Ticket transfer
    it('should allow transfer the ticket to another account', async () => {
        try {
            await instance.buyTicket(
                {   from:   accounts[1],
                    value:  web3.utils.toWei(ticketPrice.toString(), 'ether'),
                }
            );
            await instance.transferTicket(accounts[2], {from: accounts[1]})
            let oldCustomer = await instance.isAccountCustomer(accounts[1], {from: accounts[0]});
            let newCustomer = await instance.isAccountCustomer(accounts[2], {from: accounts[0]});
            assert (!oldCustomer && newCustomer);
        } catch (e) {
            assert.fail(e.reason);
        }
    });
    // Ticket transfer
    it('should not allow transfer the ticket to an already customer', async () => {
        try {
            await instance.buyTicket(
                {   from:   accounts[1],
                    value:  web3.utils.toWei(ticketPrice.toString(), 'ether'),
                }
            );
            await instance.buyTicket(
                {   from:   accounts[2],
                    value:  web3.utils.toWei(ticketPrice.toString(), 'ether'),
                }
            );
            await instance.transferTicket(accounts[2], {from: accounts[1]});
            assert.fail('Se ha permitido transferir a alguien que ya era cliente');
        } catch (e) {
            assert(e.reason == 'AlreadyCustomer');
        }
    });
});


