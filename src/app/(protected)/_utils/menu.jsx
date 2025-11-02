import { MailOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Link } from "react-router";

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
};

export const SIDEBAR_ITEMS = [
  {
    key: "/dashboard",
    label: "Dashboard",
    icon: <MailOutlined />,
    permissions: ["All"],
    children: [
      {
        key: "/project-anggota-holding",
        label: <Link to={"/project-anggota-holding"} style={linkStyle}>Overview</Link>,
        permissions: ["All"],
      },
      {
        key: "/strategic-capital-project",
        label: <Link to={"/strategic-capital-project"} style={linkStyle}>Projects</Link>,
        permissions: ["All"],
      },
      {
        key: "/komparasi-project",
        label: <Link to={"/komparasi-project"} style={linkStyle}>Portfolio</Link>,
        permissions: ["All"],
      },
    ],
  },
  {
    key: "/user-management",
    label: "User Management",
    icon: <MailOutlined />,
    permissions: ["Admin"],
    children: [
      {
        key: "/user-management/users",
        label: <Link to={"/user-management/users"} style={linkStyle}>Daftar User</Link>,
        permissions: ["Admin"],
      },
      {
        key: "/user-management/roles",
        label: <Link to={"/user-management/roles"} style={linkStyle}>Daftar Role</Link>,
        permissions: ["Admin"],
      },
    ],
  },
  {
    key: "/master-data",
    label: "Master Data",
    icon: <AppstoreOutlined />,
    permissions: ["Admin"],
    children: [
      {
        key: "/master-data/feasibility-studies",
        label: <Link to={"/master-data/feasibility-studies"} style={linkStyle}>Feasibility Study</Link>,
        permissions: ["Admin"],
      },
      {
        key: "/master-data/perusahaans",
        label: <Link to={"/master-data/perusahaans"} style={linkStyle}>Perusahaan</Link>,
        permissions: ["Admin"],
      },
      {
        key: "/master-data/kurs",
        label: <Link to={"/master-data/kurs"} style={linkStyle}>Kurs</Link>,
        permissions: ["Admin"],
      },
      {
        key: "/master-data/risks",
        label: <Link to={"/master-data/risks"} style={linkStyle}>Resiko</Link>,
        permissions: ["Admin"],
      },
      {
        key: "/master-data/issues",
        label: <Link to={"/master-data/issues"} style={linkStyle}>Issues</Link>,
        permissions: ["Admin"],
      },
      {
        key: "/master-data/template-messaging",
        label: <Link to={"/master-data/template-messaging"} style={linkStyle}>Template Messaging</Link>,
        permissions: ["Admin"],
      },
    ],
  },
  {
    key: "/projects",
    label: <Link to={"/projects"} style={linkStyle}>PIMS</Link>,
    icon: <MailOutlined />,
    permissions: ["Admin"],
  },
  {
    key: "/messaging",
    label: <Link to={"/messaging"} style={linkStyle}>Messaging</Link>,
    icon: <MailOutlined />,
    permissions: ["Admin"],
  },
  {
    key: "/laporan",
    label: <Link to={"/laporan"} style={linkStyle}>Laporan</Link>,
    icon: <MailOutlined />,
    permissions: ["Admin"],
  },
];
