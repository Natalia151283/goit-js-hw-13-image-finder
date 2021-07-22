const API_KEY = '22573118-ce6a930964104bc915d64b0ed';
const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal'
export default class newApiServer{
    constructor(){
        this.searchQuery = ''
        this.page=1
        }
   async  fetchArticles(){
      
        const url = await fetch(`${BASE_URL}&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`);
        const {hits} = await url.json()
        
              return hits;
         
    //     const url = `${BASE_URL}&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    //  return fetch(url)
    //     .then(r => r.json())
    //     .then(({hits})=> {
    //         this.incremenPage();
    //        return hits;
    //     });
        }

        incremenPage(){
            this.page += 1;
        }

         resetPage(){    
        this.page = 1;
        }

        get query (){
            return this.searchQuery;
        }
        set query(newQuery){
            this.searchQuery = newQuery;
        }
    }




