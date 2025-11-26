import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    categoria: { type: String, required: true },
    nome: { type: String, required: true, trim: true },
    preco: { type: Number, required: true, min: 0 },
    duracaoMinutos: { type: Number, default: 60, min: 1 },

    descricao: { type: String, default: "" },
    comissao: { type: Number, default: 0 },
    imagemUrl: { type: String, default: "" },

    ativo: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
