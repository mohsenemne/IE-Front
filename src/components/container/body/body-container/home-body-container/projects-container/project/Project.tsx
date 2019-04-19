import React, { Component } from 'react'
import 'src/styles/container/body/body-container/home-body-container/projects-container/project/Project.scss'
import SkillsContainer from 'src/components/container/body/body-container/skills-container/SkillsContainer'

interface ProjectInfo{
    budget: number
    deadline: number
    description: string
    id: string
    imageURL: string
    skills: []
    title: string
}

interface Props{
    project:ProjectInfo;
}

interface State{
    
}

function toPersianDigits(str:string){
    var id= ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
    return str.replace(/[0-9]/g, function(w){
        return id[+w]
    });
}

export default class Project extends Component<Props, State> {
    constructor(props : Props){
        super(props);
    }
    render() {
        const {project} = this.props;

        return (
        <a href={'http://127.0.0.1:3000/projects/'+project.id} >
            <div id={project.id} className='project'>
                <div className="image">
                    <img src={project.imageURL}/>
                </div>
                <div className="details">
                    <div className="title-and-deadline">
                        <div className="title">
                            <b>{project.title}</b>
                        </div>
                        <div className="deadline">
                            زمان‌باقی‌ مانده: {project.deadline}
                        </div>
                    </div>
                    <p className="description">{project.description}</p>
                    <p className="budget"><b> بودجه: {toPersianDigits(project.budget.toString())} تومان </b></p>
                    <div className="skills">
                        <p>مهارت‌ها:</p>
                        <SkillsContainer showPoints={false} skills={project.skills}/>
                    </div>
                </div>    
            </div>
        </a>
        )
    }
}
