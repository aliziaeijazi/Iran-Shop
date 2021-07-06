import {Header} from "./components/Header/Header.component";

function Users(props) {

    return (<div>
            <Header/>
            {props.children}
        </div>

    )
}

export {Users}