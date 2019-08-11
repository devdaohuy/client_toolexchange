import React from 'react';
import IconHeader from '../../components/IconHeader/Index';
import UnoPage from './Uno';
import FinishPage from './Finish';
import { Container, Divider, Card, Button,Image, Segment } from 'semantic-ui-react';
import {Switch,Route, Link} from 'react-router-dom';
import imageUno from '../../Image/UNO.png';
import imageTienLen from '../../Image/TienLen.jpg';

const routePageArr = [
    {
        nameRoute : 'UNO',
        description : 'Input Point Player Game UNO',
        link : '/game/uno',
        avatar : imageUno
    },
    {
        nameRoute : 'Tiến Lên',
        description : 'Input Point Player Game Tiến Lên',
        link : '/game/tienlen',
        avatar : imageTienLen
    }
];

function GamePage() {
    return (
        <Container>
            <IconHeader icon='chess rock' header='Game' sub='Game Play UNO and ...' />
            <Divider/>

            <Switch>
                <Route exact path='/game' render={() => <RouteGamePage/> } />
                {/* Sub route game */}
                <Route path='/game/uno' render={(match) => <UnoPage {...match} /> } />
                <Route path='/game/tienlen' render={() => <h1> /game/tienlen </h1> } />
                <Route path='/game/finish' render={() => <FinishPage/> } />
            </Switch>

        </Container>
    )   
};

function RouteGamePage() {
    return (
        <Segment padded='very'>
            <Card.Group centered >
                {
                    routePageArr.map((route,index) => (
                        <Card key={index} >
                            <Image src={route.avatar} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header> {route.nameRoute} </Card.Header>
                                <Card.Description> {route.description} </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Button color='orange' as={ Link } to={route.link} > Go {route.nameRoute} Page </Button>
                            </Card.Content>
                        </Card>
                    ))
                }
            </Card.Group>
        </Segment>
    )
}

export default GamePage;