// este arquivo cria a conexão com o banco
// este arquivo carrega os models da aplicação
import Sequelize from 'sequelize';

import databaseConfig from '../configs/database'; // configurações da base de dados

// importando os Models
import User from '../app/models/user.model';
import Session from '../app/models/session.model';
import Account from '../app/models/account.model';
import Transaction from '../app/models/transaction.model';

// Criando um Array com todos os models da aplicação
const models = [User, Session, Account, Transaction];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig); // gera a conexão com o BD.
    // É a variável que é esperada dentro dos models dentro do método 'init'

    // Depois da conexão com o banco de dados, percorrer o array de models
    models
      .map((model) => model.init(this.connection))

      // Associações
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
