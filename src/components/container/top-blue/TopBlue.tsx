import React, { Component } from 'react'
import 'src/styles/container/top-blue/TopBlue.scss'

import {ProjectInfo} from 'src/interface/inteface'

interface Props{
    view: string;
    updateProjects?: (projects: ProjectInfo[])=>void 
}
interface State{

}

export default class TopBlue extends Component<Props, State> {
    constructor(props : Props){
        super(props);
    }

    searchSubmit(e : React.FormEvent<HTMLFormElement>){
        let searchKey = (document.getElementById("project-search-input")! as HTMLInputElement).value
        
        fetch(new Request('http://localhost:8080/search/projects?key='+searchKey, {method: 'GET'}))
            .then(response => {
                if (response.ok) return response.json();
                    return console.error();
            })
            .then((response:ProjectInfo[]) => {
                this.props.updateProjects!(response);
            });

        (document.getElementById("project-search-input")! as HTMLInputElement).value = ''
        e.preventDefault()
    }

    render() {
        if(this.props.view == 'home'){
            return (
            <div className="home-top-blue">
                <div id="head-container">
                    <p id="title">جاب‌اونجا خوب است!</p>
                    <p>لورم ایپسون متن ساختگی با تولید نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در</p>
                    <form id="project-search-form" onSubmit={e => this.searchSubmit(e)}>
                        <input id="project-search-input" type="text" placeholder="جستجو در جاب‌اونجا"/> <button> جستجو </button>
                    </form>
                </div>
            </div>
            )
        }
        else{
            return(
                <div className={this.props.view+"-top-blue"}></div>
            )
        }
    }
}
