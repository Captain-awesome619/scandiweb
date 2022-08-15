import React, { Component } from 'react'
import "../features/features.scss"


class Features extends Component {
    constructor(){
        super();
        this.state ={
            selected: null
        }
    }

optionchanger(key,type){
    if (this.state.selected === key) {
        this.setState({ selected: null });
        return this.props.Selections({
          id: this.props.attribute.id,
          type: type,
          selected: null,
        });
      } else {
        this.setState({ selected: key });
        return this.props.Selections({
          id: this.props.attribute.id,
          type: type,
          selected: key,
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
        <button className={this.state.selected === key
? "text-select"
: "text-unselect"
}

onClick={() =>{
    this.optionchanger(key, "text");
}}
key={key}>
<p className='text-opt'>
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
    this.state.selected === key ?
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