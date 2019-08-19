import React        from 'react';
import { Link }     from 'react-router-dom';

import PageTitle    from 'component/page-title/index.jsx';

class Error extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="Error occurs!"/>
                <div className="row">
                    <div className="col-md-12">
                        <span>Cannot find the path,</span>
                        <Link to="/">click me back to home</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Error;