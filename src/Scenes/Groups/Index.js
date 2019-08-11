import React,{useState, useEffect} from 'react';
import {getAllAPIType,postNewAPIType,deleteAPIType} from  '../../services/api';
import {Group} from '../../services/createObject';
import IconHeader from '../../components/IconHeader/Index';
import { Container, Divider, Segment, Grid, Form, Button, Header, Icon, List, Message, Popup, Loader, Tab, Responsive } from 'semantic-ui-react';

const avatarGroups = ['Zeus','Poseidon','Hades'];

function GroupsPage() {
    const [name, setName] = useState({
        nameGroup : '',
        validNameGroup : false
    }); // create name groups
    const [avatar, setAvatar] = useState('Zeus');
    const [playerCheck, setPlayerCheck] = useState([]); // player in checkbox

    const [error,setError] = useState(false); // check form true or false
    const [players,setPlayers] = useState([]); // get all players
    const [groups,setGroups] = useState([]); // get and show delete groups

    const panes = [
        {
            menuItem : 'Create Group',
            render : () => <Tab.Pane>
                <Form error={error} >
                    <Form.Field>
                        <Form.Input
                            label={'Name'}
                            placeholder='Name Group '
                            error={name.validNameGroup}
                            value={name.nameGroup}
                            onChange={(event) => setName({ nameGroup : event.target.value, validNameGroup : false }) }
                        />
                    </Form.Field>

                    <Form.Group grouped >
                        <Header as='h4' > Choose Player: </Header>
                        {
                            players.map(player => (
                                <Form.Checkbox 
                                    key={player._id}
                                    value={player._id} 
                                    label={player.name}
                                    onChange={(event,data) => {
                                        if (data.checked === true) {
                                            //playersCheckBox.push({name : player.name , idPlayer : player._id})
                                            playerCheck.push({name : player.name, idPlayer : player._id})
                                        } else {
                                            // playerCheck.slice(
                                            //     playerCheck.findIndex(player => player._id === data.value )    
                                            // ,1);
                                            playerCheck.filter(player => player._id !== data.value );
                                        }
                                    }}
                                />
                            ))
                        }
                    </Form.Group>

                    <Form.Group grouped >
                        <Header as='h4' > Choose Avatar: </Header>
                        {
                            avatarGroups.map((ava,index) => (
                                <Form.Radio
                                    key={index}
                                    label={ava}
                                    value={ava}
                                    checked={avatar === ava}
                                    onChange={() => setAvatar(ava) }
                                />
                            ))
                        }
                    </Form.Group>

                    <Message
                        error
                        header='Error'
                        content='Error try again !'
                    />
                    {/* Btn submit add group */}
                    <Button 
                        type='submit' 
                        onClick={(event) => {
                            let newValuePost = new Group(name.nameGroup,avatar,playerCheck);
                            if ( !!name.nameGroup === false ) {
                                setName({ nameGroup : '', validNameGroup : true });
                            } else {
                                postNewAPIType('groups',newValuePost)
                                .then(value => {
                                    groups.push(value.data);
                                    setAvatar('Zeus');
                                    setPlayerCheck([]);
                                    setName({ nameGroup : '', validNameGroup : false });
                                    setError(false);
                                })
                                .catch(err => setError(true) );
                            }
                        }}
                        
                    > <Icon name='check' /> Submit</Button>
                </Form>
            </Tab.Pane>
        },
        {
            menuItem : 'List Groups',
            render : () => <Tab.Pane>
                <List divided verticalAlign='middle' size='big' >
                                    
                    {
                        groups.map(group => (
                            <Popup
                                key={group._id}
                                basic
                                content={(
                                    <List as='ol' >
                                        {
                                            group.players.map((player,index) => (
                                                <List.Item as='li' key={index} >
                                                    <List.Content>
                                                        <Icon name='user' />
                                                        <List.Header> {player.name} </List.Header>
                                                    </List.Content>
                                                </List.Item>
                                            ))
                                        }
                                    </List>
                                )}
                                trigger={
                                    <List.Item>
                                        <List.Content floated='right' >
                                            <Button
                                                icon
                                                color='red'
                                                size='mini'
                                                onClick={() => {
                                                    deleteAPIType('groups', group._id)
                                                    .then(value => setGroups(value.data) )
                                                    .catch(err => console.log(err) )
                                                } }
                                            > <Icon name='delete' /> </Button>
                                        </List.Content>
                                        
                                        <Icon name='group' />

                                        <List.Content> {group.name} </List.Content>
                                    </List.Item>
                                }
                            />
                        ))
                    }
                </List>
            </Tab.Pane>
        }
    ];

    const fetchPlayerGroups = async () => {
        try {
            const [resPlayers,resGroups] = await Promise.all([
                getAllAPIType('players'),
                getAllAPIType('groups')
            ]);
            setPlayers(resPlayers.data);
            setGroups(resGroups.data);

        } catch(err) {
            console.log(err);
            setPlayers([]);
            setGroups([]);
        }
    };

    useEffect(() => {fetchPlayerGroups()}, [])

    return (
        <Container>
            <IconHeader icon='group' header='Groups' sub='Groups : Create and List' />
            <Divider/>

            {
                (
                    !!players.length === false
                ) ?
                
                <Segment>
                    <Loader active inline='centered' />
                </Segment>
                
                :
                <div>
                    <Responsive
                        {...Responsive.onlyComputer}
                        as={Segment}
                        raised
                    >
                        <Grid columns={2} relaxed='very' >
                            
                            {/* Component Create Player */}
                            <Grid.Column>
                                <Header as='h3' textAlign='center'> <Icon name='group' /> Create Group </Header>

                                {/* Form create group */}
                                <Form error={error} >
                                    <Form.Field>
                                        <Form.Input
                                            label={'Name'}
                                            placeholder='Name Group '
                                            error={name.validNameGroup}
                                            value={name.nameGroup}
                                            onChange={(event) => setName({ nameGroup : event.target.value, validNameGroup : false }) }
                                        />
                                    </Form.Field>

                                    <Form.Group grouped >
                                        <Header as='h4' > Choose Player: </Header>
                                        {
                                            players.map(player => (
                                                <Form.Checkbox 
                                                    key={player._id}
                                                    value={player._id} 
                                                    label={player.name}
                                                    onChange={(event,data) => {
                                                        if (data.checked === true) {
                                                            //playersCheckBox.push({name : player.name , idPlayer : player._id})
                                                            playerCheck.push({name : player.name, idPlayer : player._id})
                                                        } else {
                                                            // playerCheck.slice(
                                                            //     playerCheck.findIndex(player => player._id === data.value )    
                                                            // ,1);
                                                            playerCheck.filter(player => player._id !== data.value );
                                                        }
                                                    }}
                                                />
                                            ))
                                        }
                                    </Form.Group>

                                    <Form.Group grouped >
                                        <Header as='h4'> Choose Avatar: </Header>
                                        {
                                            avatarGroups.map((ava,index) => (
                                                <Form.Radio
                                                    key={index}
                                                    label={ava}
                                                    value={ava}
                                                    checked={avatar === ava}
                                                    onChange={() => setAvatar(ava) }
                                                />
                                            ))
                                        }
                                    </Form.Group>

                                    <Message
                                        error
                                        header='Error'
                                        content='Error try again !'
                                    />
                                    {/* Btn submit add group */}
                                    <Button 
                                        type='submit' 
                                        onClick={(event) => {
                                            let newValuePost = new Group(name.nameGroup,avatar,playerCheck);
                                            if ( !!name.nameGroup === false ) {
                                                setName({ nameGroup : '', validNameGroup : true });
                                            } else {
                                                postNewAPIType('groups',newValuePost)
                                                .then(value => {
                                                    groups.push(value.data);
                                                    setAvatar('Zeus');
                                                    setPlayerCheck([]);
                                                    setName({ nameGroup : '', validNameGroup : false });
                                                    setError(false);
                                                })
                                                .catch(err => setError(true) );
                                            }
                                        }}
                                        
                                    > <Icon name='check' /> Submit</Button>
                                </Form>
                                {/* ===End=== */}

                            </Grid.Column>
                            
                            {/* Component List Player */}
                            <Grid.Column>
                                <Header as='h3' textAlign='center'> <Icon name='group' /> List Groups </Header>
                                <List divided verticalAlign='middle' size='big' >
                                    
                                    {
                                        groups.map(group => (
                                            <Popup
                                                key={group._id}
                                                basic
                                                content={(
                                                    <List as='ol' >
                                                        {
                                                            group.players.map((player,index) => (
                                                                <List.Item as='li' key={index} >
                                                                    <List.Content>
                                                                        <Icon name='user' />
                                                                        <List.Header> {player.name} </List.Header>
                                                                    </List.Content>
                                                                </List.Item>
                                                            ))
                                                        }
                                                    </List>
                                                )}
                                                trigger={
                                                    <List.Item>
                                                        <List.Content floated='right' >
                                                            <Button
                                                                icon
                                                                color='red'
                                                                size='mini'
                                                                onClick={() => {
                                                                    deleteAPIType('groups', group._id)
                                                                    .then(value => setGroups(value.data) )
                                                                    .catch(err => console.log(err) )
                                                                } }
                                                            > <Icon name='delete' /> </Button>
                                                        </List.Content>
                                                        
                                                        <Icon name='group' />

                                                        <List.Content> {group.name} </List.Content>
                                                    </List.Item>
                                                }
                                            />
                                        ))
                                    }
                                </List>
                            </Grid.Column>
                        
                        </Grid>
                        
                        <Divider vertical>And</Divider>
                    </Responsive>
                
                    {/* Responsize for mobile */}

                    <Responsive
                        as={Tab}
                        {...Responsive.onlyMobile}
                        panes={panes}
                    />

                </div>
            }

        </Container>
    )
}

export default GroupsPage;