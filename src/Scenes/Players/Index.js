import React, {useState,useEffect} from 'react';
import { getAllAPIType,postNewAPIType,deleteAPIType } from "../../services/api";
import ModalPlayer from './ModalPlayer';
import IconHeader from '../../components/IconHeader/Index';
import { Container, Divider, Segment, Grid, Form, Button, Header, Icon, Loader, List, Message, Responsive, Tab } from 'semantic-ui-react';
 
function PlayersPage() {
    const [name, setName] = useState({ name : '' });
    const [error,setError] = useState(false);
    const [listPlayer, setListPlayer] = useState([]);

    const panes = [
        {
            menuItem : 'Add Player',
            render : () => <Tab.Pane>
                        
                        <Form error={error} >
                            <Form.Field>
                                <label> <Icon name='address card' /> Name : </label>
                                <input
                                    value={name.name}
                                    placeholder='Name Player ' 
                                    onChange={(event) => setName({name : event.target.value }) }
                                />
                            </Form.Field>
                            <Message
                                error
                                header='Error'
                                content='Error try again !'
                            />
                            <Button 
                                type='submit' 
                                primary 
                                onClick={() => {
                                postNewAPIType('players',name)
                                .then(value => {
                                        listPlayer.push(value.data);
                                        setName({name : ''});
                                        setError(false);
                                        //document.getElementById('inputName').value = '';
                                })
                                .catch(err => setError(true) );
                                } }
                            > <Icon name='check' /> Submit</Button>
                        </Form>
            </Tab.Pane>
        },
        {
            menuItem : 'List Player',
            render : () => <Tab.Pane>
            {
                            ( !!listPlayer.length ) ?
                            // get data success
                            <List divided verticalAlign='middle' size='big' >
                                {/* test listPlayer */}
                                {
                                    listPlayer.map(player => (
                                        <List.Item key={player._id} >
                                            <List.Content floated='right' >
                                                <ModalPlayer/>
                                                <Button 
                                                    icon 
                                                    color='red' 
                                                    size='mini' 
                                                    onClick={() => {
                                                        console.log(player._id)
                                                        deleteAPIType('players',player._id)
                                                        .then(value => setListPlayer(value.data) )
                                                        .catch(err => console.log(err) )
                                                    }}
                                                > <Icon name='delete' /> </Button>
                                            </List.Content>
                                            <Icon name='user' />
                                            <List.Content verticalAlign='middle' > {player.name} </List.Content>
                                        </List.Item>
                                    ))
                                }
                            </List>
                            :
                            // Loading khi chờ get data
                            <Segment>
                                <Loader active inline='centered' />
                            </Segment>
            }  
            </Tab.Pane>
        }
    ];

    const fecthPlayers = async () => {
        try {
            const res = await getAllAPIType('players');
            setListPlayer(res.data);
        } catch(err) {
            setListPlayer([]);
        }
    };

    useEffect(() => { fecthPlayers() }, []);

    return (
        <Container>
            <IconHeader icon='users' header='Players' sub='Player : Create and List' />
            <Divider/>
            {/* ===Form Add players in computer=== */}
            <Responsive
                {...Responsive.onlyComputer}
                as={Segment}
                raised
            >
                <Grid columns={2} relaxed='very' >

                {/* Component Create Player */}
                    <Grid.Column>
                        <Header as='h3' textAlign='center' > <Icon name='user plus' /> Create Player </Header>
                        
                        <Form error={error} >
                            <Form.Field>
                                <label> <Icon name='address card' /> Name : </label>
                                <input
                                    value={name.name}
                                    placeholder='Name Player ' 
                                    onChange={(event) => setName({name : event.target.value }) }
                                />
                            </Form.Field>
                            <Message
                                error
                                header='Error'
                                content='Error try again !'
                            />
                            <Button 
                                type='submit' 
                                primary 
                                onClick={() => {
                                postNewAPIType('players',name)
                                .then(value => {
                                        listPlayer.push(value.data);
                                        setName({name : ''});
                                        setError(false);
                                        //document.getElementById('inputName').value = '';
                                })
                                .catch(err => setError(true) );
                                } }
                            > <Icon name='check' /> Submit</Button>
                        </Form>

                    </Grid.Column>

                    {/* Component List Player */}


                    <Grid.Column>
                        <Header as='h3' textAlign='center' > <Icon name='users' /> List Player </Header>
                        {
                            ( !!listPlayer.length ) ?
                            // get data success
                            <List divided verticalAlign='middle' size='big' >
                                {/* test listPlayer */}
                                {
                                    listPlayer.map(player => (
                                        <List.Item key={player._id} >
                                            <List.Content floated='right' >
                                                <ModalPlayer/>
                                                <Button 
                                                    icon 
                                                    color='red' 
                                                    size='mini' 
                                                    onClick={() => {
                                                        console.log(player._id)
                                                        deleteAPIType('players',player._id)
                                                        .then(value => setListPlayer(value.data) )
                                                        .catch(err => console.log(err) )
                                                    }}
                                                > <Icon name='delete' /> </Button>
                                            </List.Content>
                                            <Icon name='user' />
                                            <List.Content verticalAlign='middle' > {player.name} </List.Content>
                                        </List.Item>
                                    ))
                                }
                            </List>
                            :
                            // Loading khi chờ get data
                            <Segment>
                            <Loader active inline='centered' />
                            </Segment>
                        }                           
                    </Grid.Column>
                </Grid>

                <Divider vertical>And</Divider>
            </Responsive>
            {/* === END Players Computer === */}
            {/* PLAYER MOBILE */}
            <Responsive
                {...Responsive.onlyMobile}
                as={Tab}
                panes={panes}
            />
        </Container>
    )
};

export default PlayersPage;