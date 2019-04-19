import React, { Component } from 'react'
import 'src/styles/container/body/body-container/skills-container/SkillsContainer.scss'

interface Skill{
    name: string
    points: number
}

interface Props{
    showPoints: boolean
    skills: []
}

interface State{

}

export default class SkillsContainer extends Component<Props, State> {
    constructor(props : Props){
        super(props);
        console.log(props)
    }
    render() {
        let {showPoints} = this.props;
        let {skills} = this.props;
        let skillsJSX = skills.map((skill:Skill) => {
            if(showPoints)
                return <div key={skill.name} id={skill.name} className='skill-with-point'>
                            <span className='name'>{skill.name}</span>
                            <span className='point'>{skill.points}</span>
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
}
