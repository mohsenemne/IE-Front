import React, { Component } from 'react'
import 'src/styles/container/body/body-container/project-body-container/ProjectBodyContainer.scss'
import SkillsContainer from 'src/components/container/body/body-container/skills-container/SkillsContainer'
import Project from 'src/views/project/Project';
import axios from 'axios'

interface ProjectInfo{
    budget: number
    deadline: number
    description: string
    id: string
    imageURL: string
    skills: []
    title: string
    winner: {name: string}
}

interface Props{
    project:ProjectInfo;
}

interface State{
    bidAmount : number | null;
    bid: boolean | null;
    deadlineReached: boolean | null;
}

export default class ProjectBodyContainer extends Component<Props, State> {
    constructor(props : Props){
        super(props)
    }

    componentDidMount() {
        const {project} = this.props
        fetch(new Request('http://localhost:8080/projects/'+project.id+'/bids', {method: 'GET'}))
            .then(response => {
                if (response.ok) return response.json();
                return console.error();
            })
            .then((response:[]) => {
                var usernames = response.map((bid:any) => {
                    return bid.biddingUser.username;
                })
                console.log(usernames)
                let b;
                if(usernames.includes('1')){
                    b = false
                }
                else{
                    b = true
                }
                this.setState({bidAmount: null, bid: b, deadlineReached: false}); 
                console.log(this.state)                   
            });
    }

    render() {
        const {project} = this.props;

        let deadline : JSX.Element;
        deadline = <p id="deadline"><p color="7D7D7D" className="flaticon-deadline"><b> زمان باقی‌مانده: </b> {project.deadline} </p></p>
        // <p id="deadline-reached" className="flaticon-deadline"><b> مهلت تمام شده </b></p>
        let winner : JSX.Element | null;
        winner = null
        if(project.winner){
            winner = <p id="winner" className="flaticon-check-mark"><b> برنده: {project.winner.name}</b></p>
        }
        
        let offer = <div></div>
        if(this.state)
            if(this.state.deadlineReached){
                offer = <div id="offer">
                            <div id="offer-title"><h5><p color="red" className="flaticon-danger"> مهلت ارسال پیشنهاد برای این پروژه به پایان رسیده‌است.</p></h5></div>
                        </div>
            }
            else if(this.state.bid){
                offer = <div id="offer">
                            <div id="offer-title"><h4> ثبت پیشنهاد</h4></div>
                            <form id="form" onSubmit={e => this.submitForm(e)}>
                                <span><input id='bidAmount' type="number" onChange={e => this.handleInputChange(e)} placeholder="پیشنهاد خود را وارد کنید"/>تومان</span> <button type='submit'> <p color="white"> ارسال </p> </button>
                            </form>
                        </div>
            }
            else{
                var message: string;
                if(this.state.bidAmount)
                    message = 'پیشنهاد شما با موفقیت ثبت شد'
                else
                    message = 'شما قبلا پیشنهاد خود را ثبت کرده‌اید'
                offer = <div id="offer">
                    <div id="offer-title-already-bid"><h5 className="flaticon-check-mark">{message}</h5></div>
                </div>
            }
        

        return (
            <div id="project-body-container">
                <div id="job-info">	
                    <div id="job-info-container">
                        <p id="title"><b>{project.title}</b></p>
                        {deadline}
                        <p id="budget" className="flaticon-money-bag"><p color="#32928F" ><b> بودجه: ۲۵۰۰ تومان</b></p></p>
                        {winner}
                        <h3> توضیحات</h3>
                        <p id="description"> {project.description} </p>
                    </div>
                    <div id="image">
                        <img src={project.imageURL}/>
                    </div>
                </div>
                <div id="skills">
                    <h4 id="skills-title">مهارت‌های لازم:</h4>
                    <div id="skill-items-container">
                        <SkillsContainer showPoints={true} skills={project.skills}/>
                    </div>
                </div>
                {offer}
            </div>
        )
    }

    submitForm(e : React.FormEvent<HTMLFormElement>): void{
        const {state} = this
        const {bidAmount} = this.state
        const {project} = this.props
        axios.put('http://localhost:8080/projects/'+project.id+'/bids?bidAmount='+bidAmount)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        e.preventDefault();
    }

    handleInputChange(e : React.ChangeEvent<HTMLInputElement>): void{
        this.setState({bid: this.state.bid, bidAmount : e.target.value as unknown as number, deadlineReached: this.state.deadlineReached})
    }
}
