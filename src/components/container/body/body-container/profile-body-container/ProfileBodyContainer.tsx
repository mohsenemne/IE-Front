import React, { Component } from 'react'
import 'src/styles/container/body/body-container/profile-body-container/ProfileBodyContainer.scss'
import SkillsContainer from 'src/components/container/body/body-container/skills-container/SkillsContainer';
import axios from 'axios';

import {Skill} from 'src/interface/inteface'


interface UserInfo {
    username : string
    firstName : string
    lastName : string
    jobTitle : string
    skills : Skill[]
    profilePictureURL: string
    bio : string  
}

interface Props{
    user : UserInfo;
}

interface State{
    availableSkills : [] | null;
}

export default class ProfileBodyContainer extends Component<Props, State> {
    constructor(props : Props){
        super(props);

    }
    
    componentDidMount() {
        const { user } = this.props
        var jwt = localStorage.getItem('joboonja-jwt')
        var setState = this.setState.bind(this)

        if(user.username == require('jsonwebtoken').decode(jwt).username as string){
            axios.get('http://localhost:8080/skills', {headers:{Authorization:jwt!}})
            .then(function (response){
                setState({availableSkills: response.data});
            })
            .catch(function (error){
                console.log(error)
            })
        }
    }
    
    addSkill(e: React.FormEvent<HTMLFormElement>){
        const {user} = this.props
        const {availableSkills} = this.state
        var sel = document.getElementById('new-skill-select')! as HTMLSelectElement
        let newSkill = sel.value
        
        if(newSkill == ""){
            alert("یک مهارت انتخاب کنید!")
            e.preventDefault()
            return
        }
        var forceUpdate = this.forceUpdate.bind(this)

        var jwt = localStorage.getItem('joboonja-jwt')

        axios.put('http://localhost:8080/users/'+this.props.user.username+'/skills?skill='+newSkill, null, {headers:{Authorization:jwt!}})
            .then(function (response:any) {
                console.log(response)
                if(response.request.response){
                    user.skills.push({name: newSkill, points: 0})
                    let i;
                    for(i=0; i<availableSkills!.length; i++){
                        if(availableSkills![i] == newSkill)
                            availableSkills!.splice(i, 1)
                    }
                    sel.selectedIndex = 0
                    forceUpdate()
                }
            })
            .catch(function (error:any) {
                console.log(error);
            });
        e.preventDefault()
    }

    render() {
        const {user} = this.props;
        
        let selectContainer : JSX.Element | null;
        selectContainer = null
        if(user.username == require('jsonwebtoken').decode(localStorage.getItem('joboonja-jwt')).username && this.state){
            console.log("here")
            var skills = this.state.availableSkills!.map((skill:string) => {
                return <option value={skill}>{skill}</option>
            })
            selectContainer =   <div id="select-container">
                                    <div id="select-title"><h4>مهارت‌ها:</h4></div>
                                    <form id="form" onSubmit={e => this.addSkill(e)}>
                                        <select id='new-skill-select'>
                                                <option value="" disabled selected>--انتخاب مهارت--</option>
                                                {skills}
                                        </select><button type="submit"> <p> افزودن مهارت </p> </button>
                                    </form>  
                                </div>
        }
        
        return (
            <div id="profile-body-container">
                <div id="user-info">	
                    <div id="user-info-container">
                        <p id="name"> <b>{user.firstName + ' ' + user.lastName}</b> </p>
                        <p id="job-title"> {user.jobTitle}</p>
                    </div>
                    <div id="image">
                        <img src={user.profilePictureURL}/>
                    </div>
                </div>
                <p id='bio'>{user.bio}</p>
                {selectContainer}
                <div id="skills">
                    <div id="skill-items-container">
                        <SkillsContainer view='profile' skills={user.skills} username={user.username}/>
                    </div>
                </div>
            </div>
        )
    }
    
}
