import React                from 'react';
import MUtil                from 'util/mm.jsx'
import Product              from 'service/product-service.jsx'
import PageTitle            from 'component/page-title/index.jsx';
import CategorySelector     from './category-selector.jsx';

import './save.scss';

const _mm           = new MUtil();
const _product      = new Product();

class ProductDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id                  : this.props.match.params.pid,
            name                : '',
            subtitle            : '',
            categoryId          : 0,
            parentCategoryId    : 0,
            subImages           : [],
            price               : '',
            stock               : '',
            detail              : '',
            status              : 1
        }
    }
    componentDidMount(){
        this.loadProduct();
    }
    loadProduct(){
        if(this.state.id){
            _product.getProduct(this.state.id).then((res) => {
                let images = res.subImages.split(',');
                res.subImages = images.map((imgUri) => {
                    return {
                        uri: imgUri,
                        url: res.imageHost + imgUri
                    }
                });
                this.setState(res);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="Add product" />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">Product name</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.name}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Product description</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.subtitle}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Parent category</label>
                        <CategorySelector 
                            readOnly
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Product price</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" 
                                    value={this.state.price} readOnly/>
                                <span className="input-group-addon">Yuan</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Product stock</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control"
                                    value={this.state.stock} readOnly/>
                                <span className="input-group-addon"></span>
                            </div>
                            
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Product photo</label>
                        <div className="col-md-10">
                            {
                                this.state.subImages.length ? this.state.subImages.map(
                                    (image, index) => (
                                    <div className="img-con" key={index}>
                                        <img className="img" src={image.url} />
                                    </div>)
                                ) : (<div>No photo</div>)
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Product detail</label>
                        <div className="col-md-10" dangerouslySetInnerHTML={{__html: this.state.detail}}></div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductDetail;