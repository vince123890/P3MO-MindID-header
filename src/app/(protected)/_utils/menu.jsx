import { MailOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Link } from "react-router";

export const SIDEBAR_ITEMS = [
  {
    key: "/dashboard",
    label: "Dashboard",
    icon: <MailOutlined />,
    permissions: ["All"],
    children: [
      {
        key: "/project-anggota-holding",
        label: <Link to={"/project-anggota-holding"}>Overview</Link>,
        permissions: ["All"],
      },
      {
        key: "/strategic-capital-project",
        label: <Link to={"/strategic-capital-project"}>Projects</Link>,
        permissions: ["All"],
      },
      {
        key: "/komparasi-project",
        label: <Link to={"/komparasi-project"}>Portfolio</Link>,
        permissions: ["All"],
      },
    ],
  },
  {
    key: "/projects",
    label: <Link to={"/projects"}>PIMS</Link>,
    icon: <MailOutlined />,
    permissions: ["Admin"],
  },
  {
    key: "/laporan",
    label: <Link to={"/laporan"}>Laporan</Link>,
    icon: <MailOutlined />,
    permissions: ["Admin"],
  },
  {
    key: "/pengaturan",
    label: "Pengaturan",
    icon: <AppstoreOutlined />,
    permissions: ["Admin"],
    children: [
      {
        key: "/user-management",
        label: "User Management",
        children: [
          {
            key: "/user-management/users",
            label: <Link to={"/user-management/users"}>Daftar User</Link>,
            permissions: ["Admin"],
          },
          {
            key: "/user-management/roles",
            label: <Link to={"/user-management/roles"}>Daftar Role</Link>,
            permissions: ["Admin"],
          },
        ],
        permissions: ["Admin"],
      },
      {
        key: "/master-data",
        label: "Master Data",
        children: [
          {
            key: "/master-data/feasibility-studies",
            label: <Link to={"/master-data/feasibility-studies"}>Feasibility Study</Link>,
            permissions: ["Admin"],
          },
          {
            key: "/master-data/perusahaans",
            label: <Link to={"/master-data/perusahaans"}>Perusahaan</Link>,
            permissions: ["Admin"],
          },
          {
            key: "/master-data/kurs",
            label: <Link to={"/master-data/kurs"}>Kurs</Link>,
            permissions: ["Admin"],
          },
          {
            key: "/master-data/risks",
            label: <Link to={"/master-data/risks"}>Resiko</Link>,
            permissions: ["Admin"],
          },
          {
            key: "/master-data/issues",
            label: <Link to={"/master-data/issues"}>Issues</Link>,
            permissions: ["Admin"],
          },
          {
            key: "/master-data/template-messaging",
            label: <Link to={"/master-data/template-messaging"}>Template Messaging</Link>,
            permissions: ["Admin"],
          },
        ],
        permissions: ["Admin"],
      },
      {
        key: "/messaging",
        label: <Link to={"/messaging"}>Messaging</Link>,
        permissions: ["Admin"],
      },
    ],
  },
];
