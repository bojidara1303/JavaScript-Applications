import { render, html } from '../../node_modules/lit-html/lit-html.js'

const navTemplate = (user) => html`
<a id="logo" href="/"
><img id="logo-img" src="./images/logo.png" alt=""
/></a>

<nav>
<div>
  <a href="/catalog">Motorcycles</a>
  <a href="/search">Search</a>
</div>
${user
        ? html`
<div class="user">
  <a href="/create">Add Motorcycle</a>
  <a href="/logout">Logout</a>
</div>`
        : html`
<div class="guest">
  <a href="/login">Login</a>
  <a href="/register">Register</a>
</div>`}
</nav>`;

const header = document.querySelector('.my-header');
const root = document.getElementById('main-content');

function ctxRender(content) {
    render(content, root);
}

export function addRender(ctx, next) {
    ctx.render = ctxRender;
    render(navTemplate(ctx.user), header)
    next();

}