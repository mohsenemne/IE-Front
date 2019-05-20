import React, { Component } from 'react'
import 'src/styles/container/body/body-container/project-body-container/ProjectBodyContainer.scss'
import 'src/icons/font/flaticon.css'
import SkillsContainer from 'src/components/container/body/body-container/skills-container/SkillsContainer'
import Project from 'src/views/project/Project';
import axios from 'axios'

import {ProjectInfo} from 'src/interface/inteface'

interface Time{
    year: number
    month: number
    day: number
    hour: number
    minute: number
    second: number
}

interface Props{
    project:ProjectInfo
}

interface State{
    bid: boolean
    remained_time: number
    interval: number
}

function toPersianDigits(str:string){
    var id= ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
    return str.replace(/[0-9]/g, function(w){
        return id[+w]
    });
}

export default class ProjectBodyContainer extends Component<Props, State> {
    constructor(props : Props){
        super(props)
    }
    componentDidMount() {
        const {project} = this.props

        let deadline : JSX.Element;
        let remained_time = project.deadline - Date.now()

        var jwt = localStorage.getItem('joboonja-jwt')
        var setState = this.setState.bind(this)
        var countDown = this.countDown.bind(this)
        axios.get('http://localhost:8080/projects/'+project.id+'/bids', {headers:{Authorization:jwt!}})
        .then(function (response){
            var usernames = response.data.map((bid:any) => {
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
            var interval = setInterval(countDown, 1000);
            setState({bid: b, remained_time: remained_time, interval: (interval as unknown as number)});
            console.log(typeof interval)
        })
        .catch(function (error){
            console.log(error)
        })
    }

    countDown(){
        const {state} = this        
        if(state)
            if(state.remained_time > 0){
                this.setState({bid: state.bid, remained_time: state.remained_time - 1000})
            }
            else{
                clearInterval(state.interval)
            }
    }

    msToString(ms : number){
        if(ms > 0){
            let t : Time = {year : Math.floor(ms/31536000000), month : Math.floor(ms/2628000000)%12, 
                                        day : Math.floor(ms/86400000)%30, hour : Math.floor(ms/3600000)%24, 
                                        minute : Math.floor(ms/60000)%60, second : Math.floor(ms/1000)%60
                                        }

            let strParts : string[] = []
            let y, mo, d, h, mi : boolean = false;
            if(t.year){
                strParts.push(toPersianDigits(t.year.toString()) + ' سال')
                y = true
            }
            if(t.month || y){
                strParts.push(toPersianDigits(t.month.toString()) + ' ماه')
                mo = true
            }
            if(t.day || mo){
                strParts.push(toPersianDigits(t.day.toString()) + ' روز')
                d = true
            }
            if(t.hour || d){
                strParts.push(toPersianDigits(t.hour.toString()) + ' ساعت')
                h = true
            }
            if(t.minute || h){
                strParts.push(toPersianDigits(t.minute.toString()) + ' دقیقه')
                mi = true
            }
            strParts.push(toPersianDigits(t.second.toString()) + ' ثانیه')
            
            return strParts.join(' و ')
        }
        return ''
    }

    isNumberKey(evt : any) {
        var charCode = (evt.which) ? evt.which : Event;
        if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
            return false;
    
        return true;
    }

    render() {
        const {project} = this.props;

        let deadline : JSX.Element;
        let remained_time = project.deadline - Date.now()
        deadline = (remained_time > 0)?<p id="deadline"><p color="7D7D7D" className="flaticon-deadline"><b> زمان باقی‌مانده: </b> {this.msToString(remained_time)} </p></p>
                                      :<p id="deadline-reached" className="flaticon-deadline"><b> مهلت تمام شده </b></p>
        let winner : JSX.Element | null;
        winner = null
        if(project.winner){
            winner = <p id="winner" className="flaticon-check-mark"><b> برنده: {project.winner.name}</b></p>
        }
        
        let offer = <div></div>
        if(this.state)
            if(this.state.remained_time <= 0){
                offer = <div id="offer">
                            <div id="offer-title-deadline-reached"><h5 className="flaticon-danger"> مهلت ارسال پیشنهاد برای این پروژه به پایان رسیده‌است.</h5></div>
                        </div>
            }
            else if(this.state.bid){
                offer = <div id="offer">
                            <div id="offer-title"><h4> ثبت پیشنهاد</h4></div>
                            <form id="form" onSubmit={e => this.submitForm(e)}>
                                <span><input id='bid-amount' type='number' required placeholder="پیشنهاد خود را وارد کنید"/>تومان</span> <button type='submit'> ارسال </button>
                            </form>
                        </div>
            }
            else{
                offer = <div id="offer">
                    <div id="offer-title-already-bid"><h5 className="flaticon-check-mark">شما قبلا پیشنهاد خود را ثبت کرده‌اید</h5></div>
                </div>
            }
        

        return (
            <div id="project-body-container">
                <div id="job-info">	
                    <div id="job-info-container">
                        <p id="title"><b>{project.title}</b></p>
                        {deadline}
                        <p id="budget" className="flaticon-money-bag"><b> بودجه: {toPersianDigits(project.budget.toString())} تومان</b></p>
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
                        <SkillsContainer view='project' skills={project.skills}/>
                    </div>
                </div>
                {offer}
            </div>
        )
    }

    submitForm(e : React.FormEvent<HTMLFormElement>): void{

        const {state} = this
        var bidAmount = (document.getElementById('bid-amount')! as HTMLInputElement).value
        const {project} = this.props
        var forceUpdate = this.forceUpdate.bind(this)
        var setState = this.setState.bind(this)
        
        if(parseInt(bidAmount) > project.budget){
            alert("مبلغ پیشنهادی شما از بودجه‌ی پروژه بیشتر است!")
            e.preventDefault()
            return
        }

        var jwt = localStorage.getItem('joboonja-jwt')

        axios.put('http://localhost:8080/projects/'+project.id+'/bids?bidAmount='+bidAmount, null, {headers:{Authorization:jwt!}})
          .then(function (response) {
            setState({
                bid: false,
                remained_time: state.remained_time
            })
            alert("پیشنهاد شما با موفقیت ثبت شد!")
            forceUpdate()
          })
          .catch(function (error) {
            console.log(error);
          });

        e.preventDefault();
    }
}
