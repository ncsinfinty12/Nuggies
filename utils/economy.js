const currency = require('../models/currencySchema');

module.exports = {
    /**
      * @param {string} id - user id
    */
    async bal(id){
        new Promise(async ful => {
        const data = await currency.findOne({ id });
        if(!data) return ful(0);
        ful(data.coins);
    })},
    /**
      * @param {string} id - user id
      * @param {number} coins - add coins
    */
    async add(id, coins) {
        currency.findOne({ id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                data.coins += parseInt(coins);
            }
            else {
                data = new currency({ id, coins });
            }
            data.save();
        });
    },
    /**
      * @param {string} id - user id
      * @param {number} coins - add coins
    */
    async remove(id, coins) {
        currency.findOne({ id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                data.coins -= coins;
            }
            else {
                data = new currency({ id, coins: -coins });
            }
            data.save();
        });
    }
}