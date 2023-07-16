import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const refs = {
    select: document.querySelector('.breed-select'),
    div: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
}

refs.div.style.marginTop = '30px';
refs.div.style.gap = '30px';

addDisplayNone(refs.loader);
addDisplayNone(refs.error);

refs.select.addEventListener("change", handlerOutput);


function handlerOutput(evt) {
   Notiflix.Loading.standard();
    addDisplayNone(refs.div);
    const breedId = refs.select.value;
       fetchCatByBreed(breedId)
           .then(data => {
            Notiflix.Loading.remove();
            refs.div.style.display = 'flex';
            refs.div.innerHTML = createMarkupCat(data);
})
        .catch(err => {
            addDisplayNone(refs.loader);
            Notiflix.Report.failure  ('error', refs.error.textContent);
        });
}

fetchBreeds()
    .then(data => {
        refs.select.insertAdjacentHTML("afterbegin", createMarkup(data));
         new SlimSelect({
            select: refs.select,
            settings: {
    allowDeselect: true,
   },
        });
       
})
    .catch(err => {
        Notiflix.Report.failure('error', refs.error.textContent);
    });

function createMarkup(arr) {
    return arr.map(({ id, name }) => 
 `<option value=${id}>${name}</option>`).join('')
}

 function createMarkupCat(arr) {
    return arr.map(({ url, breeds: { [0]: { name, description, temperament
 } } }) =>
        `<img src="${url}" alt="${name}" width = "400" >
        <div>
         <h2>${name}</h2>
         <p>${description}</p>
         <h4>Temperament:</h4>
         <p>${temperament}</p>
         </div>
         `).join('')
}

function addDisplayNone(elem){
    elem.style.display = 'none';
}

function addDisplayBlock(elem){
    elem.style.display = 'block';
}