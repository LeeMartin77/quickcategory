export interface StorageType {
  setupDatabase: () => Promise<void>;
  shutdownDatabase: () => Promise<void>;
}
