import { IComentario } from "./IComentario";
import { Avaliacao } from "../../entities/Avaliacao";
import { IMaterialComplementar } from "./IMaterialComplementar";
import { IVisualizacao } from "./IVisualizacao";
import { IModulo } from "./IModule";

interface IVideoAula {
  id?: string;
  titulo: string;
  descricao?: string;
  video: string;
  duracao: number;
  dataAgendamento?: Date;
  materiaisComplementares?: IMaterialComplementar[];
  comentarios?: IComentario[];
  avaliacoes: Avaliacao[];
  modulo?: IModulo;
  moduloId: string;
  visualizacoes?: IVisualizacao[];

  create(params: {
    titulo: string;
    video: string;
    descricao?: string;
    dataAgendamento: Date;
    moduloId: string;
  }): void;
}

export type { IVideoAula };
