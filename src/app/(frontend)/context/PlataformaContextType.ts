import { createContext } from "react";

type PlataformaContextType = {
  logged: boolean;
  login: () => void;
  logout: () => void;
};

const PlataformaContextDefaultValue: PlataformaContextType = {
  logged: false,
  login: () => {},
  logout: () => {},
};

const PlataformaContext = createContext<PlataformaContextType>(
  PlataformaContextDefaultValue
);

export { PlataformaContext };
