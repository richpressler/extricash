import * as React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssessmentIcon from '@material-ui/icons/Assessment';

const navLinks = [
  {
    path: '/overview',
    label: 'Overview',
    icon: <AccountBalanceIcon/>
  },
  {
    path: '/bills',
    label: 'Bills',
    icon: <AssignmentIcon/>
  },
  {
    path: '/analytics',
    label: 'Analytics',
    icon: <AssessmentIcon/>
  }
];

const sideList = (
  <div>
    <List>
      {navLinks.map((link, index) => (
        <ListItem button key={link.path}>
          <ListItemIcon>{link.icon}</ListItemIcon>
          <ListItemText primary={link.label} />
        </ListItem>
      ))}
    </List>
  </div>
);

interface Props {
  toggle: (state: boolean) => void,
  isOpen: boolean
}

export class ExtricashDrawer extends React.Component<Props, null> {
  render() {
    return (
      <Drawer open={this.props.isOpen} onClose={() => this.props.toggle(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.props.toggle(false)}
            onKeyDown={() => this.props.toggle(false)}
          >
            {sideList}
          </div>
        </Drawer>
    );
  }
}