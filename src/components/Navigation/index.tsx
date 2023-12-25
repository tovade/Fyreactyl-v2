import { ActionIcon, Box, Flex, Group, ScrollArea, Text } from "@mantine/core";
import {
  IconAdjustmentsFilled,
  IconCoin,
  IconDiscount,
  IconShoppingBag,
  IconX,
} from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./navigation.module.css";
import Logo from "../Logo";
import { LinksGroup } from "./Links/Links";
import { useRouter } from "next/router";
import { UserButton } from "../UserButton/UserButton";
import { User } from "@prisma/client";

const mockdata = [
  {
    title: "Dashboard",
    links: [
      {
        label: "Dashboard",
        icon: IconAdjustmentsFilled,
        link: "/dashboard",
      },
      {
        label: "Store",
        icon: IconShoppingBag,
        link: "/dashboard/store",
      },
      {
        label: "Earn",
        icon: IconCoin,
        links: [
          {
            label: "Redeem voucher",
            link: "/dashboard/earn/redeem",
          },
        ],
      },
    ],
  },
];
const adminData = [
  {
    title: "Admin",
    links: [
      {
        label: "Vouchers",
        icon: IconDiscount,
        link: "/dashboard/admin/vouchers",
      },
    ],
  },
];

type NavigationProps = {
  onClose: () => void;
  user?: User;
};

const Navigation = ({ onClose, user, ...others }: NavigationProps) => {
  const tablet_match = useMediaQuery("(max-width: 768px)");
  const router = useRouter();

  const links = mockdata.map((m) => (
    <Box pl={0} mb="md" key={m.title}>
      <Text
        tt="uppercase"
        size="xs"
        pl="md"
        fw={500}
        mb="sm"
        className={classes.linkHeader}
      >
        {m.title}
      </Text>
      {m.links.map((item) => (
        <LinksGroup
          {...item}
          key={item.label}
          initiallyOpened={router.pathname === item.link}
        />
      ))}
    </Box>
  ));
  const adminLinks = adminData.map((m) => (
    <Box pl={0} mb="md" key={m.title}>
      <Text
        tt="uppercase"
        size="xs"
        pl="md"
        fw={500}
        mb="sm"
        className={classes.linkHeader}
      >
        {m.title}
      </Text>
      {m.links.map((item) => (
        <LinksGroup
          {...item}
          key={item.label}
          initiallyOpened={router.pathname === item.link}
        />
      ))}
    </Box>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Flex justify="space-between" align="center" gap="sm">
          <Group
            justify="space-between"
            style={{ flex: tablet_match ? "auto" : 1 }}
          >
            <Logo c="white" />
          </Group>
          {tablet_match && (
            <ActionIcon onClick={onClose} variant="transparent">
              <IconX color="white" />
            </ActionIcon>
          )}
        </Flex>
      </div>

      <ScrollArea className={classes.links}>
        {user && user.role === "Admin" ? (
          <div className={classes.linksInner}>
            {links}
            {adminLinks}
          </div>
        ) : (
          <div className={classes.linksInner}>{links}</div>
        )}
      </ScrollArea>
      {user && (
        <div className={classes.footer}>
          <UserButton user={user} />
        </div>
      )}
    </nav>
  );
};

export default Navigation;
