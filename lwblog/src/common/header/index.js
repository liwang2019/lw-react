import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from './store';
import { actionCreators as loginActionCreators } from '../../pages/login/store'
import {
	HeaderWrapper,
	Logo,
	Nav,
	NavItem,
	SearchWrapper,
	NavSearch,
	SearchInfo,
	SearchInfoTitle,
	SearchInfoSwitch,
	SearchInfoList,
	SearchInfoItem,
	Addition,
	Button
} from './style';

class Header extends Component {
	getListArea() {
		const { focused, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage } = this.props;
		const newList = list.toJS();
		const pageList = [];

		// we display 1 page of popular topics that means 10
		if (newList.length) {
			for (let i = (page - 1) * 10; i < page * 10; i++) {
				pageList.push(
					<SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
				)
			}
		}

		// we display popular list only when focusd an mouseIn
		// handleMouseEnter and handleMouseLeave changes state mouseIn
		// handleChangePage handles page changing
		if (focused || mouseIn) {
			return (
				<SearchInfo
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<SearchInfoTitle>
						热门搜索
						<SearchInfoSwitch
							onClick={() => handleChangePage(page, totalPage, this.spinIcon)}
						>
							<i ref={(icon) => { this.spinIcon = icon }} className="iconfont spin">&#xe851;</i>
							换一批
						</SearchInfoSwitch>
					</SearchInfoTitle>
					<SearchInfoList>
						{/* show the popular topics list in page */}
						{pageList}
					</SearchInfoList>
				</SearchInfo>
			)
		} else {
			return null;
		}
	}

	render() {
		const { focused, handleInputFocus, handleInputBlur, list, login, logout } = this.props;

		return (
			< HeaderWrapper >
				{/**We use Link to indicate a Link instead of using <a> */}
				{/**Header is composed of Link, Nav, Addition. Link is the logo. Nav is composed of Home Link, Download Link, Login Link, Aa icon and search field*/}
				<Link to='/'>
					<Logo />
				</Link>
				<Nav>
					{/**If an element has more than one class, we use space to seperate different classes.
					If I want to put elements from left to right, I will use float*/}
					<NavItem className='left active'>首页</NavItem>
					<NavItem className='left'>下载App</NavItem>

					{/* how do we show the login element is dependent on whether we already logged in. login is a boolean property that this component inherits from his parent component*/}
					{
						login ?
							<NavItem onClick={logout} className='right'>退出</NavItem> :
							<Link to='/login'><NavItem className='right'>登陆</NavItem></Link>
					}

					{/* icon Aa */}
					<NavItem className='right'>

						{/* iconfont is a global style. &#xe636; is code of this icon. That is the way that we use icons from Alibaba */}
						<i className="iconfont">&#xe636;</i>
					</NavItem>

					{/* SearchWrapper is composed of an  input, an icon and a list area under the search field */}
					<SearchWrapper>

						{/* CSSTransition is a component from react-transition-group */}
						<CSSTransition
							in={focused}
							timeout={5000}
							classNames="slide"
						>

							{/* NavSearch is an input element: when is gets focused, it will use class "focused" which means the length of this input will be larger
								we use event handlers onFocus and onBlur to change state focused in store. handleInputFocus and handleInputBlur were defined in reducer*/}
							<NavSearch
								className={focused ? 'focused' : ''}
								onFocus={() => handleInputFocus(list)}
								onBlur={handleInputBlur}
							></NavSearch>
						</CSSTransition>

						{/* this is search icon, if state is focused, it has class focused, otherwise not, focused means background is #777 and color is #fff */}
						<i className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>
							&#xe614;
						</i>

						{/* we use this method to get popular search area */}
						{this.getListArea()}
					</SearchWrapper>
				</Nav>
				<Addition>
					<Link to='/write'>
						<Button className='writting'>
							<i className="iconfont">&#xe615;</i>
							写文章
						</Button>
					</Link>
					<Button className='reg'>注册</Button>
				</Addition>
			</HeaderWrapper >
		);
	}
}

// when we use react-redux, all states are stored in "store", we use method "mapStateToProps" to map state to properties
const mapStateToProps = (state) => {
	return {
		focused: state.getIn(['header', 'focused']),
		list: state.getIn(['header', 'list']),
		page: state.getIn(['header', 'page']),
		totalPage: state.getIn(['header', 'totalPage']),
		mouseIn: state.getIn(['header', 'mouseIn']),
		login: state.getIn(['login', 'login'])
	}
}

const mapDispathToProps = (dispatch) => {
	return {
		handleInputFocus(list) {
			(list.size === 0) && dispatch(actionCreators.getList());
			dispatch(actionCreators.searchFocus());
		},
		handleInputBlur() {
			dispatch(actionCreators.searchBlur());
		},
		handleMouseEnter() {
			dispatch(actionCreators.mouseEnter());
		},
		handleMouseLeave() {
			dispatch(actionCreators.mouseLeave());
		},
		handleChangePage(page, totalPage, spin) {
			let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
			if (originAngle) {
				originAngle = parseInt(originAngle, 10);
			} else {
				originAngle = 0;
			}
			spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';

			if (page < totalPage) {
				dispatch(actionCreators.changePage(page + 1));
			} else {
				dispatch(actionCreators.changePage(1));
			}
		},
		logout() {
			dispatch(loginActionCreators.logout())
		}
	}
}

// this way we connect component with store
export default connect(mapStateToProps, mapDispathToProps)(Header);
