import React from "react";
import menuData from '../menu-data.json';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { getBookData } from '../actions/home';
// import "../../style.scss";

class Home extends React.Component {
    constructor(props){
        super(props);    
        this.state = {
            data: {}
        }           
    }
    componentDidMount() {
        const data = {...menuData};
        this.setState({ data });
    }  
    deleteItem = (id) => {
        const {data} = this.state;      
        Object.keys(data).filter(key => key === id).forEach(key => delete data[key]);        
        this.setState({ data });
    }
    editItem = (id) => {
        this.props.history.push(`/edit/${id}`);
    }
    render(){
        const {data} = this.state;        
        return (             
           <div className="outerContainer">  
                <div className="innerContainer">                  
                    <ul>{Object.keys(data).map((key, index)=> {
                            return (
                            <li key={index}>                                
                                <div>{data[key].name}</div>
                                <div>{data[key].category}</div>
                                <div>{data[key].price}</div>
                                <div>
                                    <input type="button" name="del" className="innerBtn" value="Delete" onClick={() => this.deleteItem(key)} />
                                    <input type="button" name="edit" className="innerBtn" value="Edit" onClick={() => this.editItem(key)} />
                                </div>                                
                            </li>
                            );
                        })}
                    </ul>
                </div>     
                      
           </div>
        )
        
       
    }
}
export default Home;