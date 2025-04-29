import React from 'react';
import hero_img from '../../assets/woman1.png';
import { FaShippingFast } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { BiSupport } from 'react-icons/bi';
import { MdPayment } from 'react-icons/md';
import './Hero.css';

const Hero = () => {
    const features = [
        { icon: <FaShippingFast className="hero_icon" />, title: "Free Shipping", description: "Free Shipping on order" },
        { icon: <FiSend className="hero_icon" />, title: "Worldwide Delivery", description: "We deliver to all countries" },
        { icon: <BiSupport className="hero_icon" />, title: "24/7 Support", description: "Full support on process" },
        { icon: <MdPayment className='hero_icon' />, title: "Secure Payment", description: "Your Payment is secure" }
    ];
  return (
    <div>
        <div className="hero">
            <div className="hero_top">
                <div className="hero_left">
                    <h2 className="">Unleash Your Unique Style.</h2>
                    <h1 className="">With Colllections That Lets Your Style And Fashion Speak</h1>
                    <p className="">Shop the latest trends and classic essentials from our collections.</p>
                </div>
                <div className="hero_right">
                    <img src={hero_img} alt="" />
                </div>
            </div>
            <div className="hero_bottom">
                {features.map((feature, index) => (
                    <div className="hero_content" key={index}>
                        <div className="info_icon">{feature.icon}</div>
                        <div className="detail">
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Hero;