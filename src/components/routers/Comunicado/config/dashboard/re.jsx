<Space>
  <Menu
    onClick={({ key }) => {
      navigate(key);
    }}
    color='#a31543'
    mode='inline'
    style={{
      width: 250,
    }}
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
        label: "P. de Serviços",
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
          {
            label: "Matrícula",
            key: "matricula",
          },
          {
            label: "Declaração sem Nota",
            key: `declaracao?tipos=${"Sem Nota"}`,
          },
          {
            label: "Declaração com Nota",
            key: `declaracao?tipos=${"Com Nota"}`,
          },
          {
            label: "Declaração Linceciatura",
            key: `declaracao?tipos=${"Linceciatura"}`,
          },
          {
            label: "Pagamento de Folha",
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
        label: "Relatórios",
        icon: <BiListCheck size={23} />,
        key: "/relatorios",
      },
      {
        label: "Propina Curso",
        icon: <BiListCheck size={23} />,
        key: "/relatorio_curso",
      },
    ]}></Menu>
</Space>;
