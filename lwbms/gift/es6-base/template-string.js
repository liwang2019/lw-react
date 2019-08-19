let str = `
<div>
    <h1 class="title">123</h1>
</div>
`;
document.querySelector('body').innerHTML = str;

let name = 'Rosen';
let str = `
<div>
    <h1 class="title">${name}</h1>
</div>
`;
document.querySelector('body').innerHTML = str;

let getName = () => {
    return 'Rosen Test';
};
let str = `
<div>
    <h1 class="title">${getName()}</h1>
</div>
`;
document.querySelector('body').innerHTML = str;

let names = ['Rosen', 'Geely', 'Jimin'];
let str = `
    <ul>
        ${
    names.map(name => `<li>Hi, I am ${name}</li>`).join('')
    }
    </ul>
`;
document.querySelector('body').innerHTML = str;



