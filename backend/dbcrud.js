var config = require("./dbconfig.js");
const sql = require("mssql");

async function getElencoAccount() {
    try {
    let pool = await sql.connect(config);
    let elenco = await pool.request().query("SELECT * from Account");
    return elenco.recordsets;
  } catch (error) {
    console.error(error)   
  }
}

async function Login(Email) {
  try {
    let pool = await sql.connect(config)
    
    let account = await pool.request()
    .input("Email", sql.NVarChar, Email)  
    .query("SELECT * FROM Account WHERE @Email = Email")
    return account.recordsets
    
  } catch (error) {
    console.error(error)
  }
}

async function aggiungiAccount(Account) {
  try {
    let pool = await sql.connect(config);
    let nuovoAccount = await pool
      .request()
      .input("Nome", sql.NVarChar, Account.Nome)
      .input("Cognome", sql.NVarChar, Account.Cognome)
      .input("Email", sql.NVarChar, Account.Email)
      .input("Password", sql.NVarChar, Account.Password)
      .input("DataIscrizione", sql.Date, Account.DataIscrizione)
      .query(
        "INSERT INTO Account (Nome, Cognome, Email, Password, DataIscrizione) VALUES (@Nome, @Cognome, @Email, @Password, @DataIscrizione)"
      );
    return nuovoAccount.recordsets;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getElencoAccount: getElencoAccount,
  aggiungiAccount: aggiungiAccount,
  Login : Login
}