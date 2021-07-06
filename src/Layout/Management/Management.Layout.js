import {Header} from "./components/Header/Header.component";

function Management(props) {

    return (<div>
            <Header/>
            {props.children}
    </div>

    )
}

export {Management}