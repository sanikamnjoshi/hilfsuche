
import React from 'react';
import PopupPage from '../components/PopupPage';
import { PostDetail } from "../components/PostDetail";

// import PostService from '../services/PostService';

export class PostDetailView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(props){
        this.setState({
            loading: true
        });

        let id = this.props.match.params.id;
/*
        PostService.getPost(id).then((data) => {
            this.setState({
                post: data,
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
        */
    }
/*
    deletePost(id) {
        PostService.deletePost(id).then((message) => {
            this.props.history.push('/');
        }).catch((e) => {
            console.log(e);
        });
    }
    */

    render() {
        return (
            <PopupPage>
                <PostDetail post={this.state.post} onDelete={(id) => this.deletePost(id)}/>
            </PopupPage>
        );
    }
}

/*


        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }
                <PostDetail post={this.state.post} onDelete={(id) => this.deletePost(id)}/>
*/