import { useState } from "react";
import { Layout, Menu, Button, Flex, Typography, Dropdown, Avatar, Badge, Modal, Form, Select } from "antd";
import { Outlet, useResolvedPath, Link } from "react-router";
import {
  UserOutlined,
  DownOutlined,
  BellOutlined,
  ReloadOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import { useSession } from "../_components/providers/session";
import { SIDEBAR_ITEMS } from "./_utils/menu";
import { RoleList as roleList } from "./_utils/role-list";

const { Header, Content } = Layout;

function ProtectedLayout() {
  const { switchRole, signout, session } = useSession();
  const role = session?.user?.role;
  const [rolePopup, setRolePopup] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const path = useResolvedPath();

  // Safe pathname extraction to prevent object-to-primitive conversion
  const pathname = typeof path?.pathname === 'string' ? path.pathname : '/';

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

  // Filter menu items based on role permissions
  const filteredItems = SIDEBAR_ITEMS.map((item) => {
    if (item.children) {
      const filteredChildren = item.children.filter((child) => {
        return child.permissions?.includes(role) || child.permissions?.includes("All");
      });

      // Only return parent if it has visible children
      if (filteredChildren.length > 0) {
        return { ...item, children: filteredChildren };
      }
      return null;
    }

    // Handle top-level items without children
    if (item.permissions) {
      return item.permissions.includes(role) || item.permissions.includes("All") ? item : null;
    }

    return item;
  }).filter(Boolean);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          width: "100%",
          background: "var(--primary-blue, #19315a)",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <Flex align="center" gap="24px" style={{ flex: 1 }}>
          <Typography.Title
            level={3}
            style={{ color: "#fff", margin: 0, minWidth: "150px" }}
          >
            Prototype
          </Typography.Title>

          {/* Desktop Menu */}
          <Menu
            mode="horizontal"
            selectedKeys={[pathname]}
            items={filteredItems}
            style={{
              flex: 1,
              background: "transparent",
              borderBottom: "none",
              minWidth: 0,
            }}
            className="navbar-menu"
          />

          {/* Mobile Menu Button */}
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
            className="mobile-menu-button"
            style={{
              color: "#fff",
              fontSize: "18px",
            }}
          />
        </Flex>

        {/* Right Side Actions */}
        <Flex align="center" gap="16px">
          <Badge dot={true} offset={[-10, 6]}>
            <Button type="text" shape="circle">
              <BellOutlined style={{ fontSize: "20px", color: "#fff" }} />
            </Button>
          </Badge>

          <Dropdown menu={{ items: AccountItem }} trigger={["hover"]}>
            <Flex gap="8px" align="center" style={{ cursor: "pointer" }}>
              <Avatar icon={<UserOutlined />} />
              <Flex vertical className="user-info">
                <Flex gap="8px" align="center">
                  <Typography.Text strong style={{ color: "#fff", fontSize: 14 }}>
                    {session?.user?.name}
                  </Typography.Text>
                  <DownOutlined style={{ color: "#fff", fontSize: 10 }} />
                </Flex>
                <Typography.Text style={{ fontSize: 12, color: "#fff", opacity: 0.8 }}>
                  {session?.user?.role}
                </Typography.Text>
              </Flex>
            </Flex>
          </Dropdown>
        </Flex>
      </Header>

      {/* Mobile Menu Drawer */}
      {mobileMenuVisible && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setMobileMenuVisible(false)}
        >
          <div
            className="mobile-menu-content"
            onClick={(e) => e.stopPropagation()}
          >
            <Menu
              mode="inline"
              selectedKeys={[pathname]}
              items={filteredItems}
              style={{
                background: "var(--primary-blue, #19315a)",
                border: "none",
              }}
              onClick={() => setMobileMenuVisible(false)}
            />
          </div>
        </div>
      )}

      <Content style={{ padding: "24px", background: "#f0f2f5" }}>
        <Outlet />
      </Content>

      <Modal
        title="Switch Role"
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
    </Layout>
  );
}

export default ProtectedLayout;
