import React from 'react';
import { Container, Segment, Header, Icon, Button, Divider } from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';

function FinishPage(props) {
    const {history} = props;
    return (
        <Container>
            <Segment color='red' >
                <Header as='h3' icon textAlign='center' >
                    <Icon name='chess' circular />
                    <Header.Content> Finish Update Game. Try another match . </Header.Content>
                </Header>
                <Button fluid color='violet' onClick={() => history.push('/game/uno') } > Next Match :)) </Button>
                <Divider/>
                <Button fluid color='orange' onClick={() => history.push('/') } > Back </Button>
            </Segment>
        </Container>
    )
};

export default withRouter(FinishPage);