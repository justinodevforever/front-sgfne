import { createSlice } from "@reduxjs/toolkit";

const initialSlice = {
  UserId: {
    id: "",
  },
  pagou: {
    isClic: false,
  },
  ModalEdit: {
    isVisible: false,
  },
  ModalConfirmar: {
    isVisibleConfirmar: false,
  },
  ModalWarning: {
    isVisibleWarning: false,
  },
  ModalError: {
    isVisibleError: false,
  },
  LerPublicacao: {
    lerMais: false,
  },
  Modal: {
    isVisible: false,
  },

  openModal: {
    isVisible: false,
  },
  openAno: {
    isVisible: false,
  },
  ModalDisciplina: {
    isVisible: false,
  },
  Publicacao: {
    idPublicacao: 0,
  },
};
const uiSlice = createSlice({
  name: "ui",
  initialState: initialSlice,
  reducers: {
    setId: (state, action) => {
      state.UserId.id = action.payload;
    },
    toggleLerMais: (state, action) => {
      state.LerPublicacao.lerMais = action.payload;
    },
    toggleModal: (state, action) => {
      state.Modal.isVisible = action.payload;
    },
    toggleOpenModla: (state, action) => {
      state.openModal.isVisible = action.payload;
    },
    toggleOpenAno: (state, action) => {
      state.openAno.isVisible = action.payload;
    },
    toggleModalDisciplina: (state, action) => {
      state.ModalDisciplina.isVisible = action.payload;
    },
    setIdPublicacao: (state, action) => {
      state.Publicacao.idPublicacao = action.payload;
    },
    setIsClic: (state, action) => {
      state.pagou.isClic = action.payloadt;
    },
    toggleModalEdit: (state, action) => {
      state.ModalEdit.isVisible = action.payload;
    },
    toggleModalConfirmar: (state, action) => {
      state.ModalConfirmar.isVisibleConfirmar = action.payload;
    },
    toggleModalError: (state, action) => {
      state.ModalError.isVisibleError = action.payload;
    },
    toggleModalWarning: (state, action) => {
      state.ModalWarning.isVisibleWarning = action.payload;
    },
  },
});

export const {
  setId,
  toggleOpenModla,
  toggleLerMais,
  toggleModal,
  toggleOpenAno,
  toggleModalDisciplina,
  setIdPublicacao,
  setIsClic,
  toggleModalEdit,
  toggleModalConfirmar,
  toggleModalError,
  toggleModalWarning,
} = uiSlice.actions;

export default uiSlice.reducer;
