import React, { Component } from 'react'
import 'src/styles/container/body/body-container/home-body-container/projects-container/project/Project.scss'
import SkillsContainer from 'src/components/container/body/body-container/skills-container/SkillsContainer'
import { Link } from 'react-router-dom';

import { ProjectInfo } from 'src/interface/inteface'

interface Time{
    year : number,
    month : number,
    day : number,
    hour : number,
    minute : number,
    second : number
}

interface Props{
    project:ProjectInfo;
}

interface State{
    remained_time: number
    interval: number
}

function toPersianDigits(str:string){
    var id= ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
    return str.replace(/[0-9]/g, function(w){
        return id[+w]
    });
}

export default class Project extends Component<Props, State> {
    msToString(ms : number){
        if(ms > 0){
            let t : Time = {year : Math.floor(ms/31536000000), month : Math.floor(ms/2628000000)%12, 
                                        day : Math.floor(ms/86400000)%30, hour : Math.floor(ms/3600000)%24, 
                                        minute : Math.floor(ms/60000)%60, second : Math.floor(ms/1000)%60
                                        }

            let strParts : string[] = []

            if(t.year)
                return t.year + 'سال'
            else{
                if(t.month){
                    strParts.push(toPersianDigits(t.month.toString()) + 'ماه')
                    if(t.day)
                        strParts.push(toPersianDigits(t.day.toString()) + 'روز')
                    return strParts.join(' و ')
                }
                else{
                    if(t.day)
                        return t.day + 'روز'
                    else{
                        strParts.push(toPersianDigits(('0' + t.hour).slice(-2)))
                        strParts.push(toPersianDigits(('0' + t.minute).slice(-2)))
                        strParts.push(toPersianDigits(('0' + t.second).slice(-2)))
                        return strParts.join(':')
                    }
                }
            }
        }
        return ''
    }
    
    componentDidMount(){
        const {project} = this.props
        this.setState({remained_time: project.deadline - Date.now(), interval: setInterval(this.countDown.bind(this), 1000) as unknown as number})
    }

    countDown(){
        const {remained_time} = this.state
        const {interval} = this.state
        if(this.state)
            if(remained_time > 0){
                this.setState({remained_time: remained_time - 1000, interval: interval})
            }
            else{
                clearInterval(interval)
            }
    }

    gotoProject(){
        const {project} = this.props
        document.getElementById("project-"+project.id)!.click()
    }

    render() {
        if(!this.state)
            return (<div></div>)
        const {project} = this.props;
        const {remained_time} = this.state;

        let deadline : JSX.Element;
        
        deadline = (remained_time > 0)?<div className="deadline"> زمان باقی‌مانده:  {this.msToString(remained_time)}</div>
                                      :<div className="deadline deadline-reached"> مهلت تمام شده </div>

        return (
        <Link className="no-decor" to={"/projects/"+project.id} >
            <div id={project.id} className='project' onClick={this.gotoProject.bind(this)}>
                <div className="image">
                    <img src={project.imageURL}/>
                </div>
                <div className="details">
                    <div className="title-and-deadline">
                        <div className="title">
                            <b>{project.title}</b>
                        </div>
                        {deadline}
                    </div>
                    <p className="description">{project.description}</p>
                    <p className="budget"><b> بودجه: {toPersianDigits(project.budget.toString())} تومان </b></p>
                    <div className="skills">
                        <p>مهارت‌ها:</p>
                        <SkillsContainer view='home' skills={project.skills}/>
                    </div>
                </div>
                <Link id={"project-"+project.id} to={"/projects/"+project.id} ></Link>
            </div>
        </Link>
        )
    }
}