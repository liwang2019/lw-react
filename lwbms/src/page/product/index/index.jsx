import React        from 'react';
import { Link }     from 'react-router-dom';
import MUtil        from 'util/mm.jsx'
import Product      from 'service/product-service.jsx'

import PageTitle    from 'component/page-title/index.jsx';
import ListSearch   from './index-list-search.jsx';
import TableList    from 'util/table-list/index.jsx';
import Pagination   from 'util/pagination/index.jsx';

import './index.scss';

const _mm           = new MUtil();
const _product      = new Product();

class ProductList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list            : [],
            pageNum         : 1,
            listType        : 'list'
        };
    }
    componentDidMount(){
        this.loadProductList();
    }
    loadProductList(){
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum  = this.state.pageNum;
        if(this.state.listType === 'search'){
            listParam.searchType = this.state.searchType;
            listParam.keyword    = this.state.searchKeyword;
        }
        _product.getProductList(listParam).then(res => {
            this.setState(res);
        }, errMsg => {
            this.setState({
                list : []
            });
            _mm.errorTips(errMsg);
        });
    }
    onSearch(searchType, searchKeyword){
        let listType = searchKeyword === '' ? 'list' : 'search';
        this.setState({
            listType        : listType,
            pageNum         : 1,
            searchType      : searchType,
            searchKeyword   : searchKeyword
        }, () => {
            this.loadProductList();
        });
    }
    onPageNumChange(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadProductList();
        });
    }
    onSetProductStatus(e, productId, currentStatus){
        let newStatus   = currentStatus == 1 ? 2 : 1,
            confrimTips = currentStatus == 1 
                ? 'Are you sure to take it off the shelves?' : 'Are you sure to take it on the shelves?';
        if(window.confirm(confrimTips)){
            _product.setProductStatus({
                productId: productId,
                status: newStatus
            }).then(res => {
                _mm.successTips(res);
                this.loadProductList();
            }, errMsg => {
                _mm.errorTips(res);
            });
        }
    }
    render(){
        let tableHeads = [
            {name: 'Product ID', width: '10%'},
            {name: 'Product info', width: '50%'},
            {name: 'Price', width: '10%'},
            {name: 'Status', width: '15%'},
            {name: 'Operation', width: '15%'},
        ];
        return (
            <div id="page-wrapper">
                <PageTitle title="Product list">
                    <div className="page-header-right">
                        <Link to="/product/save" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>Create product</span>
                        </Link>
                    </div>
                </PageTitle>
                <ListSearch onSearch={(searchType, searchKeyword) => {this.onSearch(searchType, searchKeyword)}}/>
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>
                                        <p>{product.name}</p>
                                        <p>{product.subtitle}</p>
                                    </td>
                                    <td>￥{product.price}</td>
                                    <td>
                                        <p>{product.status == 1 ? 'On offer' : 'Not on offer'}</p>
                                        <button className="btn btn-xs btn-warning" 
                                            onClick={(e) => {this.onSetProductStatus(e, product.id, product.status)}}>{product.status == 1 ? 'On shelve' : 'Off schelve'}</button>
                                    </td>
                                    <td>
                                        <Link className="opear" to={ `/product/detail/${product.id}` }>Detail</Link>
                                        <Link className="opear" to={ `/product/save/${product.id}` }>Edit</Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </TableList>
                <Pagination current={this.state.pageNum} 
                    total={this.state.total} 
                    onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
            </div>
        );
    }
}

export default ProductList;