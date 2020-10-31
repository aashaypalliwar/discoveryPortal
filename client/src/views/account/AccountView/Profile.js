import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
  makeStyles
} from '@material-ui/core';

import { blue, deepPurple } from '@material-ui/core/colors';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles(() => ({
  root: {},
  button: {
    fontSize: 17,
    right: 0,
    position: 'relative'
  },
  text: {
    fontSize: 17
  },
  avatar: {
    height: 100,
    width: 100,
    margin: 12
  },
  table: {
    minWidth: 100
  },
  cellB: {
    fontWeight: 500,
    border: 0,
    fontSize: 17,
    paddingTop: 8,
    paddingBottom: 8
  },
  cell: {
    border: 0,
    fontSize: 17,
    paddingTop: 8,
    paddingBottom: 8
  },
  icons: {
    height: 50,
    width: 50
  },
  links: {
    alignItems: 'center',
    alignContent: 'center'
  },
  blue: {
    color: blue[50],
    backgroundColor: blue[100]
  },
  chip: {
    marginLeft: 2,
    marginRight: 2
  },
  align: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  right: {
    textAlign: 'right'
  }
}));

const getLogo = name => {
  switch (name) {
    case 'LinkedIn':
      return 'https://img.icons8.com/fluent/48/000000/linkedin.png';
    case 'GitHub':
      return 'https://img.icons8.com/fluent/48/000000/github.png';
    case 'Instagram':
      return 'https://img.icons8.com/fluent/48/000000/instagram-new.png';
    case 'Facebook':
      return 'https://img.icons8.com/fluent/48/000000/facebook-new.png';
    case 'Twitter':
      return 'https://img.icons8.com/fluent/48/000000/twitter.png';
  }
};

const Profile = ({ profile, className, ...rest }) => {
  const classes = useStyles();

  let prev = null;

  const rows = [
    createData('Branch', profile.branch),
    createData('Admission Year', profile.admissionYear || 'Update'),
    createData('Graduation year', profile.graduationYear || 'Update'),
    createData('Publish Status', profile.publishStatus ? 'True' : 'False')
  ];

  return (
    <div>
      <div className={classes.right}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          href="/update"
        >
          EDIT PROFILE
        </Button>
      </div>
      <Grid container className={classes.align} spacing={1} justify="center">
        <Grid item lg={5} md={10} xs={12}>
          <Card className={clsx(classes.root, className)} {...rest}>
            <CardContent>
              <Box alignItems="center" display="flex" flexDirection="column">
                <Avatar className={classes.avatar} src={profile.image} />
                <Typography color="textPrimary" gutterBottom variant="h3">
                  {profile.name}
                </Typography>
                <Typography
                  className={classes.text}
                  color="textSecondary"
                  variant="body1"
                >
                  {/* <span style={{ fontWeight: 'bold' }}>Email : </span>{' '} */}
                  {profile.email}
                </Typography>
                <Typography
                  className={classes.text}
                  color="textSecondary"
                  variant="body1"
                >
                  <b>Bio :</b> {profile.bio}
                </Typography>
              </Box>
            </CardContent>
            <CardContent>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    {rows.map(row => (
                      <TableRow key={row.name}>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.cellB}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="center" className={classes.cell}>
                          {row.calories}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
            <Divider />
          </Card>
        </Grid>
        <Grid item lg={7} md={10} xs={12} className={classes.align}>
          <Card className={clsx(classes.root, className)} {...rest}>
            {profile.links ? (
              <CardContent align="center">
                <Typography
                  // className={classes.text}
                  color="textPrimary"
                  gutterBottom
                  variant="h3"
                >
                  Contact info
                </Typography>
                <Grid container justify="center">
                  {profile.links.map((link, index) => {
                    return (
                      <Link href={link.url} target="_blank">
                        <Avatar
                          className={classes.icons}
                          src={getLogo(link.name)}
                          key={index}
                        />
                      </Link>
                    );
                  })}
                </Grid>
              </CardContent>
            ) : null}
            <CardContent>
              {profile.tags ? (
                <Box alignItems="center" display="flex" flexDirection="column">
                  <Typography color="textPrimary" gutterBottom variant="h3">
                    Skills & Tags
                  </Typography>
                  <Grid container justify="center">
                    {profile.tags
                      .sort((a, b) => {
                        if (a.group <= b.group) return -1;
                        return 1;
                      })
                      .map((tag, index) => {
                        if (tag.group === prev) {
                          prev = tag.group;
                          return (
                            <Chip
                              key={tag.group}
                              avatar={
                                <Avatar className={classes.blue}>
                                  {tag.group.charAt(0)}
                                </Avatar>
                              }
                              className={classes.chip}
                              label={tag.name}
                            />
                          );
                        } else {
                          prev = tag.group;
                          return (
                            <div style={{ display: 'flex' }}>
                              <Typography
                                color="textPrimary"
                                gutterBottom
                                variant="h3"
                              >
                                {tag.group}
                              </Typography>
                              <Chip
                                key={tag.group}
                                avatar={
                                  <Avatar className={classes.blue}>
                                    {tag.group.charAt(0)}
                                  </Avatar>
                                }
                                className={classes.chip}
                                label={tag.name}
                              />
                            </div>
                          );
                        }
                      })}
                  </Grid>
                </Box>
              ) : null}
            </CardContent>
            <Divider />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
