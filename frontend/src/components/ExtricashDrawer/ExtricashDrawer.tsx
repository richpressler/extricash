import * as React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, withStyles } from '@material-ui/core';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssessmentIcon from '@material-ui/icons/Assessment';
import BackupIcon from '@material-ui/icons/Backup';
import { DrawerProps } from '@material-ui/core/Drawer';

const navLinks = [
  {
    path: '/dashboard/overview',
    label: 'Overview',
    icon: <AccountBalanceIcon />
  },
  {
    path: '/dashboard/bills',
    label: 'Bills',
    icon: <AssignmentIcon />
  },
  {
    path: '/dashboard/analytics',
    label: 'Analytics',
    icon: <AssessmentIcon />
  },
  {
    path: '/dashboard/import',
    label: 'Import',
    icon: <BackupIcon />
  }
];

interface Props extends DrawerProps {
  isOpen?: boolean;
  permanent?: boolean;
  toggle?: (state: boolean) => void;
}

const StyledDrawer = withStyles(
  theme => ({
    paper: {
      width: (theme as any).layout.drawerWidth
    }
  }),
  { withTheme: true }
)(Drawer);

export const ExtricashDrawer: React.SFC<Props> = props => {
  return (
    <StyledDrawer
      open={props.isOpen}
      onClose={() => (props.permanent ? null : props.toggle(false))}
      variant={props.permanent ? 'permanent' : 'temporary'}
    >
      <div
        tabIndex={0}
        role="button"
        onClick={() => (props.permanent ? null : props.toggle(false))}
        onKeyDown={() => (props.permanent ? null : props.toggle(false))}
      >
        <List>
          {navLinks.map((link, index) => {
            const linkProps = { to: link.path };
            return (
              <ListItem button={true} key={index} component={Link} {...linkProps}>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItem>
            );
          })}
        </List>
      </div>
    </StyledDrawer>
  );
};
