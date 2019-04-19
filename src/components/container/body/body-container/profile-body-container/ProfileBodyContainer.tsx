import React, { Component } from 'react'
import 'src/styles/container/body/body-container/profile-body-container/ProfileBodyContainer.scss'
import SkillsContainer from 'src/components/container/body/body-container/skills-container/SkillsContainer';

interface UserInfo {
    username : string
    firstName : string
    lastName : string
    jobTitle : string
    skills : []
    bio : string  
}

interface Props{
    user : UserInfo;
}

interface State{
    endorsedSkills : [] | null;
    availableSkills : [] | null;
    newSkill: string;
}

export default class ProfileBodyContainer extends Component<Props, State> {
    constructor(props : Props){
        super(props);

    }
    
    componentDidMount() {
        const { user } = this.props
        if(user.username == '1'){
            fetch(new Request('http://localhost:8080/skills', {method: 'GET'}))
                .then(response => {
                    if (response.ok) return response.json();
                    return console.error();
                })
                .then((response:[]) => {
                    this.setState({availableSkills: response}); 
                });
        }
        else{
            fetch(new Request('http://localhost:8080/users/'+user.username+'/endorsments', {method: 'GET'}))
                .then(response => {
                    if (response.ok) return response.json();
                    return console.error();
                })
                .then((response:[]) => {
                    this.setState({endorsedSkills: response}); 
                });
        }
    }
    
    render() {
        const {user} = this.props;
        // const {availableSkills} = this.state
        // const {endorsedSkills} = this.state

        let selectContainer : JSX.Element | null;
        selectContainer = null
        if(user.username == '1' && this.state){
            var skills = this.state.availableSkills!.map((skill:string) => {
                return <option value={skill}>{skill}</option>
            })
            selectContainer =   <div id="select-container">
                                    <div id="select-title"><h4>مهارت‌ها:</h4></div>
                                    <div id="form">
                                        <select onChange={e => this.handleSelectChange(e)}>
                                                <option value="" disabled selected>--انتخاب مهارت--</option>
                                                {skills}
                                        </select><button> <p> افزودن مهارت </p> </button>
                                    </div>  
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
                        <img src={require('src/images/user-profiles/'+user.username+'.jpg')}/>
                    </div>
                </div>
                <p id='bio'>{user.bio}</p>
                {selectContainer}
                <div id="skills">
                    <div id="skill-items-container">
                        <SkillsContainer showPoints={true} skills={user.skills} username={user.username}/>
                    </div>
                </div>
            </div>
        )
    }

    handleSelectChange(e : React.ChangeEvent<HTMLSelectElement>): void{
        this.setState({newSkill: e.target.value, endorsedSkills: this.state.endorsedSkills, availableSkills: this.state.availableSkills})
    }
    
}
