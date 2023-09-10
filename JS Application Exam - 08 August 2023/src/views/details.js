import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as motorService from '../api/motors.js'

const detailsTemplate = (motor, onDelete) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${motor.imageUrl} />
            <p id="details-title">${motor.model}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="year">Year: ${motor.year}</p>
                <p class="mileage">Mileage: ${motor.mileage}.</p>
                <p class="contact">Contact Number: ${motor.contact}</p>
                   <p id = "motorcycle-description">${motor.about}</p>
              </div>
               ${motor.isOwner
        ? html`
                 <div id="action-buttons">
            <a href="/edit/${motor._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript.void(0)" id="delete-btn">Delete</a>
          </div>`
        : nothing}
         
            </div>
        </div>
      </section>`;


export async function detailsPage(ctx) {
    const motorId = ctx.params.id;
    const motor = await motorService.getById(motorId);

    if (ctx.user) {
        motor.isOwner = ctx.user._id == motor._ownerId;
    }
    ctx.render(detailsTemplate(motor, onDelete));

    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete ${motor.model}? `);
        if (choice) {
            await motorService.deleteById(motorId);
            ctx.page.redirect('/')
        }
    }
}