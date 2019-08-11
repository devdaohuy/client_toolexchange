import React, {useState, useEffect} from 'react';
import IconHeader from '../../components/IconHeader/Index';
import RouteGroup from '../../components/GroupCard/Index.js';
import SummaryPage from './Summary';
import {getAllAPIType} from '../../services/api';
import { Container, Divider } from 'semantic-ui-react';
import {Switch,Route} from 'react-router-dom';

function ResultsPage() { 
    const [groups, setGroups] = useState([]);

    const fetchGroups = async () => {
        try {
            const res = await getAllAPIType('groups');
            setGroups(res.data);
        } catch(err) {
            console.log(err);
            setGroups([]);
        }
    };

    useEffect(() => { fetchGroups() }, []);

    //console.log(groups);
    return (
        <Container>
            
            <IconHeader icon='braille' header='Results' sub='Summary and Store' />
            <Divider/>

            <Switch>
                <Route exact path='/results' render={(match) => <RouteGroup groups={groups} {...match} /> } />
                <Route path='/results/:groupID' render={(match) => <SummaryPage {...match} />} />
            </Switch>
        </Container>
    )
};


export default ResultsPage;