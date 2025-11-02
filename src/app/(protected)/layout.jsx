import { useState } from "react";
import { MainLayout, theme } from "admiral";
import { Button, Flex, Typography, Dropdown, Avatar, Badge, Modal, Form, Select } from "antd";
import { Outlet, useResolvedPath } from "react-router";
import {
  UserOutlined,
  DownOutlined,
  BellOutlined,
  ReloadOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import { useSession } from "../_components/providers/session";
import { SIDEBAR_ITEMS } from "./_utils/menu";
import { RoleList as roleList } from "./_utils/role-list";

function Layout() {
  const { switchRole, signout, session } = useSession();
  const role = session?.user?.role;
  const [rolePopup, setRolePopup] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const path = useResolvedPath();

  // Safe pathname extraction to prevent object-to-primitive conversion
  const pathname = typeof path?.pathname === 'string' ? path.pathname : '/';

  const {
    token: { colorWhite },
  } = theme.useToken();

  const handleClosePopup = () => {
    setRolePopup(false);
  };

  const handleSwitchRole = (data) => {
    switchRole(data.role);
    handleClosePopup();
  };

  const AccountItem = [
    {
      key: "2",
      label: "Switch Role",
      icon: <ReloadOutlined />,
      onClick: () => setRolePopup(true),
    },
    {
      key: "1",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => {
        signout({ callbackUrl: "/auth/login" });
      },
    },
  ];

  const filteredItems = SIDEBAR_ITEMS.map((item) => {
    if (item.children) {
      const filteredChildren = item.children.filter((child) => {
        return child.permissions?.includes(role) || child.permissions?.includes("All");
      });

      // Only return parent if it has visible children
      if (filteredChildren.length > 0) {
        return { ...item, children: filteredChildren };
      }
      return null; // No visible children, remove parent
    }

    // Handle top-level items without children
    if (item.permissions) {
      return item.permissions.includes(role) || item.permissions.includes("All") ? item : null;
    }

    return item;
  }).filter(Boolean); // Remove nulls

  return (
    <MainLayout
      header={{
        brandLogo: (
          <Flex align="center" justify="space-between" style={{ width: "100%" }}>
            <Typography.Title
              level={3}
              style={{ color: colorWhite, margin: 0 }}
            >
              Prototype
            </Typography.Title>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                color: colorWhite,
                fontSize: "18px",
              }}
              title={collapsed ? "Show Sidebar" : "Hide Sidebar"}
            />
          </Flex>
        ),
      }}
      sidebar={{
        extra: (
          <Flex style={{ margin: "8px 0", paddingInline: "16px" }}>
            <Dropdown menu={{ items: AccountItem }} trigger={["hover"]}>
              <Flex gap="8px" align="center" style={{ width: "100%" }}>
                <Avatar icon={<UserOutlined />} />
                {!collapsed && (
                  <Flex vertical style={{ flex: 1 }}>
                    <Flex gap="8px">
                      <Typography.Text strong style={{ color: colorWhite, fontSize: 14 }}>
                        {session?.user?.name}
                      </Typography.Text>
                      <DownOutlined style={{ color: colorWhite }} />
                    </Flex>
                    <Typography.Text style={{ fontSize: 12, color: colorWhite }} type="secondary">
                      {session?.user?.role}
                    </Typography.Text>
                  </Flex>
                )}
              </Flex>
            </Dropdown>
            {!collapsed && (
              <Badge dot={true} offset={[-10, 6]}>
                <Button type="text" shape="circle">
                  <BellOutlined style={{ fontSize: "24px", color: colorWhite }} />
                </Button>
              </Badge>
            )}
          </Flex>
        ),
        width: 250,
        collapsedWidth: 80,
        collapsed: collapsed,
        collapsible: true,
        menu: filteredItems,
        theme: "light",
        defaultSelectedKeys: [pathname],
      }}
    >
      <Outlet />
      <Modal
        title="Swith Role"
        open={rolePopup}
        maskClosable={false}
        footer={null}
        onCancel={handleClosePopup}
      >
        <Form layout="vertical" onFinish={handleSwitchRole}>
          <Form.Item required label="Role" name="role">
            <Select defaultValue={role} placeholder="Select Role" options={roleList} />
          </Form.Item>
          <Flex justify="flex-end" gap="8px">
            <Button type="text" onClick={handleClosePopup}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Flex>
        </Form>
      </Modal>
    </MainLayout>
  );
}
export default Layout;
