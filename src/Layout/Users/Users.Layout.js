import {Header} from "./components/Header/Header.component";


function Users(props) {

    return (<div>
            <Header/>
            <div style={{paddingTop:70}} >
                {props.children}
            </div>
        </div>

    )
}

export {Users}