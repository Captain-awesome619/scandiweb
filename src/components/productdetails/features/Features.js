import React, { Component } from 'react'
import "../features/features.scss"


class Features extends Component {
    constructor(){
        super();
        this.state ={
            chosen: null
        }
    }

optionchanger(key,type){
    if (this.state.chosen === key) {
        this.setState({ chosen: null });
        return this.props.Selections({
          id: this.props.attribute.id,
          type: type,
          chosen: null,
        });
      } else {
        this.setState({ chosen: key });
        return this.props.Selections({
          id: this.props.attribute.id,
          type: type,
          chosen: key,
        });
      }
}
  render() {
if (this.props.attribute.type === "text") {
    return (
      <div className='text'>
        <p className='attrtext'>{this.props.attribute.name}:</p>
<div className='text-buttons' >
    {this.props.attribute.items.map((item, key) => (
        <button className={this.state.chosen === key
? "text-select"
: "text-unselect"
}

onClick={() =>{
    this.optionchanger(key, "text");
}}
key={key}>
<p className='text-option'>
    {item.value}
</p>
        </button>

    ))}
</div>
      </div>
    )
  }

  if (this.props.attribute.type === "swatch"){
    return (<div className='wrapper'>
<p className='attrname'>{this.props.attribute.name}:</p>
<div className='swatchopt'>

{this.props.attribute.items.map((item,key) => (
    <div className='options' key={key}>
<button className={
    this.state.chosen === key ?
    "color-picked"
    :"colors"
}
style ={{backgroundColor: `${item.value}`}}
onClick={() => {this.optionchanger(key, "swatch")
}}
key={key}
/>
         </div>
))}
</div>
        </div>
    )
}



}
}
export default Features;