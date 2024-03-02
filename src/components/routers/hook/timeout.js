export const formatDate = (createAt) => {
  const data = new Date(createAt);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return data.toLocaleDateString("pt-BR", options);
};
export const formaHouser = (createdAt) => {
  const data = new Date(createdAt);
  const options = { hour: "numeric", minute: "numeric" };
  return data.toLocaleTimeString("pt-BR", options);
};
export const calcularTempo = (tempo) => {
  const agora = new Date(tempo);
  const options = { hour: "numeric", minute: "numeric" };
  const ho = agora.toLocaleTimeString("pt-BR", options);

  return ho;
};
export const ano = (tempo) => {
  const agora = new Date(tempo);
  const options = { year: "numeric" };
  const [ano, hora] = agora.toLocaleTimeString("pt-BR", options).split(",");

  return ano;
};
