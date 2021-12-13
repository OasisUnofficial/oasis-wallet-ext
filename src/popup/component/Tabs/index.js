import React from "react";
import "./index.scss";
export default class Tabs extends React.Component {
  constructor(props) {
    super(props);
    let index = props.currentActiveIndex || 0
    this.state = {
      currentIndex: index,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentActiveIndex !== this.props.currentActiveIndex) {
      this.setState({
        currentIndex: nextProps.currentActiveIndex
      })
    }
  }
  detailClickHandler=(index,disable)=>{
    if(disable){
      return
    }
    let { onChangeIndex } = this.props
    onChangeIndex(index)
  }
  check_title_index = (index,disable) => {
    if(disable){
      return "tab_title home-disable"
    }
    return this.state.currentIndex === index ? "tab_title home-active click-cursor" : "tab_title home-inactive click-cursor";
  };
  check_item_index = (index) => {
    return this.state.currentIndex === index ? "show" : "hide";
  };
  render() {
    return (
      <div>
        <ul className="tab_content_wrap">
          {React.Children.map(this.props.children, (ele, index) => {
            if(ele.disable){
              return <></>
            }
            let key = ele.props.label
            return (
              <li key={key} className={this.check_item_index(index)}>
                {ele.props.children}
              </li>
            );
          })}
        </ul>
        <ul className="tab_title_wrap">
          {React.Children.map(this.props.children, (ele, index) => {
            let commonSource = ele.props.commonSource
            let activeSource = ele.props.activeSource
            let disableSource = ele.props.disableSource
            let disable = ele.props.disable

            let imgSource = disable ? disableSource :this.state.currentIndex === index ? activeSource : commonSource
            return (
              <li
                key={index + ""}
                className={this.check_title_index(index,disable)}
                onClick={()=>
                   this.detailClickHandler(index,disable)
                  }>
                <img className="home-tab-img" src={imgSource}></img>
                {ele.props.label}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
