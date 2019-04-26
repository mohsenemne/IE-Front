import React, { Component } from 'react'
import 'src/styles/container/body/body-container/skills-container/SkillsContainer.scss'
import axios from 'axios'

interface Skill{
    name: string
    points: number
    endorsed?: boolean
}

interface Props{
    showPoints: boolean
    skills: Skill[]
    username?: string
    handleClickPoint?(): void 
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
        if(username && username != '1'){
            fetch(new Request('http://localhost:8080/users/'+username+'/skills/endorsements', {method: 'GET'}))
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    return console.error();
                }).then((response:string[]) => {
                    this.setState({endorsedSkills : response})
                    for(var i=0; i<skills.length; i++){
                        if(response.includes(skills[i].name)){
                            skills[i].endorsed = true
                        }
                        else{
                            skills[i].endorsed = false
                        }
                    }
                    this.forceUpdate();
                });    
        }
    }

    render() {
        let {showPoints} = this.props;
        let {skills} = this.props;
        let {username} = this.props;
        let skillsJSX = skills.map((skill:Skill) => {
            if(showPoints)
                return <div key={skill.name} id={skill.name} className='skill-with-point'>
                            <span className='name'>{skill.name}</span>
                            <button className={(username=="1")?'own-skill-point':skill.endorsed?'endorsed-point':'point'} onClick={() => this.handleClick(skill.name)}>
                                <p>
                                    {skill.points}
                                </p>
                            </button>
                       </div>
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
        if(username == '1'){
            axios.delete('http://localhost:8080/users/'+username+'/skills?skill='+skill)
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
            axios.post('http://localhost:8080/users/'+username+'/skills/endorsements?skill='+skill)
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