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
        account.transactions.forEach(transaction => {
          delete transaction._id;
          transaction.accountId = account._id;
          const model = new TransactionModel(transaction);
          const promise = new Promise((resolve, reject) => {
            model.save(err => {
              if (err) {
                return reject();
              }

              resolve();
            });
          });

          promises.push(promise);
        });
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