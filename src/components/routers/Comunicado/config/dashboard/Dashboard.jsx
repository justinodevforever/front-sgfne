import { HomeFilled, MenuOutlined, SettingOutlined } from "@ant-design/icons";
import { Drawer, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header, Footer } from "antd/es/layout/layout";

import { useEffect, useState } from "react";
import { GrConfigure, GrUpdate } from "react-icons/gr";
import { PiStudent } from "react-icons/pi";
import { api } from "../../../../../../auth/auth";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../../../../navbar/navbar";

const Dashboard = () => {
  const [isClosed, setIsClosed] = useState(false);
  const [admin, setAdmin] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    hendleGetUserPermissio();
  }, []);
  const hendleGetUserPermissio = async () => {
    await api
      .get("/permissaousuario")
      .then((data) => {
        if (data.data === "Token Invalid") {
          return navigate("/login");
        }
        if (data.data) {
          const admin = data.data.filter(
            (perm) => perm.permission.permissao === "admin"
          );
          setAdmin(admin[0]);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className='dashboard'>
      <Layout>
        <NavBar />

        <Content style={{ display: "flex", marginTop: "40px" }}>
          <Menu
            onClick={({ key }) => {
              navigate(key);
            }}
            color='#a31543'
            style={{
              display: "flex",
              flexDirection: "column",
              width: "200px",
            }}
            mode='inline'
            items={[
              {
                label: "Home",
                icon: <HomeFilled />,
                key: `/dashboard`,
              },
              {
                label: "Estudante",
                icon: <PiStudent size={23} />,
                key: "estudante",
              },
              {
                label: "Atualizações de Serviços",
                icon: <GrUpdate />,
                children: [
                  {
                    label: "Propina",
                    key: "propina",
                  },
                  {
                    label: "Reconfirmação",
                  },
                  {
                    label: "Cadeira em Atraso",
                  },
                  {
                    label: "Exame expecial",
                  },
                  {
                    label: "Declaração",
                  },
                  {
                    label: "Declaração",
                  },
                ],
              },

              {
                label: "Configuraçõe e Ajuste",
                icon: <SettingOutlined />,
                key: "definicoes",
              },
            ]}
          />
          <div style={{ width: "100%" }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default Dashboard;
