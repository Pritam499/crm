import inquirer from 'inquirer';
import { Sequelize } from 'sequelize';
import * as models from './src/models/sync.js'; // Adjust the path according to your models' location
import {DB_NAME , DB_USER,DB_PASS, DB_HOST, DB_PORT } from './src/config/index.js';

// Initialize Sequelize with your database configuration
const sequelize = new Sequelize({
  dialect: 'postgres', // Adjust to your database dialect
  port: DB_PORT,
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  logging: false
});

async function syncDatabase(modelsToSync, syncOptions) {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.',DB_PORT,
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_NAME);

    // Sync individual models
    if (modelsToSync.length) {
      for (const model of modelsToSync) {
        if (models[model]) {
          await models[model].sync(syncOptions);
          console.log(`Model ${model} synced successfully.`);
        } else {
          console.log(`Model ${model} not found.`);
        }
      }
    } else {
      // Sync all models
      await sequelize.sync(syncOptions);
      console.log('All models synced successfully.');
    }

    sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

async function main() {
  const modelChoices = Object.keys(models)

  const modelAnswers = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'modelsToSync',
      message: 'Select models to sync:',
      choices: [...modelChoices],
      validate: (answer) => answer.length ? true : 'You must choose at least one model.',
    },
  ]);

  const syncOptionsAnswers = await inquirer.prompt([
    {
      type: 'list',
      name: 'syncOption',
      message: 'Select sync option:',
      choices: [
        { name: 'Alter (keep existing data)', value: { alter: true } },
        { name: 'Force (drop and recreate tables)', value: { force: true } },
        { name: 'None (do not use alter or force)', value: {} }
      ],
    }
  ]);

  await syncDatabase(
    modelAnswers.modelsToSync.includes('All') ? [] : modelAnswers.modelsToSync,
    syncOptionsAnswers.syncOption
  );
}
console.log("production",DB_NAME)

main();
