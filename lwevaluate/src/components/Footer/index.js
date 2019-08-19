import React, { Component } from 'react'
import './style.css'

class Footer extends Component {
  render() {
    return (
      <footer className='footer'>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          My
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Forum
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Add shop
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Feedback
        </a>
        <br />
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Yelp
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Download
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Marriage
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Baby
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Clothes
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Restaurant
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Education
        </a>
        <br />
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          PC
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Phone
        </a>
        <em className="footer__seperator">|</em>
        <br />
        <p className="footer__copyright">copyright ©2018 dianping.com</p>
      </footer>
    )
  }
}

export default Footer