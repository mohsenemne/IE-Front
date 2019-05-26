import React, { Component } from 'react'
import 'src/styles/container/body/body-container/skills-container/SkillsContainer.scss'
import axios from 'axios'

import {Skill} from 'src/interface/inteface'

interface Props{
    view: string
    skills: Skill[]
    username?: string
}

interface State{
    endorsedSkills: string[]
}

export default class SkillsContainer extends Component<Props, State> {
    constructor(props : Props){
        super(props);
    }

    componentWillMount(){
        const {username} = this.props
        const {skills} = this.props
        if(username && username != require('jsonwebtoken').decode(localStorage.getItem('joboonja-jwt')).username){
            var setState = this.setState.bind(this)
            var forceUpdate = this.forceUpdate.bind(this)
            var jwt = localStorage.getItem('joboonja-jwt')
            axios.get('http://localhost:8080/users/'+username+'/skills/endorsements', {headers:{Authorization:jwt!}})
            .then(function (response){
                setState({endorsedSkills : response.data})
                for(var i=0; i<skills.length; i++){
                    if(response.data.includes(skills[i].name)){
                        skills[i].endorsed = true
                    }
                    else{
                        skills[i].endorsed = false
                    }
                }
                forceUpdate();
            })
            .catch(function (error){
                console.log(error)
            })    
        }
    }
    render() {
        let {view} = this.props;
        let {skills} = this.props;
        let {username} = this.props;
        let skillsJSX = skills.map((skill:Skill) => {
            if(view != 'home')
                return <button key={skill.name} id={skill.name} disabled={view == 'project' || skill.endorsed} 
                        className={'skill-with-point ' + ((view == 'project')?'project-skill':'user-skill')}
                        onClick={() => this.handleClick(skill.name)}>
                            <span className='name'>{skill.name}</span>
                            <span className={'point ' + ((view == 'profile')?(username==require('jsonwebtoken').decode(localStorage.getItem('joboonja-jwt')).username)?'own-skill-point':skill.endorsed?'endorsed-point':'':'')} >
                                <p>
                                    {skill.points}
                                </p>
                            </span>
                       </button>
            else
                return <div key={skill.name} id={skill.name} className='skill'>{skill.name}</div>
        });

        return (
        <div id='skills-container'>
            {skillsJSX}
        </div>
        )
    }

    handleClick(skill: string): void{
        const {username} = this.props
        const {skills} = this.props

        var forceUpdate = this.forceUpdate.bind(this);
        var jwt = localStorage.getItem('joboonja-jwt')
        if(username == require('jsonwebtoken').decode(jwt).username){
            axios.delete('http://localhost:8080/users/'+username+'/skills?skill='+skill, {headers:{Authorization:jwt!}})
                .then(function (response:any) {
                    if(response){
                        for( var i = 0; i < skills.length; i++){ 
                            if (skills[i].name === skill) {
                                skills.splice(i, 1);
                                console.log("here")
                                break;
                            }
                        }
                        forceUpdate()
                    }
                })
                .catch(function (error:any) {
                    console.log(error);
                });
        }
        else{
            axios.post('http://localhost:8080/users/'+username+'/skills/endorsements?skill='+skill, null, {headers:{Authorization:jwt!}})
                .then(function (response:any) {
                    if(response.request.response == "true"){
                        for( var i = 0; i < skills.length; i++){ 
                            if (skills[i].name === skill) {
                                skills[i].points += 1;
                                skills[i].endorsed = true;
                                break
                            }
                        }
                        forceUpdate()
                    }
                })
                .catch(function (error:any) {
                    console.log(error);
                });
        }
    }
    
}