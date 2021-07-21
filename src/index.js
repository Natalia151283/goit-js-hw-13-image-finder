import cardGallery from './templates/cards.hbs';
import './sass/main.scss';
import LoadMoreBtn from './load-more-btn.js'
import NewsApiService from './apiService.js'
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
const basicLightbox = require('basiclightbox');

const  refs = {
    searchForm: document.querySelector('#search-form'),
    galleryConteiner: document.querySelector('.gallery'),
    // loadMoreBtn: document.querySelector('[data-action="load-more"]'),
    // listItem: document.querySelector('.gallery-item')
}

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit',onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles)


function onSearch(e){
    e.preventDefault();

newsApiService.query = e.currentTarget.elements.query.value;

if(newsApiService.query === ''){
    return alert('Не правильно введен текст!')
}
loadMoreBtn.show();
newsApiService.resetPage();
clearHitsConteiner();
fetchArticles()

}

function fetchArticles(){
    loadMoreBtn.disable();   
    newsApiService.fetchArticles().then(hits => {
    appenHits(hits);
    loadMoreBtn.enable();
    scrolEl();

});  
}
function appenHits(hits){
    refs.galleryConteiner.insertAdjacentHTML('beforeend', cardGallery(hits) )
}

function clearHitsConteiner(){
    refs.galleryConteiner.innerHTML = '';
}


function scrolEl(){
loadMoreBtn.refs.button.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});
}


