import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  getHeirarchyIdData } from "../Slices/HierachySlice";
import { useEffect } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import _ from "lodash";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrop } from "react-dnd";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import BusinessIcon from "@material-ui/icons/Business";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import Typography from "@material-ui/core/Typography";
// import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import CardContent from "@material-ui/core/CardContent";
import organization from "../org.json";

import {
  createMuiTheme,
  makeStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
    display: "inline-block",
    borderRadius: 16
  },
  expand: {
    transform: "rotate(0deg)",
    marginTop: -10,
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.short
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: "#ECECF4"
  }
}));

function Organization({ org, onCollapse, collapsed }) {
  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "",
    drop: () => ({ name: org.name, designation : org.designation}),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  const isActive = canDrop && isOver;
  let backgroundColor = "white";
  if (isActive) {
    backgroundColor = "#ddffd2";
  } else if (canDrop) {
    backgroundColor = "#ffeedc";
  }
  return (
    <Card
      variant="outlined"
      className={classes.root}
      ref={drop}
      style={{ backgroundColor }}
    >
      <CardHeader
        avatar={
          <Tooltip
            title={`${_.size(
              org?.subordinates
            )}`}
            arrow
          >
            <Badge
              style={{ cursor: "pointer" }}
              color="secondary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              showZero
              invisible={!collapsed}
              overlap="circle"
              badgeContent={_.size(org?.subordinates)}
              onClick={onCollapse}
            >
              {/* <div>{org?.id}</div> */}
              <Avatar className={classes.avatar}>
                <BusinessIcon color="primary" />
              </Avatar>
            </Badge>
          </Tooltip>
        }
        title={org?.name + ' ('+ org?.designation + ')'}
        // action={
        //   // <IconButton size="small" onClick={handleClick}>
        //   //   <MoreVertIcon />
        //   // </IconButton>
        // }
      />

      {/* <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <BusinessIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Add Sub Profile" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountBalanceIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Add Sub Account" />
        </MenuItem>
      </Menu> */}
      <IconButton
        size="small"
        onClick={onCollapse}
        className={clsx(classes.expand, {
          [classes.expandOpen]: !collapsed
        })}
      >
        <ExpandMoreIcon />
      </IconButton>
    </Card>
  );
}
// function Account({ a }) {
//     const classes = useStyles();
//     const [{ isDragging }, drag] = useDrag({
//       type: "account", // Define the type property
//       item: { name: a.name, type: "account" },
//       end: (item, monitor) => {
//         const dropResult = monitor.getDropResult();
//         if (item && dropResult) {
//           alert(`You moved ${item.name} to ${dropResult.name}`);
//         }
//       },
//       collect: (monitor) => ({
//         isDragging: monitor.isDragging()
//       })
//     });
//     const opacity = isDragging ? 0.4 : 1;
//     return (
//       <Card
//         variant="outlined"
//         className={classes.root}
//         ref={drag}
//         style={{ cursor: "pointer", opacity }}
//       >
//         <CardHeader
//           avatar={
//             <Avatar className={classes.avatar}>
//               <AccountBalanceIcon color="secondary" />
//             </Avatar>
//           }
//           title={a.name}
//         />
//       </Card>
//     );
//   }
  
// function Product({ p }) {
//   const classes = useStyles();
//   return (
//     <Card variant="outlined" className={classes.root}>
//       <CardContent>
//         <Typography variant="subtitle2">{p.name}</Typography>
//       </CardContent>
//     </Card>
//   );
// }
function Node({ o, parent }) {
  // console.log("HERE O IS",o);
  const [collapsed, setCollapsed] = React.useState(o?.collapsed);
  const [o2, setO2] = React.useState(o?.collapsed);
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };
  React.useEffect(() => {
    // o.collapsed = collapsed;
    setO2({...o, collapsed: collapsed});
  }, [o]);
  const T = parent
    ? TreeNode
    : (props) => (
        <Tree
          {...props}
          lineWidth={"2px"}
          lineColor={"#bbc"}
          lineBorderRadius={"12px"}
        >
          {props.children}
        </Tree>
      );
  return collapsed ? (
    <T
      label={
        <Organization
          org={o}
          onCollapse={handleCollapse}
          collapsed={collapsed}
        />
      }
    />
  ) : (
    <T
      label={
        <Organization
          org={o}
          onCollapse={handleCollapse}
          collapsed={collapsed}
        />
      }
    >
      {/* {_.map(o2.account, (a) => (
        <TreeNode>
          <TreeNode label={<Product p={a.product} />} />
        </TreeNode>
      ))} */}
      {_.map(o.subordinates, (c) => (
        <Node o={c} parent={o} />
      ))}
    </T>
  );
}
const theme = createMuiTheme({
  palette: {
    background: "#ECECF4"
  },
  fontFamily: "Roboto, sans-serif"
});

export default function HeirachyId(props) {
  const {hierarchy}  = useSelector((state) => state.viewHierarchy);
  const [hierarchy2, setHierarchy2] = useState([]);
 const {id} = useParams();
    console.log("heirarchy", hierarchy);
    // console.log("heirarchy2", organization);
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log("hello");
    dispatch(getHeirarchyIdData(id));
  },[dispatch]);

  useEffect(()=> {
    setHierarchy2({...hierarchy, collapsed: false});
  }, [hierarchy])
  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor="background" padding={4}>
        <DndProvider backend={HTML5Backend}>
          <Node o={hierarchy} />
        </DndProvider>
      </Box>
    </ThemeProvider>
  );
}
