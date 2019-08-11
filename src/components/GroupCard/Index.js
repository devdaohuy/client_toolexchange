import React from 'react';
import { Card, Image, Button, Segment, Loader, Icon, List } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import url from '../../services/url';

function RouteGroup(props) {
    const {groups} = props;
    //console.log(groups);
    if ( groups === undefined || !!groups.length === false) {
        return (
            <Segment>
                <Loader active inline='centered' />
            </Segment>
        )
    } else {
        return (
            <Card.Group>
                {
                    props.groups.map((group,index) => (
                        <Card key={index} color='black' >
                            <Image 
                                src={`${url.server}/image/${group.background}.jpg`} 
                                wrapped 
                                ui={false}
                            />
                            <Card.Content>
                                <Card.Header> <Icon name='group' circular /> {group.name} </Card.Header>
                                <Card.Description>
                                    <List ordered >
                                        {
                                            group.players.map((player,index) => (
                                                <List.Item key={index} >
                                                    <Icon name='user' />
                                                    <List.Content>
                                                        <List.Header> {player.name} </List.Header>
                                                     
                                                    </List.Content>
                                                </List.Item>
                                            ))
                                        }
                                    </List>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra >
                                <Button color='orange' as={Link} to={`${props.match.url}/${group._id}`} > Go {group.name} Page </Button>
                            </Card.Content>
                        </Card>
                    ))
                }
            </Card.Group>
        )
    }

};

export default RouteGroup;