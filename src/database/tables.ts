import { MyAppDatabase } from './dexieDB'
export class Nodes {
  constructor (mohsen:string) {
    const db = new MyAppDatabase()
    db.categories.add({ CategoryID: 1, Title: mohsen })
    db.categories.add({ CategoryID: 2, Title: 'ddd' })
    db.categories.add({ CategoryID: 3, Title: 'qwe' })
  }
}
