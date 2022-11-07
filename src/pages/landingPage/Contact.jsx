import React from 'react'
import { AiOutlineLinkedin } from 'react-icons/ai';
import { FiGithub } from 'react-icons/fi';
import { MdOutlinePersonalVideo } from 'react-icons/md';
import logo from '../../assets/logo.png';

export default function Contact() {
  return (
    <>
        {/* section contact */}
        <section className="contact" id='contact'>
                <div className="contact__name">
                    <div className="contact__brand_name">
                        <div className="contact__logo"><img src={logo}/></div>
                        <p>Lubna Store</p>
                    </div>
                    <div className="contact__author">
                        <p>by Lubna Fairuz Zafira</p>
                    </div>
                </div>
                <div className="contact__info">
                    <p className="contact__title">Contact</p>
                    <div className='contact__line'></div>
                    <p className="contact__nohp">+62 8979738428</p>
                    <p className="contact__email">lubnafairuzzafira@gmail.com</p>
                    <div className="contact__icon">
                        <div className='c_icon'>
                            <a href="https://www.linkedin.com/in/lubnafairuzzafira/"><AiOutlineLinkedin/></a>
                        </div>
                        <div className='c_icon'>
                            <a href="https://github.com/lubnaafz"><FiGithub/></a>
                        </div>
                        <div className='c_icon'>
                            <a href="https://lubnasyifa.netlify.app/"><MdOutlinePersonalVideo/></a>
                        </div>
                    </div>
                </div>
            </section>
    </>
  )
}
