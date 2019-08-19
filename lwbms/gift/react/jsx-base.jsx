import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

let style = {
    color: 'r' + 'ed'
}
let jsx = <div className="jsx" style={style}>jsx....</div>;

ReactDOM.render(
    jsx,
    document.getElementById('app')
);

let name = 'Rosen';
let names = ['Rosen', 'Geely', 'Jimin']
let flag = false;
let jsx = (
    <div>
        <p>I am {name}</p>
        {
            flag ? <p>I am {name}</p> : <p>I am not {name}</p>
        }
        {
            names.map((name, index) => <p key={index}>Hello, I am {name}</p>)
        }
    </div>
);

ReactDOM.render(
    jsx,
    document.getElementById('app')
);


