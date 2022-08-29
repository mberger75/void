const history = {
    get: () => document.querySelector('.history').innerHTML = localStorage.getItem('history'),
    set: () => localStorage.setItem('history', document.querySelector('.history').innerHTML),
    clear: () => {
        document.querySelector('.history').innerHTML = '';
        localStorage.clear('history');
    },
}

function handleChange(e) {
    const value = e.currentTarget.value

    if (value.startsWith('so:')) {
        document.querySelector('.target').textContent = 'Stackoverflow';
    }
    else if (value.startsWith('gh:')) {
        document.querySelector('.target').textContent = 'Github';
    }
    else if (value.startsWith('tw:')) {
        document.querySelector('.target').textContent = 'Twitter';
    }
    else if (value.startsWith('mdn:')) {
        document.querySelector('.target').textContent = 'mdn_docs';
    }
    else if (value.startsWith('goo:')) {
        document.querySelector('.target').textContent = 'Google';
    }
    else if (value.startsWith('wiki:')) {
        document.querySelector('.target').textContent = 'Wikipedia';
    }
    else if (value.startsWith('emo:')) {
        document.querySelector('.target').textContent = 'Emojipedia';
    }
    else {
        document.querySelector('.target').textContent = 'Duckduckgo';
    }
}

function handleHistory(targetURL, input) {
    const date = new Date();
    const now = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

    const html = `<div class="item">
        <p>${now}</p>
        <a href="${targetURL}">${input}</a>
    </div>`;

    if (localStorage.getItem('history') !== undefined) {
        history.get();
    }

    document.querySelector('.history').insertAdjacentHTML('afterbegin', html);

    history.set();
}

function handleSearch(e) {
    e.preventDefault();

    let targetURL = '';
    const input = document.querySelector('#inputSearch').value;
    const target = input.split(':')[0];
    const query = input.split(':')[1];

    if (query === undefined || target === undefined) {
        targetURL = `https://duckduckgo.com/?q=${input}`;
        handleHistory(targetURL, input);
        location.href = targetURL;
        return;
    }

    switch(target) {
        case 'so':
            targetURL = `https://stackoverflow.com/search?q=${query}`;
            break;
        case 'gh':
            targetURL = `https://github.com/search?q=${query}&type=issues`;
            break;
        case 'tw':
            targetURL = `https://twitter.com/search?q=${query}&src=typed_query`;
            break;
        case 'mdn':
            targetURL = `https://developer.mozilla.org/fr/search?q=${query}`;
            break;
        case 'goo':
            targetURL = `https://www.google.com/search?q=${query}`;
            break;
        case 'wiki':
            targetURL = `https://fr.wikipedia.org/w/index.php?search=${query}`;
            break;
        case 'emo':
            targetURL = `https://emojipedia.org/search/?q=${query}`;
            break;
        default:
            targetURL = `https://duckduckgo.com/?q=${query}`;
            break;
    }

    location.href = targetURL;
    handleHistory(targetURL, input);
}

(function main() {
    document.querySelector('#inputSearch').focus();
    history.get();
})();
