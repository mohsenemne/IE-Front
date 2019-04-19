import React, { Component } from 'react'
import 'src/styles/container/top-blue/TopBlue.scss'

interface Props{
    view: string;
}
interface State{

}

export default class TopBlue extends Component<Props, State> {
    constructor(props : Props){
        super(props);
    }
    render() {
        if(this.props.view == 'home'){
            return (
            <div className="home-top-blue">
                <div id="head-container">
                    <p id="title">جاب‌اونجا خوب است!</p>
                    <p>لورم ایپسون متن ساختگی با تولید نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در</p>
                    <div id="search">
                        <input type="text" placeholder="جستجو در جاب‌اونجا"/> <button> جستجو </button>
                    </div>
                </div>
            </div>
            )
        }
        else{
            <div className="top-blue"></div>
        }
        return (
        <div>
            
        </div>
        )
    }
}
