'use strict';

require('../dist/database');
const AccountModel = require('../dist/modules/account/account.model').AccountModel;
const TransactionModel = require('../dist/modules/transaction/transaction.model').TransactionModel;

/**
 * Make any changes you need to make to the database here
 */
exports.up = function up (done) {
  AccountModel.find()
    .exec()
    .then(accounts => {
      const promises = [];

      accounts.forEach(account => {
        const promise = TransactionModel.find({accountId: account._id})
          .exec()
          .then(transactions => {
            account.balance = transactions.reduce((balance, transaction) => {
              return balance + transaction.amount;
            }, 0);
            return new Promise((resolve, reject) => {
              account.save(err => {
                if (err) {
                  return reject();
                }
  
                resolve();
              });
            });
          });

        promises.push(promise);
      });

      Promise.all(promises).then(() => done()).catch(err => {
        console.log(err);
        done();
      });
    });
};

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
exports.down = function down(done) {
  done();
};