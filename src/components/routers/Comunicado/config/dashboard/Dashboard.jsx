import { MenuOutlined, SettingOutlined } from "@ant-design/icons";
import { Drawer, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";

import { useEffect, useState } from "react";
import { GrConfigure, GrUpdate } from "react-icons/gr";
import { PiStudent } from "react-icons/pi";
import { api } from "../../../../../../auth/auth";
import { Outlet, useNavigate } from "react-router-dom";

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
        <Header
          color='white'
          style={{
            display: "flex",
            color: "#fff",
            gap: "10px",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#000",
          }}>
          <span style={{ color: "red" }}>Admin: {admin?.user?.nome}</span>
          <MenuOutlined onClick={() => setIsClosed(!isClosed)} />
        </Header>

        <Drawer
          open={isClosed}
          onClose={() => setIsClosed(!isClosed)}
          placement='left'
          style={{
            width: "270px",
          }}>
          <Menu
            onClick={({ key }) => {
              navigate(key);
            }}
            mode='inline'
            items={[
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
                label: "Outras Actualizações",
                icon: <GrUpdate />,
                children: [
                  {
                    label: "Disciplinas",
                  },
                  {
                    label: "Ano de Frquência",
                  },
                  {
                    label: "Ano Lectivo",
                  },
                  {
                    label: "Semestre",
                  },
                  {
                    label: "Disciplinas",
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
        </Drawer>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </div>
  );
};

export default Dashboard;
