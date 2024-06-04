import { HomeFilled, MenuOutlined, SettingOutlined } from "@ant-design/icons";
import { Drawer, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header, Footer } from "antd/es/layout/layout";

import { useEffect, useState } from "react";
import { GrConfigure, GrUpdate } from "react-icons/gr";
import { PiCurrencyDollar, PiStudent } from "react-icons/pi";
import { api } from "../../../../../../auth/auth";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../../../../navbar/navbar";
import { BiLineChart, BiListCheck } from "react-icons/bi";

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
  const dataLine = [
    { mes: "julio", visualizacao: 201 },
    { mes: "julio", visualizacao: 201 },
    { mes: "julio", visualizacao: 201 },
    { mes: "julio", visualizacao: 201 },
  ];
  const configLine = {
    data: dataLine,
    height: 400,
    xfield: "mes",
    yfield: "Visualizacao",
    color: "#000",
    point: {
      size: 4,
      shap: "diamond",
      color: "#ff0",
    },
    label: {
      style: {
        fill: "#aaa",
        fontSize: 14,
        stroke: "#010025",
      },
    },
  };
  return (
    <div className='dashboard'>
      <Layout>
        <NavBar />

        <Content
          style={{ display: "flex", marginTop: "40px", height: "100vh" }}>
          <Menu
            onClick={({ key }) => {
              navigate(key);
            }}
            color='#a31543'
            style={{
              display: "flex",
              flexDirection: "column",
              width: "200px",
              height: "100%",
              border: "0.5px solid #000",
              paddingTop: "20px",
            }}
            mode='inline'
            items={[
              {
                label: "Home",
                icon: <HomeFilled />,
                key: `/dashboard/dados`,
              },
              {
                label: "Estudante",
                icon: <PiStudent size={21} />,
                key: "estudante",
              },
              {
                label: "Pagamentos de Serviços",
                icon: <PiCurrencyDollar size={21} />,
                children: [
                  {
                    label: "Propina",
                    key: "propina",
                  },
                  {
                    label: "Reconfirmação",
                    key: "reconfirmacao",
                  },
                  {
                    label: "Recurso",
                    key: "recurso",
                  },
                  {
                    label: "Exame Especial",
                    key: "exame especial",
                  },
                  {
                    label: "Cadeira de Atraso",
                    key: "cadeira de atraso",
                  },
                ],
              },
              {
                label: "Atualizações de Serviços",
                icon: <GrUpdate />,
                children: [
                  {
                    label: "Propina",
                    key: "atualizar propina",
                  },
                  {
                    label: "Reconfirmação",
                    key: "atualizar reconfirmacao",
                  },
                  {
                    label: "Serviços de Cadeira",
                    key: "atualizar cadeira",
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
              {
                label: "Solicitações",
                icon: <BiListCheck size={23} />,
                key: "solicitacao",
              },
            ]}
          />
          <div
            style={{
              width: "100%",
              overflowY: "auto",
              paddingBottom: "100px",
              marginTop: "10px",
            }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default Dashboard;
