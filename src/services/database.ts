import * as SQLite from 'expo-sqlite';
import { Calculation, Scenario, User } from '../types';

class DatabaseService {
  private db: SQLite.SQLiteDatabase | null = null;

  /**
   * Initialize database and create tables
   */
  async init(): Promise<void> {
    try {
      this.db = await SQLite.openDatabaseAsync('finance_calculator.db');

      // Create users table
      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          locale TEXT NOT NULL,
          defaultCurrency TEXT NOT NULL,
          notificationPrefs TEXT,
          createdAt INTEGER NOT NULL
        );
      `);

      // Create calculations table
      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS calculations (
          id TEXT PRIMARY KEY,
          userId TEXT NOT NULL,
          calculatorId TEXT NOT NULL,
          inputs TEXT NOT NULL,
          results TEXT NOT NULL,
          createdAt INTEGER NOT NULL,
          title TEXT,
          FOREIGN KEY (userId) REFERENCES users (id)
        );
      `);

      // Create scenarios table
      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS scenarios (
          id TEXT PRIMARY KEY,
          userId TEXT NOT NULL,
          name TEXT NOT NULL,
          calculatorId TEXT NOT NULL,
          inputs TEXT NOT NULL,
          results TEXT NOT NULL,
          createdAt INTEGER NOT NULL,
          FOREIGN KEY (userId) REFERENCES users (id)
        );
      `);

      // Create index for faster queries
      await this.db.execAsync(`
        CREATE INDEX IF NOT EXISTS idx_calculations_userId 
        ON calculations (userId);
      `);

      await this.db.execAsync(`
        CREATE INDEX IF NOT EXISTS idx_calculations_createdAt 
        ON calculations (createdAt DESC);
      `);

      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  /**
   * Save a calculation
   */
  async saveCalculation(calculation: Calculation): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      await this.db.runAsync(
        `INSERT INTO calculations (id, userId, calculatorId, inputs, results, createdAt, title)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          calculation.id,
          calculation.userId,
          calculation.calculatorId,
          JSON.stringify(calculation.inputs),
          JSON.stringify(calculation.results),
          calculation.createdAt.getTime(),
          calculation.title || null,
        ]
      );
    } catch (error) {
      console.error('Error saving calculation:', error);
      throw error;
    }
  }

  /**
   * Get recent calculations for a user
   */
  async getRecentCalculations(userId: string, limit: number = 50): Promise<Calculation[]> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      const rows = await this.db.getAllAsync(
        `SELECT * FROM calculations 
         WHERE userId = ? 
         ORDER BY createdAt DESC 
         LIMIT ?`,
        [userId, limit]
      );

      return rows.map((row: any) => ({
        id: row.id,
        userId: row.userId,
        calculatorId: row.calculatorId,
        inputs: JSON.parse(row.inputs),
        results: JSON.parse(row.results),
        createdAt: new Date(row.createdAt),
        title: row.title,
      }));
    } catch (error) {
      console.error('Error getting calculations:', error);
      throw error;
    }
  }

  /**
   * Save a scenario
   */
  async saveScenario(scenario: Scenario): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      await this.db.runAsync(
        `INSERT INTO scenarios (id, userId, name, calculatorId, inputs, results, createdAt)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          scenario.id,
          scenario.userId,
          scenario.name,
          scenario.calculatorId,
          JSON.stringify(scenario.inputs),
          JSON.stringify(scenario.results),
          scenario.createdAt.getTime(),
        ]
      );
    } catch (error) {
      console.error('Error saving scenario:', error);
      throw error;
    }
  }

  /**
   * Get scenarios for a calculator
   */
  async getScenarios(userId: string, calculatorId: string): Promise<Scenario[]> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      const rows = await this.db.getAllAsync(
        `SELECT * FROM scenarios 
         WHERE userId = ? AND calculatorId = ? 
         ORDER BY createdAt DESC`,
        [userId, calculatorId]
      );

      return rows.map((row: any) => ({
        id: row.id,
        userId: row.userId,
        name: row.name,
        calculatorId: row.calculatorId,
        inputs: JSON.parse(row.inputs),
        results: JSON.parse(row.results),
        createdAt: new Date(row.createdAt),
      }));
    } catch (error) {
      console.error('Error getting scenarios:', error);
      throw error;
    }
  }

  /**
   * Delete a calculation
   */
  async deleteCalculation(id: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      await this.db.runAsync('DELETE FROM calculations WHERE id = ?', [id]);
    } catch (error) {
      console.error('Error deleting calculation:', error);
      throw error;
    }
  }

  /**
   * Clear all data (for testing/reset)
   */
  async clearAllData(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      await this.db.execAsync(`
        DELETE FROM calculations;
        DELETE FROM scenarios;
        DELETE FROM users;
      `);
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const database = new DatabaseService();
