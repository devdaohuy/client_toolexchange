import React,{useState, useEffect} from 'react';
import * as moment from 'moment';
import {oneWin, setPointPlayer, gameplayArray, pointWinner, saveData} from '../../services/run';
import {getOneAPIType} from '../../services/api';
import { Loader, Container, Header, Button, Checkbox, Icon, Table, Input, Modal, Divider, Message, Responsive } from 'semantic-ui-react';

function GameplayPage(props) {
    const [group,setGroup] = useState({}); // * get from server
    const [stages,setStages] = useState([]); // * namePlayer only using stages

    const [stageNumber, setStageNumber] = useState(1);
    const [gameplay, setGameplay] = useState(false); // valueGame is stage
    const [error, setError] = useState(true);

    const {match,history} = props;

    const fetchGroup = async (idGroup) => {
       try {
           const res = await getOneAPIType('groups', idGroup);
           const newGame = res.data.players.map(player => ({
               idPlayer : player.idPlayer,
               name : player.name,
               point : 0,
               isWin : false
            }));
            setGroup(res.data);
            setGameplay(newGame);
       } catch(err) {
           console.log(err);
           setGroup({});
           setGameplay(false);
       }
    };

    useEffect(() => { fetchGroup(match.params.groupID) }, []);
    // ======= Loading =========
    if ( Object.keys(group).length = 0 || !!gameplay === false ) {
        return <Loader active inline />
    }
    return (
        <Container>
            <Divider horizontal >
                <Header as='h3'> <Icon name='chess'/> Game Start </Header>
            </Divider>
            
            <Table definition color='black' >
                <Table.Body>
                    <Table.Row>
                        <Table.Cell width={2}> <Icon name='group'/> Group Play </Table.Cell>
                        <Table.Cell> {group.name} </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell> <Icon name='calendar alternate'/> Date </Table.Cell>
                        <Table.Cell> {moment().format('MMMM Do YYYY, h:mm:ss a')} </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>

            {/* Table Game */}
            <Divider horizontal >
                <Header as='h4'> <Icon name='chess pawn' /> Stage : {stageNumber} </Header>
            </Divider>
            {/* FOR COMPUTER */}
            <Responsive
                {...Responsive.onlyComputer}
                as={Table}
                celled compact definition color='black'
            >
                <Table.Header fullWidth>
                    <Table.Row>
                        <Table.HeaderCell> <Header as='h4' color='red' textAlign='center' > Win </Header> </Table.HeaderCell>
                        <Table.HeaderCell> <Icon name='user' /> Player </Table.HeaderCell>
                        <Table.HeaderCell> <Icon name='chess board'/> Point Player Lose </Table.HeaderCell>
                        <Table.HeaderCell> <Icon name='winner'/> Win Game </Table.HeaderCell>
                        <Table.HeaderCell> <Icon name='keyboard' /> Total </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        gameplay.map((player,index,valueArray) => (
                            <Table.Row key={index} >
                                <Table.Cell collapsing>
                                    <Checkbox 
                                        slider
                                        value={player.name}
                                        checked={player.isWin}
                                        onChange={(event,data) => oneWin(valueArray,data.value, setGameplay)}
                                    />
                                </Table.Cell>
                                <Table.Cell> <Icon name='user outline ' /> {player.name} </Table.Cell>

                                <Table.Cell>
                                    <Input
                                        type='number'
                                        value={player.point}
                                        name={player.name}
                                        disabled={player.isWin}
                                        placeholder={player.isWin ? ' Winner ' : ' Losser ' }
                                        onFocus={(event) => event.target.value = ''  }
                                        onChange={(event,data) => setPointPlayer(valueArray, data.name, data.value, setGameplay, event)}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    {
                                        (player.isWin) ? 
                                        <Icon name='winner' />
                                        :
                                        <Icon name='thumbs down outline' />
                                    }
                                </Table.Cell>
                                <Table.Cell>
                                    {
                                        (player.isWin) ?
                                        <p> {(gameplay.reduce((acc,cur) => {
                                            return acc + parseInt(cur.point);
                                        },0))} </p>
                                        :
                                        <p> {player.point * -1} </p>
                                    }
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>

                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell colSpan='4'>
                            {/* Begin Modal End Game */}
                            <Modal trigger={<Button primary > <Icon name='paint brush' /> Finish Game</Button>}>
                                <Modal.Header> <Icon name='chess' /> Game Play </Modal.Header>
                                <Modal.Content>
                                    <Modal.Description>
                                        <Header> <Icon name='dollar sign' /> Summary Point </Header>
                                        {/* Error Save Data */}
                                        <Message negative hidden={error} >
                                            <Message.Header> Sorry, cannot update Data !!!! </Message.Header>
                                            <p> Try again later ! </p>
                                        </Message>
                                        <Table celled color='black' >
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell> Player </Table.HeaderCell>
                                                    {
                                                        group.players.map((player,index) => (
                                                            <Table.HeaderCell key={index} > {player.name} </Table.HeaderCell>
                                                            ))
                                                        }
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell> Total </Table.Cell>
                                                    {
                                                        group.players.map((player,index) => (
                                                            <Table.Cell key={index}> {pointWinner(stages,player.name)} </Table.Cell>
                                                            ))
                                                        }
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                    </Modal.Description>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button primary onClick={() => saveData('UNO',group,stages,setError,history) }>
                                        Save <Icon name='right chevron' />
                                    </Button>
                                </Modal.Actions>
                            </Modal>                     
                            {/* ========= END ============== */}
                            <Button floated='right' color='orange' size='small' icon onClick={() => {
                                let gameplayArr = gameplayArray(gameplay);       
                                
                                stages.push({
                                    stage : stageNumber,
                                    gameplay : gameplayArr // gameplay already play this stage
                                });
                                                            
                                setStageNumber(stageNumber + 1); // change next stage

                                setStages(stages); // change next stage

                                setGameplay(() => {
                                    let newGame = group.players.map(player => ({
                                        idPlayer : player.idPlayer,
                                        name : player.name,
                                        point : 0,
                                        isWin : false
                                    }));
                                    return newGame;
                                });

                                }}> 
                                <Icon name='arrow alternate circle right outline' /> Next Stage 
                            </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Responsive>
            {/* END FOR COMPUTER */}

            {/* FOR MOBILE */}
            <Responsive
                {...Responsive.onlyMobile}
                as={Table}
                definition colot='black'
            >
                <Table.Body>
                    {
                        gameplay.map((player,index,valueArray) => (
                            <Table.Row
                                key={index}
                            >
                                <Table.Cell > {player.name} </Table.Cell>
                                
                                <Table.Cell>
                                    <Input
                                        fluid
                                        type='number'
                                        value={player.point}
                                        name={player.name}
                                        disabled={player.isWin}
                                        placeholder={player.isWin ? ' Winner ' : ' Losser ' }
                                        onFocus={(event) => event.target.value = ''  }
                                        onChange={(event,data) => setPointPlayer(valueArray, data.name, data.value, setGameplay, event)}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Checkbox
                                        label='Player is win ?'
                                        value={player.name}
                                        checked={player.isWin}
                                        onChange={(event,data) => oneWin(valueArray,data.value, setGameplay)}
                                    /> 
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell colSpan='4' >
                            {/* Begin Modal End Game */}
                            <Modal trigger={<Button primary > <Icon name='paint brush' /> Finish Game</Button>}>
                                <Modal.Header> <Icon name='chess' /> Game Play </Modal.Header>
                                <Modal.Content>
                                    <Modal.Description>
                                        <Header> <Icon name='dollar sign' /> Summary Point </Header>
                                        {/* Error Save Data */}
                                        <Message negative hidden={error} >
                                            <Message.Header> Sorry, cannot update Data !!!! </Message.Header>
                                            <p> Try again later ! </p>
                                        </Message>
                                        <Table celled color='black' >
                                            <Table.Body>
                                                {
                                                    group.players.map((player,index) => (
                                                        <Table.Row key={index} >
                                                            <Table.Cell> {player.name} </Table.Cell>
                                                            <Table.Cell key={index}> {pointWinner(stages,player.name)} </Table.Cell>
                                                        </Table.Row>
                                                    ))
                                                }
                                            </Table.Body>
                                        </Table>
                                    </Modal.Description>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button primary onClick={() => saveData('UNO',group,stages,setError,history) }>
                                        Save <Icon name='right chevron' />
                                    </Button>
                                </Modal.Actions>
                            </Modal>                     
                            {/* ========= END ============== */}
                            <Button floated='right' color='orange' size='small' icon onClick={() => {
                                let gameplayArr = gameplayArray(gameplay);       
                                
                                stages.push({
                                    stage : stageNumber,
                                    gameplay : gameplayArr // gameplay already play this stage
                                });
                                                            
                                setStageNumber(stageNumber + 1); // change next stage

                                setStages(stages); // change next stage

                                setGameplay(() => {
                                    let newGame = group.players.map(player => ({
                                        idPlayer : player.idPlayer,
                                        name : player.name,
                                        point : 0,
                                        isWin : false
                                    }));
                                    return newGame;
                                });

                                }}> 
                                <Icon name='arrow alternate circle right outline' /> Next Stage 
                            </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Responsive>

            {/* === End Table Game === */}

            {/* Stages already PLAY */}
            <Responsive
                as={Divider}
                {...Responsive.onlyComputer}
                horizontal
            >
                <Header as='h4'> <Icon name='coffee' /> Stages already play : </Header>
            </Responsive>
            {/* STAGES PLAY FOR COMPUTER */}
            <Responsive
                as={Table}
                {...Responsive.onlyComputer}
                celled color='black'
            >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell> <Icon name='user' circular /> Player </Table.HeaderCell>
                        {
                            gameplay.map((player,index) => (
                                <Table.HeaderCell key={index} > <Icon name='user outline' /> {player.name} </Table.HeaderCell>
                            ))
                        }
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        stages.map((inStage,index) => (
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
            </Responsive>
            {/* =========================== END ====================== */}

        </Container>
    )
}


export default GameplayPage;