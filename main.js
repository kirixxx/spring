async function loadData(json) {
    const response = await fetch(json);
    const menuData = await response.json();
    return menuData;
}

const data = await loadData('./header.json');
const dataProjects = await loadData('./projects.json');

const headerList = document.querySelector('.header__nav-list')
const burgerBtn = document.querySelector('.header__burger');
const hamburger = document.querySelector('.hamburger-react');
const navMenuList = document.querySelector('.nav-menu__list');
const navMenu = document.querySelector('.nav-menu');
const technologiesList = document.querySelector('.technologies__list');

let searchTimeout = 0;
const inputProject = document.querySelector('.custom-input__field');

inputProject.addEventListener('input', () => {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
        const query = inputProject.value.toLowerCase();

        if (query === '') {
            renderProjectsList(dataProjects, technologiesList);
        }

        const newData = dataProjects.filter(el =>
        (el.title.toLowerCase().includes(query)
            || el.description.toLowerCase().includes(query)));

        renderProjectsList(newData, technologiesList);
    }, 300);
})

burgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('is-open');
    navMenu.classList.toggle('is-open');
});

function renderNavMenu(data, container) {
    data.forEach(item => {
        console.log(item)
        const li = document.createElement('li');
        li.className = 'nav-item';

        const div = document.createElement('div');
        div.className = 'dropdown';

        const span = document.createElement('span');
        span.className = 'dropdown__title';
        span.textContent = item.title;

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'dropdown__icon');
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('width', '12');
        svg.setAttribute('height', '7');

        const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttribute('href', 'images/sprite.svg#icon-less');
        svg.appendChild(use);

        const ul = document.createElement('ul');
        ul.className = 'dropdown__menu-list';

        item.items.forEach(group => {
            if (group.subtitle && group.subtitle !== '') {
                const liSubtitle = document.createElement('li');
                const spanSubtitle = document.createElement('span');
                spanSubtitle.className = 'dropdown__item-text';
                spanSubtitle.textContent = group.subtitle;
                liSubtitle.appendChild(spanSubtitle);
                ul.appendChild(liSubtitle);
            }

            group.items.forEach(linkText => {
                const liLink = document.createElement('li');
                const a = document.createElement('a');
                a.className = 'dropdown__menu-link';
                a.href = '#';
                a.textContent = linkText;
                liLink.appendChild(a);
                ul.appendChild(liLink);
            });
        });

        div.append(span, svg, ul);
        li.append(div);
        container.append(li);
    });
}

function renderNavMobileMenu(data, container) {
    data.forEach(item => {
        console.log(item)
        const li = document.createElement('li');
        li.className = 'nav-item';

        const div = document.createElement('div');
        div.className = 'dropdown subitems-hidden';

        const button = document.createElement('button');
        button.className = 'dropdown__title';
        button.type = "button";
        button.textContent = item.title;

        const ul = document.createElement('ul');
        ul.className = 'dropdown__menu-list';

        item.items.forEach(group => {
            if (group.subtitle && group.subtitle !== '') {
                const liSubtitle = document.createElement('li');
                const spanSubtitle = document.createElement('span');
                spanSubtitle.className = 'dropdown__item-text';
                spanSubtitle.textContent = group.subtitle;
                liSubtitle.appendChild(spanSubtitle);
                ul.appendChild(liSubtitle);
            }

            group.items.forEach(linkText => {
                const liLink = document.createElement('li');
                const a = document.createElement('a');
                a.className = 'dropdown__menu-link';
                a.href = '#';
                a.textContent = linkText;
                liLink.appendChild(a);
                ul.appendChild(liLink);
            });
        });

        button.addEventListener('click', (e) => {
            e.stopPropagation();
            div.classList.toggle('subitems-hidden');
        })

        div.append(button, ul);
        li.append(div);
        container.append(li);
    });
}

function renderProjectsList(data, container) {
    container.innerHTML = '';

    if (data.length === 0) {
        const li = document.createElement('li');
        li.classList.add('technologies__item');

        const h3 = document.createElement('h3');
        h3.classList.add('technologies__card-title');
        h3.textContent = "No results";
        li.append(h3);
        container.append(li);
    }

    data.forEach(el => {
        const li = document.createElement('li');
        li.classList.add('technologies__item');

        const a = document.createElement('a');
        a.classList.add('technologies__card');
        a.href = '#';

        const div = document.createElement('div');
        div.classList.add('technologies__card-upper');

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'technologies__card-svg');
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('width', '50');
        svg.setAttribute('height', '40');

        const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttribute('href', `images/sprite.svg#${el.icon}`);
        svg.appendChild(use);

        const h3 = document.createElement('h3');
        h3.classList.add('technologies__card-title');
        h3.textContent = el.title;

        const p = document.createElement('p');
        p.classList.add('technologies__card-text');
        p.textContent = el.description;

        div.append(svg, h3);
        a.append(div, p);
        li.append(a);
        container.append(li);
    });
}

renderNavMenu(data, headerList);
renderNavMobileMenu(data, navMenuList);
renderProjectsList(dataProjects, technologiesList);