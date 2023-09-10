import { html } from '../../node_modules/lit-html/lit-html.js';
import * as motorService from '../api/motors.js';


const catalogTemplate = (motors) => html`
<h2>Available Motorcycles</h2>
<section id="dashboard">
  ${motors.length > 0
        ? motors.map(motorTemplate)
        : html` <h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`}  
</section>`;

const motorTemplate = (motor) => html`
<div class="motorcycle">
<img src="${motor.imageUrl}" />
<h3 class="model">${motor.model}</h3>
<p class="year">Year: ${motor.year}</p>
<p class="mileage">Mileage: ${motor.mileage}.</p>
<p class="contact">Contact Number: ${motor.contact}</p>
<a class="details-btn" href="/details/${motor._id}">More Info</a>
</div>`;

export async function catalogPage(ctx) {
    const motors = await motorService.getAll();
    ctx.render(catalogTemplate(motors));
}


