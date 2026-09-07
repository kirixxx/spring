
async function loadData() {
    const response = await fetch('./header.json');
    const menuData = await response.json();
    return menuData;
}

const data = await loadData();

const headerList = document.querySelector('.header__nav-list')

function renderNavMenu(data, container) {
    data.forEach(item => {
        console.log(item)
        const li = document.createElement('li');
        li.className = 'header__nav-item';
        
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

renderNavMenu(data, headerList);