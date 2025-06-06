interface CacheEntry<T=any>{
    data: T;
    timestamp : number;
    ttl: number;
}
export class Caching {
  private storage : Map<string,CacheEntry> = new Map();
  private defaultTTL : number;
 constructor(){
     this.defaultTTL= 300_000;
 }
 setCache<T=any>(key: string, value:T,ttl?:number){
     const entry :CacheEntry<T> ={
         data:value,
         timestamp:Date.now(),
         ttl:ttl?? this.defaultTTL,
     }
   this.storage.set(key, entry);
 }
 getCache<T=any>(key:string):T | null{
     const cache= this.storage.get(key)
     if(!cache) return null;
     const isExpired = Date.now() - cache.timestamp > cache.ttl;
     if(isExpired) {
        this.storage.delete(key)
        return null;
     }
     return cache.data;
 }
 clearAllCache(){
     const size = this.storage.size
     this.storage.clear();
     return console.log(` clear cache size: ${size}`);
 }
}