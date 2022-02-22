
import React from "react";
import { Breadcrumb } from 'react-bootstrap';

export class MyBreadcrumb extends React.Component {

    constructor(props) {
        super(props);
    }
 
    render() {
        return(
            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                    Library
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>
        );
    }

}