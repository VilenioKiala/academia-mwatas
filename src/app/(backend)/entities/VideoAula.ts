import { IsDate, IsNotEmpty, Length } from "class-validator";
import { IVideoAula } from "../interfaces/objects/IVideoAula";
import { IMaterialComplementar } from "../interfaces/objects/IMaterialComplementar";
import { IComentario } from "../interfaces/objects/IComentario";
import { Avaliacao } from "./Avaliacao";
import { IVisualizacao } from "../interfaces/objects/IVisualizacao";
import { IModulo } from "../interfaces/objects/IModule";

class VideoAula implements IVideoAula {
  id?: string;

  @Length(1, 150)
  @IsNotEmpty()
  titulo: string;

  video: string;

  descricao?: string;

  moduloId: string;

  @IsNotEmpty()
  duracao: number;

  @IsDate()
  dataAgendamento?: Date;

  materiaisComplementares?: IMaterialComplementar[];

  comentarios?: IComentario[];

  modulo?: IModulo;

  avaliacoes: Avaliacao[];

  visualizacoes?: IVisualizacao[];

  create(params: {
    titulo: string;
    video: string;
    descricao?: string;
    dataAgendamento: Date;
    moduloId: string;
  }) {
    Object.assign(this, { ...params });
  }
}

export { VideoAula };
