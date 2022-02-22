// packages
import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {LoginView} from './views/LoginView';
import PostDetail  from './components/PostDetail';
import {SignUpView} from './views/SignUpView';
import EditPost from './components/EditPost'
import {UserMessageView} from './views/UserMessageView';
import {UserPostView} from './views/UserPostView';
import {UserProfileView} from './views/UserProfileView';
import {HomepageView} from "./views/HomepageView";
import UserService from './services/UserService';
import CreatePost from "./components/CreatePost";
import MsgView from './views/MsgView';
import ReplyView from './views/ReplyView';
import MsgIndividual from "./components/MsgIndividual";


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Hilfsuche',
            routes: [
                { component: HomepageView , path: '/', exact: true},
                { component: PostDetail , path: '/show/:id'},
                { render: (props) => {
                        if(UserService.isAuthenticated()) {
                            return (<EditPost {... props} />)
                        }
                        else {
                            return (<Redirect to={'/login'}/>)
                        }} , path: '/editpost/:id'},
                { render: (props) => {
                        if(UserService.isAuthenticated()) {
                            return (<CreatePost {... props} />)
                        }
                        else {
                            return (<Redirect to={'/login'}/>)
                        }}, path: '/addpost',},
                { component: LoginView, path: '/login'},
                { component: SignUpView, path: '/register'},
                { render: (props) => {
                        if(UserService.isAuthenticated()) {
                            return (<UserProfileView {... props} />)
                        }
                        else {
                            return (<Redirect to={'/login'}/>)
                        }}, path: '/:id/profile',},
                { component: UserProfileView, path: '/me/profile'},
                { component: UserPostView, path: '/me/post'},
                { component: UserMessageView, path: '/me/message'},
                { render: (props) => {
                    if(UserService.isAuthenticated()) {
                        return (<MsgView {... props} />)
                    }
                    else {
                        return (<Redirect to={'/login'}/>)
                    }}, path: '/sendmessage/:id'},
                { component: EditPost, path: '/editpost/:id'},
                { component: MsgView , path: '/sendmessage/:id'},
                { component: ReplyView , path: '/sendreply/:id'},
                { component: MsgIndividual , path: '/showmessage/:id'}
                
            ]
        };
    }

    componentDidMount(){
        document.title = this.state.title;
    }

    render() {
        return(
            <div>
                <Router>
                    <Switch>
                        {this.state.routes.map((route, i) => (<Route key={i} {...route}/>) )}
                    </Switch>
                </Router>
            </div>
        );
    }
}
