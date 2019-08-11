import React,{useState,useEffect} from 'react';
import {getAllAPIType} from '../../services/api';
import GameplayPage from './Gameplay';
import RouteGroup from '../../components/GroupCard/Index';
import {Switch,Route} from 'react-router-dom';
import { Segment } from 'semantic-ui-react';

function UnoPage(props) {
    const [groups,setGroups] = useState([]);
    const {match} = props;

    const fetchGroups = async () => {
        try {
            const res = await getAllAPIType('groups');
            setGroups(res.data);
        } catch(err) {
            console.log(err);
            setGroups([]);
        }
    };

    useEffect(() => {fetchGroups()}, [] );

    // show all group play
    return (
        <Segment raised >
            <Switch>
                <Route exact path={`${match.url}`} render={(match) => <RouteGroup groups={groups} {...match} /> }  />
                <Route path={`${match.url}/:groupID`} render={(match) => <GameplayPage {...match} />} />
            </Switch>
        </Segment>
    )
};

export default UnoPage;