import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../utils.js';
import * as motorService from '../api/motors.js';

const searchTemplate = (onSubmit) => html`
<section id="search">

        <div class="form">
          <h4>Search</h4>
          <form @submit=${onSubmit} class="search-form">
            <input type="text" name="search" id="search-input"/>
            <button class="button-list">Search</button>
          </form>
        </div>
        <h4 id="result-heading">Results:</h4>
          <div class="search-result">
         <h2 class="no-avaliable">No result.</h2>
          <!--If there are matches display a div with information about every motorcycle-->
         <div class="motorcycle">
          <img src="./images/Honda Hornet.png" alt="example1" />
          <h3 class="model">Honda Hornet</h3>
            <a class="details-btn" href="">More Info</a>
        </div>
          </div>
                </section>`;


export function searchPage(ctx) {
  ctx.render(searchTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
  if (Object.values(data).some(f => f == '')) {
    return alert('All fields are required!')
  }

  // await motorService.create({
  //     model: data.model,
  //     imageUrl: data.imageUrl,
  //     year: data.year,
  //     mileage: data.mileage,
  //     contact: data.contact,
  //     about: data.about
  // });

  event.target.reset();
  ctx.page.redirect('/catalog');

}