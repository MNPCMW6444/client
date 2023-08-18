import {useState, useEffect, useContext, MouseEvent, useMemo} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {
    Collapse,
    Typography,
    Drawer,
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
    Grid,
    Select,
    MenuItem,
    SelectChangeEvent,
    IconButton,
    Menu,
    Avatar,
} from "@mui/material";
import useResponsive from "../../hooks/useRespnsive";
import UserContext from "../../context/UserContext";
import whiteTheme from "../../../content/style/whiteTheme";
import {MainserverContext} from "@failean/mainserver-provider";
import {
    List as ListIcon,
    EmojiObjects as EmojiObjectsIcon,
    Dashboard as DashboardIcon,
} from "@mui/icons-material";

interface WhiteSideBarProps {
    onMobileDrawerToggle: () => void;
}

const WhiteSideBar = ({onMobileDrawerToggle}: WhiteSideBarProps) => {
    const navigate = useNavigate();
    const {isMobile} = useResponsive();
    const location = useLocation();
    const mainserver = useContext(MainserverContext);
    const axiosInstance = mainserver?.axiosInstance;
    const {user, ideas, refreshUserData} = useContext(UserContext);
    const [openSubMenu, setOpenSubMenu] = useState(false);
    const [selectedIdeaId, setSelectedIdeaId] = useState("");
    const [hoveredItem, setHoveredItem] = useState("");
    const [timers, setTimers] = useState<NodeJS.Timeout[]>([]);

    const [hovered, setHovered] = useState(false);


    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuItems = [
        {label: "Idea Notebook", route: "/"},
        {label: "AIdeator", route: "/aideator"},
        {label: "Deck", route: "/deck", disabled: true, comingSoon: true},
        {
            label: "Idea Backlog",
            route: "/backlog",
            disabled: true,
            comingSoon: true,
        },
        {label: "CritiQ", route: "/critiq", disabled: true, comingSoon: true},
    ];

    const critiqSubItems = useMemo(
        () => [
            {label: "Idea Score", route: "/critiq/ideascore"},
            {label: "CritIQ Chat", route: "/critiq/critichat"},
            {label: "Validation Roadmap", route: "/critiq/validationroadmap"},
        ],
        []
    );

    useEffect(() => {
        const isCritiqRoute = [
            "/critiq/runcritiq",
            ...critiqSubItems.map((item) => item.route),
        ].includes(location.pathname);
        setOpenSubMenu(isCritiqRoute);
    }, [location, critiqSubItems]);

    const handleMenuItemClick = (route: string) => {
        axiosInstance && axiosInstance.post("analytics/sidebar", {route});
        navigate(route);
        if (isMobile) {
            onMobileDrawerToggle();
        }
    };

    const handleMouseEnter = (route: string) => {
        const timer = setTimeout(() => {
            setHoveredItem(route);
        }, 5);
        setTimers((prevTimers) => [...prevTimers, timer]);
    };

    const clearTimeouts = () => {
        timers.forEach((timer) => clearTimeout(timer));
        setTimers([]);
    };

    const handleMouseLeave = () => {
        clearTimeouts();
        setHoveredItem("");
    };


    const renderMenuItems = () => (
        <List>
            {menuItems.map((item, index) => {
                if (isMobile) {
                    return (
                        <ListItem
                            key={index}
                            onClick={() => handleMenuItemClick(item.route)}
                            sx={{
                                bgcolor:
                                    location.pathname === item.route
                                        ? "action.selected"
                                        : "inherit",
                            }}
                        >
                            <ListItemText
                                primary={item.label + (item.comingSoon ? " - Coming Soon!" : "")}
                            />
                        </ListItem>
                    );
                } else {
                    return (
                        <ListItem
                            key={index}
                            onClick={() => !item.disabled && handleMenuItemClick(item.route)}
                            sx={{
                                bgcolor:
                                    location.pathname === item.route
                                        ? "action.selected"
                                        : "inherit",
                            }}
                        >
                            {/* Assuming you have an Icon component or some way to render icons. Replace "IconComponent" with whatever you use.
                            <IconComponent icon={item.icon}/>*/}

                            {/* Conditionally display label based on "hovered" state */}
                            {hovered && (
                                <ListItemText
                                    primary={item.label}
                                    sx={{cursor: item.disabled ? "not-allowed" : "pointer"}}
                                />
                            )}

                            {item.comingSoon && hovered && (
                                <ListItemSecondaryAction>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            display: "block",
                                            fontSize: "60%",
                                        }}
                                    >
                                        Coming Soon!
                                    </Typography>
                                </ListItemSecondaryAction>
                            )}
                        </ListItem>
                    );
                }
            })}
        </List>
    );


    const handleIdeaSelect = (event: SelectChangeEvent) => {
        setSelectedIdeaId(event.target.value as string);
    };

    return (
        <Box
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            sx={{
                display: "flex",
                transition: 'width 300ms ease',
                width: hovered ? '240px' : '48px', // Adjust this width to your preference
                mt: isMobile ? 0 : (theme) => theme.spacing(8),
            }}
        >
            {isMobile ? (
                <Drawer
                    variant="permanent"
                    open
                    sx={{
                        width: hovered ? '240px' : '48px',
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {
                            width: hovered ? '240px' : '48px',
                            boxSizing: "border-box",
                            boxShadow: `0 0 10px ${"rgba(31, 38, 135, 0.37)"}`,
                        },
                    }}
                >
                    <Grid container justifyContent="center" alignItems="center">
                        <Grid item>
                            <IconButton
                                edge="end"
                                color="inherit"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                            >
                                <Avatar>
                                    {user?.name
                                        .match(/(\b\S)?/g)
                                        ?.join("")
                                        .toUpperCase()}
                                </Avatar>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => navigate("/my-account")}>
                                    My Account
                                </MenuItem>
                                <MenuItem onClick={() => navigate("/about")}>
                                    About Failean
                                </MenuItem>
                                <MenuItem
                                    onClick={() =>
                                        axiosInstance &&
                                        axiosInstance
                                            .get("auth/signout")
                                            .then(() => refreshUserData())
                                            .catch(() => refreshUserData())
                                    }
                                >
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>

                    <>
                        <Select
                            value={selectedIdeaId}
                            onChange={handleIdeaSelect}
                            variant="outlined"
                            displayEmpty
                            sx={{
                                width: "calc(100% - 20px)",
                                alignSelf: "center",
                                maxWidth: "220",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                            }}
                        >
                            <MenuItem value="" disabled>
                                Select Idea
                            </MenuItem>
                            {ideas.map((idea, index) => (
                                <MenuItem key={index} value={idea._id}>
                                    {idea.idea}
                                </MenuItem>
                            ))}
                        </Select>
                        <Divider sx={{mt: "10px", ml: "10px", mr: "10px"}}/>
                        <Box sx={{padding: "10px"}}>{renderMenuItems()}</Box>
                    </>
                </Drawer>
            ) : (
                <Drawer
                    variant="permanent"
                    open
                    sx={{
                        width: "240px",
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {
                            width: "240px",
                            boxSizing: "border-box",
                            boxShadow: `0 0 10px ${"rgba(31, 38, 135, 0.37)"}`,
                        },
                    }}
                >
                    <Grid container justifyContent="center" alignItems="center">
                        <Grid item>
                            <IconButton
                                edge="end"
                                color="inherit"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                            >
                                <Avatar sx={{width: 100, height: 100, fontSize: "150%"}}>
                                    {user?.name
                                        .match(/(\b\S)?/g)
                                        ?.join("")
                                        .toUpperCase()}
                                </Avatar>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => navigate("/my-account")}>
                                    My Account
                                </MenuItem>
                                <MenuItem onClick={() => navigate("/about")}>
                                    About Failean
                                </MenuItem>
                                <MenuItem
                                    onClick={() =>
                                        axiosInstance &&
                                        axiosInstance
                                            .get("auth/signout")
                                            .then(() => refreshUserData())
                                            .catch(() => refreshUserData())
                                    }
                                >
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                    <>
                        <Select
                            value={selectedIdeaId}
                            onChange={handleIdeaSelect}
                            variant="outlined"
                            displayEmpty
                            sx={{
                                alignSelf: "center",
                                width: "calc(100% - 20px)",
                                height: "auto",
                                minHeight: "56px",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                            }}
                        >
                            <MenuItem value="" disabled>
                                Select Idea
                            </MenuItem>
                            {ideas.map((idea, index) => (
                                <MenuItem key={index} value={idea._id}>
                                    {idea.idea}
                                </MenuItem>
                            ))}
                        </Select>
                        <Divider sx={{mt: "10px", ml: "10px", mr: "10px"}}/>
                        <Box
                            sx={{
                                alignSelf: "center",
                                width: "87%",
                                padding: "15px",
                                overflowY: "scroll",
                                scrollbarWidth: "none",
                                scrollbarColor: "transparent",
                                "&::-webkit-scrollbar": {
                                    width: "0px",
                                },
                                "&::-webkit-scrollbar-track": {
                                    backgroundColor: "transparent",
                                },
                                "&::-webkit-scrollbar-thumb": {
                                    backgroundColor: "transparent",
                                },
                            }}
                        >
                            {renderMenuItems()}
                        </Box>
                    </>
                </Drawer>
            )}
        </Box>
    );
};

export default WhiteSideBar;
