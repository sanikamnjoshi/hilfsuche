import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { MsgListRow } from './MsgListRow';
import axios from 'axios';
import UserService from '../services/UserService';


export default class MsgList extends Component {
    constructor(props) {
      super(props);
        
      console.log("super props from" + JSON.stringify(props.data));

      this.state = {
        msgs: [],
        msgsSent: [],
        msgsReceived: [],
        msgsAll: [],
        activeKey: 1,
        currentUserId: UserService.getCurrentUser().id
      };
    }
  
    componentDidMount() {
    }

    /*
    Pass data from parent component to chıld's 
    */
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.msgs !== this.state.msgs) {

          const localCurrentUserId = this.state.currentUserId;
          const localMsgs = nextProps.msgs;
          let localAll = [];
          let localSent = [];
          let localReceived = [];

          console.log('all them messages')
          console.log(localMsgs)

          localMsgs.map(msg => {
            if (msg.toUserId == localCurrentUserId) {
              localReceived = localReceived.concat(msg)
              localAll = localAll.concat(msg)
            }
            else if (msg.fromUserId == localCurrentUserId) {
              localSent = localSent.concat(msg)
              localAll = localAll.concat(msg)
            }
          })
      
          this.setState({
            msgsAll: localAll,
            msgsSent: localSent,
            msgsReceived: localReceived
          });
        }
        if (nextProps.activeKey !== this.state.activeKey) {
          this.setState({ activeKey: nextProps.activeKey });
        }
    }
    
    filterMsg() {
        console.log("state " + this.props.keyValue);


        if(this.props.keyValue != undefined) {
            if(this.props.keyValue == 1) {
              if(this.state.msgsAll.length == 0){return(<Alert variant="warning" className="mt-2">You haven't sent or received any messages!</Alert>)}
              else {
                return (
                    this.state.msgsAll
                    .map((item, i) => {
                        return <MsgListRow
                        key={i}
                        msg={item}
                        />
                    })
                )
              }
            }
            else if (this.props.keyValue == 2) {
              if(this.state.msgsReceived.length == 0){return(<Alert variant="warning" className="mt-2">You haven't received any messages yet.</Alert>)}
              else {
                return (
                  this.state.msgsReceived
                    .map((item, i) => {
                        return <MsgListRow
                        key={i}
                        msg={item}
                        />
                    })
                )
              }
            }
            else if (this.props.keyValue == 3) {
              if(this.state.msgsSent.length == 0){return(<Alert variant="warning" className="mt-2">You haven't sent any messages yet.</Alert>)}
              else {
                return (
                  this.state.msgsSent
                    .map((item, i) => {
                        return <MsgListRow
                        key={i}
                        msg={item}
                        />
                    })
                )
              }
            } else {
                console.log("Tab - keyValue is invalid");
            }
        } else {
            console.log("No tab is chosen");
        }
    }

    render() {
        // console.log("is giver" + JSON.stringify(this.state.msgs));
        console.log("show all props ın thıs fıle: " + JSON.stringify(this.props));
        console.log("state " + this.props.keyValue);

    
        return(this.filterMsg());
    }
  }