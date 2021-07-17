import {Header} from "./components/Header/Header.component";

function Management(props) {

    return (<div>
            <Header style={{position:"static"}}/>
            {props.children}
    </div>

    )
}

export {Management}