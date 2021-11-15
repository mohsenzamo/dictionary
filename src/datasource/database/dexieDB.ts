import Dexie from 'dexie'

export interface categoryType{
  CategoryID: number,
  Title: string,
  Icon: string,
  CustomOrder: number,
  IsFree:number,
  LastUpdate:number,
  Status:number,
  ActiveInIraqDialect:number,
  ActiveInEmiratesDialect:number,
  ActiveInLebanonDialect:number,
}

export interface wordType {
    WordID: number,
    CategoryID: number,
    Fa:string,
    Ar:string
    ReferTo: boolean,
    Example: string,
    Type: number,
    Dialect: number,
    LastUpdate: number,
    SoundVersion: number,
    Status: number,
    bookmark: number,
}
export interface searchType {
    Word: string,
    WordID: number,
    CategoryID: number,
    text:string
    bookmark: number,
}
export class MyAppDatabase extends Dexie {
    categories: Dexie.Table<categoryType, number>;
    words:Dexie.Table<wordType, number>;
    search:Dexie.Table<searchType, number>;

    constructor () {
      super('MyAppDatabase')

      this.version(1).stores({
        categories: 'CategoryID,CustomOrder',
        words: 'WordID,CategoryID,wordID,Fa,Ar,bookmark',
        search: '++id,Word,WordID,CategoryID,bookmark'
      })

      this.categories = this.table('categories')
      this.words = this.table('words')
      this.search = this.table('search')
    }
}

const database = new MyAppDatabase()

export default database
