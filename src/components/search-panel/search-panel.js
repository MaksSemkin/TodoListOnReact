import React, {Component} from 'react'

export default class SearchPanel extends Component {

    state  = {

        term:''
}

    searchS = (e)=> {

        const term = e.target.value;


        this.setState({term});
        this.props.searchS(term);
    }

    render() {
    const searchText = 'Type here to search'
    const searchStyle = {
        fontSize: '20px'
    };

        const {searchItems} = this.props;




    return (
        <form
            className="item-add-form"
            onChange={this.searchS}
            value = {this.state.term}>

        <input
            className="search-input "
            style={this.searchStyle}
            type="text" placeholder={this.searchText}
            disabled={false}

        />
        </form>
    )
}
};


