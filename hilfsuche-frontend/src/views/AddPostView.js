
import React from 'react';

export class AddPostView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(props){
        this.setState({
            loading: true
        });

        let id = this.props.match.params.id;
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading... AddPostView</h2>);
        }
    }
}