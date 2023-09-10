import { html } from '../../node_modules/lit-html/lit-html.js';
import * as motorService from '../api/motors.js';
import { createSubmitHandler } from '../utils.js';


const editTemplate = (motor, onSubmit) => html`
<section id="edit">
            <h2>Edit Motorcycle</h2>
            <div class="form">
              <h2>Edit Motorcycle</h2>
              <form @submit=${onSubmit} class="edit-form">
                <input type="text" name="model" id="model" placeholder="Model" .value=${motor.model}/>
                <input type="text" name="imageUrl" id="moto-image" placeholder="Moto Image" .value=${motor.imageUrl} />
                <input type="number" name="year" id="year" placeholder="Year" .value=${motor.year}/>
                <input type="number" name="mileage" id="mileage" placeholder="mileage" value=${motor.mileage}/>
                <input type="number" name="contact" id="contact" placeholder="contact" .value=${motor.contact}/>
                <textarea id="about" name="about" placeholder="about" rows="10" cols="50" .value=${motor.about}></textarea>
                <button type="submit">Edit Motorcycle</button>
              </form>
          </div>
        </section>`;


export async function editPage(ctx) {
    const motorId = ctx.params.id;

    const motor = await motorService.getById(motorId)
    ctx.render(editTemplate(motor, createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
    const motorId = ctx.params.id;

    if (Object.values(data).some(f => f == '')) {
        return alert('All fields are required!')
    }

    await motorService.update(motorId, {
        model: data.model,
        imageUrl: data.imageUrl,
        year: data.year,
        mileage: data.mileage,
        contact: data.contact,
        about: data.about,
    });

    event.target.reset();
    ctx.page.redirect('/details/' + motorId);

}