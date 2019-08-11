import React,{useState} from "react";
import {Menu, Icon, Segment, Responsive, Dropdown} from "semantic-ui-react";
import {withRouter} from 'react-router-dom';

const sideBarValue = [
    { name : 'Home', sideIcon : 'home', link : '/' },
    { name : 'Players', sideIcon : 'user', link : '/players' },
    { name : 'Groups', sideIcon : 'group', link : '/groups' },
    { name : 'Game', sideIcon : 'chess rook', link : '/game' },
    { name : 'Results', sideIcon : 'balance', link : '/results' }
];

function SideBar(props) {
    const [activeItem,setActiveItem] = useState('Home');
    const {history} = props;
    return (
        <Segment inverted >
            <Menu inverted secondary >

                <Menu.Item header >
                    <Responsive
                    />
                    <Responsive
                        {...Responsive.onlyComputer}
                        as={Menu.Header}
                    >
                        <Icon name='chess king' size='big' /> Exchange Game
                    </Responsive>
                    <Responsive
                        {...Responsive.onlyMobile}
                        as={Icon}
                        name='chess king'
                        size='large'
                    />
                </Menu.Item>
                {/* only show Game Result in mobile */}
                
                <Menu.Menu>
                    {
                        sideBarValue.map((sideBar,index) => (
                            <Responsive
                                {...Responsive.onlyComputer}
                                key={index}
                                as={Menu.Item}
                                active={activeItem === sideBar.name }
                                onClick={() => handleItemClick(sideBar,setActiveItem,history) }
                            >
                                <Icon name={sideBar.sideIcon} />
                                {sideBar.name}
                            </Responsive>
                        ))
                    }
                </Menu.Menu>
                
                {/* dropdown */}
                <Menu.Menu position='right' >
                    <Responsive
                        {...Responsive.onlyMobile}
                        as={Dropdown}
                        item
                        text='Menu'
                    >
                        <Dropdown.Menu>
                            {
                                sideBarValue.map((sideBar,index) => (
                                    <Dropdown.Item 
                                        key={index}
                                        onClick={() => handleItemClick(sideBar,setActiveItem, history) }
                                    > 
                                        <Icon name={sideBar.sideIcon} />
                                        {sideBar.name} 
                                    </Dropdown.Item>
                                ))
                            }
                        </Dropdown.Menu>
                    </Responsive>
                </Menu.Menu>
            </Menu>
        </Segment>    
    )
};

function handleItemClick(sideBar,setState,history) {
    setState(sideBar.name);
    history.push(sideBar.link);
};

export default withRouter(SideBar);