import React from 'react';
import SideBar from './components/SideBar/Index';
import HomePage from './Scenes/Home/Index';
import PlayerPage from './Scenes/Players/Index';
import GroupsPage from './Scenes/Groups/Index';
import GamePage from './Scenes/Game/Index';
import ResultsPage from './Scenes/Results/Index';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Grid,Container } from 'semantic-ui-react';

function App() {
    return (
      <Router>
        <Grid>
          
          <Grid.Row>
            <Grid.Column>
                <SideBar/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            {/* Route page */}
            <Grid.Column>
              <Switch>
                <Route exact path='/' render={() => <HomePage/> } />
                <Route path='/players' render={() => <PlayerPage/> } />
                <Route path='/groups' render={() => <GroupsPage/> } />
                <Route path='/game' render={() => <GamePage/> } />
                <Route path='/results' render={() => <ResultsPage/> } />
              </Switch>
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </Router>
    )
}

export default App;

// App.js 1st pages load page first, route page
// SideBar lam rieng khong lien quan