import { MyAppDatabase } from './dexieDB'
export class Nodes {
  constructor () {
    const db = new MyAppDatabase()
    db.table('categories').put({ CategoryID: 1, Title: 'زهرائی' })
    db.table('words').put({ WordID: 1, Fa: 'محسن', Ar: 'المحسن' })
    db.table('words').put({ WordID: 2, Fa: 'ارمین', Ar: 'الارمین' })
  }
}
