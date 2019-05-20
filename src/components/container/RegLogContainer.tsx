import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.css';
import 'src/styles/container/RegLogContainer.scss'
import RegLogLeft from 'src/components/container/reg-log-left/RegLogLeft';
import RegLogRight from 'src/components/container/reg-log-right/RegLogRight';

interface State{

}

interface Props{
    view: string
    history: History
}

export default class RegLogContainer extends Component<Props, State> {
    constructor(props: Props){
        super(props)
    }

    render() {
        const {view} = this.props
        const {history} = this.props
        return (
            <div className="row">
                <RegLogLeft view={view} history={history}/>
                <RegLogRight view={view}/>
            </div>
        )
    }
}
