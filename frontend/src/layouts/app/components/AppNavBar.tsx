/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  createStyles,
  Navbar,
  Group,
  getStylesRef,
  rem,
  useMantineTheme,
  Text,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconSettings,
  IconLogout,
  IconHourglass,
  IconReport,
  IconReportAnalytics,
  IconTag,
  IconSun,
  IconMoonStars,
} from "@tabler/icons-react";
import { FaStopwatch } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
  },

  version: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background!,
      0.1
    ),
    color: theme.white,
    fontWeight: 700,
  },

  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background!,
      0.1
    )}`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background!,
      0.1
    )}`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: theme.white,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      ),
    },
  },

  linkIcon: {
    color: theme.white,
    opacity: 0.75,
    ref: getStylesRef("icon"),
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.15
      ),
      [`& .${getStylesRef("icon")}`]: {
        opacity: 0.9,
      },
    },
  },
}));

const data = [
  { link: "/", label: "Timer", icon: IconHourglass },
  {
    link: "/reports",
    label: "Reports",
    icon: IconReport,
  },
  {
    link: "/insights",
    label: "Insights",
    icon: IconReportAnalytics,
  },
  { link: "/tags", label: "Tags", icon: IconTag },
  { link: "/settings", label: "Settings", icon: IconSettings },
];

function AppNavbar() {
  const { logout } = useAuth();
  const { classes, cx } = useStyles();

  const links = data.map((item) => (
    <NavLink
      className={(props) =>
        cx(classes.link, {
          // TODO:
          // eslint-disable-next-line react/prop-types
          [classes.linkActive]: props.isActive,
        })
      }
      to={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section grow>
        <Group className={classes.header}>
          <FaStopwatch color={theme.white} size={28} />
          <Text
            size="xl"
            component={Link}
            to="/"
            weight={700}
            color={theme.white}
          >
            Time Tracker
          </Text>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UnstyledButton
          className={classes.link}
          w="100%"
          onClick={() => toggleColorScheme()}
        >
          {dark ? (
            <IconSun className={classes.linkIcon} stroke={1.5} />
          ) : (
            <IconMoonStars className={classes.linkIcon} stroke={1.5} />
          )}
          Theme
        </UnstyledButton>
        <UnstyledButton className={classes.link} w="100%" onClick={logout}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          Logout
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
  );
}

export default AppNavbar;
