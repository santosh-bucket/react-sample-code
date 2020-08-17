import React from "react";
import menuData from '../menu-data.json';
class EditItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            category: "",
            price: "" ,
            available: "",
            data: {},
            isError: false,
            msg: false
        }

    }
    componentDidMount() {
        const data = {...menuData};   
        const id = this.props.match.params.id;   
        Object.keys(data).filter(key => key !== id).forEach(key => delete data[key]); 
        const dataObj =  data && data[id] ? data[id] : {}; 
        const {name, category, price, available} = dataObj;
        this.setState({ data, name, category, price, available }, () => {
            console.log(name, category, available, price);
            this.showSaveButton();           
        });        
        if(!id || !data[id] ){
            this.props.history.push('/')
        }
    } 
    showSaveButton = () => {
        const {name, category, price, available} = this.state;
        if(!name || !category || !available || !price){
            this.setState({isError: true});
        } else if(this.state.isError === true) {
            this.setState({isError: false});
        }
    } 
    formUpdate = (e) => {
        let value = e.target.value;
        if(value){
            value = value.trim();
        }
        this.setState({ [e.target.name] : e.target.value}, () => {
            this.showSaveButton(); 
        });        
    }
    formSubmit = () => {       
        let {name, category, available, price} = this.state; 
        if(name) {
            name = name.trim();
        }
        if(category) {
            category = category.trim();
        }  
       
        if(name && category && available && price){
            const {data} = this.state;
            const id = this.props.match.params.id;
            data[id].name = name;
            data[id].category = category;
            data[id].price = price;
            data[id].available = available;
            this.setState({ data, msg : true }, () => {
                setTimeout(()=>{ this.setState({msg: false}); }, 600);
            });
            
            console.log("SaveLog->", data);
        }
       
        
    }
    getBack = () => {        
        this.props.history.push('/')
    }
    render(){     
        const {name, category, price, available, isError, msg} =  this.state;
        return(               
                <div className="formContainer">
                <h1>Edit Item</h1>
                {msg ? (<h3>Data Saved!</h3>) : ""} 
                <div className="formDiv">
                    <div className="label">Name</div>
                    <div className="formInput">
                        <input type="text" name="name" value={name} onChange={this.formUpdate} required/>
                    </div>
                </div>
                <div className="formDiv">
                <div className="label">Category</div>
                <div className="formInput"><input type="text" name="category" value={category} onChange={this.formUpdate} required /></div>
                </div>
                <div className="formDiv">
                <div className="label">Price</div>
                <div className="formInput"><input type="number" name="price" value={price} onChange={this.formUpdate} required /></div>
                </div>
                <div className="formDiv">
                <div className="label">Available</div>
                <div className="formInput">
                    <select name="available" onChange={this.formUpdate}>
                        <option value="true" checked ={available === "true" ? true : false }>True</option>
                        <option value="false" checked ={available === "false" ? true : false }>False</option>
                    </select>
                </div>
                </div>
               
                <div>
                    <input type="button" name="back" value="Back" className="innerBtn" onClick={this.getBack}></input>   
                    {
                      !isError ? (
                        <input type="button" name="save" value="Save" className="innerBtn" onClick={this.formSubmit} />
                      ) : ""  
                    }                     
                </div>
               </div>   
                 
                
        )
    }
}
export default EditItem;
   