import React, {useState, useEffect} from 'react';
import * as moment from 'moment';
import {getOneAPIType} from '../../services/api';
import url from '../../services/url';
import { Loader, Segment, Header, Container,Image, List, Icon, Card, Button, Modal, Table, Divider, Responsive } from 'semantic-ui-react';

function SummaryPage(props) {   
    const [group, setGroup] = useState({});
    const {match} = props;

    const fetchGroup = async (groupID) => {
        try {
            const res = await getOneAPIType('groups', groupID);
            setGroup(res.data);
        } catch(err) {
            console.log(err);
            setGroup({});
        }
    };
    //console.log(group);
    useEffect(() => { fetchGroup(match.params.groupID) }, []);

    if ( !!Object.keys(group).length === false ) {
        return <Loader active inline />
    } else {
        return (
            <Segment>
                <Container>
                    <Divider horizontal >
                        <Header as='h3'> <Icon name='plus' /> Summary Game </Header>    
                    </Divider>

                    <Table definition color='black' >
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell> <Icon name="address book" /> Name Group </Table.Cell>
                                <Table.Cell> <Image src={`${url.server}/image/${group.background}.jpg`} avatar /> {group.name} </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell> <Icon name="address book outline" /> ID Group </Table.Cell>
                                <Table.Cell> {group._id} </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell> <Icon name="calendar" /> Date Create </Table.Cell>
                                <Table.Cell> {moment(group.createAt).format('MMMM Do YYYY, h:mm:ss a')} </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell> <Icon name="user outline " /> Players </Table.Cell>
                                <Table.Cell>
                                    <List horizontal >
                                    {
                                        group.players.map(player => (
                                            <List.Item key={player.idPlayer} >
                                                <List.Content>
                                                    <List.Header> <Icon name='user' />{player.name} </List.Header>
                                                </List.Content>
                                            </List.Item>
                                        ))
                                    }  
                                    </List>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                    
                    <Divider horizontal >
                        <Header as='h3'> <Icon name='calendar' /> Date Play Game </Header>    
                    </Divider>

                    <Table definition color='black' >
                        {
                            group.games.map((game,index) => (
                                <Table.Row key={index} >
                                    <Table.Cell> <Icon name='calendar' /> Date {index + 1 } </Table.Cell>
                                    <Table.Cell>
                                        {/* Modal */}
                                        <Modal trigger={<Button> {moment(game.idGameplay.playAt).format('MMMM Do YYYY, h:mm:ss a')} </Button>} >
                                            <Modal.Content>
                                
                                                <Divider horizontal >
                                                    <Header as='h3'> <Icon name='chess pawn' /> Point Match </Header>    
                                                </Divider>

                                                <Table celled color='black' >
                                                    <Table.Header>
                                                        <Table.Row>
                                                            <Table.HeaderCell> <Icon name='user' circular /> Player </Table.HeaderCell>
                                                            {
                                                                game.idGameplay.summary.map((player,index) => (
                                                                    <Table.HeaderCell key={index} > <Icon name='user outline' /> {player.name} </Table.HeaderCell>
                                                                ))
                                                            }
                                                        </Table.Row>
                                                    </Table.Header>
                                                    <Table.Body>
                                                        {
                                                            game.idGameplay.stages.map((inStage,index) => (
                                                                <Table.Row key={index} >
                                                                    <Table.Cell> <Icon name='coffee'/> Stage : {inStage.stage} </Table.Cell>
                                                                    {
                                                                        inStage.gameplay.map((game,index) => (
                                                                            <Table.Cell key={index} > <Icon name='winner' /> {game.point} </Table.Cell>
                                                                        ))
                                                                    }
                                                                </Table.Row>
                                                            ))
                                                        }
                                                    </Table.Body>
                                                </Table>
                                            
                                                <Divider horizontal >
                                                    <Header as='h3'> <Icon name='winner' /> Total Point </Header>    
                                                </Divider>

                                                <Responsive
                                                    {...Responsive.onlyComputer}
                                                    as={Table}
                                                    celled color='black'
                                                >
                                                    <Table.Header>
                                                        <Table.Row>
                                                            <Table.HeaderCell> <Icon name='user' circular /> Player </Table.HeaderCell>
                                                            {
                                                                game.idGameplay.summary.map((player,index) => (
                                                                    <Table.HeaderCell key={index} > <Icon name='user outline' /> {player.name} </Table.HeaderCell>
                                                                ))
                                                            }
                                                        </Table.Row>
                                                    </Table.Header>
                                                    <Table.Body>
                                                        <Table.Row>
                                                            <Table.Cell> <Icon name='coffee' circular /> Point </Table.Cell>
                                                            {
                                                                game.idGameplay.summary.map((player,index) => (
                                                                    <Table.Cell key={index} > <Icon name='winner' /> {player.point} </Table.Cell>
                                                                ))
                                                            }
                                                        </Table.Row>
                                                    </Table.Body>
                                                </Responsive>
                                                {/* MODAL FOR MOBILE */}
                                                <Responsive
                                                    {...Responsive.onlyMobile}
                                                    as={Table}
                                                    celled color='black'
                                                >
                                                    <Table.Body>
                                                        {
                                                            game.idGameplay.summary.map((player,index) => (
                                                                <Table.Row key={index} >
                                                                    <Table.Cell> {player.name} </Table.Cell>
                                                                    <Table.Cell> <Icon name='winner' /> {player.point} </Table.Cell>
                                                                </Table.Row>
                                                            ))
                                                        }
                                                    </Table.Body>
                                                </Responsive>
                                                {/* END MODAL FOR MOBILE */}
                                            </Modal.Content>
                                            <Modal.Actions>
                                                <Button primary > Edit </Button>
                                            </Modal.Actions>
                                        </Modal>
                                        {/* ==== END ==== */}
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table>
                </Container>
            </Segment>
        )
    }
};

export default SummaryPage;