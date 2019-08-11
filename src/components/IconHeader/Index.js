import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

function IconHeader(props) {
    return (
        <Header as='h2' icon textAlign='center' >
            <Icon name={props.icon} circular />
            <Header.Content> {props.header} </Header.Content>
            <Header.Subheader> {props.sub} </Header.Subheader>
        </Header>
    )
};

export default IconHeader;