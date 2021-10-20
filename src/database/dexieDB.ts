import Dexie from 'dexie'

export interface Categories{
  CategoryID: number,
  Title: string
}

export interface Words {
    WordID: number,
    Fa:string,
    Ar:string
}
export class MyAppDatabase extends Dexie {
    categories: Dexie.Table<Categories, number>;
    words:Dexie.Table<Words, number>;

    constructor () {
      super('MyAppDatabase')

      //
      // Define tables and indexes
      // (Here's where the implicit table props are dynamically created)
      //
      this.version(1).stores({
        categories: 'CategoryID',
        words: 'WordID,Fa,Ar'
      })

      // The following lines are needed for it to work across typescipt using babel-preset-typescript:
      this.categories = this.table('categories')
      this.words = this.table('words')
    }
}

// By defining the interface of table records,
// you get better type safety and code completion
const db = new MyAppDatabase()

export default db