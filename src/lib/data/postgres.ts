import postgres from "postgres";


// interface DatabaseClient {
//   connectionString: string;
// }

export class PostgresClient {
  // singleton pattern
  static instance: PostgresClient
  private connectionString: string;
  
  private constructor(connection_string: string) {
    this.connectionString = connection_string;
  }

  static get(connection_string: string): PostgresClient {
    if (!PostgresClient.instance) {
      PostgresClient.instance = new PostgresClient(connection_string)
    }
    return PostgresClient.instance
  }

  sql() {
    return postgres(this.connectionString, { ssl: "require" });
  }
}
